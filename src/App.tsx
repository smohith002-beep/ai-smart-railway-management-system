import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RailwayProvider, useRailway } from './context/RailwayContext';
import { CinematicIntro } from './components/cinematic/CinematicIntro';
import { LandingHero } from './components/landing/LandingHero';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Views
import { RoleDashboardDispatcher } from './components/dashboards/RoleDashboardDispatcher';
import { LiveRailwayMap } from './components/map/LiveRailwayMap';
import { TrainSearchAndList } from './components/trains/TrainSearchAndList';
import { StaffAttendanceManager } from './components/staff/StaffAttendanceManager';
import { DutyRosterView } from './components/duty/DutyRosterView';
import { RailwayAICopilot } from './components/copilot/RailwayAICopilot';
import { EmergencyIncidentCenter } from './components/emergency/EmergencyIncidentCenter';
import { RailwayAnalytics } from './components/analytics/RailwayAnalytics';
import { DataSourceHealthMonitor } from './components/admin/DataSourceHealthMonitor';
import { SimulationLab } from './components/simulation/SimulationLab';
import { AuditLogsViewer } from './components/admin/AuditLogsViewer';

// Modals
import { RoleSwitcher } from './components/roles/RoleSwitcher';
import { TrainDetailModal } from './components/trains/TrainDetailModal';
import { AuthModal } from './components/modals/AuthModal';
import { InfoModals } from './components/modals/InfoModals';

const MainAppContent: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return !sessionStorage.getItem('railway_intro_played');
  });

  const [activeView, setActiveView] = useState<string>('landing');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [infoModalType, setInfoModalType] = useState<'about' | 'status' | 'sources' | 'privacy' | 'terms' | 'accessibility' | null>(null);

  const {
    trainPositions,
    stations,
    selectedTrainNumber,
    setSelectedTrainNumber,
    setSelectedStationCode,
    isAuthorizedFeedActive
  } = useRailway();

  const [inspectedTrainNum, setInspectedTrainNum] = useState<string | null>(null);

  const handleIntroComplete = () => {
    sessionStorage.setItem('railway_intro_played', 'true');
    setShowIntro(false);
  };

  const handleSelectTrain = (num: string) => {
    setSelectedTrainNumber(num);
  };

  const handleInspectDetails = (num: string) => {
    setInspectedTrainNum(num);
  };

  const handleTrackOnMap = (num: string) => {
    setSelectedTrainNumber(num);
    setActiveView('map');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Cinematic Documentary Entrance */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Top Header */}
      <Header
        onOpenRoleSwitcher={() => setRoleSwitcherOpen(true)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenInfoModal={type => setInfoModalType(type)}
        onSelectView={view => setActiveView(view)}
        activeView={activeView}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={view => setActiveView(view)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {activeView === 'landing' && (
            <LandingHero
              onEnterSystem={() => setActiveView('command')}
              onOpenMap={() => setActiveView('map')}
              onOpenStatusModal={() => setInfoModalType('status')}
              onOpenRoleSwitcher={() => setRoleSwitcherOpen(true)}
            />
          )}

          {activeView === 'command' && (
            <RoleDashboardDispatcher
              onSelectView={view => setActiveView(view)}
              onSelectTrain={handleSelectTrain}
              onInspectDetails={handleInspectDetails}
            />
          )}

          {activeView === 'map' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold font-display text-white uppercase">GIS Live Railway Operations Map</h1>
                  <p className="text-xs text-neutral-400 font-mono">Real-time GPS telemetry from CRIS transponders • 17 Zonal Networks</p>
                </div>
              </div>
              <LiveRailwayMap
                trainPositions={trainPositions}
                stations={stations}
                selectedTrainNumber={selectedTrainNumber}
                onSelectTrain={handleSelectTrain}
                onSelectStation={code => setSelectedStationCode(code)}
                onInspectDetails={handleInspectDetails}
              />
            </div>
          )}

          {activeView === 'trains' && (
            <TrainSearchAndList
              onSelectTrain={handleSelectTrain}
              onInspectDetails={handleInspectDetails}
            />
          )}

          {activeView === 'attendance' && (
            <StaffAttendanceManager />
          )}

          {activeView === 'duty' && (
            <DutyRosterView />
          )}

          {activeView === 'copilot' && (
            <RailwayAICopilot
              onSelectTrain={handleSelectTrain}
              onSelectView={view => setActiveView(view)}
            />
          )}

          {activeView === 'emergency' && (
            <EmergencyIncidentCenter />
          )}

          {activeView === 'analytics' && (
            <RailwayAnalytics />
          )}

          {activeView === 'sources' && (
            <DataSourceHealthMonitor />
          )}

          {activeView === 'simulation' && (
            <SimulationLab />
          )}

          {activeView === 'audit' && (
            <AuditLogsViewer />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <RoleSwitcher
        isOpen={roleSwitcherOpen}
        onClose={() => setRoleSwitcherOpen(false)}
      />

      <TrainDetailModal
        trainNumber={inspectedTrainNum}
        onClose={() => setInspectedTrainNum(null)}
        onTrackMap={handleTrackOnMap}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <InfoModals
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />

      {/* Master Footer */}
      <Footer onOpenInfoModal={type => setInfoModalType(type)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <RailwayProvider>
        <MainAppContent />
      </RailwayProvider>
    </AuthProvider>
  );
};

export default App;
