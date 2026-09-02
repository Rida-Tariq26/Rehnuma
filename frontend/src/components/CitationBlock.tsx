'use client';

import { useState } from 'react';
import { Citation } from '@/lib/api';
import { BookOpen, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface CitationBlockProps {
  citations: Citation[];
}

export default function CitationBlock({ citations }: CitationBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!citations || citations.length === 0) return null;

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-legal-800" />
        Retrieved Statutory Sources ({citations.length})
      </h4>

      <div className="space-y-3">
        {citations.map((cite, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-4 py-3 bg-sand-50 hover:bg-sand-100 flex items-center justify-between text-left transition"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-legal-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-legal-900 bg-legal-50 px-2 py-0.5 rounded border border-legal-200 mr-2">
                      {cite.section}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{cite.act}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-500">
                    Match: {Math.round(cite.similarity * 100)}%
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="p-4 bg-white border-t border-gray-100 text-xs text-gray-700 leading-relaxed font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {cite.passage}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
