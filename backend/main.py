from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import psycopg2
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Online Quiz System API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_conn():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

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
    conn = get_db_conn()
    cur = conn.cursor()
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(user.password.encode('utf-8'), salt).decode('utf-8')
    try:
        cur.execute(
            "INSERT INTO users (username, email, password_hash, display_name) VALUES (%s, %s, %s, %s) RETURNING id",
            (user.username, user.email, password_hash, user.display_name or user.username)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        return {"message": "User created successfully", "user_id": user_id}
    except psycopg2.IntegrityError:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Username or email already exists")
    finally:
        cur.close()
        conn.close()

@app.post("/api/signin")
def signin(user: UserSignin):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, username, password_hash, display_name FROM users WHERE username = %s", (user.username,))
    db_user = cur.fetchone()
    if not db_user:
        cur.close()
        conn.close()
        raise HTTPException(status_code=401, detail="Invalid username or password")
    user_id, username, password_hash, display_name = db_user
    if bcrypt.checkpw(user.password.encode('utf-8'), password_hash.encode('utf-8')):
        cur.close()
        conn.close()
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
        conn.close()
        raise HTTPException(status_code=401, detail="Invalid username or password")
