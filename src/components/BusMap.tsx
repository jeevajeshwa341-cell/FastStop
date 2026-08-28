import { useEffect, useRef, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef, useMap } from '@vis.gl/react-google-maps';
import { Map as MapIcon, Globe, Settings, X, ChevronRight, Activity } from 'lucide-react';
import { Bus, Route, Stop } from '../data';

interface BusMapProps {
  bus: Bus;
  route: Route;
  tamilLanguage: boolean;
  fitBoundsTrigger?: number; // Increment to force map to fit route bounds
  allBuses?: Bus[];
  allRoutes?: Route[];
  onSelectBus?: (busId: string, routeId: string) => void;
}

const GOOGLE_API_KEY =
  (typeof process !== 'undefined' && process.env?.GOOGLE_MAPS_PLATFORM_KEY) ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidGoogleKey = Boolean(GOOGLE_API_KEY) && 
  GOOGLE_API_KEY !== 'YOUR_API_KEY' && 
  GOOGLE_API_KEY !== 'DEMO_KEY' &&
  GOOGLE_API_KEY.length >= 25 && 
  GOOGLE_API_KEY.startsWith('AIza');

// Leaflet Map Global Object Reference
const L = (window as any).L;

// --- Google Maps Polyline helper component ---
function RoutePolyline({ stops, fitBoundsTrigger }: { stops: Stop[]; fitBoundsTrigger?: number }) {
  const map = useMap();
  const polylineInnerRef = useRef<google.maps.Polyline | null>(null);
  const polylineOuterRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map) return;

    if (polylineInnerRef.current) {
      polylineInnerRef.current.setMap(null);
      polylineInnerRef.current = null;
    }
    if (polylineOuterRef.current) {
      polylineOuterRef.current.setMap(null);
      polylineOuterRef.current = null;
    }

    const path = stops.map(s => ({ lat: s.lat, lng: s.lng }));
    
    // Outer dark blue outline/border for premium road mapping effect
    const polylineOuter = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#0a0ea3',
      strokeOpacity: 0.85,
      strokeWeight: 9,
    });

    // Inner vibrant royal/neon blue route line
    const polylineInner = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#1b28e6',
      strokeOpacity: 1.0,
      strokeWeight: 5,
    });

    polylineOuter.setMap(map);
    polylineInner.setMap(map);
    
    polylineOuterRef.current = polylineOuter;
    polylineInnerRef.current = polylineInner;

    const bounds = new google.maps.LatLngBounds();
    path.forEach(p => bounds.extend(p));
    map.fitBounds(bounds, {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    });

    return () => {
      if (polylineInnerRef.current) {
        polylineInnerRef.current.setMap(null);
      }
      if (polylineOuterRef.current) {
        polylineOuterRef.current.setMap(null);
      }
    };
  }, [map, stops, fitBoundsTrigger]);

  return null;
}

// --- Google Maps Stop Marker ---
function GoogleStopMarker({ stop, index, stopCount, tamilLanguage }: { stop: Stop; index: number; stopCount: number; tamilLanguage: boolean; key?: string }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [open, setOpen] = useState(false);

  const isFirst = index === 0;
  const isLast = index === stopCount - 1;
  const pinColor = isFirst ? '#2ecc71' : isLast ? '#ff4757' : '#00d4ff';
  const stopNumber = index + 1;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: stop.lat, lng: stop.lng }}
        onClick={() => setOpen(true)}
      >
        <div className="group relative flex flex-col items-center" style={{ width: '28px', height: '28px' }}>
          <div 
            className="h-7 w-7 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all hover:scale-110 cursor-pointer text-white font-mono font-bold text-[10px]" 
            style={{ backgroundColor: pinColor }}
          >
            {stopNumber}
          </div>
          <div className="absolute -top-12 px-2 py-0.5 bg-white text-black text-[9px] rounded whitespace-nowrap border-2 border-black shadow-md flex flex-col items-center z-[9999]">
            <span className="font-extrabold text-black uppercase leading-tight">{tamilLanguage ? stop.nameTA : stop.nameEN}</span>
            <span className="text-[7.5px] font-bold text-slate-800 leading-none mt-0.5">{stop.district}</span>
          </div>
        </div>
      </AdvancedMarker>
      {open && (
        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)}>
          <div className="p-1 font-sans text-xs text-slate-800">
            <p className="text-[9px] text-[#003580] font-bold uppercase tracking-wider m-0 leading-none">
              {tamilLanguage ? 'பேருந்து நிறுத்தம் ' + stopNumber : 'Bus Stop ' + stopNumber}
            </p>
            <h4 className="text-xs font-bold text-slate-800 m-0 mt-1 leading-tight">{stop.nameEN}</h4>
            <h4 className="text-xs font-semibold text-slate-500 m-0 mt-0.5 leading-tight">{stop.nameTA}</h4>
            <div className="mt-1.5 pt-1 border-t border-slate-100 text-[9px] text-slate-400 font-mono">
              District: {stop.district}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

// --- Google Maps Bus Pin ---
function GoogleBusPin({ position, bus, route, tamilLanguage }: {
  position: { lat: number; lng: number };
  bus: Bus;
  route: Route;
  tamilLanguage: boolean;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={() => setOpen(true)}
      >
        <div className="relative flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
          <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-blue-500 opacity-50"></span>
          <div className="relative flex items-center justify-center bg-[#003580] text-white rounded-lg p-1.5 w-8 h-8 shadow-md border border-white">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3C13 6.8 11.8 6 10.5 6H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h3"/>
              <circle cx="7" cy="17" r="2"/>
              <path d="M9 17h6"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
          </div>
        </div>
      </AdvancedMarker>
      {open && (
        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)}>
          <div className="p-1 font-sans text-xs text-slate-800">
            <div className="flex items-center gap-1.5 bg-[#2ecc71]/10 text-[#2ecc71] font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider mb-1 w-max">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2ecc71] animate-pulse"></span>
              <span>{tamilLanguage ? 'நேரடி கண்காணிப்பு' : 'Live Track'}</span>
            </div>
            <h4 className="text-xs font-bold text-slate-800 m-0">{tamilLanguage ? 'வண்டி எண்' : 'Bus No'}: {bus.busNumber}</h4>
            <p className="text-[10px] text-slate-500 m-0 mt-0.5">{bus.speed} km/h • {route.type}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function BusMap({ 
  bus, 
  route, 
  tamilLanguage, 
  fitBoundsTrigger = 0,
  allBuses = [],
  allRoutes = [],
  onSelectBus
}: BusMapProps) {
  // Use "leaflet" as the default primary map as requested ("give me you first create maps okk give me add")
  const [mapType, setMapType] = useState<'leaflet' | 'google'>('leaflet');
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [googleKeyError, setGoogleKeyError] = useState(false);
  const [showKeyGuide, setShowKeyGuide] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(9);

  // Leaflet references
  const leafletContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const leafletPolylineRef = useRef<any>(null);
  const leafletMarkersRef = useRef<any[]>([]);
  const leafletBusMarkerRef = useRef<any>(null);
  const leafletBusMarkersRef = useRef<any[]>([]);

  // Hook into Google Maps auth failure callback
  useEffect(() => {
    (window as any).gm_authFailure = () => {
      console.warn("Google Maps Key authentication failed.");
      setGoogleKeyError(true);
      setMapType('leaflet'); // Automatic fallback to the beautiful Leaflet map
    };
    return () => {
      try {
        delete (window as any).gm_authFailure;
      } catch (e) {}
    };
  }, []);

  // Calculate live position of the bus based on stop progress
  const getLivePosition = (b: Bus, r: Route) => {
    const stops = r?.stops || [];
    if (stops.length === 0) return null;
    
    const currIdx = Math.min(Math.max(0, b?.currentStopIndex || 0), stops.length - 1);
    let nextIdx = currIdx;
    
    if (b?.direction === 'forward') {
      nextIdx = Math.min(currIdx + 1, stops.length - 1);
    } else {
      nextIdx = Math.max(currIdx - 1, 0);
    }

    const p1 = stops[currIdx];
    const p2 = stops[nextIdx];

    if (!p1 || !p2 || currIdx === nextIdx) {
      return p1 ? { lat: p1.lat, lng: p1.lng } : null;
    }

    const ratio = b?.progressRatio || 0;
    return {
      lat: p1.lat + (p2.lat - p1.lat) * ratio,
      lng: p1.lng + (p2.lng - p1.lng) * ratio
    };
  };

  // Keep currentPosition synced
  useEffect(() => {
    const pos = getLivePosition(bus, route);
    if (pos) {
      setCurrentPosition(pos);
    }
  }, [bus, route]);

  // Leaflet Map Initializer
  useEffect(() => {
    if (mapType !== 'leaflet' || !leafletContainerRef.current || !L) return;

    // Remove old map instance if existing
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    const map = L.map(leafletContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    });

    // Light premium tiles with a clean white/light background
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20
    }).addTo(map);

    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    setZoomLevel(map.getZoom());
    map.on('zoomend', () => {
      setZoomLevel(map.getZoom());
    });

    leafletMapRef.current = map;

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [mapType]);

  // Leaflet Route & Stops syncing
  useEffect(() => {
    const map = leafletMapRef.current;
    if (mapType !== 'leaflet' || !map || !L) return;

    // Clear old markers
    leafletMarkersRef.current.forEach(m => m.remove());
    leafletMarkersRef.current = [];
    if (leafletPolylineRef.current) {
      if (Array.isArray(leafletPolylineRef.current)) {
        leafletPolylineRef.current.forEach(p => p.remove());
      } else {
        leafletPolylineRef.current.remove();
      }
      leafletPolylineRef.current = null;
    }
    if (leafletBusMarkerRef.current) {
      leafletBusMarkerRef.current.remove();
      leafletBusMarkerRef.current = null;
    }

    const stops = route.stops;
    if (stops.length === 0) return;

    const latlngs = stops.map(s => [s.lat, s.lng]);

    // Outer dark blue outline/border for premium road mapping effect
    const polylineOuter = L.polyline(latlngs, {
      color: '#0a0ea3',
      weight: 10,
      opacity: 0.85,
      lineJoin: 'round',
      lineCap: 'round'
    }).addTo(map);

    // Inner vibrant royal/neon blue route line
    const polylineInner = L.polyline(latlngs, {
      color: '#1b28e6',
      weight: 5.5,
      opacity: 1.0,
      lineJoin: 'round',
      lineCap: 'round'
    }).addTo(map);

    leafletPolylineRef.current = [polylineOuter, polylineInner];

    // Stop markers
    stops.forEach((stop, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === stops.length - 1;
      const stopNumber = idx + 1;

      let htmlContent = '';
      let iconAnchorValue: [number, number] = [14, 14];
      let iconSizeValue: [number, number] = [28, 28];

      if (isFirst) {
        iconSizeValue = [42, 42];
        iconAnchorValue = [21, 21];
        htmlContent = `
          <div class="relative flex flex-col items-center justify-center" style="width: 42px; height: 42px;">
            <span class="absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-35 animate-ping"></span>
            <div class="relative h-7.5 w-7.5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-white shadow-lg text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div class="absolute -bottom-3.5 bg-emerald-600 text-white text-[7.5px] font-sans font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wider border border-emerald-400/30 whitespace-nowrap select-none">
              ${tamilLanguage ? "துவக்கம்" : "START"}
            </div>
          </div>
        `;
      } else if (isLast) {
        iconSizeValue = [42, 42];
        iconAnchorValue = [21, 21];
        htmlContent = `
          <div class="relative flex flex-col items-center justify-center" style="width: 42px; height: 42px;">
            <span class="absolute inline-flex h-8 w-8 rounded-full bg-rose-400 opacity-35 animate-ping"></span>
            <div class="relative h-7.5 w-7.5 rounded-full bg-rose-500 flex items-center justify-center border-2 border-white shadow-lg text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                <line x1="4" y1="22" x2="4" y2="15"></line>
              </svg>
            </div>
            <div class="absolute -bottom-3.5 bg-rose-600 text-white text-[7.5px] font-sans font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wider border border-rose-400/30 whitespace-nowrap select-none">
              ${tamilLanguage ? "முடிவு" : "END"}
            </div>
          </div>
        `;
      } else {
        htmlContent = `
          <div class="relative flex flex-col items-center justify-center" style="width: 28px; height: 28px;">
            <div class="h-6 w-6 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white font-mono font-bold text-[9px]" style="background-color: #00d4ff;">
              ${stopNumber}
            </div>
          </div>
        `;
      }

      const stopIcon = L.divIcon({
        html: htmlContent,
        className: '',
        iconSize: iconSizeValue,
        iconAnchor: iconAnchorValue
      });

      const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon })
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 11px; color: #1e293b; padding: 2px;">
            <div style="color: #003580; font-weight: bold; text-transform: uppercase; font-size: 9px; margin-bottom: 2px;">
              ${tamilLanguage ? 'பேருந்து நிறுத்தம் ' + stopNumber : 'Bus Stop ' + stopNumber}
            </div>
            <h4 style="font-weight: bold; margin: 3px 0 1px 0; font-size: 12px; color: #0f172a;">${stop.nameEN}</h4>
            <h4 style="font-weight: 600; margin: 0; color: #64748b; font-size: 11px;">${stop.nameTA}</h4>
            <div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid #e2e8f0; font-family: monospace; font-size: 9px; color: #94a3b8;">
              District: ${stop.district}
            </div>
          </div>
        `)
        .bindTooltip(`
          <div class="flex flex-col items-center justify-center text-center">
            <span class="font-black text-black uppercase leading-tight text-[10px]" style="font-weight: 900; color: #000;">
              ${tamilLanguage ? stop.nameTA : stop.nameEN}
            </span>
            <span class="font-extrabold text-[8px] text-slate-800 leading-none mt-0.5" style="font-weight: 800; color: #1e293b;">
              ${stop.district}
            </span>
          </div>
        `, {
          permanent: true,
          direction: 'top',
          offset: [0, -10],
          className: 'custom-map-tooltip'
        })
        .addTo(map);

      leafletMarkersRef.current.push(marker);
    });

    // Fit view bounds
    try {
      map.fitBounds(polylineInner.getBounds(), {
        padding: [50, 50],
        animate: true,
        duration: 0.8
      });
    } catch (e) {}

  }, [route, mapType, tamilLanguage, fitBoundsTrigger]);

  // Leaflet Live Bus position update (Only show the single tracked bus)
  useEffect(() => {
    const map = leafletMapRef.current;
    if (mapType !== 'leaflet' || !map || !L || !currentPosition) return;

    // Remove old bus/cluster markers if any
    leafletBusMarkersRef.current.forEach(m => m.remove());
    leafletBusMarkersRef.current = [];

    if (leafletBusMarkerRef.current) {
      leafletBusMarkerRef.current.remove();
      leafletBusMarkerRef.current = null;
    }

    const busIcon = L.divIcon({
      html: `
        <div class="relative flex items-center justify-center" style="width: 40px; height: 40px;">
          <span class="absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-40 animate-ping"></span>
          <div class="relative flex items-center justify-center text-white rounded-lg p-1.5 w-7 h-7 shadow-md border border-white" style="background-color: #003580;">
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3C13 6.8 11.8 6 10.5 6H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h3"/>
              <circle cx="7" cy="17" r="2"/>
              <path d="M9 17h6"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
          </div>
          <div class="absolute -top-4 bg-[#0f1f3d] text-white text-[8px] font-mono font-bold px-1 rounded border border-slate-700/80 shadow-sm leading-none py-0.5 whitespace-nowrap">
            ${route.code}
          </div>
        </div>
      `,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const marker = L.marker([currentPosition.lat, currentPosition.lng], { icon: busIcon })
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 11px; color: #1e293b; padding: 2px; min-width: 140px;">
          <div style="display: flex; align-items: center; gap: 4px; background-color: rgba(46, 204, 113, 0.1); color: #2ecc71; font-weight: bold; padding: 2px 6px; border-radius: 4px; font-size: 9px; width: max-content;">
            <span style="height: 6px; width: 6px; border-radius: 50%; background-color: #2ecc71;"></span>
            <span>${tamilLanguage ? 'நேரடி கண்காணிப்பு' : 'Live Tracking'}</span>
          </div>
          <h4 style="font-weight: bold; margin: 5px 0 2px 0; color: #0f172a; font-size: 12px;">🚍 BUS ${bus.busNumber}</h4>
          <p style="margin: 0 0 6px 0; color: #475569; font-size: 10px; font-weight: 500;">Route: ${tamilLanguage ? route.nameTA : route.nameEN}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 6px; font-family: monospace; font-size: 9px; color: #64748b;">
            <span>Speed: ${bus.speed} km/h</span>
            <span>Cap: ${bus.capacity}%</span>
          </div>
        </div>
      `)
      .addTo(map);

    leafletBusMarkerRef.current = marker;

    return () => {
      if (leafletBusMarkerRef.current) {
        leafletBusMarkerRef.current.remove();
        leafletBusMarkerRef.current = null;
      }
    };
  }, [currentPosition, mapType, bus, route, tamilLanguage]);

  const initialCenter = route?.stops?.[0] ? { lat: route.stops[0].lat, lng: route.stops[0].lng } : { lat: 11.0168, lng: 76.9678 };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md flex flex-col">
      
      {/* Dynamic Top Tabs to switch between Leaflet Map and Google Maps */}
      <div className="absolute top-4 left-4 z-[1000] bg-slate-900/90 text-white p-1 rounded-lg shadow-lg border border-slate-800/80 flex items-center gap-1">
        <button
          onClick={() => setMapType('leaflet')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
            mapType === 'leaflet'
              ? 'bg-[#00d4ff] text-[#0f1f3d]'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span>{tamilLanguage ? 'முதல் வரைபடம்' : 'Leaflet Map'}</span>
        </button>

        <button
          onClick={() => {
            if (!hasValidGoogleKey || googleKeyError) {
              setShowKeyGuide(true);
            } else {
              setMapType('google');
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
            mapType === 'google'
              ? 'bg-[#00d4ff] text-[#0f1f3d]'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{tamilLanguage ? 'கூகுள் மேப்ஸ்' : 'Google Maps'}</span>
        </button>
      </div>

      {/* Map views */}
      <div className="flex-1 w-full h-full relative">
        {mapType === 'leaflet' || !hasValidGoogleKey || googleKeyError ? (
          /* Leaflet container */
          <div ref={leafletContainerRef} className="w-full h-full bg-[#0a1424]" />
        ) : (
          /* Google Maps Container */
          <APIProvider 
            apiKey={GOOGLE_API_KEY} 
            version="weekly"
            onError={(error) => {
              console.warn("Google Maps failed to authenticate or load. Switching to Leaflet:", error);
              setGoogleKeyError(true);
              setMapType('leaflet');
            }}
          >
            <Map
              defaultCenter={initialCenter}
              defaultZoom={9}
              mapId="DEMO_MAP_ID"
              gestureHandling="greedy"
              disableDefaultUI={true}
              zoomControl={true}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
            >
              <RoutePolyline stops={route.stops} fitBoundsTrigger={fitBoundsTrigger} />

              {route.stops.map((stop, idx) => (
                <GoogleStopMarker 
                  key={`${stop.nameEN}-${idx}`} 
                  stop={stop} 
                  index={idx} 
                  stopCount={route.stops.length} 
                  tamilLanguage={tamilLanguage} 
                />
              ))}

              {currentPosition && (
                <GoogleBusPin 
                  position={currentPosition} 
                  bus={bus} 
                  route={route} 
                  tamilLanguage={tamilLanguage} 
                />
              )}
            </Map>
          </APIProvider>
        )}
      </div>

      {/* Map overlay in the bottom left */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/90 text-white px-3.5 py-2 rounded-lg shadow-lg border border-slate-800/80 text-[10px] font-mono flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-bold">SYSTEM LATENCY: 14ms · {bus.busNumber} Moving</span>
      </div>

      {/* Map config settings gear on the right */}
      <div className="absolute top-4 right-4 z-[1000]">
        <button 
          onClick={() => setShowKeyGuide(true)}
          className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800/90 text-white border border-slate-800 text-[10px] font-mono px-2.5 py-1.5 rounded-lg shadow-md cursor-pointer transition"
        >
          <Settings className="w-3.5 h-3.5 text-[#00d4ff]" />
          <span>{tamilLanguage ? 'சாவி அமைப்புகள்' : 'API Key Status'}</span>
        </button>
      </div>

      {/* Instruction modal */}
      {showKeyGuide && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-5 bg-white dark:bg-[#0d1e3a] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-mono font-bold tracking-wider text-[#003580] dark:text-[#00d4ff] uppercase">
                Google Maps API Configuration
              </h3>
              <button onClick={() => setShowKeyGuide(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 text-[#003580] dark:text-[#00d4ff] text-left">
              {googleKeyError ? 'API Key Status: Invalid Key' : hasValidGoogleKey ? 'API Key Status: Configured' : 'API Key Status: Missing'}
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed text-left">
              {googleKeyError 
                ? 'The provided GOOGLE_MAPS_PLATFORM_KEY is invalid, restricted, or expired. Automatically using the high-performance Leaflet (OpenStreetMap) view.' 
                : hasValidGoogleKey 
                  ? 'Your custom Google Maps API Key is successfully registered! You can switch back and forth between Leaflet Map and Google Maps.'
                  : 'To unlock Google Maps premium layers, register your custom key in AI Studio. Until configured, Leaflet Map provides zero-config real-time bus coordinates.'}
            </p>

            <div className="text-left text-[11px] font-mono space-y-2 bg-slate-50 dark:bg-slate-950 p-3.5 rounded border border-slate-100 dark:border-slate-900/60 leading-normal">
              <div><strong className="text-slate-700 dark:text-slate-300">1.</strong> Get a key at <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] underline hover:text-[#00a8cc]">Google Cloud Console</a></div>
              <div><strong className="text-slate-700 dark:text-slate-300">2.</strong> Open <strong className="text-slate-700 dark:text-slate-300">Settings</strong> (⚙️ top-right)</div>
              <div><strong className="text-slate-700 dark:text-slate-300">3.</strong> Under <strong className="text-slate-700 dark:text-slate-300">Secrets</strong>, add <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded font-bold text-rose-500">GOOGLE_MAPS_PLATFORM_KEY</code></div>
            </div>

            <button 
              onClick={() => {
                setShowKeyGuide(false);
                if (hasValidGoogleKey && !googleKeyError) {
                  setMapType('google');
                }
              }}
              className="mt-4.5 bg-[#00d4ff] hover:bg-[#00a8cc] text-[#0f1f3d] font-black uppercase text-[10px] tracking-wider py-1.5 px-4 rounded cursor-pointer transition w-full"
            >
              {mapType === 'google' ? 'Stay on Google Maps' : 'Continue using Leaflet'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
