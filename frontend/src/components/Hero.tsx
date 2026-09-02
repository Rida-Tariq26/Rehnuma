import Link from 'next/link';
import { ArrowRight, BookOpen, ShieldCheck, Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-16 md:py-24 text-center max-w-4xl mx-auto px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-legal-50 border border-legal-200 text-legal-800 text-xs font-semibold uppercase tracking-wider mb-6">
        <ShieldCheck className="w-4 h-4 text-legal-700" />
        Zero-Hallucination Punjab Legal RAG
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
        Understand Your Legal Rights Under <span className="text-legal-900 underline decoration-legal-300 decoration-4 underline-offset-4">Punjab Law</span> in Simple Language
      </h1>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
        Rehnuma converts complex statutory acts into plain-language explanations. Grounded exclusively in official legislation with exact section citations.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/ask"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-legal-900 hover:bg-legal-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md transition text-base"
        >
          <Search className="w-5 h-5" />
          Ask a Question Now
          <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="#domains"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3.5 rounded-xl border border-gray-300 transition text-base"
        >
          <BookOpen className="w-5 h-5 text-legal-700" />
          Explore Supported Laws
        </a>
      </div>
    </section>
  );
}
