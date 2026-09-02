'use client';

import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface QueryBoxProps {
  onSubmit: (query: string) => void;
  loading: boolean;
}

const SAMPLE_QUERIES = [
  "My landlord wants to evict me without notice. Can he do that?",
  "How do I file an FIR at a police station in Punjab?",
  "The shopkeeper sold me a defective phone with no refund, what can I do?",
  "اردو سوال: کیا مالک مکان بغیر نوٹس کے کرایہ دار کو نکال سکتا ہے؟"
];

export default function QueryBox({ onSubmit, loading }: QueryBoxProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSubmit(input.trim());
    }
  };

  const handleSelectSample = (sample: string) => {
    setInput(sample);
    if (!loading) {
      onSubmit(sample);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Punjab law (e.g. eviction, FIR, consumer rights)..."
            disabled={loading}
            className="w-full pl-4 pr-32 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-legal-800 focus:border-transparent text-base text-gray-900 placeholder-gray-400 bg-sand-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2.5 bg-legal-900 hover:bg-legal-800 disabled:bg-gray-300 text-white font-medium px-5 py-2.5 rounded-lg transition flex items-center gap-2 text-sm shadow-sm"
          >
            {loading ? (
              <span className="inline-block animate-pulse">Searching...</span>
            ) : (
              <>
                <Search className="w-4 h-4" /> Ask
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-4">
        <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-legal-700" /> Try sample questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(sample)}
              disabled={loading}
              className="text-xs bg-sand-100 hover:bg-legal-50 hover:text-legal-900 hover:border-legal-300 text-gray-700 px-3 py-1.5 rounded-lg border border-sand-200 transition text-left"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
