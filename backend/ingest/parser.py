import os
import re
import pdfplumber
from typing import List, Dict, Any

DOMAIN_MAPPING = {
    "CrPC1898.pdf": ("Code of Criminal Procedure (CrPC) 1898", "fir"),
    "PPC1860_FIR_v1_scope.pdf": ("Pakistan Penal Code (PPC) 1860", "fir"),
    "THE_PUNJAB_RENTED_PREMISES_ACT_2009.doc.pdf": ("Punjab Rented Premises Act 2009", "tenant"),
    "Punjab+Rented+Premises+Act+2009.doc.pdf": ("Punjab Rented Premises Act 2009 (Gazette)", "tenant"),
    "the_punjab_consumer_protection_act_2005-pdf.pdf": ("Punjab Consumer Protection Act 2005", "consumer"),
    "liv-of-2025-the-punjab-consumer-protection-amendment-act-2025-pdf.pdf": ("Punjab Consumer Protection Amendment Act 2025", "consumer"),
}

def extract_raw_text_from_pdf(filepath: str) -> str:
    """Extract full text from a PDF file using pdfplumber."""
    pages_text = []
    with pdfplumber.open(filepath) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                pages_text.append(t)
    return "\n".join(pages_text)

def chunk_legal_document(act_name: str, domain: str, text: str, file_slug: str) -> List[Dict[str, Any]]:
    """
    Splits legal text into structured section-level chunks with metadata.
    Regex searches for Section headers or numbered articles.
    """
    section_pattern = re.compile(
        r'(?=\n(?:Section|SECTION|\d+[\.\)])\s+[A-Z0-9\.\s\-\–\—\(\)]+)',
        re.MULTILINE
    )
    
    parts = section_pattern.split(text)
    chunks = []
    
    chunk_index = 0
    for part in parts:
        cleaned = part.strip()
        if not cleaned or len(cleaned) < 30:
            continue
            
        lines = cleaned.split('\n')
        first_line = lines[0].strip()
        
        sec_num_match = re.search(r'(?:Section|SECTION|\d+[\.\)])\s*(\d+[A-Z]?)', first_line, re.IGNORECASE)
        section_number = f"Section {sec_num_match.group(1)}" if sec_num_match else f"Part {chunk_index + 1}"
        
        if len(cleaned) > 1500:
            sub_parts = [cleaned[i:i+1200] for i in range(0, len(cleaned), 1000)]
            for sub_idx, sub_text in enumerate(sub_parts):
                chunk_index += 1
                chunks.append({
                    "chunk_id": f"{domain}_{file_slug}_{chunk_index}",
                    "act_name": act_name,
                    "section_number": f"{section_number} (pt {sub_idx+1})",
                    "section_title": first_line[:80],
                    "domain": domain,
                    "text": sub_text
                })
        else:
            chunk_index += 1
            chunks.append({
                "chunk_id": f"{domain}_{file_slug}_{chunk_index}",
                "act_name": act_name,
                "section_number": section_number,
                "section_title": first_line[:80],
                "domain": domain,
                "text": cleaned
            })
            
    return chunks

def process_sources_directory(sources_dir: str) -> List[Dict[str, Any]]:
    """Scans sources directory and subdirectories to parse all legal PDFs."""
    all_chunks = []
    
    for root, _, files in os.walk(sources_dir):
        for filename in files:
            if filename in DOMAIN_MAPPING:
                act_name, domain = DOMAIN_MAPPING[filename]
                filepath = os.path.join(root, filename)
                file_slug = re.sub(r'[^a-zA-Z0-9]', '_', filename).lower()[:20]
                print(f"Parsing: {filename} -> Act: {act_name} [{domain}]")
                try:
                    text = extract_raw_text_from_pdf(filepath)
                    chunks = chunk_legal_document(act_name, domain, text, file_slug)
                    print(f"  -> Generated {len(chunks)} chunks.")
                    all_chunks.extend(chunks)
                except Exception as e:
                    print(f"  [ERROR] Failed to parse {filename}: {e}")

                    
    return all_chunks
