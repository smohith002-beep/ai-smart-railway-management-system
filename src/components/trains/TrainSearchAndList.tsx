import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import {
  Train,
  Search,
  Filter,
  ArrowUpDown,
  Navigation,
  Clock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface TrainSearchAndListProps {
  onSelectTrain: (trainNumber: string) => void;
  onInspectDetails: (trainNumber: string) => void;
}

export const TrainSearchAndList: React.FC<TrainSearchAndListProps> = ({
  onSelectTrain,
  onInspectDetails
}) => {
  const { trainPositions } = useRailway();
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filtered = trainPositions.filter(t => {
    if (statusFilter === 'ON_TIME' && t.delayMinutes > 5) return false;
    if (statusFilter === 'DELAYED' && t.delayMinutes <= 5) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.trainNumber.toLowerCase().includes(q) ||
        t.trainName.toLowerCase().includes(q) ||
        t.nextStationName.toLowerCase().includes(q) ||
        t.previousStationName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Train className="w-3.5 h-3.5 text-white" />
            <span>NATIONAL ROLLING STOCK TELEMETRY REGISTRY</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Live Train Registry & Real-Time Telemetry
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Verified speeds, live heading vectors, block section locations & delay indicators.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300">
          REGISTRY COUNT: <strong className="text-white">{filtered.length} UNITS</strong>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 font-mono text-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by train number (e.g. 22436) or name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex items-center gap-2">
            {(['ALL', 'ON_TIME', 'DELAYED'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  statusFilter === st
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-black text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {st === 'ALL' ? 'ALL TRAINS' : st === 'ON_TIME' ? 'ON TIME' : 'DELAYED'}
              </button>
            ))}
          </div>
        </div>

        {/* Registry Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3">TRAIN NUMBER & NAME</th>
                <th className="p-3">CURRENT LOCATION / SECTION</th>
                <th className="p-3">SPEED</th>
                <th className="p-3">DELAY STATUS</th>
                <th className="p-3">DATA FRESHNESS</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filtered.map(train => {
                const isDelayed = train.delayMinutes > 5;

                return (
                  <tr key={train.id} className="hover:bg-neutral-950 transition">
                    <td className="p-3">
                      <div className="font-bold text-white font-mono text-sm">{train.trainNumber}</div>
                      <div className="text-neutral-400 font-sans text-xs">{train.trainName}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-neutral-200">{train.nextStationName}</div>
                      <div className="text-[10px] text-neutral-500">{train.currentTrackSection || 'In Block'}</div>
                    </td>
                    <td className="p-3 font-bold text-white">
                      {train.speedKmph} km/h
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isDelayed ? 'bg-amber-400 status-dot-warning' : 'bg-emerald-400 status-dot-live'}`} />
                        <span className="text-neutral-300">
                          {train.delayMinutes > 0 ? `+${train.delayMinutes}m` : 'RIGHT TIME'}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-[11px] text-neutral-400">
                      {train.freshnessState}
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => onInspectDetails(train.trainNumber)}
                        className="px-3 py-1 rounded bg-neutral-900 hover:bg-white hover:text-black border border-neutral-700 text-neutral-200 text-[11px] transition"
                      >
                        Inspect Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
