import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import {
  Train,
  Clock,
  Navigation,
  Gauge,
  Calendar,
  Users,
  Map,
  X,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Eye
} from 'lucide-react';

interface TrainDetailModalProps {
  trainNumber: string | null;
  onClose: () => void;
  onTrack3D?: (trainNumber: string) => void;
  onTrackMap?: (trainNumber: string) => void;
}

export const TrainDetailModal: React.FC<TrainDetailModalProps> = ({
  trainNumber,
  onClose,
  onTrack3D,
  onTrackMap
}) => {
  const { trainPositions, staffList, duties } = useRailway();

  if (!trainNumber) return null;

  const train = trainPositions.find(t => t.trainNumber === trainNumber);
  if (!train) return null;

  const isDelayed = train.delayMinutes > 5;
  const assignedDuties = duties.filter(d => d.trainNumber === train.trainNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0A0A0A] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
        {/* Header */}
        <div className="p-5 bg-black border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white">{train.trainNumber}</span>
                <span className="text-neutral-400 font-sans font-medium text-sm">• {train.trainName}</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                16 Coaches • Max Speed 130 km/h • High-Speed Corridor
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Live Telemetry KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-black border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Live Speed</div>
              <div className="text-xl font-bold text-white mt-0.5">{train.speedKmph} km/h</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Delay Status</div>
              <div className="text-xl font-bold text-white mt-0.5">
                {train.delayMinutes > 0 ? `+${train.delayMinutes}m` : 'Right Time'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Heading Vector</div>
              <div className="text-xl font-bold text-white mt-0.5">{train.headingDegrees}° TRK</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Signal Ahead</div>
              <div className="text-xl font-bold text-white mt-0.5">{train.signalAspect || 'GREEN'}</div>
            </div>
          </div>

          {/* Location & Block Section */}
          <div className="p-4 rounded-xl bg-black border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] uppercase">Current Section & GPS Transponder:</span>
              <span className="text-white font-semibold">{train.currentTrackSection || 'Automatic Block Section'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-900 text-neutral-300">
              <div>PREVIOUS STOP: <strong className="text-white">{train.previousStationName} ({train.previousStationCode})</strong></div>
              <div>NEXT STOP: <strong className="text-white">{train.nextStationName} ({train.nextStationCode})</strong></div>
            </div>
          </div>

          {/* Assigned Running Crew */}
          <div className="p-4 rounded-xl bg-black border border-neutral-800 space-y-3">
            <h3 className="font-bold text-white uppercase text-xs flex items-center gap-2">
              <Users className="w-4 h-4 text-white" />
              <span>Assigned Running Crew & Shift Roster</span>
            </h3>

            {assignedDuties.length === 0 ? (
              <p className="text-neutral-500 text-xs">No active duty records attached to this train number.</p>
            ) : (
              <div className="space-y-2">
                {assignedDuties.map(d => {
                  const s = staffList.find(st => st.id === d.staffId);
                  return (
                    <div key={d.id} className="p-3 rounded-lg bg-neutral-950 border border-neutral-900 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white font-sans text-xs">{s?.name}</div>
                        <div className="text-[10px] text-neutral-400">{d.dutyType} • ID: {s?.employeeId}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 text-[10px] border border-neutral-800">
                        {d.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-black border-t border-neutral-800 flex items-center justify-between">
          <div className="text-[10px] text-neutral-500">
            Source: <strong className="text-neutral-300">{train.source}</strong> ({new Date(train.providerTimestamp).toLocaleTimeString()})
          </div>

          <div className="flex items-center gap-2">
            {onTrackMap && (
              <button
                onClick={() => {
                  onTrackMap(train.trainNumber);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold uppercase transition flex items-center gap-1.5"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Track on Map</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
