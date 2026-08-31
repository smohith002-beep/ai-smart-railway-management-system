import React, { useState, useMemo } from 'react';
import { RailwayStation } from '../../types/railway';
import { nationalTrainDatabaseService } from '../../services/railwayApi/nationalTrainDatabaseService';
import { SEOHead } from '../seo/SEOHead';
import { DEFAULT_PAGE_SEO } from '../../config/seoConfig';
import {
  Building2,
  Search,
  MapPin,
  Compass,
  ArrowRight,
  Filter,
  Layers,
  Train,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface StationSearchAndListProps {
  onSelectStation: (stationCode: string) => void;
  onOpenMap: (stationCode: string) => void;
}

const ZONES = [
  { id: 'ALL', label: 'All Zones (17 Zones)' },
  { id: 'SR', label: 'Southern (SR)' },
  { id: 'SWR', label: 'South Western (SWR)' },
  { id: 'SCR', label: 'South Central (SCR)' },
  { id: 'NR', label: 'Northern (NR)' },
  { id: 'NCR', label: 'North Central (NCR)' },
  { id: 'WR', label: 'Western (WR)' },
  { id: 'WCR', label: 'West Central (WCR)' },
  { id: 'CR', label: 'Central (CR)' },
  { id: 'ER', label: 'Eastern (ER)' },
  { id: 'ECR', label: 'East Central (ECR)' },
  { id: 'ECoR', label: 'East Coast (ECoR)' },
  { id: 'SER', label: 'South Eastern (SER)' },
  { id: 'SECR', label: 'South East Central (SECR)' },
  { id: 'NWR', label: 'North Western (NWR)' },
  { id: 'NER', label: 'North Eastern (NER)' },
  { id: 'NFR', label: 'Northeast Frontier (NFR)' }
];

export const StationSearchAndList: React.FC<StationSearchAndListProps> = ({
  onSelectStation,
  onOpenMap
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;

  const allStations = useMemo(() => nationalTrainDatabaseService.getAllStations(), []);

  const filteredStations = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allStations.filter(st => {
      if (selectedZone !== 'ALL' && st.zone !== selectedZone) {
        return false;
      }
      if (q) {
        return (
          st.code.toLowerCase().includes(q) ||
          st.name.toLowerCase().includes(q) ||
          (st.division && st.division.toLowerCase().includes(q)) ||
          ((st as any).state && (st as any).state.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [allStations, search, selectedZone]);

  const totalPages = Math.max(1, Math.ceil(filteredStations.length / itemsPerPage));
  const paginatedStations = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredStations.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredStations, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 pb-12 font-sans text-neutral-300">
      <SEOHead {...DEFAULT_PAGE_SEO.stations} />

      {/* Hero Header */}
      <header className="p-6 md:p-8 rounded-3xl bg-[#080808] border border-neutral-800 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-neutral-400" />
          <span>INDIAN RAILWAYS STATION NETWORK • {allStations.length.toLocaleString()} STATIONS REGISTERED</span>
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black font-display tracking-tight text-white uppercase">
          Railway Stations & Live Departure Boards
        </h1>

        <p className="text-sm md:text-base text-neutral-400 font-sans max-w-3xl leading-relaxed">
          Search all verified railway stations, junctions, and terminals across Indian Railways. Inspect live platforms, connected trains, and geographic coordinates.
        </p>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search station by name (e.g. Chennai Central, Coimbatore, New Delhi, Hubballi) or code (MAS, CBE, NDLS, UBL)..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-500 text-xs font-mono focus:border-white focus:outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0 overflow-x-auto">
            <Filter className="w-4 h-4 text-neutral-500 shrink-0" />
            <select
              value={selectedZone}
              onChange={e => {
                setSelectedZone(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-3 rounded-xl bg-black border border-neutral-800 text-white text-xs font-mono focus:border-white focus:outline-none transition cursor-pointer"
            >
              {ZONES.map(z => (
                <option key={z.id} value={z.id}>
                  {z.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800">
          <span>MATCHED STATIONS: <strong className="text-white">{filteredStations.length.toLocaleString()}</strong></span>
          <span>PAGE <strong className="text-white">{currentPage}</strong> OF <strong className="text-white">{totalPages}</strong></span>
        </div>
      </header>

      {/* Station Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedStations.map(station => (
          <div
            key={station.code}
            onClick={() => onSelectStation(station.code)}
            className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 hover:border-neutral-700 transition cursor-pointer flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-black border border-neutral-800 text-white font-mono font-bold text-xs">
                  {station.code}
                </span>
                <span className="text-[11px] font-mono text-neutral-500 uppercase">
                  {station.zone} ZONE
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-neutral-200 transition font-display">
                  {station.name}
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  {station.division || `${station.zone} Division`} {(station as any).state ? `• ${(station as any).state}` : ''}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-xs font-mono">
              <div className="text-neutral-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>{station.latitude.toFixed(3)}°, {station.longitude.toFixed(3)}°</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    onOpenMap(station.code);
                  }}
                  className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-[11px] transition"
                >
                  Map
                </button>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 font-mono text-xs pt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-4 py-2 rounded-xl bg-black border border-neutral-800 text-neutral-300">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
