import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRailway } from '../../context/RailwayContext';
import { RailwayLogo } from '../common/RailwayLogo';
import {
  Shield,
  Volume2,
  VolumeX,
  Radio,
  Clock,
  Menu,
  ChevronDown,
  AlertTriangle,
  User
} from 'lucide-react';

interface HeaderProps {
  onOpenRoleSwitcher: () => void;
  onToggleSidebar: () => void;
  onOpenAuthModal: () => void;
  onOpenInfoModal: (type: 'about' | 'status' | 'sources' | 'privacy' | 'terms' | 'accessibility') => void;
  onSelectView: (view: string) => void;
  activeView: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRoleSwitcher,
  onToggleSidebar,
  onOpenAuthModal,
  onOpenInfoModal,
  onSelectView,
  activeView
}) => {
  const { currentUser, currentRoleDefinition } = useAuth();
  const {
    isMuted,
    toggleSound,
    dataSourceHealth,
    isSimulationMode,
    isAuthorizedFeedActive
  } = useRailway();

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }) + ' IST');
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#000000] border-b border-neutral-800/90 px-4 lg:px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Left: Branding & Mobile Menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => onSelectView('landing')}
          className="cursor-pointer"
          title="Return to Landing Overview"
        >
          <RailwayLogo variant="full" />
        </div>
      </div>

      {/* Center: Live Clock & Data Source Freshness Tag */}
      <div className="hidden md:flex items-center gap-3 font-mono text-xs">
        {/* Simulation Mode Indicator */}
        {isSimulationMode && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-amber-500/60 text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 status-dot-warning" />
            <span>SIMULATION DRILL ACTIVE</span>
          </div>
        )}

        {/* Real-time Telemetry Source */}
        <button
          onClick={() => onOpenInfoModal('sources')}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 transition"
        >
          <span className={`w-2 h-2 rounded-full ${isAuthorizedFeedActive ? 'bg-emerald-500 status-dot-live' : 'bg-red-500 status-dot-critical'}`} />
          <span>{isAuthorizedFeedActive ? `CRIS FEED: LIVE (${dataSourceHealth.latencyMs}ms)` : 'FEED: OFFLINE'}</span>
        </button>

        {/* Real-time IST Clock */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300">
          <Clock className="w-3.5 h-3.5 text-neutral-400" />
          <span>{currentTime}</span>
        </div>
      </div>

      {/* Right: Audio Toggle, Role Switcher & Auth Profile */}
      <div className="flex items-center gap-2.5">
        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className="p-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition"
          title={isMuted ? 'Unmute Operational Audio' : 'Mute Operational Audio'}
          aria-label="Toggle Audio"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-white" />}
        </button>

        {/* Role Switcher Button */}
        <button
          onClick={onOpenRoleSwitcher}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-200 transition"
          title="Switch Active Railway Operational Role (23 Roles)"
        >
          <Shield className="w-4 h-4 text-white" />
          <div className="text-left hidden xl:block">
            <div className="text-[9px] text-neutral-500 uppercase leading-none">ROLE</div>
            <div className="font-semibold text-white leading-tight">{currentRoleDefinition.title}</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {/* User Profile Button */}
        <button
          onClick={onOpenAuthModal}
          className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition"
        >
          <div className="w-7 h-7 rounded bg-white text-black flex items-center justify-center font-bold text-xs">
            {currentUser.name.charAt(0)}
          </div>
          <span className="text-xs font-medium text-neutral-200 hidden sm:inline max-w-[110px] truncate">
            {currentUser.name}
          </span>
        </button>
      </div>
    </header>
  );
};
