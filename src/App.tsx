import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext';
import { RailwayProvider, useRailway } from './context/RailwayContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LandingHero } from './components/landing/LandingHero';
import { RoleDashboardDispatcher } from './components/dashboards/RoleDashboardDispatcher';
import { LiveRailwayMap } from './components/map/LiveRailwayMap';
import { TrainSearchAndList } from './components/trains/TrainSearchAndList';
import { TrainDetailPage } from './components/trains/TrainDetailPage';
import { SavedTrainsView } from './components/trains/SavedTrainsView';
import { MobileBottomNav, MobileTab } from './components/mobile/MobileBottomNav';
import { StationSearchAndList } from './components/stations/StationSearchAndList';
import { StationDetailPage } from './components/stations/StationDetailPage';
import { CinematicTrainVisualizer } from './components/cinematic/CinematicTrainVisualizer';
import { TicketBookingView } from './components/booking/TicketBookingView';
import { StaffAttendanceManager } from './components/staff/StaffAttendanceManager';
import { DutyRosterView } from './components/duty/DutyRosterView';
import { RailwayAICopilot } from './components/copilot/RailwayAICopilot';
import { EmergencyIncidentCenter } from './components/emergency/EmergencyIncidentCenter';
import { RailwayAnalytics } from './components/analytics/RailwayAnalytics';
import { DataSourceHealthMonitor } from './components/admin/DataSourceHealthMonitor';
import { SimulationLab } from './components/simulation/SimulationLab';
import { AuditLogsViewer } from './components/admin/AuditLogsViewer';
import { RoleSwitcher } from './components/roles/RoleSwitcher';
import { TrainDetailModal } from './components/trains/TrainDetailModal';
import { AuthModal } from './components/modals/AuthModal';
import { InfoModals } from './components/modals/InfoModals';
import { SEOHead } from './components/seo/SEOHead';
import { DEFAULT_PAGE_SEO } from './config/seoConfig';
import { parseCurrentUrl, pushRoute } from './utils/router';
import { nationalTrainDatabaseService } from './services/railwayApi/nationalTrainDatabaseService';

const MainAppContent: React.FC = () => {
  // Initialize route from browser URL
  const initialRoute = parseCurrentUrl();

  const [activeView, setActiveView] = useState<string>(initialRoute.view);
  const [inspectedTrainNum, setInspectedTrainNum] = useState<string | null>(initialRoute.trainNumber || null);
  const [inspectedStationCode, setInspectedStationCode] = useState<string | null>(initialRoute.stationCode || null);
  const [mobileTab, setMobileTab] = useState<MobileTab>('HOME');

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [infoModalType, setInfoModalType] = useState<'about' | 'status' | 'sources' | 'privacy' | 'terms' | 'accessibility' | null>(null);

  const {
    trainPositions,
    trainDetailsList,
    stations,
    selectedTrainNumber,
    setSelectedTrainNumber,
    setSelectedStationCode,
    fetchLiveTrainStatus,
    isAuthorizedFeedActive
  } = useRailway();

  // Synchronize state when browser back/forward buttons are pressed
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentUrl();
      setActiveView(route.view);
      if (route.trainNumber) {
        setInspectedTrainNum(route.trainNumber);
        setSelectedTrainNumber(route.trainNumber);
      }
      if (route.stationCode) {
        setInspectedStationCode(route.stationCode);
        setSelectedStationCode(route.stationCode);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setSelectedTrainNumber, setSelectedStationCode]);

  // Navigate helper with history push
  const navigateTo = useCallback((view: string, params?: { trainNumber?: string; stationCode?: string }) => {
    setActiveView(view);
    if (params?.trainNumber) {
      setInspectedTrainNum(params.trainNumber);
      setSelectedTrainNumber(params.trainNumber);
    }
    if (params?.stationCode) {
      setInspectedStationCode(params.stationCode);
      setSelectedStationCode(params.stationCode);
    }
    pushRoute(view, params);
  }, [setSelectedTrainNumber, setSelectedStationCode]);

  const handleSelectTrain = (trainNumber: string) => {
    setSelectedTrainNumber(trainNumber);
    fetchLiveTrainStatus(trainNumber);
  };

  const handleInspectDetails = (trainNumber: string) => {
    navigateTo('details', { trainNumber });
  };

  const handleInspectStation = (stationCode: string) => {
    navigateTo('station-details', { stationCode });
  };

  const handleOpen3D = (trainNumber: string) => {
    navigateTo('cinematic', { trainNumber });
  };

  const handleTrackOnMap = (trainNumber: string) => {
    setSelectedTrainNumber(trainNumber);
    navigateTo('map');
  };

  const handleOpenStationOnMap = (stationCode: string) => {
    setSelectedStationCode(stationCode);
    navigateTo('map');
  };

  const targetTrainNum = inspectedTrainNum || selectedTrainNumber || '20607';
  const selectedTrainPos = trainPositions.find(p => p.trainNumber === targetTrainNum) || trainPositions[0] || null;
  const selectedTrainDet = nationalTrainDatabaseService.getFullTrainDetails(targetTrainNum) || trainDetailsList.find(d => d.trainNumber === targetTrainNum) || trainDetailsList[0] || null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Master Top Header */}
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenRoleSwitcher={() => setRoleSwitcherOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenInfoModal={type => setInfoModalType(type)}
        onSelectView={view => navigateTo(view)}
        activeView={activeView}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={view => navigateTo(view)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {activeView === 'landing' && (
            <LandingHero
              onEnterSystem={() => navigateTo('command')}
              onOpenMap={() => navigateTo('map')}
              onOpenTrains={() => navigateTo('trains')}
              onOpenStations={() => navigateTo('stations')}
              onOpenStatusModal={() => setInfoModalType('status')}
              onOpenRoleSwitcher={() => setRoleSwitcherOpen(true)}
            />
          )}

          {activeView === 'command' && (
            <RoleDashboardDispatcher
              onSelectView={view => navigateTo(view)}
              onSelectTrain={handleSelectTrain}
              onInspectDetails={handleInspectDetails}
            />
          )}

          {activeView === 'booking' && (
            <TicketBookingView
              onInspectTrain={handleInspectDetails}
              onTrackTrain={handleTrackOnMap}
            />
          )}

          {activeView === 'map' && (
            <div className="space-y-4">
              <SEOHead {...DEFAULT_PAGE_SEO.map} />
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold font-display text-white uppercase">GIS Live Railway Operations Map</h1>
                  <p className="text-xs text-neutral-400 font-mono">OpenStreetMap Free Tile Layer • Real-Time CRIS Telemetry • 17 Zonal Networks</p>
                </div>
              </div>
              <LiveRailwayMap
                trainPositions={trainPositions}
                stations={stations}
                selectedTrainNumber={selectedTrainNumber}
                onSelectTrain={handleSelectTrain}
                onSelectStation={code => setSelectedStationCode(code)}
                onInspectDetails={handleInspectDetails}
                onRefreshLiveStatus={fetchLiveTrainStatus}
              />
            </div>
          )}

          {activeView === 'trains' && (
            <TrainSearchAndList
              onSelectTrain={handleSelectTrain}
              onInspectDetails={handleInspectDetails}
              onOpen3DVisualizer={handleOpen3D}
              onSelectStation={handleInspectStation}
            />
          )}

          {activeView === 'stations' && (
            <StationSearchAndList
              onSelectStation={handleInspectStation}
              onOpenMap={handleOpenStationOnMap}
            />
          )}

          {activeView === 'station-details' && inspectedStationCode && (
            <StationDetailPage
              stationCode={inspectedStationCode}
              onBack={() => navigateTo('stations')}
              onSelectTrain={handleSelectTrain}
              onInspectTrain={handleInspectDetails}
              onOpenMap={handleOpenStationOnMap}
            />
          )}

          {activeView === 'cinematic' && (
            <div className="space-y-4">
              <SEOHead {...DEFAULT_PAGE_SEO.cinematic} />
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold font-display text-white uppercase">Cinematic 3D Train Visualizer & Camera</h1>
                  <p className="text-xs text-neutral-400 font-mono">Interactive WebGL 3D Camera • Real GIS Route Extrusion • Live Telemetry HUD</p>
                </div>
                <button
                  onClick={() => navigateTo('trains')}
                  className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono border border-neutral-700 transition cursor-pointer"
                >
                  Back to Fleet
                </button>
              </div>
              <CinematicTrainVisualizer
                train={selectedTrainPos}
                details={selectedTrainDet}
                onClose={() => navigateTo('trains')}
                onTrackOnMap={handleTrackOnMap}
                onSelectStation={handleInspectStation}
              />
            </div>
          )}

          {activeView === 'details' && inspectedTrainNum && (
            <TrainDetailPage
              trainNumber={inspectedTrainNum}
              onBack={() => navigateTo('trains')}
              onSelectMap={handleTrackOnMap}
              onSelectStation={handleInspectStation}
            />
          )}

          {activeView === 'attendance' && (
            <StaffAttendanceManager />
          )}

          {activeView === 'duty' && (
            <DutyRosterView />
          )}

          {activeView === 'copilot' && (
            <div>
              <SEOHead {...DEFAULT_PAGE_SEO.copilot} />
              <RailwayAICopilot
                onSelectTrain={handleSelectTrain}
                onSelectView={view => navigateTo(view)}
              />
            </div>
          )}

          {activeView === 'emergency' && (
            <EmergencyIncidentCenter />
          )}

          {activeView === 'analytics' && (
            <div>
              <SEOHead {...DEFAULT_PAGE_SEO.analytics} />
              <RailwayAnalytics />
            </div>
          )}

          {activeView === 'saved' && (
            <SavedTrainsView
              onInspectDetails={handleInspectDetails}
              onTrackOnMap={handleTrackOnMap}
              onExploreFleet={() => navigateTo('trains')}
            />
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

      {/* Master Footer (Hidden on mobile when bottom nav is active) */}
      <div className="hidden md:block">
        <Footer onOpenInfoModal={type => setInfoModalType(type)} />
      </div>

      {/* Mobile Native App Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={
          activeView === 'dashboard' || activeView === 'home' || activeView === 'landing'
            ? 'HOME'
            : activeView === 'trains' || activeView === 'stations' || activeView === 'booking'
            ? 'SEARCH'
            : activeView === 'map' || activeView === 'cinematic'
            ? 'LIVE'
            : activeView === 'saved'
            ? 'SAVED'
            : 'PROFILE'
        }
        onTabChange={tab => {
          setMobileTab(tab);
          if (tab === 'HOME') navigateTo('landing');
          if (tab === 'SEARCH') navigateTo('booking');
          if (tab === 'LIVE') navigateTo('map');
          if (tab === 'SAVED') navigateTo('saved');
          if (tab === 'PROFILE') setRoleSwitcherOpen(true);
        }}
      />
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
