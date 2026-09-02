import { Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Scale className="w-5 h-5 text-legal-900" />
              <span className="font-bold text-gray-900 text-lg">Rehnuma (رہنما)</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI-powered legal information assistant designed to help people understand their rights under Punjab legislation in simple, accessible English and Urdu.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-3">Official Scope (MVP)</h4>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• Code of Criminal Procedure (CrPC 1898)</li>
              <li>• Pakistan Penal Code (PPC 1860)</li>
              <li>• Punjab Rented Premises Act 2009</li>
              <li>• Punjab Consumer Protection Act 2005 & 2025</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-3">Legal Disclaimer</h4>
            <p className="text-xs text-gray-500 leading-relaxed bg-sand-100 p-3 rounded-lg border border-sand-300">
              Rehnuma provides plain-language statutory explanations grounded in Punjab legislation. It does not provide formal legal advice, representation, or legal opinions. Consult a qualified advocate for official legal matters.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          Rehnuma Legal Tech Project © {new Date().getFullYear()} — Built with Grounded RAG Architecture
        </div>
      </div>
    </footer>
  );
}
