from dotenv import load_dotenv
import os
from pathlib import Path

_env_dir = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=_env_dir / ".env", override=True)
load_dotenv(override=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import init_db
from app.routes import posts, ai

app = FastAPI(
    title="Blog Editor",
    description="API for a blog editor",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

app.include_router(posts.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {
        "message": "Blog Editor  is running",
        "docs": "/docs",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}
