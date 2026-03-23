import psycopg2
import os
from dotenv import load_dotenv

# Path to the backend .env file
env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend', '.env')
load_dotenv(env_path)

DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    print("Error: DATABASE_URL not found in .env file.")
    exit(1)

try:
    print("Connecting to the PostgreSQL database...")
    # Connect to the database
    conn = psycopg2.connect(DATABASE_URL)
    
    # Create a cursor
    cur = conn.cursor()
    
    # Execute a test query
    print("Executing query: SELECT version();")
    cur.execute("SELECT version();")
    
    # Fetch result
    db_version = cur.fetchone()
    print(f"Success! Connected to:\n{db_version[0]}")
    
    # Close communication
    cur.close()
    conn.close()
    print("Database connection closed.")
except Exception as error:
    print(f"Error while connecting to Neon PostgreSQL: {error}")
