import os
import sys

# Ensure backend directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ingest.parser import process_sources_directory
from ingest.embedder import populate_vector_store

def find_sources_dir() -> str:
    base_dir = os.path.dirname(__file__)
    candidates = [
        os.path.abspath(os.path.join(base_dir, "..", "Sources")),
        os.path.abspath(os.path.join(base_dir, "..", "..", "Sources")),
        os.path.abspath("Sources"),
        os.path.abspath("backend/Sources"),
    ]
    for path in candidates:
        if os.path.exists(path) and os.path.isdir(path):
            # Check if directory has files
            if any(f.endswith(('.pdf', '.doc', '.txt')) for root, _, files in os.walk(path) for f in files):
                return path
    # Return default fallback
    return os.path.abspath(os.path.join(base_dir, "..", "Sources"))

def main():
    sources_dir = find_sources_dir()
    print(f"=== Starting Rehnuma Legal Data Ingestion ===")
    print(f"Scanning directory: {sources_dir}")
    
    chunks = process_sources_directory(sources_dir)
    print(f"\nTotal legal chunks extracted: {len(chunks)}")
    
    if chunks:
        print("\nStoring chunks into ChromaDB vector store...")
        stats = populate_vector_store(chunks)
        print(f"\n=== Ingestion Completed Successfully ===")
        for domain, count in stats.items():
            print(f"  - {domain.upper()}: {count} chunks indexed")
    else:
        print("\n[WARNING] No chunks were extracted. Please check pdf files in Sources.")

if __name__ == "__main__":
    main()
