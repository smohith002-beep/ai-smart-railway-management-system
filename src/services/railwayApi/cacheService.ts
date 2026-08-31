import { CachedApiEntry } from './types';

export class RailwayCacheService {
  private memoryCache = new Map<string, CachedApiEntry<any>>();
  private prefix = 'ir_cache_';
  private hits = 0;
  private misses = 0;

  /**
   * Get cached item if valid and not expired
   */
  public get<T>(key: string): { data: T; isCached: boolean; ageSeconds: number } | null {
    const fullKey = this.prefix + key;
    const now = Date.now();

    // 1. Check memory cache
    let entry: CachedApiEntry<T> | undefined = this.memoryCache.get(fullKey);

    // 2. Check localStorage if not in memory
    if (!entry) {
      try {
        const stored = localStorage.getItem(fullKey);
        if (stored) {
          entry = JSON.parse(stored) as CachedApiEntry<T>;
          // Populate back to memory
          this.memoryCache.set(fullKey, entry);
        }
      } catch (e) {
        // LocalStorage error fallback
      }
    }

    if (entry) {
      if (now < entry.expiresAt) {
        this.hits++;
        const ageSeconds = Math.round((now - entry.cachedAt) / 1000);
        return { data: entry.data, isCached: true, ageSeconds };
      } else {
        // Expired
        this.delete(key);
      }
    }

    this.misses++;
    return null;
  }

  /**
   * Store item in both memory and localStorage with TTL in seconds
   */
  public set<T>(key: string, data: T, ttlSeconds: number = 120, source: string = 'API'): void {
    const fullKey = this.prefix + key;
    const now = Date.now();
    const entry: CachedApiEntry<T> = {
      data,
      cachedAt: now,
      expiresAt: now + ttlSeconds * 1000,
      source
    };

    this.memoryCache.set(fullKey, entry);

    try {
      localStorage.setItem(fullKey, JSON.stringify(entry));
    } catch (e) {
      // If quota exceeded, clean old items
      this.purgeExpired();
    }
  }

  /**
   * Delete specific key
   */
  public delete(key: string): void {
    const fullKey = this.prefix + key;
    this.memoryCache.delete(fullKey);
    try {
      localStorage.removeItem(fullKey);
    } catch (e) {}
  }

  /**
   * Clear all railway API cached entries
   */
  public clearAll(): void {
    this.memoryCache.clear();
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(this.prefix)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (e) {}
  }

  /**
   * Purge expired items from storage
   */
  public purgeExpired(): void {
    const now = Date.now();
    this.memoryCache.forEach((entry, key) => {
      if (now >= entry.expiresAt) {
        this.memoryCache.delete(key);
      }
    });

    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(this.prefix)) {
          try {
            const raw = localStorage.getItem(k);
            if (raw) {
              const entry = JSON.parse(raw);
              if (now >= entry.expiresAt) {
                keysToRemove.push(k);
              }
            }
          } catch {
            keysToRemove.push(k);
          }
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (e) {}
  }

  /**
   * Cache telemetry stats
   */
  public getStats(): { hits: number; misses: number; memoryItems: number; ratio: string } {
    const total = this.hits + this.misses;
    const ratio = total > 0 ? `${Math.round((this.hits / total) * 100)}%` : '100%';
    return {
      hits: this.hits,
      misses: this.misses,
      memoryItems: this.memoryCache.size,
      ratio
    };
  }
}

export const railwayCache = new RailwayCacheService();
