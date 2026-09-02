import os
import sys

# Ensure backend directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ingest.parser import process_sources_directory
from ingest.embedder import populate_vector_store

def main():
    sources_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "Sources"))
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
