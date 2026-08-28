import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  ArrowLeftRight, 
  Clock, 
  MapPin, 
  Navigation, 
  Bus as BusIcon, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  ChevronRight, 
  Radio, 
  CornerDownRight,
  Filter,
  Layers,
  Zap,
  ExternalLink,
  Globe,
  ChevronDown,
  ChevronUp,
  Train,
  CheckCircle2,
  Bookmark,
  MapPinCheck
} from 'lucide-react';
import { BusStop, BusRoute, DirectBusResult, TransferRouteResult, PlaceLandmark } from '../types';
import { BUS_STOPS, getStopById } from '../data/stops';
import { BUS_ROUTES } from '../data/routes';
import { DISTRICTS } from '../data/districts';
import { PLACES_LANDMARKS } from '../data/places';
import { findDirectBuses, findTransferRoutes } from '../transportEngine';

interface RouteSearchPlannerProps {
  tamilLanguage: boolean;
  onSelectRoute: (routeId: string, busNumber?: string) => void;
  selectedDistrictId?: string | null;
}

// Helper to match district flexibly across names, codes, and IDs
function matchesDistrictFilter(districtId: string | undefined, filter: string): boolean {
  if (!filter || filter === 'all') return true;
  if (!districtId) return false;
  if (districtId === filter) return true;
  
  const normFilter = filter.toLowerCase().replace('dist_', '');
  const normDist = districtId.toLowerCase().replace('dist_', '');
  if (normDist === normFilter) return true;

  // Chennai metropolitan region includes Chennai, Chengalpattu, Kancheepuram, Tiruvallur
  if (normFilter === 'chennai') {
    return ['dist_chennai', 'dist_chengalpattu', 'dist_kancheepuram', 'dist_tiruvallur', 'chennai', 'chengalpattu', 'kancheepuram', 'tiruvallur'].includes(districtId.toLowerCase());
  }
  return false;
}

export default function RouteSearchPlanner({
  tamilLanguage,
  onSelectRoute,
  selectedDistrictId
}: RouteSearchPlannerProps) {
  // Input states
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [fromStop, setFromStop] = useState<BusStop | null>(null);
  const [toStop, setToStop] = useState<BusStop | null>(null);
  const [fromLandmark, setFromLandmark] = useState<PlaceLandmark | null>(null);
  const [toLandmark, setToLandmark] = useState<PlaceLandmark | null>(null);

  // Quick preset filter (supports 'all', 'dist_chennai', 'dist_coimbatore', etc.)
  const [filterDistrict, setFilterDistrict] = useState<string>(() => {
    if (!selectedDistrictId) return 'all';
    if (selectedDistrictId.toLowerCase().includes('chennai')) return 'dist_chennai';
    if (selectedDistrictId.toLowerCase().includes('coimbatore')) return 'dist_coimbatore';
    return selectedDistrictId;
  });

  // Selected Chennai Sub-Hub Filter
  const [chennaiHubFilter, setChennaiHubFilter] = useState<string>('all');

  // Expanded route stops index in result card
  const [expandedRouteStops, setExpandedRouteStops] = useState<string | null>(null);

  // Direct route number quick lookup state
  const [busNoSearch, setBusNoSearch] = useState<string>('');

  // Sync when selectedDistrictId prop updates
  useEffect(() => {
    if (selectedDistrictId) {
      if (selectedDistrictId.toLowerCase().includes('chennai')) {
        setFilterDistrict('dist_chennai');
      } else if (selectedDistrictId.toLowerCase().includes('coimbatore')) {
        setFilterDistrict('dist_coimbatore');
      } else {
        setFilterDistrict(selectedDistrictId);
      }
    }
  }, [selectedDistrictId]);

  // Direct and Transfer Search Results
  const directResults: DirectBusResult[] = useMemo(() => {
    if (!fromStop || !toStop) return [];
    return findDirectBuses(fromStop.id, toStop.id);
  }, [fromStop, toStop]);

  const transferResults: TransferRouteResult[] = useMemo(() => {
    if (!fromStop || !toStop || directResults.length > 0) return [];
    return findTransferRoutes(fromStop.id, toStop.id);
  }, [fromStop, toStop, directResults]);

  // Filtered Chennai & Tamil Nadu quick preset routes
  const quickPresets = useMemo(() => {
    const allPresets = [
      // Chennai MTC Arterial Presets
      {
        label: 'CMBT ➔ Siruseri IT Park (OMR 570S)',
        labelTA: 'கோயம்பேடு ➔ சிறுசேரி IT பார்க் (570S)',
        fromId: 'stop_chn_cmbt',
        toId: 'stop_cgl_siruseri_sipcot',
        district: 'dist_chennai',
        hub: 'omr',
        operator: 'MTC Express'
      },
      {
        label: 'Broadway ➔ Kelambakkam (102 Express)',
        labelTA: 'பிராட்வே ➔ கேளம்பாக்கம் (102)',
        fromId: 'stop_chn_broadway',
        toId: 'stop_cgl_kelambakkam_bs',
        district: 'dist_chennai',
        hub: 'omr',
        operator: 'MTC Deluxe'
      },
      {
        label: 'Adyar Depot ➔ Mahabalipuram (ECR 588)',
        labelTA: 'அடையாறு ➔ மாமல்லபுரம் (588)',
        fromId: 'stop_chn_adyar',
        toId: 'stop_cgl_mamallapuram',
        district: 'dist_chennai',
        hub: 'ecr',
        operator: 'MTC Express'
      },
      {
        label: 'Tambaram ➔ Velachery (Bus 91 Direct)',
        labelTA: 'தாம்பரம் ➔ வேளச்சேரி (91)',
        fromId: 'stop_chn_tambaram',
        toId: 'stop_chn_velachery',
        district: 'dist_chennai',
        hub: 'tambaram',
        operator: 'MTC Ordinary'
      },
      {
        label: 'T. Nagar ➔ Thiruvanmiyur (Bus 29C / 95)',
        labelTA: 'தி.நகர் ➔ திருவான்மியூர் (29C)',
        fromId: 'stop_chn_t_nagar',
        toId: 'stop_chn_thiruvanmiyur',
        district: 'dist_chennai',
        hub: 'tnagar',
        operator: 'MTC Ordinary'
      },
      {
        label: 'Avadi ➔ Broadway (Bus 71E Direct)',
        labelTA: 'ஆவடி ➔ பிராட்வே (71E)',
        fromId: 'stop_chn_avadi',
        toId: 'stop_chn_broadway',
        district: 'dist_chennai',
        hub: 'avadi',
        operator: 'MTC Deluxe'
      },
      {
        label: 'Tambaram West ➔ CMBT (Bus 70 Express)',
        labelTA: 'தாம்பரம் மேற்கு ➔ கோயம்பேடு (70)',
        fromId: 'stop_chn_tambaram',
        toId: 'stop_chn_cmbt',
        district: 'dist_chennai',
        hub: 'tambaram',
        operator: 'MTC Express'
      },
      {
        label: 'Chennai Central ➔ Thiruvottiyur (Bus 64C / 121A)',
        labelTA: 'சென்னை சென்ட்ரல் ➔ திருவொற்றியூர்',
        fromId: 'stop_chn_central_railway',
        toId: 'stop_chn_tiruvottiyur',
        district: 'dist_chennai',
        hub: 'central',
        operator: 'MTC Town'
      },
      {
        label: 'Besant Nagar ➔ Ayanavaram (Bus 23C)',
        labelTA: 'பெசன்ட் நகர் ➔ அயனாவரம் (23C)',
        fromId: 'stop_chn_besant_nagar',
        toId: 'stop_chn_ayanavaram',
        district: 'dist_chennai',
        hub: 'central',
        operator: 'MTC Ordinary'
      },
      {
        label: 'Ambattur OT ➔ Saidapet (Bus 24C)',
        labelTA: 'அம்பத்தூர் ➔ சைதாப்பேட்டை (24C)',
        fromId: 'stop_chn_ambattur_ot',
        toId: 'stop_chn_saidapet',
        district: 'dist_chennai',
        hub: 'ambattur',
        operator: 'MTC Ordinary'
      },

      // Coimbatore & Regional TN Presets
      {
        label: 'Gandhipuram ➔ SNS College of Technology (45C)',
        labelTA: 'காந்திபுரம் ➔ SNS கல்லூரி (பேருந்து 45C)',
        fromId: 'stop_cbe_gandhipuram_bs',
        toId: 'stop_cbe_sns_tech',
        district: 'dist_coimbatore',
        hub: 'cbe',
        operator: 'TNSTC CBE'
      },
      {
        label: 'Sendurai ➔ Ariyalur Central (Bus 10A)',
        labelTA: 'செந்துறை ➔ அரியலூர் நிலையம் (பேருந்து 10A)',
        fromId: 'stop_arl_sendurai_bs',
        toId: 'stop_arl_ariyalur_bs',
        district: 'dist_ariyalur',
        hub: 'arl',
        operator: 'TNSTC Town'
      },
      {
        label: 'Gandhipuram ➔ Marudhamalai Temple (20C)',
        labelTA: 'காந்திபுரம் ➔ மருதமலை கோவில் (பேருந்து 20C)',
        fromId: 'stop_cbe_gandhipuram_bs',
        toId: 'stop_cbe_marudhamalai',
        district: 'dist_coimbatore',
        hub: 'cbe',
        operator: 'TNSTC Temple'
      },
      {
        label: 'Trichy Central ➔ Srirangam Temple (1C)',
        labelTA: 'திருச்சி ➔ ஸ்ரீரங்கம் கோவில் (பேருந்து 1C)',
        fromId: 'stop_try_central_bs',
        toId: 'stop_try_srirangam',
        district: 'dist_tiruchirappalli',
        hub: 'try',
        operator: 'TNSTC Trichy'
      },
      {
        label: 'Coimbatore ➔ Trichy Express (EXP-101)',
        labelTA: 'கோவை ➔ திருச்சி எக்ஸ்பிரஸ் (EXP-101)',
        fromId: 'stop_cbe_gandhipuram_bs',
        toId: 'stop_try_central_bs',
        district: 'all',
        hub: 'interdistrict',
        operator: 'SETC'
      }
    ];

    if (filterDistrict === 'all') return allPresets;
    return allPresets.filter(p => p.district === 'all' || matchesDistrictFilter(p.district, filterDistrict));
  }, [filterDistrict]);

  // Autocomplete Suggestions for "FROM"
  const fromSuggestions = useMemo(() => {
    if (!fromQuery || fromStop) return { stops: [], landmarks: [], routes: [] };
    const q = (fromQuery || '').toLowerCase().trim();
    if (!q) return { stops: [], landmarks: [], routes: [] };
    
    // Stop matches
    const stopMatches = BUS_STOPS.filter(s =>
      s && matchesDistrictFilter(s.district_id, filterDistrict) &&
      ((s.stop_name || '').toLowerCase().includes(q) ||
       (s.stop_name_ta || '').includes(q) ||
       (s.locality || '').toLowerCase().includes(q) ||
       (s.town || '').toLowerCase().includes(q) ||
       (s.aliases || []).some(a => (a || '').toLowerCase().includes(q)))
    ).slice(0, 7);

    // Landmark matches
    const landmarkMatches = PLACES_LANDMARKS.filter(l =>
      l && matchesDistrictFilter(l.district_id, filterDistrict) &&
      ((l.name || '').toLowerCase().includes(q) ||
       (l.nameTA && l.nameTA.includes(q)) ||
       (l.locality || '').toLowerCase().includes(q) ||
       (l.aliases || []).some(a => (a || '').toLowerCase().includes(q)))
    ).slice(0, 4);

    // Matching routes by bus number
    const routeMatches = BUS_ROUTES.filter(r =>
      r && r.status !== 'INACTIVE' && (
        (r.route_number || '').toLowerCase() === q ||
        (r.route_number || '').toLowerCase().startsWith(q) ||
        (r.route_name || '').toLowerCase().includes(q)
      )
    ).slice(0, 4);

    return { stops: stopMatches, landmarks: landmarkMatches, routes: routeMatches };
  }, [fromQuery, fromStop, filterDistrict]);

  // Autocomplete Suggestions for "TO"
  const toSuggestions = useMemo(() => {
    if (!toQuery || toStop) return { stops: [], landmarks: [], routes: [] };
    const q = (toQuery || '').toLowerCase().trim();
    if (!q) return { stops: [], landmarks: [], routes: [] };

    const stopMatches = BUS_STOPS.filter(s =>
      s && matchesDistrictFilter(s.district_id, filterDistrict) &&
      ((s.stop_name || '').toLowerCase().includes(q) ||
       (s.stop_name_ta || '').includes(q) ||
       (s.locality || '').toLowerCase().includes(q) ||
       (s.town || '').toLowerCase().includes(q) ||
       (s.aliases || []).some(a => (a || '').toLowerCase().includes(q)))
    ).slice(0, 7);

    const landmarkMatches = PLACES_LANDMARKS.filter(l =>
      l && matchesDistrictFilter(l.district_id, filterDistrict) &&
      ((l.name || '').toLowerCase().includes(q) ||
       (l.nameTA && l.nameTA.includes(q)) ||
       (l.locality || '').toLowerCase().includes(q) ||
       (l.aliases || []).some(a => (a || '').toLowerCase().includes(q)))
    ).slice(0, 4);

    const routeMatches = BUS_ROUTES.filter(r =>
      r && r.status !== 'INACTIVE' && (
        (r.route_number || '').toLowerCase() === q ||
        (r.route_number || '').toLowerCase().startsWith(q) ||
        (r.route_name || '').toLowerCase().includes(q)
      )
    ).slice(0, 4);

    return { stops: stopMatches, landmarks: landmarkMatches, routes: routeMatches };
  }, [toQuery, toStop, filterDistrict]);

  // Direct Bus No quick lookup matches
  const busNoResults = useMemo(() => {
    if (!busNoSearch.trim()) return [];
    const q = busNoSearch.trim().toLowerCase();
    return BUS_ROUTES.filter(r =>
      r && r.status !== 'INACTIVE' && (
        r.route_number.toLowerCase().includes(q) ||
        r.route_name.toLowerCase().includes(q) ||
        (r.route_name_ta && r.route_name_ta.includes(q))
      )
    ).slice(0, 8);
  }, [busNoSearch]);

  const handleSwapStops = () => {
    const tempStop = fromStop;
    const tempQuery = fromQuery;
    const tempLandmark = fromLandmark;

    setFromStop(toStop);
    setFromQuery(toQuery);
    setFromLandmark(toLandmark);

    setToStop(tempStop);
    setToQuery(tempQuery);
    setToLandmark(tempLandmark);
  };

  const handleSelectFromStop = (stop: BusStop, landmark?: PlaceLandmark) => {
    setFromStop(stop);
    setFromLandmark(landmark || null);
    setFromQuery(landmark ? landmark.name : stop.stop_name);
  };

  const handleSelectToStop = (stop: BusStop, landmark?: PlaceLandmark) => {
    setToStop(stop);
    setToLandmark(landmark || null);
    setToQuery(landmark ? landmark.name : stop.stop_name);
  };

  const handleApplyPreset = (fromId: string, toId: string) => {
    const f = getStopById(fromId);
    const t = getStopById(toId);
    if (f && t) {
      setFromStop(f);
      setFromQuery(f.stop_name);
      setFromLandmark(null);
      setToStop(t);
      setToQuery(t.stop_name);
      setToLandmark(null);
    }
  };

  const handleSelectRouteDirectly = (route: BusRoute) => {
    const origin = getStopById(route.origin_stop_id);
    const dest = getStopById(route.destination_stop_id);
    if (origin && dest) {
      setFromStop(origin);
      setFromQuery(origin.stop_name);
      setFromLandmark(null);
      setToStop(dest);
      setToQuery(dest.stop_name);
      setToLandmark(null);
      setBusNoSearch('');
    }
  };

  return (
    <div id="tn-route-search-planner" className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-slate-200 dark:border-[#1e3a6e] p-5 transition-all">
      
      {/* Header with Title & District / Network Hub Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#003580] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] rounded-xl shadow-sm">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
                {tamilLanguage ? "பயணத் திட்டம் & நேரடி பேருந்து தேடல்" : "From ➔ To Route Planner & Direct Bus Engine"}
              </h3>
              <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full uppercase border border-blue-300/40">
                Chennai MTC & All 38 Districts
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {tamilLanguage 
                ? "சென்னை மாநகர (MTC) பேருந்து வழித்தடங்கள், புறநகர் இணைப்புகள் மற்றும் தமிழ்நாடு 38 மாவட்ட பேருந்துகளைத் தேடவும்."
                : "Plan direct journeys, explore MTC express corridors (OMR, ECR, GST, Central, CMBT, Avadi), and search any bus number."}
            </p>
          </div>
        </div>

        {/* Network & District Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <select
              value={filterDistrict}
              onChange={(e) => {
                setFilterDistrict(e.target.value);
                setChennaiHubFilter('all');
              }}
              className="bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">{tamilLanguage ? "அனைத்து தமிழ்நாடு மாவட்டங்கள்" : "All Tamil Nadu Districts"}</option>
              <option value="dist_chennai">{tamilLanguage ? "சென்னை மாநகரம் (MTC Network)" : "Chennai (MTC Metro Network)"}</option>
              <option value="dist_coimbatore">{tamilLanguage ? "கோயம்புத்தூர் (TNSTC CBE)" : "Coimbatore (TNSTC CBE)"}</option>
              <option value="dist_tiruchirappalli">{tamilLanguage ? "திருச்சிராப்பள்ளி (TNSTC)" : "Tiruchirappalli (TNSTC)"}</option>
              <option value="dist_madurai">{tamilLanguage ? "மதுரை (TNSTC MDU)" : "Madurai (TNSTC MDU)"}</option>
              <option value="dist_salem">{tamilLanguage ? "சேலம் (TNSTC SLM)" : "Salem (TNSTC SLM)"}</option>
              {DISTRICTS.filter(d => !['dist_chennai', 'dist_coimbatore', 'dist_tiruchirappalli', 'dist_madurai', 'dist_salem'].includes(d.id)).map(d => (
                <option key={d.id} value={d.id}>
                  {d.nameEN} ({d.nameTA})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chennai Hub Quick Pills (When Chennai or All Districts is selected) */}
      {(filterDistrict === 'dist_chennai' || filterDistrict === 'all') && (
        <div className="mb-4 p-2.5 bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <BusIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[11px] font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider">
              {tamilLanguage ? "சென்னை முக்கிய போக்குவரத்து முனையங்கள் (MTC Hubs):" : "Chennai MTC Key Transit Hubs & Corridors:"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Corridors', labelTA: 'அனைத்து முனையங்கள்' },
              { id: 'omr', label: 'OMR IT Corridor (570, 102, 119)', labelTA: 'OMR IT வழித்தடம்' },
              { id: 'ecr', label: 'ECR Scenic (588, 599, 109)', labelTA: 'ECR கடற்கரை சாலை' },
              { id: 'cmbt', label: 'CMBT & Vadapalani (70, 77, 570)', labelTA: 'கோயம்பேடு முனையம்' },
              { id: 'tambaram', label: 'Tambaram & GST (91, 70, 592)', labelTA: 'தாம்பரம் & GST' },
              { id: 'broadway', label: 'Broadway & Central (64C, 102)', labelTA: 'பிராட்வே & சென்ட்ரல்' },
              { id: 'avadi', label: 'Avadi & Ambattur (71E, 24C, 62)', labelTA: 'ஆவடி & அம்பத்தூர்' }
            ].map(hub => (
              <button
                key={hub.id}
                onClick={() => setChennaiHubFilter(hub.id)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition border cursor-pointer ${
                  chennaiHubFilter === hub.id
                    ? 'bg-[#003580] text-white dark:bg-[#00d4ff] dark:text-[#0f1f3d] border-transparent shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                }`}
              >
                {tamilLanguage ? hub.labelTA : hub.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* INPUT SEARCH FORM */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center mb-4">
        {/* FROM Input Box */}
        <div className="md:col-span-5 relative">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            {tamilLanguage ? "1. புறப்படும் இடம் (From Stop / Landmark / Bus No)" : "1. Origin (From Stop / Landmark / Bus No)"}
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            <input
              type="text"
              value={fromQuery}
              onChange={(e) => {
                setFromQuery(e.target.value);
                setFromStop(null);
                setFromLandmark(null);
              }}
              placeholder={tamilLanguage ? "எ.கா. கோயம்பேடு (CMBT), பிராட்வே, அடையாறு, காந்திபுரம்..." : "e.g. CMBT, Broadway, Adyar, Siruseri, Avadi..."}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-inner"
            />
          </div>

          {/* FROM Autocomplete Dropdown */}
          {(fromSuggestions.routes.length > 0 || fromSuggestions.stops.length > 0 || fromSuggestions.landmarks.length > 0) ? (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0f1f3d] border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl z-50 max-h-72 overflow-y-auto p-1.5 space-y-1 divide-y divide-slate-100 dark:divide-slate-800">
              
              {/* Route matching shortcut */}
              {fromSuggestions.routes.length > 0 && (
                <div className="pb-1">
                  <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 px-2 py-0.5 uppercase block">
                    Matching Bus Routes (Click to Auto-fill)
                  </span>
                  {fromSuggestions.routes.map(r => (
                    <button
                      key={r.id}
                      onClick={() => handleSelectRouteDirectly(r)}
                      className="w-full p-2 rounded text-left hover:bg-blue-50 dark:hover:bg-blue-950/40 transition flex items-center justify-between text-xs cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-[#003580] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] font-black text-xs flex items-center justify-center font-mono shrink-0">
                          {r.route_number}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">{r.route_name}</span>
                          <span className="text-[10px] text-slate-400 block">{r.operator} · {r.bus_type}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded shrink-0">
                        Auto-Fill
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Landmark matches */}
              {fromSuggestions.landmarks.length > 0 && (
                <div className="pt-1 pb-1">
                  {fromSuggestions.landmarks.map(lm => {
                    const nearest = getStopById(lm.nearest_stop_id);
                    return (
                      <button
                        key={lm.id}
                        onClick={() => {
                          if (nearest) handleSelectFromStop(nearest, lm);
                        }}
                        className="w-full p-2 rounded text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between text-xs cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-100">{lm.name}</span>
                            <span className="text-[10px] text-slate-400 block">{lm.locality} · Nearest Stop: {nearest?.stop_name} ({lm.distance_to_stop_m}m)</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
                          Landmark
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Stop matches */}
              {fromSuggestions.stops.length > 0 && (
                <div className="pt-1">
                  {fromSuggestions.stops.map(st => (
                    <button
                      key={st.id}
                      onClick={() => handleSelectFromStop(st)}
                      className="w-full p-2 rounded text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-100">{st.stop_name}</span>
                          <span className="text-[10px] text-slate-400 block">{st.stop_name_ta} · {st.locality || st.town}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                        {st.stop_type || 'Bus Stop'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* SWAP Button */}
        <div className="md:col-span-1 flex justify-center pt-3">
          <button
            onClick={handleSwapStops}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#003580] hover:text-white dark:hover:bg-[#00d4ff] dark:hover:text-[#0f1f3d] text-slate-600 dark:text-slate-300 transition cursor-pointer shadow-sm active:scale-95 border border-slate-200 dark:border-slate-700"
            title="Swap Origin & Destination"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* TO Input Box */}
        <div className="md:col-span-5 relative">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            {tamilLanguage ? "2. சேருமிடம் (To Stop / Landmark / Destination)" : "2. Destination (To Stop / Landmark)"}
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
            <input
              type="text"
              value={toQuery}
              onChange={(e) => {
                setToQuery(e.target.value);
                setToStop(null);
                setToLandmark(null);
              }}
              placeholder={tamilLanguage ? "எ.கா. சிறுசேரி IT பார்க், கேளம்பாக்கம், மாமல்லபுரம், வேளச்சேரி..." : "e.g. Siruseri IT Park, Kelambakkam, Mahabalipuram, Velachery..."}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50 shadow-inner"
            />
          </div>

          {/* TO Autocomplete Dropdown */}
          {(toSuggestions.routes.length > 0 || toSuggestions.stops.length > 0 || toSuggestions.landmarks.length > 0) ? (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0f1f3d] border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl z-50 max-h-72 overflow-y-auto p-1.5 space-y-1 divide-y divide-slate-100 dark:divide-slate-800">
              
              {/* Route matching shortcut */}
              {toSuggestions.routes.length > 0 && (
                <div className="pb-1">
                  <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 px-2 py-0.5 uppercase block">
                    Matching Bus Routes (Click to Auto-fill)
                  </span>
                  {toSuggestions.routes.map(r => (
                    <button
                      key={r.id}
                      onClick={() => handleSelectRouteDirectly(r)}
                      className="w-full p-2 rounded text-left hover:bg-blue-50 dark:hover:bg-blue-950/40 transition flex items-center justify-between text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-[#003580] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] font-black text-xs flex items-center justify-center font-mono shrink-0">
                          {r.route_number}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">{r.route_name}</span>
                          <span className="text-[10px] text-slate-400 block">{r.operator} · {r.bus_type}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded shrink-0">
                        Auto-Fill
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Landmark matches */}
              {toSuggestions.landmarks.length > 0 && (
                <div className="pt-1 pb-1">
                  {toSuggestions.landmarks.map(lm => {
                    const nearest = getStopById(lm.nearest_stop_id);
                    return (
                      <button
                        key={lm.id}
                        onClick={() => {
                          if (nearest) handleSelectToStop(nearest, lm);
                        }}
                        className="w-full p-2 rounded text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between text-xs cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-100">{lm.name}</span>
                            <span className="text-[10px] text-slate-400 block">{lm.locality} · Nearest Stop: {nearest?.stop_name} ({lm.distance_to_stop_m}m)</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
                          Landmark
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Stop matches */}
              {toSuggestions.stops.length > 0 && (
                <div className="pt-1">
                  {toSuggestions.stops.map(st => (
                    <button
                      key={st.id}
                      onClick={() => handleSelectToStop(st)}
                      className="w-full p-2 rounded text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-100">{st.stop_name}</span>
                          <span className="text-[10px] text-slate-400 block">{st.stop_name_ta} · {st.locality || st.town}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 px-1.5 py-0.5 rounded">
                        {st.stop_type || 'Bus Stop'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* QUICK PRESET ROUTES ROW */}
      <div className="mb-5 flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-500" />
          {tamilLanguage ? "முக்கிய விரைவு வழித்தடங்கள்:" : "One-Tap Key Routes:"}
        </span>
        {quickPresets.slice(0, 8).map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleApplyPreset(preset.fromId, preset.toId)}
            className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800/90 hover:bg-[#003580] hover:text-white dark:hover:bg-[#00d4ff] dark:hover:text-[#0f1f3d] text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg transition border border-slate-200 dark:border-slate-700 cursor-pointer flex items-center gap-1 shadow-xs"
          >
            <span>{tamilLanguage ? preset.labelTA : preset.label}</span>
          </button>
        ))}
      </div>

      {/* DIRECT BUS NO SEARCH / EXPLORER DRAWER */}
      <div className="mb-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busNoSearch}
              onChange={(e) => setBusNoSearch(e.target.value)}
              placeholder={tamilLanguage ? "நேரடி பேருந்து எண் தேடல் (எ.கா. 570, 102, 23C, 29C, 70, 71E, 91, 588, M5, 45C...)" : "Quick Bus No. Lookup (e.g. 570, 102, 23C, 29C, 70, 71E, 91, 588, M5, 45C)..."}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {busNoSearch && (
            <button
              onClick={() => setBusNoSearch('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Bus No quick results popover */}
        {busNoResults.length > 0 && (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 max-h-48 overflow-y-auto">
            {busNoResults.map(r => (
              <button
                key={r.id}
                onClick={() => handleSelectRouteDirectly(r)}
                className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-left hover:border-[#003580] dark:hover:border-[#00d4ff] transition flex items-center justify-between gap-2 cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-[#003580] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] font-black font-mono text-[11px]">
                    {r.route_number}
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block truncate">{r.route_name}</span>
                    <span className="text-[10px] text-slate-400 block">{r.operator}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RESULTS SECTION */}
      {fromStop && toStop ? (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  {directResults.length} {tamilLanguage ? "நேரடி பேருந்து சேவைகள் கண்டறியப்பட்டன" : "Direct Bus Services Found"}
                </span>
                {directResults.length > 0 && (
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300/40">
                    Direct Connection
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{fromStop.stop_name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
                <span className="font-semibold text-rose-600 dark:text-rose-400">{toStop.stop_name}</span>
              </div>
            </div>

            {/* Google Maps Directions Action */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(fromStop.latitude + ',' + fromStop.longitude)}&destination=${encodeURIComponent(toStop.latitude + ',' + toStop.longitude)}&travelmode=transit`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-bold border border-blue-200 dark:border-blue-800/60 shadow-sm transition shrink-0 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{tamilLanguage ? "கூகுள் மேப்ஸில் வழிகாட்டுதல்" : "Open in Google Maps"}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

          {/* DIRECT BUSES LIST */}
          {directResults.length > 0 ? (
            <div className="space-y-3">
              {directResults.map((result, idx) => {
                const isLive = result.eta_type === 'LIVE';
                const isExpanded = expandedRouteStops === `${result.route.id}_${idx}`;
                const gMapsDirUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(result.from_stop.latitude + ',' + result.from_stop.longitude)}&destination=${encodeURIComponent(result.to_stop.latitude + ',' + result.to_stop.longitude)}&travelmode=transit`;
                
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-[#003580] dark:hover:border-[#00d4ff] transition flex flex-col gap-3 group shadow-xs"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left: Bus Badge & Route Info */}
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="h-12 w-12 rounded-xl bg-[#003580] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] font-black text-sm flex items-center justify-center font-mono shrink-0 shadow-md">
                          {result.bus_number}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                              {result.bus_number} · {result.operator}
                            </span>
                            <span className="text-[9px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded">
                              {result.bus_type}
                            </span>
                            {result.route.is_women_free && (
                              <span className="text-[9px] font-mono font-bold bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 px-1.5 py-0.5 rounded border border-pink-300/30">
                                {tamilLanguage ? "மகளிருக்கு கட்டணமில்லா பயணம்" : "Free for Women (Vidiyal)"}
                              </span>
                            )}
                            {isLive && (
                              <span className="text-[9px] font-mono font-black bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse">
                                <Radio className="w-2.5 h-2.5" /> LIVE GPS
                              </span>
                            )}
                          </div>

                          {/* Stoppages & Distance metrics */}
                          <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3 flex-wrap">
                            <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                              ~{result.estimated_duration_minutes} mins ({result.distance_km} km)
                            </span>
                            <span>•</span>
                            <span>{result.total_stops_count} stops on route</span>
                            <span>•</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹{result.route.fare_inr || 12}</span>
                            <span>•</span>
                            <span className="text-[11px] text-slate-400 font-mono">Frequency: Every {result.route.frequency_minutes || 15} mins</span>
                          </div>

                          {/* Next Bus ETA Banner */}
                          <div className="mt-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{result.eta_text}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Track Action Button & Google Maps */}
                      <div className="shrink-0 flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => setExpandedRouteStops(isExpanded ? null : `${result.route.id}_${idx}`)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Stops" : `View ${result.total_stops_count} Stops`}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        
                        <a
                          href={gMapsDirUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
                          title="Open directions in Google Maps"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Google Maps</span>
                        </a>

                        <button
                          onClick={() => onSelectRoute(result.route.id, result.bus_number)}
                          className="bg-[#003580] hover:bg-[#002766] dark:bg-[#00d4ff] dark:hover:bg-[#00b8e6] text-white dark:text-[#0f1f3d] font-bold text-xs px-4 py-2 rounded-lg shadow transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <span>{tamilLanguage ? "வரைபடத்தில் பார்" : "Track On Live Map"}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Stop-by-Stop Itinerary */}
                    {isExpanded && (
                      <div className="mt-2 pt-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                            Stoppage Sequence ({result.from_stop.stop_name} ➔ {result.to_stop.stop_name})
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Operating: {result.route.first_bus_time || '05:00 AM'} - {result.route.last_bus_time || '10:30 PM'}
                          </span>
                        </div>
                        <div className="relative pl-4 space-y-2 border-l-2 border-blue-400 dark:border-blue-600 ml-2 my-2">
                          {result.intermediate_stops.map((st, sIdx) => {
                            const isOrigin = sIdx === 0;
                            const isDest = sIdx === result.intermediate_stops.length - 1;
                            return (
                              <div key={st.id || sIdx} className="relative flex items-center justify-between text-xs">
                                <div className={`absolute -left-[21px] w-2.5 h-2.5 rounded-full ${
                                  isOrigin ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : 
                                  isDest ? 'bg-rose-500 ring-4 ring-rose-500/20' : 
                                  'bg-blue-400 dark:bg-blue-500'
                                }`} />
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold ${
                                    isOrigin ? 'text-emerald-700 dark:text-emerald-300 font-bold' :
                                    isDest ? 'text-rose-700 dark:text-rose-300 font-bold' :
                                    'text-slate-700 dark:text-slate-300'
                                  }`}>
                                    {st.stop_name}
                                  </span>
                                  {st.stop_name_ta && (
                                    <span className="text-[10px] text-slate-400">({st.stop_name_ta})</span>
                                  )}
                                  {(st.stop_type === 'railway_station' || st.has_railway) && (
                                    <span className="text-[9px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1 rounded flex items-center gap-0.5">
                                      <Train className="w-2.5 h-2.5" /> Rail
                                    </span>
                                  )}
                                  {(st.stop_type === 'metro' || st.has_metro) && (
                                    <span className="text-[9px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-1 rounded flex items-center gap-0.5">
                                      <Train className="w-2.5 h-2.5" /> Metro
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] font-mono text-slate-400">
                                  Stop #{sIdx + 1}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* NO DIRECT BUS - SHOW 1-TRANSFER CONNECTIONS */
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    {tamilLanguage 
                      ? "இந்த இரு குறிப்பிட்ட நிறுத்தங்களுக்கு இடையே நேரடி பேருந்து இல்லை. ஆனால் கீழே உள்ள பரிமாற்ற முனையங்கள் (1-Transfer Hubs) வழியாக எளிதாக பயணிக்கலாம்:"
                      : "No single direct bus found between these exact two stops. 1-Transfer connection options via key transit hubs:"}
                  </p>
                </div>
              </div>

              {transferResults.length > 0 ? (
                <div className="space-y-3">
                  {transferResults.map((tr) => (
                    <div
                      key={tr.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <span>Total Journey: ~{tr.total_duration_minutes} mins</span>
                          <span className="text-slate-400 font-normal">({tr.total_distance_km} km · 1 Transfer)</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                          Transfer at: {tr.transfer_stop.stop_name}
                        </span>
                      </div>

                      {/* Leg 1 */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold bg-[#003580] text-white dark:bg-[#00d4ff] dark:text-[#0f1f3d] px-2 py-0.5 rounded">
                            Leg 1: Bus {tr.first_leg.bus_number}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {tr.first_leg.from_stop.stop_name} ➔ {tr.transfer_stop.stop_name} (~{tr.first_leg.estimated_duration_minutes}m)
                          </span>
                        </div>
                        <button
                          onClick={() => onSelectRoute(tr.first_leg.route.id, tr.first_leg.bus_number)}
                          className="text-[11px] font-bold text-[#003580] dark:text-[#00d4ff] hover:underline cursor-pointer"
                        >
                          Track Leg 1 ➔
                        </button>
                      </div>

                      {/* Transfer Point */}
                      <div className="flex items-center gap-2 pl-4 text-[11px] text-amber-600 dark:text-amber-400 font-mono">
                        <CornerDownRight className="w-3.5 h-3.5" />
                        <span>Transfer interchange at {tr.transfer_stop.stop_name} (~{tr.transfer_wait_minutes} mins buffer)</span>
                      </div>

                      {/* Leg 2 */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold bg-[#003580] text-white dark:bg-[#00d4ff] dark:text-[#0f1f3d] px-2 py-0.5 rounded">
                            Leg 2: Bus {tr.second_leg.bus_number}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {tr.transfer_stop.stop_name} ➔ {tr.second_leg.to_stop.stop_name} (~{tr.second_leg.estimated_duration_minutes}m)
                          </span>
                        </div>
                        <button
                          onClick={() => onSelectRoute(tr.second_leg.route.id, tr.second_leg.bus_number)}
                          className="text-[11px] font-bold text-[#003580] dark:text-[#00d4ff] hover:underline cursor-pointer"
                        >
                          Track Leg 2 ➔
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  {tamilLanguage 
                    ? "இந்த நிறுத்தங்களுக்கு இடையே நேரடி அல்லது இணைப்பு பேருந்துகள் கிடைக்கவில்லை. அருகிலுள்ள பிரதான பேருந்து நிலையத்தைத் (எ.கா. கோயம்பேடு, தாம்பரம், காந்திபுரம்) தேடவும்."
                    : "No direct or 1-transfer routes found for this specific pair. Try searching with a nearby major hub (e.g., CMBT, Broadway, Tambaram, Gandhipuram)."}
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
