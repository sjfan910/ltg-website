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

// Result returned by the useStatistics hook
export interface StatsFetchResult {
  data: Statistics | null;
  error: string | null;
  loading: boolean;
  fromCache: boolean;
}

// Raw Google Sheets row structure (not used with header row format)
export interface GoogleSheetsRow {
  key: string;
  value: string;
}
