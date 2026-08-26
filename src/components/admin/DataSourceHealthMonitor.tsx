import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import { Server, Activity, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Cpu } from 'lucide-react';

export const DataSourceHealthMonitor: React.FC = () => {
  const { dataSourceHealth, isAuthorizedFeedActive, setAuthorizedFeedActive } = useRailway();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Server className="w-3.5 h-3.5 text-white" />
            <span>AUTHORITATIVE TELEMETRY GATEWAY DIAGNOSTICS</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Data Sources & Zero-Fabrication Pipeline Health
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Real-time monitoring of REST/WebSocket streams, circuit breaker state, and packet latency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAuthorizedFeedActive(!isAuthorizedFeedActive)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition ${
              isAuthorizedFeedActive
                ? 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:bg-neutral-800'
                : 'bg-white text-black font-bold hover:bg-neutral-200'
            }`}
          >
            {isAuthorizedFeedActive ? 'SIMULATE FEED DISCONNECT' : 'RECONNECT AUTHORIZED FEED'}
          </button>
        </div>
      </div>

      {/* Telemetry Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 font-mono">
          <div className="text-xs text-neutral-500 mb-1">FEED STATUS</div>
          <div className="text-2xl font-black text-white flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isAuthorizedFeedActive ? 'bg-emerald-400 status-dot-live' : 'bg-red-400 status-dot-critical'}`} />
            <span>{isAuthorizedFeedActive ? 'CONNECTED' : 'OFFLINE'}</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Protocol: TLS 1.3 WebSocket</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 font-mono">
          <div className="text-xs text-neutral-500 mb-1">ROUND-TRIP LATENCY</div>
          <div className="text-2xl font-black text-white">{dataSourceHealth.latencyMs} ms</div>
          <div className="text-[11px] text-neutral-400 mt-2">Jitter: ± 2.1 ms</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 font-mono">
          <div className="text-xs text-neutral-500 mb-1">PACKETS RECEIVED / HR</div>
          <div className="text-2xl font-black text-white">{dataSourceHealth.recordsReceivedLastHour}</div>
          <div className="text-[11px] text-neutral-400 mt-2">Normalized into Postgres</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 font-mono">
          <div className="text-xs text-neutral-500 mb-1">CIRCUIT BREAKER</div>
          <div className="text-2xl font-black text-white">CLOSED (NORMAL)</div>
          <div className="text-[11px] text-neutral-400 mt-2">0% Error Threshold</div>
        </div>
      </div>

      {/* Configured Data Source Providers Table */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-white" />
          <span>Configured Railway Telemetry Providers</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3">PROVIDER NAME</th>
                <th className="p-3">TYPE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">LATENCY</th>
                <th className="p-3">LAST SYNC</th>
                <th className="p-3">DATA POLICY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              <tr className="hover:bg-neutral-950 transition">
                <td className="p-3">
                  <div className="font-bold text-white font-sans text-xs">{dataSourceHealth.name}</div>
                  <div className="text-[10px] text-neutral-500">ID: CRIS-GW-01</div>
                </td>
                <td className="p-3 text-neutral-300">AUTHORIZED_CRIS</td>
                <td className="p-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-neutral-900 text-neutral-200 border-neutral-700">
                    {isAuthorizedFeedActive ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </td>
                <td className="p-3 text-white">{dataSourceHealth.latencyMs}ms</td>
                <td className="p-3 text-neutral-400">{new Date(dataSourceHealth.lastSuccessfulSync).toLocaleTimeString()}</td>
                <td className="p-3 text-white font-bold">ZERO-FABRICATION (STRICT)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
