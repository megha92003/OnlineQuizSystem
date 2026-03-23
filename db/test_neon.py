import urllib.request
import json
import ssl

token = "napi_h4a3eh436md3ghtpip252c2wg4pwmp1ib1ayrprk9fza9vxlyx5v74oop6pirp4e"
url = "https://console.neon.tech/api/v2/projects"

req = urllib.request.Request(url)
req.add_header("Authorization", f"Bearer {token}")
req.add_header("Accept", "application/json")

context = ssl.create_default_context()

try:
    with urllib.request.urlopen(req, context=context) as response:
        data = json.loads(response.read().decode('utf-8'))
        print("Success! Connection is working.")
        print(f"Number of projects found: {len(data.get('projects', []))}")
        for project in data.get('projects', []):
            print(f"- {project.get('name')} (ID: {project.get('id')})")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.reason}")
    print("Response:", e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
