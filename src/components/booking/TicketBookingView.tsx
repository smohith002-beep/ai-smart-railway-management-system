import React, { useState, useMemo } from 'react';
import {
  Train,
  Calendar,
  Users,
  Search,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Navigation,
  Info,
  Layers,
  Sparkles,
  ArrowLeftRight
} from 'lucide-react';
import { nationalTrainDatabaseService, MasterTrainSummary } from '../../services/railwayApi/nationalTrainDatabaseService';
import { IrctcBookingService } from '../../services/booking/irctcBookingService';
import { RailwayStation } from '../../types/railway';
import { SEOHead } from '../seo/SEOHead';

interface TicketBookingViewProps {
  onInspectTrain: (trainNumber: string) => void;
  onTrackTrain: (trainNumber: string) => void;
}

const POPULAR_ROUTES = [
  { from: 'MAS', fromName: 'MGR Chennai Central', to: 'MYS', toName: 'Mysuru Junction' },
  { from: 'NDLS', fromName: 'New Delhi', to: 'BSB', toName: 'Varanasi Junction' },
  { from: 'MMCT', fromName: 'Mumbai Central', to: 'NDLS', toName: 'New Delhi' },
  { from: 'MAS', fromName: 'MGR Chennai Central', to: 'CBE', toName: 'Coimbatore Junction' },
  { from: 'SBC', fromName: 'KSR Bengaluru City', to: 'MAS', toName: 'MGR Chennai Central' },
  { from: 'HWH', fromName: 'Howrah Junction', to: 'NDLS', toName: 'New Delhi' }
];

const TRAVEL_CLASSES = [
  { code: 'ALL', label: 'All Classes' },
  { code: '1A', label: 'AC First Class (1A)' },
  { code: '2A', label: 'AC 2 Tier (2A)' },
  { code: '3A', label: 'AC 3 Tier (3A)' },
  { code: '3E', label: 'AC 3 Economy (3E)' },
  { code: 'CC', label: 'AC Chair Car (CC)' },
  { code: 'EC', label: 'Exec. Chair Car (EC)' },
  { code: 'SL', label: 'Sleeper (SL)' },
  { code: '2S', label: 'Second Sitting (2S)' }
];

export const TicketBookingView: React.FC<TicketBookingViewProps> = ({
  onInspectTrain,
  onTrackTrain
}) => {
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [sourceQuery, setSourceQuery] = useState<string>('MAS');
  const [destQuery, setDestQuery] = useState<string>('MYS');
  const [journeyDate, setJourneyDate] = useState<string>(tomorrowStr);
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  const [fromSuggestionsOpen, setFromSuggestionsOpen] = useState<boolean>(false);
  const [toSuggestionsOpen, setToSuggestionsOpen] = useState<boolean>(false);

  const allStations = useMemo(() => nationalTrainDatabaseService.getAllStations(), []);

  // Station autocomplete filters
  const fromSuggestions = useMemo(() => {
    const q = sourceQuery.toLowerCase().trim();
    if (!q || q.length < 2) return [];
    return allStations.filter(s =>
      s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [allStations, sourceQuery]);

  const toSuggestions = useMemo(() => {
    const q = destQuery.toLowerCase().trim();
    if (!q || q.length < 2) return [];
    return allStations.filter(s =>
      s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [allStations, destQuery]);

  const handleSwapStations = () => {
    const temp = sourceQuery;
    setSourceQuery(destQuery);
    setDestQuery(temp);
  };

  // Find trains connecting source and destination
  const searchResults: MasterTrainSummary[] = useMemo(() => {
    if (!sourceQuery || !destQuery) return [];
    const src = sourceQuery.toUpperCase().trim();
    const dst = destQuery.toUpperCase().trim();

    return nationalTrainDatabaseService.searchTrains({
      sourceCode: src,
      destinationCode: dst
    });
  }, [sourceQuery, destQuery]);

  const handleBookNow = (train: MasterTrainSummary) => {
    IrctcBookingService.openOfficialBooking({
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      sourceStationCode: train.originStationCode,
      destinationStationCode: train.destinationStationCode,
      journeyDate,
      classCode: selectedClass,
      passengersCount: passengerCount
    });
  };

  return (
    <div className="space-y-6 font-mono">
      <SEOHead
        title="Online Train Ticket Booking Search | AI Smart Railway"
        description="Search real Indian Railways trains, departure timings, route progression, and book authentic tickets directly through official IRCTC."
      />

      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-neutral-900 via-black to-black border border-neutral-800 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/70 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OFFICIAL IRCTC TICKET SEARCH & BOOKING PORTAL</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-display text-white uppercase tracking-tight">
              Online Train Ticket Booking System
            </h1>
            <p className="text-xs text-neutral-400 font-sans">
              Search authentic Indian Railways train routes, check running days, and book directly on authorized IRCTC.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero payment credentials collected • 100% Safe IRCTC Flow</span>
          </div>
        </div>

        {/* 1. Search Query Form Box */}
        <div className="mt-6 p-5 rounded-2xl bg-black/90 border border-neutral-700/80 shadow-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 relative">
            {/* FROM STATION */}
            <div className="md:col-span-4 relative">
              <label className="text-[10px] text-neutral-400 uppercase font-bold mb-1 block">
                FROM STATION (CODE / NAME)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={sourceQuery}
                  onChange={e => {
                    setSourceQuery(e.target.value.toUpperCase());
                    setFromSuggestionsOpen(true);
                  }}
                  onFocus={() => setFromSuggestionsOpen(true)}
                  placeholder="e.g. MAS or Chennai"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm font-bold placeholder:text-neutral-500 focus:outline-none focus:border-white"
                />
                {fromSuggestionsOpen && fromSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl bg-neutral-900 border border-neutral-700 shadow-2xl max-h-56 overflow-y-auto">
                    {fromSuggestions.map(s => (
                      <div
                        key={`from_${s.code}`}
                        onClick={() => {
                          setSourceQuery(s.code);
                          setFromSuggestionsOpen(false);
                        }}
                        className="px-4 py-2.5 hover:bg-neutral-800 cursor-pointer border-b border-neutral-800/60 last:border-none flex items-center justify-between text-xs"
                      >
                        <span className="text-white font-bold">{s.name}</span>
                        <span className="text-neutral-400 font-mono px-2 py-0.5 rounded bg-black border border-neutral-700">{s.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SWAP BUTTON */}
            <div className="md:col-span-1 flex items-end justify-center pb-1">
              <button
                type="button"
                onClick={handleSwapStations}
                className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition cursor-pointer shadow"
                title="Swap From and To Stations"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* TO STATION */}
            <div className="md:col-span-4 relative">
              <label className="text-[10px] text-neutral-400 uppercase font-bold mb-1 block">
                TO STATION (CODE / NAME)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={destQuery}
                  onChange={e => {
                    setDestQuery(e.target.value.toUpperCase());
                    setToSuggestionsOpen(true);
                  }}
                  onFocus={() => setToSuggestionsOpen(true)}
                  placeholder="e.g. MYS or Mysuru"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm font-bold placeholder:text-neutral-500 focus:outline-none focus:border-white"
                />
                {toSuggestionsOpen && toSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl bg-neutral-900 border border-neutral-700 shadow-2xl max-h-56 overflow-y-auto">
                    {toSuggestions.map(s => (
                      <div
                        key={`to_${s.code}`}
                        onClick={() => {
                          setDestQuery(s.code);
                          setToSuggestionsOpen(false);
                        }}
                        className="px-4 py-2.5 hover:bg-neutral-800 cursor-pointer border-b border-neutral-800/60 last:border-none flex items-center justify-between text-xs"
                      >
                        <span className="text-white font-bold">{s.name}</span>
                        <span className="text-neutral-400 font-mono px-2 py-0.5 rounded bg-black border border-neutral-700">{s.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* JOURNEY DATE */}
            <div className="md:col-span-3">
              <label className="text-[10px] text-neutral-400 uppercase font-bold mb-1 block">
                JOURNEY DATE
              </label>
              <input
                type="date"
                value={journeyDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setJourneyDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm font-bold focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Secondary Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-800">
            <div className="flex flex-wrap items-center gap-3">
              {/* Passengers Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-400 uppercase font-bold">PASSENGERS:</span>
                <select
                  value={passengerCount}
                  onChange={e => setPassengerCount(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs font-bold focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Class Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-400 uppercase font-bold">CLASS:</span>
                <select
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs font-bold focus:outline-none"
                >
                  {TRAVEL_CLASSES.map(c => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Popular Route Shortcuts */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-neutral-400">
              <span className="font-bold">POPULAR:</span>
              {POPULAR_ROUTES.map(r => (
                <button
                  key={`${r.from}-${r.to}`}
                  type="button"
                  onClick={() => {
                    setSourceQuery(r.from);
                    setDestQuery(r.to);
                  }}
                  className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition cursor-pointer"
                >
                  {r.from} ➔ {r.to}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold text-white uppercase">
              Available Trains ({searchResults.length})
            </h2>
            <span className="text-xs text-neutral-400 font-mono">
              Between {sourceQuery} and {destQuery}
            </span>
          </div>

          <div className="text-[11px] text-neutral-400 font-mono">
            JOURNEY DATE: <strong className="text-white">{journeyDate}</strong>
          </div>
        </div>

        {searchResults.length === 0 ? (
          <div className="p-12 rounded-3xl bg-neutral-950 border border-neutral-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase">No Direct Trains Found For This Corridor</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1">
                No direct trains registered between station codes "{sourceQuery}" and "{destQuery}". Try searching major connecting stations or check all trains on IRCTC.
              </p>
            </div>
            <button
              onClick={() => IrctcBookingService.openOfficialBooking({ sourceStationCode: sourceQuery, destinationStationCode: destQuery, journeyDate })}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase transition inline-flex items-center gap-2 shadow"
            >
              <span>Search Connecting Trains on IRCTC</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {searchResults.map(train => {
              const isVB = train.trainType === 'VANDE_BHARAT';
              return (
                <div
                  key={train.trainNumber}
                  className="p-5 md:p-6 rounded-2xl bg-neutral-950/90 border border-neutral-800 hover:border-neutral-700 transition shadow-xl space-y-4"
                >
                  {/* Top Row: Train Identity */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black border border-neutral-700 flex items-center justify-center text-white shrink-0">
                        <Train className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-lg font-black text-white">{train.trainNumber}</span>
                          <span className="text-sm font-sans font-bold text-neutral-200">{train.trainName}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isVB ? 'bg-amber-950/60 border border-amber-800 text-amber-300' : 'bg-neutral-900 border border-neutral-700 text-neutral-300'
                          }`}>
                            {train.trainType.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          Zone: <strong className="text-neutral-200">{train.zone}</strong> • Rake: <strong className="text-neutral-200">{train.rakeType}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => onInspectTrain(train.trainNumber)}
                        className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-bold uppercase transition cursor-pointer"
                      >
                        Timetable
                      </button>
                      <button
                        onClick={() => onTrackTrain(train.trainNumber)}
                        className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Track</span>
                        <Navigation className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleBookNow(train)}
                        className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5 shadow"
                      >
                        <span>Book Ticket</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Middle Row: Schedule Timing & Distance */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-black border border-neutral-800/80 items-center text-center sm:text-left">
                    <div>
                      <div className="text-xl font-black text-white">{train.departureTime || '06:00'}</div>
                      <div className="text-xs font-bold text-neutral-300">{train.originStationName}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">Code: {train.originStationCode}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="text-xs text-neutral-400 font-mono">
                        {train.durationHours ? `${train.durationHours}h ${train.durationMinutes}m` : 'Direct Service'}
                      </div>
                      <div className="w-24 h-0.5 bg-neutral-700 my-1 relative">
                        <div className="w-2 h-2 rounded-full bg-white absolute -top-0.5 left-1/2 -translate-x-1/2" />
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">{train.totalDistanceKm} KM</div>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-xl font-black text-white">{train.arrivalTime || '18:00'}</div>
                      <div className="text-xs font-bold text-neutral-300">{train.destinationStationName}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">Code: {train.destinationStationCode}</div>
                    </div>
                  </div>

                  {/* Bottom Row: Available Classes & Running Days */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] text-neutral-500 uppercase font-bold">AVAILABLE CLASSES:</span>
                      {(train.classes || '1A, 2A, 3A, SL, 2S').split(',').map(c => (
                        <span
                          key={c.trim()}
                          className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[11px] font-bold"
                        >
                          {c.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] text-neutral-400 font-mono">
                      RUNNING: <strong className="text-neutral-200">{train.runningDays}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Official IRCTC Safety & Legal Notice */}
        <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
          <div className="flex items-center gap-2 text-white font-bold">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official Booking & Passenger Protection Policy</span>
          </div>
          <p>
            This portal searches the genuine Indian Railways train network and pre-fills your journey parameters into the authorized IRCTC booking gateway. In strict compliance with cybersecurity standards, all ticket reservations, payments, and PNR allocations occur securely on <strong>irctc.co.in</strong>. No passwords, OTPs, or payment credentials are ever solicited.
          </p>
        </div>
      </div>
    </div>
  );
};
