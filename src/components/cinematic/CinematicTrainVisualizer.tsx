import React, { useState } from 'react';
import { TrainPosition, TrainDetails } from '../../types/railway';
import {
  Train,
  Clock,
  Navigation,
  Gauge,
  MapPin,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Radio,
  ArrowRight,
  Info,
  ExternalLink,
  Volume2,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { soundService } from '../../services/sound/soundService';
import { IrctcBookingService } from '../../services/booking/irctcBookingService';
import { Railway3DCanvas } from '../three/Railway3DCanvas';

interface CinematicTrainVisualizerProps {
  train: TrainPosition | null;
  details?: TrainDetails | null;
  onClose?: () => void;
  onOpenBooking?: (trainNumber: string) => void;
  onTrackOnMap?: (trainNumber: string) => void;
  onSelectStation?: (stationCode: string) => void;
}

export const CinematicTrainVisualizer: React.FC<CinematicTrainVisualizerProps> = ({
  train,
  details,
  onClose,
  onOpenBooking,
  onTrackOnMap,
  onSelectStation
}) => {
  const [isPlayingHorn, setIsPlayingHorn] = useState<boolean>(false);

  const trainNumber = train?.trainNumber || details?.trainNumber || '20607';
  const trainName = train?.trainName || details?.trainName || 'Vande Bharat Express';
  const speed = train?.speedKmph ?? 110;
  const delay = train?.delayMinutes ?? 0;
  const isDelayed = delay > 5;
  const isGps = train?.telemetryType === 'EXACT_GPS';
  const isUnavailable = !train || train.status === 'DATA_UNAVAILABLE';

  const originName = details?.originStationName || 'Source Terminal';
  const originCode = details?.originStationCode || 'SRC';
  const destName = details?.destinationStationName || 'Destination Terminal';
  const destCode = details?.destinationStationCode || 'DST';

  const schedule = details?.schedule || [];

  const handleHorn = () => {
    setIsPlayingHorn(true);
    soundService.playHorn();
    setTimeout(() => setIsPlayingHorn(false), 1500);
  };

  const handleBookTicket = () => {
    if (onOpenBooking) {
      onOpenBooking(trainNumber);
    } else {
      IrctcBookingService.openOfficialBooking({
        trainNumber,
        trainName,
        sourceStationCode: originCode,
        destinationStationCode: destCode
      });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-[#080808] text-white shadow-2xl font-mono">
      {/* Main Content Layout */}
      <div className="relative z-10 p-6 md:p-8 space-y-6">
        {/* 1. Header Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-black border border-neutral-700 flex items-center justify-center text-white shrink-0 shadow-xl">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl font-black text-white">{trainNumber}</span>
                <span className="text-base font-sans font-bold text-neutral-200">
                  {trainName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px] font-bold">
                  {details?.trainType?.replace('_', ' ') || 'SUPERFAST EXPRESS'}
                </span>
              </div>
              <div className="text-xs text-neutral-400 mt-1 flex flex-wrap items-center gap-2 font-mono">
                <span>{originName} ({originCode})</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                <span>{destName} ({destCode})</span>
                <span className="text-neutral-600">|</span>
                <span>Zone: <strong className="text-neutral-200">{details?.zone || 'SR'}</strong></span>
                <span className="text-neutral-600">|</span>
                <span>Distance: <strong className="text-neutral-200">{schedule[schedule.length - 1]?.distanceKm || 500} KM</strong></span>
              </div>
            </div>
          </div>

          {/* Telemetry Badge & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
            <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
              isUnavailable
                ? 'bg-rose-950/40 border-rose-800/70 text-rose-300'
                : isGps
                ? 'bg-emerald-950/40 border-emerald-800/70 text-emerald-300'
                : 'bg-amber-950/40 border-amber-800/70 text-amber-300'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${isUnavailable ? 'bg-rose-500' : isGps ? 'bg-emerald-400 status-dot-live' : 'bg-amber-400'}`} />
              <span>
                {isUnavailable ? '🔴 LIVE DATA UNAVAILABLE' : isGps ? '🟢 LIVE GPS TELEMETRY' : '🟡 LAST REPORTED LOCATION'}
              </span>
            </div>

            <button
              onClick={handleHorn}
              className={`p-2.5 rounded-xl border text-neutral-300 hover:text-white transition cursor-pointer ${
                isPlayingHorn ? 'bg-amber-500 border-amber-400 text-black' : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700'
              }`}
              title="Sound Electric Locomotive Horn"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {onTrackOnMap && (
              <button
                onClick={() => onTrackOnMap(trainNumber)}
                className="px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs uppercase flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Live Map</span>
                <Navigation className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={handleBookTicket}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase flex items-center gap-1.5 shadow transition cursor-pointer"
            >
              <span>Book on IRCTC</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 2. Three.js 3D WebGL Camera Viewport */}
        <div className="w-full">
          <Railway3DCanvas
            activeTrain={train}
            details={details}
            height="500px"
            onSelectStation={onSelectStation}
          />
        </div>

        {/* 3. Primary Telemetry KPI Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Current / Last Reported Station */}
          <div className="p-4 rounded-xl bg-black/90 border border-neutral-800 space-y-1.5">
            <div className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>CURRENT / LAST REPORTED LOCATION</span>
            </div>
            <div className="text-sm font-bold text-white leading-snug">
              {train?.locationMessage || train?.lastReportedStationName || train?.nextStationName || 'In Transit on Mainline'}
            </div>
            <div className="text-[10px] text-neutral-400 pt-1.5 border-t border-neutral-900 flex items-center justify-between">
              <span>PLATFORM: <strong className="text-white">PF {train?.platformNumber || '1'}</strong></span>
              <span>SPEED: <strong className="text-white">{speed} KM/H</strong></span>
            </div>
          </div>

          {/* Previous Station */}
          <div className="p-4 rounded-xl bg-black/90 border border-neutral-800 space-y-1.5">
            <div className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>PREVIOUS STATION</span>
            </div>
            <div className="text-sm font-bold text-neutral-200">
              {train?.previousStationName || originName}
            </div>
            <div className="text-[10px] text-neutral-400 pt-1.5 border-t border-neutral-900">
              CODE: <strong className="text-white">{train?.previousStationCode || originCode}</strong>
            </div>
          </div>

          {/* Next Station */}
          <div className="p-4 rounded-xl bg-black/90 border border-neutral-800 space-y-1.5">
            <div className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
              <Navigation className="w-3.5 h-3.5 text-white" />
              <span>NEXT STATION</span>
            </div>
            <div className="text-sm font-bold text-white">
              {train?.nextStationName || destName}
            </div>
            <div className="text-[10px] text-neutral-400 pt-1.5 border-t border-neutral-900 flex items-center justify-between">
              <span>CODE: <strong className="text-white">{train?.nextStationCode || destCode}</strong></span>
              {train?.nextStationScheduledArrival && (
                <span>ETA: <strong className="text-neutral-200">{train.nextStationScheduledArrival}</strong></span>
              )}
            </div>
          </div>

          {/* Running Status & Delay */}
          <div className="p-4 rounded-xl bg-black/90 border border-neutral-800 space-y-1.5">
            <div className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>RUNNING STATUS & DELAY</span>
            </div>
            <div className={`text-sm font-bold ${isDelayed ? 'text-amber-400' : 'text-emerald-400'}`}>
              {delay > 0 ? `DELAYED BY ${delay} MIN` : 'RUNNING RIGHT TIME'}
            </div>
            <div className="text-[10px] text-neutral-400 pt-1.5 border-t border-neutral-900 flex items-center justify-between">
              <span>DELAY: <strong className={isDelayed ? 'text-amber-400' : 'text-emerald-400'}>{delay > 0 ? `+${delay}m` : '0m'}</strong></span>
              <span>STATUS: <strong className="text-white">{train?.status || 'ON_TIME'}</strong></span>
            </div>
          </div>
        </div>

        {/* 4. Official Route Timeline Stepper */}
        {schedule.length > 0 && (
          <div className="p-5 rounded-2xl bg-black/95 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-xs font-bold uppercase text-white tracking-wider">
                  Official Route Progression ({schedule.length} Stations)
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-neutral-600" />
                  <span>Passed</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-live" />
                  <span>Current Stop</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-600" />
                  <span>Upcoming</span>
                </div>
              </div>
            </div>

            {/* Stepper Node Scroll Bar */}
            <div className="overflow-x-auto pb-3 pt-2 scrollbar-none">
              <div className="flex items-center min-w-max px-2">
                {schedule.map((stn, idx) => {
                  const isPassed = stn.status === 'PASSED';
                  const isCurrent = stn.status === 'CURRENT';

                  return (
                    <React.Fragment key={stn.stationCode}>
                      <div
                        onClick={() => onSelectStation && onSelectStation(stn.stationCode)}
                        className={`flex flex-col items-center p-2 rounded-xl transition cursor-pointer hover:bg-neutral-900 ${
                          isCurrent ? 'bg-neutral-900 border border-neutral-700 scale-105 shadow-xl' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCurrent
                            ? 'bg-white text-black ring-4 ring-white/20'
                            : isPassed
                            ? 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                            : 'bg-black text-neutral-500 border border-neutral-800'
                        }`}>
                          {isPassed ? (
                            <CheckCircle2 className="w-4 h-4 text-neutral-300" />
                          ) : isCurrent ? (
                            <Train className="w-4 h-4 text-black animate-pulse" />
                          ) : (
                            <span className="text-[10px]">{idx + 1}</span>
                          )}
                        </div>

                        <div className="text-center mt-2 max-w-[110px]">
                          <div className={`text-xs font-bold truncate ${isCurrent ? 'text-white' : isPassed ? 'text-neutral-300' : 'text-neutral-400'}`}>
                            {stn.stationName}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">
                            {stn.stationCode} • PF {stn.platform || '1'}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
                            {stn.scheduledArrival !== '--' ? stn.scheduledArrival : stn.scheduledDeparture}
                          </div>
                        </div>
                      </div>

                      {idx < schedule.length - 1 && (
                        <div className={`h-0.5 w-10 sm:w-14 mx-1 transition ${
                          isPassed ? 'bg-neutral-700' : isCurrent ? 'bg-white' : 'bg-neutral-900'
                        }`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 5. Telemetry Disclaimer & Verified Metadata */}
        <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-neutral-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>
              Actual physical train live camera feed unavailable • Displaying 3D GIS route telemetry & verified CRIS schedule.
            </span>
          </div>

          <div className="text-[10px] font-mono text-neutral-400 shrink-0">
            PROVIDER: <strong className="text-neutral-200">{train?.source || 'Indian Railways CRIS Feed'}</strong> • LAST FIX: <strong className="text-neutral-200">{new Date(train?.providerTimestamp || Date.now()).toLocaleTimeString()}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
