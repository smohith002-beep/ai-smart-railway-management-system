import React from 'react';
import { Wrench, Zap, Radio, Train, Activity, Users, HeartPulse, ShieldCheck } from 'lucide-react';
import { useRailway } from '../../context/RailwayContext';

export const MaintenanceDashboards: React.FC<{ roleType: string }> = ({ roleType }) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Wrench className="w-3.5 h-3.5 text-white" />
            <span>ENGINEERING & ASSET MAINTENANCE DESK</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            {roleType === 'electrical_staff' ? 'OHE 25kV Traction & Substation Console' :
             roleType === 'signal_telecom' ? 'Electronic Interlocking & S&T Maintenance' :
             roleType === 'track_maintenance' ? 'Permanent Way (P-Way) Track Inspection' :
             'Rolling Stock & Carriage (C&W) Examination'}
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Authoritative Asset Management System • Safety Certificate Work Orders
          </p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
          Scheduled Asset Work Orders & Safety Permits
        </h2>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-black border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-white font-bold">WO-2026-891: Ultrasonic Rail Flaw Testing (USFD)</div>
              <div className="text-[11px] text-neutral-500">Section: Delhi-Kanpur Km 140/2-142/6 • Traffic Block Approved</div>
            </div>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px]">
              IN PROGRESS
            </span>
          </div>

          <div className="p-4 rounded-xl bg-black border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-white font-bold">WO-2026-892: 25kV AC Catenary Height & Stagger Measurement</div>
              <div className="text-[11px] text-neutral-500">Substation: NDLS Northern Grid • Power Block Clear</div>
            </div>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px]">
              COMPLETED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmergencyMedicalDashboard: React.FC = () => {
  const { incidents } = useRailway();
  const medicalIncidents = incidents.filter(i => i.category === 'MEDICAL' || i.severity === 'CRITICAL');

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <HeartPulse className="w-3.5 h-3.5 text-white" />
            <span>ACCIDENT RELIEF MEDICAL VAN (ARMV) & TRAUMA DESK</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Emergency Medical Operations Console
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Trauma Center Dispatch • Station Doctor On Call • Rapid ARMV Mobilization
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-neutral-500 uppercase text-[10px] mb-1">ARMV READINESS</div>
          <div className="text-2xl font-black text-white">READY (15m TARGET)</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-neutral-500 uppercase text-[10px] mb-1">STATION MEDICAL BEDS</div>
          <div className="text-2xl font-black text-white">12 AVAILABLE</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-neutral-500 uppercase text-[10px] mb-1">AMBULANCES ON STANDBY</div>
          <div className="text-2xl font-black text-white">4 UNITS</div>
        </div>
      </div>
    </div>
  );
};

export const HRStaffAdminDashboard: React.FC = () => {
  const { staffList } = useRailway();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Users className="w-3.5 h-3.5 text-white" />
            <span>CREW ROSTERING & HOER COMPLIANCE</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Staff Administration & 12-Hour Rest Monitor
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Statutory Hours of Employment and Period of Rest (HOER) Rules • Medical Fitness Records
          </p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-3 font-mono text-xs">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
          Staff Roster Summary ({staffList.length} Total Personnel)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-black border border-neutral-800">
            <div className="text-neutral-500 uppercase text-[10px]">On Duty</div>
            <div className="text-xl font-bold text-white mt-1">
              {staffList.filter(s => s.attendanceStatus === 'ON_DUTY').length}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-black border border-neutral-800">
            <div className="text-neutral-500 uppercase text-[10px]">Rest / Off Duty</div>
            <div className="text-xl font-bold text-white mt-1">
              {staffList.filter(s => s.attendanceStatus === 'OFF_DUTY').length}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-black border border-neutral-800">
            <div className="text-neutral-500 uppercase text-[10px]">Leave</div>
            <div className="text-xl font-bold text-white mt-1">
              {staffList.filter(s => s.attendanceStatus === 'LEAVE' || s.attendanceStatus === 'SICK_LEAVE').length}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-black border border-neutral-800">
            <div className="text-neutral-500 uppercase text-[10px]">HOER Violations</div>
            <div className="text-xl font-bold text-white mt-1">0 (100% Compliant)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
