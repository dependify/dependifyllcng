"""
PostgreSQL Database Initialization Script for Dependify LLC Nigeria

This script creates the website_db database and initializes the required tables.
Run this once to set up the database.

Usage:
    python scripts/init_postgres.py
"""

import asyncio
import asyncpg
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connection to default postgres database for creating new database
ADMIN_DATABASE_URL = os.environ.get(
    'ADMIN_DATABASE_URL',
    'postgres://postgres:qqdQSD3LPmeLgpTZxwFU2djT6wvwL1hVNh7T4SU0r3x46WbQ8dUU1oJ40KFYaaw1@20.14.88.69:54332/postgres?sslmode=require'
)

# Connection to the website database
DATABASE_URL = os.environ.get(
    'DATABASE_URL',
    'postgres://postgres:qqdQSD3LPmeLgpTZxwFU2djT6wvwL1hVNh7T4SU0r3x46WbQ8dUU1oJ40KFYaaw1@20.14.88.69:54332/website_db?sslmode=require'
)

DATABASE_NAME = 'website_db'


async def create_database():
    """Create the website_db database if it doesn't exist"""
    print(f"Connecting to PostgreSQL server...")
    
    conn = await asyncpg.connect(ADMIN_DATABASE_URL)
    try:
        # Check if database exists
        exists = await conn.fetchval(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            DATABASE_NAME
        )
        
        if not exists:
            print(f"Creating database '{DATABASE_NAME}'...")
            await conn.execute(f'CREATE DATABASE {DATABASE_NAME}')
            print(f"Database '{DATABASE_NAME}' created successfully!")
        else:
            print(f"Database '{DATABASE_NAME}' already exists.")
    finally:
        await conn.close()


async def init_tables():
    """Initialize database tables"""
    print(f"Connecting to '{DATABASE_NAME}' database...")
    
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        print("Creating tables...")
        
        # Create status_checks table
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS status_checks (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                client_name TEXT NOT NULL,
                timestamp TIMESTAMPTZ DEFAULT NOW()
            )
        ''')
        print("  - status_checks table created/verified")
        
        # Create index on timestamp for faster queries
        await conn.execute('''
            CREATE INDEX IF NOT EXISTS idx_status_checks_timestamp 
            ON status_checks (timestamp DESC)
        ''')
        print("  - timestamp index created/verified")
        
        print("\nDatabase initialization complete!")
        
    finally:
        await conn.close()


async def main():
    print("=" * 50)
    print("PostgreSQL Database Initialization")
    print("=" * 50)
    print()
    
    await create_database()
    print()
    await init_tables()


if __name__ == '__main__':
    asyncio.run(main())
