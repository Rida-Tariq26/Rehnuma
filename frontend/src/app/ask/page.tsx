'use client';

import { useState } from 'react';
import QueryBox from '@/components/QueryBox';
import AnswerCard from '@/components/AnswerCard';
import RefusalCard from '@/components/RefusalCard';
import { askLegalQuestion, QueryResponse } from '@/lib/api';
import { Scale, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AskPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async (query: string) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const data = await askLegalQuestion(query);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while communicating with Rehnuma.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-semibold text-gray-500 hover:text-legal-900 flex items-center gap-1 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </Link>
        <span className="text-xs font-bold bg-legal-50 text-legal-900 px-2.5 py-1 rounded border border-legal-200 flex items-center gap-1">
          <Scale className="w-3.5 h-3.5 text-legal-700" /> Active Domain: Punjab Law MVP
        </span>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Ask Rehnuma Assistant
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Type your question in English or Urdu. Answers are strictly grounded in Punjab statutory text.
        </p>
      </div>

      <QueryBox onSubmit={handleQuery} loading={loading} />

      {loading && (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm text-center">
          <Loader2 className="w-8 h-8 text-legal-900 animate-spin mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 text-base">Retrieving Legal Provisions...</h3>
          <p className="text-xs text-gray-500 mt-1">
            Classifying domain, searching ChromaDB vector database, and evaluating confidence thresholds.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-6 rounded-2xl border border-red-200 text-red-900 text-sm">
          <strong>Backend Connection Error:</strong> {error}
          <p className="text-xs mt-2 text-red-700">
            Make sure the FastAPI backend service is running and reachable at your configured <code>NEXT_PUBLIC_API_URL</code> environment variable.
          </p>
        </div>
      )}

      {response && !loading && (
        <div>
          {response.answered ? (
            <AnswerCard response={response} />
          ) : (
            <RefusalCard reason={response.refusal_reason} domain={response.domain_detected} />
          )}
        </div>
      )}
    </div>
  );
}
