import { BusVehicle, BusLocationTelemetry } from '../types';
import { CHENNAI_MTC_ROUTES } from './chennaiRoutes';
import { COIMBATORE_TNSTC_ROUTES } from './coimbatoreRoutes';
import { getStopById } from './stops';

export const BASE_BUS_VEHICLES: BusVehicle[] = [
  {
    id: 'V_45C_01',
    bus_number: '45C',
    route_id: 'R_45C',
    operator: 'TNSTC Coimbatore',
    bus_type: 'Town Bus',
    reg_number: 'TN 38 N 2489',
    is_live_gps: true,
    speed_kmh: 36,
    current_stop_order: 7,
    progress_ratio: 0.65,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 62,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_45A_01',
    bus_number: '45A',
    route_id: 'R_45A',
    operator: 'TNSTC Coimbatore',
    bus_type: 'Town Bus',
    reg_number: 'TN 38 N 1822',
    is_live_gps: true,
    speed_kmh: 38,
    current_stop_order: 5,
    progress_ratio: 0.40,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 74,
    frequency_text: 'Every 12 min'
  },
  {
    id: 'V_20C_01',
    bus_number: '20C',
    route_id: 'R_20C',
    operator: 'TNSTC Coimbatore',
    bus_type: 'Town Bus',
    reg_number: 'TN 38 N 3105',
    is_live_gps: true,
    speed_kmh: 40,
    current_stop_order: 3,
    progress_ratio: 0.55,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 55,
    frequency_text: 'Every 8 min'
  },
  {
    id: 'V_70A_01',
    bus_number: '70A',
    route_id: 'R_70A',
    operator: 'TNSTC Coimbatore',
    bus_type: 'Town Bus',
    reg_number: 'TN 38 N 1944',
    is_live_gps: true,
    speed_kmh: 32,
    current_stop_order: 4,
    progress_ratio: 0.70,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 80,
    frequency_text: 'Every 15 min'
  },
  {
    id: 'V_33A_01',
    bus_number: '33A',
    route_id: 'R_33A',
    operator: 'TNSTC Coimbatore',
    bus_type: 'Town Bus',
    reg_number: 'TN 38 N 2210',
    is_live_gps: true,
    speed_kmh: 35,
    current_stop_order: 3,
    progress_ratio: 0.50,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 68,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_S1_01',
    bus_number: 'S1',
    route_id: 'R_S1',
    operator: 'TNSTC Coimbatore / Smart City',
    bus_type: 'Low Floor AC',
    reg_number: 'TN 38 N 4012',
    is_live_gps: true,
    speed_kmh: 42,
    current_stop_order: 4,
    progress_ratio: 0.35,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 45,
    frequency_text: 'Every 20 min'
  },
  {
    id: 'V_111_01',
    bus_number: '111',
    route_id: 'R_111',
    operator: 'TNSTC Coimbatore',
    bus_type: 'Town Bus',
    reg_number: 'TN 38 N 1490',
    is_live_gps: true,
    speed_kmh: 34,
    current_stop_order: 3,
    progress_ratio: 0.80,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 60,
    frequency_text: 'Every 20 min'
  },
  {
    id: 'V_10A_01',
    bus_number: '10A',
    route_id: 'R_10A',
    operator: 'TNSTC Kumbakonam',
    bus_type: 'Town Bus',
    reg_number: 'TN 45 N 3321',
    is_live_gps: true,
    speed_kmh: 38,
    current_stop_order: 2,
    progress_ratio: 0.45,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 50,
    frequency_text: 'Every 25 min'
  },
  {
    id: 'V_10B_01',
    bus_number: '10B',
    route_id: 'R_10B',
    operator: 'TNSTC Kumbakonam',
    bus_type: 'Town Bus',
    reg_number: 'TN 45 N 2911',
    is_live_gps: false,
    speed_kmh: 0,
    current_stop_order: 1,
    progress_ratio: 0.0,
    direction: 'forward',
    status: 'Available',
    capacity_percent: 30,
    frequency_text: 'Every 30 min'
  },
  {
    id: 'V_70V_01',
    bus_number: '70V',
    route_id: 'R_70V',
    operator: 'MTC Chennai',
    bus_type: 'Deluxe',
    reg_number: 'TN 01 N 9812',
    is_live_gps: true,
    speed_kmh: 32,
    current_stop_order: 6,
    progress_ratio: 0.50,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 78,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_570_01',
    bus_number: '570',
    route_id: 'R_570',
    operator: 'MTC Chennai',
    bus_type: 'Low Floor AC',
    reg_number: 'TN 01 AN 3241',
    is_live_gps: true,
    speed_kmh: 35,
    current_stop_order: 7,
    progress_ratio: 0.45,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 65,
    frequency_text: 'Every 12 min'
  },
  {
    id: 'V_102_01',
    bus_number: '102',
    route_id: 'R_102',
    operator: 'MTC Chennai',
    bus_type: 'AC Deluxe',
    reg_number: 'TN 01 AN 1190',
    is_live_gps: true,
    speed_kmh: 30,
    current_stop_order: 5,
    progress_ratio: 0.35,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 70,
    frequency_text: 'Every 15 min'
  },
  {
    id: 'V_19B_01',
    bus_number: '19B',
    route_id: 'R_19B',
    operator: 'MTC Chennai',
    bus_type: 'Town Bus',
    reg_number: 'TN 01 N 7621',
    is_live_gps: true,
    speed_kmh: 28,
    current_stop_order: 4,
    progress_ratio: 0.40,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 82,
    frequency_text: 'Every 12 min'
  },
  {
    id: 'V_21G_01',
    bus_number: '21G',
    route_id: 'R_21G',
    operator: 'MTC Chennai',
    bus_type: 'Deluxe',
    reg_number: 'TN 01 N 8844',
    is_live_gps: true,
    speed_kmh: 31,
    current_stop_order: 6,
    progress_ratio: 0.50,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 75,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_M70_01',
    bus_number: 'M70',
    route_id: 'R_M70',
    operator: 'MTC Chennai',
    bus_type: 'Deluxe',
    reg_number: 'TN 01 N 9021',
    is_live_gps: true,
    speed_kmh: 33,
    current_stop_order: 4,
    progress_ratio: 0.50,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 88,
    frequency_text: 'Every 8 min'
  },
  {
    id: 'V_EXP_CHN_CGL_01',
    bus_number: 'EXP-CHN-CGL',
    route_id: 'R_EXP_CHN_CGL',
    operator: 'TNSTC Villupuram',
    bus_type: 'Express',
    reg_number: 'TN 32 N 4402',
    is_live_gps: true,
    speed_kmh: 48,
    current_stop_order: 4,
    progress_ratio: 0.40,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 92,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_108_01',
    bus_number: '108',
    route_id: 'R_108',
    operator: 'TNSTC Salem',
    bus_type: 'Town Bus',
    reg_number: 'TN 30 N 1199',
    is_live_gps: true,
    speed_kmh: 30,
    current_stop_order: 3,
    progress_ratio: 0.70,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 58,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_SLM_1_01',
    bus_number: '1',
    route_id: 'R_SLM_1',
    operator: 'TNSTC Salem',
    bus_type: 'Town Bus',
    reg_number: 'TN 30 N 1420',
    is_live_gps: true,
    speed_kmh: 28,
    current_stop_order: 3,
    progress_ratio: 0.50,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 68,
    frequency_text: 'Every 8 min'
  },
  {
    id: 'V_SLM_13_01',
    bus_number: '13',
    route_id: 'R_SLM_13',
    operator: 'TNSTC Salem',
    bus_type: 'Town Bus',
    reg_number: 'TN 30 N 1682',
    is_live_gps: true,
    speed_kmh: 32,
    current_stop_order: 4,
    progress_ratio: 0.60,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 64,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_SLM_74_01',
    bus_number: '74',
    route_id: 'R_SLM_74',
    operator: 'TNSTC Salem',
    bus_type: 'Town Bus',
    reg_number: 'TN 30 N 1855',
    is_live_gps: true,
    speed_kmh: 35,
    current_stop_order: 3,
    progress_ratio: 0.65,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 72,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_SLM_YRC_01',
    bus_number: 'YRC-1',
    route_id: 'R_SLM_YRC',
    operator: 'TNSTC Salem (Hill Service)',
    bus_type: 'Town Bus',
    reg_number: 'TN 30 N 0944',
    is_live_gps: true,
    speed_kmh: 25,
    current_stop_order: 3,
    progress_ratio: 0.45,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 85,
    frequency_text: 'Every 20 min'
  },
  {
    id: 'V_SLM_MET_01',
    bus_number: 'MET-1',
    route_id: 'R_SLM_MET',
    operator: 'TNSTC Salem',
    bus_type: 'Town Bus',
    reg_number: 'TN 30 N 2108',
    is_live_gps: true,
    speed_kmh: 40,
    current_stop_order: 4,
    progress_ratio: 0.55,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 70,
    frequency_text: 'Every 12 min'
  },
  {
    id: 'V_SLM_ATT_01',
    bus_number: 'ATT-1',
    route_id: 'R_SLM_ATT',
    operator: 'TNSTC Salem',
    bus_type: 'Town Bus',
    reg_number: 'TN 30 N 2240',
    is_live_gps: true,
    speed_kmh: 42,
    current_stop_order: 4,
    progress_ratio: 0.50,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 78,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_1C_01',
    bus_number: '1C',
    route_id: 'R_1C',
    operator: 'TNSTC Kumbakonam',
    bus_type: 'Town Bus',
    reg_number: 'TN 45 N 4019',
    is_live_gps: true,
    speed_kmh: 32,
    current_stop_order: 3,
    progress_ratio: 0.40,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 78,
    frequency_text: 'Every 8 min'
  },
  {
    id: 'V_76_01',
    bus_number: '76',
    route_id: 'R_76',
    operator: 'TNSTC Madurai',
    bus_type: 'Town Bus',
    reg_number: 'TN 58 N 2280',
    is_live_gps: true,
    speed_kmh: 35,
    current_stop_order: 3,
    progress_ratio: 0.50,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 82,
    frequency_text: 'Every 10 min'
  },
  {
    id: 'V_11_01',
    bus_number: '11',
    route_id: 'R_11',
    operator: 'TNSTC Coimbatore (Erode)',
    bus_type: 'Town Bus',
    reg_number: 'TN 33 N 3012',
    is_live_gps: true,
    speed_kmh: 37,
    current_stop_order: 2,
    progress_ratio: 0.60,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 64,
    frequency_text: 'Every 15 min'
  },
  {
    id: 'V_90A_01',
    bus_number: '90A',
    route_id: 'R_90A',
    operator: 'TNSTC Coimbatore (Tiruppur)',
    bus_type: 'Town Bus',
    reg_number: 'TN 39 N 1956',
    is_live_gps: true,
    speed_kmh: 39,
    current_stop_order: 2,
    progress_ratio: 0.55,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 71,
    frequency_text: 'Every 12 min'
  },
  {
    id: 'V_EXP_101_01',
    bus_number: 'EXP-101',
    route_id: 'R_EXP_CBE_TRY',
    operator: 'TNSTC Express / SETC',
    bus_type: 'Express',
    reg_number: 'TN 38 N 5500',
    is_live_gps: true,
    speed_kmh: 68,
    current_stop_order: 4,
    progress_ratio: 0.40,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 90,
    frequency_text: 'Every 30 min'
  },
  {
    id: 'V_EXP_102_01',
    bus_number: 'EXP-102',
    route_id: 'R_EXP_ARL_TRY',
    operator: 'TNSTC Kumbakonam',
    bus_type: 'Express',
    reg_number: 'TN 45 N 5110',
    is_live_gps: true,
    speed_kmh: 52,
    current_stop_order: 2,
    progress_ratio: 0.60,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 65,
    frequency_text: 'Every 20 min'
  }
];

// Generate vehicles for all Chennai MTC routes
export const CHENNAI_BUS_VEHICLES: BusVehicle[] = CHENNAI_MTC_ROUTES.map((cr, idx) => {
  const stopsLen = cr.stops?.length || 4;
  const curStopOrder = Math.max(1, Math.floor(stopsLen * 0.4));
  return {
    id: `V_${cr.id}_01`,
    bus_number: cr.route_number,
    route_id: cr.id,
    operator: cr.operator || 'MTC Chennai',
    bus_type: cr.bus_type || 'Town Bus',
    reg_number: `TN 01 N ${1100 + ((idx * 37) % 8800)}`,
    is_live_gps: true,
    speed_kmh: 30 + ((idx * 3) % 18),
    current_stop_order: curStopOrder,
    progress_ratio: 0.45,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 55 + ((idx * 7) % 35),
    frequency_text: `Every ${cr.frequency_minutes || 10} min`
  };
});

// Generate vehicles for Coimbatore TNSTC routes
export const COIMBATORE_BUS_VEHICLES: BusVehicle[] = COIMBATORE_TNSTC_ROUTES.map((cr, idx) => {
  const stopsLen = cr.stops?.length || 4;
  const curStopOrder = Math.max(1, Math.floor(stopsLen * 0.45));
  return {
    id: `V_${cr.id}_01`,
    bus_number: cr.route_number,
    route_id: cr.id,
    operator: cr.operator || 'TNSTC Coimbatore',
    bus_type: cr.bus_type || 'Town Bus',
    reg_number: `TN 38 N ${1200 + ((idx * 43) % 8500)}`,
    is_live_gps: true,
    speed_kmh: 28 + ((idx * 4) % 16),
    current_stop_order: curStopOrder,
    progress_ratio: 0.50,
    direction: 'forward',
    status: 'In Transit',
    capacity_percent: 50 + ((idx * 9) % 40),
    frequency_text: `Every ${cr.frequency_minutes || 12} min`
  };
});

const vehMap = new Map<string, BusVehicle>();
for (const v of [...BASE_BUS_VEHICLES, ...CHENNAI_BUS_VEHICLES, ...COIMBATORE_BUS_VEHICLES]) {
  if (v && v.id && !vehMap.has(v.id)) {
    vehMap.set(v.id, v);
  }
}

export const BUS_VEHICLES: BusVehicle[] = Array.from(vehMap.values());

export const BASE_BUS_TELEMETRY: BusLocationTelemetry[] = [
  {
    bus_id: 'V_45C_01',
    bus_number: '45C',
    route_id: 'R_45C',
    route_number: '45C',
    latitude: 11.0740,
    longitude: 77.0045,
    speed_kmh: 36,
    heading_deg: 32,
    last_updated: 'Just now',
    current_stop_order: 7,
    next_stop_id: 'stop_cbe_saravanampatti_jn',
    next_stop_name: 'Saravanampatti Junction',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_45A_01',
    bus_number: '45A',
    route_id: 'R_45A',
    route_number: '45A',
    latitude: 11.0490,
    longitude: 76.9890,
    speed_kmh: 38,
    heading_deg: 30,
    last_updated: 'Just now',
    current_stop_order: 5,
    next_stop_id: 'stop_cbe_prozone_mall',
    next_stop_name: 'Prozone Mall Stop',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_20C_01',
    bus_number: '20C',
    route_id: 'R_20C',
    route_number: '20C',
    latitude: 11.0350,
    longitude: 76.9240,
    speed_kmh: 40,
    heading_deg: 285,
    last_updated: 'Just now',
    current_stop_order: 3,
    next_stop_id: 'stop_cbe_saibaba_colony',
    next_stop_name: 'Saibaba Colony',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_70A_01',
    bus_number: '70A',
    route_id: 'R_70A',
    route_number: '70A',
    latitude: 10.9700,
    longitude: 76.9520,
    speed_kmh: 32,
    heading_deg: 195,
    last_updated: 'Just now',
    current_stop_order: 4,
    next_stop_id: 'stop_cbe_kuniyamuthur',
    next_stop_name: 'Kuniyamuthur',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_10A_01',
    bus_number: '10A',
    route_id: 'R_10A',
    route_number: '10A',
    latitude: 11.1600,
    longitude: 79.2300,
    speed_kmh: 38,
    heading_deg: 220,
    last_updated: 'Just now',
    current_stop_order: 2,
    next_stop_id: 'stop_arl_udayarpalayam',
    next_stop_name: 'Udayarpalayam',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_70V_01',
    bus_number: '70V',
    route_id: 'R_70V',
    route_number: '70V',
    latitude: 12.9818,
    longitude: 80.1645,
    speed_kmh: 32,
    heading_deg: 215,
    last_updated: 'Just now',
    current_stop_order: 6,
    next_stop_id: 'stop_chn_pallavaram',
    next_stop_name: 'Pallavaram Bus Stop',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_570_01',
    bus_number: '570',
    route_id: 'R_570',
    route_number: '570',
    latitude: 12.9892,
    longitude: 80.2482,
    speed_kmh: 35,
    heading_deg: 180,
    last_updated: 'Just now',
    current_stop_order: 7,
    next_stop_id: 'stop_chn_perungudi',
    next_stop_name: 'Perungudi (OMR Tech Corridor)',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_102_01',
    bus_number: '102',
    route_id: 'R_102',
    route_number: '102',
    latitude: 13.0336,
    longitude: 80.2687,
    speed_kmh: 30,
    heading_deg: 175,
    last_updated: 'Just now',
    current_stop_order: 5,
    next_stop_id: 'stop_chn_adyar',
    next_stop_name: 'Adyar Bus Depot',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_M70_01',
    bus_number: 'M70',
    route_id: 'R_M70',
    route_number: 'M70',
    latitude: 13.0067,
    longitude: 80.2025,
    speed_kmh: 33,
    heading_deg: 135,
    last_updated: 'Just now',
    current_stop_order: 4,
    next_stop_id: 'stop_chn_velachery',
    next_stop_name: 'Velachery Vijaya Nagar',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_108_01',
    bus_number: '108',
    route_id: 'R_108',
    route_number: '108',
    latitude: 11.6660,
    longitude: 78.1460,
    speed_kmh: 30,
    heading_deg: 45,
    last_updated: 'Just now',
    current_stop_order: 3,
    next_stop_id: 'stop_slm_fairlands',
    next_stop_name: 'Fairlands Main Bus Stop',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_SLM_1_01',
    bus_number: '1',
    route_id: 'R_SLM_1',
    route_number: '1',
    latitude: 11.6515,
    longitude: 78.1450,
    speed_kmh: 28,
    heading_deg: 270,
    last_updated: 'Just now',
    current_stop_order: 3,
    next_stop_id: 'stop_slm_suramangalam',
    next_stop_name: 'Suramangalam Main Bus Stop',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_SLM_13_01',
    bus_number: '13',
    route_id: 'R_SLM_13',
    route_number: '13',
    latitude: 11.6780,
    longitude: 78.1635,
    speed_kmh: 32,
    heading_deg: 30,
    last_updated: 'Just now',
    current_stop_order: 4,
    next_stop_id: 'stop_slm_gorimedu',
    next_stop_name: 'Gorimedu Bus Stop',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_SLM_74_01',
    bus_number: '74',
    route_id: 'R_SLM_74',
    route_number: '74',
    latitude: 11.7205,
    longitude: 78.0792,
    speed_kmh: 35,
    heading_deg: 330,
    last_updated: 'Just now',
    current_stop_order: 3,
    next_stop_id: 'stop_slm_omalur',
    next_stop_name: 'Omalur Bus Stand',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_SLM_YRC_01',
    bus_number: 'YRC-1',
    route_id: 'R_SLM_YRC',
    route_number: 'YRC-1',
    latitude: 11.7250,
    longitude: 78.1880,
    speed_kmh: 25,
    heading_deg: 40,
    last_updated: 'Just now',
    current_stop_order: 3,
    next_stop_id: 'stop_slm_yercaud_bs',
    next_stop_name: 'Yercaud Bus Stand (Emerald Lake)',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_SLM_MET_01',
    bus_number: 'MET-1',
    route_id: 'R_SLM_MET',
    route_number: 'MET-1',
    latitude: 11.7960,
    longitude: 77.8010,
    speed_kmh: 40,
    heading_deg: 310,
    last_updated: 'Just now',
    current_stop_order: 4,
    next_stop_id: 'stop_slm_mecheri_bs',
    next_stop_name: 'Mecheri Bus Stand',
    status: 'IN_TRANSIT',
    is_live: true
  },
  {
    bus_id: 'V_SLM_ATT_01',
    bus_number: 'ATT-1',
    route_id: 'R_SLM_ATT',
    route_number: 'ATT-1',
    latitude: 11.6020,
    longitude: 78.4150,
    speed_kmh: 42,
    heading_deg: 95,
    last_updated: 'Just now',
    current_stop_order: 4,
    next_stop_id: 'stop_slm_pethanaickenpalayam',
    next_stop_name: 'Pethanaickenpalayam Bus Stop',
    status: 'IN_TRANSIT',
    is_live: true
  }
];

// Generate live GPS telemetry for all Chennai MTC routes
export const CHENNAI_BUS_TELEMETRY: BusLocationTelemetry[] = CHENNAI_MTC_ROUTES.map((cr, idx) => {
  const stopsLen = cr.stops?.length || 4;
  const curStopOrder = Math.max(1, Math.floor(stopsLen * 0.4));
  const curStopEntry = cr.stops[curStopOrder - 1];
  const nextStopEntry = cr.stops[Math.min(curStopOrder, stopsLen - 1)];

  const curStop = curStopEntry ? getStopById(curStopEntry.stop_id) : undefined;
  const nextStop = nextStopEntry ? getStopById(nextStopEntry.stop_id) : undefined;

  const lat = curStop && nextStop 
    ? (curStop.latitude + nextStop.latitude) / 2 
    : curStop ? curStop.latitude : 13.0827;
  const lng = curStop && nextStop 
    ? (curStop.longitude + nextStop.longitude) / 2 
    : curStop ? curStop.longitude : 80.2707;

  return {
    bus_id: `V_${cr.id}_01`,
    bus_number: cr.route_number,
    route_id: cr.id,
    route_number: cr.route_number,
    latitude: lat,
    longitude: lng,
    speed_kmh: 30 + ((idx * 3) % 18),
    heading_deg: 45 + ((idx * 35) % 310),
    last_updated: 'Just now',
    current_stop_order: curStopOrder,
    next_stop_id: nextStopEntry?.stop_id || cr.destination_stop_id,
    next_stop_name: nextStop ? nextStop.stop_name : 'Next Terminal',
    status: (idx % 8 === 0) ? 'AT_STOP' : 'IN_TRANSIT',
    is_live: true
  };
});

// Generate live GPS telemetry for Coimbatore TNSTC routes
export const COIMBATORE_BUS_TELEMETRY: BusLocationTelemetry[] = COIMBATORE_TNSTC_ROUTES.map((cr, idx) => {
  const stopsLen = cr.stops?.length || 4;
  const curStopOrder = Math.max(1, Math.floor(stopsLen * 0.45));
  const curStopEntry = cr.stops[curStopOrder - 1];
  const nextStopEntry = cr.stops[Math.min(curStopOrder, stopsLen - 1)];

  const curStop = curStopEntry ? getStopById(curStopEntry.stop_id) : undefined;
  const nextStop = nextStopEntry ? getStopById(nextStopEntry.stop_id) : undefined;

  const lat = curStop && nextStop 
    ? (curStop.latitude + nextStop.latitude) / 2 
    : curStop ? curStop.latitude : 11.0168;
  const lng = curStop && nextStop 
    ? (curStop.longitude + nextStop.longitude) / 2 
    : curStop ? curStop.longitude : 76.9678;

  return {
    bus_id: `V_${cr.id}_01`,
    bus_number: cr.route_number,
    route_id: cr.id,
    route_number: cr.route_number,
    latitude: lat,
    longitude: lng,
    speed_kmh: 28 + ((idx * 4) % 16),
    heading_deg: 30 + ((idx * 40) % 320),
    last_updated: 'Just now',
    current_stop_order: curStopOrder,
    next_stop_id: nextStopEntry?.stop_id || cr.destination_stop_id,
    next_stop_name: nextStop ? nextStop.stop_name : 'Next Stop',
    status: (idx % 7 === 0) ? 'AT_STOP' : 'IN_TRANSIT',
    is_live: true
  };
});

const telemMap = new Map<string, BusLocationTelemetry>();
for (const t of [...BASE_BUS_TELEMETRY, ...CHENNAI_BUS_TELEMETRY, ...COIMBATORE_BUS_TELEMETRY]) {
  if (t && t.bus_id && !telemMap.has(t.bus_id)) {
    telemMap.set(t.bus_id, t);
  }
}

export const BUS_TELEMETRY: BusLocationTelemetry[] = Array.from(telemMap.values());

export default BUS_VEHICLES;

