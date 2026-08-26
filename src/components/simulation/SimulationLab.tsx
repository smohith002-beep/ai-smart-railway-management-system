import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import {
  FlaskConical,
  AlertTriangle,
  Clock,
  Radio,
  Train,
  HeartPulse,
  RotateCcw,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const SimulationLab: React.FC = () => {
  const {
    trainPositions,
    isSimulationMode,
    setSimulationMode,
    injectSimulationDelay,
    injectSimulationEmergency
  } = useRailway();

  const [selectedTrainNum, setSelectedTrainNum] = useState<string>('22436');
  const [delayMinutesToAdd, setDelayMinutesToAdd] = useState<number>(20);

  const handleInjectDelay = () => {
    setSimulationMode(true);
    injectSimulationDelay(selectedTrainNum, delayMinutesToAdd);
  };

  const handleInjectDrill = (type: 'SIGNAL_FAILURE' | 'MEDICAL' | 'TRACK_OBSTRUCTION') => {
    setSimulationMode(true);
    injectSimulationEmergency(type, selectedTrainNum);
  };

  const handleReset = () => {
    setSimulationMode(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Permanent Warning Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border-2 border-neutral-600 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shrink-0">
            <FlaskConical className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-neutral-400 font-mono font-bold text-xs tracking-widest uppercase">
              ⚠ SANDBOXED DRILL & TRAINING TESTBED
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white font-display uppercase tracking-wide">
              SIMULATION MODE — NOT REAL RAILWAY DATA
            </h1>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Isolated operational simulator for driver training, controller drills, and contingency validation.
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-mono flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Live Feed</span>
        </button>
      </div>

      {/* Drill Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drill 1: Inject Train Delays */}
        <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-white" />
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Inject Artificial Train Delay
            </h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-neutral-400 block mb-1">Target Train:</label>
              <select
                value={selectedTrainNum}
                onChange={e => setSelectedTrainNum(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              >
                {trainPositions.map(t => (
                  <option key={t.id} value={t.trainNumber}>
                    {t.trainNumber} - {t.trainName} (Current: {t.delayMinutes}m delay)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Delay to Inject (Minutes):</label>
              <div className="flex items-center gap-2">
                {[15, 30, 60, 120].map(mins => (
                  <button
                    key={mins}
                    onClick={() => setDelayMinutesToAdd(mins)}
                    className={`flex-1 py-2 rounded-xl border transition ${
                      delayMinutesToAdd === mins
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-black text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    +{mins}m
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleInjectDelay}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold tracking-wide transition uppercase"
            >
              Inject +{delayMinutesToAdd}m Delay to Train #{selectedTrainNum}
            </button>
          </div>
        </div>

        {/* Drill 2: Inject Emergency Incidents */}
        <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-white" />
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Trigger Operational Emergency Drills
            </h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <p className="text-neutral-400 font-sans text-xs">
              Inject drill scenarios into the dispatch console to test controller triage and response times:
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => handleInjectDrill('SIGNAL_FAILURE')}
                className="p-3 rounded-xl bg-black border border-neutral-800 hover:border-white text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-white">Signal Interlocking Failure Drill</div>
                  <div className="text-[11px] text-neutral-400 font-sans">Simulates point clamp failure on Approach Block.</div>
                </div>
                <Radio className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => handleInjectDrill('MEDICAL')}
                className="p-3 rounded-xl bg-black border border-neutral-800 hover:border-white text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-white">Passenger Medical Trauma SOS Drill</div>
                  <div className="text-[11px] text-neutral-400 font-sans">Dispatches ARMV ambulance and station trauma team.</div>
                </div>
                <HeartPulse className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => handleInjectDrill('TRACK_OBSTRUCTION')}
                className="p-3 rounded-xl bg-black border border-neutral-800 hover:border-white text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-white">Track Obstruction & Caution Order Drill</div>
                  <div className="text-[11px] text-neutral-400 font-sans">Imposes automatic 30 km/h temporary speed restriction.</div>
                </div>
                <AlertTriangle className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
