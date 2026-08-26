import { RailwayRole, RoleDefinition } from '../types/railway';

export const ALL_ROLES_CONFIG: RoleDefinition[] = [
  {
    id: 'super_admin',
    title: 'Super Administrator',
    category: 'Administration',
    description: 'National Railway Board apex oversight, system configuration, all zones & data providers',
    jurisdictionLevel: 'National',
    permissions: ['all']
  },
  {
    id: 'railway_admin',
    title: 'Railway Administrator',
    category: 'Administration',
    description: 'Operational administration, duty rosters, incident management, staff attendance reconciliation',
    jurisdictionLevel: 'National',
    permissions: ['manage_trains', 'manage_staff', 'manage_duties', 'manage_incidents', 'view_analytics']
  },
  {
    id: 'zonal_admin',
    title: 'Zonal Administrator (GM)',
    category: 'Administration',
    description: 'Zonal headquarters management (Northern, Southern, Western, Eastern, etc.)',
    jurisdictionLevel: 'Zone',
    permissions: ['manage_zone_trains', 'manage_zone_staff', 'approve_zone_duties', 'view_zone_analytics']
  },
  {
    id: 'divisional_manager',
    title: 'Divisional Railway Manager (DRM)',
    category: 'Administration',
    description: 'Division operational head, station performance, train punctuality, emergency command',
    jurisdictionLevel: 'Division',
    permissions: ['manage_division_trains', 'manage_division_staff', 'view_division_analytics']
  },
  {
    id: 'station_master',
    title: 'Station Master (SM)',
    category: 'Operations',
    description: 'Station train arrivals/departures, platform line clearance, caution orders, local staff',
    jurisdictionLevel: 'Station',
    permissions: ['view_station_trains', 'manage_platform_status', 'sign_in_out', 'report_station_incident']
  },
  {
    id: 'assistant_station_master',
    title: 'Assistant Station Master (ASM)',
    category: 'Operations',
    description: 'Station yard operations, line shunt movements, platform passenger announcements',
    jurisdictionLevel: 'Station',
    permissions: ['view_station_trains', 'update_platform_board', 'sign_in_out']
  },
  {
    id: 'train_controller',
    title: 'Train Controller (Section Controller)',
    category: 'Operations',
    description: 'Section train movement priority, block section signaling, overtaking and crossing orders',
    jurisdictionLevel: 'Division',
    permissions: ['control_section_trains', 'issue_caution_orders', 'view_block_signals']
  },
  {
    id: 'loco_pilot',
    title: 'Loco Pilot (Train Driver)',
    category: 'Running Crew',
    description: 'Train operation, digital speedometer, caution order compliance, sign-on/sign-off terminal',
    jurisdictionLevel: 'Train',
    permissions: ['view_assigned_train', 'crew_sign_on_off', 'report_loco_defect', 'emergency_sos']
  },
  {
    id: 'assistant_loco_pilot',
    title: 'Assistant Loco Pilot (ALP)',
    category: 'Running Crew',
    description: 'Signal calling, speed log recording, locomotive gauge monitoring, pilot assistance',
    jurisdictionLevel: 'Train',
    permissions: ['view_assigned_train', 'crew_sign_on_off', 'log_signal_call']
  },
  {
    id: 'train_manager_guard',
    title: 'Train Manager / Guard',
    category: 'Running Crew',
    description: 'Rear brake-van telemetry, tail-lamp verification, BV pressure check, train incident logs',
    jurisdictionLevel: 'Train',
    permissions: ['view_assigned_train', 'crew_sign_on_off', 'confirm_tail_lamp', 'report_train_incident']
  },
  {
    id: 'tte',
    title: 'Traveling Ticket Examiner (TTE)',
    category: 'Ticketing & Security',
    description: 'Coach berth allocation, passenger verification, vacancy chart sync, onboard assistance',
    jurisdictionLevel: 'Train',
    permissions: ['view_assigned_coaches', 'sign_in_out', 'update_berth_occupancy']
  },
  {
    id: 'te',
    title: 'Ticket Examiner (TE)',
    category: 'Ticketing & Security',
    description: 'Station concourse & platform gate ticket validation, passenger crowd assistance',
    jurisdictionLevel: 'Station',
    permissions: ['station_gate_validation', 'sign_in_out']
  },
  {
    id: 'rpf_security',
    title: 'Railway Protection Force (RPF)',
    category: 'Ticketing & Security',
    description: 'Station security, train escort duties, crowd surveillance, security alert response',
    jurisdictionLevel: 'Station',
    permissions: ['view_security_cctv', 'sign_in_out', 'dispatch_security_unit', 'report_security_incident']
  },
  {
    id: 'maintenance_staff',
    title: 'Maintenance Staff',
    category: 'Engineering & Maintenance',
    description: 'Rolling stock and station maintenance work orders, preventive inspection',
    jurisdictionLevel: 'Unit',
    permissions: ['view_work_orders', 'update_maintenance_status', 'sign_in_out']
  },
  {
    id: 'electrical_staff',
    title: 'Electrical Staff (OHE / Power)',
    category: 'Engineering & Maintenance',
    description: 'Overhead traction catenary (25kV AC), substation power supply, pantograph inspection',
    jurisdictionLevel: 'Division',
    permissions: ['view_ohe_sections', 'manage_power_blocks', 'sign_in_out']
  },
  {
    id: 'signal_telecom_staff',
    title: 'Signal & Telecom (S&T) Staff',
    category: 'Engineering & Maintenance',
    description: 'Electronic interlocking, axle counters, track circuits, point machines, telecom links',
    jurisdictionLevel: 'Division',
    permissions: ['view_interlocking_status', 'report_signal_defect', 'sign_in_out']
  },
  {
    id: 'track_maintenance_staff',
    title: 'Track Maintenance Staff (P-Way)',
    category: 'Engineering & Maintenance',
    description: 'Permanent way inspection, track geometry, rail ultrasound testing, ballast cleaning',
    jurisdictionLevel: 'Division',
    permissions: ['request_traffic_block', 'log_track_defect', 'sign_in_out']
  },
  {
    id: 'coach_maintenance_staff',
    title: 'Coach Maintenance (C&W) Staff',
    category: 'Engineering & Maintenance',
    description: 'Carriage and wagon pit-line examination, air-brake test, wheel profile inspection',
    jurisdictionLevel: 'Unit',
    permissions: ['issue_brake_certificate', 'log_coach_defect', 'sign_in_out']
  },
  {
    id: 'control_room_operator',
    title: 'Control Room Operator',
    category: 'Operations',
    description: 'Emergency hotline, central logging, cross-departmental coordination, alerts broadcast',
    jurisdictionLevel: 'Division',
    permissions: ['broadcast_alerts', 'dispatch_response', 'sign_in_out']
  },
  {
    id: 'medical_emergency_staff',
    title: 'Medical / Emergency Staff',
    category: 'Emergency & HR',
    description: 'Station first-aid post, accident relief medical van (ARMV), trauma triage & ambulance dispatch',
    jurisdictionLevel: 'Station',
    permissions: ['manage_medical_incidents', 'dispatch_ambulance', 'sign_in_out']
  },
  {
    id: 'hr_staff_admin',
    title: 'HR / Staff Administration',
    category: 'Emergency & HR',
    description: 'Master crew rostering, statutory 12h rest enforcement, leave sanctions, qualification matrix',
    jurisdictionLevel: 'Division',
    permissions: ['manage_staff_roster', 'approve_leaves', 'correct_attendance', 'view_crew_hours']
  },
  {
    id: 'authorized_contractor',
    title: 'Authorized Contractor',
    category: 'Engineering & Maintenance',
    description: 'Authorized engineering contractor staff, gate passes, work-site safety clearance',
    jurisdictionLevel: 'Unit',
    permissions: ['view_contract_tasks', 'sign_in_out']
  },
  {
    id: 'passenger',
    title: 'Passenger / Public User',
    category: 'Public',
    description: 'Live train search, station live arrival/departure boards, delay alerts, route explorer',
    jurisdictionLevel: 'Public',
    permissions: ['search_trains', 'view_public_schedule', 'view_station_board']
  }
];

export const ROLE_MAP: Record<RailwayRole, RoleDefinition> = ALL_ROLES_CONFIG.reduce((acc, role) => {
  acc[role.id] = role;
  return acc;
}, {} as Record<RailwayRole, RoleDefinition>);
