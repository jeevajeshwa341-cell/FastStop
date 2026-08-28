import React, { useState } from 'react';
import { findNearbyStops } from '../transportEngine';
import { BUS_ROUTES } from '../data/routes';
import { BusStop } from '../types';
import { MapPin, Navigation, Signal, ArrowRight, Compass, ShieldAlert, CheckCircle, RefreshCw, Bus as BusIcon } from 'lucide-react';

interface NearbyStopsProps {
  tamilLanguage: boolean;
  onTrackBus: (routeId: string, busNumber?: string) => void;
  allBuses?: any[];
}

export default function NearbyStops({ tamilLanguage, onTrackBus }: NearbyStopsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyStopsList, setNearbyStopsList] = useState<Array<ReturnType<typeof findNearbyStops>[0]>>([]);

  // Major cities to simulate user's position as an elegant fallback
  const simulatedLocations = [
    { name: "Coimbatore (Saravanampatti)", lat: 11.0776, lng: 77.0062 },
    { name: "Coimbatore (Gandhipuram)", lat: 11.0168, lng: 76.9678 },
    { name: "Ariyalur (Sendurai)", lat: 11.2850, lng: 79.1670 },
    { name: "Ariyalur (Central Stand)", lat: 11.1404, lng: 79.0785 },
    { name: "Chennai (CMBT Koyambedu)", lat: 13.0612, lng: 80.2084 },
    { name: "Trichy (Central Stand)", lat: 10.7905, lng: 78.7047 },
    { name: "Madurai (Mattuthavani)", lat: 9.9252, lng: 78.1198 }
  ];

  const processStopsForCoords = (lat: number, lng: number) => {
    setUserCoords({ lat, lng });
    setError(null);

    // Call unified transportEngine method
    const results = findNearbyStops(lat, lng, 6);
    setNearbyStopsList(results);
    setLoading(false);
  };

  const handleGetCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(tamilLanguage ? "உங்கள் உலாவி புவிஇருப்பிடத்தை ஆதரிக்கவில்லை." : "Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        processStopsForCoords(latitude, longitude);
      },
      (err) => {
        const detail = err.code === 1
          ? "Permission denied or blocked in iframe sandbox"
          : err.code === 2
          ? "Position coordinates unavailable"
          : err.code === 3
          ? "GPS scanning timed out"
          : err.message || "Unavailable";
        console.warn(`[Geolocation] Location access notice: ${detail}`);
        setError(
          tamilLanguage 
            ? "புவிஇருப்பிட அணுகல் மறுக்கப்பட்டது அல்லது கிடைக்கவில்லை. கீழே உள்ள ஒரு முக்கிய நகரத்தைத் தேர்வு செய்து சோதிக்கவும்." 
            : "Geolocation access denied or unavailable in current environment. Please select a city below for instant preview."
        );
        setLoading(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return (
    <div id="nearby-stops-section" className="bg-[#0f1f3d] text-white rounded-xl p-6 shadow-md border border-slate-700/60 relative overflow-hidden">
      {/* Structural accent bar */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#00d4ff]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Compass className="w-5 h-5 text-[#00d4ff] animate-spin-slow" />
            <h3 className="text-lg font-bold tracking-tight">
              {tamilLanguage ? "அருகிலுள்ள பேருந்து நிறுத்தங்கள் & நேரலை பேருந்துகள்" : "Nearest Bus Stops & Live Departures"}
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            {tamilLanguage 
              ? "உங்கள் ஜிபிஎஸ் இருப்பிடத்தைக் கண்டறிந்து, அருகில் நிற்கும் அனைத்து பேருந்து எண்களையும் பார்க்கவும்" 
              : "Detect your real-time physical position and display passing live buses with Haversine distance."}
          </p>
        </div>

        <button
          onClick={handleGetCurrentLocation}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#00d4ff] hover:bg-[#00a8cc] active:scale-[0.98] disabled:bg-slate-800 text-[#0f1f3d] font-mono font-black px-5 py-2.5 rounded-lg shadow-sm transition-all text-xs shrink-0 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="uppercase tracking-wider">{tamilLanguage ? "கண்டறிகிறது..." : "Scanning GPS..."}</span>
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              <span className="uppercase tracking-wider">{tamilLanguage ? "தற்போதைய இடம்" : "Use GPS Location"}</span>
            </>
          )}
        </button>
      </div>

      {/* Geolocation Fallback Simulation Buttons */}
      {error && (
        <div className="mb-6 p-4 bg-slate-950 border border-rose-500/30 rounded-lg flex flex-col gap-3">
          <div className="flex gap-2 items-start text-xs text-rose-300">
            <ShieldAlert className="w-4.5 h-4.5 shrink-0 mt-0.5 text-rose-500" />
            <p className="font-sans">{error}</p>
          </div>
          
          <div className="pt-2.5 border-t border-slate-800">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {tamilLanguage ? "அல்லது சோதிக்க ஒரு இடத்தை உருவகப்படுத்தவும்:" : "Or simulate your location for preview:"}
            </span>
            <div className="flex flex-wrap gap-2">
              {simulatedLocations.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => processStopsForCoords(loc.lat, loc.lng), 300);
                  }}
                  className="text-[10px] font-mono font-bold bg-slate-800 hover:bg-[#003580] border border-slate-700 text-slate-200 px-3 py-1.5 rounded transition cursor-pointer"
                >
                  📍 {loc.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active simulation display status */}
      {userCoords && !error && (
        <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="font-sans font-medium">
              {tamilLanguage 
                ? "இருப்பிடம் ஒத்திசைக்கப்பட்டது! அருகிலுள்ள 6 நிறுத்தங்கள் பட்டியலிடப்பட்டுள்ளன" 
                : "Coordinates synced! Closest verified bus stops loaded successfully."}
            </span>
          </div>
          <span className="font-mono text-[10px] bg-slate-950 px-2 py-0.5 rounded text-emerald-400 border border-emerald-500/10">
            {userCoords.lat.toFixed(4)}, {userCoords.lng.toFixed(4)}
          </span>
        </div>
      )}

      {/* Nearby Stops List */}
      {nearbyStopsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearbyStopsList.map((item, idx) => {
            return (
              <div 
                key={idx}
                className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 hover:border-[#00d4ff] transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm leading-snug">
                        {tamilLanguage ? item.stop.stop_name_ta : item.stop.stop_name}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {item.district_name} · {item.locality}, {item.stop.town}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#FF6B00] text-white px-2 py-0.5 rounded shrink-0">
                      {item.distance_km < 1 ? `${item.distance_meters}m` : `${item.distance_km.toFixed(1)} km`}
                    </span>
                  </div>

                  {/* Passing buses list */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80">
                    <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider block mb-2">
                      {tamilLanguage ? "கிடைக்கும் பேருந்துகள்:" : "Available Buses Stopping Here:"}
                    </span>

                    {item.available_buses.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {item.available_buses.map((busNum) => {
                          const route = BUS_ROUTES.find(r => r.route_number === busNum);
                          return (
                            <button
                              key={busNum}
                              onClick={() => {
                                if (route) {
                                  onTrackBus(route.id, busNum);
                                }
                              }}
                              className="text-[10px] font-mono font-bold bg-[#003580] hover:bg-[#00d4ff] hover:text-[#0f1f3d] text-white px-2 py-1 rounded transition flex items-center gap-1 cursor-pointer border border-[#00d4ff]/20"
                              title={route ? route.route_name : `Bus ${busNum}`}
                            >
                              <span>🚌 {busNum}</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 italic">
                        {tamilLanguage ? "பேருந்துகள் எதுவும் ஒதுக்கப்படவில்லை" : "Terminal checkpoint"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2 text-[9px] font-mono text-slate-500 flex items-center justify-between border-t border-slate-850">
                  <span>{item.stop.stop_type}</span>
                  <span className="text-emerald-400">✓ {item.stop.verification_status}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !loading && !error && (
          <div className="text-center py-8 bg-slate-950/40 border border-slate-800/60 rounded-xl">
            <MapPin className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-xs text-slate-400">
              {tamilLanguage 
                ? "இருப்பிடம் எதுவும் கண்டறியப்படவில்லை. 'தற்போதைய இடம்' பொத்தானை அழுத்தவும்." 
                : "No location scanned yet. Click 'Use GPS Location' to view nearby bus terminals and passing active routes."}
            </p>
          </div>
        )
      )}

    </div>
  );
}
