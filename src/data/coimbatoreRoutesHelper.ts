import { BusRoute, RouteStop, BusType } from '../types';

export function makeCbeRoute(
  id: string,
  route_number: string,
  route_name: string,
  route_name_ta: string,
  origin_stop_id: string,
  destination_stop_id: string,
  stop_ids: string[],
  distance_km: number,
  duration_minutes: number,
  frequency_minutes: number = 15,
  bus_type: BusType = 'Town Bus'
): BusRoute {
  const stopCount = Math.max(1, stop_ids.length - 1);
  const segmentDist = Number((distance_km / stopCount).toFixed(1));
  const segmentTime = Math.max(2, Math.round(duration_minutes / stopCount));

  const stops: RouteStop[] = stop_ids.map((stop_id, idx) => ({
    stop_id,
    stop_order: idx + 1,
    distance_from_previous_km: idx === 0 ? 0 : segmentDist,
    approximate_travel_minutes: idx === 0 ? 0 : segmentTime
  }));

  return {
    id,
    route_number,
    route_name,
    route_name_ta,
    operator: 'TNSTC Coimbatore',
    district_ids: ['dist_coimbatore'],
    origin_stop_id,
    destination_stop_id,
    direction: 'BOTH',
    bus_type,
    stops,
    frequency_minutes,
    first_bus_time: '05:30 AM',
    last_bus_time: '10:15 PM',
    distance_km,
    estimated_duration_minutes: duration_minutes,
    status: 'VERIFIED',
    fare_inr: Math.min(30, Math.max(8, Math.round(distance_km * 0.75))),
    is_women_free: bus_type === 'Town Bus' || bus_type === 'Ordinary'
  };
}
