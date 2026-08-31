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
  X,
  Eye,
  Building2,
  Ticket
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
    { id: 'booking', label: 'Online Ticket Booking', icon: Ticket, isHighlighted: true },
    { id: 'trains', label: 'National Train Fleet (5,200+)', icon: Train },
    { id: 'stations', label: 'Railway Stations (8,690+)', icon: Building2 },
    { id: 'map', label: 'GIS Live Railway Map', icon: Map },
    { id: 'cinematic', label: 'Cinematic 3D Visualizer', icon: Eye },
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
            <button onClick={onClose} className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer">
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
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] font-mono text-xs">
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition text-left cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-md'
                      : (item as any).isHighlighted
                      ? 'text-emerald-300 hover:bg-emerald-950/30 hover:text-emerald-200 border border-emerald-900/50'
                      : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : (item as any).isHighlighted ? 'text-emerald-400' : 'text-neutral-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {/* Badges */}
                  {item.badge && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 uppercase border border-neutral-800">
                      {item.badge}
                    </span>
                  )}
                  {item.alertCount !== undefined && item.alertCount > 0 && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-red-600 text-white font-bold animate-pulse">
                      {item.alertCount}
                    </span>
                  )}
                  {item.isSim && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-400 border border-amber-800/60">
                      LAB
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-neutral-800 text-[10px] font-mono text-neutral-500 space-y-1 bg-black">
          <div className="flex items-center justify-between">
            <span>NETWORK</span>
            <span className="text-white font-bold">INDIAN RAILWAYS</span>
          </div>
          <div className="flex items-center justify-between">
            <span>PLATFORM</span>
            <span className="text-neutral-400">AI SMART RAILWAY</span>
          </div>
          <div className="flex items-center justify-between">
            <span>DATA SOURCE</span>
            <span className="text-emerald-400">VERIFIED CRIS / GIS</span>
          </div>
        </div>
      </aside>
    </>
  );
};
