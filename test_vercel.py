import os
import json
import urllib.request
import ssl
from dotenv import load_dotenv

# Path to the frontend .env.local file
env_path = os.path.join(os.path.dirname(__file__), 'frontend', '.env.local')
load_dotenv(env_path)

VERCEL_TOKEN = os.getenv('VERCEL_TOKEN')

if not VERCEL_TOKEN:
    print("Error: VERCEL_TOKEN not found in frontend/.env.local.")
    exit(1)

print("Authenticating with Vercel API...")
url = "https://api.vercel.com/v2/user"

req = urllib.request.Request(url, method="GET")
req.add_header("Authorization", f"Bearer {VERCEL_TOKEN}")

# Create an unverified context if needed, though default HTTPS is preferred
context = ssl.create_default_context()

try:
    with urllib.request.urlopen(req, context=context) as response:
        res_data = json.loads(response.read().decode('utf-8'))
        print("Success! Vercel connection is active.")
        print(f"Authenticated as user: {res_data.get('user', {}).get('username', 'Unknown')}")
        print(f"User email: {res_data.get('user', {}).get('email', 'Unknown')}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.reason}")
    print("Response:", e.read().decode('utf-8'))
except Exception as e:
    print(f"Error while connecting to Vercel: {e}")
