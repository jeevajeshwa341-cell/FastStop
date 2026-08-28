import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Bus as BusIcon, 
  Clock, 
  ChevronRight, 
  Radio, 
  Layers, 
  ShieldCheck, 
  Navigation,
  Compass,
  ArrowRight,
  Filter,
  CheckCircle
} from 'lucide-react';
import { BusStop, BusRoute, District } from '../types';
import { BUS_STOPS } from '../data/stops';
import { BUS_ROUTES } from '../data/routes';
import { DISTRICTS } from '../data/districts';
import { getBusesAtStop, getRoutesAtStop } from '../transportEngine';

interface StopExplorerProps {
  tamilLanguage: boolean;
  onSelectRoute: (routeId: string, busNumber?: string) => void;
  initialDistrictId?: string | null;
}

// Helper to match district flexibly across names, codes, and IDs
function matchesDistrict(districtId: string | undefined, filter: string): boolean {
  if (!filter || filter === 'all') return true;
  if (!districtId) return false;
  if (districtId === filter) return true;
  
  const normFilter = filter.toLowerCase().replace('dist_', '');
  const normDist = districtId.toLowerCase().replace('dist_', '');
  if (normDist === normFilter) return true;

  if (normFilter === 'chennai') {
    return ['dist_chennai', 'dist_chengalpattu', 'dist_kancheepuram', 'dist_tiruvallur', 'chennai', 'chengalpattu', 'kancheepuram', 'tiruvallur'].includes(districtId.toLowerCase());
  }
  return false;
}

export default function StopExplorer({
  tamilLanguage,
  onSelectRoute,
  initialDistrictId
}: StopExplorerProps) {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(() => {
    if (!initialDistrictId) return 'all';
    if (initialDistrictId.toLowerCase().includes('chennai')) return 'dist_chennai';
    if (initialDistrictId.toLowerCase().includes('coimbatore')) return 'dist_coimbatore';
    return initialDistrictId;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(
    BUS_STOPS.find(s => s.id === 'stop_chn_cmbt') || BUS_STOPS.find(s => s.id === 'stop_cbe_sns_tech') || BUS_STOPS[0]
  );

  // Filter stops by district and search query
  const filteredStops = useMemo(() => {
    const q = (searchQuery || '').toLowerCase().trim();
    return BUS_STOPS.filter(stop => {
      if (!stop) return false;
      const matchDistrict = matchesDistrict(stop.district_id, selectedDistrictId);
      const matchQuery = !q || (
        (stop.stop_name || '').toLowerCase().includes(q) ||
        (stop.stop_name_ta || '').includes(q) ||
        (stop.locality || '').toLowerCase().includes(q) ||
        (stop.town || '').toLowerCase().includes(q) ||
        (stop.aliases || []).some(a => (a || '').toLowerCase().includes(q))
      );
      return matchDistrict && matchQuery;
    });
  }, [selectedDistrictId, searchQuery]);

  // Routes and Buses at the currently selected stop
  const busesAtSelectedStop = useMemo(() => {
    if (!selectedStop) return [];
    return getBusesAtStop(selectedStop.id);
  }, [selectedStop]);

  const passingRoutesAtSelectedStop = useMemo(() => {
    if (!selectedStop) return [];
    return getRoutesAtStop(selectedStop.id);
  }, [selectedStop]);

  const selectedDistrictData = useMemo(() => {
    if (!selectedStop) return null;
    return DISTRICTS.find(d => d.id === selectedStop.district_id);
  }, [selectedStop]);

  return (
    <div id="tn-local-stop-explorer" className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-slate-200 dark:border-[#1e3a6e] p-5 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 rounded-lg shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span>{tamilLanguage ? "தமிழக உள்ளூர் பேருந்து நிறுத்தங்கள் தரவுத்தளம்" : "Local Bus Stop Database & Real-Time Schedule"}</span>
              <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full uppercase border border-blue-300/40">
                Verified TNSTC & MTC
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {tamilLanguage
                ? "எந்த ஒரு நிறுத்தத்தையும் தேடி, அங்கு நிற்கும் அனைத்து பேருந்து எண்கள் மற்றும் புறப்படும் நேரங்களைக் காண்க."
                : "Explore all bus stops across 38 districts with automated bus number lists, downstream stops & next bus ETAs."}
            </p>
          </div>
        </div>

        {/* District Selector Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedDistrictId}
            onChange={(e) => setSelectedDistrictId(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00d4ff] cursor-pointer"
          >
            <option value="all">{tamilLanguage ? "அனைத்து 38 மாவட்டங்கள்" : "All 38 Districts"}</option>
            {DISTRICTS.map(d => (
              <option key={d.id} value={d.id}>
                {d.nameEN} ({d.nameTA})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Split View: Left List of Stops, Right Selected Stop Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Stops Search and List (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tamilLanguage ? "நிறுத்தம் / இடம் தேடு (எ.கா. சரவணம்பட்டி, செந்துறை...)" : "Search stop (e.g., Saravanampatti, Sendurai, SNS Tech...)"}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Stops List */}
          <div className="h-[460px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredStops.length > 0 ? (
              filteredStops.map(stop => {
                const isSelected = selectedStop?.id === stop.id;
                const busesCount = getBusesAtStop(stop.id).length;
                const district = DISTRICTS.find(d => d.id === stop.district_id);

                return (
                  <button
                    key={stop.id}
                    onClick={() => setSelectedStop(stop)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between group transition cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500 shadow-sm'
                        : 'bg-white dark:bg-slate-950/40 border-slate-100 dark:border-slate-800 hover:border-emerald-400/40 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold block truncate ${isSelected ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                          {tamilLanguage ? stop.stop_name_ta : stop.stop_name}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">
                        {district?.nameEN} · {stop.locality}, {stop.town}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {busesCount > 0 ? (
                        <span className="text-[10px] font-mono font-bold bg-[#003580] text-white dark:bg-[#00d4ff] dark:text-[#0f1f3d] px-2 py-0.5 rounded">
                          {busesCount} Buses
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          Terminal
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12 text-xs text-slate-400">
                {tamilLanguage ? "நிறுத்தங்கள் எதுவும் கிடைக்கவில்லை" : "No bus stops match your query."}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Stop Deep Dive Card (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {selectedStop ? (
            <div className="bg-slate-50/70 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col gap-4 h-full">
              
              {/* Stop Title & Hierarchy Breadcrumbs */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  {/* Transportation Hierarchy Breadcrumbs */}
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 flex-wrap mb-1.5">
                    <span className="font-bold text-[#003580] dark:text-[#00d4ff]">{selectedDistrictData?.nameEN}</span>
                    <span>/</span>
                    <span>{selectedStop.town}</span>
                    <span>/</span>
                    <span className="text-slate-600 dark:text-slate-300 font-semibold">{selectedStop.locality}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                    {selectedStop.stop_name}
                  </h3>
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                    {selectedStop.stop_name_ta} · Coordinates: {selectedStop.latitude.toFixed(4)}, {selectedStop.longitude.toFixed(4)}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-300/40 px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {selectedStop.verification_status}
                  </span>
                </div>
              </div>

              {/* Requirement 6: AUTOMATIC BUS NUMBERS AT EACH STOP */}
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  {tamilLanguage ? "இந்த நிறுத்தத்தில் நிற்கும் பேருந்துகள்:" : "Active Buses Stopping at this Stop:"}
                </span>

                {busesAtSelectedStop.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {busesAtSelectedStop.map((busNum, idx) => (
                      <span
                        key={idx}
                        className="font-mono font-black text-xs bg-[#003580] text-[#00d4ff] dark:bg-[#00d4ff] dark:text-[#0f1f3d] px-3 py-1 rounded-lg shadow-sm"
                      >
                        BUS {busNum}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic">
                    {tamilLanguage ? "பேருந்துகள் எதுவும் ஒதுக்கப்படவில்லை" : "No active bus numbers registered for this local stop yet."}
                  </div>
                )}
              </div>

              {/* Passing Routes with Real-time ETAs & Downstream Stops */}
              <div className="flex-1">
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
                  {tamilLanguage ? "வழித்தட அட்டவணை & அடுத்த நிறுத்தங்கள்:" : "Passing Routes Schedule & Downstream Destinations:"}
                </span>

                {passingRoutesAtSelectedStop.length > 0 ? (
                  <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
                    {passingRoutesAtSelectedStop.map((pRoute, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs bg-slate-900 text-white dark:bg-slate-800 dark:text-[#00d4ff] px-2 py-0.5 rounded">
                              {pRoute.route.route_number}
                            </span>
                            <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                              {pRoute.route.route_name}
                            </span>
                          </div>

                          <button
                            onClick={() => onSelectRoute(pRoute.route.id, pRoute.route.route_number)}
                            className="text-[11px] font-bold text-[#003580] dark:text-[#00d4ff] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Track</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Downstream Next Stops */}
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-slate-700 dark:text-slate-300">Next Stops:</strong>{' '}
                            {pRoute.next_stops.length > 0
                              ? pRoute.next_stops.slice(0, 4).join(' ➔ ') + (pRoute.next_stops.length > 4 ? ' ➔ ...' : '')
                              : 'Final Destination Stop'}
                          </span>
                        </div>

                        {/* ETA Banner */}
                        <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-slate-100 dark:border-slate-900">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {pRoute.eta_text}
                          </span>
                          <span className="text-slate-400">
                            {pRoute.route.operator}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400">
                    {tamilLanguage ? "நேரடி சேவைகள் எதுவும் இல்லை" : "No live scheduled routes passing through this stop."}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-center text-xs text-slate-400 border border-dashed rounded-xl">
              {tamilLanguage ? "விவரங்களைக் காண இடதுபுறம் உள்ள ஒரு நிறுத்தத்தைத் தேர்ந்தெடுக்கவும்" : "Select a bus stop on the left to inspect its complete transportation schedule."}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
