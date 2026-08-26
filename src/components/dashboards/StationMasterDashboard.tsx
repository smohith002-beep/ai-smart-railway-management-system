import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import { useAuth } from '../../context/AuthContext';
import {
  Building2,
  Train,
  Radio,
  UserCheck
} from 'lucide-react';

export const StationMasterDashboard: React.FC<{ onSelectTrain: (num: string) => void }> = ({ onSelectTrain }) => {
  const { currentUser } = useAuth();
  const { stations, trainPositions, staffList } = useRailway();
  const station = stations.find(s => s.code === currentUser.stationCode) || stations[0];

  const approachingTrains = trainPositions.filter(t => t.nextStationCode === station.code);
  const stationStaff = staffList.filter(s => s.stationCode === station.code || s.zone === station.zone);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Building2 className="w-3.5 h-3.5 text-white" />
            <span>STATION MASTER DESK • {station.name} ({station.code})</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Station Line Clearance & Platform Roster
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Zone: {station.zone} | Division: {station.division} | Total Platforms: {station.platformsCount}
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-live" />
          <span>RRI INTERLOCKING: NORMAL</span>
        </div>
      </div>

      {/* Platform Status Board Grid */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-white" />
          <span>Platform Occupancy & Signals</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {station.platforms.map(pf => {
            const isOccupied = pf.status === 'OCCUPIED';
            return (
              <div
                key={pf.number}
                className={`p-4 rounded-xl border flex flex-col justify-between font-mono ${
                  isOccupied
                    ? 'bg-neutral-900 border-white text-white'
                    : 'bg-black border-neutral-800 text-neutral-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">PF {pf.number}</span>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      pf.signalAspect === 'GREEN' ? 'bg-emerald-400 status-dot-live' :
                      pf.signalAspect === 'DOUBLE_YELLOW' ? 'bg-amber-400 status-dot-warning' : 'bg-red-400 status-dot-critical'
                    }`} />
                  </div>

                  <div className="text-xs mb-1">
                    STATUS: <strong className="text-white">{pf.status}</strong>
                  </div>

                  {isOccupied && pf.occupyingTrain && (
                    <div className="text-xs text-white font-bold bg-neutral-950 p-2 rounded border border-neutral-800 mt-2">
                      Train #{pf.occupyingTrain}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-2 border-t border-neutral-800 text-[10px] text-neutral-500">
                  Signal: <strong className="text-neutral-300">{pf.signalAspect}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Approaching Trains & Station Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* Approaching Trains */}
        <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
          <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <Train className="w-4 h-4 text-white" />
            <span>Approaching Trains in Block ({approachingTrains.length})</span>
          </h3>

          {approachingTrains.length === 0 ? (
            <div className="p-4 rounded-xl bg-black text-xs text-neutral-500 text-center border border-neutral-800">
              No trains in immediate approach block.
            </div>
          ) : (
            <div className="space-y-2">
              {approachingTrains.map(t => (
                <div
                  key={t.id}
                  onClick={() => onSelectTrain(t.trainNumber)}
                  className="p-3.5 rounded-xl bg-black border border-neutral-800 hover:border-neutral-600 cursor-pointer transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white font-sans text-xs">{t.trainNumber} - {t.trainName}</div>
                    <div className="text-[10px] text-neutral-500">Speed: {t.speedKmph} km/h • Prev: {t.previousStationCode}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-300 font-bold">
                      {t.delayMinutes > 0 ? `+${t.delayMinutes}m DELAY` : 'RIGHT TIME'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Station Staff On Duty */}
        <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
          <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-white" />
            <span>Station Staff On Duty ({stationStaff.length})</span>
          </h3>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {stationStaff.map(s => (
              <div key={s.id} className="p-3 rounded-xl bg-black border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <div className="text-white font-semibold font-sans">{s.name}</div>
                  <div className="text-[10px] text-neutral-500">{s.designation} • {s.department}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px]">
                  {s.attendanceStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
