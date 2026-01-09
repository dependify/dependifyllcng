from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import asyncpg
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# PostgreSQL connection
database_url = os.environ['DATABASE_URL']

pool: Optional[asyncpg.Pool] = None

async def get_pool():
    global pool
    if pool is None:
        pool = await asyncpg.create_pool(database_url)
    return pool

async def init_db():
    """Initialize database tables"""
    db_pool = await get_pool()
    async with db_pool.acquire() as conn:
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS status_checks (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                client_name TEXT NOT NULL,
                timestamp TIMESTAMPTZ DEFAULT NOW()
            )
        ''')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    db_pool = await get_pool()
    status_id = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc)
    
    async with db_pool.acquire() as conn:
        await conn.execute(
            'INSERT INTO status_checks (id, client_name, timestamp) VALUES ($1, $2, $3)',
            uuid.UUID(status_id), input.client_name, timestamp
        )
    
    return StatusCheck(id=status_id, client_name=input.client_name, timestamp=timestamp)

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    db_pool = await get_pool()
    
    async with db_pool.acquire() as conn:
        rows = await conn.fetch('SELECT id, client_name, timestamp FROM status_checks LIMIT 1000')
    
    return [
        StatusCheck(id=str(row['id']), client_name=row['client_name'], timestamp=row['timestamp'])
        for row in rows
    ]

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

@app.on_event("startup")
async def startup():
    await init_db()

@app.on_event("shutdown")
async def shutdown_db_client():
    global pool
    if pool:
        await pool.close()
