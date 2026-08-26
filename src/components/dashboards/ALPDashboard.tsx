import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { Train, CheckSquare } from 'lucide-react';

export const ALPDashboard: React.FC<{ onSelectTrain: (num: string) => void }> = ({ onSelectTrain }) => {
  const { trainPositions, staffList } = useRailway();
  const myStaff = staffList.find(s => s.role === 'assistant_loco_pilot') || staffList[1];
  const assignedTrain = trainPositions[0];

  const [checklist, setChecklist] = useState({
    brakePipePressure: true,
    feedPipePressure: true,
    headlightWorking: true,
    vcdFunctioning: true,
    cautiousOrdersSigned: true
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Train className="w-3.5 h-3.5 text-white" />
            <span>ASSISTANT LOCO PILOT (ALP) COCKPIT</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Assistant Loco Pilot Log & Signal Calling
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Officer: {myStaff.name} ({myStaff.employeeId}) • Train #{assignedTrain?.trainNumber} ({assignedTrain?.trainName})
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300">
          VCD 60s CYCLE: <strong className="text-white">NORMAL</strong>
        </div>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase mb-1">BRAKE PIPE (BP) PRESSURE</div>
          <div className="text-3xl font-black text-white">5.0 <span className="text-xs text-neutral-500 font-normal">kg/cm²</span></div>
          <div className="text-[11px] text-neutral-400 mt-2">Standard: 5.0 ± 0.1 kg/cm²</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase mb-1">FEED PIPE (FP) PRESSURE</div>
          <div className="text-3xl font-black text-white">6.0 <span className="text-xs text-neutral-500 font-normal">kg/cm²</span></div>
          <div className="text-[11px] text-neutral-400 mt-2">Standard: 6.0 ± 0.1 kg/cm²</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase mb-1">TELEMETRY SPEED</div>
          <div className="text-3xl font-black text-white">{assignedTrain?.speedKmph} <span className="text-xs text-neutral-500 font-normal">km/h</span></div>
          <div className="text-[11px] text-neutral-400 mt-2">Heading: {assignedTrain?.headingDegrees}° TRK</div>
        </div>
      </div>

      {/* Checklist */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-white" />
          <span>ALP Locomotive Pre-Departure Checklist</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <label className="p-3 rounded-xl bg-black border border-neutral-800 flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={checklist.brakePipePressure} onChange={() => setChecklist(p => ({ ...p, brakePipePressure: !p.brakePipePressure }))} className="w-4 h-4 text-white rounded bg-neutral-900 border-neutral-700" />
            <span className="text-neutral-200">Air Brake Continuity & BP 5.0 kg/cm² verified</span>
          </label>
          <label className="p-3 rounded-xl bg-black border border-neutral-800 flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={checklist.feedPipePressure} onChange={() => setChecklist(p => ({ ...p, feedPipePressure: !p.feedPipePressure }))} className="w-4 h-4 text-white rounded bg-neutral-900 border-neutral-700" />
            <span className="text-neutral-200">Feed Pipe 6.0 kg/cm² verified</span>
          </label>
          <label className="p-3 rounded-xl bg-black border border-neutral-800 flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={checklist.headlightWorking} onChange={() => setChecklist(p => ({ ...p, headlightWorking: !p.headlightWorking }))} className="w-4 h-4 text-white rounded bg-neutral-900 border-neutral-700" />
            <span className="text-neutral-200">Twin Beam Headlight & Flasher Light Tested</span>
          </label>
          <label className="p-3 rounded-xl bg-black border border-neutral-800 flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={checklist.vcdFunctioning} onChange={() => setChecklist(p => ({ ...p, vcdFunctioning: !p.vcdFunctioning }))} className="w-4 h-4 text-white rounded bg-neutral-900 border-neutral-700" />
            <span className="text-neutral-200">Vigilance Control Device (VCD) 60s Cycle Active</span>
          </label>
        </div>
      </div>
    </div>
  );
};
