from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', '')
db_name = os.environ.get('DB_NAME', 'dependify')

client = None
db = None

def get_db():
    global client, db
    if client is None and mongo_url:
        client = AsyncIOMotorClient(mongo_url)
        db = client[db_name]
    return db

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Form Submission Models
class FormSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    company: Optional[str] = None
    service: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    source: str = "website"

class FormSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, description="Full name is required")
    email: str = Field(..., description="Valid email address is required")
    phone: str = Field(..., min_length=10, description="Phone number is required")
    company: Optional[str] = None
    service: str = Field(..., min_length=1, description="Please select a service")
    message: str = Field(..., min_length=10, description="Please describe your goals (minimum 10 characters)")


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    database = get_db()
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    if database:
        _ = await database.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    database = get_db()
    if not database:
        return []
    
    # Exclude MongoDB's _id field from the query results
    status_checks = await database.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form Submission Endpoint
@api_router.post("/contact", response_model=FormSubmission)
async def submit_contact_form(input: FormSubmissionCreate):
    """
    Submit a contact form to the database.
    All submissions are stored in the 'form_submissions' collection.
    """
    database = get_db()
    
    # Create form submission object
    submission = FormSubmission(
        name=input.name,
        email=input.email,
        phone=input.phone,
        company=input.company,
        service=input.service,
        message=input.message
    )
    
    # Convert to dict for MongoDB storage
    doc = submission.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    if database:
        try:
            await database.form_submissions.insert_one(doc)
            logger.info(f"Form submission saved: {submission.id} from {submission.email}")
        except Exception as e:
            logger.error(f"Error saving form submission: {e}")
            raise HTTPException(status_code=500, detail="Failed to save form submission")
    else:
        logger.warning("No database connection - form submission not persisted")
    
    return submission

@api_router.get("/contact", response_model=List[FormSubmission])
async def get_form_submissions():
    """
    Retrieve all form submissions from the database.
    """
    database = get_db()
    if not database:
        return []
    
    submissions = await database.form_submissions.find({}, {"_id": 0}).to_list(1000)
    
    for sub in submissions:
        if isinstance(sub['timestamp'], str):
            sub['timestamp'] = datetime.fromisoformat(sub['timestamp'])
    
    return submissions


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    global client
    if client:
        client.close()

