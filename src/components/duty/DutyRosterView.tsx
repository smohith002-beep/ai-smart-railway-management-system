import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { useAuth } from '../../context/AuthContext';
import { DutyAssignment, StaffMember, DutyChangeLog, CrewConflictResult } from '../../types/railway';
import {
  CalendarDays,
  Train,
  AlertTriangle,
  UserCheck,
  RotateCcw,
  CheckCircle2,
  Clock,
  ShieldAlert,
  X,
  ArrowRight
} from 'lucide-react';

export const DutyRosterView: React.FC = () => {
  const { duties, staffList, replaceCrewMember, dutyChanges } = useRailway();
  const { currentUser } = useAuth();

  const [selectedDutyForChange, setSelectedDutyForChange] = useState<DutyAssignment | null>(null);
  const [replacementStaffId, setReplacementStaffId] = useState<string>('');
  const [changeReason, setChangeReason] = useState<string>('');
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'roster' | 'history'>('roster');

  const handleOpenReassignModal = (duty: DutyAssignment) => {
    setSelectedDutyForChange(duty);
    setReplacementStaffId('');
    setChangeReason('');
    setConflictWarning(null);
  };

  const handleExecuteReassignment = () => {
    if (!selectedDutyForChange || !replacementStaffId) return;

    const result = replaceCrewMember({
      dutyId: selectedDutyForChange.id,
      replacementStaffId,
      reason: changeReason || 'Operational replacement'
    });

    if (!result.success) {
      setConflictWarning(result.message);
    } else {
      setSelectedDutyForChange(null);
      setConflictWarning(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <CalendarDays className="w-3.5 h-3.5 text-white" />
            <span>REAL-TIME CREW ROSTER & AUTOMATED CONFLICT ENGINE</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Duty Assignment & Crew Conflict Management
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Enforcing statutory 12-hour rest rule (HOER) • Locomotive competency verification
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-black border border-neutral-800 font-mono text-xs">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'roster'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Active Duties ({duties.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'history'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Replacement Audit ({dutyChanges.length})
          </button>
        </div>
      </div>

      {activeTab === 'roster' ? (
        /* Active Duty Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {duties.map(duty => {
            const staff = staffList.find(s => s.id === duty.staffId);
            const isRunning = duty.status === 'IN_PROGRESS';

            return (
              <div
                key={duty.id}
                className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 flex flex-col justify-between shadow-sm space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Train className="w-4 h-4 text-white" />
                      <span className="font-bold text-white text-sm">Train #{duty.trainNumber}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isRunning ? 'bg-neutral-900 text-neutral-200 border-neutral-700' : 'bg-black text-neutral-400 border-neutral-800'
                    }`}>
                      {duty.status}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black border border-neutral-800 mb-3 space-y-1">
                    <div className="text-neutral-500 text-[10px] uppercase">Assigned Staff:</div>
                    <div className="text-white font-bold font-sans text-sm">{staff?.name}</div>
                    <div className="text-neutral-400 text-[11px]">{staff?.designation} • ID: {staff?.employeeId}</div>
                  </div>

                  <div className="space-y-1 text-neutral-400 text-[11px]">
                    <div className="flex justify-between">
                      <span>SHIFT START:</span>
                      <span className="text-neutral-200">{new Date(duty.startTime).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SHIFT END:</span>
                      <span className="text-neutral-200">{new Date(duty.endTime).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-900">
                  <button
                    onClick={() => handleOpenReassignModal(duty)}
                    className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-white hover:text-black border border-neutral-700 text-white font-bold uppercase transition flex items-center justify-center gap-2 text-[11px]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Change / Replace Crew</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Permanent Replacement Audit Ledger */
        <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
                <tr>
                  <th className="p-3">DUTY ID</th>
                  <th className="p-3">REPLACED STAFF</th>
                  <th className="p-3">ASSIGNED REPLACEMENT</th>
                  <th className="p-3">REASON</th>
                  <th className="p-3">SUPERVISOR</th>
                  <th className="p-3">TIMESTAMP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {dutyChanges.map(change => (
                  <tr key={change.id} className="hover:bg-neutral-950 transition">
                    <td className="p-3 text-neutral-400">{change.dutyId}</td>
                    <td className="p-3 font-sans text-neutral-400">{change.originalStaffName}</td>
                    <td className="p-3 font-sans text-white font-bold">{change.replacementStaffName}</td>
                    <td className="p-3 text-neutral-300">{change.reason}</td>
                    <td className="p-3 text-neutral-400">{change.changedBy}</td>
                    <td className="p-3 text-neutral-500">{new Date(change.changedAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Replacement Modal with Automated Conflict Warning */}
      {selectedDutyForChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white uppercase text-sm">Crew Reassignment Console</h3>
              <button onClick={() => setSelectedDutyForChange(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Target Duty:</label>
              <div className="p-3 rounded-xl bg-black border border-neutral-800 text-white font-semibold">
                Train #{selectedDutyForChange.trainNumber} ({selectedDutyForChange.dutyType})
              </div>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Select Replacement Staff:</label>
              <select
                value={replacementStaffId}
                onChange={e => setReplacementStaffId(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              >
                <option value="">-- Choose Candidate --</option>
                {staffList.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.designation} - {s.attendanceStatus})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Official Replacement Reason:</label>
              <textarea
                value={changeReason}
                onChange={e => setChangeReason(e.target.value)}
                placeholder="Reason for crew replacement..."
                rows={2}
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              />
            </div>

            {/* Conflict Warning Box */}
            {conflictWarning && (
              <div className="p-4 rounded-xl bg-black border-2 border-red-500/80 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold uppercase text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>DUTY CONFLICT / WARNING</span>
                </div>
                <p className="text-neutral-300 font-sans text-xs">{conflictWarning}</p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                onClick={() => setSelectedDutyForChange(null)}
                className="px-4 py-2 rounded-xl bg-black border border-neutral-800 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteReassignment}
                className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold uppercase"
              >
                Validate & Commit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
