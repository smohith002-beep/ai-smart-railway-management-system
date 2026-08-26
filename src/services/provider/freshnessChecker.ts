import { FreshnessState, TrainPosition } from '../../types/railway';

export class FreshnessChecker {
  /**
   * Computes the data freshness state based strictly on real timestamps.
   * 0 - 30s: LIVE
   * 30s - 300s (5m): RECENT (DEGRADED)
   * 300s+ : STALE / LAST KNOWN
   */
  public static evaluateFreshness(providerTimestampStr: string): {
    state: FreshnessState;
    ageSeconds: number;
    badgeLabel: string;
    badgeColor: string;
    isStale: boolean;
  } {
    if (!providerTimestampStr) {
      return {
        state: 'DATA_UNAVAILABLE',
        ageSeconds: Infinity,
        badgeLabel: 'DATA UNAVAILABLE',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
        isStale: true
      };
    }

    const providerTime = new Date(providerTimestampStr).getTime();
    if (isNaN(providerTime)) {
      return {
        state: 'DATA_UNAVAILABLE',
        ageSeconds: Infinity,
        badgeLabel: 'INVALID TIMESTAMP',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
        isStale: true
      };
    }

    const now = Date.now();
    const ageSeconds = Math.max(0, Math.round((now - providerTime) / 1000));

    if (ageSeconds <= 30) {
      return {
        state: 'LIVE',
        ageSeconds,
        badgeLabel: '● LIVE',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 signal-green',
        isStale: false
      };
    } else if (ageSeconds <= 300) {
      return {
        state: 'RECENT',
        ageSeconds,
        badgeLabel: `▲ RECENT (${ageSeconds}s ago)`,
        badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        isStale: false
      };
    } else {
      const minutesAgo = Math.round(ageSeconds / 60);
      return {
        state: 'LAST_KNOWN',
        ageSeconds,
        badgeLabel: `■ LAST KNOWN (${minutesAgo}m ago)`,
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
        isStale: true
      };
    }
  }
}
