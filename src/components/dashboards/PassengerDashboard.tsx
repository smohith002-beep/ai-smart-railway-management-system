import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import {
  Train,
  Search,
  MapPin,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface PassengerDashboardProps {
  onSelectTrain: (num: string) => void;
  onInspectDetails: (num: string) => void;
}

export const PassengerDashboard: React.FC<PassengerDashboardProps> = ({
  onSelectTrain,
  onInspectDetails
}) => {
  const { trainPositions, stations } = useRailway();
  const [search, setSearch] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState<string>('NDLS');

  const filteredTrains = trainPositions.filter(t => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.trainNumber.toLowerCase().includes(q) ||
      t.trainName.toLowerCase().includes(q) ||
      t.nextStationName.toLowerCase().includes(q) ||
      t.previousStationName.toLowerCase().includes(q)
    );
  });

  const activeStation = stations.find(s => s.code === selectedStation) || stations[0];

  return (
    <div className="space-y-6">
      {/* Passenger Header Banner with Photographic Backdrop */}
      <div className="relative p-8 rounded-3xl bg-[#080808] border border-neutral-800 shadow-2xl overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 filter contrast-125 brightness-75"
          style={{ backgroundImage: `url('/assets/images/train_cinematic.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>INDIAN RAILWAYS PASSENGER VERIFIED TELEMETRY</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white font-display tracking-tight uppercase mb-2">
            Live Train Inquiries & Station Platform Boards
          </h1>

          <p className="text-neutral-400 text-xs md:text-sm font-sans mb-6">
            Authoritative GPS telemetry streamed directly from CRIS locomotive transponders. Zero simulated delays.
          </p>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Enter Train Number (e.g. 22436, 12952) or Name (Vande Bharat)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-black/90 border border-neutral-700 rounded-2xl text-xs md:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Live Train Search Results Grid */}
      <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <Train className="w-4 h-4 text-white" />
            <span>Live Express Train Services ({filteredTrains.length})</span>
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            Source: Authoritative CRIS Feed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrains.map(train => {
            const isDelayed = train.delayMinutes > 5;
            return (
              <div
                key={train.id}
                onClick={() => onInspectDetails(train.trainNumber)}
                className="p-5 rounded-2xl bg-black border border-neutral-800 hover:border-neutral-600 transition cursor-pointer flex flex-col justify-between shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <div className="font-bold text-base text-white">{train.trainNumber}</div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className={`w-2 h-2 rounded-full ${isDelayed ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <span className="text-neutral-300">{train.delayMinutes > 0 ? `+${train.delayMinutes}m DELAY` : 'RIGHT TIME'}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-200 font-sans group-hover:text-white transition mb-3">
                    {train.trainName}
                  </h3>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono mb-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">SPEED:</span>
                      <strong className="text-white">{train.speedKmph} km/h</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">NEXT STOP:</span>
                      <span className="text-neutral-200 font-semibold">{train.nextStationName}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white">
                  <span>View Timeline & Route</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Station Departure Board */}
      <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Station Platform Board ({activeStation.name})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400">Station:</span>
            <select
              value={selectedStation}
              onChange={e => setSelectedStation(e.target.value)}
              className="bg-black border border-neutral-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-white"
            >
              {stations.map(s => (
                <option key={s.code} value={s.code}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Platform Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {activeStation.platforms.map(pf => (
            <div key={pf.number} className="p-3.5 rounded-xl bg-black border border-neutral-800 text-center font-mono">
              <div className="text-[10px] text-neutral-500">PLATFORM {pf.number}</div>
              <div className="text-sm font-bold text-white my-1">
                {pf.occupyingTrain ? `#${pf.occupyingTrain}` : 'CLEAR'}
              </div>
              <div className="text-[10px] text-neutral-400">{pf.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
