import { TrainDetails, RailwayStation, TrainPosition } from '../../types/railway';

// ===============================================================
// AUTHENTIC INDIAN RAILWAY STATIONS (NORTH + SOUTH + EAST + WEST)
// ===============================================================
export const REAL_INDIAN_STATIONS: RailwayStation[] = [
  // --- NORTH INDIA ---
  {
    id: 'st_ndls',
    code: 'NDLS',
    name: 'New Delhi',
    zone: 'NR',
    division: 'Delhi',
    latitude: 28.6425,
    longitude: 77.2205,
    category: 'TERMINAL',
    platformsCount: 16,
    platforms: [
      { number: 1, status: 'OCCUPIED', signalAspect: 'GREEN' },
      { number: 2, status: 'CLEAR', signalAspect: 'GREEN' },
      { number: 3, status: 'OCCUPIED', signalAspect: 'DOUBLE_YELLOW' },
      { number: 4, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_cnb',
    code: 'CNB',
    name: 'Kanpur Central',
    zone: 'NCR',
    division: 'Prayagraj',
    latitude: 26.4547,
    longitude: 80.3507,
    category: 'MAJOR_JUNCTION',
    platformsCount: 10,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_pryj',
    code: 'PRYJ',
    name: 'Prayagraj Junction',
    zone: 'NCR',
    division: 'Prayagraj',
    latitude: 25.4497,
    longitude: 81.8282,
    category: 'MAJOR_JUNCTION',
    platformsCount: 10,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_bsb',
    code: 'BSB',
    name: 'Varanasi Junction',
    zone: 'NR',
    division: 'Lucknow',
    latitude: 25.3283,
    longitude: 82.9863,
    category: 'MAJOR_JUNCTION',
    platformsCount: 9,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_agc',
    code: 'AGC',
    name: 'Agra Cantt',
    zone: 'NCR',
    division: 'Agra',
    latitude: 27.1594,
    longitude: 77.9947,
    category: 'MAJOR_JUNCTION',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_gwl',
    code: 'GWL',
    name: 'Gwalior Junction',
    zone: 'NCR',
    division: 'Jhansi',
    latitude: 26.2183,
    longitude: 78.1828,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_jp',
    code: 'JP',
    name: 'Jaipur Junction',
    zone: 'NWR',
    division: 'Jaipur',
    latitude: 26.9196,
    longitude: 75.7878,
    category: 'TERMINAL',
    platformsCount: 8,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_lko',
    code: 'LKO',
    name: 'Lucknow Charbagh',
    zone: 'NR',
    division: 'Lucknow NR',
    latitude: 26.8315,
    longitude: 80.9209,
    category: 'MAJOR_JUNCTION',
    platformsCount: 9,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_bpl',
    code: 'BPL',
    name: 'Bhopal Junction',
    zone: 'WCR',
    division: 'Bhopal',
    latitude: 23.2685,
    longitude: 77.4126,
    category: 'MAJOR_JUNCTION',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_ngl',
    code: 'NGP',
    name: 'Nagpur Junction',
    zone: 'CR',
    division: 'Nagpur',
    latitude: 21.1524,
    longitude: 79.0882,
    category: 'MAJOR_JUNCTION',
    platformsCount: 8,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },

  // --- WEST & EAST INDIA ---
  {
    id: 'st_mmct',
    code: 'MMCT',
    name: 'Mumbai Central',
    zone: 'WR',
    division: 'Mumbai',
    latitude: 18.9696,
    longitude: 72.8193,
    category: 'TERMINAL',
    platformsCount: 8,
    platforms: [{ number: 1, status: 'OCCUPIED', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_csmt',
    code: 'CSMT',
    name: 'Chhatrapati Shivaji Maharaj Terminus (Mumbai)',
    zone: 'CR',
    division: 'Mumbai CR',
    latitude: 18.9401,
    longitude: 72.8347,
    category: 'TERMINAL',
    platformsCount: 18,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_st',
    code: 'ST',
    name: 'Surat',
    zone: 'WR',
    division: 'Mumbai',
    latitude: 21.2049,
    longitude: 72.8406,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_brc',
    code: 'BRC',
    name: 'Vadodara Junction',
    zone: 'WR',
    division: 'Vadodara',
    latitude: 22.3107,
    longitude: 73.1812,
    category: 'MAJOR_JUNCTION',
    platformsCount: 7,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_adi',
    code: 'ADI',
    name: 'Ahmedabad Junction',
    zone: 'WR',
    division: 'Ahmedabad',
    latitude: 23.0274,
    longitude: 72.6012,
    category: 'TERMINAL',
    platformsCount: 12,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_pune',
    code: 'PUNE',
    name: 'Pune Junction',
    zone: 'CR',
    division: 'Pune',
    latitude: 18.5284,
    longitude: 73.8744,
    category: 'TERMINAL',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_hwh',
    code: 'HWH',
    name: 'Howrah Junction',
    zone: 'ER',
    division: 'Howrah',
    latitude: 22.5840,
    longitude: 88.3426,
    category: 'TERMINAL',
    platformsCount: 23,
    platforms: [{ number: 1, status: 'OCCUPIED', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_sda',
    code: 'SDAH',
    name: 'Sealdah',
    zone: 'ER',
    division: 'Sealdah',
    latitude: 22.5687,
    longitude: 88.3712,
    category: 'TERMINAL',
    platformsCount: 21,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_pnbe',
    code: 'PNBE',
    name: 'Patna Junction',
    zone: 'ECR',
    division: 'Danapur',
    latitude: 25.6022,
    longitude: 85.1376,
    category: 'TERMINAL',
    platformsCount: 10,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_njp',
    code: 'NJP',
    name: 'New Jalpaiguri Junction',
    zone: 'NFR',
    division: 'Katihar',
    latitude: 26.6841,
    longitude: 88.4419,
    category: 'MAJOR_JUNCTION',
    platformsCount: 7,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_ghy',
    code: 'GHY',
    name: 'Guwahati',
    zone: 'NFR',
    division: 'Lumding',
    latitude: 26.1824,
    longitude: 91.7519,
    category: 'TERMINAL',
    platformsCount: 7,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_bbs',
    code: 'BBS',
    name: 'Bhubaneswar',
    zone: 'ECoR',
    division: 'Khurda Road',
    latitude: 20.2666,
    longitude: 85.8436,
    category: 'MAJOR_JUNCTION',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_puri',
    code: 'PURI',
    name: 'Puri',
    zone: 'ECoR',
    division: 'Khurda Road',
    latitude: 19.8135,
    longitude: 85.8312,
    category: 'TERMINAL',
    platformsCount: 8,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },

  // --- TAMIL NADU & PUDUCHERRY ---
  {
    id: 'st_mas',
    code: 'MAS',
    name: 'MGR Chennai Central',
    zone: 'SR',
    division: 'Chennai',
    latitude: 13.0827,
    longitude: 80.2755,
    category: 'TERMINAL',
    platformsCount: 17,
    platforms: [
      { number: 1, occupyingTrain: '20607', status: 'OCCUPIED', signalAspect: 'GREEN' },
      { number: 2, status: 'CLEAR', signalAspect: 'GREEN' },
      { number: 3, status: 'CLEAR', signalAspect: 'GREEN' },
      { number: 4, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_ms',
    code: 'MS',
    name: 'Chennai Egmore',
    zone: 'SR',
    division: 'Chennai',
    latitude: 13.0784,
    longitude: 80.2604,
    category: 'TERMINAL',
    platformsCount: 11,
    platforms: [
      { number: 1, occupyingTrain: '12635', status: 'OCCUPIED', signalAspect: 'GREEN' },
      { number: 2, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_tbm',
    code: 'TBM',
    name: 'Tambaram',
    zone: 'SR',
    division: 'Chennai',
    latitude: 12.9249,
    longitude: 80.1172,
    category: 'TERMINAL',
    platformsCount: 8,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_cbe',
    code: 'CBE',
    name: 'Coimbatore Junction',
    zone: 'SR',
    division: 'Salem',
    latitude: 11.0016,
    longitude: 76.9629,
    category: 'MAJOR_JUNCTION',
    platformsCount: 6,
    platforms: [
      { number: 1, occupyingTrain: '12673', status: 'OCCUPIED', signalAspect: 'GREEN' },
      { number: 2, status: 'CLEAR', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_ed',
    code: 'ED',
    name: 'Erode Junction',
    zone: 'SR',
    division: 'Salem',
    latitude: 11.3283,
    longitude: 77.7289,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_sa',
    code: 'SA',
    name: 'Salem Junction',
    zone: 'SR',
    division: 'Salem',
    latitude: 11.6643,
    longitude: 78.1460,
    category: 'MAJOR_JUNCTION',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_tpj',
    code: 'TPJ',
    name: 'Tiruchirappalli Junction (Trichy)',
    zone: 'SR',
    division: 'Tiruchirappalli',
    latitude: 10.7937,
    longitude: 78.6854,
    category: 'MAJOR_JUNCTION',
    platformsCount: 8,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_mdu',
    code: 'MDU',
    name: 'Madurai Junction',
    zone: 'SR',
    division: 'Madurai',
    latitude: 9.9195,
    longitude: 78.1116,
    category: 'MAJOR_JUNCTION',
    platformsCount: 8,
    platforms: [
      { number: 1, occupyingTrain: '12637', status: 'OCCUPIED', signalAspect: 'GREEN' }
    ]
  },
  {
    id: 'st_ten',
    code: 'TEN',
    name: 'Tirunelveli Junction',
    zone: 'SR',
    division: 'Madurai',
    latitude: 8.7297,
    longitude: 77.7126,
    category: 'MAJOR_JUNCTION',
    platformsCount: 5,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_ncj',
    code: 'NCJ',
    name: 'Nagercoil Junction',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    latitude: 8.1818,
    longitude: 77.4398,
    category: 'TERMINAL',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_cape',
    code: 'CAPE',
    name: 'Kanniyakumari (Cape Comorin)',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    latitude: 8.0883,
    longitude: 77.5385,
    category: 'TERMINAL',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_rmm',
    code: 'RMM',
    name: 'Rameswaram (Pamban Island)',
    zone: 'SR',
    division: 'Madurai',
    latitude: 9.2876,
    longitude: 79.3129,
    category: 'TERMINAL',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_kpd',
    code: 'KPD',
    name: 'Katpadi Junction (Vellore)',
    zone: 'SR',
    division: 'Chennai',
    latitude: 12.9698,
    longitude: 79.1378,
    category: 'MAJOR_JUNCTION',
    platformsCount: 5,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_dg',
    code: 'DG',
    name: 'Dindigul Junction',
    zone: 'SR',
    division: 'Madurai',
    latitude: 10.3673,
    longitude: 77.9803,
    category: 'MAJOR_JUNCTION',
    platformsCount: 5,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_tj',
    code: 'TJ',
    name: 'Thanjavur Junction',
    zone: 'SR',
    division: 'Tiruchirappalli',
    latitude: 10.7760,
    longitude: 79.1332,
    category: 'MAJOR_JUNCTION',
    platformsCount: 5,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_vm',
    code: 'VM',
    name: 'Villupuram Junction',
    zone: 'SR',
    division: 'Tiruchirappalli',
    latitude: 11.9398,
    longitude: 79.4975,
    category: 'MAJOR_JUNCTION',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_tn',
    code: 'TN',
    name: 'Tuticorin (Thoothukudi)',
    zone: 'SR',
    division: 'Madurai',
    latitude: 8.7642,
    longitude: 78.1348,
    category: 'TERMINAL',
    platformsCount: 3,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_pdy',
    code: 'PDY',
    name: 'Puducherry (Pondicherry)',
    zone: 'SR',
    division: 'Tiruchirappalli',
    latitude: 11.9272,
    longitude: 79.8277,
    category: 'TERMINAL',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_kik',
    code: 'KIK',
    name: 'Karaikal (Puducherry UT)',
    zone: 'SR',
    division: 'Tiruchirappalli',
    latitude: 10.9254,
    longitude: 79.8380,
    category: 'TERMINAL',
    platformsCount: 3,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },

  // --- KERALA ---
  {
    id: 'st_tvc',
    code: 'TVC',
    name: 'Thiruvananthapuram Central (Trivandrum)',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    latitude: 8.4875,
    longitude: 76.9535,
    category: 'TERMINAL',
    platformsCount: 5,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_ers',
    code: 'ERS',
    name: 'Ernakulam Junction (Kochi South)',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    latitude: 9.9678,
    longitude: 76.2898,
    category: 'MAJOR_JUNCTION',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_ern',
    code: 'ERN',
    name: 'Ernakulam Town (Kochi North)',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    latitude: 9.9934,
    longitude: 76.2934,
    category: 'MAJOR_JUNCTION',
    platformsCount: 3,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_clt',
    code: 'CLT',
    name: 'Kozhikode (Calicut)',
    zone: 'SR',
    division: 'Palakkad',
    latitude: 11.2467,
    longitude: 75.7844,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_tcr',
    code: 'TCR',
    name: 'Thrissur',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    latitude: 10.5186,
    longitude: 76.2089,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_qln',
    code: 'QLN',
    name: 'Kollam Junction (Quilon)',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    latitude: 8.8872,
    longitude: 76.5956,
    category: 'MAJOR_JUNCTION',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_can',
    code: 'CAN',
    name: 'Kannur (Cannanore)',
    zone: 'SR',
    division: 'Palakkad',
    latitude: 11.8745,
    longitude: 75.3704,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_pgt',
    code: 'PGT',
    name: 'Palakkad Junction (Palghat)',
    zone: 'SR',
    division: 'Palakkad',
    latitude: 10.8037,
    longitude: 76.6548,
    category: 'MAJOR_JUNCTION',
    platformsCount: 5,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_srr',
    code: 'SRR',
    name: 'Shoranur Junction',
    zone: 'SR',
    division: 'Palakkad',
    latitude: 10.7602,
    longitude: 76.2731,
    category: 'MAJOR_JUNCTION',
    platformsCount: 7,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_allp',
    code: 'ALLP',
    name: 'Alappuzha (Alleppey)',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    latitude: 9.4924,
    longitude: 76.3264,
    category: 'TERMINAL',
    platformsCount: 3,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_ktym',
    code: 'KTYM',
    name: 'Kottayam',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    latitude: 9.5916,
    longitude: 76.5222,
    category: 'MAJOR_JUNCTION',
    platformsCount: 5,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_kgq',
    code: 'KGQ',
    name: 'Kasaragod',
    zone: 'SR',
    division: 'Palakkad',
    latitude: 12.5086,
    longitude: 74.9872,
    category: 'STATION',
    platformsCount: 3,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },

  // --- KARNATAKA ---
  {
    id: 'st_sbc',
    code: 'SBC',
    name: 'KSR Bengaluru City (Majestic)',
    zone: 'SWR',
    division: 'Bengaluru',
    latitude: 12.9784,
    longitude: 77.5684,
    category: 'TERMINAL',
    platformsCount: 10,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_ypr',
    code: 'YPR',
    name: 'Yesvantpur Junction (Bengaluru)',
    zone: 'SWR',
    division: 'Bengaluru',
    latitude: 13.0238,
    longitude: 77.5503,
    category: 'TERMINAL',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_smvb',
    code: 'SMVB',
    name: 'SMVT Bengaluru (Baiyappanahalli Terminal)',
    zone: 'SWR',
    division: 'Bengaluru',
    latitude: 13.0039,
    longitude: 77.6534,
    category: 'TERMINAL',
    platformsCount: 7,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_mys',
    code: 'MYS',
    name: 'Mysuru Junction (Mysore)',
    zone: 'SWR',
    division: 'Mysuru',
    latitude: 12.3164,
    longitude: 76.6457,
    category: 'TERMINAL',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_maq',
    code: 'MAQ',
    name: 'Mangaluru Central (Mangalore)',
    zone: 'SR',
    division: 'Palakkad',
    latitude: 12.8654,
    longitude: 74.8431,
    category: 'TERMINAL',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_majn',
    code: 'MAJN',
    name: 'Mangaluru Junction',
    zone: 'SR',
    division: 'Palakkad',
    latitude: 12.8698,
    longitude: 74.8728,
    category: 'MAJOR_JUNCTION',
    platformsCount: 3,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_ubl',
    code: 'UBL',
    name: 'SSS Hubballi Junction (Hubli)',
    zone: 'SWR',
    division: 'Hubballi',
    latitude: 15.3496,
    longitude: 75.1481,
    category: 'MAJOR_JUNCTION',
    platformsCount: 8,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_bgm',
    code: 'BGM',
    name: 'Belagavi (Belgaum)',
    zone: 'SWR',
    division: 'Hubballi',
    latitude: 15.8601,
    longitude: 74.5039,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_klbg',
    code: 'KLBG',
    name: 'Kalaburagi Junction (Gulbarga)',
    zone: 'CR',
    division: 'Solapur',
    latitude: 17.3374,
    longitude: 76.8407,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_bay',
    code: 'BAY',
    name: 'Ballari Junction (Bellary)',
    zone: 'SWR',
    division: 'Hubballi',
    latitude: 15.1424,
    longitude: 76.9248,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_dvg',
    code: 'DVG',
    name: 'Davangere',
    zone: 'SWR',
    division: 'Mysuru',
    latitude: 14.4673,
    longitude: 75.9212,
    category: 'STATION',
    platformsCount: 3,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },

  // --- ANDHRA PRADESH & TELANGANA ---
  {
    id: 'st_sc',
    code: 'SC',
    name: 'Secunderabad Junction',
    zone: 'SCR',
    division: 'Secunderabad',
    latitude: 17.4344,
    longitude: 78.5015,
    category: 'TERMINAL',
    platformsCount: 10,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_hyb',
    code: 'HYB',
    name: 'Hyderabad Deccan (Nampally)',
    zone: 'SCR',
    division: 'Hyderabad',
    latitude: 17.3924,
    longitude: 78.4704,
    category: 'TERMINAL',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_kcg',
    code: 'KCG',
    name: 'Kacheguda (Hyderabad)',
    zone: 'SCR',
    division: 'Hyderabad',
    latitude: 17.3888,
    longitude: 78.4984,
    category: 'TERMINAL',
    platformsCount: 5,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_bza',
    code: 'BZA',
    name: 'Vijayawada Junction',
    zone: 'SCR',
    division: 'Vijayawada',
    latitude: 16.5186,
    longitude: 80.6195,
    category: 'MAJOR_JUNCTION',
    platformsCount: 10,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_vskp',
    code: 'VSKP',
    name: 'Visakhapatnam Junction (Vizag)',
    zone: 'ECoR',
    division: 'Waltair',
    latitude: 17.7208,
    longitude: 83.2842,
    category: 'TERMINAL',
    platformsCount: 8,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_tpty',
    code: 'TPTY',
    name: 'Tirupati (Tirumala)',
    zone: 'SCR',
    division: 'Guntakal',
    latitude: 13.6288,
    longitude: 79.4192,
    category: 'TERMINAL',
    platformsCount: 6,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_ru',
    code: 'RU',
    name: 'Renigunta Junction',
    zone: 'SCR',
    division: 'Guntakal',
    latitude: 13.6508,
    longitude: 79.5168,
    category: 'MAJOR_JUNCTION',
    platformsCount: 5,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_gnt',
    code: 'GNT',
    name: 'Guntur Junction',
    zone: 'SCR',
    division: 'Guntur',
    latitude: 16.3067,
    longitude: 80.4365,
    category: 'MAJOR_JUNCTION',
    platformsCount: 7,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_nlr',
    code: 'NLR',
    name: 'Nellore',
    zone: 'SCR',
    division: 'Vijayawada',
    latitude: 14.4426,
    longitude: 79.9865,
    category: 'STATION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_rjy',
    code: 'RJY',
    name: 'Rajahmundry',
    zone: 'SCR',
    division: 'Vijayawada',
    latitude: 16.9891,
    longitude: 81.7840,
    category: 'MAJOR_JUNCTION',
    platformsCount: 3,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_kzj',
    code: 'KZJ',
    name: 'Kazipet Junction (Warangal)',
    zone: 'SCR',
    division: 'Secunderabad',
    latitude: 17.9784,
    longitude: 79.5244,
    category: 'MAJOR_JUNCTION',
    platformsCount: 4,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  },
  {
    id: 'st_gtl',
    code: 'GTL',
    name: 'Guntakal Junction',
    zone: 'SCR',
    division: 'Guntakal',
    latitude: 15.1713,
    longitude: 77.3768,
    category: 'MAJOR_JUNCTION',
    platformsCount: 7,
    platforms: [{ number: 1, status: 'CLEAR', signalAspect: 'GREEN' }]
  }
];

// ===============================================================
// AUTHENTIC 100+ REAL INDIAN RAILWAYS TRAINS (NORTH + SOUTH)
// ===============================================================
export const REAL_INDIAN_TRAINS: TrainDetails[] = [
  // =============================================================
  // 1. VANDE BHARAT EXPRESS FLEET (SOUTH & NORTH)
  // =============================================================
  {
    id: 'tr_20607',
    trainNumber: '20607',
    trainName: 'Vande Bharat Express (Chennai Central - Mysuru)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'MYS',
    destinationStationName: 'Mysuru Junction',
    zone: 'SR',
    division: 'Chennai',
    rakeType: 'VB-16 Trainset',
    locoNumber: 'Self-Propelled EMU (WAP-5 equiv)',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '05:50', scheduledDeparture: '05:50', actualDeparture: '05:50', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'KPD', stationName: 'Katpadi Junction', scheduledArrival: '07:13', scheduledDeparture: '07:15', actualArrival: '07:13', actualDeparture: '07:15', platform: '1', distanceKm: 130, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '10:15', scheduledDeparture: '10:20', actualArrival: '10:18', actualDeparture: '10:23', platform: '7', distanceKm: 358, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'MYS', stationName: 'Mysuru Junction', scheduledArrival: '12:20', scheduledDeparture: '12:20', estimatedArrival: '12:25', platform: '1', distanceKm: 497, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_20643',
    trainNumber: '20643',
    trainName: 'Vande Bharat Express (Chennai Central - Coimbatore)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'CBE',
    destinationStationName: 'Coimbatore Junction',
    zone: 'SR',
    division: 'Salem',
    rakeType: 'VB-8 Trainset',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 8,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '14:15', scheduledDeparture: '14:15', actualDeparture: '14:15', platform: '2', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SA', stationName: 'Salem Junction', scheduledArrival: '17:48', scheduledDeparture: '17:50', actualArrival: '17:48', actualDeparture: '17:50', platform: '1', distanceKm: 334, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'ED', stationName: 'Erode Junction', scheduledArrival: '18:32', scheduledDeparture: '18:35', actualArrival: '18:32', actualDeparture: '18:35', platform: '2', distanceKm: 394, haltMinutes: 3, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'CBE', stationName: 'Coimbatore Junction', scheduledArrival: '20:15', scheduledDeparture: '20:15', estimatedArrival: '20:15', platform: '1', distanceKm: 495, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_20665',
    trainNumber: '20665',
    trainName: 'Vande Bharat Express (Chennai Egmore - Tirunelveli)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'MS',
    originStationName: 'Chennai Egmore',
    destinationStationCode: 'TEN',
    destinationStationName: 'Tirunelveli Junction',
    zone: 'SR',
    division: 'Madurai',
    rakeType: 'VB-8 Trainset',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 8,
    schedule: [
      { stationCode: 'MS', stationName: 'Chennai Egmore', scheduledArrival: '14:50', scheduledDeparture: '14:50', actualDeparture: '14:50', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'VM', stationName: 'Villupuram Junction', scheduledArrival: '16:38', scheduledDeparture: '16:40', actualArrival: '16:38', actualDeparture: '16:40', platform: '3', distanceKm: 159, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TPJ', stationName: 'Tiruchirappalli Junction', scheduledArrival: '18:40', scheduledDeparture: '18:45', actualArrival: '18:40', actualDeparture: '18:45', platform: '1', distanceKm: 337, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'DG', stationName: 'Dindigul Junction', scheduledArrival: '19:46', scheduledDeparture: '19:48', estimatedArrival: '19:46', estimatedDeparture: '19:48', platform: '2', distanceKm: 431, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'MDU', stationName: 'Madurai Junction', scheduledArrival: '20:40', scheduledDeparture: '20:45', estimatedArrival: '20:40', estimatedDeparture: '20:45', platform: '1', distanceKm: 493, haltMinutes: 5, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'TEN', stationName: 'Tirunelveli Junction', scheduledArrival: '22:40', scheduledDeparture: '22:40', estimatedArrival: '22:40', platform: '1', distanceKm: 650, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_20631',
    trainNumber: '20631',
    trainName: 'Vande Bharat Express (Kasaragod - Thiruvananthapuram via Alappuzha)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'KGQ',
    originStationName: 'Kasaragod',
    destinationStationCode: 'TVC',
    destinationStationName: 'Thiruvananthapuram Central',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    rakeType: 'VB-8 Trainset',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 8,
    schedule: [
      { stationCode: 'KGQ', stationName: 'Kasaragod', scheduledArrival: '07:00', scheduledDeparture: '07:00', actualDeparture: '07:00', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CAN', stationName: 'Kannur', scheduledArrival: '07:55', scheduledDeparture: '07:57', actualArrival: '07:55', actualDeparture: '07:57', platform: '1', distanceKm: 86, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CLT', stationName: 'Kozhikode', scheduledArrival: '08:57', scheduledDeparture: '08:59', actualArrival: '08:57', actualDeparture: '08:59', platform: '1', distanceKm: 175, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SRR', stationName: 'Shoranur Junction', scheduledArrival: '09:58', scheduledDeparture: '10:00', actualArrival: '09:58', actualDeparture: '10:00', platform: '3', distanceKm: 261, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'TCR', stationName: 'Thrissur', scheduledArrival: '10:38', scheduledDeparture: '10:40', estimatedArrival: '10:38', estimatedDeparture: '10:40', platform: '1', distanceKm: 294, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'ERS', stationName: 'Ernakulam Junction', scheduledArrival: '11:45', scheduledDeparture: '11:48', estimatedArrival: '11:45', estimatedDeparture: '11:48', platform: '1', distanceKm: 368, haltMinutes: 3, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'ALLP', stationName: 'Alappuzha', scheduledArrival: '12:38', scheduledDeparture: '12:40', estimatedArrival: '12:38', estimatedDeparture: '12:40', platform: '1', distanceKm: 425, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'QLN', stationName: 'Kollam Junction', scheduledArrival: '13:50', scheduledDeparture: '13:52', estimatedArrival: '13:50', estimatedDeparture: '13:52', platform: '1', distanceKm: 510, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'TVC', stationName: 'Thiruvananthapuram Central', scheduledArrival: '15:05', scheduledDeparture: '15:05', estimatedArrival: '15:05', platform: '1', distanceKm: 574, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_20641',
    trainNumber: '20641',
    trainName: 'Vande Bharat Express (KSR Bengaluru - Dharwad)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'SBC',
    originStationName: 'KSR Bengaluru City',
    destinationStationCode: 'UBL',
    destinationStationName: 'SSS Hubballi Junction',
    zone: 'SWR',
    division: 'Hubballi',
    rakeType: 'VB-8 Trainset',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 8,
    schedule: [
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '05:45', scheduledDeparture: '05:45', actualDeparture: '05:45', platform: '8', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'YPR', stationName: 'Yesvantpur Junction', scheduledArrival: '05:55', scheduledDeparture: '05:57', actualArrival: '05:55', actualDeparture: '05:57', platform: '1', distanceKm: 6, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'DVG', stationName: 'Davangere', scheduledArrival: '09:15', scheduledDeparture: '09:17', actualArrival: '09:15', actualDeparture: '09:17', platform: '1', distanceKm: 326, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'UBL', stationName: 'SSS Hubballi Junction', scheduledArrival: '11:30', scheduledDeparture: '11:30', estimatedArrival: '11:30', platform: '1', distanceKm: 469, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_20661',
    trainNumber: '20661',
    trainName: 'Vande Bharat Express (KSR Bengaluru - Kacheguda Hyderabad)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'SBC',
    originStationName: 'KSR Bengaluru City',
    destinationStationCode: 'KCG',
    destinationStationName: 'Kacheguda (Hyderabad)',
    zone: 'SWR',
    division: 'Bengaluru',
    rakeType: 'VB-8 Trainset',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 8,
    schedule: [
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '05:45', scheduledDeparture: '05:45', actualDeparture: '05:45', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'ATP', stationName: 'Anantapur', scheduledArrival: '08:48', scheduledDeparture: '08:50', actualArrival: '08:48', actualDeparture: '08:50', platform: '1', distanceKm: 215, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'GTL', stationName: 'Guntakal Junction', scheduledArrival: '09:40', scheduledDeparture: '09:45', estimatedArrival: '09:40', estimatedDeparture: '09:45', platform: '1', distanceKm: 283, haltMinutes: 5, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'KCG', stationName: 'Kacheguda (Hyderabad)', scheduledArrival: '14:15', scheduledDeparture: '14:15', estimatedArrival: '14:15', platform: '3', distanceKm: 618, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_20701',
    trainNumber: '20701',
    trainName: 'Vande Bharat Express (Secunderabad - Tirupati)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'SC',
    originStationName: 'Secunderabad Junction',
    destinationStationCode: 'TPTY',
    destinationStationName: 'Tirupati (Tirumala)',
    zone: 'SCR',
    division: 'Secunderabad',
    rakeType: 'VB-8 Trainset',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 8,
    schedule: [
      { stationCode: 'SC', stationName: 'Secunderabad Junction', scheduledArrival: '06:15', scheduledDeparture: '06:15', actualDeparture: '06:15', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'GNT', stationName: 'Guntur Junction', scheduledArrival: '09:30', scheduledDeparture: '09:35', actualArrival: '09:30', actualDeparture: '09:35', platform: '1', distanceKm: 281, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'NLR', stationName: 'Nellore', scheduledArrival: '12:00', scheduledDeparture: '12:02', estimatedArrival: '12:00', estimatedDeparture: '12:02', platform: '1', distanceKm: 489, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'TPTY', stationName: 'Tirupati (Tirumala)', scheduledArrival: '14:30', scheduledDeparture: '14:30', estimatedArrival: '14:30', platform: '1', distanceKm: 661, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_20833',
    trainNumber: '20833',
    trainName: 'Vande Bharat Express (Visakhapatnam - Secunderabad)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'VSKP',
    originStationName: 'Visakhapatnam Junction',
    destinationStationCode: 'SC',
    destinationStationName: 'Secunderabad Junction',
    zone: 'ECoR',
    division: 'Waltair',
    rakeType: 'VB-16 Trainset',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'VSKP', stationName: 'Visakhapatnam Junction', scheduledArrival: '05:45', scheduledDeparture: '05:45', actualDeparture: '05:45', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'RJY', stationName: 'Rajahmundry', scheduledArrival: '07:55', scheduledDeparture: '07:57', actualArrival: '07:55', actualDeparture: '07:57', platform: '1', distanceKm: 201, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '09:50', scheduledDeparture: '09:55', actualArrival: '09:52', actualDeparture: '09:57', platform: '1', distanceKm: 350, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'KZJ', stationName: 'Kazipet Junction', scheduledArrival: '12:00', scheduledDeparture: '12:02', estimatedArrival: '12:00', estimatedDeparture: '12:02', platform: '1', distanceKm: 567, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'SC', stationName: 'Secunderabad Junction', scheduledArrival: '14:15', scheduledDeparture: '14:15', estimatedArrival: '14:15', platform: '10', distanceKm: 699, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_20677',
    trainNumber: '20677',
    trainName: 'Vande Bharat Express (Chennai Central - Vijayawada)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'BZA',
    destinationStationName: 'Vijayawada Junction',
    zone: 'SR',
    division: 'Chennai',
    rakeType: 'VB-8 Trainset',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 8,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '05:30', scheduledDeparture: '05:30', actualDeparture: '05:30', platform: '2', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'NLR', stationName: 'Nellore', scheduledArrival: '07:43', scheduledDeparture: '07:45', actualArrival: '07:43', actualDeparture: '07:45', platform: '1', distanceKm: 176, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '12:10', scheduledDeparture: '12:10', estimatedArrival: '12:15', platform: '1', distanceKm: 517, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_22436',
    trainNumber: '22436',
    trainName: 'Vande Bharat Express (New Delhi - Varanasi)',
    trainType: 'VANDE_BHARAT',
    originStationCode: 'NDLS',
    originStationName: 'New Delhi',
    destinationStationCode: 'BSB',
    destinationStationName: 'Varanasi Junction',
    zone: 'NR',
    division: 'Delhi',
    rakeType: 'VB-16 Trainset',
    locoNumber: 'Self-Propelled EMU',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '06:00', scheduledDeparture: '06:00', actualDeparture: '06:00', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CNB', stationName: 'Kanpur Central', scheduledArrival: '10:08', scheduledDeparture: '10:10', actualArrival: '10:09', actualDeparture: '10:12', platform: '5', distanceKm: 440, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'PRYJ', stationName: 'Prayagraj Junction', scheduledArrival: '12:08', scheduledDeparture: '12:10', estimatedArrival: '12:12', estimatedDeparture: '12:14', platform: '6', distanceKm: 635, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'BSB', stationName: 'Varanasi Junction', scheduledArrival: '14:00', scheduledDeparture: '14:00', estimatedArrival: '14:03', platform: '1', distanceKm: 759, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },

  // =============================================================
  // 2. TAMIL NADU & PUDUCHERRY PREMIER EXPRESSES
  // =============================================================
  {
    id: 'tr_12635',
    trainNumber: '12635',
    trainName: 'Vaigai Superfast Express (Chennai Egmore - Madurai)',
    trainType: 'SUPERFAST',
    originStationCode: 'MS',
    originStationName: 'Chennai Egmore',
    destinationStationCode: 'MDU',
    destinationStationName: 'Madurai Junction',
    zone: 'SR',
    division: 'Madurai',
    rakeType: 'LHB Superfast 22 Coaches',
    locoNumber: 'WAP-7 (Royapuram 30255)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MS', stationName: 'Chennai Egmore', scheduledArrival: '13:50', scheduledDeparture: '13:50', actualDeparture: '13:50', platform: '4', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TBM', stationName: 'Tambaram', scheduledArrival: '14:18', scheduledDeparture: '14:20', actualArrival: '14:18', actualDeparture: '14:20', platform: '7', distanceKm: 25, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'VM', stationName: 'Villupuram Junction', scheduledArrival: '16:00', scheduledDeparture: '16:05', actualArrival: '16:00', actualDeparture: '16:05', platform: '3', distanceKm: 159, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TPJ', stationName: 'Tiruchirappalli Junction', scheduledArrival: '18:50', scheduledDeparture: '18:55', actualArrival: '18:50', actualDeparture: '18:55', platform: '1', distanceKm: 337, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'DG', stationName: 'Dindigul Junction', scheduledArrival: '19:58', scheduledDeparture: '20:00', estimatedArrival: '19:58', estimatedDeparture: '20:00', platform: '2', distanceKm: 431, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'MDU', stationName: 'Madurai Junction', scheduledArrival: '21:15', scheduledDeparture: '21:15', estimatedArrival: '21:15', platform: '1', distanceKm: 493, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12637',
    trainNumber: '12637',
    trainName: 'Pandian Superfast Express (Chennai Egmore - Madurai)',
    trainType: 'SUPERFAST',
    originStationCode: 'MS',
    originStationName: 'Chennai Egmore',
    destinationStationCode: 'MDU',
    destinationStationName: 'Madurai Junction',
    zone: 'SR',
    division: 'Madurai',
    rakeType: 'LHB 24 Coaches',
    locoNumber: 'WAP-7 (Arakkonam 30310)',
    totalCoaches: 24,
    schedule: [
      { stationCode: 'MS', stationName: 'Chennai Egmore', scheduledArrival: '21:40', scheduledDeparture: '21:40', actualDeparture: '21:40', platform: '4', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TBM', stationName: 'Tambaram', scheduledArrival: '22:08', scheduledDeparture: '22:10', actualArrival: '22:08', actualDeparture: '22:10', platform: '7', distanceKm: 25, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'VM', stationName: 'Villupuram Junction', scheduledArrival: '23:55', scheduledDeparture: '00:00', actualArrival: '23:55', actualDeparture: '00:00', platform: '3', distanceKm: 159, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TPJ', stationName: 'Tiruchirappalli Junction', scheduledArrival: '02:30', scheduledDeparture: '02:35', actualArrival: '02:30', actualDeparture: '02:35', platform: '1', distanceKm: 337, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'MDU', stationName: 'Madurai Junction', scheduledArrival: '05:30', scheduledDeparture: '05:30', estimatedArrival: '05:30', platform: '1', distanceKm: 493, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12673',
    trainNumber: '12673',
    trainName: 'Cheran Superfast Express (Chennai Central - Coimbatore)',
    trainType: 'SUPERFAST',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'CBE',
    destinationStationName: 'Coimbatore Junction',
    zone: 'SR',
    division: 'Salem',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Erode 30280)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '22:00', scheduledDeparture: '22:00', actualDeparture: '22:00', platform: '10', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'KPD', stationName: 'Katpadi Junction', scheduledArrival: '23:38', scheduledDeparture: '23:40', actualArrival: '23:38', actualDeparture: '23:40', platform: '1', distanceKm: 130, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SA', stationName: 'Salem Junction', scheduledArrival: '02:32', scheduledDeparture: '02:35', actualArrival: '02:32', actualDeparture: '02:35', platform: '1', distanceKm: 334, haltMinutes: 3, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'ED', stationName: 'Erode Junction', scheduledArrival: '03:30', scheduledDeparture: '03:35', estimatedArrival: '03:30', estimatedDeparture: '03:35', platform: '2', distanceKm: 394, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'CBE', stationName: 'Coimbatore Junction', scheduledArrival: '06:00', scheduledDeparture: '06:00', estimatedArrival: '06:00', platform: '1', distanceKm: 495, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12653',
    trainNumber: '12653',
    trainName: 'Rockfort Superfast Express (Chennai Egmore - Tiruchirappalli)',
    trainType: 'SUPERFAST',
    originStationCode: 'MS',
    originStationName: 'Chennai Egmore',
    destinationStationCode: 'TPJ',
    destinationStationName: 'Tiruchirappalli Junction',
    zone: 'SR',
    division: 'Tiruchirappalli',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Royapuram 30240)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MS', stationName: 'Chennai Egmore', scheduledArrival: '23:35', scheduledDeparture: '23:35', actualDeparture: '23:35', platform: '4', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TBM', stationName: 'Tambaram', scheduledArrival: '00:03', scheduledDeparture: '00:05', actualArrival: '00:03', actualDeparture: '00:05', platform: '8', distanceKm: 25, haltMinutes: 2, status: 'PASSED', dayCount: 2 },
      { stationCode: 'VM', stationName: 'Villupuram Junction', scheduledArrival: '01:55', scheduledDeparture: '02:00', actualArrival: '01:55', actualDeparture: '02:00', platform: '3', distanceKm: 159, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'TPJ', stationName: 'Tiruchirappalli Junction', scheduledArrival: '04:55', scheduledDeparture: '04:55', estimatedArrival: '04:55', platform: '1', distanceKm: 337, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12631',
    trainNumber: '12631',
    trainName: 'Nellai Superfast Express (Chennai Egmore - Tirunelveli)',
    trainType: 'SUPERFAST',
    originStationCode: 'MS',
    originStationName: 'Chennai Egmore',
    destinationStationCode: 'TEN',
    destinationStationName: 'Tirunelveli Junction',
    zone: 'SR',
    division: 'Madurai',
    rakeType: 'LHB 23 Coaches',
    locoNumber: 'WAP-7 (Erode 30335)',
    totalCoaches: 23,
    schedule: [
      { stationCode: 'MS', stationName: 'Chennai Egmore', scheduledArrival: '20:10', scheduledDeparture: '20:10', actualDeparture: '20:10', platform: '5', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'VM', stationName: 'Villupuram Junction', scheduledArrival: '22:30', scheduledDeparture: '22:35', actualArrival: '22:30', actualDeparture: '22:35', platform: '3', distanceKm: 159, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TPJ', stationName: 'Tiruchirappalli Junction', scheduledArrival: '01:10', scheduledDeparture: '01:15', actualArrival: '01:10', actualDeparture: '01:15', platform: '1', distanceKm: 337, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'MDU', stationName: 'Madurai Junction', scheduledArrival: '03:40', scheduledDeparture: '03:45', estimatedArrival: '03:40', estimatedDeparture: '03:45', platform: '1', distanceKm: 493, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'TEN', stationName: 'Tirunelveli Junction', scheduledArrival: '06:30', scheduledDeparture: '06:30', estimatedArrival: '06:30', platform: '1', distanceKm: 650, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12633',
    trainNumber: '12633',
    trainName: 'Kanyakumari Superfast Express (Chennai Egmore - Kanniyakumari)',
    trainType: 'SUPERFAST',
    originStationCode: 'MS',
    originStationName: 'Chennai Egmore',
    destinationStationCode: 'CAPE',
    destinationStationName: 'Kanniyakumari (Cape Comorin)',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Royapuram 30290)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MS', stationName: 'Chennai Egmore', scheduledArrival: '17:20', scheduledDeparture: '17:20', actualDeparture: '17:20', platform: '5', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TPJ', stationName: 'Tiruchirappalli Junction', scheduledArrival: '22:15', scheduledDeparture: '22:20', actualArrival: '22:15', actualDeparture: '22:20', platform: '1', distanceKm: 337, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'MDU', stationName: 'Madurai Junction', scheduledArrival: '00:30', scheduledDeparture: '00:35', actualArrival: '00:30', actualDeparture: '00:35', platform: '1', distanceKm: 493, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'TEN', stationName: 'Tirunelveli Junction', scheduledArrival: '03:15', scheduledDeparture: '03:20', estimatedArrival: '03:15', estimatedDeparture: '03:20', platform: '1', distanceKm: 650, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'NCJ', stationName: 'Nagercoil Junction', scheduledArrival: '04:50', scheduledDeparture: '04:55', estimatedArrival: '04:50', estimatedDeparture: '04:55', platform: '1', distanceKm: 724, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'CAPE', stationName: 'Kanniyakumari', scheduledArrival: '05:30', scheduledDeparture: '05:30', estimatedArrival: '05:30', platform: '1', distanceKm: 740, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_16101',
    trainNumber: '16101',
    trainName: 'Boat Mail / Rameswaram Express (Chennai Egmore - Rameswaram)',
    trainType: 'EXPRESS',
    originStationCode: 'MS',
    originStationName: 'Chennai Egmore',
    destinationStationCode: 'RMM',
    destinationStationName: 'Rameswaram (Pamban Island)',
    zone: 'SR',
    division: 'Madurai',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Royapuram 30218)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MS', stationName: 'Chennai Egmore', scheduledArrival: '19:15', scheduledDeparture: '19:15', actualDeparture: '19:15', platform: '7', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'VM', stationName: 'Villupuram Junction', scheduledArrival: '21:55', scheduledDeparture: '22:00', actualArrival: '21:55', actualDeparture: '22:00', platform: '3', distanceKm: 159, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TJ', stationName: 'Thanjavur Junction', scheduledArrival: '01:00', scheduledDeparture: '01:02', actualArrival: '01:00', actualDeparture: '01:02', platform: '1', distanceKm: 351, haltMinutes: 2, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'TPJ', stationName: 'Tiruchirappalli Junction', scheduledArrival: '02:00', scheduledDeparture: '02:05', estimatedArrival: '02:00', estimatedDeparture: '02:05', platform: '2', distanceKm: 401, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'RMM', stationName: 'Rameswaram', scheduledArrival: '07:10', scheduledDeparture: '07:10', estimatedArrival: '07:10', platform: '1', distanceKm: 602, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_16115',
    trainNumber: '16115',
    trainName: 'Chennai Egmore - Puducherry Express',
    trainType: 'EXPRESS',
    originStationCode: 'MS',
    originStationName: 'Chennai Egmore',
    destinationStationCode: 'PDY',
    destinationStationName: 'Puducherry (Pondicherry)',
    zone: 'SR',
    division: 'Tiruchirappalli',
    rakeType: 'ICF Conventional 16 Coaches',
    locoNumber: 'WAP-4 (Arakkonam 22800)',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'MS', stationName: 'Chennai Egmore', scheduledArrival: '18:10', scheduledDeparture: '18:10', actualDeparture: '18:10', platform: '2', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TBM', stationName: 'Tambaram', scheduledArrival: '18:38', scheduledDeparture: '18:40', actualArrival: '18:38', actualDeparture: '18:40', platform: '8', distanceKm: 25, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'VM', stationName: 'Villupuram Junction', scheduledArrival: '20:50', scheduledDeparture: '20:55', actualArrival: '20:50', actualDeparture: '20:55', platform: '3', distanceKm: 159, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'PDY', stationName: 'Puducherry', scheduledArrival: '22:15', scheduledDeparture: '22:15', estimatedArrival: '22:15', platform: '1', distanceKm: 196, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12675',
    trainNumber: '12675',
    trainName: 'Kovai Superfast Express (Chennai Central - Coimbatore)',
    trainType: 'SUPERFAST',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'CBE',
    destinationStationName: 'Coimbatore Junction',
    zone: 'SR',
    division: 'Salem',
    rakeType: 'LHB Intercity AC Chair Car',
    locoNumber: 'WAP-7 (Royapuram 30275)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '06:10', scheduledDeparture: '06:10', actualDeparture: '06:10', platform: '10', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'KPD', stationName: 'Katpadi Junction', scheduledArrival: '07:48', scheduledDeparture: '07:50', actualArrival: '07:48', actualDeparture: '07:50', platform: '1', distanceKm: 130, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SA', stationName: 'Salem Junction', scheduledArrival: '10:42', scheduledDeparture: '10:45', actualArrival: '10:42', actualDeparture: '10:45', platform: '1', distanceKm: 334, haltMinutes: 3, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'ED', stationName: 'Erode Junction', scheduledArrival: '11:40', scheduledDeparture: '11:45', estimatedArrival: '11:40', estimatedDeparture: '11:45', platform: '2', distanceKm: 394, haltMinutes: 5, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'CBE', stationName: 'Coimbatore Junction', scheduledArrival: '14:05', scheduledDeparture: '14:05', estimatedArrival: '14:05', platform: '1', distanceKm: 495, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12605',
    trainNumber: '12605',
    trainName: 'Pallavan Superfast Express (Chennai Egmore - Karaikkudi)',
    trainType: 'SUPERFAST',
    originStationCode: 'MS',
    originStationName: 'Chennai Egmore',
    destinationStationCode: 'TPJ',
    destinationStationName: 'Tiruchirappalli Junction',
    zone: 'SR',
    division: 'Tiruchirappalli',
    rakeType: 'LHB Superfast 22 Coaches',
    locoNumber: 'WAP-7 (Royapuram 30262)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MS', stationName: 'Chennai Egmore', scheduledArrival: '15:45', scheduledDeparture: '15:45', actualDeparture: '15:45', platform: '4', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TBM', stationName: 'Tambaram', scheduledArrival: '16:13', scheduledDeparture: '16:15', actualArrival: '16:13', actualDeparture: '16:15', platform: '8', distanceKm: 25, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'VM', stationName: 'Villupuram Junction', scheduledArrival: '18:00', scheduledDeparture: '18:05', actualArrival: '18:00', actualDeparture: '18:05', platform: '3', distanceKm: 159, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'TPJ', stationName: 'Tiruchirappalli Junction', scheduledArrival: '20:45', scheduledDeparture: '20:45', estimatedArrival: '20:45', platform: '1', distanceKm: 337, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },

  // =============================================================
  // 3. KERALA PREMIER SUPERFAST & JAN SHATABDI FLEET
  // =============================================================
  {
    id: 'tr_12623',
    trainNumber: '12623',
    trainName: 'Trivandrum Mail / Chennai Mail (Chennai Central - Thiruvananthapuram)',
    trainType: 'SUPERFAST',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'TVC',
    destinationStationName: 'Thiruvananthapuram Central',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    rakeType: 'LHB 24 Coaches',
    locoNumber: 'WAP-7 (Erode 30340)',
    totalCoaches: 24,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '19:45', scheduledDeparture: '19:45', actualDeparture: '19:45', platform: '9', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'KPD', stationName: 'Katpadi Junction', scheduledArrival: '21:28', scheduledDeparture: '21:30', actualArrival: '21:28', actualDeparture: '21:30', platform: '1', distanceKm: 130, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SA', stationName: 'Salem Junction', scheduledArrival: '00:12', scheduledDeparture: '00:15', actualArrival: '00:12', actualDeparture: '00:15', platform: '1', distanceKm: 334, haltMinutes: 3, status: 'PASSED', dayCount: 2 },
      { stationCode: 'ED', stationName: 'Erode Junction', scheduledArrival: '01:10', scheduledDeparture: '01:15', actualArrival: '01:10', actualDeparture: '01:15', platform: '2', distanceKm: 394, haltMinutes: 5, status: 'PASSED', dayCount: 2 },
      { stationCode: 'PGT', stationName: 'Palakkad Junction', scheduledArrival: '03:12', scheduledDeparture: '03:15', actualArrival: '03:12', actualDeparture: '03:15', platform: '1', distanceKm: 495, haltMinutes: 3, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'TCR', stationName: 'Thrissur', scheduledArrival: '04:15', scheduledDeparture: '04:18', estimatedArrival: '04:15', estimatedDeparture: '04:18', platform: '1', distanceKm: 570, haltMinutes: 3, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'ERN', stationName: 'Ernakulam Town', scheduledArrival: '05:40', scheduledDeparture: '05:45', estimatedArrival: '05:40', estimatedDeparture: '05:45', platform: '2', distanceKm: 641, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'KTYM', stationName: 'Kottayam', scheduledArrival: '06:50', scheduledDeparture: '06:53', estimatedArrival: '06:50', estimatedDeparture: '06:53', platform: '1', distanceKm: 701, haltMinutes: 3, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'QLN', stationName: 'Kollam Junction', scheduledArrival: '08:32', scheduledDeparture: '08:35', estimatedArrival: '08:32', estimatedDeparture: '08:35', platform: '1', distanceKm: 797, haltMinutes: 3, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'TVC', stationName: 'Thiruvananthapuram Central', scheduledArrival: '11:45', scheduledDeparture: '11:45', estimatedArrival: '11:45', platform: '1', distanceKm: 861, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12075',
    trainNumber: '12075',
    trainName: 'Kozhikode - Thiruvananthapuram Jan Shatabdi Express',
    trainType: 'SHATABDI',
    originStationCode: 'CLT',
    originStationName: 'Kozhikode (Calicut)',
    destinationStationCode: 'TVC',
    destinationStationName: 'Thiruvananthapuram Central',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    rakeType: 'LHB Jan Shatabdi Rake',
    locoNumber: 'WAP-7 (Royapuram 30233)',
    totalCoaches: 18,
    schedule: [
      { stationCode: 'CLT', stationName: 'Kozhikode', scheduledArrival: '13:45', scheduledDeparture: '13:45', actualDeparture: '13:45', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SRR', stationName: 'Shoranur Junction', scheduledArrival: '14:57', scheduledDeparture: '15:00', actualArrival: '14:57', actualDeparture: '15:00', platform: '4', distanceKm: 86, haltMinutes: 3, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TCR', stationName: 'Thrissur', scheduledArrival: '15:38', scheduledDeparture: '15:40', actualArrival: '15:38', actualDeparture: '15:40', platform: '1', distanceKm: 119, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'ERS', stationName: 'Ernakulam Junction', scheduledArrival: '16:55', scheduledDeparture: '17:00', estimatedArrival: '16:55', estimatedDeparture: '17:00', platform: '1', distanceKm: 193, haltMinutes: 5, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'ALLP', stationName: 'Alappuzha', scheduledArrival: '17:58', scheduledDeparture: '18:00', estimatedArrival: '17:58', estimatedDeparture: '18:00', platform: '1', distanceKm: 250, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'QLN', stationName: 'Kollam Junction', scheduledArrival: '19:30', scheduledDeparture: '19:32', estimatedArrival: '19:30', estimatedDeparture: '19:32', platform: '1', distanceKm: 335, haltMinutes: 2, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'TVC', stationName: 'Thiruvananthapuram Central', scheduledArrival: '21:25', scheduledDeparture: '21:25', estimatedArrival: '21:25', platform: '1', distanceKm: 399, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_16345',
    trainNumber: '16345',
    trainName: 'Netravati Express (Lokmanya Tilak Terminus - Thiruvananthapuram)',
    trainType: 'EXPRESS',
    originStationCode: 'MAQ',
    originStationName: 'Mangaluru Central',
    destinationStationCode: 'TVC',
    destinationStationName: 'Thiruvananthapuram Central',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Erode 30366)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MAQ', stationName: 'Mangaluru Central', scheduledArrival: '05:40', scheduledDeparture: '05:40', actualDeparture: '05:40', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CAN', stationName: 'Kannur', scheduledArrival: '07:12', scheduledDeparture: '07:15', actualArrival: '07:12', actualDeparture: '07:15', platform: '1', distanceKm: 132, haltMinutes: 3, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CLT', stationName: 'Kozhikode', scheduledArrival: '08:32', scheduledDeparture: '08:35', actualArrival: '08:32', actualDeparture: '08:35', platform: '1', distanceKm: 221, haltMinutes: 3, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'SRR', stationName: 'Shoranur Junction', scheduledArrival: '10:15', scheduledDeparture: '10:20', estimatedArrival: '10:15', estimatedDeparture: '10:20', platform: '3', distanceKm: 307, haltMinutes: 5, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'ERS', stationName: 'Ernakulam Junction', scheduledArrival: '12:30', scheduledDeparture: '12:35', estimatedArrival: '12:30', estimatedDeparture: '12:35', platform: '1', distanceKm: 414, haltMinutes: 5, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'TVC', stationName: 'Thiruvananthapuram Central', scheduledArrival: '18:05', scheduledDeparture: '18:05', estimatedArrival: '18:05', platform: '1', distanceKm: 620, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_16301',
    trainNumber: '16301',
    trainName: 'Venad Express (Shoranur Junction - Thiruvananthapuram Central)',
    trainType: 'EXPRESS',
    originStationCode: 'SRR',
    originStationName: 'Shoranur Junction',
    destinationStationCode: 'TVC',
    destinationStationName: 'Thiruvananthapuram Central',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    rakeType: 'LHB Commuter Express 22 Coaches',
    locoNumber: 'WAP-7 (Royapuram 30208)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'SRR', stationName: 'Shoranur Junction', scheduledArrival: '14:35', scheduledDeparture: '14:35', actualDeparture: '14:35', platform: '2', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'TCR', stationName: 'Thrissur', scheduledArrival: '15:11', scheduledDeparture: '15:13', actualArrival: '15:11', actualDeparture: '15:13', platform: '1', distanceKm: 33, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'ERN', stationName: 'Ernakulam Town', scheduledArrival: '16:43', scheduledDeparture: '16:45', actualArrival: '16:43', actualDeparture: '16:45', platform: '2', distanceKm: 104, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'KTYM', stationName: 'Kottayam', scheduledArrival: '18:05', scheduledDeparture: '18:08', estimatedArrival: '18:05', estimatedDeparture: '18:08', platform: '1', distanceKm: 164, haltMinutes: 3, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'QLN', stationName: 'Kollam Junction', scheduledArrival: '20:10', scheduledDeparture: '20:13', estimatedArrival: '20:10', estimatedDeparture: '20:13', platform: '1', distanceKm: 260, haltMinutes: 3, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'TVC', stationName: 'Thiruvananthapuram Central', scheduledArrival: '22:35', scheduledDeparture: '22:35', estimatedArrival: '22:35', platform: '1', distanceKm: 325, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_16649',
    trainNumber: '16649',
    trainName: 'Parasuram Express (Mangaluru Central - Nagercoil)',
    trainType: 'EXPRESS',
    originStationCode: 'MAQ',
    originStationName: 'Mangaluru Central',
    destinationStationCode: 'NCJ',
    destinationStationName: 'Nagercoil Junction',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Erode 30372)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MAQ', stationName: 'Mangaluru Central', scheduledArrival: '05:05', scheduledDeparture: '05:05', actualDeparture: '05:05', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CAN', stationName: 'Kannur', scheduledArrival: '07:07', scheduledDeparture: '07:10', actualArrival: '07:07', actualDeparture: '07:10', platform: '1', distanceKm: 132, haltMinutes: 3, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CLT', stationName: 'Kozhikode', scheduledArrival: '08:37', scheduledDeparture: '08:40', actualArrival: '08:37', actualDeparture: '08:40', platform: '1', distanceKm: 221, haltMinutes: 3, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SRR', stationName: 'Shoranur Junction', scheduledArrival: '11:10', scheduledDeparture: '11:15', actualArrival: '11:10', actualDeparture: '11:15', platform: '3', distanceKm: 307, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'ERS', stationName: 'Ernakulam Junction', scheduledArrival: '13:55', scheduledDeparture: '14:00', estimatedArrival: '13:55', estimatedDeparture: '14:00', platform: '1', distanceKm: 414, haltMinutes: 5, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'TVC', stationName: 'Thiruvananthapuram Central', scheduledArrival: '18:40', scheduledDeparture: '18:45', estimatedArrival: '18:40', estimatedDeparture: '18:45', platform: '1', distanceKm: 620, haltMinutes: 5, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'NCJ', stationName: 'Nagercoil Junction', scheduledArrival: '20:55', scheduledDeparture: '20:55', estimatedArrival: '20:55', platform: '1', distanceKm: 686, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },

  // =============================================================
  // 4. KARNATAKA PREMIER SUPERFAST & SHATABDI FLEET
  // =============================================================
  {
    id: 'tr_12607',
    trainNumber: '12607',
    trainName: 'Lalbagh Superfast Express (Chennai Central - KSR Bengaluru)',
    trainType: 'SUPERFAST',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'SBC',
    destinationStationName: 'KSR Bengaluru City',
    zone: 'SWR',
    division: 'Bengaluru',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Royapuram 30250)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '15:30', scheduledDeparture: '15:30', actualDeparture: '15:30', platform: '8', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'KPD', stationName: 'Katpadi Junction', scheduledArrival: '17:18', scheduledDeparture: '17:20', actualArrival: '17:18', actualDeparture: '17:20', platform: '1', distanceKm: 130, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '21:35', scheduledDeparture: '21:35', estimatedArrival: '21:35', platform: '3', distanceKm: 358, haltMinutes: 0, status: 'CURRENT', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12639',
    trainNumber: '12639',
    trainName: 'Brindavan Superfast Express (Chennai Central - KSR Bengaluru)',
    trainType: 'SUPERFAST',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'SBC',
    destinationStationName: 'KSR Bengaluru City',
    zone: 'SR',
    division: 'Chennai',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Arakkonam 30311)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '07:40', scheduledDeparture: '07:40', actualDeparture: '07:40', platform: '8', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'KPD', stationName: 'Katpadi Junction', scheduledArrival: '09:28', scheduledDeparture: '09:30', actualArrival: '09:28', actualDeparture: '09:30', platform: '1', distanceKm: 130, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '13:40', scheduledDeparture: '13:40', estimatedArrival: '13:40', platform: '2', distanceKm: 358, haltMinutes: 0, status: 'CURRENT', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12027',
    trainNumber: '12027',
    trainName: 'Chennai Central - KSR Bengaluru Shatabdi Express',
    trainType: 'SHATABDI',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'SBC',
    destinationStationName: 'KSR Bengaluru City',
    zone: 'SR',
    division: 'Chennai',
    rakeType: 'LHB Shatabdi Executive Rake',
    locoNumber: 'WAP-7 (Royapuram 30260)',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '17:30', scheduledDeparture: '17:30', actualDeparture: '17:30', platform: '2', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'KPD', stationName: 'Katpadi Junction', scheduledArrival: '19:03', scheduledDeparture: '19:05', actualArrival: '19:03', actualDeparture: '19:05', platform: '1', distanceKm: 130, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '22:25', scheduledDeparture: '22:25', estimatedArrival: '22:25', platform: '7', distanceKm: 358, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12627',
    trainNumber: '12627',
    trainName: 'Karnataka Superfast Express (KSR Bengaluru - New Delhi)',
    trainType: 'SUPERFAST',
    originStationCode: 'SBC',
    originStationName: 'KSR Bengaluru City',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'SWR',
    division: 'Bengaluru',
    rakeType: 'LHB 24 Coaches',
    locoNumber: 'WAP-7 (Krishnarajapuram 30340)',
    totalCoaches: 24,
    schedule: [
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '19:20', scheduledDeparture: '19:20', actualDeparture: '19:20', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'GTL', stationName: 'Guntakal Junction', scheduledArrival: '01:05', scheduledDeparture: '01:10', actualArrival: '01:05', actualDeparture: '01:10', platform: '1', distanceKm: 312, haltMinutes: 5, status: 'PASSED', dayCount: 2 },
      { stationCode: 'KLBG', stationName: 'Kalaburagi Junction', scheduledArrival: '05:00', scheduledDeparture: '05:05', actualArrival: '05:00', actualDeparture: '05:05', platform: '1', distanceKm: 560, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'BPL', stationName: 'Bhopal Junction', scheduledArrival: '21:30', scheduledDeparture: '21:35', estimatedArrival: '21:30', estimatedDeparture: '21:35', platform: '1', distanceKm: 1690, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '09:00', scheduledDeparture: '09:00', estimatedArrival: '09:00', platform: '3', distanceKm: 2400, haltMinutes: 0, status: 'UPCOMING', dayCount: 3 }
    ]
  },
  {
    id: 'tr_16589',
    trainNumber: '16589',
    trainName: 'Rani Chennamma Express (KSR Bengaluru - Belagavi)',
    trainType: 'EXPRESS',
    originStationCode: 'SBC',
    originStationName: 'KSR Bengaluru City',
    destinationStationCode: 'BGM',
    destinationStationName: 'Belagavi (Belgaum)',
    zone: 'SWR',
    division: 'Hubballi',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Krishnarajapuram 30219)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '23:00', scheduledDeparture: '23:00', actualDeparture: '23:00', platform: '8', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'DVG', stationName: 'Davangere', scheduledArrival: '03:40', scheduledDeparture: '03:42', actualArrival: '03:40', actualDeparture: '03:42', platform: '1', distanceKm: 326, haltMinutes: 2, status: 'PASSED', dayCount: 2 },
      { stationCode: 'UBL', stationName: 'SSS Hubballi Junction', scheduledArrival: '05:50', scheduledDeparture: '06:00', actualArrival: '05:50', actualDeparture: '06:00', platform: '1', distanceKm: 469, haltMinutes: 10, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'BGM', stationName: 'Belagavi', scheduledArrival: '08:40', scheduledDeparture: '08:40', estimatedArrival: '08:40', platform: '1', distanceKm: 611, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_16595',
    trainNumber: '16595',
    trainName: 'Panchaganga Superfast Express (KSR Bengaluru - Karwar via Mangaluru)',
    trainType: 'SUPERFAST',
    originStationCode: 'SBC',
    originStationName: 'KSR Bengaluru City',
    destinationStationCode: 'MAQ',
    destinationStationName: 'Mangaluru Central',
    zone: 'SWR',
    division: 'Mysuru',
    rakeType: 'LHB 18 Coaches',
    locoNumber: 'WAP-7 (Krishnarajapuram 30288)',
    totalCoaches: 18,
    schedule: [
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '18:50', scheduledDeparture: '18:50', actualDeparture: '18:50', platform: '5', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'HAS', stationName: 'Hassan Junction', scheduledArrival: '21:35', scheduledDeparture: '21:38', actualArrival: '21:35', actualDeparture: '21:38', platform: '1', distanceKm: 180, haltMinutes: 3, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'MAQ', stationName: 'Mangaluru Central', scheduledArrival: '03:35', scheduledDeparture: '03:40', estimatedArrival: '03:35', estimatedDeparture: '03:40', platform: '1', distanceKm: 350, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 }
    ]
  },

  // =============================================================
  // 5. ANDHRA PRADESH & TELANGANA PREMIER FLEET
  // =============================================================
  {
    id: 'tr_12759',
    trainNumber: '12759',
    trainName: 'Charminar Superfast Express (Chennai Central - Hyderabad)',
    trainType: 'SUPERFAST',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'HYB',
    destinationStationName: 'Hyderabad Deccan (Nampally)',
    zone: 'SCR',
    division: 'Secunderabad',
    rakeType: 'LHB 24 Coaches',
    locoNumber: 'WAP-7 (Lallaguda 30325)',
    totalCoaches: 24,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '18:20', scheduledDeparture: '18:20', actualDeparture: '18:20', platform: '9', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'NLR', stationName: 'Nellore', scheduledArrival: '20:53', scheduledDeparture: '20:55', actualArrival: '20:53', actualDeparture: '20:55', platform: '1', distanceKm: 176, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '01:00', scheduledDeparture: '01:10', actualArrival: '01:00', actualDeparture: '01:10', platform: '7', distanceKm: 431, haltMinutes: 10, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'KZJ', stationName: 'Kazipet Junction', scheduledArrival: '04:20', scheduledDeparture: '04:22', estimatedArrival: '04:20', estimatedDeparture: '04:22', platform: '1', distanceKm: 648, haltMinutes: 2, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'SC', stationName: 'Secunderabad Junction', scheduledArrival: '07:05', scheduledDeparture: '07:10', estimatedArrival: '07:05', estimatedDeparture: '07:10', platform: '5', distanceKm: 780, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'HYB', stationName: 'Hyderabad Deccan', scheduledArrival: '08:00', scheduledDeparture: '08:00', estimatedArrival: '08:00', platform: '5', distanceKm: 789, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12727',
    trainNumber: '12727',
    trainName: 'Godavari Superfast Express (Visakhapatnam - Hyderabad)',
    trainType: 'SUPERFAST',
    originStationCode: 'VSKP',
    originStationName: 'Visakhapatnam Junction',
    destinationStationCode: 'HYB',
    destinationStationName: 'Hyderabad Deccan (Nampally)',
    zone: 'SCR',
    division: 'Secunderabad',
    rakeType: 'LHB 24 Coaches',
    locoNumber: 'WAP-7 (Lallaguda 30388)',
    totalCoaches: 24,
    schedule: [
      { stationCode: 'VSKP', stationName: 'Visakhapatnam Junction', scheduledArrival: '17:20', scheduledDeparture: '17:20', actualDeparture: '17:20', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'RJY', stationName: 'Rajahmundry', scheduledArrival: '20:13', scheduledDeparture: '20:15', actualArrival: '20:13', actualDeparture: '20:15', platform: '1', distanceKm: 201, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '23:30', scheduledDeparture: '23:45', actualArrival: '23:30', actualDeparture: '23:45', platform: '1', distanceKm: 350, haltMinutes: 15, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'KZJ', stationName: 'Kazipet Junction', scheduledArrival: '02:48', scheduledDeparture: '02:50', estimatedArrival: '02:48', estimatedDeparture: '02:50', platform: '1', distanceKm: 567, haltMinutes: 2, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'SC', stationName: 'Secunderabad Junction', scheduledArrival: '05:10', scheduledDeparture: '05:15', estimatedArrival: '05:10', estimatedDeparture: '05:15', platform: '6', distanceKm: 699, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'HYB', stationName: 'Hyderabad Deccan', scheduledArrival: '06:15', scheduledDeparture: '06:15', estimatedArrival: '06:15', platform: '6', distanceKm: 709, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12763',
    trainNumber: '12763',
    trainName: 'Padmavati Superfast Express (Tirupati - Secunderabad)',
    trainType: 'SUPERFAST',
    originStationCode: 'TPTY',
    originStationName: 'Tirupati (Tirumala)',
    destinationStationCode: 'SC',
    destinationStationName: 'Secunderabad Junction',
    zone: 'SCR',
    division: 'Secunderabad',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Lallaguda 30277)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'TPTY', stationName: 'Tirupati (Tirumala)', scheduledArrival: '16:55', scheduledDeparture: '16:55', actualDeparture: '16:55', platform: '2', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'RU', stationName: 'Renigunta Junction', scheduledArrival: '17:15', scheduledDeparture: '17:20', actualArrival: '17:15', actualDeparture: '17:20', platform: '1', distanceKm: 10, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'GTL', stationName: 'Guntakal Junction', scheduledArrival: '23:10', scheduledDeparture: '23:15', actualArrival: '23:10', actualDeparture: '23:15', platform: '1', distanceKm: 350, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'SC', stationName: 'Secunderabad Junction', scheduledArrival: '05:55', scheduledDeparture: '05:55', estimatedArrival: '05:55', platform: '1', distanceKm: 712, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12711',
    trainNumber: '12711',
    trainName: 'Pinakini Superfast Express (Vijayawada - Chennai Central)',
    trainType: 'SUPERFAST',
    originStationCode: 'BZA',
    originStationName: 'Vijayawada Junction',
    destinationStationCode: 'MAS',
    destinationStationName: 'MGR Chennai Central',
    zone: 'SCR',
    division: 'Vijayawada',
    rakeType: 'LHB Intercity 22 Coaches',
    locoNumber: 'WAP-7 (Vijayawada 30350)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '06:10', scheduledDeparture: '06:10', actualDeparture: '06:10', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'NLR', stationName: 'Nellore', scheduledArrival: '09:48', scheduledDeparture: '09:50', actualArrival: '09:48', actualDeparture: '09:50', platform: '1', distanceKm: 255, haltMinutes: 2, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '13:05', scheduledDeparture: '13:05', estimatedArrival: '13:05', platform: '6', distanceKm: 431, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },

  // =============================================================
  // 6. GRAND TRUNK & INTER-REGIONAL NATIONAL ARTERIES
  // =============================================================
  {
    id: 'tr_12615',
    trainNumber: '12615',
    trainName: 'Grand Trunk (GT) Superfast Express (Chennai Central - New Delhi)',
    trainType: 'SUPERFAST',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'SR',
    division: 'Chennai',
    rakeType: 'LHB 24 Coaches (Historic Grand Trunk)',
    locoNumber: 'WAP-7 (Royapuram 30288)',
    totalCoaches: 24,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '18:50', scheduledDeparture: '18:50', actualDeparture: '18:50', platform: '3', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'NLR', stationName: 'Nellore', scheduledArrival: '21:18', scheduledDeparture: '21:20', actualArrival: '21:18', actualDeparture: '21:20', platform: '1', distanceKm: 176, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '01:50', scheduledDeparture: '02:00', actualArrival: '01:50', actualDeparture: '02:00', platform: '1', distanceKm: 431, haltMinutes: 10, status: 'PASSED', dayCount: 2 },
      { stationCode: 'WL', stationName: 'Warangal', scheduledArrival: '05:00', scheduledDeparture: '05:05', actualArrival: '05:00', actualDeparture: '05:05', platform: '2', distanceKm: 638, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'NGP', stationName: 'Nagpur Junction', scheduledArrival: '11:50', scheduledDeparture: '11:55', estimatedArrival: '11:50', estimatedDeparture: '11:55', platform: '1', distanceKm: 1093, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'BPL', stationName: 'Bhopal Junction', scheduledArrival: '18:40', scheduledDeparture: '18:45', estimatedArrival: '18:40', estimatedDeparture: '18:45', platform: '1', distanceKm: 1483, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'AGC', stationName: 'Agra Cantt', scheduledArrival: '02:00', scheduledDeparture: '02:05', estimatedArrival: '02:00', estimatedDeparture: '02:05', platform: '1', distanceKm: 1988, haltMinutes: 5, status: 'UPCOMING', dayCount: 3 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '06:35', scheduledDeparture: '06:35', estimatedArrival: '06:35', platform: '5', distanceKm: 2182, haltMinutes: 0, status: 'UPCOMING', dayCount: 3 }
    ]
  },
  {
    id: 'tr_12621',
    trainNumber: '12621',
    trainName: 'Tamil Nadu Superfast Express (Chennai Central - New Delhi)',
    trainType: 'SUPERFAST',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'SR',
    division: 'Chennai',
    rakeType: 'LHB 24 Coaches',
    locoNumber: 'WAP-7 (Royapuram 30300)',
    totalCoaches: 24,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '22:00', scheduledDeparture: '22:00', actualDeparture: '22:00', platform: '5', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '03:55', scheduledDeparture: '04:05', actualArrival: '03:55', actualDeparture: '04:05', platform: '1', distanceKm: 431, haltMinutes: 10, status: 'PASSED', dayCount: 2 },
      { stationCode: 'NGP', stationName: 'Nagpur Junction', scheduledArrival: '13:50', scheduledDeparture: '13:55', actualArrival: '13:50', actualDeparture: '13:55', platform: '1', distanceKm: 1093, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'BPL', stationName: 'Bhopal Junction', scheduledArrival: '20:10', scheduledDeparture: '20:20', estimatedArrival: '20:10', estimatedDeparture: '20:20', platform: '1', distanceKm: 1483, haltMinutes: 10, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '06:30', scheduledDeparture: '06:30', estimatedArrival: '06:30', platform: '4', distanceKm: 2182, haltMinutes: 0, status: 'UPCOMING', dayCount: 3 }
    ]
  },
  {
    id: 'tr_12841',
    trainNumber: '12841',
    trainName: 'Coromandel Superfast Express (Howrah - MGR Chennai Central)',
    trainType: 'SUPERFAST',
    originStationCode: 'HWH',
    originStationName: 'Howrah Junction',
    destinationStationCode: 'MAS',
    destinationStationName: 'MGR Chennai Central',
    zone: 'SER',
    division: 'Howrah',
    rakeType: 'LHB 24 Coaches',
    locoNumber: 'WAP-7 (Santragachi 30200)',
    totalCoaches: 24,
    schedule: [
      { stationCode: 'HWH', stationName: 'Howrah Junction', scheduledArrival: '15:20', scheduledDeparture: '15:20', actualDeparture: '15:20', platform: '17', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BBS', stationName: 'Bhubaneswar', scheduledArrival: '21:40', scheduledDeparture: '21:45', actualArrival: '21:40', actualDeparture: '21:45', platform: '4', distanceKm: 437, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'VSKP', stationName: 'Visakhapatnam Junction', scheduledArrival: '04:25', scheduledDeparture: '04:45', actualArrival: '04:25', actualDeparture: '04:45', platform: '1', distanceKm: 880, haltMinutes: 20, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '09:55', scheduledDeparture: '10:05', estimatedArrival: '09:55', estimatedDeparture: '10:05', platform: '1', distanceKm: 1228, haltMinutes: 10, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '17:00', scheduledDeparture: '17:00', estimatedArrival: '17:00', platform: '4', distanceKm: 1659, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12295',
    trainNumber: '12295',
    trainName: 'Sanghamitra Superfast Express (SMVT Bengaluru - Danapur Patna)',
    trainType: 'SUPERFAST',
    originStationCode: 'SMVB',
    originStationName: 'SMVT Bengaluru',
    destinationStationCode: 'PNBE',
    destinationStationName: 'Patna Junction',
    zone: 'SWR',
    division: 'Bengaluru',
    rakeType: 'LHB 24 Coaches',
    locoNumber: 'WAP-7 (Krishnarajapuram 30315)',
    totalCoaches: 24,
    schedule: [
      { stationCode: 'SMVB', stationName: 'SMVT Bengaluru', scheduledArrival: '09:15', scheduledDeparture: '09:15', actualDeparture: '09:15', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '14:40', scheduledDeparture: '14:55', actualArrival: '14:40', actualDeparture: '14:55', platform: '1', distanceKm: 358, haltMinutes: 15, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '21:50', scheduledDeparture: '22:00', actualArrival: '21:50', actualDeparture: '22:00', platform: '1', distanceKm: 789, haltMinutes: 10, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'NGP', stationName: 'Nagpur Junction', scheduledArrival: '08:30', scheduledDeparture: '08:35', estimatedArrival: '08:30', estimatedDeparture: '08:35', platform: '1', distanceKm: 1450, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'PNBE', stationName: 'Patna Junction', scheduledArrival: '07:40', scheduledDeparture: '07:40', estimatedArrival: '07:40', platform: '1', distanceKm: 2690, haltMinutes: 0, status: 'UPCOMING', dayCount: 3 }
    ]
  },
  {
    id: 'tr_12626',
    trainNumber: '12626',
    trainName: 'Kerala Express (New Delhi - Trivandrum Central)',
    trainType: 'SUPERFAST',
    originStationCode: 'NDLS',
    originStationName: 'New Delhi',
    destinationStationCode: 'TVC',
    destinationStationName: 'Thiruvananthapuram Central',
    zone: 'SR',
    division: 'Thiruvananthapuram',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Erode 30388)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '20:10', scheduledDeparture: '20:10', actualDeparture: '20:10', platform: '3', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BPL', stationName: 'Bhopal Junction', scheduledArrival: '05:20', scheduledDeparture: '05:25', actualArrival: '05:20', actualDeparture: '05:25', platform: '1', distanceKm: 707, haltMinutes: 5, status: 'PASSED', dayCount: 2 },
      { stationCode: 'NGP', stationName: 'Nagpur Junction', scheduledArrival: '11:45', scheduledDeparture: '11:50', actualArrival: '11:45', actualDeparture: '11:50', platform: '2', distanceKm: 1097, haltMinutes: 5, status: 'PASSED', dayCount: 2 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '22:15', scheduledDeparture: '22:25', actualArrival: '22:15', actualDeparture: '22:25', platform: '1', distanceKm: 1759, haltMinutes: 10, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'CBE', stationName: 'Coimbatore Junction', scheduledArrival: '07:12', scheduledDeparture: '07:15', estimatedArrival: '07:12', estimatedDeparture: '07:15', platform: '1', distanceKm: 2420, haltMinutes: 3, status: 'UPCOMING', dayCount: 3 },
      { stationCode: 'ERS', stationName: 'Ernakulam Junction', scheduledArrival: '11:10', scheduledDeparture: '11:15', estimatedArrival: '11:10', estimatedDeparture: '11:15', platform: '1', distanceKm: 2650, haltMinutes: 5, status: 'UPCOMING', dayCount: 3 },
      { stationCode: 'TVC', stationName: 'Thiruvananthapuram Central', scheduledArrival: '15:15', scheduledDeparture: '15:15', estimatedArrival: '15:15', platform: '1', distanceKm: 2862, haltMinutes: 0, status: 'UPCOMING', dayCount: 3 }
    ]
  },
  {
    id: 'tr_22691',
    trainNumber: '22691',
    trainName: 'Bengaluru - Hazrat Nizamuddin Rajdhani Express',
    trainType: 'RAJDHANI',
    originStationCode: 'SBC',
    originStationName: 'KSR Bengaluru City',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'SWR',
    division: 'Bengaluru',
    rakeType: 'LHB Rajdhani',
    locoNumber: 'WAP-7 (Lallaguda 30312)',
    totalCoaches: 20,
    schedule: [
      { stationCode: 'SBC', stationName: 'KSR Bengaluru City', scheduledArrival: '20:00', scheduledDeparture: '20:00', actualDeparture: '20:00', platform: '8', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'SC', stationName: 'Secunderabad Junction', scheduledArrival: '07:05', scheduledDeparture: '07:15', actualArrival: '07:10', actualDeparture: '07:20', platform: '10', distanceKm: 700, haltMinutes: 10, status: 'PASSED', dayCount: 2 },
      { stationCode: 'NGP', stationName: 'Nagpur Junction', scheduledArrival: '15:00', scheduledDeparture: '15:05', estimatedArrival: '15:05', estimatedDeparture: '15:10', platform: '1', distanceKm: 1275, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '05:30', scheduledDeparture: '05:30', estimatedArrival: '05:30', platform: '4', distanceKm: 2365, haltMinutes: 0, status: 'UPCOMING', dayCount: 3 }
    ]
  },
  {
    id: 'tr_12433',
    trainNumber: '12433',
    trainName: 'Chennai Central - Hazrat Nizamuddin Rajdhani Express',
    trainType: 'RAJDHANI',
    originStationCode: 'MAS',
    originStationName: 'MGR Chennai Central',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'NR',
    division: 'Delhi',
    rakeType: 'LHB Rajdhani',
    locoNumber: 'WAP-7 (Royapuram 30288)',
    totalCoaches: 20,
    schedule: [
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '06:05', scheduledDeparture: '06:05', actualDeparture: '06:05', platform: '2', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '11:40', scheduledDeparture: '11:50', actualArrival: '11:40', actualDeparture: '11:50', platform: '1', distanceKm: 431, haltMinutes: 10, status: 'PASSED', dayCount: 1 },
      { stationCode: 'NGP', stationName: 'Nagpur Junction', scheduledArrival: '20:40', scheduledDeparture: '20:45', estimatedArrival: '20:40', estimatedDeparture: '20:45', platform: '1', distanceKm: 1093, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '10:40', scheduledDeparture: '10:40', estimatedArrival: '10:40', platform: '5', distanceKm: 2182, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12431',
    trainNumber: '12431',
    trainName: 'Trivandrum Rajdhani Express (via Konkan Railway)',
    trainType: 'RAJDHANI',
    originStationCode: 'TVC',
    originStationName: 'Thiruvananthapuram Central',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'NR',
    division: 'Delhi',
    rakeType: 'LHB Rajdhani',
    locoNumber: 'WAP-7 (Vadodara 30401)',
    totalCoaches: 20,
    schedule: [
      { stationCode: 'TVC', stationName: 'Thiruvananthapuram Central', scheduledArrival: '19:15', scheduledDeparture: '19:15', actualDeparture: '19:15', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'ERS', stationName: 'Ernakulam Junction', scheduledArrival: '22:30', scheduledDeparture: '22:35', actualArrival: '22:30', actualDeparture: '22:35', platform: '1', distanceKm: 206, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CLT', stationName: 'Kozhikode', scheduledArrival: '01:10', scheduledDeparture: '01:15', actualArrival: '01:10', actualDeparture: '01:15', platform: '1', distanceKm: 399, haltMinutes: 5, status: 'PASSED', dayCount: 2 },
      { stationCode: 'MAJN', stationName: 'Mangaluru Junction', scheduledArrival: '04:10', scheduledDeparture: '04:20', actualArrival: '04:10', actualDeparture: '04:20', platform: '1', distanceKm: 620, haltMinutes: 10, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '12:40', scheduledDeparture: '12:40', estimatedArrival: '12:40', platform: '6', distanceKm: 2845, haltMinutes: 0, status: 'UPCOMING', dayCount: 3 }
    ]
  },
  {
    id: 'tr_12245',
    trainNumber: '12245',
    trainName: 'Howrah - Yesvantpur (Bengaluru) Duronto Express',
    trainType: 'DURONTO',
    originStationCode: 'HWH',
    originStationName: 'Howrah Junction',
    destinationStationCode: 'YPR',
    destinationStationName: 'Yesvantpur Junction (Bengaluru)',
    zone: 'SER',
    division: 'Howrah',
    rakeType: 'LHB Duronto',
    locoNumber: 'WAP-7 (Santragachi 30299)',
    totalCoaches: 18,
    schedule: [
      { stationCode: 'HWH', stationName: 'Howrah Junction', scheduledArrival: '10:50', scheduledDeparture: '10:50', actualDeparture: '10:50', platform: '21', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BBS', stationName: 'Bhubaneswar', scheduledArrival: '16:20', scheduledDeparture: '16:30', actualArrival: '16:20', actualDeparture: '16:30', platform: '4', distanceKm: 437, haltMinutes: 10, status: 'PASSED', dayCount: 1 },
      { stationCode: 'VSKP', stationName: 'Visakhapatnam Junction', scheduledArrival: '23:25', scheduledDeparture: '23:45', actualArrival: '23:25', actualDeparture: '23:45', platform: '1', distanceKm: 880, haltMinutes: 20, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '04:15', scheduledDeparture: '04:25', estimatedArrival: '04:15', estimatedDeparture: '04:25', platform: '1', distanceKm: 1228, haltMinutes: 10, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'YPR', stationName: 'Yesvantpur Junction', scheduledArrival: '16:00', scheduledDeparture: '16:00', estimatedArrival: '16:00', platform: '1', distanceKm: 1946, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12839',
    trainNumber: '12839',
    trainName: 'Howrah - MGR Chennai Central Mail',
    trainType: 'SUPERFAST',
    originStationCode: 'HWH',
    originStationName: 'Howrah Junction',
    destinationStationCode: 'MAS',
    destinationStationName: 'MGR Chennai Central',
    zone: 'SER',
    division: 'Howrah',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Santragachi 30211)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'HWH', stationName: 'Howrah Junction', scheduledArrival: '23:55', scheduledDeparture: '23:55', actualDeparture: '23:55', platform: '19', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BBS', stationName: 'Bhubaneswar', scheduledArrival: '05:40', scheduledDeparture: '05:45', actualArrival: '05:40', actualDeparture: '05:45', platform: '4', distanceKm: 437, haltMinutes: 5, status: 'PASSED', dayCount: 2 },
      { stationCode: 'VSKP', stationName: 'Visakhapatnam Junction', scheduledArrival: '13:50', scheduledDeparture: '14:10', actualArrival: '13:50', actualDeparture: '14:10', platform: '1', distanceKm: 880, haltMinutes: 20, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'BZA', stationName: 'Vijayawada Junction', scheduledArrival: '19:50', scheduledDeparture: '20:00', estimatedArrival: '19:50', estimatedDeparture: '20:00', platform: '1', distanceKm: 1228, haltMinutes: 10, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'MAS', stationName: 'MGR Chennai Central', scheduledArrival: '03:45', scheduledDeparture: '03:45', estimatedArrival: '03:45', platform: '3', distanceKm: 1659, haltMinutes: 0, status: 'UPCOMING', dayCount: 3 }
    ]
  },
  {
    id: 'tr_12723',
    trainNumber: '12723',
    trainName: 'Telangana Superfast Express (Hyderabad - New Delhi)',
    trainType: 'SUPERFAST',
    originStationCode: 'HYB',
    originStationName: 'Hyderabad Deccan',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'SCR',
    division: 'Secunderabad',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Lallaguda 30260)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'HYB', stationName: 'Hyderabad Deccan', scheduledArrival: '06:00', scheduledDeparture: '06:00', actualDeparture: '06:00', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'KZJ', stationName: 'Kazipet Junction', scheduledArrival: '08:20', scheduledDeparture: '08:22', actualArrival: '08:20', actualDeparture: '08:22', platform: '1', distanceKm: 135, haltMinutes: 2, status: 'PASSED', dayCount: 1 },
      { stationCode: 'NGP', stationName: 'Nagpur Junction', scheduledArrival: '15:20', scheduledDeparture: '15:25', actualArrival: '15:20', actualDeparture: '15:25', platform: '1', distanceKm: 575, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'BPL', stationName: 'Bhopal Junction', scheduledArrival: '21:45', scheduledDeparture: '21:55', estimatedArrival: '21:45', estimatedDeparture: '21:55', platform: '1', distanceKm: 965, haltMinutes: 10, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '07:40', scheduledDeparture: '07:40', estimatedArrival: '07:40', platform: '7', distanceKm: 1665, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },

  // =============================================================
  // 7. PRESERVED NORTH / WEST / EAST TRUNK EXPRESSES
  // =============================================================
  {
    id: 'tr_12951',
    trainNumber: '12951',
    trainName: 'Mumbai Central - New Delhi Tejas Rajdhani Express',
    trainType: 'RAJDHANI',
    originStationCode: 'MMCT',
    originStationName: 'Mumbai Central',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'WR',
    division: 'Mumbai',
    rakeType: 'LHB Tejas Sleeper',
    locoNumber: 'WAP-7 (Vadodara 30225)',
    totalCoaches: 20,
    schedule: [
      { stationCode: 'MMCT', stationName: 'Mumbai Central', scheduledArrival: '17:00', scheduledDeparture: '17:00', actualDeparture: '17:00', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'ST', stationName: 'Surat', scheduledArrival: '19:43', scheduledDeparture: '19:48', actualArrival: '19:43', actualDeparture: '19:48', platform: '1', distanceKm: 263, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', scheduledArrival: '21:06', scheduledDeparture: '21:16', actualArrival: '21:06', actualDeparture: '21:16', platform: '2', distanceKm: 392, haltMinutes: 10, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '08:32', scheduledDeparture: '08:32', estimatedArrival: '08:32', platform: '3', distanceKm: 1384, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12952',
    trainNumber: '12952',
    trainName: 'New Delhi - Mumbai Central Tejas Rajdhani Express',
    trainType: 'RAJDHANI',
    originStationCode: 'NDLS',
    originStationName: 'New Delhi',
    destinationStationCode: 'MMCT',
    destinationStationName: 'Mumbai Central',
    zone: 'WR',
    division: 'Mumbai',
    rakeType: 'LHB Tejas Sleeper',
    locoNumber: 'WAP-7 (Tughlakabad 30219)',
    totalCoaches: 20,
    schedule: [
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '16:55', scheduledDeparture: '16:55', actualDeparture: '16:55', platform: '3', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', scheduledArrival: '03:40', scheduledDeparture: '03:50', estimatedArrival: '03:42', estimatedDeparture: '03:52', platform: '2', distanceKm: 992, haltMinutes: 10, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'ST', stationName: 'Surat', scheduledArrival: '05:13', scheduledDeparture: '05:18', estimatedArrival: '05:16', estimatedDeparture: '05:21', platform: '1', distanceKm: 1122, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'MMCT', stationName: 'Mumbai Central', scheduledArrival: '08:35', scheduledDeparture: '08:35', estimatedArrival: '08:35', platform: '1', distanceKm: 1384, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12301',
    trainNumber: '12301',
    trainName: 'Howrah - New Delhi Rajdhani Express (via Gaya)',
    trainType: 'RAJDHANI',
    originStationCode: 'HWH',
    originStationName: 'Howrah Junction',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'ER',
    division: 'Howrah',
    rakeType: 'LHB Rajdhani',
    locoNumber: 'WAP-7 (Howrah 30201)',
    totalCoaches: 21,
    schedule: [
      { stationCode: 'HWH', stationName: 'Howrah Junction', scheduledArrival: '16:50', scheduledDeparture: '16:50', actualDeparture: '16:50', platform: '9', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'PRYJ', stationName: 'Prayagraj Junction', scheduledArrival: '00:45', scheduledDeparture: '00:50', estimatedArrival: '00:45', estimatedDeparture: '00:50', platform: '1', distanceKm: 812, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'CNB', stationName: 'Kanpur Central', scheduledArrival: '02:35', scheduledDeparture: '02:40', estimatedArrival: '02:35', estimatedDeparture: '02:40', platform: '1', distanceKm: 1006, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '10:05', scheduledDeparture: '10:05', estimatedArrival: '10:05', platform: '12', distanceKm: 1446, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_12002',
    trainNumber: '12002',
    trainName: 'New Delhi - Rani Kamlapati (Bhopal) Shatabdi Express',
    trainType: 'SHATABDI',
    originStationCode: 'NDLS',
    originStationName: 'New Delhi',
    destinationStationCode: 'BPL',
    destinationStationName: 'Bhopal Junction',
    zone: 'NR',
    division: 'Delhi',
    rakeType: 'LHB Shatabdi',
    locoNumber: 'WAP-7 (Ghaziabad 30214)',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '06:00', scheduledDeparture: '06:00', actualDeparture: '06:00', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'AGC', stationName: 'Agra Cantt', scheduledArrival: '07:50', scheduledDeparture: '07:55', actualArrival: '07:50', actualDeparture: '07:55', platform: '1', distanceKm: 195, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'GWL', stationName: 'Gwalior Junction', scheduledArrival: '09:23', scheduledDeparture: '09:28', estimatedArrival: '09:23', estimatedDeparture: '09:28', platform: '1', distanceKm: 313, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'BPL', stationName: 'Bhopal Junction', scheduledArrival: '14:40', scheduledDeparture: '14:40', estimatedArrival: '14:40', platform: '1', distanceKm: 707, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12004',
    trainNumber: '12004',
    trainName: 'New Delhi - Lucknow Junction Shatabdi Express',
    trainType: 'SHATABDI',
    originStationCode: 'NDLS',
    originStationName: 'New Delhi',
    destinationStationCode: 'LKO',
    destinationStationName: 'Lucknow Charbagh',
    zone: 'NR',
    division: 'Delhi',
    rakeType: 'LHB Shatabdi',
    locoNumber: 'WAP-7 (Ghaziabad 30278)',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '06:10', scheduledDeparture: '06:10', actualDeparture: '06:10', platform: '9', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'CNB', stationName: 'Kanpur Central', scheduledArrival: '11:20', scheduledDeparture: '11:25', estimatedArrival: '11:22', estimatedDeparture: '11:27', platform: '1', distanceKm: 440, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'LKO', stationName: 'Lucknow Charbagh', scheduledArrival: '12:40', scheduledDeparture: '12:40', estimatedArrival: '12:40', platform: '6', distanceKm: 512, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12009',
    trainNumber: '12009',
    trainName: 'Mumbai Central - Ahmedabad Shatabdi Express',
    trainType: 'SHATABDI',
    originStationCode: 'MMCT',
    originStationName: 'Mumbai Central',
    destinationStationCode: 'ADI',
    destinationStationName: 'Ahmedabad Junction',
    zone: 'WR',
    division: 'Mumbai',
    rakeType: 'LHB Shatabdi',
    locoNumber: 'WAP-7 (Vadodara 30209)',
    totalCoaches: 16,
    schedule: [
      { stationCode: 'MMCT', stationName: 'Mumbai Central', scheduledArrival: '06:20', scheduledDeparture: '06:20', actualDeparture: '06:20', platform: '1', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'ST', stationName: 'Surat', scheduledArrival: '09:15', scheduledDeparture: '09:18', actualArrival: '09:15', actualDeparture: '09:18', platform: '1', distanceKm: 263, haltMinutes: 3, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', scheduledArrival: '10:48', scheduledDeparture: '10:53', estimatedArrival: '10:48', estimatedDeparture: '10:53', platform: '2', distanceKm: 392, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'ADI', stationName: 'Ahmedabad Junction', scheduledArrival: '12:45', scheduledDeparture: '12:45', estimatedArrival: '12:45', platform: '1', distanceKm: 493, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  },
  {
    id: 'tr_12801',
    trainNumber: '12801',
    trainName: 'Purushottam Express (Puri - New Delhi)',
    trainType: 'SUPERFAST',
    originStationCode: 'PURI',
    originStationName: 'Puri',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'ECoR',
    division: 'Khurda Road',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Khurda Road 30300)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'PURI', stationName: 'Puri', scheduledArrival: '21:55', scheduledDeparture: '21:55', actualDeparture: '21:55', platform: '6', distanceKm: 0, haltMinutes: 0, status: 'PASSED', dayCount: 1 },
      { stationCode: 'BBS', stationName: 'Bhubaneswar', scheduledArrival: '22:55', scheduledDeparture: '23:00', actualArrival: '22:55', actualDeparture: '23:00', platform: '1', distanceKm: 63, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'PRYJ', stationName: 'Prayagraj Junction', scheduledArrival: '11:40', scheduledDeparture: '11:45', estimatedArrival: '11:40', estimatedDeparture: '11:45', platform: '1', distanceKm: 980, haltMinutes: 5, status: 'CURRENT', dayCount: 2 },
      { stationCode: 'CNB', stationName: 'Kanpur Central', scheduledArrival: '14:15', scheduledDeparture: '14:20', estimatedArrival: '14:15', estimatedDeparture: '14:20', platform: '2', distanceKm: 1174, haltMinutes: 5, status: 'UPCOMING', dayCount: 2 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '04:00', scheduledDeparture: '04:00', estimatedArrival: '04:00', platform: '8', distanceKm: 1614, haltMinutes: 0, status: 'UPCOMING', dayCount: 3 }
    ]
  },
  {
    id: 'tr_12138',
    trainNumber: '12138',
    trainName: 'Punjab Mail (Firozpur - Mumbai CSMT)',
    trainType: 'SUPERFAST',
    originStationCode: 'NDLS',
    originStationName: 'New Delhi',
    destinationStationCode: 'CSMT',
    destinationStationName: 'Chhatrapati Shivaji Maharaj Terminus (Mumbai)',
    zone: 'CR',
    division: 'Mumbai CR',
    rakeType: 'LHB 22 Coaches',
    locoNumber: 'WAP-7 (Kalyan 30245)',
    totalCoaches: 22,
    schedule: [
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '05:00', scheduledDeparture: '05:15', actualDeparture: '05:15', platform: '3', distanceKm: 382, haltMinutes: 15, status: 'PASSED', dayCount: 1 },
      { stationCode: 'AGC', stationName: 'Agra Cantt', scheduledArrival: '07:35', scheduledDeparture: '07:40', actualArrival: '07:35', actualDeparture: '07:40', platform: '1', distanceKm: 577, haltMinutes: 5, status: 'PASSED', dayCount: 1 },
      { stationCode: 'GWL', stationName: 'Gwalior Junction', scheduledArrival: '09:00', scheduledDeparture: '09:05', estimatedArrival: '09:00', estimatedDeparture: '09:05', platform: '1', distanceKm: 695, haltMinutes: 5, status: 'CURRENT', dayCount: 1 },
      { stationCode: 'BPL', stationName: 'Bhopal Junction', scheduledArrival: '16:35', scheduledDeparture: '16:40', estimatedArrival: '16:35', estimatedDeparture: '16:40', platform: '1', distanceKm: 1089, haltMinutes: 5, status: 'UPCOMING', dayCount: 1 },
      { stationCode: 'CSMT', stationName: 'Chhatrapati Shivaji Maharaj Terminus (Mumbai)', scheduledArrival: '07:35', scheduledDeparture: '07:35', estimatedArrival: '07:35', platform: '18', distanceKm: 1912, haltMinutes: 0, status: 'UPCOMING', dayCount: 2 }
    ]
  },
  {
    id: 'tr_frt_9001',
    trainNumber: 'DFCC-9001',
    trainName: 'Eastern Dedicated Freight Corridor Coal Carrier (DFCCIL)',
    trainType: 'FREIGHT',
    originStationCode: 'CNB',
    originStationName: 'Kanpur Central',
    destinationStationCode: 'NDLS',
    destinationStationName: 'New Delhi',
    zone: 'NCR',
    division: 'Prayagraj',
    rakeType: 'BOXN-HL 58 Wagons',
    locoNumber: 'WAG-12B Twin Electric (60021)',
    totalCoaches: 58,
    schedule: [
      { stationCode: 'CNB', stationName: 'Kanpur Central', scheduledArrival: '02:00', scheduledDeparture: '02:30', actualDeparture: '02:30', platform: 'Freight Line 1', distanceKm: 0, haltMinutes: 30, status: 'PASSED', dayCount: 1 },
      { stationCode: 'NDLS', stationName: 'New Delhi', scheduledArrival: '09:30', scheduledDeparture: '09:30', estimatedArrival: '09:40', platform: 'Tughlakabad Yard', distanceKm: 440, haltMinutes: 0, status: 'UPCOMING', dayCount: 1 }
    ]
  }
];

// Helper to look up station by code
export const getStationByCode = (code: string): RailwayStation | undefined => {
  return REAL_INDIAN_STATIONS.find(s => s.code === code.toUpperCase().trim());
};

// Helper to look up train details by train number or name
export const findRealTrain = (query: string): TrainDetails | undefined => {
  const q = query.toLowerCase().trim();
  return REAL_INDIAN_TRAINS.find(t =>
    t.trainNumber.toLowerCase() === q ||
    t.trainName.toLowerCase().includes(q)
  );
};
