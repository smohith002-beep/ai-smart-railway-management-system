// ===============================================================
// THIRD-PARTY RAILWAY API DATA CONTRACTS & CONFIGURATION
// ===============================================================

export interface RailwayApiConfig {
  apiKey?: string;
  apiHost?: string;
  baseUrl?: string;
  providerName?: string;
  timeoutMs?: number;
  cacheTtlMinutes?: number;
}

export type ApiSyncState =
  | 'LIVE'
  | 'FETCHING'
  | 'CACHED'
  | 'RATE_LIMITED'
  | 'API_ERROR'
  | 'TIMEOUT'
  | 'OFFLINE';

export type TelemetryType =
  | 'EXACT_GPS'               // Direct transponder GPS fix (lat/lng supplied)
  | 'STATION_REPORTED'        // Genuine reported station from IRCTC / NTES data
  | 'INTER_STATION_ESTIMATE'  // Visual interpolation between 2 confirmed stations
  | 'OFFLINE_SCHEDULE';       // Timetable-based fallback when live feed is offline

export type RunningStatusCategory =
  | 'RUNNING'
  | 'ARRIVED'
  | 'DEPARTED'
  | 'DELAYED'
  | 'AT_STATION'
  | 'NOT_STARTED'
  | 'TERMINATED'
  | 'DATA_UNAVAILABLE';

export interface LiveTrainStatusResponse {
  success: boolean;
  trainNumber: string;
  trainName?: string;
  telemetryType: TelemetryType;
  runningStatusCategory?: RunningStatusCategory;
  currentStationCode?: string;
  currentStationName?: string;
  lastReportedStationCode?: string;
  lastReportedStationName?: string;
  lastReportedStationActualTime?: string;
  lastReportedStationScheduledTime?: string;
  previousStationCode?: string;
  previousStationName?: string;
  nextStationCode?: string;
  nextStationName?: string;
  nextStationScheduledArrival?: string;
  nextStationEstimatedArrival?: string;
  delayMinutes: number;
  speedKmph?: number;
  latitude?: number;
  longitude?: number;
  headingDegrees?: number;
  currentTrackSection?: string;
  locationMessage?: string;
  statusMessage?: string;
  lastReportedTime?: string;
  isTerminated?: boolean;
  hasDepartedOrigin?: boolean;
  platformNumber?: string;
  routeStations?: TrainScheduleStation[];
  sourceProvider: string;
  fetchedAt: string;
  rawResponse?: any;
}

export interface TrainScheduleStation {
  stationCode: string;
  stationName: string;
  arrivalTime: string;
  departureTime: string;
  haltMinutes: number;
  distanceKm: number;
  dayCount: number;
  platform: string;
  status?: 'PASSED' | 'CURRENT' | 'UPCOMING';
  actualArrival?: string;
  actualDeparture?: string;
  delayMinutes?: number;
  latitude?: number;
  longitude?: number;
}

export interface TrainScheduleResponse {
  success: boolean;
  trainNumber: string;
  trainName: string;
  originStationCode: string;
  originStationName: string;
  destinationStationCode: string;
  destinationStationName: string;
  stations: TrainScheduleStation[];
  sourceProvider: string;
  fetchedAt: string;
}

export interface CachedApiEntry<T> {
  data: T;
  cachedAt: number; // timestamp ms
  expiresAt: number; // timestamp ms
  source: string;
}

