import React from 'react';
import { Mail } from 'lucide-react';

interface FooterProps {
  onOpenInfoModal: (type: 'about' | 'status' | 'sources' | 'privacy' | 'terms' | 'accessibility') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfoModal }) => {
  return (
    <footer className="bg-[#040404] border-t border-neutral-900 px-6 py-5 text-neutral-400 text-xs font-sans mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="font-display font-bold text-white text-xs tracking-wider uppercase">
            AI SMART RAILWAY MANAGEMENT SYSTEM
          </div>
          <p className="text-neutral-500 text-[11px] font-mono mt-0.5">
            "Real-Time Railway Intelligence. Smarter Operations. Safer Journeys."
          </p>
        </div>

        {/* Center: Developer & Contact */}
        <div className="flex flex-col items-center text-center font-mono text-[11px] space-y-0.5">
          <div className="text-neutral-400">
            Developed by <strong className="text-white">MOHITH S</strong>
          </div>
          <a
            href="mailto:smohith002@gmail.com"
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition"
          >
            <Mail className="w-3 h-3 text-neutral-400" />
            <span>smohith002@gmail.com</span>
          </a>
        </div>

        {/* Right: Modals & Policy Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[11px] text-neutral-400">
          <button onClick={() => onOpenInfoModal('about')} className="hover:text-white transition">About</button>
          <span>•</span>
          <button onClick={() => onOpenInfoModal('status')} className="hover:text-white transition">System Status</button>
          <span>•</span>
          <button onClick={() => onOpenInfoModal('sources')} className="hover:text-white transition">Data Sources</button>
          <span>•</span>
          <button onClick={() => onOpenInfoModal('privacy')} className="hover:text-white transition">Privacy</button>
          <span>•</span>
          <button onClick={() => onOpenInfoModal('terms')} className="hover:text-white transition">Terms</button>
          <span>•</span>
          <button onClick={() => onOpenInfoModal('accessibility')} className="hover:text-white transition">Accessibility</button>
        </div>
      </div>
    </footer>
  );
};
