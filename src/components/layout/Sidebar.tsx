import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRailway } from '../../context/RailwayContext';
import { RailwayLogo } from '../common/RailwayLogo';
import {
  Home,
  Map,
  LayoutDashboard,
  Train,
  UserCheck,
  CalendarDays,
  AlertOctagon,
  Bot,
  BarChart3,
  Server,
  FlaskConical,
  FileText,
  Shield,
  X
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  isOpen,
  onClose
}) => {
  const { currentUser, currentRoleDefinition } = useAuth();
  const { incidents, alerts } = useRailway();

  const activeIncidentsCount = incidents.filter(i => i.status !== 'RESOLVED').length;

  const navItems = [
    { id: 'command', label: 'Command Center', icon: LayoutDashboard, badge: currentRoleDefinition.category },
    { id: 'map', label: 'GIS Live Railway Map', icon: Map },
    { id: 'trains', label: 'Train Registry & ETA', icon: Train },
    { id: 'attendance', label: 'Staff Attendance', icon: UserCheck },
    { id: 'duty', label: 'Duty & Crew Roster', icon: CalendarDays },
    { id: 'copilot', label: 'AI Railway Copilot', icon: Bot },
    { id: 'emergency', label: 'Emergency Center', icon: AlertOctagon, alertCount: activeIncidentsCount },
    { id: 'analytics', label: 'Operational Analytics', icon: BarChart3 },
    { id: 'sources', label: 'Data Sources & Feeds', icon: Server },
    { id: 'simulation', label: 'Simulation Lab', icon: FlaskConical, isSim: true },
    { id: 'audit', label: 'Security Audit Logs', icon: FileText }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#080808] border-r border-neutral-800 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Mobile Header with Close Button */}
          <div className="p-4 flex items-center justify-between border-b border-neutral-800 lg:hidden">
            <span className="font-bold text-sm text-white font-display uppercase tracking-wider">OPERATIONS MENU</span>
            <button onClick={onClose} className="p-1 rounded text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Role Card */}
          <div className="p-4 border-b border-neutral-800/80 bg-neutral-950/60">
            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              <Shield className="w-3 h-3 text-white" />
              <span>{currentRoleDefinition.jurisdictionLevel} JURISDICTION</span>
            </div>
            <div className="font-bold text-sm text-white truncate font-display">
              {currentRoleDefinition.title}
            </div>
            <div className="text-[11px] font-mono text-neutral-500 truncate mt-0.5">
              {currentUser.name} • {currentUser.employeeId}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono transition ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.alertCount !== undefined && item.alertCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[10px] font-mono font-bold">
                      {item.alertCount}
                    </span>
                  )}

                  {item.isSim && (
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${isActive ? 'bg-neutral-800 text-white' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'}`}>
                      DRILL
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Platform Info Box */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/80 font-mono text-[10px] text-neutral-500">
          <div className="flex justify-between items-center mb-1">
            <span>PLATFORM:</span>
            <strong className="text-neutral-300">AI SMART RAILWAY</strong>
          </div>
          <div className="flex justify-between items-center">
            <span>DEVELOPER:</span>
            <span className="text-white font-semibold">MOHITH S</span>
          </div>
        </div>
      </aside>
    </>
  );
};
