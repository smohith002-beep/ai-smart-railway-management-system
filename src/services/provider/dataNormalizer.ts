import { TrainPosition, TrainStatus } from '../../types/railway';
import { FreshnessChecker } from './freshnessChecker';

export class DataNormalizer {
  /**
   * Normalizes disparate external API responses into a unified platform TrainPosition format.
   */
  public static normalize(raw: any, trainMetadata?: { name?: string; id?: string }): TrainPosition {
    const trainNumber = String(raw.trainNumber || raw.trainNo || raw.trip_id || raw.id || 'UNKNOWN');
    const trainName = trainMetadata?.name || raw.trainName || raw.name || `Train ${trainNumber}`;
    const trainId = trainMetadata?.id || raw.trainId || `train_${trainNumber}`;

    const lat = Number(raw.latitude ?? raw.lat ?? raw.position?.latitude ?? 0);
    const lng = Number(raw.longitude ?? raw.lng ?? raw.position?.longitude ?? 0);
    const speed = Number(raw.speedKmph ?? raw.speed ?? raw.position?.speed ?? 0);
    const heading = Number(raw.headingDegrees ?? raw.heading ?? raw.position?.bearing ?? 0);

    const providerTimestamp = raw.providerTimestamp || raw.timestamp || raw.lastReportedTime || raw.updatedAt || new Date().toISOString();
    const freshness = FreshnessChecker.evaluateFreshness(providerTimestamp);

    const delayMinutes = Number(raw.delayMinutes ?? raw.delay ?? (raw.delay_seconds ? Math.round(raw.delay_seconds / 60) : 0));

    let status: TrainStatus = 'ON_TIME';
    if (raw.status) {
      status = raw.status as TrainStatus;
    } else if (delayMinutes > 45) {
      status = 'SEVERELY_DELAYED';
    } else if (delayMinutes > 5) {
      status = 'DELAYED';
    } else if (freshness.isStale) {
      status = 'STALE';
    }

    const telemetryType = raw.telemetryType || (lat !== 0 && lng !== 0 ? 'EXACT_GPS' : 'STATION_REPORTED');
    const lastReportedStationCode = raw.lastReportedStationCode || raw.currentStationCode || raw.current_station_code;
    const lastReportedStationName = raw.lastReportedStationName || raw.currentStationName || raw.current_station_name;
    const locationMessage = raw.locationMessage || raw.statusMessage || (
      lastReportedStationName
        ? `Last reported at ${lastReportedStationName} (${lastReportedStationCode || '---'})`
        : `En-route to ${raw.nextStationName || 'next station'}`
    );

    return {
      id: raw.id || `pos_${trainNumber}_${Date.now()}`,
      trainId,
      trainNumber,
      trainName,
      latitude: lat,
      longitude: lng,
      speedKmph: Math.round(speed * 10) / 10,
      headingDegrees: Math.round(heading),
      status,
      telemetryType,
      nextStationCode: raw.nextStationCode || raw.nextStation || raw.next_stop_id || '---',
      nextStationName: raw.nextStationName || raw.nextStation || 'Next Station',
      previousStationCode: raw.previousStationCode || raw.prevStation || '---',
      previousStationName: raw.previousStationName || raw.prevStation || 'Prev Station',
      lastReportedStationCode,
      lastReportedStationName,
      lastReportedTime: raw.lastReportedTime || providerTimestamp,
      locationMessage,
      delayMinutes,
      source: raw.source || raw.sourceProvider || 'AUTHORIZED_RAILWAY_PROVIDER',
      receivedAt: new Date().toISOString(),
      providerTimestamp,
      dataQuality: raw.dataQuality || (freshness.isStale ? 'DEGRADED' : 'EXCELLENT'),
      freshnessState: freshness.state,
      distanceCoveredKm: Number(raw.distanceCoveredKm || 0),
      totalDistanceKm: Number(raw.totalDistanceKm || 500),
      platformNumber: raw.platformNumber || raw.platform,
      nextStationScheduledArrival: raw.nextStationScheduledArrival,
      currentTrackSection: raw.currentTrackSection || `Section ${trainNumber.slice(0, 2)}-${trainNumber.slice(-2)}`,
      signalAspect: raw.signalAspect || (status === 'SEVERELY_DELAYED' ? 'YELLOW' : 'GREEN')
    };
  }
}
