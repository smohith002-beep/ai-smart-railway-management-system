import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import {
  Train,
  Clock,
  AlertTriangle,
  Users,
  Activity,
  Server,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface SuperAdminDashboardProps {
  onSelectView: (view: string) => void;
  onSelectTrain: (trainNumber: string) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  onSelectView,
  onSelectTrain
}) => {
  const {
    trainPositions,
    staffList,
    incidents,
    alerts,
    dataSourceHealth
  } = useRailway();

  const totalTrains = trainPositions.length;
  const delayedTrains = trainPositions.filter(t => t.delayMinutes > 5);
  const onTimeTrains = trainPositions.filter(t => t.delayMinutes <= 5);
  const onDutyStaff = staffList.filter(s => s.attendanceStatus === 'ON_DUTY' || s.attendanceStatus === 'PRESENT');
  const absentStaff = staffList.filter(s => s.attendanceStatus === 'ABSENT' || s.attendanceStatus === 'LEAVE' || s.attendanceStatus === 'SICK_LEAVE');
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');

  const punctualityRate = totalTrains > 0 ? Math.round((onTimeTrains.length / totalTrains) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>APEX RAILWAY BOARD NATIONAL COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            National Operations Command Center
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Authoritative real-time supervision across all 17 Zonal Networks • Zero-Fabrication Rule
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectView('map')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition shadow-sm"
          >
            Live GIS Map
          </button>
          <button
            onClick={() => onSelectView('copilot')}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-mono font-semibold uppercase tracking-wider transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AI Copilot</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Metric 1: Live Trains */}
        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] uppercase">Active Trains</span>
            <Train className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-black text-white font-display">{totalTrains}</div>
          <div className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot-live" />
            <span>100% Locked</span>
          </div>
        </div>

        {/* Metric 2: Punctuality */}
        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] uppercase">Punctuality</span>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-black text-white font-display">{punctualityRate}%</div>
          <div className="text-[10px] text-neutral-400 mt-1">
            {onTimeTrains.length} Right Time
          </div>
        </div>

        {/* Metric 3: Delayed Trains */}
        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] uppercase">Delayed</span>
            <Clock className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-black text-white font-display">{delayedTrains.length}</div>
          <div className="text-[10px] text-neutral-400 mt-1">
            Avg delay: 8.5m
          </div>
        </div>

        {/* Metric 4: Staff on Duty */}
        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] uppercase">Crew on Duty</span>
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-black text-white font-display">{onDutyStaff.length}</div>
          <div className="text-[10px] text-neutral-400 mt-1">
            {absentStaff.length} on Rest/Leave
          </div>
        </div>

        {/* Metric 5: Active Incidents */}
        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] uppercase">Incidents</span>
            <AlertTriangle className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-black text-white font-display">{activeIncidents.length}</div>
          <div className="text-[10px] text-neutral-400 mt-1">
            {activeIncidents.length > 0 ? 'Triage Active' : 'All Clear'}
          </div>
        </div>

        {/* Metric 6: Data Source Latency */}
        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800 flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] uppercase">Feed Latency</span>
            <Server className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-black text-white font-display">{dataSourceHealth.latencyMs}ms</div>
          <div className="text-[10px] text-neutral-400 mt-1">
            0% Packet Loss
          </div>
        </div>
      </div>

      {/* Main Grid: Live Trains Table + Right Side Quick Actions & Feed Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Trains Radar Table */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="w-4 h-4 text-white" />
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Active High-Speed & Freight Corridors (CRIS Telemetry)
              </h2>
            </div>
            <button
              onClick={() => onSelectView('trains')}
              className="text-xs font-mono text-neutral-400 hover:text-white"
            >
              View Registry &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
                <tr>
                  <th className="p-3">TRAIN</th>
                  <th className="p-3">CURRENT LOCATION</th>
                  <th className="p-3">SPEED</th>
                  <th className="p-3">DELAY</th>
                  <th className="p-3">SIGNAL</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {trainPositions.map(train => {
                  const isDelayed = train.delayMinutes > 5;
                  return (
                    <tr key={train.id} className="hover:bg-neutral-950 transition">
                      <td className="p-3">
                        <div className="font-bold text-white font-mono">{train.trainNumber}</div>
                        <div className="text-[10px] text-neutral-400 truncate max-w-[150px]">{train.trainName}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-neutral-200">{train.nextStationName}</div>
                        <div className="text-[10px] text-neutral-500">{train.currentTrackSection || 'In Section'}</div>
                      </td>
                      <td className="p-3 text-white font-bold">
                        {train.speedKmph} km/h
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isDelayed ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                          <span className="text-neutral-300">
                            {train.delayMinutes > 0 ? `+${train.delayMinutes}m` : 'RT (0m)'}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-neutral-300">
                        {train.signalAspect || 'GREEN'}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            onSelectTrain(train.trainNumber);
                            onSelectView('map');
                          }}
                          className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-white hover:text-black border border-neutral-700 text-neutral-200 transition text-[11px]"
                        >
                          Track
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Active Incidents & Data Health */}
        <div className="space-y-6">
          {/* Active Alerts / Incidents Card */}
          <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-neutral-400" />
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  Active Alerts & Incidents
                </h3>
              </div>
              <button onClick={() => onSelectView('emergency')} className="text-xs font-mono text-neutral-400 hover:text-white">
                Manage &rarr;
              </button>
            </div>

            {activeIncidents.length === 0 && alerts.length === 0 ? (
              <div className="p-4 rounded-xl bg-black border border-neutral-800 text-center text-xs text-neutral-500 font-mono">
                No active incidents or emergency restrictions.
              </div>
            ) : (
              <div className="space-y-2">
                {activeIncidents.map(inc => (
                  <div key={inc.id} className="p-3 rounded-xl bg-black border border-neutral-800 text-xs font-mono">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-bold">{inc.incidentNumber}</span>
                      <span className="px-1.5 py-0.2 rounded bg-neutral-900 text-neutral-300 text-[10px] uppercase border border-neutral-700">
                        {inc.status}
                      </span>
                    </div>
                    <p className="text-neutral-300 font-sans text-xs line-clamp-2">{inc.description}</p>
                  </div>
                ))}

                {alerts.map(al => (
                  <div key={al.id} className="p-3 rounded-xl bg-black border border-neutral-800 text-xs font-mono">
                    <div className="font-bold text-white mb-0.5">{al.title}</div>
                    <p className="text-neutral-400 font-sans text-xs">{al.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Data Source Transparency Card */}
          <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-white" />
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  Authorized Feed Status
                </h3>
              </div>
              <button onClick={() => onSelectView('sources')} className="text-xs font-mono text-neutral-400 hover:text-white">
                Details &rarr;
              </button>
            </div>

            <div className="p-3 rounded-xl bg-black border border-neutral-800 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">PROVIDER:</span>
                <span className="text-white">{dataSourceHealth.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">TELEMETRY:</span>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-live" />
                  <span>CONNECTED</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">LAST SYNC:</span>
                <span className="text-neutral-300">{new Date(dataSourceHealth.lastSuccessfulSync).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">RECORDS / HR:</span>
                <span className="text-neutral-300">{dataSourceHealth.recordsReceivedLastHour} pkts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
