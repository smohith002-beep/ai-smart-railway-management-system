import React, { useState } from 'react';
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
  Eye,
  RefreshCw,
  Zap,
  ShieldCheck,
  Compass,
  Info
} from 'lucide-react';
import { LiveTrainTrackingPanel } from './LiveTrainTrackingPanel';

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
  const {
    trainPositions,
    trainDetailsList,
    staffList,
    duties,
    fetchLiveTrainStatus
  } = useRailway();

  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  if (!trainNumber) return null;

  const train = trainPositions.find(t => t.trainNumber === trainNumber);
  const details = trainDetailsList.find(d => d.trainNumber === trainNumber);

  if (!train && !details) return null;

  const isDelayed = (train?.delayMinutes || 0) > 5;
  const assignedDuties = duties.filter(d => d.trainNumber === (train?.trainNumber || details?.trainNumber));

  const handleLiveQuery = async () => {
    if (!trainNumber) return;
    setIsQuerying(true);
    await fetchLiveTrainStatus(trainNumber);
    setTimeout(() => setIsQuerying(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A0A0A] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
        {/* Modal Header */}
        <div className="p-5 bg-black border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white flex-shrink-0">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-lg text-white">{train?.trainNumber || details?.trainNumber}</span>
                <span className="text-neutral-300 font-sans font-medium text-sm">
                  • {train?.trainName || details?.trainName}
                </span>
                {details?.trainType && (
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px]">
                    {details.trainType.replace('_', ' ')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {details?.rakeType || 'LHB Superfast Rake'} • Loco: {details?.locoNumber || 'WAP-7 Electric'} • Coaches: {details?.totalCoaches || 20} • Zone: <strong className="text-white">{details?.zone || 'SR'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLiveQuery}
              disabled={isQuerying}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-[11px] flex items-center gap-1.5 transition cursor-pointer"
              title="Query Live API status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isQuerying ? 'animate-spin' : ''}`} />
              <span>{isQuerying ? 'Querying API...' : 'Live Query'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Live Train Tracking Panel */}
          <LiveTrainTrackingPanel
            trainNumber={train?.trainNumber || details?.trainNumber || trainNumber}
            trainName={train?.trainName || details?.trainName}
            position={train}
            details={details}
            onRefresh={handleLiveQuery}
            onTrackOnMap={onTrackMap ? () => { onTrackMap(trainNumber); onClose(); } : undefined}
            onOpen3D={onTrack3D ? () => { onTrack3D(trainNumber); onClose(); } : undefined}
          />

          {/* Current Section & Route Progress */}
          {train && (
            <div className="p-4 rounded-xl bg-black border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[10px] uppercase">Current Operational Block Section:</span>
                <span className="text-white font-semibold">{train.currentTrackSection || 'Main Railway Block'}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-neutral-900 text-neutral-300">
                <div>
                  PREVIOUS STOP: <strong className="text-white">{train.previousStationName} ({train.previousStationCode})</strong>
                </div>
                <div>
                  NEXT STOP: <strong className="text-white">{train.nextStationName} ({train.nextStationCode})</strong>
                </div>
              </div>
            </div>
          )}

          {/* Authentic Station Schedule & Timetable */}
          {details && details.schedule && details.schedule.length > 0 && (
            <div className="p-4 rounded-xl bg-black border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white uppercase text-xs flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Official Route Schedule & Live Timetable</span>
                </h3>
                <span className="text-[10px] text-neutral-500">
                  {details.originStationCode} ({details.originStationName}) → {details.destinationStationCode} ({details.destinationStationName})
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="text-neutral-500 border-b border-neutral-900">
                    <tr>
                      <th className="py-2">STATION</th>
                      <th className="py-2">SCHED ARR</th>
                      <th className="py-2">SCHED DEP</th>
                      <th className="py-2">PLATFORM</th>
                      <th className="py-2">DISTANCE</th>
                      <th className="py-2 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900/60">
                    {details.schedule.map((stop, idx) => {
                      const isCurrent = stop.status === 'CURRENT';
                      const isPassed = stop.status === 'PASSED';

                      return (
                        <tr key={idx} className={isCurrent ? 'bg-neutral-900/50 text-white font-bold' : 'text-neutral-300'}>
                          <td className="py-2.5">
                            <div className="font-semibold text-white">
                              {stop.stationName} ({stop.stationCode})
                            </div>
                          </td>
                          <td className="py-2.5">{stop.scheduledArrival}</td>
                          <td className="py-2.5">{stop.scheduledDeparture}</td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-200">
                              PF {stop.platform || '1'}
                            </span>
                          </td>
                          <td className="py-2.5 text-neutral-400">{stop.distanceKm} km</td>
                          <td className="py-2.5 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isCurrent
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : isPassed
                                ? 'bg-neutral-800 text-neutral-400'
                                : 'bg-neutral-900 text-neutral-500'
                            }`}>
                              {stop.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Assigned Crew Section */}
          <div className="p-4 rounded-xl bg-black border border-neutral-800 space-y-3">
            <h3 className="font-bold text-white uppercase text-xs flex items-center gap-2">
              <Users className="w-4 h-4 text-white" />
              <span>Assigned Certified Running Crew</span>
            </h3>

            {assignedDuties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {assignedDuties.map(d => (
                  <div key={d.id} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{d.staffName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {d.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-1">
                      Role: <span className="text-neutral-200 uppercase">{d.role.replace('_', ' ')}</span> • ID: {d.employeeId}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      Section: {d.sectionCode || 'Assigned Zone'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-neutral-500 italic">
                Active crew roster synced from Zonal Operations Center.
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-black border-t border-neutral-800 flex items-center justify-between">
          <div className="text-[11px] text-neutral-500">
            Telemetry Feed: <span className="text-neutral-300">{train?.source || 'Verified Indian Railways Gateway'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const cleanNum = (train?.trainNumber || details?.trainNumber || trainNumber).replace(/\D/g, '');
                window.open(`https://www.irctc.co.in/nget/train-search?trainNo=${cleanNum}&source=${details?.originStationCode || ''}&destination=${details?.destinationStationCode || ''}`, '_blank', 'noopener,noreferrer');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition flex items-center gap-1.5 cursor-pointer shadow"
            >
              <span>Book on IRCTC</span>
            </button>

            {onTrackMap && (
              <button
                onClick={() => {
                  onTrackMap(trainNumber);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Track on Map</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
