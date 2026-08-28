// ========================================================
// FASTSTOP - REUSABLE TAMIL NADU TRANSPORTATION ENGINE
// One unified routing and transit engine for all 38 districts
// ========================================================

import { 
  BusStop, 
  BusRoute, 
  BusVehicle, 
  BusLocationTelemetry, 
  District, 
  DirectBusResult, 
  TransferRouteResult, 
  StopPassingRoute,
  ETAType,
  PlaceLandmark
} from './types';
import { DISTRICTS } from './data/districts';
import { BUS_STOPS, getStopById } from './data/stops';
import { BUS_ROUTES } from './data/routes';
import { BUS_VEHICLES, BUS_TELEMETRY } from './data/vehicles';
import { PLACES_LANDMARKS } from './data/places';

// Haversine formula to compute great-circle distance between two GPS coordinates in kilometers
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Requirement 6: AUTOMATIC BUS NUMBERS AT EACH STOP
 * Algorithm:
 * FOR every active route:
 *    IF route contains stopId:
 *        get route_number
 *        add route_number
 * Remove duplicates.
 */
export function getBusesAtStop(
  stopId: string, 
  routes: BusRoute[] = BUS_ROUTES
): string[] {
  const busNumbers = new Set<string>();
  if (!stopId) return [];
  
  for (const route of routes) {
    if (route && route.status !== 'INACTIVE' && Array.isArray(route.stops)) {
      const containsStop = route.stops.some(s => s && s.stop_id === stopId);
      if (containsStop && route.route_number) {
        busNumbers.add(route.route_number);
      }
    }
  }
  
  return Array.from(busNumbers);
}

/**
 * Get full route details passing through a specific stop
 */
export function getRoutesAtStop(
  stopId: string,
  routes: BusRoute[] = BUS_ROUTES,
  vehicles: BusVehicle[] = BUS_VEHICLES,
  telemetryList: BusLocationTelemetry[] = BUS_TELEMETRY
): StopPassingRoute[] {
  const passingRoutes: StopPassingRoute[] = [];
  if (!stopId) return [];

  for (const route of routes) {
    if (!route || route.status === 'INACTIVE' || !Array.isArray(route.stops)) continue;

    const stopEntry = route.stops.find(s => s && s.stop_id === stopId);
    if (!stopEntry) continue;

    const vehicle = vehicles.find(v => v && v.route_id === route.id && v.status !== 'Not Available');
    const tele = telemetryList.find(t => t && t.route_id === route.id && t.is_live);

    // Calculate destination and downstream next stops
    const destStop = getStopById(route.destination_stop_id);
    const downstreamStops = route.stops
      .filter(s => s && s.stop_order > stopEntry.stop_order)
      .map(s => {
        const found = getStopById(s.stop_id);
        return found ? found.stop_name : s.stop_id;
      });

    // Calculate ETA
    let etaType: ETAType = 'SCHEDULED';
    let etaText = `Every ${route.frequency_minutes || 15} mins (${route.first_bus_time || '06:00'} - ${route.last_bus_time || '22:00'})`;

    if (tele && tele.is_live) {
      etaType = 'LIVE';
      const orderDiff = stopEntry.stop_order - (tele.current_stop_order || 0);
      if (orderDiff > 0) {
        const estMins = Math.max(2, Math.round(orderDiff * 4));
        etaText = `Arrives in ~${estMins} mins (${tele.speed_kmh || 35} km/h • Live GPS)`;
      } else if (orderDiff === 0) {
        etaText = `At stop / Arriving now (${tele.speed_kmh || 35} km/h • Live GPS)`;
      } else {
        etaType = 'ESTIMATED';
        etaText = `Next bus in ~${route.frequency_minutes || 15} mins (Estimated)`;
      }
    } else if (vehicle) {
      etaType = 'ESTIMATED';
      etaText = `Approaching (~${route.frequency_minutes || 15} mins frequency)`;
    }

    passingRoutes.push({
      route,
      direction_to: destStop ? destStop.stop_name : (route.route_name || 'Destination'),
      next_stops: downstreamStops,
      frequency_minutes: route.frequency_minutes || 15,
      eta_type: etaType,
      eta_text: etaText,
      vehicle
    });
  }

  return passingRoutes;
}

/**
 * Requirement 10: FROM → TO ROUTE SEARCH
 */
export function findDirectBuses(
  fromStopId: string, 
  toStopId: string,
  routes: BusRoute[] = BUS_ROUTES,
  vehicles: BusVehicle[] = BUS_VEHICLES,
  telemetryList: BusLocationTelemetry[] = BUS_TELEMETRY
): DirectBusResult[] {
  if (!fromStopId || !toStopId || fromStopId === toStopId) {
    return [];
  }

  const results: DirectBusResult[] = [];
  const fromStop = getStopById(fromStopId);
  const toStop = getStopById(toStopId);

  if (!fromStop || !toStop) {
    return [];
  }

  for (const route of routes) {
    if (!route || route.status === 'INACTIVE' || !Array.isArray(route.stops)) continue;

    const fromStopEntry = route.stops.find(s => s && s.stop_id === fromStopId);
    const toStopEntry = route.stops.find(s => s && s.stop_id === toStopId);

    // Check if forward direction or reverse direction (if route direction is BOTH or unspecified)
    const isForward = fromStopEntry && toStopEntry && fromStopEntry.stop_order < toStopEntry.stop_order;
    const isReverse = fromStopEntry && toStopEntry && (route.direction === 'BOTH' || !route.direction) && fromStopEntry.stop_order > toStopEntry.stop_order;

    if (isForward || isReverse) {
      let intermediateStopEntries = [];
      if (isForward) {
        intermediateStopEntries = route.stops.filter(
          s => s && s.stop_order >= fromStopEntry.stop_order && s.stop_order <= toStopEntry.stop_order
        );
      } else {
        intermediateStopEntries = route.stops
          .filter(s => s && s.stop_order <= fromStopEntry.stop_order && s.stop_order >= toStopEntry.stop_order)
          .sort((a, b) => b.stop_order - a.stop_order);
      }

      const intermediateStops: BusStop[] = intermediateStopEntries
        .map(s => getStopById(s.stop_id))
        .filter((s): s is BusStop => Boolean(s));

      // Calculate distance between from and to along the route
      let sectionDistanceKm = 0;
      let sectionTravelMinutes = 0;

      for (let i = 1; i < intermediateStopEntries.length; i++) {
        sectionDistanceKm += intermediateStopEntries[i]?.distance_from_previous_km || 1.5;
        sectionTravelMinutes += intermediateStopEntries[i]?.approximate_travel_minutes || 3;
      }

      if (sectionDistanceKm === 0) {
        sectionDistanceKm = calculateDistanceKm(
          fromStop.latitude || 11.0, 
          fromStop.longitude || 77.0, 
          toStop.latitude || 11.0, 
          toStop.longitude || 77.0
        );
      }
      if (sectionTravelMinutes === 0) {
        sectionTravelMinutes = Math.max(5, Math.round(sectionDistanceKm * 2.5));
      }

      // Check for live telemetry and vehicle
      const vehicle = vehicles.find(v => v && v.route_id === route.id && v.status !== 'Not Available');
      const tele = telemetryList.find(t => t && t.route_id === route.id && t.is_live);

      let etaType: ETAType = 'SCHEDULED';
      let etaText = `Next scheduled departure ${route.first_bus_time || '06:00'}`;
      let etaMins = route.frequency_minutes || 15;
      let isLive = false;

      if (tele && tele.is_live) {
        isLive = true;
        const diff = isForward 
          ? fromStopEntry.stop_order - (tele.current_stop_order || 0)
          : (tele.current_stop_order || 0) - fromStopEntry.stop_order;
        if (diff > 0) {
          etaType = 'LIVE';
          etaMins = Math.max(2, Math.round(diff * 3.5));
          etaText = `Arrives at ${fromStop.stop_name} in ${etaMins} min`;
        } else if (diff === 0) {
          etaType = 'LIVE';
          etaMins = 0;
          etaText = `Bus is at ${fromStop.stop_name} now!`;
        } else {
          etaType = 'ESTIMATED';
          etaText = `Next bus in approx ${route.frequency_minutes || 15} min`;
        }
      } else if (vehicle) {
        etaType = 'ESTIMATED';
        etaText = `Approx ${route.frequency_minutes || 15} min headway`;
      }

      results.push({
        route,
        bus_number: route.route_number || 'TN',
        operator: route.operator || 'TNSTC',
        bus_type: route.bus_type || 'Ordinary',
        status: route.status || 'VERIFIED',
        from_stop: fromStop,
        to_stop: toStop,
        from_order: fromStopEntry.stop_order,
        to_order: toStopEntry.stop_order,
        intermediate_stops: intermediateStops,
        total_stops_count: intermediateStops.length,
        distance_km: Math.round(sectionDistanceKm * 10) / 10,
        estimated_duration_minutes: sectionTravelMinutes,
        eta_type: etaType,
        eta_text: etaText,
        eta_minutes: etaMins,
        is_live_tracking_available: isLive,
        vehicle,
        telemetry: tele
      });
    }
  }

  // Sort: Live first, then fastest duration
  results.sort((a, b) => {
    if (a.eta_type === 'LIVE' && b.eta_type !== 'LIVE') return -1;
    if (b.eta_type === 'LIVE' && a.eta_type !== 'LIVE') return 1;
    return (a.estimated_duration_minutes || 0) - (b.estimated_duration_minutes || 0);
  });

  return results;
}

/**
 * 1-Transfer Route Finding: Connect two stops when no direct bus exists
 */
export function findTransferRoutes(
  fromStopId: string, 
  toStopId: string,
  routes: BusRoute[] = BUS_ROUTES
): TransferRouteResult[] {
  if (!fromStopId || !toStopId || fromStopId === toStopId) return [];
  const directBuses = findDirectBuses(fromStopId, toStopId, routes);
  if (directBuses.length > 0) {
    return []; // Direct buses already found
  }

  const results: TransferRouteResult[] = [];
  const fromStop = getStopById(fromStopId);
  const toStop = getStopById(toStopId);

  if (!fromStop || !toStop) return [];

  // Find all candidate transfer stops
  const fromRoutes = routes.filter(r => r && r.status !== 'INACTIVE' && Array.isArray(r.stops) && r.stops.some(s => s?.stop_id === fromStopId));
  const toRoutes = routes.filter(r => r && r.status !== 'INACTIVE' && Array.isArray(r.stops) && r.stops.some(s => s?.stop_id === toStopId));

  for (const r1 of fromRoutes) {
    const fromEntry = r1.stops.find(s => s?.stop_id === fromStopId);
    if (!fromEntry) continue;
    const fromOrder = fromEntry.stop_order;
    const r1DownstreamStops = r1.stops.filter(s => s && s.stop_order > fromOrder);

    for (const r1Stop of r1DownstreamStops) {
      if (!r1Stop || !r1Stop.stop_id) continue;
      for (const r2 of toRoutes) {
        if (r1.id === r2.id) continue;

        const transferStopEntryInR2 = r2.stops.find(s => s?.stop_id === r1Stop.stop_id);
        const destStopEntryInR2 = r2.stops.find(s => s?.stop_id === toStopId);

        if (transferStopEntryInR2 && destStopEntryInR2 && transferStopEntryInR2.stop_order < destStopEntryInR2.stop_order) {
          const leg1Results = findDirectBuses(fromStopId, r1Stop.stop_id, [r1]);
          const leg2Results = findDirectBuses(r1Stop.stop_id, toStopId, [r2]);
          const transferStop = getStopById(r1Stop.stop_id);

          if (leg1Results.length > 0 && leg2Results.length > 0 && transferStop) {
            const leg1 = leg1Results[0];
            const leg2 = leg2Results[0];
            const totalMins = (leg1.estimated_duration_minutes || 20) + 10 + (leg2.estimated_duration_minutes || 20);
            const totalKm = Math.round(((leg1.distance_km || 5) + (leg2.distance_km || 5)) * 10) / 10;

            results.push({
              id: `${r1.id}_${transferStop.id}_${r2.id}`,
              first_leg: leg1,
              transfer_stop: transferStop,
              second_leg: leg2,
              total_duration_minutes: totalMins,
              total_distance_km: totalKm,
              transfer_wait_minutes: 10
            });
          }
        }
      }
    }
  }

  // Deduplicate transfer results
  const uniqueKeys = new Set<string>();
  const filteredResults: TransferRouteResult[] = [];
  for (const res of results) {
    if (!res.first_leg || !res.transfer_stop || !res.second_leg) continue;
    const key = `${res.first_leg.bus_number}_${res.transfer_stop.id}_${res.second_leg.bus_number}`;
    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      filteredResults.push(res);
    }
  }

  return filteredResults.slice(0, 4);
}

/**
 * Requirement 13: NEAREST BUS STOP (GPS)
 * Function: findNearbyStops(latitude, longitude)
 * Return: Stop name, Distance, District, Locality, Available buses
 */
export function findNearbyStops(
  latitude: number, 
  longitude: number, 
  maxCount: number = 8,
  stops: BusStop[] = BUS_STOPS,
  routes: BusRoute[] = BUS_ROUTES
) {
  const calculated = stops
    .filter(s => s.is_active && s.latitude && s.longitude)
    .map(stop => {
      const distKm = calculateDistanceKm(latitude, longitude, stop.latitude, stop.longitude);
      const buses = getBusesAtStop(stop.id, routes);
      const district = DISTRICTS.find(d => d.id === stop.district_id);

      return {
        stop,
        distance_km: distKm,
        distance_meters: Math.round(distKm * 1000),
        district_name: district ? district.nameEN : stop.district_id,
        district_name_ta: district ? district.nameTA : stop.district_id,
        locality: stop.locality,
        available_buses: buses
      };
    });

  calculated.sort((a, b) => a.distance_km - b.distance_km);
  return calculated.slice(0, maxCount);
}

/**
 * Requirement 14: DESTINATION LANDMARK RESOLVER
 * Resolves place/landmark or stop query to the nearest registered bus stop
 */
export function resolveDestination(
  query: string,
  landmarks: PlaceLandmark[] = PLACES_LANDMARKS,
  stops: BusStop[] = BUS_STOPS
): { stop: BusStop; landmark?: PlaceLandmark; walking_m: number } | null {
  const normalized = (query || '').trim().toLowerCase();
  if (!normalized) return null;

  // 1. Direct Stop Match
  const directStop = stops.find(s => 
    s && (
      (s.stop_name || '').toLowerCase().includes(normalized) ||
      (s.stop_name_ta || '').includes(normalized) ||
      (s.aliases || []).some(a => (a || '').toLowerCase().includes(normalized))
    )
  );

  if (directStop) {
    return { stop: directStop, walking_m: 0 };
  }

  // 2. Landmark Match
  const directLandmark = landmarks.find(l =>
    l && (
      (l.name || '').toLowerCase().includes(normalized) ||
      (l.nameTA && l.nameTA.includes(normalized)) ||
      (l.aliases || []).some(a => (a || '').toLowerCase().includes(normalized))
    )
  );

  if (directLandmark) {
    const targetStop = stops.find(s => s && s.id === directLandmark.nearest_stop_id);
    if (targetStop) {
      return { 
        stop: targetStop, 
        landmark: directLandmark, 
        walking_m: directLandmark.distance_to_stop_m || 100
      };
    }
  }

  return null;
}

/**
 * Requirement 18: SEARCH ACROSS TAMIL NADU
 * Global universal search across all 38 districts
 */
export function searchGlobal(
  query: string,
  stops: BusStop[] = BUS_STOPS,
  routes: BusRoute[] = BUS_ROUTES,
  districts: District[] = DISTRICTS,
  landmarks: PlaceLandmark[] = PLACES_LANDMARKS
) {
  const q = (query || '').trim().toLowerCase();
  if (!q) {
    return { stops: [], routes: [], districts: [], landmarks: [] };
  }

  // Matching Districts
  const matchedDistricts = districts.filter(d => 
    d && (
      (d.nameEN || '').toLowerCase().includes(q) || 
      (d.nameTA || '').includes(q) || 
      (d.code || '').toLowerCase().includes(q) ||
      (d.headquartersEN || '').toLowerCase().includes(q)
    )
  );

  // Matching Stops
  const matchedStops = stops.filter(s =>
    s && s.is_active && (
      (s.stop_name || '').toLowerCase().includes(q) ||
      (s.stop_name_ta || '').includes(q) ||
      (s.locality || '').toLowerCase().includes(q) ||
      (s.town || '').toLowerCase().includes(q) ||
      (s.aliases || []).some(a => (a || '').toLowerCase().includes(q)) ||
      (s.nearby_landmarks || []).some(l => (l || '').toLowerCase().includes(q))
    )
  );

  // Matching Routes by Bus Number or Name
  const matchedRoutes = routes.filter(r =>
    r && r.status !== 'INACTIVE' && (
      (r.route_number || '').toLowerCase().includes(q) ||
      (r.route_name || '').toLowerCase().includes(q) ||
      (r.route_name_ta && r.route_name_ta.includes(q)) ||
      (r.operator || '').toLowerCase().includes(q)
    )
  );

  // Matching Landmarks
  const matchedLandmarks = landmarks.filter(l =>
    l && (
      (l.name || '').toLowerCase().includes(q) ||
      (l.nameTA && l.nameTA.includes(q)) ||
      (l.locality || '').toLowerCase().includes(q) ||
      (l.aliases || []).some(a => (a || '').toLowerCase().includes(q))
    )
  );

  return {
    districts: matchedDistricts,
    stops: matchedStops,
    routes: matchedRoutes,
    landmarks: matchedLandmarks
  };
}

/**
 * Requirement 22: DATA VALIDATION ENGINE
 * Validates a route before marking as VERIFIED
 */
export function validateRoute(
  route: BusRoute,
  stops: BusStop[] = BUS_STOPS,
  districts: District[] = DISTRICTS
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!route.route_number || route.route_number.trim() === '') {
    errors.push('Route number cannot be empty.');
  }

  if (!route.origin_stop_id || !stops.some(s => s.id === route.origin_stop_id)) {
    errors.push(`Origin stop ID "${route.origin_stop_id}" does not exist in stops database.`);
  }

  if (!route.destination_stop_id || !stops.some(s => s.id === route.destination_stop_id)) {
    errors.push(`Destination stop ID "${route.destination_stop_id}" does not exist in stops database.`);
  }

  if (!route.stops || route.stops.length < 2) {
    errors.push('Route must contain at least 2 ordered stops.');
  } else {
    // Check every stop in sequence
    const seenOrders = new Set<number>();
    const seenStopIds = new Set<string>();

    for (let i = 0; i < route.stops.length; i++) {
      const rs = route.stops[i];
      if (!stops.some(s => s.id === rs.stop_id)) {
        errors.push(`Route stop at index ${i} with ID "${rs.stop_id}" does not exist in database.`);
      }
      if (seenOrders.has(rs.stop_order)) {
        errors.push(`Duplicate stop order ${rs.stop_order} detected in route.`);
      }
      seenOrders.add(rs.stop_order);
      seenStopIds.add(rs.stop_id);
    }
  }

  for (const dId of route.district_ids) {
    if (!districts.some(d => d.id === dId)) {
      errors.push(`District ID "${dId}" does not exist.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
