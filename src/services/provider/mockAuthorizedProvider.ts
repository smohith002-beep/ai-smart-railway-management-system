import { IRailwayDataProvider } from './RailwayDataProvider';
import { TrainPosition, TrainDetails, RailwayStation, DataSourceHealth, StaffMember, AttendanceRecord, DutyAssignment, IncidentRecord, OperationalAlert } from '../../types/railway';
import { DataNormalizer } from './dataNormalizer';

// Real Indian Railway Stations
export const MOCK_STATIONS: RailwayStation[] = [
  {
    id: 'st_ndls',
    code: 'NDLS',
    name: 'New Delhi',
    zone: 'NR',
    division: 'Delhi',
    latitude: 28.6425,
    longitude: 77.2205,
    category: 'TERMINAL',
    platformsCount: 16,
    platforms: [
      { number: 1, occupyingTrain: '22436', status: 'OCCUPIED', signalAspect: 'GREEN' },
      { number: 2, status: 'CLEAR', signalAspect: 'GREEN' },
      { number: 3, occupyingTrain: '12952', status: 'OCCUPIED', signalAspect: 'DOUBLE_YELLOW' },
      { number: 4, status: 'CLEAR', signalAspect: 'GREEN' },
      { number: 5, status: 'CLEAR', signalAspect: 'YELLOW' },
      { number: 6, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_cnb',
    code: 'CNB',
    name: 'Kanpur Central',
    zone: 'NCR',
    division: 'Prayagraj',
    latitude: 26.4547,
    longitude: 80.3507,
    category: 'MAJOR_JUNCTION',
    platformsCount: 10,
    platforms: [
      { number: 1, status: 'CLEAR', signalAspect: 'GREEN' },
      { number: 2, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_pryj',
    code: 'PRYJ',
    name: 'Prayagraj Junction',
    zone: 'NCR',
    division: 'Prayagraj',
    latitude: 25.4497,
    longitude: 81.8282,
    category: 'MAJOR_JUNCTION',
    platformsCount: 10,
    platforms: [
      { number: 1, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_bsb',
    code: 'BSB',
    name: 'Varanasi Junction',
    zone: 'NR',
    division: 'Lucknow',
    latitude: 25.3283,
    longitude: 82.9863,
    category: 'MAJOR_JUNCTION',
    platformsCount: 9,
    platforms: [
      { number: 1, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_mmct',
    code: 'MMCT',
    name: 'Mumbai Central',
    zone: 'WR',
    division: 'Mumbai',
    latitude: 18.9696,
    longitude: 72.8193,
    category: 'TERMINAL',
    platformsCount: 8,
    platforms: [
      { number: 1, occupyingTrain: '12951', status: 'OCCUPIED', signalAspect: 'GREEN' },
      { number: 2, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_st',
    code: 'ST',
    name: 'Surat',
    zone: 'WR',
    division: 'Mumbai',
    latitude: 21.2049,
    longitude: 72.8406,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [
      { number: 1, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_brc',
    code: 'BRC',
    name: 'Vadodara Junction',
    zone: 'WR',
    division: 'Vadodara',
    latitude: 22.3107,
    longitude: 73.1812,
    category: 'MAJOR_JUNCTION',
    platformsCount: 7,
    platforms: [
      { number: 1, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_adi',
    code: 'ADI',
    name: 'Ahmedabad Junction',
    zone: 'WR',
    division: 'Ahmedabad',
    latitude: 23.0274,
    longitude: 72.6012,
    category: 'TERMINAL',
    platformsCount: 12,
    platforms: [
      { number: 1, occupyingTrain: '20901', status: 'OCCUPIED', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_mas',
    code: 'MAS',
    name: 'MGR Chennai Central',
    zone: 'SR',
    division: 'Chennai',
    latitude: 13.0827,
    longitude: 80.2755,
    category: 'TERMINAL',
    platformsCount: 17,
    platforms: [
      { number: 1, occupyingTrain: '20607', status: 'OCCUPIED', signalAspect: 'GREEN' },
      { number: 2, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_sbc',
    code: 'SBC',
    name: 'KSR Bengaluru City',
    zone: 'SWR',
    division: 'Bengaluru',
    latitude: 12.9784,
    longitude: 77.5684,
    category: 'TERMINAL',
    platformsCount: 10,
    platforms: [
      { number: 1, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_mys',
    code: 'MYS',
    name: 'Mysuru Junction',
    zone: 'SWR',
    division: 'Mysuru',
    latitude: 12.3164,
    longitude: 76.6457,
    category: 'TERMINAL',
    platformsCount: 6,
    platforms: [
      { number: 1, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_hwh',
    code: 'HWH',
    name: 'Howrah Junction',
    zone: 'ER',
    division: 'Howrah',
    latitude: 22.5840,
    longitude: 88.3426,
    category: 'TERMINAL',
    platformsCount: 23,
    platforms: [
      { number: 1, occupyingTrain: '12301', status: 'OCCUPIED', signalAspect: 'GREEN' }
    ]
  }
];

// Mock Trains Dataset
export const MOCK_TRAIN_DETAILS: TrainDetails[] = [
  {
    id: 'tr_22436',
    trainNumber: '22436',
    trainName: 'Vande Bharat Express',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'NDLS',
    originStationName: 'New Delhi',
    destinationStationCode: 'BSB',
    destinationStationName: 'Varanasi Junction',
    zone: 'NR',
    division: 'Delhi',
    rakeType: 'VB-16 (Train 18 Trainset)',
    locoNumber: 'Self-Propelled EMU (WAP-5 equivalent)',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '06:00', scheduledDeparture: '06:00', actualDeparture: '06:00', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CNB', stationName: 'Kanpur Central', scheduledArrival: '10:08', scheduledDeparture: '10:10', actualArrival: '10:09', actualDeparture: '10:12', platform: '5', distanceKm: 440, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'PRYJ', stationName: 'Prayagraj Junction', scheduledArrival: '12:08', scheduledDeparture: '12:10', estimatedArrival: '12:12', estimatedDeparture: '12:14', platform: '6', distanceKm: 635, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'BSB', stationName: 'Varanasi Junction', scheduledArrival: '14:00', scheduledDeparture: '14:00', estimatedArrival: '14:03', platform: '1', distanceKm: 759, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12952',
    trainNumber: '12952',
    trainName: 'Mumbai Rajdhani Express',
    trainType: 'RAJDHANI',
    originStationCode: 'NDLS',
    originStationName: 'New Delhi',
    destinationStationCode: 'MMCT',
    destinationStationName: 'Mumbai Central',
    zone: 'WR',
    division: 'Mumbai',
    rakeType: 'LHB Tejas Sleeper',
    locoNumber: 'WAP-7 (Tughlakabad 30219)',
    totalCoaches: 20,
    schedule: [
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '16:55', scheduledDeparture: '16:55', actualDeparture: '16:55', platform: '3', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', scheduledArrival: '03:40', scheduledDeparture: '03:50', estimatedArrival: '03:42', estimatedDeparture: '03:52', platform: '2', distanceKm: 992, haltMinutes: 10, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'ST', stationName: 'Surat', scheduledArrival: '05:13', scheduledDeparture: '05:18', estimatedArrival: '05:16', estimatedDeparture: '05:21', platform: '1', distanceKm: 1122, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'MMCT', stationName: 'Mumbai Central', scheduledArrival: '08:35', scheduledDeparture: '08:35', estimatedArrival: '08:35', platform: '1', distanceKm: 1384, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_20901',
    trainNumber: '20901',
    trainName: 'Vande Bharat Express (Mumbai - Ahmedabad)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'MMCT',
    originStationName: 'Mumbai Central',
    destinationStationCode: 'ADI',
    destinationStationName: 'Ahmedabad Junction',
    zone: 'WR',
    division: 'Mumbai',
    rakeType: 'VB-16',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'MMCT', stationName: 'Mumbai Central', scheduledArrival: '06:00', scheduledDeparture: '06:00', actualDeparture: '06:00', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'ST', stationName: 'Surat', scheduledArrival: '08:40', scheduledDeparture: '08:43', actualArrival: '08:40', actualDeparture: '08:43', platform: '1', distanceKm: 263, haltMinutes: 3, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', scheduledArrival: '09:56', scheduledDeparture: '09:59', estimatedArrival: '09:56', estimatedDeparture: '09:59', platform: '3', distanceKm: 392, haltMinutes: 3, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'ADI', stationName: 'Ahmedabad Junction', scheduledArrival: '11:25', scheduledDeparture: '11:25', estimatedArrival: '11:25', platform: '1', distanceKm: 493, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_20607',
    trainNumber: '20607',
    trainName: 'Vande Bharat Express (Chennai - Mysuru)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'MYS',
    destinationStationName: 'Mysuru Junction',
    zone: 'SR',
    division: 'Chennai',
    rakeType: 'VB-16',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '05:50', scheduledDeparture: '05:50', actualDeparture: '05:50', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '10:15', scheduledDeparture: '10:20', estimatedArrival: '10:18', estimatedDeparture: '10:23', platform: '7', distanceKm: 358, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'MYS', stationName: 'Mysuru Junction', scheduledArrival: '12:20', scheduledDeparture: '12:20', estimatedArrival: '12:25', platform: '1', distanceKm: 497, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12301',
    trainNumber: '12301',
    trainName: 'Howrah Rajdhani Express (via Gaya)',
    trainType: 'RAJDHANI',
    originStationCode: 'HWH',
    originStationName: 'Howrah Junction',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'ER',
    division: 'Howrah',
    rakeType: 'LHB Rajdhani',
    locoNumber: 'WAP-7 (Howrah 30201)',
    totalCoaches: 21,
    schedule: [
      { stationCode: 'HWH', stationName: 'Howrah Junction', scheduledArrival: '16:50', scheduledDeparture: '16:50', actualDeparture: '16:50', platform: '9', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'PRYJ', stationName: 'Prayagraj Junction', scheduledArrival: '00:45', scheduledDeparture: '00:50', estimatedArrival: '00:45', estimatedDeparture: '00:50', platform: '1', distanceKm: 812, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'CNB', stationName: 'Kanpur Central', scheduledArrival: '02:35', scheduledDeparture: '02:40', estimatedArrival: '02:35', estimatedDeparture: '02:40', platform: '1', distanceKm: 1006, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '10:05', scheduledDeparture: '10:05', estimatedArrival: '10:05', platform: '12', distanceKm: 1446, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_frt_9001',
    trainNumber: 'BOXN-9001',
    trainName: 'Dedicated Freight Corridor Coal Carrier (DFCCIL)',
    trainType: 'FREIGHT',
    originStationCode: 'CNB',
    originStationName: 'Kanpur Central',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'NCR',
    division: 'Prayagraj',
    rakeType: 'BOXN-HL 58 Wagons',
    locoNumber: 'WAG-12B Twin Electric (60021)',
    totalCoaches: 58,
    schedule: [
      { stationCode: 'CNB', stationName: 'Kanpur Central', scheduledArrival: '02:00', scheduledDeparture: '02:30', actualDeparture: '02:30', platform: 'Freight Line 1', distanceKm: 0, haltMinutes: 30, status: 'PASSED', dayCount: 1 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '09:30', scheduledDeparture: '09:30', estimatedArrival: '09:40', platform: 'Tughlakabad Yard', distanceKm: 440, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  }
];

export const MOCK_STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'stf_001',
    employeeId: 'NR-LP-9821',
    name: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@railnet.gov.in',
    phone: '+91 98765 43210',
    role: 'loco_pilot',
    designation: 'Chief Loco Pilot (Mail/Express)',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Operations',
    medicalFitnessCategory: 'A-1',
    qualifications: ['WAP-7 / WAP-5 Certified', 'Train-18 (Vande Bharat) Type Certified', 'Route Learning NDLS-BSB'],
    lastRestCompletedAt: new Date(Date.now() - 14 * 3600000).toISOString(),
    continuousDutyHours: 4.2,
    attendanceStatus: 'ON_DUTY',
    currentDutyId: 'duty_001'
  },
  {
    id: 'stf_002',
    employeeId: 'NR-ALP-4512',
    name: 'Amit Vikram Singh',
    email: 'amit.singh@railnet.gov.in',
    phone: '+91 98765 43211',
    role: 'assistant_loco_pilot',
    designation: 'Senior Assistant Loco Pilot',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Operations',
    medicalFitnessCategory: 'A-1',
    qualifications: ['AC Electric Traction Certified', 'Signal Calling & Safety Rules Passed'],
    lastRestCompletedAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    continuousDutyHours: 4.2,
    attendanceStatus: 'ON_DUTY',
    currentDutyId: 'duty_002'
  },
  {
    id: 'stf_003',
    employeeId: 'NR-TM-1102',
    name: 'Dinesh Chandra Patel',
    email: 'dinesh.patel@railnet.gov.in',
    phone: '+91 98765 43212',
    role: 'train_manager_guard',
    designation: 'Senior Passenger Train Manager (Guard)',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Operations',
    medicalFitnessCategory: 'A-2',
    qualifications: ['Brake-Van Telemetry (EOTTS)', 'Emergency First Responder'],
    lastRestCompletedAt: new Date(Date.now() - 16 * 3600000).toISOString(),
    continuousDutyHours: 4.2,
    attendanceStatus: 'ON_DUTY',
    currentDutyId: 'duty_003'
  },
  {
    id: 'stf_004',
    employeeId: 'NR-SM-3041',
    name: 'Suresh Narayanan',
    email: 'suresh.n@railnet.gov.in',
    phone: '+91 98765 43213',
    role: 'station_master',
    designation: 'Station Director & Chief Station Master',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Operations',
    medicalFitnessCategory: 'A-2',
    qualifications: ['Route Relay Interlocking (RRI)', 'Electronic Interlocking (EI) Level 3'],
    lastRestCompletedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    continuousDutyHours: 6.0,
    attendanceStatus: 'PRESENT',
    currentDutyId: 'duty_004'
  },
  {
    id: 'stf_005',
    employeeId: 'NR-TC-8840',
    name: 'Pooja Verma',
    email: 'pooja.verma@railnet.gov.in',
    phone: '+91 98765 43214',
    role: 'train_controller',
    designation: 'Chief Section Controller (Delhi Main)',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Operations',
    medicalFitnessCategory: 'A-3',
    qualifications: ['Centralized Traffic Control (CTC)', 'TMS Automated Dispatch'],
    lastRestCompletedAt: new Date(Date.now() - 20 * 3600000).toISOString(),
    continuousDutyHours: 5.5,
    attendanceStatus: 'PRESENT',
    currentDutyId: 'duty_005'
  },
  {
    id: 'stf_006',
    employeeId: 'NR-TTE-2291',
    name: 'Vikas Deshmukh',
    email: 'vikas.d@railnet.gov.in',
    phone: '+91 98765 43215',
    role: 'tte',
    designation: 'Traveling Ticket Examiner (Executive Class)',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Commercial',
    medicalFitnessCategory: 'B-1',
    qualifications: ['Handheld Terminal (HHT) Master', 'Commercial Tariff Rules'],
    lastRestCompletedAt: new Date(Date.now() - 15 * 3600000).toISOString(),
    continuousDutyHours: 4.2,
    attendanceStatus: 'ON_DUTY',
    currentDutyId: 'duty_006'
  },
  {
    id: 'stf_007',
    employeeId: 'NR-RPF-5519',
    name: 'Inspector Vikram Rathore',
    email: 'vikram.rpf@railnet.gov.in',
    phone: '+91 98765 43216',
    role: 'rpf_security',
    designation: 'Inspector, Railway Protection Force',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Security',
    medicalFitnessCategory: 'A-1',
    qualifications: ['CCTV Video Analytics Surveillance', 'Armed Escort Protocol'],
    lastRestCompletedAt: new Date(Date.now() - 22 * 3600000).toISOString(),
    continuousDutyHours: 3.5,
    attendanceStatus: 'ON_DUTY',
    currentDutyId: 'duty_007'
  },
  {
    id: 'stf_008',
    employeeId: 'NR-SIG-7701',
    name: 'Manish Rawat',
    email: 'manish.rawat@railnet.gov.in',
    phone: '+91 98765 43217',
    role: 'signal_telecom_staff',
    designation: 'Senior Section Engineer (S&T)',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Signal & Telecom',
    medicalFitnessCategory: 'A-3',
    qualifications: ['Siemens / Kyosan Interlocking Certified', 'Axle Counter Diagnostics'],
    lastRestCompletedAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    continuousDutyHours: 2.1,
    attendanceStatus: 'PRESENT'
  },
  {
    id: 'stf_009',
    employeeId: 'NR-MED-1049',
    name: 'Dr. Ananya Iyer',
    email: 'ananya.iyer@railnet.gov.in',
    phone: '+91 98765 43218',
    role: 'medical_emergency_staff',
    designation: 'Divisional Medical Officer (Accident Relief)',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Medical',
    medicalFitnessCategory: 'C-1',
    qualifications: ['Trauma Life Support (ATLS)', 'ARMV Field Triage Specialist'],
    lastRestCompletedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    continuousDutyHours: 4.0,
    attendanceStatus: 'PRESENT'
  },
  {
    id: 'stf_010',
    employeeId: 'NR-HR-9002',
    name: 'Kavita Menon',
    email: 'kavita.menon@railnet.gov.in',
    phone: '+91 98765 43219',
    role: 'hr_staff_admin',
    designation: 'Senior Personnel Officer (Crew Rostering)',
    zone: 'NR',
    division: 'Delhi',
    stationCode: 'NDLS',
    department: 'Personnel',
    medicalFitnessCategory: 'C-2',
    qualifications: ['Hours of Employment Regulations (HOER)', 'Railway Service Conduct Rules'],
    lastRestCompletedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    continuousDutyHours: 3.0,
    attendanceStatus: 'PRESENT'
  }
];

export class MockAuthorizedRailwayProvider implements IRailwayDataProvider {
  public id = 'AUTH_INDIAN_RAILWAYS_FEED';
  public name = 'Authorized Indian Railways CRIS/FOIS Telemetry Feed';
  public providerType: 'AUTHORIZED' = 'AUTHORIZED';

  public isConfigured(): boolean {
    return true;
  }

  public async getHealth(): Promise<DataSourceHealth> {
    return {
      id: 'ds_cris_01',
      name: 'Indian Railways CRIS/FOIS Primary Gateway',
      providerType: 'AUTHORIZED',
      status: 'CONNECTED',
      lastSuccessfulSync: new Date().toISOString(),
      latencyMs: 86,
      recordsReceivedLastHour: 1420,
      errorRatePercentage: 0.02,
      circuitBreakerOpen: false,
      notes: 'Authoritative telemetry connection active. Freshness threshold 30s.'
    };
  }

  public async getActiveTrainPositions(): Promise<TrainPosition[]> {
    const now = new Date();
    const timestampStr = now.toISOString();

    const rawList = [
      {
        trainNumber: '22436',
        trainName: 'Vande Bharat Express',
        latitude: 26.8500,
        longitude: 80.9500,
        speedKmph: 130.0,
        headingDegrees: 118,
        status: 'ON_TIME',
        nextStationCode: 'PRYJ',
        nextStationName: 'Prayagraj Junction',
        previousStationCode: 'CNB',
        previousStationName: 'Kanpur Central',
        delayMinutes: 2,
        distanceCoveredKm: 512,
        totalDistanceKm: 759,
        source: 'AUTHORIZED_CRIS_FEED',
        providerTimestamp: timestampStr,
        currentTrackSection: 'Section CNB-PRYJ Track 2 (Up Main)',
        signalAspect: 'GREEN'
      },
      {
        trainNumber: '12952',
        trainName: 'Mumbai Rajdhani Express',
        latitude: 22.3107,
        longitude: 73.1812,
        speedKmph: 110.0,
        headingDegrees: 195,
        status: 'ON_TIME',
        nextStationCode: 'ST',
        nextStationName: 'Surat',
        previousStationCode: 'BRC',
        previousStationName: 'Vadodara Junction',
        delayMinutes: 0,
        distanceCoveredKm: 1020,
        totalDistanceKm: 1384,
        source: 'AUTHORIZED_CRIS_FEED',
        providerTimestamp: timestampStr,
        currentTrackSection: 'Section BRC-ST Track 1 (Down Fast)',
        signalAspect: 'GREEN'
      },
      {
        trainNumber: '20901',
        trainName: 'Vande Bharat Express (Mumbai - Ahmedabad)',
        latitude: 21.6500,
        longitude: 72.9500,
        speedKmph: 125.0,
        headingDegrees: 12,
        status: 'ON_TIME',
        nextStationCode: 'BRC',
        nextStationName: 'Vadodara Junction',
        previousStationCode: 'ST',
        previousStationName: 'Surat',
        delayMinutes: 0,
        distanceCoveredKm: 340,
        totalDistanceKm: 493,
        source: 'AUTHORIZED_CRIS_FEED',
        providerTimestamp: timestampStr,
        currentTrackSection: 'Section ST-BRC Track 2 (Up Fast)',
        signalAspect: 'GREEN'
      },
      {
        trainNumber: '20607',
        trainName: 'Vande Bharat Express (Chennai - Mysuru)',
        latitude: 12.9784,
        longitude: 77.5684,
        speedKmph: 115.0,
        headingDegrees: 245,
        status: 'DELAYED',
        nextStationCode: 'MYS',
        nextStationName: 'Mysuru Junction',
        previousStationCode: 'SBC',
        previousStationName: 'KSR Bengaluru City',
        delayMinutes: 12,
        distanceCoveredKm: 380,
        totalDistanceKm: 497,
        source: 'AUTHORIZED_CRIS_FEED',
        providerTimestamp: timestampStr,
        currentTrackSection: 'Section SBC-MYS Single Line Block 4',
        signalAspect: 'YELLOW'
      },
      {
        trainNumber: '12301',
        trainName: 'Howrah Rajdhani Express',
        latitude: 25.4497,
        longitude: 81.8282,
        speedKmph: 120.0,
        headingDegrees: 305,
        status: 'ON_TIME',
        nextStationCode: 'CNB',
        nextStationName: 'Kanpur Central',
        previousStationCode: 'PRYJ',
        previousStationName: 'Prayagraj Junction',
        delayMinutes: 0,
        distanceCoveredKm: 850,
        totalDistanceKm: 1446,
        source: 'AUTHORIZED_CRIS_FEED',
        providerTimestamp: timestampStr,
        currentTrackSection: 'Section PRYJ-CNB Automatic Block 12',
        signalAspect: 'GREEN'
      },
      {
        trainNumber: 'BOXN-9001',
        trainName: 'Dedicated Freight Corridor Coal Carrier (DFCCIL)',
        latitude: 27.5000,
        longitude: 78.8000,
        speedKmph: 75.0,
        headingDegrees: 315,
        status: 'ON_TIME',
        nextStationCode: 'NDLS',
        nextStationName: 'New Delhi (TKD Yard)',
        previousStationCode: 'CNB',
        previousStationName: 'Kanpur Central',
        delayMinutes: 5,
        distanceCoveredKm: 280,
        totalDistanceKm: 440,
        source: 'AUTHORIZED_CRIS_FEED',
        providerTimestamp: timestampStr,
        currentTrackSection: 'EDFC Western Dedication Corridor Line 1',
        signalAspect: 'GREEN'
      }
    ];

    return rawList.map(raw => DataNormalizer.normalize(raw));
  }

  public async getTrainDetails(trainNumber: string): Promise<TrainDetails | null> {
    const details = MOCK_TRAIN_DETAILS.find(t => t.trainNumber === trainNumber);
    if (!details) return null;

    const positions = await this.getActiveTrainPositions();
    const pos = positions.find(p => p.trainNumber === trainNumber);
    return {
      ...details,
      currentPosition: pos,
      assignedCrew: {
        locoPilot: MOCK_STAFF_MEMBERS.find(s => s.role === 'loco_pilot'),
        assistantLocoPilot: MOCK_STAFF_MEMBERS.find(s => s.role === 'assistant_loco_pilot'),
        trainManager: MOCK_STAFF_MEMBERS.find(s => s.role === 'train_manager_guard'),
        tteList: [MOCK_STAFF_MEMBERS.find(s => s.role === 'tte')!].filter(Boolean)
      }
    };
  }

  public async getStations(): Promise<RailwayStation[]> {
    return MOCK_STATIONS;
  }
}
