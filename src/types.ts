// ========================================================
// FASTSTOP - TAMIL NADU TRANSPORTATION DATA ARCHITECTURE
// ========================================================

export type RegionType = 'north' | 'west' | 'delta' | 'south';

export interface District {
  id: string;
  code: string;
  nameEN: string;
  nameTA: string;
  region: RegionType;
  headquartersEN: string;
  headquartersTA: string;
  latitude: number;
  longitude: number;
  total_stops_count?: number;
  active_routes_count?: number;
}

export type StopType = 
  | 'bus_stand' 
  | 'bus_stop'
  | 'town_stop' 
  | 'junction' 
  | 'railway_station' 
  | 'metro'
  | 'airport' 
  | 'college' 
  | 'hospital' 
  | 'market' 
  | 'temple' 
  | 'highway'
  | 'shopping'
  | 'landmark'
  | 'it_park';

export interface BusStop {
  id: string;
  district_id: string;
  town: string;
  locality: string;
  stop_name: string;
  stop_name_ta: string;
  latitude: number;
  longitude: number;
  aliases: string[];
  stop_type: StopType;
  nearby_landmarks: string[];
  is_active: boolean;
  city?: string;
  has_metro?: boolean;
  has_railway?: boolean;
  has_airport?: boolean;
  metro_line?: string;
  railway_type?: string;
  verification_status?: RouteStatus;
}

export interface RouteStop {
  stop_id: string;
  stop_order: number;
  distance_from_previous_km: number;
  approximate_travel_minutes: number;
}

export type BusType = 'Town Bus' | 'Ordinary' | 'Deluxe' | 'Express' | 'Low Floor AC' | 'Mini Bus' | 'AC Deluxe';
export type RouteStatus = 'VERIFIED' | 'DEMO' | 'INACTIVE';
export type ETAType = 'LIVE' | 'ESTIMATED' | 'SCHEDULED';

export interface BusRoute {
  id: string;
  route_number: string;
  route_name: string;
  route_name_ta?: string;
  operator: string;
  district_ids: string[];
  origin_stop_id: string;
  destination_stop_id: string;
  direction?: 'UP' | 'DOWN' | 'BOTH';
  bus_type: BusType;
  stops: RouteStop[];
  frequency_minutes: number;
  first_bus_time: string;
  last_bus_time: string;
  distance_km: number;
  estimated_duration_minutes: number;
  status: RouteStatus;
  fare_inr?: number;
  is_women_free?: boolean;
}

export interface BusVehicle {
  id: string;
  bus_number: string;
  route_id: string;
  operator: string;
  bus_type: string;
  reg_number?: string;
  is_live_gps: boolean;
  speed_kmh?: number;
  current_stop_order?: number;
  progress_ratio?: number;
  direction?: 'forward' | 'backward';
  status: 'Available' | 'In Transit' | 'Delayed' | 'Not Available';
  capacity_percent?: number;
  frequency_text?: string;
}

export interface BusSchedule {
  id: string;
  route_id: string;
  departure_time: string;
  days: string[];
}

export interface BusLocationTelemetry {
  bus_id: string;
  bus_number: string;
  route_id: string;
  route_number: string;
  latitude: number;
  longitude: number;
  speed_kmh: number;
  heading_deg?: number;
  last_updated: string;
  current_stop_order: number;
  next_stop_id: string;
  next_stop_name: string;
  status: 'IN_TRANSIT' | 'AT_STOP' | 'IDLE';
  is_live: boolean;
}

export interface PlaceLandmark {
  id: string;
  name: string;
  nameTA?: string;
  type: StopType | 'tourist';
  latitude: number;
  longitude: number;
  district_id: string;
  locality: string;
  nearest_stop_id: string;
  distance_to_stop_m: number;
  aliases: string[];
}

export interface PassengerFeedback {
  id: string;
  routeId: string;
  busNumber: string;
  user: string;
  comment: string;
  statusTag: string;
  timestamp: string;
  upvotes: number;
}

// Search & Route Plan Result Models
export interface DirectBusResult {
  route: BusRoute;
  bus_number: string;
  operator: string;
  bus_type: BusType;
  status: RouteStatus;
  from_stop: BusStop;
  to_stop: BusStop;
  from_order: number;
  to_order: number;
  intermediate_stops: BusStop[];
  total_stops_count: number;
  distance_km: number;
  estimated_duration_minutes: number;
  eta_type: ETAType;
  eta_text: string;
  eta_minutes?: number;
  is_live_tracking_available: boolean;
  vehicle?: BusVehicle;
  telemetry?: BusLocationTelemetry;
  walking_from_m?: number;
  walking_to_m?: number;
}

export interface TransferRouteResult {
  id: string;
  first_leg: DirectBusResult;
  transfer_stop: BusStop;
  second_leg: DirectBusResult;
  total_duration_minutes: number;
  total_distance_km: number;
  transfer_wait_minutes: number;
}

export interface StopPassingRoute {
  route: BusRoute;
  direction_to: string;
  next_stops: string[];
  frequency_minutes: number;
  eta_type: ETAType;
  eta_text: string;
  vehicle?: BusVehicle;
}

// Backwards compatibility aliases for map & components
export interface Stop {
  nameEN: string;
  nameTA: string;
  lat: number;
  lng: number;
  district: string;
  id?: string;
  locality?: string;
}

export interface Route {
  id: string;
  code: string;
  nameEN: string;
  nameTA: string;
  type: string;
  color: string;
  stops: Stop[];
  status?: RouteStatus;
  operator?: string;
  frequency_minutes?: number;
  distance_km?: number;
  duration_minutes?: number;
}

export interface Bus {
  id: string;
  busNumber: string;
  routeId: string;
  status: string;
  speed: number;
  direction: 'forward' | 'backward';
  currentStopIndex: number;
  progressRatio: number;
  capacity: number;
  frequency: string;
}
