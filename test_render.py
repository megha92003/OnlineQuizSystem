import os
import json
import urllib.request
import ssl
from dotenv import load_dotenv

# Path to the backend .env file
env_path = os.path.join(os.path.dirname(__file__), 'backend', '.env')
load_dotenv(env_path)

RENDER_TOKEN = os.getenv('RENDER_TOKEN')

if not RENDER_TOKEN:
    print("Error: RENDER_TOKEN not found in backend/.env.")
    exit(1)

print("Authenticating with Render API...")
url = "https://api.render.com/v1/owners"

req = urllib.request.Request(url, method="GET")
req.add_header("Authorization", f"Bearer {RENDER_TOKEN}")
req.add_header("Accept", "application/json")

# Create an unverified context if needed, though default HTTPS is preferred
context = ssl.create_default_context()

try:
    with urllib.request.urlopen(req, context=context) as response:
        res_data = json.loads(response.read().decode('utf-8'))
        print("Success! Render connection is active.")
        for item in res_data:
            owner = item.get("owner", {})
            print(f"- Authenticated as: {owner.get('name', 'Unknown')} ({owner.get('email', 'Unknown')}) [Type: {owner.get('type', 'Unknown')}]")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.reason}")
    print("Response:", e.read().decode('utf-8'))
except Exception as e:
    print(f"Error while connecting to Render: {e}")
