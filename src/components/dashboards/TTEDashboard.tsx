import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { Users, CheckCircle2, XCircle } from 'lucide-react';

export const TTEDashboard: React.FC<{ onSelectTrain: (num: string) => void }> = ({ onSelectTrain }) => {
  const { trainPositions, staffList } = useRailway();
  const myStaff = staffList.find(s => s.role === 'tte') || staffList[3];
  const assignedTrain = trainPositions[0];

  const [berths, setBerths] = useState([
    { berth: 'C1-12', pnr: '2456789123', name: 'Vikram Mehta', status: 'VERIFIED', class: 'EC' },
    { berth: 'C1-13', pnr: '2456789124', name: 'Anita Sharma', status: 'VERIFIED', class: 'EC' },
    { berth: 'C1-14', pnr: '4589123670', name: 'Rohan Gupta', status: 'NOT_TURNED_UP', class: 'EC' },
    { berth: 'C2-01', pnr: '8912345678', name: 'Siddharth Rao', status: 'VERIFIED', class: 'CC' },
    { berth: 'C2-02', pnr: '7823456190', name: 'Pooja Verma', status: 'VERIFIED', class: 'CC' }
  ]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Users className="w-3.5 h-3.5 text-white" />
            <span>TTE HANDHELD TERMINAL (HHT) DIGITAL CHARTING</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Traveling Ticket Examiner (TTE) Console
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Officer: {myStaff.name} ({myStaff.employeeId}) • Train #{assignedTrain?.trainNumber} ({assignedTrain?.trainName})
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300">
          VACANT BERTHS: <strong className="text-white">1 (C1-14)</strong>
        </div>
      </div>

      {/* Berth Allocation Table */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
          Digital Charting & Real-Time Vacancy Allocation
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3">BERTH / COACH</th>
                <th className="p-3">PNR NUMBER</th>
                <th className="p-3">PASSENGER NAME</th>
                <th className="p-3">CLASS</th>
                <th className="p-3">STATUS</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {berths.map(b => (
                <tr key={b.berth} className="hover:bg-neutral-950 transition">
                  <td className="p-3 font-bold text-white">{b.berth}</td>
                  <td className="p-3 text-neutral-400">{b.pnr}</td>
                  <td className="p-3 text-neutral-200 font-sans text-xs font-semibold">{b.name}</td>
                  <td className="p-3 text-neutral-400">{b.class}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      b.status === 'VERIFIED' ? 'bg-neutral-900 text-neutral-200 border-neutral-700' : 'bg-black text-neutral-400 border-neutral-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-white hover:text-black border border-neutral-700 text-neutral-200 text-[11px] transition">
                      Verify HHT
                    </button>
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
