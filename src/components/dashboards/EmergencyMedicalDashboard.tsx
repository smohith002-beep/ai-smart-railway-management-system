import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import { HeartPulse, Ambulance, Radio, AlertOctagon, UserCheck, Shield } from 'lucide-react';

export const EmergencyMedicalDashboard: React.FC = () => {
  const { staffList, incidents, reportIncident } = useRailway();
  const medicalStaff = staffList.find(s => s.role === 'medical_emergency_staff') || staffList[8];

  const handleDeployAmbulance = () => {
    reportIncident({
      category: 'MEDICAL',
      severity: 'HIGH',
      status: 'REPORTED',
      stationCode: 'NDLS',
      description: '[MEDICAL RELIEF] Divisional Ambulance & Medical First Responder dispatched to Platform 1.',
      reportedBy: `${medicalStaff.name} (Medical Officer)`
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/30 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950 border border-rose-500/40 text-rose-300 font-mono text-xs mb-2">
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
            <span>ACCIDENT RELIEF MEDICAL VAN (ARMV) & TRAUMA TRIAGE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            Divisional Medical Emergency & Casualty Response
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Officer: {medicalStaff.name} ({medicalStaff.designation}) • Medical Division: Delhi
          </p>
        </div>

        <button
          onClick={handleDeployAmbulance}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-glow-red flex items-center gap-1.5 transition"
        >
          <Ambulance className="w-4 h-4" />
          <span>DISPATCH AMBULANCE & ARMV</span>
        </button>
      </div>

      {/* ARMV & Trauma Readiness Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <div className="text-xs text-slate-400 mb-1">ARMV SCALE-I TRAIN READINESS</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">STANDBY (20 MIN DISPATCH)</div>
          <div className="text-[11px] text-slate-400 mt-2">Stationed at NDLS ARMV Siding</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <div className="text-xs text-slate-400 mb-1">FIRST-AID TRAUMA KITS</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">100% STOCKED & VERIFIED</div>
          <div className="text-[11px] text-slate-400 mt-2">Oxygen Cylinders & Defibrillators Ready</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <div className="text-xs text-slate-400 mb-1">ON-CALL SURGEONS & NURSES</div>
          <div className="text-2xl font-black text-white mt-1">8 ON ACTIVE ROSTER</div>
          <div className="text-[11px] text-emerald-400 mt-2">Divisional Railway Hospital</div>
        </div>
      </div>
    </div>
  );
};
