// ===============================================================
// AI SMART RAILWAY MANAGEMENT SYSTEM - URL ROUTER & DEEP LINKING
// Developer: MOHITH S | smohith002@gmail.com
// ===============================================================

export interface ParsedRoute {
  view: string;
  trainNumber?: string;
  stationCode?: string;
  searchQuery?: string;
}

// Map common SEO slugs to station codes for friendly URLs
const STATION_SLUG_MAP: Record<string, string> = {
  'chennai-central': 'MAS',
  'mgr-chennai-central': 'MAS',
  'chennai-egmore': 'MS',
  'tambaram': 'TBM',
  'coimbatore': 'CBE',
  'coimbatore-junction': 'CBE',
  'erode': 'ED',
  'salem': 'SA',
  'madurai': 'MDU',
  'tiruchirappalli': 'TPJ',
  'trichy': 'TPJ',
  'tirunelveli': 'TEN',
  'nagercoil': 'NCJ',
  'kanniyakumari': 'CAPE',
  'rameswaram': 'RMM',
  'new-delhi': 'NDLS',
  'delhi': 'NDLS',
  'kanpur-central': 'CNB',
  'prayagraj': 'PRYJ',
  'varanasi': 'BSB',
  'lucknow': 'LKO',
  'bhopal': 'BPL',
  'mumbai-central': 'MMCT',
  'mumbai-csmt': 'CSMT',
  'pune': 'PUNE',
  'ahmedabad': 'ADI',
  'howrah': 'HWH',
  'sealdah': 'SDAH',
  'patna': 'PNBE',
  'bengaluru-city': 'SBC',
  'bangalore': 'SBC',
  'ksr-bengaluru': 'SBC',
  'yesvantpur': 'YPR',
  'mysuru': 'MYS',
  'hubballi': 'UBL',
  'secunderabad': 'SC',
  'hyderabad': 'HYB',
  'kacheguda': 'KCG',
  'vijayawada': 'BZA',
  'visakhapatnam': 'VSKP',
  'tirupati': 'TPTY',
  'thiruvananthapuram': 'TVC',
  'trivandrum': 'TVC',
  'ernakulam': 'ERS',
  'kozhikode': 'CLT',
  'calicut': 'CLT',
  'kasaragod': 'KGQ'
};

export const normalizeStationCode = (slugOrCode: string): string => {
  const clean = slugOrCode.toLowerCase().trim();
  if (STATION_SLUG_MAP[clean]) {
    return STATION_SLUG_MAP[clean];
  }
  return slugOrCode.toUpperCase().trim();
};

export const parseCurrentUrl = (): ParsedRoute => {
  if (typeof window === 'undefined') {
    return { view: 'landing' };
  }

  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q') || undefined;

  // 1. Train routes: /train/:trainNumber
  const trainMatch = pathname.match(/^\/train\/([a-zA-Z0-9_-]+)/);
  if (trainMatch) {
    const rawNumber = trainMatch[1].replace(/\D/g, '') || trainMatch[1];
    return {
      view: 'details',
      trainNumber: rawNumber,
      searchQuery: q
    };
  }

  // 2. Station routes: /station/:stationCodeOrSlug
  const stationMatch = pathname.match(/^\/station\/([a-zA-Z0-9_-]+)/);
  if (stationMatch) {
    const code = normalizeStationCode(stationMatch[1]);
    return {
      view: 'station-details',
      stationCode: code,
      searchQuery: q
    };
  }

  // 3. 3D Cinematic routes: /cinematic/:trainNumber or /cinematic
  const cinematicMatch = pathname.match(/^\/cinematic(?:\/([a-zA-Z0-9_-]+))?/);
  if (cinematicMatch) {
    return {
      view: 'cinematic',
      trainNumber: cinematicMatch[1] ? cinematicMatch[1].replace(/\D/g, '') : undefined,
      searchQuery: q
    };
  }

  // 4. Standard Top-Level Routes
  switch (pathname) {
    case '/trains':
    case '/fleet':
      return { view: 'trains', searchQuery: q };
    case '/stations':
      return { view: 'stations', searchQuery: q };
    case '/map':
      return { view: 'map', searchQuery: q };
    case '/command':
      return { view: 'command', searchQuery: q };
    case '/attendance':
      return { view: 'attendance', searchQuery: q };
    case '/duty':
      return { view: 'duty', searchQuery: q };
    case '/copilot':
      return { view: 'copilot', searchQuery: q };
    case '/emergency':
      return { view: 'emergency', searchQuery: q };
    case '/analytics':
      return { view: 'analytics', searchQuery: q };
    case '/sources':
      return { view: 'sources', searchQuery: q };
    case '/simulation':
      return { view: 'simulation', searchQuery: q };
    case '/audit':
      return { view: 'audit', searchQuery: q };
    case '/':
    default:
      return { view: 'landing', searchQuery: q };
  }
};

export const getRoutePath = (
  view: string,
  params?: { trainNumber?: string; stationCode?: string }
): string => {
  switch (view) {
    case 'landing':
      return '/';
    case 'trains':
      return '/trains';
    case 'details':
      return params?.trainNumber ? `/train/${params.trainNumber}` : '/trains';
    case 'stations':
      return '/stations';
    case 'station-details':
      return params?.stationCode ? `/station/${params.stationCode.toUpperCase()}` : '/stations';
    case 'map':
      return '/map';
    case 'cinematic':
      return params?.trainNumber ? `/cinematic/${params.trainNumber}` : '/cinematic';
    case 'command':
      return '/command';
    case 'attendance':
      return '/attendance';
    case 'duty':
      return '/duty';
    case 'copilot':
      return '/copilot';
    case 'emergency':
      return '/emergency';
    case 'analytics':
      return '/analytics';
    case 'sources':
      return '/sources';
    case 'simulation':
      return '/simulation';
    case 'audit':
      return '/audit';
    default:
      return '/';
  }
};

export const pushRoute = (
  view: string,
  params?: { trainNumber?: string; stationCode?: string }
): void => {
  if (typeof window === 'undefined') return;
  const path = getRoutePath(view, params);
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
};
