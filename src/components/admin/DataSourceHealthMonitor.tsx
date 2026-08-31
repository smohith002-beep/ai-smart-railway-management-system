import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import {
  Server,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Database,
  Key,
  Globe,
  HardDrive,
  ExternalLink
} from 'lucide-react';
import { railwayCache } from '../../services/railwayApi/cacheService';

export const DataSourceHealthMonitor: React.FC = () => {
  const {
    dataSourceHealth,
    isAuthorizedFeedActive,
    setAuthorizedFeedActive,
    isLiveApiConfigured,
    apiProviderName,
    apiSyncState,
    lastApiSyncTime,
    refreshTrainTelemetry,
    isTelemetryLoading
  } = useRailway();

  const [cacheStats, setCacheStats] = useState(() => railwayCache.getStats());

  const handlePurgeCache = () => {
    railwayCache.clearAll();
    setCacheStats(railwayCache.getStats());
    refreshTrainTelemetry(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Server className="w-3.5 h-3.5 text-white" />
            <span>AUTHORITATIVE TELEMETRY GATEWAY & API DIAGNOSTICS</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Data Sources & Zero-Fabrication Pipeline Health
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Real-time monitoring of Third-Party REST APIs, CRIS transponders, multi-tier cache hit ratio & latency.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePurgeCache}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 transition cursor-pointer"
          >
            Clear API Cache
          </button>

          <button
            onClick={() => setAuthorizedFeedActive(!isAuthorizedFeedActive)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition cursor-pointer ${
              isAuthorizedFeedActive
                ? 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:bg-neutral-800'
                : 'bg-white text-black font-bold hover:bg-neutral-200'
            }`}
          >
            {isAuthorizedFeedActive ? 'SIMULATE FEED DISCONNECT' : 'RECONNECT FEED'}
          </button>
        </div>
      </div>

      {/* API Key Status Notice */}
      <div className="p-5 rounded-2xl bg-[#0B0B0B] border border-neutral-800 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-white" />
            <span className="font-bold text-white uppercase text-sm">Third-Party API Authentication Status</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
            isLiveApiConfigured
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
              : 'bg-neutral-900 text-neutral-400 border-neutral-700'
          }`}>
            {isLiveApiConfigured ? 'LIVE API KEY CONFIGURED' : 'USING AUTHENTIC DATASET + REGISTRY'}
          </span>
        </div>

        <p className="text-neutral-400 leading-relaxed text-[11px]">
          {isLiveApiConfigured
            ? `Active Connection: ${apiProviderName}. Live responses are validated against the Indian Railways bounding box before normalisation.`
            : `System is running with full 50+ authentic Indian Railways trains, official routes, and station coordinates. To link RapidAPI IRCTC live endpoint, set VITE_RAILWAY_API_KEY in your .env file.`
          }
        </p>
      </div>

      {/* Telemetry Health Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-xs text-neutral-500 mb-1">FEED STATUS</div>
          <div className="text-2xl font-black text-white flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isAuthorizedFeedActive ? 'bg-emerald-400 status-dot-live' : 'bg-red-400 status-dot-critical'}`} />
            <span>{isAuthorizedFeedActive ? (apiSyncState === 'RATE_LIMITED' ? 'RATE LIMITED' : 'CONNECTED') : 'OFFLINE'}</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Mode: Zero-Fabrication</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-xs text-neutral-500 mb-1">ROUND-TRIP LATENCY</div>
          <div className="text-2xl font-black text-white">{dataSourceHealth.latencyMs} ms</div>
          <div className="text-[11px] text-neutral-400 mt-2">Timeout Threshold: 10,000ms</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-xs text-neutral-500 mb-1">CACHE HIT RATIO</div>
          <div className="text-2xl font-black text-white">{cacheStats.ratio}</div>
          <div className="text-[11px] text-neutral-400 mt-2">Memory: {cacheStats.memoryItems} items cached</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800">
          <div className="text-xs text-neutral-500 mb-1">PACKETS / HOUR</div>
          <div className="text-2xl font-black text-white">{dataSourceHealth.recordsReceivedLastHour}</div>
          <div className="text-[11px] text-neutral-400 mt-2">Normalized & Validated</div>
        </div>
      </div>

      {/* Configured Data Source Providers Table */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-white" />
          <span>Configured Railway Telemetry Providers & Gateways</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3">GATEWAY NAME</th>
                <th className="p-3">TYPE</th>
                <th className="p-3">SYNC STATUS</th>
                <th className="p-3">LATENCY</th>
                <th className="p-3">LAST SYNC</th>
                <th className="p-3">CACHE TTL</th>
                <th className="p-3">DATA INTEGRITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {/* Primary Gateway */}
              <tr className="hover:bg-neutral-950 transition">
                <td className="p-3">
                  <div className="font-bold text-white font-sans text-xs">{dataSourceHealth.name}</div>
                  <div className="text-[10px] text-neutral-500">ID: GW-IN-RAIL-01</div>
                </td>
                <td className="p-3 text-neutral-300">
                  {isLiveApiConfigured ? 'THIRD_PARTY_REST' : 'CRIS_AUTHORITATIVE'}
                </td>
                <td className="p-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-neutral-900 text-emerald-400 border-emerald-800/40">
                    {isAuthorizedFeedActive ? 'ACTIVE' : 'DISCONNECTED'}
                  </span>
                </td>
                <td className="p-3 text-white">{dataSourceHealth.latencyMs}ms</td>
                <td className="p-3 text-neutral-400">
                  {lastApiSyncTime ? new Date(lastApiSyncTime).toLocaleTimeString() : 'Just now'}
                </td>
                <td className="p-3 text-neutral-300">90s (Status)</td>
                <td className="p-3 text-white font-bold">ZERO-FABRICATION (STRICT)</td>
              </tr>

              {/* Multi-Tier Storage Cache */}
              <tr className="hover:bg-neutral-950 transition">
                <td className="p-3">
                  <div className="font-bold text-white font-sans text-xs">Multi-Tier Memory & LocalStorage Cache</div>
                  <div className="text-[10px] text-neutral-500">ID: CACHE-LRU-01</div>
                </td>
                <td className="p-3 text-neutral-300">LOCAL_CACHE</td>
                <td className="p-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-neutral-900 text-sky-400 border-sky-800/40">
                    ONLINE
                  </span>
                </td>
                <td className="p-3 text-white">&lt; 1ms</td>
                <td className="p-3 text-neutral-400">Continuous</td>
                <td className="p-3 text-neutral-300">24h (Timetable)</td>
                <td className="p-3 text-white font-bold">VERIFIED</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
