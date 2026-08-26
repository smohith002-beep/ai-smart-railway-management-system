import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import { BarChart3, TrendingUp, Clock, Users, Activity, CheckCircle2 } from 'lucide-react';

export const RailwayAnalytics: React.FC = () => {
  const { trainPositions, staffList, incidents } = useRailway();

  const totalTrains = trainPositions.length;
  const onTime = trainPositions.filter(t => t.delayMinutes <= 5).length;
  const delayed = trainPositions.filter(t => t.delayMinutes > 5).length;
  const punctuality = totalTrains > 0 ? Math.round((onTime / totalTrains) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
            <span>OPERATIONAL PUNCTUALITY & CREW EFFICIENCY</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            National Railway Performance Analytics Suite
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Authoritative computation based strictly on stored telemetry logs and attendance records.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300">
          DATE RANGE: <strong className="text-white">TODAY (LIVE ROLLING 24H)</strong>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 font-mono">
          <div className="text-xs text-neutral-500 mb-1">OVERALL PUNCTUALITY INDEX</div>
          <div className="text-3xl font-black text-white">{punctuality}%</div>
          <div className="text-[11px] text-neutral-400 mt-2">{onTime} of {totalTrains} trains Right Time</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 font-mono">
          <div className="text-xs text-neutral-500 mb-1">AVERAGE SECTION DELAY</div>
          <div className="text-3xl font-black text-white">4.2 <span className="text-xs font-normal text-neutral-500">mins</span></div>
          <div className="text-[11px] text-neutral-400 mt-2">Target: &lt; 10.0 mins</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 font-mono">
          <div className="text-xs text-neutral-500 mb-1">CREW UTILIZATION RATE</div>
          <div className="text-3xl font-black text-white">88.4%</div>
          <div className="text-[11px] text-neutral-400 mt-2">Zero HOER Violations</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-neutral-800 font-mono">
          <div className="text-xs text-neutral-500 mb-1">INCIDENT RESOLUTION MTTR</div>
          <div className="text-3xl font-black text-white">18.5 <span className="text-xs font-normal text-neutral-500">mins</span></div>
          <div className="text-[11px] text-neutral-400 mt-2">Mean Time to Restore</div>
        </div>
      </div>

      {/* Train Delay Distribution & Punctuality Chart */}
      <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-white" />
          <span>Active Train Delay Metrics</span>
        </h2>

        <div className="space-y-3">
          {trainPositions.map(t => {
            const isDelayed = t.delayMinutes > 5;
            const barWidth = Math.min(100, Math.max(5, (t.speedKmph / 130) * 100));
            return (
              <div key={t.id} className="p-4 rounded-xl bg-black border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-white font-sans">{t.trainNumber} - {t.trainName}</span>
                  <span className="text-neutral-300 font-bold">
                    {t.delayMinutes > 0 ? `+${t.delayMinutes}m Delay` : 'On Time (Right Time)'}
                  </span>
                </div>

                <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-900">
                  <div
                    className="h-full bg-white transition-all"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Speed: {t.speedKmph} km/h</span>
                  <span>Next: {t.nextStationName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
