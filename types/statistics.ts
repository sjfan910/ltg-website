// Core statistics data structure
export interface Statistics {
  moneyRaisedUSD: number;
  moneyRaisedTHB: number;
  tutoringSessions: number;
  studentsSupported: number;
  lastUpdated: string;
}

// Display-ready formatted statistics
export interface DisplayStatistics {
  raised: string;          // e.g., "$3,060 (฿96,262)"
  sessions: string;        // e.g., "110+"
  donated: string;         // Always "100%"
  students?: string;       // e.g., "89" (for chatbot)
}

export interface StatsFetchResult {
  data: Statistics | null;
  error: string | null;
  loading: boolean;
  fromCache: boolean;
}

export interface GoogleSheetsRow {
  key: string;
  value: string;
}
