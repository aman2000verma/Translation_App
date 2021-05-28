import uvicorn


if __name__ == "__main__":
    # Calling the FastAPI object from another file for auto reloading
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)
