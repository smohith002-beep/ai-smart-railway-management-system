import React from 'react';
import {
  Home,
  Search,
  Navigation,
  Star,
  User,
  Radio,
  Train,
  MapPin,
  Clock
} from 'lucide-react';

export type MobileTab = 'HOME' | 'SEARCH' | 'LIVE' | 'SAVED' | 'PROFILE';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  savedCount?: number;
  isLiveActive?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  savedCount = 0,
  isLiveActive = true
}) => {
  const tabs: { id: MobileTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'HOME',
      label: 'Home',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'SEARCH',
      label: 'Search',
      icon: <Search className="w-5 h-5" />
    },
    {
      id: 'LIVE',
      label: 'Live Track',
      icon: (
        <div className="relative">
          <Navigation className="w-5 h-5" />
          {isLiveActive && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 status-dot-live" />
          )}
        </div>
      )
    },
    {
      id: 'SAVED',
      label: 'Saved',
      icon: <Star className="w-5 h-5" />,
      badge: savedCount > 0 ? savedCount : undefined
    },
    {
      id: 'PROFILE',
      label: 'Profile',
      icon: <User className="w-5 h-5" />
    }
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-neutral-800/90 backdrop-blur-xl px-2 py-1.5 shadow-2xl safe-area-bottom"
    >
      <div className="flex items-center justify-around">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition cursor-pointer relative ${
                isActive
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 px-1 rounded-full bg-emerald-500 text-black text-[9px] font-black font-mono">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-mono mt-1 ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
