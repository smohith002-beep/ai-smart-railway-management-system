import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TrainPosition, RailwayStation } from '../../types/railway';
import {
  Gauge,
  Navigation,
  Clock,
  Train,
  ChevronRight,
  Search
} from 'lucide-react';

interface LiveRailwayMapProps {
  trainPositions: TrainPosition[];
  stations: RailwayStation[];
  selectedTrainNumber: string | null;
  onSelectTrain: (trainNumber: string) => void;
  onSelectStation: (stationCode: string) => void;
  onInspectDetails?: (trainNumber: string) => void;
}

// Minimalist Monochrome Train Marker Icon Generator
const createTrainIcon = (train: TrainPosition, isSelected: boolean) => {
  const isDelayed = train.delayMinutes > 5;
  const statusDotClass = isDelayed ? 'bg-amber-400 status-dot-warning' : 'bg-emerald-400 status-dot-live';

  return L.divIcon({
    className: 'custom-train-marker',
    html: `
      <div class="relative flex items-center justify-center cursor-pointer">
        <div class="w-8 h-8 rounded-full bg-[#000000] border ${isSelected ? 'border-white ring-2 ring-white scale-110' : 'border-neutral-700'} flex items-center justify-center shadow-lg transition-transform hover:scale-125">
          <svg class="w-4 h-4 text-white" style="transform: rotate(${train.headingDegrees}deg);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 19 21 12 17 5 21 12 2" fill="#FFFFFF" fill-opacity="0.9"/>
          </svg>
        </div>
        <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${statusDotClass}"></span>
        <div class="absolute -bottom-5 whitespace-nowrap px-1.5 py-0.2 rounded bg-black/90 border border-neutral-800 text-[9px] font-mono text-white shadow">
          ${train.trainNumber}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

// Minimalist Monochrome Station Marker Icon Generator
const createStationIcon = (station: RailwayStation) => {
  const isTerminal = station.category === 'TERMINAL';
  const size = isTerminal ? 8 : 6;

  return L.divIcon({
    className: 'custom-station-marker',
    html: `
      <div class="flex items-center justify-center">
        <div style="width: ${size * 2}px; height: ${size * 2}px; background: #000000; border: 2px solid #FFFFFF;" class="rounded-full shadow-md flex items-center justify-center">
          <div style="width: ${size}px; height: ${size}px; background: #FFFFFF;" class="rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [size * 2, size * 2],
    iconAnchor: [size, size]
  });
};

// Map Recenter Controller component
const MapRecenter: React.FC<{ center: [number, number]; zoom?: number }> = ({ center, zoom = 6 }) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

export const LiveRailwayMap: React.FC<LiveRailwayMapProps> = ({
  trainPositions,
  stations,
  selectedTrainNumber,
  onSelectTrain,
  onSelectStation,
  onInspectDetails
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedTrain = trainPositions.find(p => p.trainNumber === selectedTrainNumber);

  // Filtered train positions
  const filteredTrains = trainPositions.filter(train => {
    if (filterStatus === 'ON_TIME' && train.delayMinutes > 5) return false;
    if (filterStatus === 'DELAYED' && train.delayMinutes <= 5) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        train.trainNumber.toLowerCase().includes(q) ||
        train.trainName.toLowerCase().includes(q) ||
        train.nextStationName.toLowerCase().includes(q) ||
        train.previousStationName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // White Clean Railway Track Corridors
  const railwayCorridors: { name: string; positions: [number, number][] }[] = [
    // Delhi - Kanpur - Prayagraj - Varanasi - Howrah (Eastern Trunk)
    {
      name: 'Delhi - Howrah Main Trunk',
      positions: [
        [28.6425, 77.2205],
        [26.4547, 80.3507],
        [25.4497, 81.8282],
        [25.3283, 82.9863],
        [22.5840, 88.3426]
      ]
    },
    // Delhi - Vadodara - Surat - Mumbai Central (Western Trunk)
    {
      name: 'Delhi - Mumbai Western Corridor',
      positions: [
        [28.6425, 77.2205],
        [23.0274, 72.6012],
        [22.3107, 73.1812],
        [21.2049, 72.8406],
        [18.9696, 72.8193]
      ]
    },
    // Chennai - Bengaluru - Mysuru Line
    {
      name: 'Chennai - Bengaluru - Mysuru Line',
      positions: [
        [13.0827, 80.2755],
        [12.9784, 77.5684],
        [12.3164, 76.6457]
      ]
    }
  ];

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-black flex flex-col md:flex-row">
      {/* Interactive Map Canvas */}
      <div className="relative flex-1 h-full">
        <MapContainer
          center={[22.5, 78.5]}
          zoom={5}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          {/* CartoDB Dark Matter Tiles */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a> | CRIS Telemetry'
            maxZoom={18}
          />

          {/* Recenter to selected train if any */}
          {selectedTrain && (
            <MapRecenter center={[selectedTrain.latitude, selectedTrain.longitude]} zoom={8} />
          )}

          {/* Railway Tracks / Network Polylines in crisp white dashed styling */}
          {railwayCorridors.map((corridor, idx) => (
            <Polyline
              key={idx}
              positions={corridor.positions}
              pathOptions={{
                color: '#FFFFFF',
                weight: 2.5,
                opacity: 0.5,
                dashArray: '6, 6'
              }}
            >
              <Tooltip sticky>
                <span className="font-mono text-xs text-white">{corridor.name}</span>
              </Tooltip>
            </Polyline>
          ))}

          {/* Railway Stations Markers */}
          {stations.map(station => (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={createStationIcon(station)}
              eventHandlers={{
                click: () => onSelectStation(station.code)
              }}
            >
              <Popup>
                <div className="p-2 font-sans bg-[#0D0D0D] text-white">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="font-bold text-sm text-white">{station.name}</span>
                    <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-300 border border-neutral-800">
                      {station.code}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 mb-2">
                    {station.zone} Zone • {station.division} Division • {station.platformsCount} Platforms
                  </div>
                  <div className="text-[11px] font-mono text-neutral-300">
                    Active Platforms: {station.platforms.filter(p => p.status === 'OCCUPIED').length} Occupied
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Live Trains Markers */}
          {filteredTrains.map(train => (
            <Marker
              key={train.id}
              position={[train.latitude, train.longitude]}
              icon={createTrainIcon(train, train.trainNumber === selectedTrainNumber)}
              eventHandlers={{
                click: () => onSelectTrain(train.trainNumber)
              }}
            >
              <Popup>
                <div className="p-2 font-sans max-w-xs bg-[#0D0D0D] text-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white font-mono">{train.trainNumber}</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span className={`w-2 h-2 rounded-full ${train.delayMinutes > 5 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <span>{train.delayMinutes > 0 ? `+${train.delayMinutes}m DELAY` : 'RIGHT TIME'}</span>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-300 font-medium mb-2">{train.trainName}</div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-black p-2 rounded border border-neutral-800 mb-2">
                    <div>
                      <div className="text-neutral-500">SPEED</div>
                      <div className="text-white font-bold">{train.speedKmph} km/h</div>
                    </div>
                    <div>
                      <div className="text-neutral-500">NEXT STOP</div>
                      <div className="text-neutral-300 truncate">{train.nextStationName}</div>
                    </div>
                  </div>

                  {onInspectDetails && (
                    <button
                      onClick={() => onInspectDetails(train.trainNumber)}
                      className="w-full mt-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-white text-black text-xs font-mono font-bold uppercase transition hover:bg-neutral-200"
                    >
                      <span>Inspect Telemetry</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Top Floating Search & Filter Bar */}
        <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Search Box */}
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-black/90 border border-neutral-800 backdrop-blur-md shadow-xl max-w-sm flex-1">
            <Search className="w-4 h-4 text-neutral-500 shrink-0" />
            <input
              type="text"
              placeholder="Search train (e.g. 22436, Vande Bharat)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-white placeholder-neutral-500 focus:outline-none w-full font-mono"
            />
          </div>

          {/* Quick Status Filter Tabs */}
          <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-black/90 border border-neutral-800 backdrop-blur-md text-xs font-mono">
            {(['ALL', 'ON_TIME', 'DELAYED'] as const).map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg transition ${
                  filterStatus === st
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {st === 'ALL' ? 'ALL' : st === 'ON_TIME' ? 'ON TIME' : 'DELAYED'}
              </button>
            ))}
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-[400] pointer-events-auto hidden sm:flex items-center gap-4 px-3 py-2 rounded-xl bg-black/90 border border-neutral-800 backdrop-blur-md text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-dot-live" />
            <span>Right Time</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 status-dot-warning" />
            <span>Delayed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>Station Node</span>
          </div>
        </div>
      </div>

      {/* Side HUD Panel (Active Train Inspector) */}
      {selectedTrain && (
        <div className="w-full md:w-84 lg:w-96 bg-[#080808] border-t md:border-t-0 md:border-l border-neutral-800 p-5 flex flex-col justify-between overflow-y-auto z-10">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Train className="w-4 h-4 text-white" />
                <span className="text-xs font-mono text-neutral-400 uppercase">LIVE TELEMETRY HUD</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className={`w-2 h-2 rounded-full ${selectedTrain.delayMinutes > 5 ? 'bg-amber-400 status-dot-warning' : 'bg-emerald-400 status-dot-live'}`} />
                <span className="text-white font-semibold">{selectedTrain.delayMinutes === 0 ? 'RIGHT TIME' : `+${selectedTrain.delayMinutes}m DELAY`}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white font-display mb-1">
              {selectedTrain.trainNumber}
            </h3>
            <p className="text-sm text-neutral-300 font-medium mb-4">
              {selectedTrain.trainName}
            </p>

            {/* Speed & Heading Gauge Card */}
            <div className="grid grid-cols-2 gap-3 mb-4 font-mono">
              <div className="p-3 rounded-xl bg-black border border-neutral-800">
                <div className="text-[10px] text-neutral-500 uppercase mb-1">Speed</div>
                <div className="text-2xl font-black text-white">
                  {selectedTrain.speedKmph} <span className="text-xs font-normal text-neutral-500">KM/H</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black border border-neutral-800">
                <div className="text-[10px] text-neutral-500 uppercase mb-1">Heading</div>
                <div className="text-2xl font-black text-white">
                  {selectedTrain.headingDegrees}° <span className="text-xs font-normal text-neutral-500">TRK</span>
                </div>
              </div>
            </div>

            {/* Current Block Section */}
            <div className="p-3 rounded-xl bg-black border border-neutral-800 text-xs font-mono mb-4">
              <div className="text-neutral-500 mb-1">BLOCK SECTION:</div>
              <div className="text-white font-semibold">{selectedTrain.currentTrackSection || 'Automatic Block Section'}</div>
              <div className="mt-2 flex items-center justify-between text-[11px] pt-2 border-t border-neutral-900">
                <span className="text-neutral-500">SIGNAL AHEAD:</span>
                <strong className="text-emerald-400">{selectedTrain.signalAspect || 'GREEN (CLEAR)'}</strong>
              </div>
            </div>

            {/* Progress Route */}
            <div className="space-y-2 mb-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">PREV STATION:</span>
                <span className="text-neutral-200">{selectedTrain.previousStationName} ({selectedTrain.previousStationCode})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-semibold">NEXT STATION:</span>
                <span className="text-white font-bold">{selectedTrain.nextStationName} ({selectedTrain.nextStationCode})</span>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="pt-4 border-t border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-500 mb-3 space-y-0.5">
              <div>DATA SOURCE: <span className="text-neutral-300">{selectedTrain.source}</span></div>
              <div>TIMESTAMP: <span className="text-neutral-300">{new Date(selectedTrain.providerTimestamp).toLocaleTimeString()}</span></div>
            </div>

            {onInspectDetails && (
              <button
                onClick={() => onInspectDetails(selectedTrain.trainNumber)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <span>View Timetable & Crew</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
