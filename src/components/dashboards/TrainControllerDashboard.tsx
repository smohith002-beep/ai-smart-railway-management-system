import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import {
  Train,
  Radio
} from 'lucide-react';

export const TrainControllerDashboard: React.FC<{ onSelectTrain: (num: string) => void }> = ({ onSelectTrain }) => {
  const { trainPositions } = useRailway();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>CENTRALIZED TRAIN CONTROL (CTC) DESK</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Section Movement & Priority Dispatch
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Section: Delhi Main - Kanpur - Prayagraj Quadruple Line Corridor • High Frequency Block
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300">
          MONITORED BLOCKS: <strong className="text-white">6 SECTIONS</strong>
        </div>
      </div>

      {/* High-Density Section Telemetry Grid */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <Train className="w-4 h-4 text-white" />
            <span>Block Section Telemetry Stream</span>
          </h2>
          <div className="text-xs font-mono text-neutral-500">
            Auto-Sync via CRIS WebSocket
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainPositions.map(train => {
            const isDelayed = train.delayMinutes > 5;

            return (
              <div
                key={train.id}
                onClick={() => onSelectTrain(train.trainNumber)}
                className="p-4 rounded-xl bg-black border border-neutral-800 hover:border-neutral-600 transition cursor-pointer flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-live" />
                      <span className="font-bold text-sm text-white">{train.trainNumber}</span>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-300">
                      {train.delayMinutes > 0 ? `+${train.delayMinutes}m DELAY` : 'RIGHT TIME'}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-300 font-medium truncate mb-3">
                    {train.trainName}
                  </div>

                  {/* Section Track Box */}
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono mb-3 space-y-1">
                    <div className="text-neutral-500">BLOCK OCCUPANCY:</div>
                    <div className="text-white font-semibold truncate">{train.currentTrackSection || 'Automatic Block'}</div>
                  </div>

                  {/* Telemetry Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono mb-3">
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-[9px] text-neutral-500 uppercase">Speed</div>
                      <div className="font-bold text-white">{train.speedKmph}k</div>
                    </div>
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-[9px] text-neutral-500 uppercase">Heading</div>
                      <div className="font-bold text-white">{train.headingDegrees}°</div>
                    </div>
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                      <div className="text-[9px] text-neutral-500 uppercase">Signal</div>
                      <div className="font-bold text-white">{train.signalAspect || 'GRN'}</div>
                    </div>
                  </div>

                  {/* Waypoints */}
                  <div className="text-[11px] font-mono text-neutral-400 space-y-1">
                    <div className="flex justify-between">
                      <span>PREV:</span>
                      <span className="text-neutral-300">{train.previousStationCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-semibold">NEXT:</span>
                      <span className="text-white font-bold">{train.nextStationName} ({train.nextStationCode})</span>
                    </div>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="mt-4 pt-2.5 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>STATE: <strong className="text-white">{train.freshnessState}</strong></span>
                  <span>{new Date(train.providerTimestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
