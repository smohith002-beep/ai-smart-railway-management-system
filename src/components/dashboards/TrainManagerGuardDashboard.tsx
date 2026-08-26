import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { Train, AlertTriangle } from 'lucide-react';

export const TrainManagerGuardDashboard: React.FC<{ onSelectTrain: (num: string) => void }> = ({ onSelectTrain }) => {
  const { staffList, trainPositions, reportIncident } = useRailway();
  const myStaff = staffList.find(s => s.role === 'train_manager_guard') || staffList[2];
  const assignedTrain = trainPositions[0];

  const handleTriggerEmergencyBrake = () => {
    reportIncident({
      category: 'OPERATIONAL_EMERGENCY',
      severity: 'CRITICAL',
      status: 'REPORTED',
      trainNumber: assignedTrain.trainNumber,
      section: assignedTrain.currentTrackSection,
      description: `[GUARD EMERGENCY] Train Manager initiated Emergency Brake application on Train ${assignedTrain.trainNumber}. Tail-end pressure drop.`,
      reportedBy: `${myStaff.name} (Train Manager)`
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Train className="w-3.5 h-3.5 text-white" />
            <span>BRAKE-VAN TELEMETRY CONSOLE • REAR GUARD CABIN</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Train Manager / Guard Rear Telemetry Desk
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Train Manager: {myStaff.name} ({myStaff.employeeId}) • Train #{assignedTrain?.trainNumber} ({assignedTrain?.trainName})
          </p>
        </div>

        <button
          onClick={handleTriggerEmergencyBrake}
          className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-red-500/60 text-red-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition"
        >
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>GUARD EMERGENCY BRAKE (EOTTS)</span>
        </button>
      </div>

      {/* Brake-Van Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase mb-1">REAR BRAKE-VAN (BV) PRESSURE</div>
          <div className="text-3xl font-black text-white">4.8 <span className="text-xs text-neutral-500 font-normal">kg/cm²</span></div>
          <div className="text-[11px] text-neutral-400 mt-2">Brake Continuity: PERFECT</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase mb-1">LED TAIL LAMP / LV BOARD</div>
          <div className="text-2xl font-black text-white mt-1">LIT & FLASHING</div>
          <div className="text-[11px] text-neutral-400 mt-2">Last Vehicle Board: Attached</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase mb-1">GPS SPEED FROM CABIN</div>
          <div className="text-3xl font-black text-white">{assignedTrain?.speedKmph} <span className="text-xs text-neutral-500 font-normal">km/h</span></div>
          <div className="text-[11px] text-neutral-400 mt-2">16 Coaches (450m)</div>
        </div>
      </div>
    </div>
  );
};
