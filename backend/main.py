from fastapi import FastAPI

app = FastAPI(title="Online Quiz System API")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Online Quiz System Backend!"}
