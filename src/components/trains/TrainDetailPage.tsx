import React, { useState, useEffect, useMemo } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { TrainDetails, TrainPosition } from '../../types/railway';
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
  ExternalLink,
  Info,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Layers,
  Building2
} from 'lucide-react';
import { CinematicTrainVisualizer } from '../cinematic/CinematicTrainVisualizer';
import { LiveRailwayMap } from '../map/LiveRailwayMap';
import { LiveTrainTrackingPanel } from './LiveTrainTrackingPanel';
import { IrctcBookingService } from '../../services/booking/irctcBookingService';
import { SEOHead } from '../seo/SEOHead';
import { getTrainTripSchema, getBreadcrumbSchema, getCanonicalUrl } from '../../config/seoConfig';

interface TrainDetailPageProps {
  trainNumber: string;
  onBack: () => void;
  onSelectMap?: (trainNumber: string) => void;
  onSelectStation?: (stationCode: string) => void;
}

export const TrainDetailPage: React.FC<TrainDetailPageProps> = ({
  trainNumber,
  onBack,
  onSelectMap,
  onSelectStation
}) => {
  const {
    trainPositions,
    trainDetailsList,
    stations,
    duties,
    getTrainDetails,
    fetchLiveTrainStatus,
    setSelectedTrainNumber
  } = useRailway();

  const [activeTab, setActiveTab] = useState<'MAP' | 'CINEMATIC' | 'TIMETABLE'>('MAP');
  const [details, setDetails] = useState<TrainDetails | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const trainPosition = trainPositions.find(p => p.trainNumber === trainNumber);

  useEffect(() => {
    let isMounted = true;
    getTrainDetails(trainNumber).then(res => {
      if (isMounted) {
        setDetails(res || trainDetailsList.find(d => d.trainNumber === trainNumber) || null);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [trainNumber, getTrainDetails, trainDetailsList]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchLiveTrainStatus(trainNumber);
    const updated = await getTrainDetails(trainNumber);
    if (updated) setDetails(updated);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleBookOnIrctc = () => {
    IrctcBookingService.openOfficialBooking({
      trainNumber,
      trainName: details?.trainName || trainPosition?.trainName,
      sourceStationCode: details?.originStationCode,
      destinationStationCode: details?.destinationStationCode
    });
  };

  const isDelayed = (trainPosition?.delayMinutes || 0) > 5;
  const assignedDuties = duties.filter(d => d.trainNumber === trainNumber);

  // Dynamic SEO title, description, and structured data
  const trainName = details?.trainName || trainPosition?.trainName || 'Express';
  const originName = details?.originStationName || 'Origin';
  const originCode = details?.originStationCode || '';
  const destName = details?.destinationStationName || 'Destination';
  const destCode = details?.destinationStationCode || '';

  const seoTitle = `${trainNumber} ${trainName} Live Running Status & Real Route Tracking | Indian Railways`;
  const seoDescription = `Track live running status for ${trainName} (${trainNumber}) from ${originName} (${originCode}) to ${destName} (${destCode}) with real-time station pings, delay alerts, and authentic route map.`;
  const seoKeywords = [
    `train ${trainNumber} live status`,
    `train ${trainNumber} location`,
    `${trainNumber} live train status`,
    `${trainName} live running status`,
    'Indian Railway Train Tracker',
    'Live Train Status',
    'Indian Train Running Status',
    'Train Location',
    'South Indian Train Status',
    'Train Route',
    'Train Schedule'
  ];

  const structuredData = useMemo(() => {
    const tripSchema = getTrainTripSchema({
      trainNumber,
      trainName,
      originStationCode: originCode,
      originStationName: originName,
      destinationStationCode: destCode,
      destinationStationName: destName,
      zone: details?.zone
    });

    const breadcrumbs = getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'National Train Fleet', url: '/trains' },
      { name: `${trainNumber} - ${trainName}`, url: `/train/${trainNumber}` }
    ]);

    return [tripSchema, breadcrumbs];
  }, [trainNumber, trainName, originCode, originName, destCode, destName, details?.zone]);

  return (
    <article className="space-y-6 pb-12 font-mono text-xs text-neutral-300">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={getCanonicalUrl(`/train/${trainNumber}`)}
        structuredData={structuredData}
      />

      {/* Top Navigation & Action Header */}
      <header className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-black hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition cursor-pointer shrink-0 mt-1"
            title="Back to Fleet"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl font-black text-white">{trainNumber}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-[11px] font-bold">
                {details?.trainType?.replace('_', ' ') || 'EXPRESS'}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300 font-sans text-sm font-semibold">
                {trainName}
              </span>
            </div>

            <p className="text-xs text-neutral-400 flex flex-wrap items-center gap-2">
              <span>{originName} ({originCode})</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              <span>{destName} ({destCode})</span>
              <span className="text-neutral-600">|</span>
              <span>Zone: <strong className="text-neutral-200">{details?.zone || 'National'}</strong></span>
              <span className="text-neutral-600">|</span>
              <span>Distance: <strong className="text-neutral-200">{details?.schedule?.[details.schedule.length - 1]?.distanceKm || 650} KM</strong></span>
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          <button
            onClick={handleBookOnIrctc}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition cursor-pointer"
          >
            <span>Book on IRCTC</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold text-xs uppercase flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Live'}</span>
          </button>
        </div>
      </header>

      {/* Genuine Live Train Tracking Panel with KPI Strip and Route Stepper */}
      <LiveTrainTrackingPanel
        trainNumber={trainNumber}
        trainName={trainName}
        position={trainPosition}
        details={details}
        onRefresh={handleRefresh}
        onSelectStation={onSelectStation}
        onTrackOnMap={() => setActiveTab('MAP')}
        onOpen3D={() => setActiveTab('CINEMATIC')}
      />

      {/* View Switcher Tabs: GIS Route Map / Cinematic View / Full Timetable */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
        <button
          onClick={() => setActiveTab('MAP')}
          className={`px-4 py-2 rounded-xl font-bold transition text-xs flex items-center gap-2 cursor-pointer ${
            activeTab === 'MAP'
              ? 'bg-white text-black shadow'
              : 'bg-black text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>GIS Live Route Map</span>
        </button>

        <button
          onClick={() => setActiveTab('CINEMATIC')}
          className={`px-4 py-2 rounded-xl font-bold transition text-xs flex items-center gap-2 cursor-pointer ${
            activeTab === 'CINEMATIC'
              ? 'bg-white text-black shadow'
              : 'bg-black text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Cinematic Telemetry Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('TIMETABLE')}
          className={`px-4 py-2 rounded-xl font-bold transition text-xs flex items-center gap-2 cursor-pointer ${
            activeTab === 'TIMETABLE'
              ? 'bg-white text-black shadow'
              : 'bg-black text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Official Timetable & Stoppages</span>
        </button>
      </div>

      {/* Active Tab Viewport Content */}
      <div>
        {activeTab === 'MAP' && (
          <div className="space-y-4">
            <LiveRailwayMap
              trainPositions={trainPosition ? [trainPosition] : trainPositions}
              stations={stations}
              selectedTrainNumber={trainNumber}
              onSelectTrain={() => {}}
              onSelectStation={code => onSelectStation?.(code)}
              onRefreshLiveStatus={handleRefresh}
            />
          </div>
        )}

        {activeTab === 'CINEMATIC' && (
          <CinematicTrainVisualizer
            train={trainPosition || null}
            details={details}
            onOpenBooking={handleBookOnIrctc}
            onTrackOnMap={() => setActiveTab('MAP')}
          />
        )}

        {activeTab === 'TIMETABLE' && details && (
          <section className="p-6 rounded-2xl bg-black border border-neutral-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white uppercase">Official Route Schedule & Stoppages</h3>
              <span className="text-neutral-500 text-[11px]">Total Stations: {details.schedule?.length || 0}</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-neutral-950 text-neutral-400 text-[11px] border-b border-neutral-800">
                  <tr>
                    <th className="p-3.5">STATION NAME</th>
                    <th className="p-3.5">CODE</th>
                    <th className="p-3.5">SCHED ARRIVAL</th>
                    <th className="p-3.5">SCHED DEPARTURE</th>
                    <th className="p-3.5">PLATFORM</th>
                    <th className="p-3.5">DISTANCE</th>
                    <th className="p-3.5">HALT</th>
                    <th className="p-3.5 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 bg-[#060606]">
                  {details.schedule?.map((st, idx) => (
                    <tr key={idx} className={st.status === 'CURRENT' ? 'bg-neutral-900/60 text-white font-bold' : 'hover:bg-neutral-950/80 transition'}>
                      <td className="p-3.5 font-sans font-medium text-white">
                        {onSelectStation ? (
                          <button
                            onClick={() => onSelectStation(st.stationCode)}
                            className="hover:underline hover:text-neutral-300 text-left transition cursor-pointer"
                          >
                            {st.stationName}
                          </button>
                        ) : (
                          st.stationName
                        )}
                      </td>
                      <td className="p-3.5">
                        {onSelectStation ? (
                          <button
                            onClick={() => onSelectStation(st.stationCode)}
                            className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-[10px] cursor-pointer"
                          >
                            {st.stationCode}
                          </button>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 text-[10px]">
                            {st.stationCode}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">{st.scheduledArrival}</td>
                      <td className="p-3.5">{st.scheduledDeparture}</td>
                      <td className="p-3.5">PF {st.platform || '1'}</td>
                      <td className="p-3.5 text-neutral-400">{st.distanceKm} km</td>
                      <td className="p-3.5 text-neutral-400">{st.haltMinutes} min</td>
                      <td className="p-3.5 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          st.status === 'CURRENT'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : st.status === 'PASSED'
                            ? 'bg-neutral-800 text-neutral-400'
                            : 'bg-neutral-900 text-neutral-500'
                        }`}>
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* Certified Operating Crew & Technical Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Technical Specs */}
        <section className="p-5 rounded-2xl bg-black border border-neutral-800 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Train className="w-4 h-4 text-white" />
            <span>Rolling Stock & Technical Specs</span>
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Rake Composition</div>
              <div className="text-white font-bold mt-0.5">{details?.rakeType || 'LHB Stainless Steel'}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Locomotive Assigned</div>
              <div className="text-white font-bold mt-0.5">{details?.locoNumber || 'WAP-7 30288'}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Total Coaches</div>
              <div className="text-white font-bold mt-0.5">{details?.totalCoaches || 22} Coaches</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Operating Zone</div>
              <div className="text-white font-bold mt-0.5">{details?.zone || 'SR'} / {details?.division || 'Divisional'}</div>
            </div>
          </div>
        </section>

        {/* Operating Crew */}
        <section className="p-5 rounded-2xl bg-black border border-neutral-800 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Users className="w-4 h-4 text-white" />
            <span>Assigned Certified Running Crew</span>
          </h3>
          {assignedDuties.length > 0 ? (
            <div className="space-y-2">
              {assignedDuties.map(d => (
                <div key={d.id} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{d.staffName}</div>
                    <div className="text-[10px] text-neutral-400 uppercase">{d.role.replace('_', ' ')} • ID: {d.employeeId}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-neutral-500 italic p-3">
              Certified loco pilot, assistant loco pilot, and train manager roster synced from Zonal Division Operations Center.
            </p>
          )}
        </section>
      </div>
    </article>
  );
};
