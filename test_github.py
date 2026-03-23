import urllib.request
import json
import ssl

# The user provided the GitHub repository URL instead of an API token
repo_api_url = "https://api.github.com/repos/megha92003/OnlineQuizSystem"

print(f"Testing connection to GitHub repository: {repo_api_url}...")

req = urllib.request.Request(repo_api_url, method="GET")
req.add_header("Accept", "application/vnd.github.v3+json")

context = ssl.create_default_context()

try:
    with urllib.request.urlopen(req, context=context) as response:
        res_data = json.loads(response.read().decode('utf-8'))
        print("Success! GitHub connection is active and the repository exists.")
        print(f"- Repository: {res_data.get('full_name', 'Unknown')}")
        print(f"- Description: {res_data.get('description', 'None')}")
        print(f"- URL: {res_data.get('html_url', 'Unknown')}")
        print(f"- Visibility: {res_data.get('visibility', 'Unknown')}")
except urllib.error.HTTPError as e:
    if e.code == 404:
        print("HTTP 404 Error: Repository Not Found.")
        print("We were able to connect to GitHub, but the repository 'megha92003/OnlineQuizSystem' does not exist or is Private.")
        print("If the repository is Private, you must provide a GitHub Personal Access Token (PAT) to authorize access.")
    else:
        print(f"HTTP Error: {e.code} - {e.reason}")
except Exception as e:
    print(f"Error while connecting to GitHub: {e}")
