"""
MongoDB Database Initialization Script for Dependify LLC Nigeria Website
Creates a unique database with all necessary collections and indexes
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import uuid

# MongoDB connection string - trying without TLS first
MONGO_URL = "mongodb://root:tJhQb4pPuSSf2IOJYWUuCp6IthfzsNODj6S9VtceQnQ0v4ZtSpngCpHYsaT9PBU0@20.14.88.69:27018/?directConnection=true&connectTimeoutMS=30000&socketTimeoutMS=30000&serverSelectionTimeoutMS=30000"

# Unique database name for Dependify LLC Nigeria
DB_NAME = "dependify_ng_prod"

async def init_database():
    """Initialize the MongoDB database with collections and indexes"""
    
    print(f"Connecting to MongoDB...")
    client = AsyncIOMotorClient(MONGO_URL)
    
    # Test connection
    try:
        await client.admin.command('ping')
        print("✓ Successfully connected to MongoDB!")
    except Exception as e:
        print(f"✗ Failed to connect: {e}")
        return
    
    # Create the unique database
    db = client[DB_NAME]
    print(f"\n✓ Using database: {DB_NAME}")
    
    # List existing databases to confirm we're creating a new one
    existing_dbs = await client.list_database_names()
    if DB_NAME in existing_dbs:
        print(f"  Note: Database '{DB_NAME}' already exists")
    else:
        print(f"  Creating new database: {DB_NAME}")
    
    # Define collections to create
    collections_config = {
        "contact_submissions": {
            "description": "Contact form submissions from website visitors",
            "indexes": [
                {"keys": [("email", 1)], "name": "email_idx"},
                {"keys": [("created_at", -1)], "name": "created_at_idx"},
                {"keys": [("service", 1)], "name": "service_idx"},
                {"keys": [("status", 1)], "name": "status_idx"}
            ]
        },
        "blog_posts": {
            "description": "Blog articles and content",
            "indexes": [
                {"keys": [("slug", 1)], "name": "slug_idx", "unique": True},
                {"keys": [("published_date", -1)], "name": "published_date_idx"},
                {"keys": [("category", 1)], "name": "category_idx"},
                {"keys": [("tags", 1)], "name": "tags_idx"},
                {"keys": [("author.name", 1)], "name": "author_idx"}
            ]
        },
        "services": {
            "description": "Service offerings",
            "indexes": [
                {"keys": [("service_id", 1)], "name": "service_id_idx", "unique": True},
                {"keys": [("is_active", 1)], "name": "is_active_idx"}
            ]
        },
        "testimonials": {
            "description": "Client testimonials and reviews",
            "indexes": [
                {"keys": [("is_featured", 1)], "name": "is_featured_idx"},
                {"keys": [("rating", -1)], "name": "rating_idx"},
                {"keys": [("created_at", -1)], "name": "created_at_idx"}
            ]
        },
        "newsletter_subscribers": {
            "description": "Email newsletter subscriptions",
            "indexes": [
                {"keys": [("email", 1)], "name": "email_idx", "unique": True},
                {"keys": [("subscribed_at", -1)], "name": "subscribed_at_idx"},
                {"keys": [("is_active", 1)], "name": "is_active_idx"}
            ]
        },
        "lead_magnets": {
            "description": "Lead magnet downloads and signups",
            "indexes": [
                {"keys": [("email", 1)], "name": "email_idx"},
                {"keys": [("magnet_type", 1)], "name": "magnet_type_idx"},
                {"keys": [("downloaded_at", -1)], "name": "downloaded_at_idx"}
            ]
        },
        "analytics_events": {
            "description": "Website analytics and tracking events",
            "indexes": [
                {"keys": [("event_type", 1)], "name": "event_type_idx"},
                {"keys": [("timestamp", -1)], "name": "timestamp_idx"},
                {"keys": [("page_path", 1)], "name": "page_path_idx"},
                {"keys": [("session_id", 1)], "name": "session_id_idx"}
            ]
        },
        "status_checks": {
            "description": "API health status checks",
            "indexes": [
                {"keys": [("timestamp", -1)], "name": "timestamp_idx"},
                {"keys": [("client_name", 1)], "name": "client_name_idx"}
            ]
        }
    }
    
    print(f"\n--- Creating Collections ---")
    
    for collection_name, config in collections_config.items():
        print(f"\n📁 Collection: {collection_name}")
        print(f"   Description: {config['description']}")
        
        # Create collection (MongoDB creates it on first insert, but we can explicitly create)
        collection = db[collection_name]
        
        # Create indexes
        for index_config in config['indexes']:
            try:
                index_name = index_config.get('name', 'unnamed_idx')
                unique = index_config.get('unique', False)
                await collection.create_index(
                    index_config['keys'],
                    name=index_name,
                    unique=unique
                )
                unique_str = " (unique)" if unique else ""
                print(f"   ✓ Index: {index_name}{unique_str}")
            except Exception as e:
                print(f"   ✗ Index {index_name} failed: {e}")
    
    # Insert a sample document to ensure collections are created
    print(f"\n--- Initializing Collections with Sample Data ---")
    
    # Sample status check
    status_doc = {
        "id": str(uuid.uuid4()),
        "client_name": "database_init",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "message": "Database initialized successfully"
    }
    await db.status_checks.insert_one(status_doc)
    print("✓ Inserted initial status check")
    
    # Verify collections were created
    print(f"\n--- Verification ---")
    collections = await db.list_collection_names()
    print(f"Collections in '{DB_NAME}':")
    for col in sorted(collections):
        count = await db[col].count_documents({})
        print(f"  • {col}: {count} document(s)")
    
    # Print connection info for .env file
    print(f"\n" + "="*50)
    print("DATABASE CONFIGURATION")
    print("="*50)
    print(f"\nAdd these to your .env file:\n")
    print(f'MONGO_URL="{MONGO_URL}"')
    print(f'DB_NAME="{DB_NAME}"')
    print(f"\n" + "="*50)
    
    client.close()
    print("\n✓ Database initialization complete!")

if __name__ == "__main__":
    asyncio.run(init_database())
