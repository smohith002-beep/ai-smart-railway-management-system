import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { useAuth } from '../../context/AuthContext';
import { IncidentRecord, OperationalAlert, IncidentCategory, IncidentSeverity } from '../../types/railway';
import {
  AlertOctagon,
  Radio,
  Plus,
  CheckCircle2,
  Clock,
  Shield,
  Send,
  X,
  AlertTriangle
} from 'lucide-react';

export const EmergencyIncidentCenter: React.FC = () => {
  const { incidents, alerts, reportIncident, updateIncidentStatus, publishAlert } = useRailway();
  const { currentUser } = useAuth();

  const [isReporting, setIsReporting] = useState<boolean>(false);
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);

  // New incident form state
  const [category, setCategory] = useState<IncidentCategory>('SIGNAL_FAILURE');
  const [severity, setSeverity] = useState<IncidentSeverity>('HIGH');
  const [trainNum, setTrainNum] = useState<string>('22436');
  const [section, setSection] = useState<string>('Delhi-Kanpur Section');
  const [description, setDescription] = useState<string>('');

  // Alert Broadcast form state
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [alertSev, setAlertSev] = useState<'INFO' | 'WARNING' | 'DANGER' | 'CRITICAL'>('WARNING');

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    reportIncident({
      category,
      severity,
      status: 'REPORTED',
      trainNumber: trainNum,
      section,
      description,
      reportedBy: `${currentUser.name} (${currentUser.role})`
    });

    setIsReporting(false);
    setDescription('');
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle.trim() || !alertMsg.trim()) return;

    publishAlert({
      title: alertTitle,
      message: alertMsg,
      severity: alertSev,
      targetAudience: 'ALL',
      active: true,
      publishedBy: `${currentUser.name} (Controller)`
    });

    setIsBroadcasting(false);
    setAlertTitle('');
    setAlertMsg('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <AlertOctagon className="w-3.5 h-3.5 text-white" />
            <span>NATIONAL CRISIS TRIAGE & EMERGENCY DESK</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Emergency Incident Management & Network Broadcast
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Rapid ARMV mobilization • RPF Armed Escort Dispatch • Temporary Speed Restriction (TSR) Broadcast
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => setIsReporting(true)}
            className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold uppercase transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Log Incident</span>
          </button>
          <button
            onClick={() => setIsBroadcasting(true)}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold uppercase transition flex items-center gap-1.5"
          >
            <Radio className="w-4 h-4 text-white" />
            <span>Broadcast TSR</span>
          </button>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4 font-mono text-xs">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
          Active Incident Log ({incidents.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3">INCIDENT ID</th>
                <th className="p-3">CATEGORY & SEVERITY</th>
                <th className="p-3">SECTION / TRAIN</th>
                <th className="p-3">DESCRIPTION</th>
                <th className="p-3">STATUS</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {incidents.map(inc => (
                <tr key={inc.id} className="hover:bg-neutral-950 transition">
                  <td className="p-3 font-bold text-white">{inc.incidentNumber}</td>
                  <td className="p-3">
                    <div className="text-white font-bold">{inc.category}</div>
                    <div className="text-[10px] text-neutral-400">{inc.severity}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-neutral-200">{inc.section}</div>
                    <div className="text-[10px] text-neutral-500">Train #{inc.trainNumber || 'N/A'}</div>
                  </td>
                  <td className="p-3 text-neutral-300 font-sans max-w-xs">{inc.description}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-neutral-900 text-neutral-200 border-neutral-700">
                      {inc.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1.5">
                    {inc.status !== 'RESOLVED' && (
                      <button
                        onClick={() => updateIncidentStatus(inc.id, 'RESOLVED', 'Resolved by Controller')}
                        className="px-2.5 py-1 rounded bg-white hover:bg-neutral-200 text-black font-bold text-[11px]"
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast Modal */}
      {isBroadcasting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <form onSubmit={handleBroadcast} className="w-full max-w-md bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white uppercase text-sm">Broadcast Network Caution Alert</h3>
              <button onClick={() => setIsBroadcasting(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Alert Headline:</label>
              <input
                type="text"
                required
                value={alertTitle}
                onChange={e => setAlertTitle(e.target.value)}
                placeholder="e.g. TSR 30 km/h between NDLS and GZB..."
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Detailed Operational Message:</label>
              <textarea
                required
                rows={3}
                value={alertMsg}
                onChange={e => setAlertMsg(e.target.value)}
                placeholder="Details of restriction, affected trains, and instructions..."
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsBroadcasting(false)}
                className="px-4 py-2 rounded-xl bg-black border border-neutral-800 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold uppercase"
              >
                Broadcast to Network
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Log Incident Modal */}
      {isReporting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <form onSubmit={handleReport} className="w-full max-w-md bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white uppercase text-sm">Log Operational Incident</h3>
              <button onClick={() => setIsReporting(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Category:</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as IncidentCategory)}
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              >
                <option value="SIGNAL_FAILURE">SIGNAL_FAILURE</option>
                <option value="TRACK_OBSTRUCTION">TRACK_OBSTRUCTION</option>
                <option value="MEDICAL">MEDICAL</option>
                <option value="SECURITY_ISSUE">SECURITY_ISSUE</option>
                <option value="FIRE">FIRE</option>
                <option value="EQUIPMENT_FAILURE">EQUIPMENT_FAILURE</option>
                <option value="OPERATIONAL_EMERGENCY">OPERATIONAL_EMERGENCY</option>
              </select>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Section / Location:</label>
              <input
                type="text"
                required
                value={section}
                onChange={e => setSection(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Description:</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Provide accurate factual description..."
                className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsReporting(false)}
                className="px-4 py-2 rounded-xl bg-black border border-neutral-800 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold uppercase"
              >
                Submit Incident Log
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
