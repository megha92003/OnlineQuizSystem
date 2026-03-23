import urllib.request
import json
import ssl

token = "napi_h4a3eh436md3ghtpip252c2wg4pwmp1ib1ayrprk9fza9vxlyx5v74oop6pirp4e"
url = "https://console.neon.tech/api/v2/projects"

data = json.dumps({
    "project": {
        "name": "OnlineQuizSystem"
    }
}).encode('utf-8')

req = urllib.request.Request(url, data=data, method="POST")
req.add_header("Authorization", f"Bearer {token}")
req.add_header("Content-Type", "application/json")
req.add_header("Accept", "application/json")

context = ssl.create_default_context()

try:
    with urllib.request.urlopen(req, context=context) as response:
        res_data = json.loads(response.read().decode('utf-8'))
        print("Project created successfully!")
        
        # Look for connection URIs directly or in the connection_uris field
        uris = res_data.get('connection_uris', [])
        if uris:
            print(f"CONNECTION_URI={uris[0]['connection_uri']}")
        else:
            # Sometime it's under endpoints or roles, print whole structure if missing 
            # to parse in the next step
            print("Response Data:", json.dumps(res_data, indent=2))
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.reason}")
    print("Response:", e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
