import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { TrainPosition, RailwayStation, TrainDetails, StationScheduleItem } from '../../types/railway';
import {
  Gauge,
  Navigation,
  Clock,
  Train,
  ChevronRight,
  Search,
  Radio,
  Compass,
  MapPin,
  Sparkles,
  Layers,
  AlertCircle,
  RefreshCw,
  Info,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ArrowRight,
  Eye
} from 'lucide-react';
import { nationalTrainDatabaseService } from '../../services/railwayApi/nationalTrainDatabaseService';
import { findRealTrain, getStationByCode } from '../../services/railwayApi/realIndianRailwaysDataset';
import { IrctcBookingService } from '../../services/booking/irctcBookingService';

interface LiveRailwayMapProps {
  trainPositions: TrainPosition[];
  stations: RailwayStation[];
  selectedTrainNumber: string | null;
  onSelectTrain: (trainNumber: string) => void;
  onSelectStation: (stationCode: string) => void;
  onInspectDetails?: (trainNumber: string) => void;
  onRefreshLiveStatus?: (trainNumber: string) => Promise<any>;
}

// Minimalist Monochrome Train Marker Icon Generator with Telemetry Type Classification
const createTrainIcon = (train: TrainPosition, isSelected: boolean) => {
  const isDelayed = train.delayMinutes > 5;
  const isGps = train.telemetryType === 'EXACT_GPS';
  
  let dotColorClass = 'bg-amber-400 status-dot-warning';
  if (isGps) {
    dotColorClass = isDelayed ? 'bg-amber-400 status-dot-warning' : 'bg-emerald-400 status-dot-live';
  } else if (train.telemetryType === 'STATION_REPORTED') {
    dotColorClass = isDelayed ? 'bg-amber-500' : 'bg-sky-400';
  }

  return L.divIcon({
    className: 'custom-train-marker',
    html: `
      <div class="relative flex items-center justify-center cursor-pointer">
        <div class="w-9 h-9 rounded-full bg-[#000000] border-2 ${isSelected ? 'border-white ring-4 ring-white/30 scale-125' : 'border-neutral-600'} flex items-center justify-center shadow-2xl transition-transform hover:scale-125">
          <svg class="w-4 h-4 text-white" style="transform: rotate(${train.headingDegrees}deg);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 19 21 12 17 5 21 12 2" fill="#FFFFFF" fill-opacity="0.95"/>
          </svg>
        </div>
        <span class="absolute -top-1 -right-1 w-3 h-3 rounded-full ${dotColorClass} border border-black"></span>
        <div class="absolute -bottom-5 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/95 border border-neutral-700 text-[10px] font-mono text-white shadow-lg">
          ${train.trainNumber}
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });
};

// Route Station Progression Marker Generator
const createRouteStationIcon = (stationName: string, code: string, status: 'PASSED' | 'CURRENT' | 'UPCOMING') => {
  const isPassed = status === 'PASSED';
  const isCurrent = status === 'CURRENT';

  if (isCurrent) {
    return L.divIcon({
      className: 'custom-route-station-current',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-5 h-5 rounded-full bg-emerald-500 animate-ping absolute opacity-60"></div>
          <div class="w-5 h-5 rounded-full bg-black border-2 border-emerald-400 flex items-center justify-center shadow-lg relative z-10">
            <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>
          <div class="absolute -bottom-4 whitespace-nowrap px-1 rounded bg-black/90 text-[9px] font-mono text-emerald-300 font-bold border border-emerald-800">
            ${code}
          </div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  }

  if (isPassed) {
    return L.divIcon({
      className: 'custom-route-station-passed',
      html: `
        <div class="flex items-center justify-center">
          <div class="w-3.5 h-3.5 rounded-full bg-neutral-900 border border-neutral-600 flex items-center justify-center">
            <div class="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
          </div>
        </div>
      `,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
  }

  return L.divIcon({
    className: 'custom-route-station-upcoming',
    html: `
      <div class="flex items-center justify-center">
        <div class="w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center shadow">
          <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
        </div>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

// General Station Node Marker Generator
const createStationIcon = (station: RailwayStation) => {
  const isTerminal = station.category === 'TERMINAL' || station.category === 'MAJOR_JUNCTION';
  const size = isTerminal ? 5 : 3.5;

  return L.divIcon({
    className: 'custom-station-marker',
    html: `
      <div class="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
        <div style="width: ${size * 2}px; height: ${size * 2}px; background: #000000; border: 1.5px solid #FFFFFF;" class="rounded-full shadow-md flex items-center justify-center">
          <div style="width: ${size}px; height: ${size}px; background: #FFFFFF;" class="rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [size * 2, size * 2],
    iconAnchor: [size, size]
  });
};

// Map Recenter Controller component
const MapRecenter: React.FC<{ center: [number, number]; zoom?: number }> = ({ center, zoom = 7 }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

// Viewport Boundary Controller for smooth rendering of 8,690+ stations
const ViewportController: React.FC<{ onBoundsChange: (bounds: L.LatLngBounds, zoom: number) => void }> = ({ onBoundsChange }) => {
  const map = useMapEvents({
    moveend: () => {
      onBoundsChange(map.getBounds(), map.getZoom());
    },
    zoomend: () => {
      onBoundsChange(map.getBounds(), map.getZoom());
    }
  });

  useEffect(() => {
    onBoundsChange(map.getBounds(), map.getZoom());
  }, [map, onBoundsChange]);

  return null;
};

export const LiveRailwayMap: React.FC<LiveRailwayMapProps> = ({
  trainPositions,
  stations,
  selectedTrainNumber,
  onSelectTrain,
  onSelectStation,
  onInspectDetails,
  onRefreshLiveStatus
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastUpdateTime, setLastUpdateTime] = useState<string>(() => new Date().toLocaleTimeString());
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [currentBounds, setCurrentBounds] = useState<L.LatLngBounds | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(5);

  // Update last update timestamp when train positions update
  useEffect(() => {
    if (trainPositions.length > 0) {
      setLastUpdateTime(new Date().toLocaleTimeString());
    }
  }, [trainPositions]);

  // Combine stations from props and master database
  const allStations = useMemo(() => {
    const dbStations = nationalTrainDatabaseService.getAllStations();
    return dbStations.length > stations.length ? dbStations : stations;
  }, [stations]);

  // Memoized Station Coordinates Cache (O(1) lookup map)
  const stationCoordsMap = useMemo(() => {
    const map = new Map<string, { lat: number; lng: number; name: string }>();
    allStations.forEach(s => {
      map.set(s.code.toUpperCase(), { lat: s.latitude, lng: s.longitude, name: s.name });
    });
    return map;
  }, [allStations]);

  // Validated and localized train positions (GPS fix or genuine reported station fallback)
  const validTrainPositions = useMemo(() => {
    return trainPositions.map(train => {
      let lat = train.latitude;
      let lng = train.longitude;

      // If direct GPS coordinates are invalid, fall back to authentic reported station coordinates
      if (!lat || !lng || isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) {
        const stationFix =
          (train.lastReportedStationCode && stationCoordsMap.get(train.lastReportedStationCode.toUpperCase())) ||
          stationCoordsMap.get(train.nextStationCode.toUpperCase()) ||
          stationCoordsMap.get(train.previousStationCode.toUpperCase());
        if (stationFix) {
          lat = stationFix.lat;
          lng = stationFix.lng;
        }
      }

      return {
        ...train,
        latitude: lat,
        longitude: lng
      };
    }).filter(t => t.latitude && t.longitude && !isNaN(t.latitude) && !isNaN(t.longitude));
  }, [trainPositions, stationCoordsMap]);

  const selectedTrain = validTrainPositions.find(p => p.trainNumber === selectedTrainNumber);

  // Fetch full route topology for the selected train
  const selectedTrainRoute = useMemo(() => {
    if (!selectedTrainNumber) return null;
    const details = nationalTrainDatabaseService.getFullTrainDetails(selectedTrainNumber) || findRealTrain(selectedTrainNumber);
    if (!details || !details.schedule || details.schedule.length < 2) return null;

    const coordinates: [number, number][] = [];
    const routeStationNodes: { code: string; name: string; lat: number; lng: number; status: 'PASSED' | 'CURRENT' | 'UPCOMING'; platform: string }[] = [];

    details.schedule.forEach(st => {
      const stObj = nationalTrainDatabaseService.getStationByCode(st.stationCode) || stationCoordsMap.get(st.stationCode.toUpperCase());
      if (stObj) {
        const lat = 'latitude' in stObj ? stObj.latitude : stObj.lat;
        const lng = 'longitude' in stObj ? stObj.longitude : stObj.lng;
        if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
          coordinates.push([lat, lng]);
          routeStationNodes.push({
            code: st.stationCode,
            name: st.stationName,
            lat,
            lng,
            status: st.status,
            platform: st.platform || '1'
          });
        }
      }
    });

    return {
      details,
      coordinates,
      routeStationNodes
    };
  }, [selectedTrainNumber, stationCoordsMap]);

  const handleManualTrainRefresh = async (trainNum: string) => {
    if (onRefreshLiveStatus) {
      setIsQuerying(true);
      await onRefreshLiveStatus(trainNum);
      setIsQuerying(false);
    }
  };

  const handleBoundsChange = useCallback((bounds: L.LatLngBounds, zoom: number) => {
    setCurrentBounds(bounds);
    setCurrentZoom(zoom);
  }, []);

  // Filtered stations for smooth 60fps rendering (tiered by zoom and viewport)
  const visibleStations = useMemo(() => {
    const routeCodes = new Set(selectedTrainRoute?.routeStationNodes.map(r => r.code) || []);

    if (currentZoom < 6) {
      // At low zoom, only show major junctions/terminals plus route stops
      return allStations.filter(s =>
        s.category === 'TERMINAL' || s.category === 'MAJOR_JUNCTION' || routeCodes.has(s.code)
      ).slice(0, 150);
    }

    if (!currentBounds) return allStations.slice(0, 100);

    // Filter within map viewport
    return allStations.filter(s => {
      if (routeCodes.has(s.code)) return true;
      return currentBounds.contains([s.latitude, s.longitude]);
    }).slice(0, 300);
  }, [allStations, currentBounds, currentZoom, selectedTrainRoute]);

  // Filtered train positions based on search
  const filteredTrains = useMemo(() => {
    return validTrainPositions.filter(train => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          train.trainNumber.toLowerCase().includes(q) ||
          train.trainName.toLowerCase().includes(q) ||
          train.nextStationName.toLowerCase().includes(q) ||
          train.lastReportedStationName?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [validTrainPositions, searchQuery]);

  const mapCenter: [number, number] = useMemo(() => {
    if (selectedTrain && selectedTrain.latitude && selectedTrain.longitude) {
      return [selectedTrain.latitude, selectedTrain.longitude];
    }
    if (selectedTrainRoute && selectedTrainRoute.coordinates.length > 0) {
      const midIdx = Math.floor(selectedTrainRoute.coordinates.length / 2);
      return selectedTrainRoute.coordinates[midIdx];
    }
    return [20.5937, 78.9629]; // Geographic center of India
  }, [selectedTrain, selectedTrainRoute]);

  return (
    <div className="relative w-full h-[620px] md:h-[720px] rounded-2xl overflow-hidden border border-neutral-800 bg-[#080808] shadow-2xl font-mono">
      {/* 1. Master Top Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pointer-events-none">
        {/* Search & Active Selection */}
        <div className="flex items-center gap-2 pointer-events-auto max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search train no, name or corridor..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/90 backdrop-blur-md border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Global Telemetry & Status Badges */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto self-end md:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-neutral-800 text-[11px] text-neutral-300 flex items-center gap-2 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-live" />
            <span>CRIS LIVE TELEMETRY</span>
            <span className="text-neutral-500">|</span>
            <span>{lastUpdateTime}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-neutral-800 text-[11px] text-neutral-300 shadow-xl hidden sm:flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-neutral-400" />
            <span>STATIONS: <strong className="text-white">{allStations.length}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Leaflet Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ background: '#0a0a0a' }}
      >
        <ViewportController onBoundsChange={handleBoundsChange} />

        {/* CartoDB Dark Matter Layer (Clean, 100% Free, No API key required) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {selectedTrain && (
          <MapRecenter center={[selectedTrain.latitude, selectedTrain.longitude]} zoom={8} />
        )}

        {/* Train Route Polyline */}
        {selectedTrainRoute && selectedTrainRoute.coordinates.length > 1 && (
          <>
            <Polyline
              positions={selectedTrainRoute.coordinates}
              pathOptions={{
                color: '#FFFFFF',
                weight: 3.5,
                opacity: 0.85,
                dashArray: '6, 6'
              }}
            />
            {/* Route Intermediate Station Markers */}
            {selectedTrainRoute.routeStationNodes.map(stn => (
              <Marker
                key={`route_stn_${stn.code}`}
                position={[stn.lat, stn.lng]}
                icon={createRouteStationIcon(stn.name, stn.code, stn.status)}
                eventHandlers={{
                  click: () => onSelectStation(stn.code)
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                  <div className="font-mono text-[10px] p-1">
                    <strong className="text-white">{stn.name}</strong> ({stn.code})
                    <div className="text-neutral-400">Status: {stn.status} • PF {stn.platform}</div>
                  </div>
                </Tooltip>
              </Marker>
            ))}
          </>
        )}

        {/* Background Network Station Nodes */}
        {visibleStations.map(station => (
          <Marker
            key={`stn_${station.code}`}
            position={[station.latitude, station.longitude]}
            icon={createStationIcon(station)}
            eventHandlers={{
              click: () => onSelectStation(station.code)
            }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={0.9}>
              <div className="font-mono text-[10px] p-1">
                <strong>{station.name}</strong> ({station.code})
                <div className="text-neutral-400">Zone: {station.zone}</div>
              </div>
            </Tooltip>
          </Marker>
        ))}

        {/* Active Trains on Corridor */}
        {filteredTrains.map(train => {
          const isSelected = train.trainNumber === selectedTrainNumber;
          return (
            <Marker
              key={train.trainNumber}
              position={[train.latitude, train.longitude]}
              icon={createTrainIcon(train, isSelected)}
              eventHandlers={{
                click: () => onSelectTrain(train.trainNumber)
              }}
            >
              <Popup className="custom-dark-popup">
                <div className="font-mono text-xs text-white p-2 min-w-[240px] space-y-2">
                  <div className="flex items-center justify-between border-b border-neutral-700 pb-1.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Train className="w-3.5 h-3.5 text-white" />
                      <span>{train.trainNumber} - {train.trainName}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-neutral-300 space-y-1">
                    <div>LOCATION: <strong className="text-white">{train.locationMessage || train.lastReportedStationName || 'In Transit'}</strong></div>
                    <div>SPEED: <strong className="text-white">{train.speedKmph} KM/H</strong></div>
                    <div>DELAY: <strong className={train.delayMinutes > 5 ? 'text-amber-400' : 'text-emerald-400'}>{train.delayMinutes > 0 ? `+${train.delayMinutes}m` : '0m'}</strong></div>
                    <div>NEXT: <strong className="text-white">{train.nextStationName}</strong></div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-neutral-800">
                    <button
                      onClick={() => onInspectDetails && onInspectDetails(train.trainNumber)}
                      className="flex-1 py-1 px-2 rounded bg-neutral-800 hover:bg-neutral-700 text-[10px] font-bold uppercase transition"
                    >
                      Timetable
                    </button>
                    <button
                      onClick={() => IrctcBookingService.openOfficialBooking({ trainNumber: train.trainNumber, trainName: train.trainName })}
                      className="flex-1 py-1 px-2 rounded bg-emerald-600 hover:bg-emerald-500 text-black text-[10px] font-bold uppercase transition flex items-center justify-center gap-1"
                    >
                      <span>Book</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* 3. Bottom Slide-out Telemetry Inspector when a train is selected */}
      {selectedTrain && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] p-4 rounded-2xl bg-black/95 backdrop-blur-xl border border-neutral-700 shadow-2xl space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-white">{selectedTrain.trainNumber}</span>
                  <span className="text-sm font-sans font-bold text-neutral-200">{selectedTrain.trainName}</span>
                </div>
                <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                  <span>{selectedTrain.locationMessage || selectedTrain.lastReportedStationName || 'In Transit'}</span>
                  <span>•</span>
                  <span>PF {selectedTrain.platformNumber || '1'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => handleManualTrainRefresh(selectedTrain.trainNumber)}
                disabled={isQuerying}
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition cursor-pointer"
                title="Poll Fresh Telemetry"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isQuerying ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={() => onInspectDetails && onInspectDetails(selectedTrain.trainNumber)}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold uppercase transition cursor-pointer"
              >
                Inspect Fleet
              </button>

              <button
                onClick={() => IrctcBookingService.openOfficialBooking({ trainNumber: selectedTrain.trainNumber, trainName: selectedTrain.trainName })}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase flex items-center gap-1.5 shadow transition cursor-pointer"
              >
                <span>Book IRCTC</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
