import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import { Shield, Eye, AlertOctagon } from 'lucide-react';

export const RPFSecurityDashboard: React.FC = () => {
  const { incidents, trainPositions } = useRailway();
  const securityIncidents = incidents.filter(i => i.category === 'SECURITY_ISSUE');

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Shield className="w-3.5 h-3.5 text-white" />
            <span>RAILWAY PROTECTION FORCE (RPF) COMMAND DESK</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            RPF Security & AI Video Surveillance Console
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Station Perimeter CCTV Analytics • Train Escort Deployment • Helpline 139 Integration
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300">
          ESCORTED TRAINS: <strong className="text-white">100% EXPRESS ROSTER</strong>
        </div>
      </div>

      {/* CCTV Feeds Grid */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <Eye className="w-4 h-4 text-white" />
          <span>Station Perimeter AI Video Feeds</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['CAM-01: NDLS Main Concourse', 'CAM-02: PF 1-2 Foot Over Bridge', 'CAM-03: CNB Yard Outer Signal'].map((cam, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-black border border-neutral-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">{cam}</span>
                <span className="flex items-center gap-1 text-[10px] text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-live" />
                  <span>AI ACTIVE</span>
                </span>
              </div>
              <div className="h-32 bg-neutral-950 rounded-lg flex items-center justify-center border border-neutral-900 text-neutral-600 text-[11px]">
                [ENCRYPTED RPF CCTV STREAM // NO ANOMALIES]
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
