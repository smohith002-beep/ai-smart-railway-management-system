import { TrainPosition, FreshnessState } from '../../types/railway';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  sanitized?: Partial<TrainPosition>;
}

export class DataValidator {
  /**
   * Validates raw incoming telemetry payload from an authorized provider.
   * Rejects invalid coordinates, negative speeds, impossible timestamps, malformed train numbers.
   */
  public static validateTrainPosition(raw: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!raw) {
      return { isValid: false, errors: ['Null or undefined payload received.'], warnings: [] };
    }

    // 1. Train Number Validation
    if (!raw.trainNumber || typeof raw.trainNumber !== 'string' || raw.trainNumber.trim().length < 4) {
      errors.push(`Invalid train number: '${raw.trainNumber}'. Must be at least 4-5 digits.`);
    }

    // 2. Coordinate Validation (India bounding box roughly: Lat 6 to 38, Lng 68 to 98)
    const lat = Number(raw.latitude);
    const lng = Number(raw.longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push(`Invalid latitude: ${raw.latitude}. Must be between -90 and 90.`);
    } else if (lat < 5 || lat > 40) {
      warnings.push(`Latitude ${lat} is outside expected national railway bounding box (5 to 40).`);
    }

    if (isNaN(lng) || lng < -180 || lng > 180) {
      errors.push(`Invalid longitude: ${raw.longitude}. Must be between -180 and 180.`);
    } else if (lng < 65 || lng > 100) {
      warnings.push(`Longitude ${lng} is outside expected national railway bounding box (65 to 100).`);
    }

    // 3. Speed Validation (Speed cannot be negative or physically impossible for commercial trains > 220 km/h)
    const speed = Number(raw.speedKmph ?? raw.speed ?? 0);
    if (isNaN(speed) || speed < 0) {
      errors.push(`Invalid speed: ${speed} km/h. Cannot be negative.`);
    } else if (speed > 220) {
      warnings.push(`Unusually high speed detected: ${speed} km/h.`);
    }

    // 4. Heading Validation
    const heading = Number(raw.headingDegrees ?? raw.heading ?? 0);
    if (isNaN(heading) || heading < 0 || heading > 360) {
      warnings.push(`Heading ${heading}° was clamped to [0, 360].`);
    }

    // 5. Timestamp validation
    const tsString = raw.providerTimestamp || raw.timestamp || raw.updatedAt;
    if (!tsString) {
      errors.push('Missing provider timestamp. Real-time telemetry must have authoritative timestamp.');
    } else {
      const parsedDate = new Date(tsString);
      if (isNaN(parsedDate.getTime())) {
        errors.push(`Unparseable provider timestamp: '${tsString}'.`);
      } else {
        const now = Date.now();
        const diffMs = now - parsedDate.getTime();
        if (diffMs < -60000) {
          // Future timestamp by more than 1 minute
          warnings.push('Telemetry timestamp is in the future. Clock drift suspected.');
        }
      }
    }

    // 6. Source validation
    if (!raw.source) {
      warnings.push('Data source not declared. Falling back to UNVERIFIED.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitized: {
        trainNumber: String(raw.trainNumber || '').trim(),
        latitude: lat,
        longitude: lng,
        speedKmph: Math.max(0, Math.min(220, speed)),
        headingDegrees: ((heading % 360) + 360) % 360,
        providerTimestamp: tsString,
        source: raw.source || 'AUTHORIZED_PROVIDER'
      }
    };
  }
}
