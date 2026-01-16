import { useState, useEffect } from 'react';
import { Statistics, DisplayStatistics, StatsFetchResult } from '../types/statistics';
import {
  fetchStatisticsFromSheets,
  shouldRevalidateCache,
  getCachedStatistics,
  DEFAULT_STATISTICS,
} from '../services/sheetsService';
import {
  formatDualCurrency,
  formatWithPlus,
} from '../utils/formatters';

// Singleton pattern to prevent duplicate fetches across components
let pendingFetch: Promise<Statistics> | null = null;
let fetchedData: Statistics | null = null;

/**
 * Custom hook to fetch and manage statistics from Google Sheets
 * Provides loading states, error handling, and formatted display data
 */
export function useStatistics(): StatsFetchResult & { displayStats: DisplayStatistics } {
  const [data, setData] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const loadStatistics = async () => {
      try {
        // Check if we should use cache or fetch fresh data
        if (!shouldRevalidateCache()) {
          const cached = getCachedStatistics();
          if (cached && mounted) {
            setData(cached);
            setFromCache(true);
            setLoading(false);
            return;
          }
        }

        // If there's already a pending fetch, reuse it
        if (pendingFetch) {
          const result = await pendingFetch;
          if (mounted) {
            setData(result);
            setFromCache(false);
            setLoading(false);
            fetchedData = result;
          }
          return;
        }

        // If we already fetched data in this session, use it
        if (fetchedData) {
          if (mounted) {
            setData(fetchedData);
            setFromCache(false);
            setLoading(false);
          }
          return;
        }

        // Start a new fetch
        pendingFetch = fetchStatisticsFromSheets();

        const result = await pendingFetch;

        if (mounted) {
          setData(result);
          setFromCache(false);
          setError(null);
          fetchedData = result;
        }
      } catch (err) {
        console.error('[useStatistics] Error loading statistics:', err);

        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load statistics');

          // Try cache as fallback
          const cached = getCachedStatistics();
          if (cached) {
            setData(cached);
            setFromCache(true);
          } else {
            // Final fallback to defaults
            setData(DEFAULT_STATISTICS);
            setFromCache(false);
          }
        }
      } finally {
        pendingFetch = null;
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadStatistics();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      mounted = false;
    };
  }, []);

  // Format the data for display
  const displayStats: DisplayStatistics = {
    raised: data
      ? formatDualCurrency(data.moneyRaisedUSD, data.moneyRaisedTHB)
      : '$0 (฿0)',
    sessions: data ? formatWithPlus(data.tutoringSessions) : '0',
    donated: '100%', // Always static
    students: data ? data.studentsSupported.toString() : '0',
  };

  return {
    data,
    loading,
    error,
    fromCache,
    displayStats,
  };
}
