# Rehnuma (رہنما) — AI-Powered Punjab Legal Information Assistant

> **Grounded, transparent, and citation-backed AI assistant designed to help citizens understand their statutory rights under Punjab law in plain English and Urdu.**

---

## 📌 Overview & Purpose

Many citizens in Punjab find official statutory legislation difficult to read, interpret, and navigate. Traditional AI search models often **hallucinate** legal provisions or summarize unverified blogs and commentaries.

**Rehnuma** bridges this gap by converting complex statutory language into clear explanations while prioritizing **accuracy over confidence**. Every single answer is strictly grounded in official retrieved statutory text (Tier 1 sources). If the system cannot find sufficient supporting evidence in the legal corpus, it explicitly **refuses to answer** rather than fabricating legal advice.

---

## ✨ Key Features

- ⚖️ **Zero-Hallucination RAG Architecture**: Answers are generated strictly from retrieved statutory passages. No outside memory or unofficial sources used.
- 📌 **Exact Citation Enforcement**: Every point cites the exact **Act Name** and **Section Number** (e.g., `[Punjab Rented Premises Act 2009, Section 15]`).
- 🛡️ **Confidence-Based Refusal Engine**: Enforces cosine similarity thresholds on retrieved legal text. If confidence is low, generation is halted with an explicit safety refusal.
- 🌐 **Bilingual Support (English & Urdu)**: Accepts user queries in plain English or Urdu (`اردو`) and responds in simple, accessible language.
- 🔍 **Expandable Source Passages**: Transparent UI lets users inspect the raw statutory text used to generate each response.
- 🎯 **Domain-Bound Retrieval**: Zero-shot classifier routes queries to specific vector stores (`fir_corpus`, `tenant_corpus`, `consumer_corpus`).

---

## 🏛️ MVP Legal Scope & Official Sources

Rehnuma MVP covers **Punjab provincial law** across three core legal domains, built exclusively from official statutory PDFs:

| Legal Domain | Key Topics Covered | Official Statutory Documents |
|---|---|---|
| **FIR & Police Complaints** | FIR registration procedures, officer duties, rights upon arrest, bail rules | • Code of Criminal Procedure (CrPC 1898)<br>• Pakistan Penal Code (PPC 1860) |
| **Tenant Rights & Eviction** | Lawful eviction notice periods, rent escalation limits, security deposits | • Punjab Rented Premises Act 2009 |
| **Consumer Protection** | Defective products, false warranties, seller duties, Consumer Court claims | • Punjab Consumer Protection Act 2005<br>• Consumer Protection Amendment Act 2025 |

---

## 🏗️ System Architecture

```
                       ┌─────────────────────────┐
                       │       User Query        │
                       │   (English or Urdu)     │
                       └────────────┬────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │    Domain Classifier    │
                       │ (FIR / Tenant / Consumer)│
                       └────────────┬────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │  ChromaDB Vector Store  │
                       │ (Semantic Search Top-K) │
                       └────────────┬────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │   Confidence Evaluator  │
                       │ (Similarity Threshold)  │
                       └─────┬──────────────┬────┘
                             │              │
                    Sufficient Evidence?    Insufficient Evidence?
                             │              │
                             ▼              ▼
           ┌──────────────────┐    ┌─────────────────────────┐
           │ Gemini 1.5 Flash │    │  Refusal Engine Output  │
           │  (Grounded Prompt)│   │ ("Cannot answer with    │
           └────────┬─────────┘    │   confidence")          │
                    │              └─────────────────────────┘
                    ▼
   ┌────────────────────────────────┐
   │ Plain-Language Answer          │
   │ + Exact Section Citations      │
   │ + Supporting Source Passages   │
   └────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Component | Technology Used |
|---|---|---|
| **Frontend** | User Interface | Next.js 14 (App Router), Tailwind CSS, Lucide Icons |
| **Backend API** | REST Server | FastAPI, Pydantic, Uvicorn |
| **Vector DB** | Vector Store | ChromaDB (Local Persistent Storage) |
| **LLM & Embeddings** | Generation & Classification | Google Gemini 1.5 Flash (`google-generativeai`) |
| **Document Parsing** | Ingestion Pipeline | `pdfplumber`, `pypdf`, Regex Section Chunker |

---

## 📁 Project Structure

```
Rehnuma/
├── DEPLOYMENT.md                     # Step-by-step Vercel & Render deployment guide
├── Sources/                          # Raw official legal PDFs (CrPC, PPC, Tenant, Consumer)
├── backend/                          # FastAPI Backend & RAG Engine
│   ├── Dockerfile                    # Container configuration for Render/Railway
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Environment configuration template
│   ├── ingest/
│   │   ├── parser.py                 # PDF section parser & structured chunker
│   │   ├── embedder.py               # ChromaDB collection population helper
│   │   └── run_ingestion.py          # One-click CLI data ingestion script
│   ├── retrieval/
│   │   ├── classifier.py             # Zero-shot / rule-based bilingual domain classifier
│   │   ├── retriever.py              # Semantic vector retriever with cosine scoring
│   │   └── confidence.py             # Hallucination containment refusal logic
│   ├── generation/
│   │   ├── prompts.py                # Strict system prompts (English & Urdu grounding)
│   │   └── generator.py              # Gemini 1.5 Flash grounded response engine
│   └── api/
│       ├── main.py                   # FastAPI application entrypoint with CORS
│       ├── routes.py                 # REST routes (/ask, /domains, /health)
│       └── schemas.py                # Pydantic request/response schemas
└── frontend/                         # Next.js 14 Frontend Web Application
    ├── package.json                  # React 18, Next 14, Tailwind CSS dependencies
    ├── tailwind.config.ts            # Custom legal green (#1B4332) & warm sand theme
    └── src/
        ├── app/
        │   ├── page.tsx              # Landing Page (Hero, Domains, Trust Pillars)
        │   └── ask/page.tsx          # Interactive Legal Assistant Page
        ├── components/
        │   ├── Navbar.tsx            # Navigation header
        │   ├── Hero.tsx              # Hero landing section
        │   ├── DomainCards.tsx       # Domain showcase cards
        │   ├── TrustSection.tsx      # RAG reliability & refusal explanation
        │   ├── QueryBox.tsx          # Query input with English & Urdu prompt chips
        │   ├── AnswerCard.tsx        # Grounded response & domain badge
        │   ├── CitationBlock.tsx     # Collapsible statutory source passages
        │   └── RefusalCard.tsx       # Styled refusal card when evidence is low
        └── lib/
            └── api.ts                # Frontend API client
```

---

## ⚡ Quick Start Guide (Local Setup)

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & `npm`
- **Google Gemini API Key** (Get free key from [Google AI Studio](https://aistudio.google.com/))

### 1. Set Up Backend & Populate Vector Database

```bash
# Clone repository
git clone https://github.com/yourusername/Rehnuma.git
cd Rehnuma/backend

# Create virtual environment & install dependencies
python -m venv venv
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate
pip install -r requirements.txt

# Create .env file and set your API key
cp .env.example .env
# Edit .env and insert GOOGLE_API_KEY=your_key_here

# Run ingestion pipeline (Indexes 1,640 statutory sections into ChromaDB)
python ingest/run_ingestion.py

# Start FastAPI server
uvicorn api.main:app --reload --port 8000
```
*API interactive docs will be live at `http://localhost:8000/docs`.*

### 2. Set Up Frontend Web App

```bash
# In a new terminal window:
cd Rehnuma/frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
*Open `http://localhost:3000` in your browser to start using Rehnuma!*

---

## 🧪 Sample Verification Queries

| Query | Expected Domain | Behavior |
|---|---|---|
| *"My landlord wants to evict me without notice. Can he do that?"* | `tenant` | Cites **Punjab Rented Premises Act 2009 Section 15** |
| *"How do I file an FIR at a police station?"* | `fir` | Cites **CrPC 1898 Section 154** |
| *"The shopkeeper sold me a defective phone with no refund."* | `consumer` | Cites **Punjab Consumer Protection Act 2005** |
| *"اردو سوال: کیا مالک مکان بغیر نوٹس کے بے دخل کر سکتا ہے؟"* | `tenant` | Responds in clear simple Urdu with section citations |
| *"What is the corporate tax rate for IT companies?"* | `unknown` | Refuses to answer (`answered: false`) |

---

## 🚀 Deployment Guide

Rehnuma is designed for zero-cost cloud deployment:
- **Frontend**: Deploy to **Vercel** with `NEXT_PUBLIC_API_URL` environment variable.
- **Backend**: Deploy to **Render** / **Railway** using the included [`Dockerfile`](file:///c:/Users/DELL/Documents/Rehnuma/backend/Dockerfile).

Refer to [`DEPLOYMENT.md`](file:///c:/Users/DELL/Documents/Rehnuma/DEPLOYMENT.md) for step-by-step deployment instructions.

---

## ⚖️ Legal Disclaimer

*Rehnuma is an informational AI portfolio project designed to convert official statutory legislation into plain-language explanations. It does not provide legal advice, representation, or legal opinions. For official legal matters, users should consult a qualified legal advocate.*
