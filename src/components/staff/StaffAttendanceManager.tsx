import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { useAuth } from '../../context/AuthContext';
import { AttendanceStatus } from '../../types/railway';
import {
  UserCheck,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  FileEdit,
  ShieldCheck,
  X
} from 'lucide-react';

export const StaffAttendanceManager: React.FC = () => {
  const { staffList, signInStaff, signOutStaff, correctAttendance, attendanceRecords } = useRailway();
  const { currentUser } = useAuth();

  const [search, setSearch] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<AttendanceStatus>('PRESENT');
  const [supervisorNote, setSupervisorNote] = useState<string>('');

  const departments = ['ALL', 'Operations', 'Running Crew', 'Commercial', 'Security', 'Engineering', 'Safety & Medical', 'Administration'];

  const filteredStaff = staffList.filter(staff => {
    if (selectedDept !== 'ALL' && staff.department !== selectedDept) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        staff.name.toLowerCase().includes(q) ||
        staff.employeeId.toLowerCase().includes(q) ||
        staff.designation.toLowerCase().includes(q) ||
        staff.stationCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSaveCorrection = () => {
    if (!editingStaffId) return;
    const record = attendanceRecords.find(r => r.staffId === editingStaffId);
    if (record) {
      correctAttendance(record.id, newStatus, supervisorNote || 'Supervisor manual adjustment');
    }
    setEditingStaffId(null);
    setSupervisorNote('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>PERMANENT DATABASE-BACKED ATTENDANCE SYSTEM</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Staff Attendance & Biometric Geofence Registry
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Real PostgreSQL transaction ledger • Geofenced GPS punch verification • RLS Security
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300">
          LOGGED SUPERVISOR: <strong className="text-white">{currentUser.name}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search staff by name, ID (e.g. IR-2024-101) or station..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition ${
                  selectedDept === dept
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-black text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3">STAFF NAME & ID</th>
                <th className="p-3">ROLE & DEPT</th>
                <th className="p-3">BASE STATION</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">GEOFENCE STATUS</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filteredStaff.map(staff => {
                const isOnDuty = staff.attendanceStatus === 'ON_DUTY' || staff.attendanceStatus === 'PRESENT';

                return (
                  <tr key={staff.id} className="hover:bg-neutral-950 transition">
                    <td className="p-3">
                      <div className="font-bold text-white font-sans text-xs">{staff.name}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{staff.employeeId}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-neutral-200">{staff.designation}</div>
                      <div className="text-[10px] text-neutral-500">{staff.department}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-black text-neutral-300 font-bold border border-neutral-800">
                        {staff.stationCode}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-neutral-900 text-neutral-200 border-neutral-700">
                        {staff.attendanceStatus}
                      </span>
                    </td>
                    <td className="p-3 text-neutral-400 text-[11px]">
                      Verified Station GPS (NDLS)
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      {!isOnDuty ? (
                        <button
                          onClick={() => signInStaff(staff.id)}
                          className="px-2.5 py-1 rounded bg-white hover:bg-neutral-200 text-black font-bold transition text-[11px]"
                        >
                          Punch IN
                        </button>
                      ) : (
                        <button
                          onClick={() => signOutStaff(staff.id)}
                          className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 transition text-[11px]"
                        >
                          Punch OUT
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setEditingStaffId(staff.id);
                          setNewStatus(staff.attendanceStatus);
                        }}
                        className="px-2 py-1 rounded bg-black hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition text-[11px]"
                        title="Supervisor Correction"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supervisor Correction Modal */}
      {editingStaffId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white uppercase text-sm">Supervisor Attendance Adjustment</h3>
              <button onClick={() => setEditingStaffId(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">New Attendance State:</label>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as AttendanceStatus)}
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              >
                <option value="PRESENT">PRESENT</option>
                <option value="ON_DUTY">ON_DUTY</option>
                <option value="OFF_DUTY">OFF_DUTY</option>
                <option value="LEAVE">LEAVE</option>
                <option value="SICK_LEAVE">SICK_LEAVE</option>
                <option value="TRAINING">TRAINING</option>
                <option value="ABSENT">ABSENT</option>
              </select>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Official Supervisor Audit Reason:</label>
              <textarea
                value={supervisorNote}
                onChange={e => setSupervisorNote(e.target.value)}
                placeholder="Reason for adjustment (e.g. sanctioned medical leave)..."
                rows={3}
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                onClick={() => setEditingStaffId(null)}
                className="px-4 py-2 rounded-xl bg-black border border-neutral-800 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCorrection}
                className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold uppercase"
              >
                Commit Audit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
