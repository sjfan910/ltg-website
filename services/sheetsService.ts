import { Statistics } from '../types/statistics';
import { parseCurrencyString } from '../utils/formatters';

// localStorage cache keys
const CACHE_KEYS = {
  STATISTICS: 'ltg_statistics_cache',
  TIMESTAMP: 'ltg_statistics_timestamp',
  VERSION: 'ltg_statistics_version_1', // For cache busting on schema changes
};

// Cache duration: 5 minutes (in milliseconds)
const CACHE_DURATION = 5 * 60 * 1000;

// Hardcoded fallback values (used when all else fails)
export const DEFAULT_STATISTICS: Statistics = {
  moneyRaisedUSD: 2000,
  moneyRaisedTHB: 70000,
  tutoringSessions: 90,
  studentsSupported: 89,
  lastUpdated: new Date().toISOString(),
};

/**
 * Fetch statistics from Google Sheets CSV export
 * @returns Promise<Statistics>
 */
export async function fetchStatisticsFromSheets(): Promise<Statistics> {
  const csvUrl = import.meta.env.VITE_SHEETS_CSV_URL;

  if (!csvUrl) {
    console.warn('[sheetsService] No CSV URL configured, using default values');
    return DEFAULT_STATISTICS;
  }

  try {
    const response = await fetch(csvUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    const statistics = parseSheetsCSV(csvText);

    // Cache the successful result
    setCachedStatistics(statistics);

    console.log('[sheetsService] Successfully fetched and cached statistics');
    return statistics;
  } catch (error) {
    console.error('[sheetsService] Error fetching statistics:', error);

    // Try to use cached data as fallback
    const cached = getCachedStatistics();
    if (cached) {
      console.log('[sheetsService] Using cached statistics as fallback');
      return cached;
    }

    // Final fallback: return defaults
    console.log('[sheetsService] Using default statistics as final fallback');
    return DEFAULT_STATISTICS;
  }
}

/**
 * Parse CSV from Google Sheets into Statistics object
 * Expected format (vertical key-value pairs):
 * Money Raised (THB),"฿96,262.21"
 * Money Raised (USD),"$3,062.02"
 * Sessions Tutored,78
 * Students Supported,89
 * @param csv - CSV string
 * @returns Statistics object
 */
export function parseSheetsCSV(csv: string): Statistics {
  try {
    const lines = csv.trim().split('\n');

    if (lines.length < 4) {
      throw new Error('CSV must have at least 4 rows (one for each metric)');
    }

    // Create a map of key -> value
    const dataMap: { [key: string]: string } = {};

    lines.forEach(line => {
      // Split on first comma only (values might have commas in quotes)
      const firstCommaIndex = line.indexOf(',');
      if (firstCommaIndex === -1) return;

      const key = line.substring(0, firstCommaIndex).trim();
      let value = line.substring(firstCommaIndex + 1).trim();

      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }

      dataMap[key] = value;
    });

    // Extract and parse values
    const moneyRaisedTHB = parseCurrencyString(dataMap['Money Raised (THB)'] || '0');
    const moneyRaisedUSD = parseCurrencyString(dataMap['Money Raised (USD)'] || '0');
    const tutoringSessions = parseInt(dataMap['Sessions Tutored'] || '0', 10);
    const studentsSupported = parseInt(dataMap['Students Supported'] || '0', 10);

    console.log('[sheetsService] Parsed statistics:', {
      moneyRaisedUSD,
      moneyRaisedTHB,
      tutoringSessions,
      studentsSupported,
    });

    return {
      moneyRaisedUSD,
      moneyRaisedTHB,
      tutoringSessions,
      studentsSupported,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[sheetsService] Error parsing CSV:', error);
    throw error;
  }
}

/**
 * Get cached statistics from localStorage
 * @returns Statistics object or null if not cached or expired
 */
export function getCachedStatistics(): Statistics | null {
  try {
    const cachedData = localStorage.getItem(CACHE_KEYS.STATISTICS);
    const cachedTimestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);
    const cachedVersion = localStorage.getItem(CACHE_KEYS.VERSION);

    if (!cachedData || !cachedTimestamp) {
      return null;
    }

    // Check version for cache busting
    if (cachedVersion !== CACHE_KEYS.VERSION) {
      console.log('[sheetsService] Cache version mismatch, invalidating cache');
      clearCache();
      return null;
    }

    const timestamp = parseInt(cachedTimestamp, 10);
    const age = Date.now() - timestamp;

    // For emergency fallback, accept stale cache (any age)
    // The caller can decide whether to use stale data
    const statistics = JSON.parse(cachedData) as Statistics;
    return statistics;
  } catch (error) {
    console.error('[sheetsService] Error reading cache:', error);
    return null;
  }
}

/**
 * Check if cache should be revalidated (older than CACHE_DURATION)
 * @returns true if cache is stale or missing
 */
export function shouldRevalidateCache(): boolean {
  try {
    const cachedTimestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);

    if (!cachedTimestamp) {
      return true; // No cache, needs fetch
    }

    const timestamp = parseInt(cachedTimestamp, 10);
    const age = Date.now() - timestamp;

    return age > CACHE_DURATION;
  } catch (error) {
    console.error('[sheetsService] Error checking cache age:', error);
    return true; // On error, revalidate
  }
}

/**
 * Save statistics to localStorage with timestamp
 * @param stats - Statistics object to cache
 */
export function setCachedStatistics(stats: Statistics): void {
  try {
    localStorage.setItem(CACHE_KEYS.STATISTICS, JSON.stringify(stats));
    localStorage.setItem(CACHE_KEYS.TIMESTAMP, Date.now().toString());
    localStorage.setItem(CACHE_KEYS.VERSION, CACHE_KEYS.VERSION);
  } catch (error) {
    console.error('[sheetsService] Error writing to cache:', error);
  }
}

/**
 * Clear all cached statistics
 */
export function clearCache(): void {
  try {
    localStorage.removeItem(CACHE_KEYS.STATISTICS);
    localStorage.removeItem(CACHE_KEYS.TIMESTAMP);
    localStorage.removeItem(CACHE_KEYS.VERSION);
    console.log('[sheetsService] Cache cleared');
  } catch (error) {
    console.error('[sheetsService] Error clearing cache:', error);
  }
}
