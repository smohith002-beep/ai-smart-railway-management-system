import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  TrainPosition,
  TrainDetails,
  RailwayStation,
  StaffMember,
  AttendanceRecord,
  DutyAssignment,
  DutyChangeLog,
  IncidentRecord,
  OperationalAlert,
  DataSourceHealth,
  AuditLogItem,
  RailwayRole,
  AttendanceStatus,
  IncidentStatus,
  IncidentCategory,
  IncidentSeverity
} from '../types/railway';
import { MockAuthorizedRailwayProvider, MOCK_STATIONS, MOCK_TRAIN_DETAILS, MOCK_STAFF_MEMBERS } from '../services/provider/mockAuthorizedProvider';
import { FreshnessChecker } from '../services/provider/freshnessChecker';
import { soundService } from '../services/sound/soundService';
import { useAuth } from './AuthContext';

interface RailwayContextType {
  // Train Data
  trainPositions: TrainPosition[];
  trainDetailsList: TrainDetails[];
  selectedTrainNumber: string | null;
  setSelectedTrainNumber: (num: string | null) => void;
  getTrainDetails: (num: string) => Promise<TrainDetails | null>;
  
  // Stations
  stations: RailwayStation[];
  selectedStationCode: string | null;
  setSelectedStationCode: (code: string | null) => void;

  // Staff & Attendance
  staffList: StaffMember[];
  attendanceRecords: AttendanceRecord[];
  signInStaff: (staffId: string) => void;
  signOutStaff: (staffId: string) => void;
  startStaffDuty: (staffId: string) => void;
  endStaffDuty: (staffId: string) => void;
  correctAttendance: (attendanceId: string, newStatus: AttendanceStatus, reason: string) => void;

  // Duties & Conflict
  duties: DutyAssignment[];
  dutyChanges: DutyChangeLog[];
  createDuty: (duty: Omit<DutyAssignment, 'id' | 'assignedAt'>) => void;
  replaceCrewMember: (params: {
    dutyId: string;
    replacementStaffId: string;
    reason: string;
  }) => { success: boolean; message: string };

  // Emergency & Incidents
  incidents: IncidentRecord[];
  alerts: OperationalAlert[];
  reportIncident: (incident: Omit<IncidentRecord, 'id' | 'incidentNumber' | 'reportedAt' | 'auditTrail'>) => void;
  updateIncidentStatus: (incidentId: string, status: IncidentStatus, note: string) => void;
  publishAlert: (alert: Omit<OperationalAlert, 'id' | 'publishedAt'>) => void;
  dismissAlert: (alertId: string) => void;

  // Telemetry & Data Source
  dataSourceHealth: DataSourceHealth;
  isAuthorizedFeedActive: boolean;
  setAuthorizedFeedActive: (active: boolean) => void;

  // Simulation Lab
  isSimulationMode: boolean;
  setSimulationMode: (sim: boolean) => void;
  injectSimulationDelay: (trainNumber: string, extraMinutes: number) => void;
  injectSimulationEmergency: (category: IncidentCategory, trainNumber?: string) => void;

  // Audit Logs
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, resource: string, resourceId?: string, previous?: any, next?: any) => void;

  // Sound State
  isMuted: boolean;
  toggleSound: () => void;
  playHorn: () => void;
}

const RailwayContext = createContext<RailwayContextType | undefined>(undefined);

export const RailwayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const provider = new MockAuthorizedRailwayProvider();

  // State initialization
  const [trainPositions, setTrainPositions] = useState<TrainPosition[]>([]);
  const [trainDetailsList, setTrainDetailsList] = useState<TrainDetails[]>(MOCK_TRAIN_DETAILS);
  const [selectedTrainNumber, setSelectedTrainNumber] = useState<string | null>(null);
  const [stations, setStations] = useState<RailwayStation[]>(MOCK_STATIONS);
  const [selectedStationCode, setSelectedStationCode] = useState<string | null>(null);

  const [staffList, setStaffList] = useState<StaffMember[]>(MOCK_STAFF_MEMBERS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: 'att_001',
      staffId: 'stf_001',
      staffName: 'Rajesh Kumar Sharma',
      employeeId: 'NR-LP-9821',
      role: 'loco_pilot',
      date: new Date().toISOString().split('T')[0],
      status: 'ON_DUTY',
      signInTime: new Date(Date.now() - 5 * 3600000).toISOString(),
      dutyStartTime: new Date(Date.now() - 4.2 * 3600000).toISOString(),
      stationCode: 'NDLS',
      geofenceVerified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'att_002',
      staffId: 'stf_002',
      staffName: 'Amit Vikram Singh',
      employeeId: 'NR-ALP-4512',
      role: 'assistant_loco_pilot',
      date: new Date().toISOString().split('T')[0],
      status: 'ON_DUTY',
      signInTime: new Date(Date.now() - 5 * 3600000).toISOString(),
      dutyStartTime: new Date(Date.now() - 4.2 * 3600000).toISOString(),
      stationCode: 'NDLS',
      geofenceVerified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'att_003',
      staffId: 'stf_003',
      staffName: 'Dinesh Chandra Patel',
      employeeId: 'NR-TM-1102',
      role: 'train_manager_guard',
      date: new Date().toISOString().split('T')[0],
      status: 'ON_DUTY',
      signInTime: new Date(Date.now() - 5.5 * 3600000).toISOString(),
      dutyStartTime: new Date(Date.now() - 4.2 * 3600000).toISOString(),
      stationCode: 'NDLS',
      geofenceVerified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'att_004',
      staffId: 'stf_004',
      staffName: 'Suresh Narayanan',
      employeeId: 'NR-SM-3041',
      role: 'station_master',
      date: new Date().toISOString().split('T')[0],
      status: 'PRESENT',
      signInTime: new Date(Date.now() - 6.5 * 3600000).toISOString(),
      dutyStartTime: new Date(Date.now() - 6.0 * 3600000).toISOString(),
      stationCode: 'NDLS',
      geofenceVerified: true,
      createdAt: new Date().toISOString()
    }
  ]);

  const [duties, setDuties] = useState<DutyAssignment[]>([
    {
      id: 'duty_001',
      staffId: 'stf_001',
      staffName: 'Rajesh Kumar Sharma',
      employeeId: 'NR-LP-9821',
      role: 'loco_pilot',
      dutyType: 'RUNNING_TRAIN',
      trainNumber: '22436',
      stationCode: 'NDLS',
      sectionCode: 'NDLS-BSB',
      startTime: new Date(Date.now() - 4.5 * 3600000).toISOString(),
      endTime: new Date(Date.now() + 3.5 * 3600000).toISOString(),
      reportingLocation: 'NDLS Loco Running Room',
      status: 'IN_PROGRESS',
      assignedBy: 'Senior Divisional Operations Manager',
      assignedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
      instructions: 'Vande Bharat Express rake clearance. Speed limit 130 km/h on automatic block.'
    },
    {
      id: 'duty_002',
      staffId: 'stf_002',
      staffName: 'Amit Vikram Singh',
      employeeId: 'NR-ALP-4512',
      role: 'assistant_loco_pilot',
      dutyType: 'RUNNING_TRAIN',
      trainNumber: '22436',
      stationCode: 'NDLS',
      sectionCode: 'NDLS-BSB',
      startTime: new Date(Date.now() - 4.5 * 3600000).toISOString(),
      endTime: new Date(Date.now() + 3.5 * 3600000).toISOString(),
      reportingLocation: 'NDLS Loco Running Room',
      status: 'IN_PROGRESS',
      assignedBy: 'Senior Divisional Operations Manager',
      assignedAt: new Date(Date.now() - 12 * 3600000).toISOString()
    },
    {
      id: 'duty_003',
      staffId: 'stf_003',
      staffName: 'Dinesh Chandra Patel',
      employeeId: 'NR-TM-1102',
      role: 'train_manager_guard',
      dutyType: 'RUNNING_TRAIN',
      trainNumber: '22436',
      stationCode: 'NDLS',
      sectionCode: 'NDLS-BSB',
      startTime: new Date(Date.now() - 4.5 * 3600000).toISOString(),
      endTime: new Date(Date.now() + 3.5 * 3600000).toISOString(),
      reportingLocation: 'NDLS Guard Running Room',
      status: 'IN_PROGRESS',
      assignedBy: 'Station Master NDLS',
      assignedAt: new Date(Date.now() - 12 * 3600000).toISOString()
    }
  ]);

  const [dutyChanges, setDutyChanges] = useState<DutyChangeLog[]>([]);
  const [incidents, setIncidents] = useState<IncidentRecord[]>([
    {
      id: 'inc_101',
      incidentNumber: 'INC-2026-0891',
      category: 'SIGNAL_FAILURE',
      severity: 'MEDIUM',
      status: 'RESPONDING',
      stationCode: 'PRYJ',
      section: 'Section PRYJ Track 4 Outer Signal',
      description: 'Axle counter intermittent reset failure on Up line loop.',
      reportedBy: 'Station Master PRYJ',
      reportedAt: new Date(Date.now() - 25 * 60000).toISOString(),
      assignedTeam: 'S&T Emergency Gang 3',
      auditTrail: [
        {
          status: 'REPORTED',
          timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
          updatedBy: 'Station Master PRYJ',
          note: 'Fault detected on visual panel.'
        },
        {
          status: 'RESPONDING',
          timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
          updatedBy: 'S&T Inspector',
          note: 'Team reached signal location.'
        }
      ]
    }
  ]);

  const [alerts, setAlerts] = useState<OperationalAlert[]>([
    {
      id: 'alt_01',
      title: 'Caution Order Imposed on Section CNB-PRYJ',
      message: 'Speed restriction of 50 km/h on Track 2 KM 642/12 due to P-Way tamping work.',
      severity: 'WARNING',
      targetAudience: 'ALL',
      zone: 'NCR',
      division: 'Prayagraj',
      active: true,
      publishedBy: 'Chief Section Controller',
      publishedAt: new Date(Date.now() - 40 * 60000).toISOString()
    }
  ]);

  const [dataSourceHealth, setDataSourceHealth] = useState<DataSourceHealth>({
    id: 'ds_cris_01',
    name: 'Indian Railways CRIS/FOIS Primary Gateway',
    providerType: 'AUTHORIZED',
    status: 'CONNECTED',
    lastSuccessfulSync: new Date().toISOString(),
    latencyMs: 94,
    recordsReceivedLastHour: 1420,
    errorRatePercentage: 0.0,
    circuitBreakerOpen: false,
    notes: 'Live data verified. Zero fabrication policy active.'
  });

  const [isAuthorizedFeedActive, setAuthorizedFeedActive] = useState<boolean>(true);
  const [isSimulationMode, setSimulationMode] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(soundService.isMuted);

  const addAuditLog = useCallback((
    action: string,
    resource: string,
    resourceId?: string,
    previousState?: any,
    newState?: any
  ) => {
    const item: AuditLogItem = {
      id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      resource,
      resourceId,
      previousState,
      newState,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [item, ...prev.slice(0, 150)]);
  }, [currentUser]);

  // Fetch initial train telemetry
  useEffect(() => {
    const fetchPositions = async () => {
      if (!isAuthorizedFeedActive) {
        // Mark all as unavailable
        setTrainPositions(prev => prev.map(p => ({
          ...p,
          freshnessState: 'DATA_UNAVAILABLE',
          status: 'DATA_UNAVAILABLE'
        })));
        return;
      }
      try {
        const list = await provider.getActiveTrainPositions();
        setTrainPositions(list);
      } catch (err) {
        console.error('Failed to poll railway telemetry', err);
      }
    };

    fetchPositions();
    const interval = setInterval(fetchPositions, 10000); // 10s poll
    return () => clearInterval(interval);
  }, [isAuthorizedFeedActive]);

  const getTrainDetails = useCallback(async (trainNum: string): Promise<TrainDetails | null> => {
    return provider.getTrainDetails(trainNum);
  }, []);

  // Staff Attendance Handlers
  const signInStaff = (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const nowIso = new Date().toISOString();

    setStaffList(prev => prev.map(s => s.id === staffId ? { ...s, attendanceStatus: 'PRESENT' } : s));
    setAttendanceRecords(prev => {
      const existing = prev.find(a => a.staffId === staffId && a.date === todayStr);
      if (existing) {
        return prev.map(a => a.id === existing.id ? { ...a, status: 'PRESENT', signInTime: a.signInTime || nowIso } : a);
      }
      return [
        {
          id: `att_${Date.now()}`,
          staffId: staff.id,
          staffName: staff.name,
          employeeId: staff.employeeId,
          role: staff.role,
          date: todayStr,
          status: 'PRESENT',
          signInTime: nowIso,
          stationCode: staff.stationCode,
          geofenceVerified: true,
          createdAt: nowIso
        },
        ...prev
      ];
    });

    addAuditLog('STAFF_SIGN_IN', 'ATTENDANCE', staffId, { status: staff.attendanceStatus }, { status: 'PRESENT' });
    soundService.playChime();
  };

  const signOutStaff = (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const nowIso = new Date().toISOString();

    setStaffList(prev => prev.map(s => s.id === staffId ? { ...s, attendanceStatus: 'OFF_DUTY', continuousDutyHours: 0 } : s));
    setAttendanceRecords(prev => prev.map(a => {
      if (a.staffId === staffId && a.date === todayStr) {
        return { ...a, status: 'OFF_DUTY', signOutTime: nowIso };
      }
      return a;
    }));

    addAuditLog('STAFF_SIGN_OUT', 'ATTENDANCE', staffId, { status: staff.attendanceStatus }, { status: 'OFF_DUTY' });
  };

  const startStaffDuty = (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const nowIso = new Date().toISOString();

    setStaffList(prev => prev.map(s => s.id === staffId ? { ...s, attendanceStatus: 'ON_DUTY' } : s));
    setAttendanceRecords(prev => prev.map(a => {
      if (a.staffId === staffId && a.date === todayStr) {
        return { ...a, status: 'ON_DUTY', dutyStartTime: a.dutyStartTime || nowIso };
      }
      return a;
    }));

    addAuditLog('DUTY_START', 'ATTENDANCE', staffId, { status: staff.attendanceStatus }, { status: 'ON_DUTY' });
  };

  const endStaffDuty = (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const nowIso = new Date().toISOString();

    setStaffList(prev => prev.map(s => s.id === staffId ? {
      ...s,
      attendanceStatus: 'PRESENT',
      lastRestCompletedAt: nowIso,
      continuousDutyHours: 0
    } : s));

    setAttendanceRecords(prev => prev.map(a => {
      if (a.staffId === staffId && a.date === todayStr) {
        return { ...a, status: 'PRESENT', dutyEndTime: nowIso };
      }
      return a;
    }));

    addAuditLog('DUTY_END', 'ATTENDANCE', staffId, { status: staff.attendanceStatus }, { status: 'PRESENT' });
  };

  const correctAttendance = (attendanceId: string, newStatus: AttendanceStatus, reason: string) => {
    setAttendanceRecords(prev => prev.map(a => {
      if (a.id === attendanceId) {
        return {
          ...a,
          status: newStatus,
          isCorrected: true,
          correctedBy: `${currentUser.name} (${currentUser.role})`,
          correctedAt: new Date().toISOString(),
          remarks: reason
        };
      }
      return a;
    }));
    addAuditLog('CORRECT_ATTENDANCE', 'ATTENDANCE', attendanceId, null, { newStatus, reason });
  };

  // Duty Management
  const createDuty = (dutyData: Omit<DutyAssignment, 'id' | 'assignedAt'>) => {
    const newDuty: DutyAssignment = {
      ...dutyData,
      id: `duty_${Date.now()}`,
      assignedAt: new Date().toISOString()
    };
    setDuties(prev => [newDuty, ...prev]);
    addAuditLog('CREATE_DUTY', 'DUTY', newDuty.id, null, newDuty);
  };

  const replaceCrewMember = (params: {
    dutyId: string;
    replacementStaffId: string;
    reason: string;
  }): { success: boolean; message: string } => {
    const targetDuty = duties.find(d => d.id === params.dutyId);
    if (!targetDuty) return { success: false, message: 'Duty assignment not found.' };

    const replacement = staffList.find(s => s.id === params.replacementStaffId);
    if (!replacement) return { success: false, message: 'Replacement staff not found.' };

    const changeLog: DutyChangeLog = {
      id: `chg_${Date.now()}`,
      dutyId: targetDuty.id,
      trainNumber: targetDuty.trainNumber,
      role: targetDuty.role,
      originalStaffId: targetDuty.staffId,
      originalStaffName: targetDuty.staffName,
      replacementStaffId: replacement.id,
      replacementStaffName: replacement.name,
      reason: params.reason,
      changedBy: `${currentUser.name} (${currentUser.role})`,
      changedAt: new Date().toISOString(),
      approvalStatus: 'APPROVED'
    };

    setDutyChanges(prev => [changeLog, ...prev]);
    setDuties(prev => prev.map(d => {
      if (d.id === params.dutyId) {
        return {
          ...d,
          staffId: replacement.id,
          staffName: replacement.name,
          employeeId: replacement.employeeId,
          status: 'IN_PROGRESS'
        };
      }
      return d;
    }));

    addAuditLog('REPLACE_CREW_MEMBER', 'DUTY', targetDuty.id, { original: targetDuty.staffName }, { replacement: replacement.name, reason: params.reason });
    soundService.playAlert();
    return { success: true, message: `Crew successfully replaced with ${replacement.name}.` };
  };

  // Emergency & Incident Management
  const reportIncident = (incidentData: Omit<IncidentRecord, 'id' | 'incidentNumber' | 'reportedAt' | 'auditTrail'>) => {
    const nowIso = new Date().toISOString();
    const incNumber = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInc: IncidentRecord = {
      ...incidentData,
      id: `inc_${Date.now()}`,
      incidentNumber: incNumber,
      reportedAt: nowIso,
      auditTrail: [{
        status: incidentData.status || 'REPORTED',
        timestamp: nowIso,
        updatedBy: currentUser.name,
        note: 'Incident logged in operations dispatch.'
      }]
    };

    setIncidents(prev => [newInc, ...prev]);
    addAuditLog('REPORT_INCIDENT', 'INCIDENT', newInc.id, null, newInc);
    soundService.playAlert();
  };

  const updateIncidentStatus = (incidentId: string, newStatus: IncidentStatus, note: string) => {
    const nowIso = new Date().toISOString();
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: newStatus,
          resolvedAt: newStatus === 'RESOLVED' ? nowIso : inc.resolvedAt,
          acknowledgedAt: newStatus === 'ACKNOWLEDGED' ? nowIso : inc.acknowledgedAt,
          actionTaken: note,
          auditTrail: [
            ...inc.auditTrail,
            {
              status: newStatus,
              timestamp: nowIso,
              updatedBy: currentUser.name,
              note
            }
          ]
        };
      }
      return inc;
    }));
    addAuditLog('UPDATE_INCIDENT_STATUS', 'INCIDENT', incidentId, null, { newStatus, note });
  };

  const publishAlert = (alertData: Omit<OperationalAlert, 'id' | 'publishedAt'>) => {
    const newAlert: OperationalAlert = {
      ...alertData,
      id: `alt_${Date.now()}`,
      publishedAt: new Date().toISOString()
    };
    setAlerts(prev => [newAlert, ...prev]);
    addAuditLog('PUBLISH_ALERT', 'ALERT', newAlert.id, null, newAlert);
    soundService.playAlert();
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, active: false } : a));
    addAuditLog('DISMISS_ALERT', 'ALERT', alertId, { active: true }, { active: false });
  };

  // Simulation Lab Methods
  const injectSimulationDelay = (trainNumber: string, extraMinutes: number) => {
    setTrainPositions(prev => prev.map(p => {
      if (p.trainNumber === trainNumber) {
        const newDelay = Math.max(0, p.delayMinutes + extraMinutes);
        return {
          ...p,
          delayMinutes: newDelay,
          status: newDelay > 45 ? 'SEVERELY_DELAYED' : (newDelay > 0 ? 'DELAYED' : 'ON_TIME'),
          dataQuality: 'SIMULATED'
        };
      }
      return p;
    }));
    addAuditLog('SIMULATION_INJECT_DELAY', 'TRAIN_TELEMETRY', trainNumber, null, { extraMinutes });
  };

  const injectSimulationEmergency = (category: IncidentCategory, trainNumber?: string) => {
    reportIncident({
      category,
      severity: 'CRITICAL',
      status: 'REPORTED',
      trainNumber: trainNumber || '22436',
      section: 'Simulation Test Bed Track 1',
      description: `[SIMULATION DRILL] Injected emergency drill: ${category} on corridor.`,
      reportedBy: 'Simulation Controller'
    });
  };

  const toggleSound = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
  };

  const playHorn = () => {
    soundService.playHorn();
  };

  return (
    <RailwayContext.Provider
      value={{
        trainPositions,
        trainDetailsList,
        selectedTrainNumber,
        setSelectedTrainNumber,
        getTrainDetails,
        stations,
        selectedStationCode,
        setSelectedStationCode,
        staffList,
        attendanceRecords,
        signInStaff,
        signOutStaff,
        startStaffDuty,
        endStaffDuty,
        correctAttendance,
        duties,
        dutyChanges,
        createDuty,
        replaceCrewMember,
        incidents,
        alerts,
        reportIncident,
        updateIncidentStatus,
        publishAlert,
        dismissAlert,
        dataSourceHealth,
        isAuthorizedFeedActive,
        setAuthorizedFeedActive,
        isSimulationMode,
        setSimulationMode,
        injectSimulationDelay,
        injectSimulationEmergency,
        auditLogs,
        addAuditLog,
        isMuted,
        toggleSound,
        playHorn
      }}
    >
      {children}
    </RailwayContext.Provider>
  );
};

export const useRailway = (): RailwayContextType => {
  const context = useContext(RailwayContext);
  if (!context) {
    throw new Error('useRailway must be used within a RailwayProvider');
  }
  return context;
};
