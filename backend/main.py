from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import psycopg2
import bcrypt
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="OnlineQuizSystem")

@app.on_event("startup")
async def startup_event():
    logger.info("Application is starting up...")
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        logger.error("DATABASE_URL environment variable is missing!")
    else:
        logger.info("DATABASE_URL is set.")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_conn():
    DATABASE_URL = os.getenv("DATABASE_URL")
    try:
        if not DATABASE_URL:
            raise ValueError("DATABASE_URL is not set")
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        raise HTTPException(status_code=500, detail="Database connection error")

class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str
    display_name: str = None

class UserSignin(BaseModel):
    username: str
    password: str

@app.get("/")
def read_root():
    return {"message": "Online Quiz System API is running"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/signup")
def signup(user: UserSignup):
    conn = None
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(user.password.encode('utf-8'), salt).decode('utf-8')
        cur.execute(
            "INSERT INTO users (username, email, password_hash, display_name) VALUES (%s, %s, %s, %s) RETURNING id",
            (user.username, user.email, password_hash, user.display_name or user.username)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        return {"message": "User created successfully", "user_id": user_id}
    except psycopg2.IntegrityError:
        if conn: conn.rollback()
        raise HTTPException(status_code=400, detail="Username or email already exists")
    except Exception as e:
        if conn: conn.rollback()
        logger.error(f"Signup error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        if conn: conn.close()

@app.post("/api/signin")
def signin(user: UserSignin):
    conn = None
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, username, password_hash, display_name FROM users WHERE username = %s", (user.username,))
        db_user = cur.fetchone()
        if not db_user:
            cur.close()
            raise HTTPException(status_code=401, detail="Invalid username or password")
        
        user_id, username, password_hash, display_name = db_user
        if bcrypt.checkpw(user.password.encode('utf-8'), password_hash.encode('utf-8')):
            cur.close()
            return {
                "message": "Login successful",
                "user": {
                    "id": user_id,
                    "username": username,
                    "display_name": display_name
                }
            }
        else:
            cur.close()
            raise HTTPException(status_code=401, detail="Invalid username or password")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Signin error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        if conn: conn.close()
