import React from 'react';
import { RailwayLogo } from '../common/RailwayLogo';
import { useRailway } from '../../context/RailwayContext';
import {
  Train,
  Map,
  Activity,
  ShieldCheck,
  Radio,
  ArrowRight,
  Sparkles,
  Users,
  Server,
  FileCheck2
} from 'lucide-react';

interface LandingHeroProps {
  onEnterSystem: () => void;
  onOpenMap: () => void;
  onOpenStatusModal: () => void;
  onOpenRoleSwitcher: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onEnterSystem,
  onOpenMap,
  onOpenStatusModal,
  onOpenRoleSwitcher
}) => {
  const { trainPositions, staffList, dataSourceHealth } = useRailway();

  return (
    <div className="relative min-h-[calc(100vh-140px)] rounded-3xl overflow-hidden border border-neutral-800 bg-black flex flex-col justify-between p-8 md:p-12 shadow-2xl">
      {/* Background Photographic Layer with Deep Dark Gradient */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-40 filter contrast-125 brightness-75"
        style={{ backgroundImage: `url('/assets/images/train_cinematic.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 z-0 pointer-events-none" />

      {/* Top Tag & National Badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <RailwayLogo variant="compact" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-neutral-800 text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-dot-live" />
            <span>CRIS TELEMETRY: ● LIVE ({dataSourceHealth.latencyMs}ms)</span>
          </div>
        </div>
      </div>

      {/* Hero Typography & Enterprise Action Group */}
      <div className="relative z-10 max-w-4xl my-auto py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-xs font-mono text-neutral-300 mb-4 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>PRODUCTION-GRADE RAILWAY OPERATIONS & AI INTELLIGENCE PLATFORM</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display tracking-tight text-white uppercase leading-tight mb-4">
          AI SMART RAILWAY <br />
          <span className="text-neutral-400 font-light">MANAGEMENT SYSTEM</span>
        </h1>

        <p className="text-base md:text-xl font-sans text-neutral-300 font-normal max-w-2xl leading-relaxed mb-8">
          "Real-Time Railway Intelligence. Smarter Operations. Safer Journeys."
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onEnterSystem}
            className="px-8 py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-widest transition shadow-lg flex items-center gap-2"
          >
            <span>ENTER COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenMap}
            className="px-6 py-3.5 rounded-xl bg-black/80 hover:bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs font-mono font-semibold uppercase tracking-wider transition flex items-center gap-2"
          >
            <Map className="w-4 h-4 text-neutral-400" />
            <span>VIEW LIVE NETWORK MAP</span>
          </button>

          <button
            onClick={onOpenStatusModal}
            className="px-5 py-3.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono transition"
          >
            SYSTEM STATUS
          </button>
        </div>
      </div>

      {/* Bottom KPI Strip */}
      <div className="relative z-10 pt-6 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-neutral-400">
        <div>
          <div className="text-[10px] text-neutral-500 uppercase">Active Monitored Trains</div>
          <div className="text-xl font-black text-white font-display mt-0.5">{trainPositions.length} EXPRESS UNITS</div>
        </div>

        <div>
          <div className="text-[10px] text-neutral-500 uppercase">Operational Hierarchy</div>
          <div className="text-xl font-black text-white font-display mt-0.5">23 ROLES & RBAC</div>
        </div>

        <div>
          <div className="text-[10px] text-neutral-500 uppercase">Mandatory Rest Rule</div>
          <div className="text-xl font-black text-white font-display mt-0.5">12H HOER ENFORCED</div>
        </div>

        <div>
          <div className="text-[10px] text-neutral-500 uppercase">Lead Architect</div>
          <div className="text-xl font-black text-white font-display mt-0.5">MOHITH S</div>
        </div>
      </div>
    </div>
  );
};
