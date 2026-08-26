import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import { Shield } from 'lucide-react';

export const AuditLogsViewer: React.FC = () => {
  const { auditLogs } = useRailway();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs mb-2">
            <Shield className="w-3.5 h-3.5 text-white" />
            <span>IMMUTABLE SECURITY AUDIT TRAIL</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide">
            Operational Audit Logs & Transaction Ledger
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Tamper-evident record of all duty replacements, attendance modifications, and incident escalations.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-black border border-neutral-800 text-xs font-mono text-neutral-300">
          LOG LEVEL: <strong className="text-white">APEX COMPREHENSIVE</strong>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black text-neutral-500 text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3">TIMESTAMP</th>
                <th className="p-3">OPERATOR / ROLE</th>
                <th className="p-3">ACTION EVENT</th>
                <th className="p-3">RESOURCE</th>
                <th className="p-3">DETAILS / DELTA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-600">
                    No audit records in current session buffer.
                  </td>
                </tr>
              ) : (
                auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-neutral-950 transition">
                    <td className="p-3 text-neutral-500">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="p-3">
                      <div className="text-white font-sans font-bold">{log.userName}</div>
                      <div className="text-[10px] text-neutral-400">{log.userRole}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-200 font-bold border border-neutral-800 text-[10px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-neutral-300">
                      {log.resource} {log.resourceId ? `#${log.resourceId}` : ''}
                    </td>
                    <td className="p-3 text-neutral-400 truncate max-w-xs font-sans text-xs">
                      {log.newState ? JSON.stringify(log.newState) : 'Executed'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
