import Link from 'next/link';
import { Scale, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-legal-900 flex items-center justify-center text-white shadow-sm group-hover:bg-legal-800 transition">
            <Scale className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
              Rehnuma <span className="text-sm font-semibold text-legal-700 bg-legal-50 px-2 py-0.5 rounded border border-legal-200">رہنما</span>
            </span>
            <span className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider">
              Punjab Legal Information Assistant
            </span>
          </div>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/#domains" className="text-sm font-medium text-gray-600 hover:text-legal-900 transition">
            Legal Domains
          </Link>
          <Link href="/#trust" className="text-sm font-medium text-gray-600 hover:text-legal-900 transition flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-legal-700" /> Grounded RAG
          </Link>
          <Link
            href="/ask"
            className="text-sm font-medium bg-legal-900 text-white px-4 py-2 rounded-lg hover:bg-legal-800 transition shadow-sm"
          >
            Launch Assistant
          </Link>
        </nav>
      </div>
    </header>
  );
}
