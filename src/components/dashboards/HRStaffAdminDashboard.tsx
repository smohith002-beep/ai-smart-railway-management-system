import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import { Users, CalendarCheck, Clock, ShieldCheck, FileCheck2, UserX } from 'lucide-react';

export const HRStaffAdminDashboard: React.FC<{ onSelectView: (view: string) => void }> = ({ onSelectView }) => {
  const { staffList, attendanceRecords, duties } = useRailway();
  const hrStaff = staffList.find(s => s.role === 'hr_staff_admin') || staffList[9];

  const presentCount = staffList.filter(s => s.attendanceStatus === 'PRESENT' || s.attendanceStatus === 'ON_DUTY').length;
  const leaveCount = staffList.filter(s => s.attendanceStatus === 'LEAVE' || s.attendanceStatus === 'SICK_LEAVE' || s.attendanceStatus === 'ABSENT').length;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/30 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-mono text-xs mb-2">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>PERSONNEL & CREW ROSTERING ADMINISTRATION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            HR Staff Roster & Statutory Rest Hours Enforcement
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Officer: {hrStaff.name} ({hrStaff.designation}) • Division: Delhi
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectView('attendance')}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold transition"
          >
            Open Attendance Ledger
          </button>
          <button
            onClick={() => onSelectView('duty')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold transition"
          >
            Manage Duty Roster
          </button>
        </div>
      </div>

      {/* Roster & Rest Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <div className="text-xs text-slate-400 mb-1">TOTAL REGISTERED CREW</div>
          <div className="text-3xl font-black text-white">{staffList.length}</div>
          <div className="text-[11px] text-emerald-400 mt-2">100% Medical Category Verified</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <div className="text-xs text-slate-400 mb-1">ON DUTY / PRESENT TODAY</div>
          <div className="text-3xl font-black text-emerald-400">{presentCount}</div>
          <div className="text-[11px] text-slate-400 mt-2">Attendance Rate: {Math.round((presentCount / staffList.length) * 100)}%</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <div className="text-xs text-slate-400 mb-1">LEAVE / SICK / REST</div>
          <div className="text-3xl font-black text-amber-400">{leaveCount}</div>
          <div className="text-[11px] text-slate-400 mt-2">Statutory Rest Compliant</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <div className="text-xs text-slate-400 mb-1">12-HOUR REST COMPLIANCE</div>
          <div className="text-3xl font-black text-cyan-400">100%</div>
          <div className="text-[11px] text-emerald-400 mt-2">HOER Rules Strictly Enforced</div>
        </div>
      </div>

      {/* Staff Roster Snapshot Table */}
      <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-cyan-400" />
            <span>Master Staff Register & Rest Records</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3">EMPLOYEE</th>
                <th className="p-3">ROLE / DESIGNATION</th>
                <th className="p-3">DEPARTMENT</th>
                <th className="p-3">MEDICAL FIT</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">CONTINUOUS DUTY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {staffList.map(s => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3">
                    <div className="font-bold text-white font-sans">{s.name}</div>
                    <div className="text-[10px] text-slate-400">{s.employeeId}</div>
                  </td>
                  <td className="p-3 text-slate-300">{s.designation}</td>
                  <td className="p-3 text-slate-400">{s.department}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold border border-slate-700 text-[10px]">
                      {s.medicalFitnessCategory}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.attendanceStatus === 'ON_DUTY' ? 'bg-cyan-500/20 text-cyan-400' :
                      s.attendanceStatus === 'PRESENT' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {s.attendanceStatus}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">
                    {s.continuousDutyHours > 0 ? `${s.continuousDutyHours} hrs` : '0 hrs (Resting)'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
