import { TrainDetails, RailwayStation, StationScheduleItem } from '../../types/railway';
import { MasterTrainSummary } from './nationalTrainMasterDataset';

export interface RouteValidationResult {
  isValid: boolean;
  trainNumber: string;
  trainName: string;
  originStationCode: string;
  originStationName: string;
  destinationStationCode: string;
  destinationStationName: string;
  totalStations: number;
  warnings: string[];
  discrepancies: string[];
  authoritativeSource: string;
}

export interface LiveStatusValidationResult {
  isValid: boolean;
  trainNumber: string;
  reportedStationCode: string;
  isStationOnRoute: boolean;
  nextStationCode?: string;
  isNextStationOnRoute: boolean;
  delayMinutes: number;
  statusCategory: 'ON_TIME' | 'DELAYED' | 'SEVERELY_DELAYED' | 'DATA_UNAVAILABLE';
  telemetryType: 'EXACT_GPS' | 'STATION_REPORTED' | 'OFFLINE_SCHEDULE';
  warnings: string[];
}

export class TrainValidationService {
  /**
   * Validates a train's metadata, origin, and destination against official timetable registry.
   * NEVER permits synthesized or guessed destinations.
   */
  public static validateTrainRoute(
    train: MasterTrainSummary | TrainDetails,
    officialSchedule?: StationScheduleItem[]
  ): RouteValidationResult {
    const warnings: string[] = [];
    const discrepancies: string[] = [];
    const trainNum = (train.trainNumber || '').replace(/\D/g, '').trim() || train.trainNumber;

    if (!trainNum || trainNum.length < 4) {
      warnings.push(`Invalid train number format: "${train.trainNumber}"`);
    }

    const originCode = (train.originStationCode || '').toUpperCase().trim();
    const destCode = (train.destinationStationCode || '').toUpperCase().trim();

    if (!originCode) {
      discrepancies.push('Missing origin station code');
    }
    if (!destCode) {
      discrepancies.push('Missing terminal destination station code');
    }
    if (originCode && destCode && originCode === destCode) {
      discrepancies.push(`Origin and Destination are identical (${originCode}) - Circular or Invalid route`);
    }

    // Schedule Stoppage Consistency Check
    let totalStations = 0;
    if (officialSchedule && officialSchedule.length > 0) {
      totalStations = officialSchedule.length;
      const firstStop = officialSchedule[0];
      const lastStop = officialSchedule[officialSchedule.length - 1];

      if (firstStop && firstStop.stationCode.toUpperCase() !== originCode) {
        discrepancies.push(
          `Origin mismatch: Train specifies "${originCode}" but first schedule stop is "${firstStop.stationCode}"`
        );
      }

      if (lastStop && lastStop.stationCode.toUpperCase() !== destCode) {
        discrepancies.push(
          `Destination mismatch: Train specifies "${destCode}" but final schedule stop is "${lastStop.stationCode}"`
        );
      }
    }

    const isValid = discrepancies.length === 0 && warnings.length === 0;

    return {
      isValid,
      trainNumber: trainNum,
      trainName: train.trainName,
      originStationCode: originCode,
      originStationName: train.originStationName,
      destinationStationCode: destCode,
      destinationStationName: train.destinationStationName,
      totalStations,
      warnings,
      discrepancies,
      authoritativeSource: 'INDIAN_RAILWAYS_OFFICIAL_REGISTRY'
    };
  }

  /**
   * Validates that live telemetry (current location, next station) belongs to the train's verified route.
   */
  public static validateLiveRunningStatus(
    trainNumber: string,
    schedule: StationScheduleItem[],
    reportedStationCode?: string,
    nextStationCode?: string,
    rawDelayMinutes: number = 0,
    hasDirectGps: boolean = false
  ): LiveStatusValidationResult {
    const warnings: string[] = [];
    const validCodes = new Set(schedule.map(s => s.stationCode.toUpperCase().trim()));

    const cleanReported = (reportedStationCode || '').toUpperCase().trim();
    const cleanNext = (nextStationCode || '').toUpperCase().trim();

    const isStationOnRoute = cleanReported ? validCodes.has(cleanReported) : false;
    const isNextStationOnRoute = cleanNext ? validCodes.has(cleanNext) : false;

    if (cleanReported && !isStationOnRoute) {
      warnings.push(`Reported station "${cleanReported}" is not part of train ${trainNumber} official route.`);
    }

    if (cleanNext && !isNextStationOnRoute) {
      warnings.push(`Reported next station "${cleanNext}" is not part of train ${trainNumber} official route.`);
    }

    const delayMinutes = Math.max(0, isNaN(rawDelayMinutes) ? 0 : rawDelayMinutes);
    let statusCategory: 'ON_TIME' | 'DELAYED' | 'SEVERELY_DELAYED' | 'DATA_UNAVAILABLE' = 'ON_TIME';
    if (delayMinutes > 45) statusCategory = 'SEVERELY_DELAYED';
    else if (delayMinutes > 5) statusCategory = 'DELAYED';

    const telemetryType: 'EXACT_GPS' | 'STATION_REPORTED' | 'OFFLINE_SCHEDULE' = hasDirectGps
      ? 'EXACT_GPS'
      : (cleanReported ? 'STATION_REPORTED' : 'OFFLINE_SCHEDULE');

    return {
      isValid: warnings.length === 0,
      trainNumber,
      reportedStationCode: cleanReported,
      isStationOnRoute,
      nextStationCode: cleanNext,
      isNextStationOnRoute,
      delayMinutes,
      statusCategory,
      telemetryType,
      warnings
    };
  }
}
