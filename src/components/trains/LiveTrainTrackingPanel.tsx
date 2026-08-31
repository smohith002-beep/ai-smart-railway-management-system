import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  ShieldCheck,
  Calendar,
  LayoutList,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { TrainPosition, TrainDetails, StationScheduleItem } from '../../types/railway';
import { IrctcBookingService } from '../../services/booking/irctcBookingService';

interface LiveTrainTrackingPanelProps {
  trainNumber: string;
  trainName?: string;
  position?: TrainPosition | null;
  details?: TrainDetails | null;
  onRefresh?: () => Promise<void>;
  onSelectStation?: (stationCode: string) => void;
  onTrackOnMap?: (trainNumber: string) => void;
  onOpen3D?: (trainNumber: string) => void;
  autoRefreshIntervalSeconds?: number;
}

export const LiveTrainTrackingPanel: React.FC<LiveTrainTrackingPanelProps> = ({
  trainNumber,
  trainName,
  position,
  details,
  onRefresh,
  onSelectStation,
  onTrackOnMap,
  onOpen3D,
  autoRefreshIntervalSeconds = 25
}) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(autoRefreshIntervalSeconds);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>(() => new Date().toLocaleTimeString());
  const [timelineViewMode, setTimelineViewMode] = useState<'CARDS' | 'STEPPER'>('CARDS');

  // Auto-refresh countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          handleManualRefresh();
          return autoRefreshIntervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRefreshIntervalSeconds, trainNumber]);

  const handleManualRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
        setLastRefreshedAt(new Date().toLocaleTimeString());
      } catch (err) {
        console.error('Refresh error', err);
      } finally {
        setIsRefreshing(false);
        setCountdown(autoRefreshIntervalSeconds);
      }
    }
  };

  const displayName = trainName || position?.trainName || details?.trainName || 'Indian Railways Train';
  const delay = position?.delayMinutes ?? 0;
  const isDelayed = delay > 5;
  const isGps = position?.telemetryType === 'EXACT_GPS';
  const isStationReported = position?.telemetryType === 'STATION_REPORTED';
  const isUnavailable = !position || position.status === 'DATA_UNAVAILABLE' || (position.telemetryType === 'OFFLINE_SCHEDULE' && !position.locationMessage);

  let badgeText = '🟡 LAST REPORTED LOCATION';
  let badgeStyle = 'bg-amber-950/40 border-amber-800/70 text-amber-300';
  let dotStyle = 'bg-amber-400';

  if (isUnavailable) {
    badgeText = '🔴 LIVE DATA UNAVAILABLE';
    badgeStyle = 'bg-rose-950/40 border-rose-800/70 text-rose-300';
    dotStyle = 'bg-rose-500';
  } else if (isGps) {
    badgeText = '🟢 LIVE GPS TELEMETRY';
    badgeStyle = 'bg-emerald-950/40 border-emerald-800/70 text-emerald-300';
    dotStyle = 'bg-emerald-400 status-dot-live';
  } else if (isStationReported) {
    badgeText = '🟡 LAST REPORTED LOCATION';
    badgeStyle = 'bg-neutral-900 border-neutral-700 text-neutral-200';
    dotStyle = 'bg-sky-400';
  }

  // Determine human-readable status text
  let statusText = 'RUNNING';

  if (isUnavailable) {
    statusText = 'DATA UNAVAILABLE';
  } else if (delay > 20) {
    statusText = `DELAYED BY ${delay} MIN`;
  } else if (position?.status === 'TERMINATED' || position?.locationMessage?.toLowerCase().includes('completed')) {
    statusText = 'TRIP COMPLETED / ARRIVED';
  } else if (position?.locationMessage?.toLowerCase().includes('scheduled to depart')) {
    statusText = 'NOT STARTED';
  } else if (position?.locationMessage?.toLowerCase().includes('at platform') || position?.speedKmph === 0) {
    statusText = 'AT STATION / HALTING';
  } else if (delay === 0) {
    statusText = 'RIGHT TIME';
  }

  // Extract Route Schedule Stoppages
  const schedule: StationScheduleItem[] = details?.schedule || [];

  return (
    <div className="w-full rounded-2xl bg-[#090909] border border-neutral-800 shadow-2xl p-5 md:p-6 font-mono space-y-6 text-white">
      {/* 1. Header Banner with Live Telemetry State */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-black border border-neutral-700 flex items-center justify-center text-white shrink-0 shadow-lg">
            <Train className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-white">{trainNumber}</span>
              <span className="text-sm sm:text-base font-sans font-semibold text-neutral-300">
                • {displayName}
              </span>
            </div>
            <div className="text-xs text-neutral-400 mt-0.5 flex flex-wrap items-center gap-2 font-mono">
              <span>{details?.originStationName || 'Origin'} ({details?.originStationCode || 'SRC'})</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              <span>{details?.destinationStationName || 'Destination'} ({details?.destinationStationCode || 'DST'})</span>
              {details?.zone && (
                <>
                  <span className="text-neutral-600">|</span>
                  <span>Zone: <strong className="text-neutral-200">{details.zone}</strong></span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Telemetry Indicator & Refresh Countdown */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${badgeStyle}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${dotStyle}`} />
            <span>{badgeText}</span>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition cursor-pointer disabled:opacity-50"
            title={`Refresh running status (Auto-refreshes in ${countdown}s)`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Primary KPI Grid (Current Location, Previous Station, Next Station, Delay, Last Updated) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Current / Last Reported Location */}
        <div className="p-4 rounded-xl bg-black border border-neutral-800/90 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>CURRENT / LAST REPORTED LOCATION</span>
          </div>
          <div className="text-sm font-bold text-white leading-snug">
            {position?.locationMessage || position?.lastReportedStationName || position?.nextStationName || 'In Transit'}
          </div>
          <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-900 flex items-center justify-between">
            <span>PLATFORM: <strong className="text-white">PF {position?.platformNumber || '1'}</strong></span>
            <span>SPEED: <strong className="text-white">{position?.speedKmph || 0} KM/H</strong></span>
          </div>
        </div>

        {/* Previous Station */}
        <div className="p-4 rounded-xl bg-black border border-neutral-800/90 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>PREVIOUS STATION</span>
          </div>
          <div className="text-sm font-bold text-neutral-200">
            {position?.previousStationName || details?.originStationName || 'Origin Terminal'}
          </div>
          <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-900">
            CODE: <strong className="text-white">{position?.previousStationCode || details?.originStationCode || '---'}</strong>
          </div>
        </div>

        {/* Next Station */}
        <div className="p-4 rounded-xl bg-black border border-neutral-800/90 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
            <Navigation className="w-3.5 h-3.5 text-white" />
            <span>NEXT STATION</span>
          </div>
          <div className="text-sm font-bold text-white">
            {position?.nextStationName || details?.destinationStationName || 'Upcoming Stop'}
          </div>
          <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-900 flex items-center justify-between">
            <span>CODE: <strong className="text-white">{position?.nextStationCode || details?.destinationStationCode || '---'}</strong></span>
            {position?.nextStationScheduledArrival && (
              <span>ETA: <strong className="text-neutral-200">{position.nextStationScheduledArrival}</strong></span>
            )}
          </div>
        </div>

        {/* Running Status & Delay */}
        <div className="p-4 rounded-xl bg-black border border-neutral-800/90 space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>RUNNING STATUS & DELAY</span>
          </div>
          <div className={`text-sm font-bold ${isDelayed ? 'text-amber-400' : 'text-emerald-400'}`}>
            {statusText}
          </div>
          <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-900 flex items-center justify-between">
            <span>DELAY: <strong className={isDelayed ? 'text-amber-400' : 'text-emerald-400'}>{delay > 0 ? `+${delay}m` : '0m'}</strong></span>
            <span>UPDATED: <strong className="text-white">{lastRefreshedAt}</strong></span>
          </div>
        </div>
      </div>

      {/* 3. OFFICIAL ROUTE PROGRESSION SECTION (Matches Reference Layout) */}
      {schedule.length > 0 && (
        <div className="p-5 md:p-6 rounded-2xl bg-black border border-neutral-800 space-y-5">
          {/* Section Header with Legend & View Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-sm font-black uppercase text-white tracking-wider">
                OFFICIAL ROUTE PROGRESSION ({schedule.length} STATIONS)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              {/* Reference Style Legend */}
              <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
                  <span>Passed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 status-dot-live inline-block" />
                  <span className="text-emerald-300 font-bold">Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-neutral-500 inline-block" />
                  <span>Upcoming</span>
                </div>
              </div>

              {/* View Switcher: Detailed Cards vs Stepper */}
              <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setTimelineViewMode('CARDS')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1 cursor-pointer ${
                    timelineViewMode === 'CARDS' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Detailed Station Cards"
                >
                  <LayoutList className="w-3 h-3" />
                  <span>Cards</span>
                </button>
                <button
                  onClick={() => setTimelineViewMode('STEPPER')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1 cursor-pointer ${
                    timelineViewMode === 'STEPPER' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Horizontal Stepper"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Stepper</span>
                </button>
              </div>
            </div>
          </div>

          {/* VIEW MODE A: DETAILED STATION TIMELINE CARDS (Exact Reference Style) */}
          {timelineViewMode === 'CARDS' && (
            <div className="space-y-4">
              {schedule.map((stn, idx) => {
                const isPassed = stn.status === 'PASSED';
                const isCurrent = stn.status === 'CURRENT';
                const isUpcoming = stn.status === 'UPCOMING';

                // Determine station delay text
                const stnDelay = stn.delayMinutes ?? (isPassed || isCurrent ? delay : undefined);
                let delayLabel = 'On Time';
                let delayColorClass = 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60';

                if (stnDelay !== undefined && stnDelay > 0) {
                  delayLabel = `${stnDelay} min Late`;
                  delayColorClass = 'text-amber-400 bg-amber-950/40 border-amber-800/60';
                } else if (stnDelay === undefined && isUpcoming) {
                  delayLabel = 'Scheduled';
                  delayColorClass = 'text-neutral-400 bg-neutral-900 border-neutral-800';
                }

                // If CURRENT station: Render Large Highlighted Station Card (Reference Style)
                if (isCurrent) {
                  return (
                    <div
                      key={stn.stationCode}
                      onClick={() => onSelectStation?.(stn.stationCode)}
                      className="relative p-5 md:p-6 rounded-2xl bg-[#0F1713] border-2 border-emerald-500 shadow-2xl ring-4 ring-emerald-500/20 space-y-4 cursor-pointer transition hover:scale-[1.01]"
                    >
                      {/* Top Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-black font-black text-sm shadow">
                            <Train className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                                🚆 CURRENT REPORTED STATION
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                                {isGps ? '🟢 LIVE GPS' : '🟡 LAST REPORTED'}
                              </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
                              {stn.stationName} ({stn.stationCode})
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <span className="px-2.5 py-1 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-bold text-neutral-200">
                            PF {stn.platform || position?.platformNumber || '1'}
                          </span>
                          <span className={`px-2.5 py-1 rounded-xl border text-xs font-bold ${delayColorClass}`}>
                            {delayLabel}
                          </span>
                        </div>
                      </div>

                      {/* Two-Column Timings (Arrival / Departure) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {/* Arrival Column */}
                        <div className="p-3.5 rounded-xl bg-black/80 border border-emerald-900/60 space-y-1">
                          <div className="text-[10px] text-neutral-400 uppercase font-bold">ARRIVAL</div>
                          <div className="text-sm font-bold text-neutral-200">
                            {stn.scheduledArrival !== '--' ? stn.scheduledArrival : 'Source Terminal'}
                          </div>
                          <div className="text-xs text-emerald-400 font-semibold pt-0.5">
                            Actual: <strong className="text-white">{stn.actualArrival || position?.lastReportedTime ? new Date(position?.lastReportedTime || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (stn.scheduledArrival !== '--' ? stn.scheduledArrival : '06:00 AM')}</strong>
                          </div>
                        </div>

                        {/* Departure Column */}
                        <div className="p-3.5 rounded-xl bg-black/80 border border-emerald-900/60 space-y-1">
                          <div className="text-[10px] text-neutral-400 uppercase font-bold">DEPARTURE</div>
                          <div className="text-sm font-bold text-neutral-200">
                            {stn.scheduledDeparture !== '--' ? stn.scheduledDeparture : 'Destination Terminal'}
                          </div>
                          <div className="text-xs text-emerald-400 font-semibold pt-0.5">
                            Actual: <strong className="text-white">{stn.actualDeparture || (position?.speedKmph === 0 ? 'Halting at Station' : (stn.scheduledDeparture !== '--' ? stn.scheduledDeparture : 'En-route'))}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Location Message & Distance */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-950 text-xs text-neutral-400">
                        <div>
                          STATUS: <strong className="text-white">{position?.locationMessage || `At platform PF ${stn.platform || '1'}`}</strong>
                        </div>
                        <div>
                          DISTANCE: <strong className="text-neutral-200">{stn.distanceKm} KM from Origin</strong>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Regular (Passed / Upcoming) Station Card
                return (
                  <div
                    key={stn.stationCode}
                    onClick={() => onSelectStation?.(stn.stationCode)}
                    className={`p-4 md:p-5 rounded-2xl border transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isPassed
                        ? 'bg-[#0A0A0A] border-neutral-800/90 opacity-85 hover:opacity-100 hover:border-neutral-700'
                        : 'bg-black border-neutral-900 hover:border-neutral-800'
                    }`}
                  >
                    {/* Left: Indicator Icon & Station Title */}
                    <div className="flex items-center gap-3.5">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isPassed
                          ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                          : 'bg-black text-neutral-500 border border-neutral-800'
                      }`}>
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-neutral-300" />
                        ) : (
                          <span className="text-[10px]">{idx + 1}</span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm md:text-base font-bold ${isPassed ? 'text-neutral-200' : 'text-neutral-300'}`}>
                            {stn.stationName}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 font-mono">
                            {stn.stationCode}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          Stop {idx + 1} of {schedule.length} • {stn.distanceKm} KM • Halt: {stn.haltMinutes > 0 ? `${stn.haltMinutes}m` : 'Origin/Term'}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Scheduled & Actual Timings */}
                    <div className="flex items-center gap-6 text-xs font-mono">
                      {/* Arrival */}
                      <div>
                        <div className="text-[10px] text-neutral-500 uppercase">ARRIVAL</div>
                        <div className="text-neutral-200 font-bold">
                          {stn.scheduledArrival !== '--' ? stn.scheduledArrival : 'Source'}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {isPassed ? `Actual: ${stn.actualArrival || stn.scheduledArrival}` : 'Upcoming'}
                        </div>
                      </div>

                      {/* Departure */}
                      <div>
                        <div className="text-[10px] text-neutral-500 uppercase">DEPARTURE</div>
                        <div className="text-neutral-200 font-bold">
                          {stn.scheduledDeparture !== '--' ? stn.scheduledDeparture : 'Destination'}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {isPassed ? `Actual: ${stn.actualDeparture || stn.scheduledDeparture}` : 'Upcoming'}
                        </div>
                      </div>
                    </div>

                    {/* Right: Badges */}
                    <div className="flex items-center gap-2 self-start md:self-center">
                      <span className="px-2.5 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                        PF {stn.platform || '1'}
                      </span>
                      <span className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold ${delayColorClass}`}>
                        {delayLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW MODE B: HORIZONTAL STEPPER TIMELINE */}
          {timelineViewMode === 'STEPPER' && (
            <div className="overflow-x-auto pb-4 pt-2 scrollbar-none">
              <div className="flex items-center min-w-max px-2">
                {schedule.map((stn, idx) => {
                  const isPassed = stn.status === 'PASSED';
                  const isCurrent = stn.status === 'CURRENT';

                  return (
                    <React.Fragment key={stn.stationCode}>
                      {/* Station Node */}
                      <div
                        onClick={() => onSelectStation?.(stn.stationCode)}
                        className={`group flex flex-col items-center cursor-pointer transition p-2.5 rounded-2xl ${
                          isCurrent
                            ? 'bg-[#0E1B13] border-2 border-emerald-400 scale-105 shadow-2xl'
                            : 'hover:bg-neutral-950'
                        }`}
                      >
                        {/* Node Icon */}
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${
                          isCurrent
                            ? 'bg-emerald-400 text-black ring-4 ring-emerald-400/30'
                            : isPassed
                            ? 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                            : 'bg-black text-neutral-500 border border-neutral-800'
                        }`}>
                          {isPassed ? (
                            <CheckCircle2 className="w-4 h-4 text-neutral-300" />
                          ) : isCurrent ? (
                            <Train className="w-5 h-5 text-black animate-pulse" />
                          ) : (
                            <span className="text-[11px]">{idx + 1}</span>
                          )}
                        </div>

                        {/* Station Details */}
                        <div className="text-center mt-2.5 max-w-[125px]">
                          <div className={`text-xs font-bold truncate ${isCurrent ? 'text-emerald-300' : isPassed ? 'text-neutral-300' : 'text-neutral-400'}`}>
                            {stn.stationName}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                            {stn.stationCode} • PF {stn.platform || '1'}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-300 font-semibold mt-1">
                            {stn.scheduledArrival !== '--' ? stn.scheduledArrival : stn.scheduledDeparture}
                          </div>
                          {isCurrent && (
                            <div className="mt-1 px-1.5 py-0.2 rounded bg-emerald-950 text-[9px] font-bold text-emerald-400 border border-emerald-800">
                              CURRENT
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Connecting Connector Line */}
                      {idx < schedule.length - 1 && (
                        <div className={`h-0.5 w-12 sm:w-16 mx-1 transition ${
                          isPassed ? 'bg-neutral-700' : isCurrent ? 'bg-emerald-500' : 'bg-neutral-900'
                        }`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Action Toolbar & Telemetry Source Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-neutral-800 text-xs">
        <div className="text-[11px] text-neutral-400 space-y-0.5">
          <div>DATA SOURCE: <strong className="text-neutral-200">{position?.source || 'Indian Railways CRIS Telemetry'}</strong></div>
          <div>COORDINATES: <strong className="text-neutral-300">{position?.latitude?.toFixed(4) ?? '--'}°N, {position?.longitude?.toFixed(4) ?? '--'}°E</strong></div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {/* Book on IRCTC */}
          <button
            onClick={() => {
              IrctcBookingService.openOfficialBooking({
                trainNumber,
                trainName: displayName,
                sourceStationCode: details?.originStationCode,
                destinationStationCode: details?.destinationStationCode
              });
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase transition flex items-center gap-1.5 cursor-pointer shadow"
          >
            <span>Book on IRCTC</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Track on Live Map */}
          {onTrackOnMap && (
            <button
              onClick={() => onTrackOnMap(trainNumber)}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Track on Map</span>
            </button>
          )}

          {/* Cinematic View */}
          {onOpen3D && (
            <button
              onClick={() => onOpen3D(trainNumber)}
              className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-neutral-400" />
              <span>Cinematic View</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
