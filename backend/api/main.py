import os
import sys
from dotenv import load_dotenv

# Ensure backend root is on Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(
    title="Rehnuma API",
    description="AI-powered legal information assistant for Punjab Law (FIR, Tenant Rights, Consumer Protection)",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.on_event("startup")
def startup_event():
    try:
        from ingest.embedder import get_chroma_client
        from ingest.run_ingestion import main as run_ingestion_main
        
        client = get_chroma_client()
        collections = client.list_collections()
        has_data = False
        if collections:
            for col in collections:
                if col.count() > 0:
                    has_data = True
                    break
        if not has_data:
            print("[Startup] ChromaDB collections missing or empty. Running auto-ingestion...")
            run_ingestion_main()
        else:
            print("[Startup] ChromaDB vector store verified and ready.")
    except Exception as e:
        print(f"[Startup Warning] Vector store startup check failed: {e}")

@app.get("/")
@app.get("/health")
def root():
    return {
        "status": "healthy",
        "message": "Welcome to Rehnuma API — Punjab Legal Information Assistant",
        "docs_url": "/docs",
        "health_check": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("api.main:app", host="0.0.0.0", port=port, reload=True)
