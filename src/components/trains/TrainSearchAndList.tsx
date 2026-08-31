import React, { useState, useTransition, useMemo } from 'react';
import { useRailway } from '../../context/RailwayContext';
import {
  Train,
  Search,
  RefreshCw,
  Clock,
  Navigation,
  Sparkles,
  Zap,
  Radio,
  AlertCircle,
  CheckCircle2,
  Filter,
  Layers,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  ExternalLink,
  Eye,
  ArrowRight
} from 'lucide-react';
import { nationalTrainDatabaseService, MasterTrainSummary } from '../../services/railwayApi/nationalTrainDatabaseService';
import { IrctcBookingService } from '../../services/booking/irctcBookingService';
import { SEOHead } from '../seo/SEOHead';
import { DEFAULT_PAGE_SEO } from '../../config/seoConfig';

interface TrainSearchAndListProps {
  onSelectTrain: (trainNumber: string) => void;
  onInspectDetails: (trainNumber: string) => void;
  onOpen3DVisualizer?: (trainNumber: string) => void;
  onSelectStation?: (stationCode: string) => void;
}

export const TrainSearchAndList: React.FC<TrainSearchAndListProps> = ({
  onSelectTrain,
  onInspectDetails,
  onOpen3DVisualizer,
  onSelectStation
}) => {
  const {
    trainPositions,
    refreshTrainTelemetry,
    fetchLiveTrainStatus,
    isTelemetryLoading,
    apiProviderName,
    apiSyncState,
    lastApiSyncTime,
    apiErrorMessage
  } = useRailway();

  const [search, setSearch] = useState<string>('');
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [destFilter, setDestFilter] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [queryLoading, setQueryLoading] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [, startTransition] = useTransition();

  const totalRegisteredTrains = nationalTrainDatabaseService.getTotalTrainsCount();

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshTrainTelemetry(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleQueryLiveTrain = async (trainNum: string) => {
    setQueryLoading(trainNum);
    await fetchLiveTrainStatus(trainNum);
    setQueryLoading(null);
  };

  const handleBookOnIrctc = (e: React.MouseEvent, train: MasterTrainSummary) => {
    e.stopPropagation();
    IrctcBookingService.openOfficialBooking({
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      sourceStationCode: train.originStationCode,
      destinationStationCode: train.destinationStationCode
    });
  };

  // High-performance search result from 13,198 national dataset
  const searchResults = useMemo(() => {
    return nationalTrainDatabaseService.searchTrains({
      query: search,
      category: filterCategory,
      sourceCode: sourceFilter,
      destinationCode: destFilter
    });
  }, [search, filterCategory, sourceFilter, destFilter]);

  // Paginated slice
  const totalPages = Math.max(1, Math.ceil(searchResults.length / itemsPerPage));
  const paginatedTrains = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return searchResults.slice(startIdx, startIdx + itemsPerPage);
  }, [searchResults, currentPage, itemsPerPage]);

  const handleFilterChange = (cat: string) => {
    setFilterCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    startTransition(() => {
      setSearch(val);
      setCurrentPage(1);
    });
  };

  const quickPicks = [
    { num: '20607', name: 'VB (MAS-MYS)' },
    { num: '20643', name: 'VB (MAS-CBE)' },
    { num: '12627', name: 'Karnataka Exp' },
    { num: '12635', name: 'Vaigai Exp' },
    { num: '12673', name: 'Cheran Exp' },
    { num: '12621', name: 'Tamil Nadu Exp' },
    { num: '22436', name: 'VB (NDLS-BSB)' },
    { num: '12951', name: 'Mumbai Rajdhani' }
  ];

  return (
    <div className="space-y-6">
      <SEOHead {...DEFAULT_PAGE_SEO.trains} />

      {/* Top Banner & National Fleet Header */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[11px]">
              <Train className="w-3.5 h-3.5 text-white" />
              <span>NATIONAL INDIAN RAILWAYS FLEET • {totalRegisteredTrains.toLocaleString()} TRAINS REGISTERED</span>
            </div>

            {/* Live API Status Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] border ${
              apiSyncState === 'LIVE'
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 signal-green'
                : apiSyncState === 'CACHED'
                ? 'bg-sky-950/40 text-sky-300 border-sky-800/60'
                : apiSyncState === 'RATE_LIMITED'
                ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                apiSyncState === 'LIVE' ? 'bg-emerald-400 status-dot-live' : apiSyncState === 'CACHED' ? 'bg-sky-400' : 'bg-amber-400'
              }`} />
              <span className="uppercase">
                {apiSyncState === 'LIVE' ? '● LIVE API FEED' : apiSyncState === 'CACHED' ? '▲ CACHED DATA' : apiSyncState === 'RATE_LIMITED' ? '■ RATE-LIMITED' : apiSyncState}
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Nationwide Train Registry & Live Tracking
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1 flex items-center gap-2">
            <span>Provider: <strong className="text-neutral-200">{apiProviderName}</strong></span>
            {lastApiSyncTime && (
              <span>• Last sync: <strong className="text-white">{new Date(lastApiSyncTime).toLocaleTimeString()}</strong></span>
            )}
          </p>
        </div>

        {/* Refresh & Count Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          <div className="px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300 text-right">
            TOTAL FLEET: <strong className="text-white font-bold">{totalRegisteredTrains.toLocaleString()}</strong> | MATCHED: <strong className="text-white font-bold">{searchResults.length.toLocaleString()}</strong>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing || isTelemetryLoading}
            className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold font-mono text-xs uppercase transition flex items-center gap-2 shadow disabled:opacity-50 cursor-pointer"
            title="Force refresh live telemetry pings"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing || isTelemetryLoading ? 'animate-spin' : ''}`} />
            <span>{isRefreshing || isTelemetryLoading ? 'Syncing...' : 'Sync Live'}</span>
          </button>
        </div>
      </div>

      {/* Search & Station-to-Station Strip */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 font-mono text-xs">
          {/* Main Free Text Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by train number, train name, or city (e.g. 20607, 12635, Vaigai)..."
              value={search}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white text-xs font-mono transition"
            />
            {search && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-2.5 text-neutral-500 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Source Station Input */}
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="From Station (e.g. MAS, NDLS, SBC)"
              value={sourceFilter}
              onChange={e => {
                setSourceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white text-xs font-mono transition uppercase"
            />
          </div>

          {/* Destination Station Input */}
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="To Station (e.g. MYS, BSB, HWH)"
              value={destFilter}
              onChange={e => {
                setDestFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white text-xs font-mono transition uppercase"
            />
          </div>
        </div>

        {/* Popular Quick Suggestions */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] text-neutral-400 scrollbar-none font-mono">
          <span className="text-neutral-500 shrink-0">Popular:</span>
          {quickPicks.map(qp => (
            <button
              key={qp.num}
              onClick={() => handleSearchChange(qp.num)}
              className="px-2 py-1 rounded bg-black hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition whitespace-nowrap cursor-pointer"
            >
              {qp.name}
            </button>
          ))}
        </div>

        {/* Regional & Type Filter Tabs */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs scrollbar-none">
            {[
              { id: 'ALL', label: 'ALL INDIA (13,198)' },
              { id: 'SOUTH_INDIA', label: 'SOUTH INDIA (SR/SWR/SCR)' },
              { id: 'TAMIL_NADU', label: 'TAMIL NADU & PY' },
              { id: 'KERALA', label: 'KERALA' },
              { id: 'KARNATAKA', label: 'KARNATAKA' },
              { id: 'ANDHRA_TELANGANA', label: 'AP & TELANGANA' },
              { id: 'NORTH_INDIA', label: 'NORTH INDIA' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition text-[11px] font-semibold cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-white text-black font-bold shadow'
                    : 'bg-black text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs scrollbar-none">
            {[
              { id: 'VANDE_BHARAT', label: 'VANDE BHARAT' },
              { id: 'RAJDHANI', label: 'RAJDHANI / DURONTO' },
              { id: 'SHATABDI', label: 'SHATABDI / TEJAS' },
              { id: 'SUPERFAST', label: 'SUPERFAST & MAIL' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`px-3 py-1 rounded-lg whitespace-nowrap transition text-[10px] cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-neutral-200 text-black font-bold shadow'
                    : 'bg-[#0E0E0E] text-neutral-400 hover:text-neutral-200 border border-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Train Registry Table */}
        <div className="overflow-x-auto rounded-xl border border-neutral-800/60">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3.5">TRAIN NUMBER & OFFICIAL NAME</th>
                <th className="p-3.5">ROUTE & OPERATING ZONE</th>
                <th className="p-3.5">RUNNING DAYS</th>
                <th className="p-3.5">DISTANCE</th>
                <th className="p-3.5">LIVE RUNNING STATUS</th>
                <th className="p-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 bg-[#070707]">
              {paginatedTrains.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500 space-y-3">
                    <Train className="w-8 h-8 mx-auto text-neutral-600 opacity-60" />
                    <div>
                      <p className="text-sm text-neutral-300 font-bold">No trains matched your search criteria</p>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Try searching by train number (e.g. 20607, 12635, 12673, 12623, 12951) or reset station filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedTrains.map(train => {
                  const livePos = trainPositions.find(p => p.trainNumber === train.trainNumber);
                  const isDelayed = (livePos?.delayMinutes || 0) > 5;
                  const isVB = train.trainType === 'VANDE_BHARAT';
                  const isRajdhani = train.trainType === 'RAJDHANI';
                  const isShatabdi = train.trainType === 'SHATABDI';

                  return (
                    <tr
                      key={train.trainNumber}
                      onClick={() => onInspectDetails(train.trainNumber)}
                      className="hover:bg-neutral-950/80 transition cursor-pointer"
                    >
                      {/* Train Number & Name */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white font-mono text-sm tracking-wide">
                            {train.trainNumber}
                          </span>
                          {isVB && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-bold">
                              VB
                            </span>
                          )}
                          {isRajdhani && (
                            <span className="px-1.5 py-0.2 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[9px] font-bold">
                              RAJ
                            </span>
                          )}
                          {isShatabdi && (
                            <span className="px-1.5 py-0.2 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[9px] font-bold">
                              SHT
                            </span>
                          )}
                        </div>
                        <div className="text-neutral-300 font-sans text-xs mt-0.5 line-clamp-1">
                          {train.trainName}
                        </div>
                      </td>

                      {/* Route & Zone */}
                      <td className="p-3.5">
                        <div className="text-white font-medium text-[11px] flex items-center gap-1.5">
                          {onSelectStation ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectStation(train.originStationCode);
                              }}
                              className="hover:underline hover:text-neutral-300"
                            >
                              {train.originStationCode}
                            </button>
                          ) : (
                            <span>{train.originStationCode}</span>
                          )}
                          <ArrowRight className="w-3 h-3 text-neutral-500" />
                          {onSelectStation ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectStation(train.destinationStationCode);
                              }}
                              className="hover:underline hover:text-neutral-300"
                            >
                              {train.destinationStationCode}
                            </button>
                          ) : (
                            <span>{train.destinationStationCode}</span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          Zone: <span className="text-neutral-300 font-bold">{train.zone}</span> • {train.totalCoaches} Coaches
                        </div>
                      </td>

                      {/* Running Days */}
                      <td className="p-3.5 text-[11px] text-neutral-400 max-w-[150px] truncate">
                        {train.runningDays}
                      </td>

                      {/* Distance */}
                      <td className="p-3.5 text-neutral-300 font-mono">
                        {train.totalDistanceKm} km
                      </td>

                      {/* Live Running Status */}
                      <td className="p-3.5">
                        {livePos ? (
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${isDelayed ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                              <span className={`font-semibold ${isDelayed ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {livePos.delayMinutes > 0 ? `+${livePos.delayMinutes}m DELAY` : 'RIGHT TIME'}
                              </span>
                            </div>
                            <div className="text-[10px] text-neutral-400 truncate max-w-[160px]">
                              {livePos.locationMessage || `At ${livePos.nextStationName}`}
                            </div>
                          </div>
                        ) : (
                          <div className="text-neutral-500 text-[10px] flex items-center gap-1">
                            <span>Timetable Verified</span>
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right space-x-1.5">
                        {/* Book on IRCTC button */}
                        <button
                          onClick={(e) => handleBookOnIrctc(e, train)}
                          className="px-2.5 py-1 rounded bg-emerald-950/40 hover:bg-emerald-500 hover:text-black border border-emerald-800/60 text-emerald-300 text-[10px] font-bold uppercase transition cursor-pointer"
                          title="Book on official IRCTC portal"
                        >
                          Book Ticket
                        </button>

                        {/* 3D Cam */}
                        {onOpen3DVisualizer && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpen3DVisualizer(train.trainNumber);
                            }}
                            className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-[10px] font-medium transition cursor-pointer"
                            title="Open 3D Cinematic Cam"
                          >
                            3D Cam
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspectDetails(train.trainNumber);
                          }}
                          className="px-2.5 py-1 rounded bg-white hover:bg-neutral-200 text-black text-[10px] font-bold uppercase transition cursor-pointer"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Strip */}
        {searchResults.length > itemsPerPage && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 font-mono text-xs text-neutral-400">
            <div className="text-[11px]">
              Page {currentPage} of {totalPages} ({searchResults.length.toLocaleString()} matching trains)
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-900 border border-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage >= totalPages}
                className="px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-900 border border-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
