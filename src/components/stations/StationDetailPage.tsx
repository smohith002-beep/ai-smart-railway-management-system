import React, { useMemo } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { getStationByCode, REAL_INDIAN_TRAINS } from '../../services/railwayApi/realIndianRailwaysDataset';
import { nationalTrainDatabaseService } from '../../services/railwayApi/nationalTrainDatabaseService';
import { SEOHead } from '../seo/SEOHead';
import { getStationSchema, getBreadcrumbSchema, getCanonicalUrl, SITE_URL } from '../../config/seoConfig';
import {
  Building2,
  Train,
  Clock,
  Navigation,
  MapPin,
  Compass,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  Search,
  Radio,
  Layers,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { IrctcBookingService } from '../../services/booking/irctcBookingService';

interface StationDetailPageProps {
  stationCode: string;
  onBack: () => void;
  onSelectTrain: (trainNumber: string) => void;
  onInspectTrain: (trainNumber: string) => void;
  onOpenMap: (stationCode: string) => void;
}

export const StationDetailPage: React.FC<StationDetailPageProps> = ({
  stationCode,
  onBack,
  onSelectTrain,
  onInspectTrain,
  onOpenMap
}) => {
  const { trainPositions, setSelectedStationCode } = useRailway();

  const code = stationCode.toUpperCase().trim();
  const station = useMemo(() => nationalTrainDatabaseService.getStationByCode(code) || getStationByCode(code), [code]);

  // Find all real verified trains stopping at or originating from this station
  const stationTrains = useMemo(() => {
    return nationalTrainDatabaseService.searchTrains({
      sourceCode: code
    });
  }, [code]);

  const terminatingTrains = useMemo(() => {
    return nationalTrainDatabaseService.searchTrains({
      destinationCode: code
    });
  }, [code]);

  if (!station) {
    return (
      <div className="p-8 rounded-2xl bg-[#080808] border border-neutral-800 text-center space-y-4">
        <SEOHead
          title={`Station ${code} | AI Smart Railway Management System`}
          description={`Railway station information for code ${code}. Track live trains and departure schedules across Indian Railways.`}
          noindex={true}
        />
        <Building2 className="w-12 h-12 text-neutral-600 mx-auto" />
        <h1 className="text-xl font-bold text-white font-display">Station ({code}) Not Found</h1>
        <p className="text-sm text-neutral-400 font-mono">
          We could not locate station code "{code}" in the primary database.
        </p>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white text-black text-xs font-mono font-bold hover:bg-neutral-200 transition cursor-pointer"
        >
          Back to Station Directory
        </button>
      </div>
    );
  }

  const stationSchema = getStationSchema({
    code: station.code,
    name: station.name,
    zone: station.zone,
    division: station.division,
    latitude: station.latitude,
    longitude: station.longitude,
    platformsCount: station.platformsCount || 4
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Railway Stations', url: '/stations' },
    { name: `${station.name} (${station.code})`, url: `/station/${station.code}` }
  ]);

  return (
    <div className="space-y-6 pb-12 font-sans text-neutral-300">
      <SEOHead
        title={`${station.name} (${station.code}) Railway Station Live Board | Timetable & Map`}
        description={`${station.name} (${station.code}) railway station in ${station.zone} Zone. Live departure boards, platform assignments, coordinates, and connecting trains.`}
        canonicalUrl={getCanonicalUrl(`/station/${station.code.toLowerCase()}`)}
        structuredData={[stationSchema, breadcrumbs]}
      />

      {/* Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-mono text-xs transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>

        <button
          onClick={() => onOpenMap(station.code)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>View on GIS Map</span>
        </button>
      </div>

      {/* Station Header Profile */}
      <header className="p-6 md:p-8 rounded-3xl bg-[#080808] border border-neutral-800 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-white" />
              <span>{station.zone} RAILWAY ZONE • {station.division || `${station.zone} Division`}</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
                {station.name}
              </h1>
              <span className="px-3 py-1 rounded-xl bg-black border border-neutral-700 text-white font-mono font-bold text-base">
                {station.code}
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono mt-2">
              GPS: <strong className="text-white">{station.latitude.toFixed(4)}° N, {station.longitude.toFixed(4)}° E</strong> • Category: <strong className="text-white">{station.category}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => IrctcBookingService.openOfficialBooking({ sourceStationCode: station.code })}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 shadow cursor-pointer"
            >
              <span>Book from {station.code}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Connecting Trains Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold text-white uppercase font-display">
              Originating & Connecting Trains ({stationTrains.length + terminatingTrains.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stationTrains.slice(0, 12).map(train => (
            <div
              key={train.trainNumber}
              onClick={() => onInspectTrain(train.trainNumber)}
              className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition cursor-pointer flex flex-col justify-between space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-white font-mono">{train.trainNumber}</span>
                  <span className="text-xs text-neutral-300 font-bold truncate max-w-[180px]">{train.trainName}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px] font-mono font-bold">
                  {train.trainType.replace('_', ' ')}
                </span>
              </div>

              <div className="text-xs font-mono text-neutral-400 flex items-center justify-between pt-2 border-t border-neutral-900">
                <span>Dest: <strong className="text-white">{train.destinationStationName} ({train.destinationStationCode})</strong></span>
                <span>Dep: <strong className="text-white">{train.departureTime}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
