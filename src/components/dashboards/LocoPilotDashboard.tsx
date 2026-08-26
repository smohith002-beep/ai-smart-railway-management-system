import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { useAuth } from '../../context/AuthContext';
import {
  Train,
  Gauge,
  Compass,
  AlertTriangle,
  Clock,
  Volume2,
  Radio,
  FileText,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const LocoPilotDashboard: React.FC<{ onSelectTrain: (num: string) => void }> = ({ onSelectTrain }) => {
  const { currentUser } = useAuth();
  const {
    trainPositions,
    staffList,
    duties,
    startStaffDuty,
    endStaffDuty,
    playHorn,
    alerts
  } = useRailway();

  const myStaff = staffList.find(s => s.role === 'loco_pilot') || staffList[0];
  const myDuty = duties.find(d => d.staffId === myStaff.id && d.status === 'IN_PROGRESS') || duties[0];
  const assignedTrain = trainPositions.find(p => p.trainNumber === (myDuty?.trainNumber || '22436')) || trainPositions[0];

  const [signalCalled, setSignalCalled] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Cockpit Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Train className="w-3.5 h-3.5 text-white" />
            <span>LOCOMOTIVE CAB TELEMETRY • TRAIN #{assignedTrain?.trainNumber}</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Loco Pilot Cab Dashboard
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Pilot: {myStaff.name} ({myStaff.employeeId}) • Locomotive: WAP-7 / VB-16 Propulsion
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {myStaff.attendanceStatus !== 'ON_DUTY' ? (
            <button
              onClick={() => startStaffDuty(myStaff.id)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold uppercase transition"
            >
              CAB SIGN-ON
            </button>
          ) : (
            <button
              onClick={() => endStaffDuty(myStaff.id)}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold transition"
            >
              CAB SIGN-OFF
            </button>
          )}

          <button
            onClick={playHorn}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold flex items-center gap-1.5 transition"
            title="Sound Locomotive Air Horn"
          >
            <Volume2 className="w-4 h-4 text-white" />
            <span>AIR HORN</span>
          </button>
        </div>
      </div>

      {/* Cockpit Instrument Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 font-mono">
        {/* Gauge 1: Speedometer */}
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between items-center text-center">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
            <Gauge className="w-4 h-4 text-white" />
            <span>DIGITAL SPEEDOMETER</span>
          </div>
          <div className="my-2">
            <div className="text-5xl font-black text-white font-mono tracking-tight">
              {assignedTrain?.speedKmph ?? 130}
            </div>
            <div className="text-[10px] text-neutral-500 mt-1 uppercase">MAX LIMIT: 130 KM/H</div>
          </div>
          <div className="w-full bg-black rounded-full h-2 overflow-hidden border border-neutral-800">
            <div
              className="bg-white h-full transition-all duration-500"
              style={{ width: `${Math.min(100, ((assignedTrain?.speedKmph ?? 130) / 130) * 100)}%` }}
            />
          </div>
        </div>

        {/* Gauge 2: Signal Aspect */}
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between items-center text-center">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
            <Radio className="w-4 h-4 text-white" />
            <span>CAB SIGNALING ASPECT</span>
          </div>
          <div className="my-2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center">
              CLEAR
            </div>
            <div className="text-xs text-neutral-300 font-bold mt-2">GREEN (PROCEED)</div>
          </div>
          <button
            onClick={() => setSignalCalled(true)}
            className={`w-full py-1.5 px-3 rounded-lg text-xs transition ${
              signalCalled ? 'bg-neutral-900 text-white border border-neutral-700' : 'bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400'
            }`}
          >
            {signalCalled ? '✓ SIGNAL CONFIRMED' : 'CALL SIGNAL ASPECT'}
          </button>
        </div>

        {/* Gauge 3: Section HUD */}
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between text-left">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
            <Compass className="w-4 h-4 text-white" />
            <span>BLOCK SECTION HUD</span>
          </div>
          <div className="space-y-1.5 my-2 text-xs">
            <div className="text-neutral-500 text-[10px] uppercase">Next Station:</div>
            <div className="text-white font-bold text-sm truncate">{assignedTrain?.nextStationName}</div>
            <div className="text-neutral-400 text-[11px] truncate">{assignedTrain?.currentTrackSection}</div>
          </div>
          <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
            Delay: <strong className="text-white">{assignedTrain?.delayMinutes === 0 ? 'On Time' : `+${assignedTrain?.delayMinutes}m`}</strong>
          </div>
        </div>

        {/* Gauge 4: 25kV Traction */}
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between text-left">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
            <Zap className="w-4 h-4 text-white" />
            <span>OHE 25kV TRACTION</span>
          </div>
          <div className="my-2 space-y-1">
            <div className="text-2xl font-black text-white font-mono">25.4 kV</div>
            <div className="text-xs text-neutral-400">PANTOGRAPH: RAISED</div>
          </div>
          <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
            Current Draw: 120 Amps
          </div>
        </div>
      </div>

      {/* Caution Orders */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-neutral-400" />
          <span>Active Caution Orders & Speed Restrictions (TSR T/409)</span>
        </h2>

        <div className="space-y-2 font-mono text-xs">
          {alerts.map(al => (
            <div key={al.id} className="p-3.5 rounded-xl bg-black border border-neutral-800">
              <div className="flex items-center justify-between text-white font-bold mb-1">
                <span>CAUTION ORDER: {al.title}</span>
                <span className="text-neutral-500 text-[10px]">{new Date(al.publishedAt).toLocaleTimeString()}</span>
              </div>
              <p className="text-neutral-400 font-sans text-xs">{al.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
