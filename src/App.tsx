import React, { useState, useEffect, FormEvent } from 'react';
import { 
  ROUTES, 
  DISTRICTS, 
  INITIAL_BUSES, 
  Bus, 
  Route, 
  Stop,
  District
} from './data';
import { BUS_ROUTES } from './data/routes';
import { BUS_STOPS } from './data/stops';
import { DISTRICTS as ALL_38_DISTRICTS } from './data/districts';
import { BUS_VEHICLES } from './data/vehicles';
import { 
  getBusesAtStop, 
  getRoutesAtStop, 
  findDirectBuses, 
  findNearbyStops, 
  searchGlobal 
} from './transportEngine';
import BusMap from './components/BusMap';
import DistrictSelector from './components/DistrictSelector';
import NearbyStops from './components/NearbyStops';
import RouteSearchPlanner from './components/RouteSearchPlanner';
import StopExplorer from './components/StopExplorer';
import AdminDataModal from './components/AdminDataModal';
import ErrorBoundary from './components/ErrorBoundary';
import { 
  Search, 
  MapPin, 
  Compass, 
  Globe, 
  Moon, 
  Sun, 
  Printer, 
  Share2, 
  SlidersHorizontal, 
  Bus as BusIcon, 
  ChevronRight, 
  AlertCircle, 
  X, 
  Clock, 
  Database, 
  Terminal, 
  MessageSquare, 
  ThumbsUp, 
  Trash2, 
  Send,
  Sliders,
  CheckCircle,
  ShieldCheck,
  User,
  Navigation,
  Layers,
  Sparkles,
  Zap,
  Radio,
  ExternalLink
} from 'lucide-react';

// Passenger crowd-sourced feedback interface
interface PassengerFeedback {
  id: string;
  routeId: string;
  busNumber: string;
  user: string;
  comment: string;
  statusTag: 'Seats Available' | 'AC Working' | 'Crowded' | 'On Time' | 'Minor Delay';
  timestamp: string;
  upvotes: number;
}

// Initial mockup comments for seed database
const INITIAL_FEEDBACK: PassengerFeedback[] = [
  {
    id: "F_45C_1",
    routeId: "R_45C",
    busNumber: "45C",
    user: "Suresh Balaji (SNS Tech Student)",
    comment: "Bus 45C arrived at Saravanampatti Junction on schedule! High frequency on Sathy Road, very convenient for SNS College of Technology students.",
    statusTag: "On Time",
    timestamp: "3 mins ago",
    upvotes: 16
  },
  {
    id: "F_45C_2",
    routeId: "R_45C",
    busNumber: "45C",
    user: "Kavitha R (IT Corridor)",
    comment: "Clean ordinary town bus with seats available after Ganapathy stand. Free fare for women is working smoothly.",
    statusTag: "Seats Available",
    timestamp: "18 mins ago",
    upvotes: 9
  },
  {
    id: "F1",
    routeId: "R1",
    busNumber: "10A",
    user: "Arun Kumar (Sendurai)",
    comment: "Regular town bus service running between Sendurai and Ariyalur Central. Safe driving and punctual.",
    statusTag: "On Time",
    timestamp: "10 mins ago",
    upvotes: 5
  },
  {
    id: "F2",
    routeId: "R_20C",
    busNumber: "20C",
    user: "Meena Chandran",
    comment: "Bus 20C direct pilgrimage express from Gandhipuram to Marudhamalai Temple foothills was clean and fast.",
    statusTag: "Seats Available",
    timestamp: "24 mins ago",
    upvotes: 11
  },
  {
    id: "F3",
    routeId: "R_1C",
    busNumber: "1C",
    user: "Rajesh S (Trichy)",
    comment: "Bus 1C connects Trichy Central Bus Stand to Srirangam Temple via Chathiram stand in 30 minutes.",
    statusTag: "On Time",
    timestamp: "35 mins ago",
    upvotes: 7
  }
];

export default function App() {
  // Primary application states
  const [buses, setBuses] = useState<Bus[]>(INITIAL_BUSES);
  const [tamilLanguage, setTamilLanguage] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Navigation View Modes: 'tracker' | 'planner' | 'stops' | 'districts' | 'nearby'
  const [mainViewMode, setMainViewMode] = useState<'tracker' | 'planner' | 'stops' | 'districts' | 'nearby'>('tracker');
  
  // Admin Modal State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Tracking and Selection
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>("Coimbatore");
  const [trackingBusId, setTrackingBusId] = useState<string | null>("B_45C_1");
  const [trackingRouteId, setTrackingRouteId] = useState<string | null>("R_45C");
  
  // Sidebar Search and Tabs
  const [activeSidebarTab, setActiveSidebarTab] = useState<'districts' | 'routes'>('districts');
  const [districtSearch, setDistrictSearch] = useState<string>("");
  const [routeSearch, setRouteSearch] = useState<string>("");
  const [routeTypeFilter, setRouteTypeFilter] = useState<'All' | 'Express' | 'Ordinary' | 'Mini Bus'>('All');
  
  // Global Quick Search in Header
  const [globalQuery, setGlobalQuery] = useState<string>("");
  const [globalSearchResults, setGlobalSearchResults] = useState<ReturnType<typeof searchGlobal> | null>(null);

  // Map Fit Bounds Trigger
  const [fitBoundsTrigger, setFitBoundsTrigger] = useState<number>(0);
  
  // Backend Simulated Console Log state
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  
  // Passenger Feedback Database state
  const [feedbacks, setFeedbacks] = useState<PassengerFeedback[]>([]);
  const [newCommentUser, setNewCommentUser] = useState<string>("");
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [newCommentTag, setNewCommentTag] = useState<PassengerFeedback['statusTag']>("On Time");
  
  // Utility alerts
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  // Initialize feedbacks database & sync logs
  useEffect(() => {
    const savedTheme = localStorage.getItem('faststop-dark');
    if (savedTheme === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const storedFeed = localStorage.getItem('faststop-feedbacks');
    if (storedFeed) {
      setFeedbacks(JSON.parse(storedFeed));
    } else {
      setFeedbacks(INITIAL_FEEDBACK);
      localStorage.setItem('faststop-feedbacks', JSON.stringify(INITIAL_FEEDBACK));
    }

    setConsoleLogs([
      `[INFO] ${new Date().toLocaleTimeString()} - FastStop Tamil Nadu Transportation Engine v3.5 Initialized`,
      `[DATA] ${new Date().toLocaleTimeString()} - 38 Districts, 100+ Verified Local Bus Stops & Routes loaded into Memory Pool`,
      `[GPS] ${new Date().toLocaleTimeString()} - Real-time orbital GPS simulation telemetry synchronized (2-second tick)`,
      `[ROUTING] ${new Date().toLocaleTimeString()} - Universal Route Engine & Transfer Router Active`
    ]);
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('faststop-dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('faststop-dark', 'false');
    }
  }, [darkMode]);

  // LIVE GPS POSITION SIMULATION LOOP
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) => 
        prevBuses.map((bus) => {
          if (bus.status === 'Not Available') return bus;

          const route = ROUTES.find(r => r.id === bus.routeId);
          if (!route || !route.stops || route.stops.length === 0) return bus;

          const stopsCount = route.stops.length;
          let nextProgress = bus.progressRatio + 0.05;

          let nextStopIdx = bus.currentStopIndex;
          let nextDirection = bus.direction;

          const newSpeed = bus.status === 'Delayed'
            ? Math.floor(Math.random() * 15) + 25
            : Math.floor(Math.random() * 20) + 38;

          if (nextProgress >= 1.0) {
            nextProgress = 0.0;
            
            if (bus.direction === 'forward') {
              if (bus.currentStopIndex >= stopsCount - 2) {
                nextStopIdx = Math.max(0, stopsCount - 1);
                nextDirection = 'backward';
              } else {
                nextStopIdx = bus.currentStopIndex + 1;
              }
            } else {
              if (bus.currentStopIndex <= 1) {
                nextStopIdx = 0;
                nextDirection = 'forward';
              } else {
                nextStopIdx = bus.currentStopIndex - 1;
              }
            }
          }

          return {
            ...bus,
            progressRatio: parseFloat(nextProgress.toFixed(3)),
            currentStopIndex: nextStopIdx,
            direction: nextDirection,
            speed: newSpeed
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Compute calculated values for currently tracked bus
  const trackingBus = buses.find(b => b.id === trackingBusId) || buses[0];
  const trackingRoute = ROUTES.find(r => r.id === trackingRouteId) || ROUTES[0];

  // Calculated remaining stops & ETA
  const getSimulatedETA = (b?: Bus | null, r?: Route | null) => {
    if (!b || !r || !r.stops || r.stops.length === 0) return 5;
    const stops = r.stops;
    const remainingStopsCount = b.direction === 'forward'
      ? Math.max(0, (stops.length - 1) - b.currentStopIndex - b.progressRatio)
      : Math.max(0, b.currentStopIndex + b.progressRatio);
    
    return Math.max(1, Math.round(remainingStopsCount * 4)); // ~4 mins per stop average
  };

  // Districts filtering logic based on sidebar search
  const filteredDistricts = DISTRICTS.filter(dist => {
    const query = districtSearch.toLowerCase();
    return dist.nameEN.toLowerCase().includes(query) || dist.nameTA.includes(query);
  });

  // Filter routes listed in Sidebar routes tab
  const filteredRoutesList = ROUTES.filter(route => {
    const query = routeSearch.toLowerCase();
    const matchesSearch = (
      route.code.toLowerCase().includes(query) ||
      route.nameEN.toLowerCase().includes(query) ||
      route.nameTA.includes(query)
    );
    const matchesFilter = routeTypeFilter === 'All' || route.type === routeTypeFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate active routes passing through any district
  const getRoutesForDistrict = (districtName: string) => {
    return ROUTES.filter(route => 
      route.stops && route.stops.some(stop => stop.district.toLowerCase() === districtName.toLowerCase())
    );
  };

  // Select a route & bus from anywhere in the app
  const handleSelectRouteAndTrack = (routeId: string, busNumber?: string) => {
    const targetRoute = ROUTES.find(r => r.id === routeId || r.code === busNumber || (busNumber && r.code.toLowerCase() === busNumber.toLowerCase()));
    if (targetRoute) {
      setTrackingRouteId(targetRoute.id);
      const targetBus = buses.find(b => b.routeId === targetRoute.id || b.busNumber === targetRoute.code);
      if (targetBus) {
        setTrackingBusId(targetBus.id);
      } else {
        // Create an active bus instance if none exists
        const newBus: Bus = {
          id: `B_${targetRoute.code}_${Date.now()}`,
          busNumber: targetRoute.code,
          routeId: targetRoute.id,
          status: "Available",
          speed: 45,
          direction: "forward",
          currentStopIndex: Math.floor(Math.random() * Math.max(1, (targetRoute.stops?.length || 2) - 1)),
          progressRatio: 0.35,
          capacity: 65,
          frequency: "EVERY 10 MINS"
        };
        setBuses(prev => [...prev, newBus]);
        setTrackingBusId(newBus.id);
      }
      setFitBoundsTrigger(prev => prev + 1);
      setMainViewMode('tracker');
      
      setConsoleLogs(prev => [
        `[TRACKER] ${new Date().toLocaleTimeString()} - Route ${targetRoute.code} selected. Orbital Map initialized.`,
        ...prev
      ]);
    }
  };

  // Add feedback comment to database
  const handleAddFeedback = (e: FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !trackingRoute || !trackingBus) return;

    const userLabel = newCommentUser.trim() || (tamilLanguage ? "அநாமதேய பயணி" : "Anonymous Passenger");
    const newFeedback: PassengerFeedback = {
      id: "FEED-" + Date.now(),
      routeId: trackingRoute.id,
      busNumber: trackingBus.busNumber,
      user: userLabel,
      comment: newCommentText.trim(),
      statusTag: newCommentTag,
      timestamp: tamilLanguage ? "இப்போது" : "Just now",
      upvotes: 0
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('faststop-feedbacks', JSON.stringify(updated));

    setNewCommentUser("");
    setNewCommentText("");
    setNewCommentTag("On Time");

    setConsoleLogs(prev => [
      `[DB_POST] ${new Date().toLocaleTimeString()} - INSERT INTO feedback (bus, comment, tag) VALUES ('${trackingBus.busNumber}', '${newFeedback.comment}', '${newFeedback.statusTag}') -> 201 OK`,
      ...prev
    ]);
  };

  // Handle feedback comment deletion
  const handleDeleteFeedback = (id: string) => {
    const updated = feedbacks.filter(f => f.id !== id);
    setFeedbacks(updated);
    localStorage.setItem('faststop-feedbacks', JSON.stringify(updated));
  };

  // Handle feedback upvoting
  const handleUpvoteFeedback = (id: string) => {
    const updated = feedbacks.map(f => {
      if (f.id === id) {
        return { ...f, upvotes: f.upvotes + 1 };
      }
      return f;
    });
    setFeedbacks(updated);
    localStorage.setItem('faststop-feedbacks', JSON.stringify(updated));
  };

  // Switch to district's first route on click
  const handleSelectDistrict = (distName: string) => {
    setSelectedDistrict(distName);
    const routesPassing = getRoutesForDistrict(distName);
    if (routesPassing.length > 0) {
      const firstRoute = routesPassing[0];
      const matchingBus = buses.find(b => b.routeId === firstRoute.id);
      if (matchingBus) {
        setTrackingBusId(matchingBus.id);
        setTrackingRouteId(firstRoute.id);
        setFitBoundsTrigger(prev => prev + 1);
      }
    }
  };

  // Handle Global Header Search
  const handleGlobalSearchChange = (q: string) => {
    setGlobalQuery(q);
    if (q.trim().length >= 2) {
      const results = searchGlobal(q);
      setGlobalSearchResults(results);
    } else {
      setGlobalSearchResults(null);
    }
  };

  const getRouteAlert = (routeCode: string, isTamil: boolean) => {
    switch (routeCode) {
      case '570':
      case '570S':
        return isTamil
          ? `🟢 பேருந்து ${routeCode} நேரலை: கோயம்பேடு CMBT ⇄ OMR சிறுசேரி / கேளம்பாக்கம் தகவல் தொழில்நுட்ப வழித்தடத்தில் 8-10 நிமிட இடைவெளியில் இயக்கப்படுகிறது.`
          : `🟢 BUS ${routeCode} LIVE: High-frequency OMR IT Expressway corridor active between CMBT Koyambedu & Siruseri SIPCOT / Kelambakkam.`;
      case '102':
      case '102K':
      case '102X':
        return isTamil
          ? `🟢 பேருந்து ${routeCode} நேரலை: பிராட்வே ⇄ கேளம்பாக்கம் / திருப்போரூர் OMR அதிவேக சேவை வழக்கமான நேரத்தில் இயங்குகிறது.`
          : `🟢 BUS ${routeCode} LIVE: Broadway to Kelambakkam / Thiruporur OMR Deluxe service running smoothly on schedule.`;
      case 'M5':
      case '19D':
      case '519':
        return isTamil
          ? `🟢 பேருந்து ${routeCode} நேரலை: அடையாறு பணிமனை ⇄ கேளம்பாக்கம் / திருப்போரூர் OMR வழித்தடம் இயங்குகிறது.`
          : `🟢 BUS ${routeCode} LIVE: Adyar Depot to Kelambakkam / Thiruporur IT corridor active with live GPS tracking.`;
      case '588':
      case '109':
        return isTamil
          ? `🟢 பேருந்து ${routeCode} நேரலை: கிழக்கு கடற்கரை சாலை (ECR) வழியாக மாமல்லபுரம் / கோவளம் வரை நேரடி பேருந்து சேவை உள்ளது.`
          : `🟢 BUS ${routeCode} LIVE: Scenic ECR Coastal Express service active to Mamallapuram / Kovalam.`;
      case '23C':
      case '29C':
        return isTamil
          ? `🟢 பேருந்து ${routeCode} நேரலை: பெசன்ட் நகர் ⇄ அயனாவரம் / பெரம்பூர் வழித்தடத்தில் வழக்கமான சேவை உள்ளது.`
          : `🟢 BUS ${routeCode} LIVE: Central Chennai arterial service active between Besant Nagar and Ayanavaram / Perambur.`;
      case '71E':
      case '70':
      case '62':
        return isTamil
          ? `🟢 பேருந்து ${routeCode} நேரலை: ஆவடி / அம்பத்தூர் மேற்கு சென்னை வழித்தடங்களில் நேரலை ஜிபிஎஸ் ஒத்திசைவுடன் இயங்குகிறது.`
          : `🟢 BUS ${routeCode} LIVE: West Chennai Avadi / Ambattur corridor active with real-time GPS tracking.`;
      case '45C':
        return isTamil
          ? "🟢 பேருந்து 45C நேரலை: காந்திபுரம் மற்றும் SNS தொழில்நுட்பக் கல்லூரி இடையே சத்தி ரோடு, கணபதி, சரவணம்பட்டி வழியாக வழக்கமான நேரத்தில் இயக்கப்படுகிறது."
          : "🟢 BUS 45C LIVE: Regular high-frequency service operating between Gandhipuram and SNS College of Technology (via Sathy Road & Saravanampatti).";
      case '45A':
        return isTamil
          ? "🟢 பேருந்து 45A நேரலை: காந்திபுரம் ⇄ கோவில்பாளையம் சத்தி ரோடு வழித்தடத்தில் 10 நிமிட இடைவெளியில் சீராக இயங்குகிறது."
          : "🟢 BUS 45A LIVE: Gandhipuram to Kovilpalayam running smoothly every 10 mins on Sathy Road corridor.";
      case '20C':
        return isTamil
          ? "🟢 பேருந்து 20C நேரலை: காந்திபுரம் ⇄ மருதமலை கோவில் அடிவாரம் வரை வடவள்ளி வழியாக நேரடி பேருந்து சேவை உள்ளது."
          : "🟢 BUS 20C LIVE: Direct pilgrimage town service active from Gandhipuram to Marudhamalai Temple via Vadavalli.";
      case '10A':
        return isTamil 
          ? "🟢 பேருந்து 10A நேரலை: செந்துறை முனையம் ⇄ அரியலூர் மத்திய பேருந்து நிலையம் இடையே சீராக இயங்குகிறது."
          : "🟢 BUS 10A LIVE: Operating between Sendurai Bus Stand and Ariyalur Central Terminal.";
      default:
        return isTamil
          ? `🟢 பேருந்து ${routeCode} நேரடி ஜிபிஎஸ் நிலை ஒத்திசைவு செயலில் உள்ளது. நேரலை வேகம் மற்றும் வருகை நேரம் கணக்கிடப்படுகிறது.`
          : `🟢 BUS ${routeCode} LIVE: Real-time GPS orbital tracking active. Speed & arrival times synchronized.`;
    }
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${darkMode ? 'bg-[#0a1628] text-slate-100' : 'bg-[#f5f7fa] text-slate-900'}`}>
      
      {/* SECTION 1 — HEADER */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f1f3d] via-[#122347] to-[#1a2d4d] border-b border-slate-800 text-white shadow-lg shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#00d4ff] text-[#0f1f3d] p-2 rounded-lg flex items-center justify-center shadow-md font-black">
              <BusIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-black text-[#00d4ff] tracking-wider uppercase">
                {tamilLanguage ? "அரசு நேரடி பேருந்து கண்காணிப்பு" : "FASTSTOP TAMIL NADU"}
              </span>
              <h1 className="text-lg font-black tracking-tight leading-none flex items-center gap-1.5">
                FastStop <span className="text-[11px] font-bold text-amber-400 font-mono">38 Districts DB</span>
              </h1>
            </div>
          </div>

          {/* View Modes Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-700/60 text-xs font-bold">
            <button 
              onClick={() => setMainViewMode('tracker')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                mainViewMode === 'tracker' 
                  ? 'bg-[#00d4ff] text-[#0f1f3d] shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{tamilLanguage ? "நேரடி வரைபடம்" : "Live Map & Tracker"}</span>
            </button>

            <button 
              onClick={() => setMainViewMode('planner')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                mainViewMode === 'planner' 
                  ? 'bg-[#00d4ff] text-[#0f1f3d] shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{tamilLanguage ? "வழித்தடத் திட்டம்" : "From ➔ To Planner"}</span>
            </button>

            <button 
              onClick={() => setMainViewMode('stops')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                mainViewMode === 'stops' 
                  ? 'bg-[#00d4ff] text-[#0f1f3d] shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{tamilLanguage ? "நிறுத்தங்கள் அட்டவணை" : "Local Stops & Buses"}</span>
            </button>

            <button 
              onClick={() => setMainViewMode('districts')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                mainViewMode === 'districts' 
                  ? 'bg-[#00d4ff] text-[#0f1f3d] shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{tamilLanguage ? "38 மாவட்டங்கள்" : "38 Districts Guide"}</span>
            </button>

            <button 
              onClick={() => setMainViewMode('nearby')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                mainViewMode === 'nearby' 
                  ? 'bg-[#00d4ff] text-[#0f1f3d] shadow-sm' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{tamilLanguage ? "அருகிலுள்ளவை (GPS)" : "Nearby Stops (GPS)"}</span>
            </button>
          </nav>

          {/* Quick Universal Search in Header */}
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={globalQuery}
              onChange={(e) => handleGlobalSearchChange(e.target.value)}
              placeholder={tamilLanguage ? "தேடு: 45C, SNS கல்லூரி, செந்துறை..." : "Search 45C, SNS Tech, Sendurai..."}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00d4ff]"
            />

            {/* Global Search Results Dropdown */}
            {globalSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0f1f3d] border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto p-2 space-y-1.5 text-xs">
                {/* Routes matches */}
                {globalSearchResults.routes.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      handleSelectRouteAndTrack(r.id, r.route_number);
                      setGlobalQuery("");
                      setGlobalSearchResults(null);
                    }}
                    className="w-full p-2 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between text-slate-800 dark:text-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold bg-[#003580] text-white dark:bg-[#00d4ff] dark:text-[#0f1f3d] px-1.5 py-0.5 rounded text-[10px]">
                        BUS {r.route_number}
                      </span>
                      <span className="truncate">{r.route_name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-600 font-bold">Track ➔</span>
                  </button>
                ))}

                {/* Stops matches */}
                {globalSearchResults.stops.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setMainViewMode('stops');
                      setGlobalQuery("");
                      setGlobalSearchResults(null);
                    }}
                    className="w-full p-2 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between text-slate-800 dark:text-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{s.stop_name} ({s.locality})</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">View Stops</span>
                  </button>
                ))}

                {/* Landmarks matches */}
                {globalSearchResults.landmarks.map(lm => (
                  <button
                    key={lm.id}
                    onClick={() => {
                      setMainViewMode('planner');
                      setGlobalQuery("");
                      setGlobalSearchResults(null);
                    }}
                    className="w-full p-2 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between text-slate-800 dark:text-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{lm.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-amber-500 font-bold">Landmark</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Controls: Admin Engine, Language, Theme */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Admin Data Modal Button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-[#003580] px-3 py-1.5 rounded-lg transition text-xs font-mono font-bold cursor-pointer text-slate-200 border border-slate-700 shadow-sm"
              title="Open Transportation Database Admin Panel"
            >
              <Database className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span className="hidden sm:inline">{tamilLanguage ? "நிர்வாகம்" : "Admin DB"}</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setTamilLanguage(!tamilLanguage)}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-750 px-2.5 py-1.5 rounded-lg transition text-xs font-mono font-bold cursor-pointer text-slate-200 border border-slate-700"
              title="Switch Language (தமிழ் / English)"
            >
              <Globe className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span>{tamilLanguage ? "ENG" : "தமிழ்"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 bg-slate-800 hover:bg-slate-750 rounded-lg transition cursor-pointer text-slate-200 border border-slate-700"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-300" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between overflow-x-auto text-xs font-bold text-slate-300 gap-2 shrink-0">
        <button
          onClick={() => setMainViewMode('tracker')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${mainViewMode === 'tracker' ? 'bg-[#00d4ff] text-[#0f1f3d]' : ''}`}
        >
          Live Map
        </button>
        <button
          onClick={() => setMainViewMode('planner')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${mainViewMode === 'planner' ? 'bg-[#00d4ff] text-[#0f1f3d]' : ''}`}
        >
          From ➔ To
        </button>
        <button
          onClick={() => setMainViewMode('stops')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${mainViewMode === 'stops' ? 'bg-[#00d4ff] text-[#0f1f3d]' : ''}`}
        >
          Local Stops
        </button>
        <button
          onClick={() => setMainViewMode('districts')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${mainViewMode === 'districts' ? 'bg-[#00d4ff] text-[#0f1f3d]' : ''}`}
        >
          38 Districts
        </button>
        <button
          onClick={() => setMainViewMode('nearby')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${mainViewMode === 'nearby' ? 'bg-[#00d4ff] text-[#0f1f3d]' : ''}`}
        >
          Nearby GPS
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col gap-6">

        {/* VIEW MODE 1: ROUTE SEARCH PLANNER */}
        {mainViewMode === 'planner' && (
          <ErrorBoundary fallbackTitle="Route Search & Journey Planner">
            <RouteSearchPlanner
              tamilLanguage={tamilLanguage}
              onSelectRoute={(routeId, busNum) => handleSelectRouteAndTrack(routeId, busNum)}
              selectedDistrictId={selectedDistrict}
            />
          </ErrorBoundary>
        )}

        {/* VIEW MODE 2: LOCAL BUS STOP EXPLORER */}
        {mainViewMode === 'stops' && (
          <ErrorBoundary fallbackTitle="Local Bus Stop Explorer">
            <StopExplorer
              tamilLanguage={tamilLanguage}
              onSelectRoute={(routeId, busNum) => handleSelectRouteAndTrack(routeId, busNum)}
              initialDistrictId={selectedDistrict}
            />
          </ErrorBoundary>
        )}

        {/* VIEW MODE 3: DISTRICTS GUIDE */}
        {mainViewMode === 'districts' && (
          <ErrorBoundary fallbackTitle="Districts Transit Guide">
            <DistrictSelector
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(dist) => {
                setSelectedDistrict(dist);
                if (dist) {
                  handleSelectDistrict(dist);
                }
              }}
              tamilLanguage={tamilLanguage}
              routes={ROUTES}
            />
          </ErrorBoundary>
        )}

        {/* VIEW MODE 4: NEARBY STOPS (GPS) */}
        {mainViewMode === 'nearby' && (
          <ErrorBoundary fallbackTitle="Nearby GPS Stops Explorer">
            <NearbyStops
              tamilLanguage={tamilLanguage}
              onTrackBus={(routeId, busNum) => handleSelectRouteAndTrack(routeId, busNum)}
            />
          </ErrorBoundary>
        )}

        {/* VIEW MODE 0: PRIMARY LIVE TRACKING DASHBOARD */}
        {mainViewMode === 'tracker' && (
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* SIDEBAR (Districts / Routes Selector) */}
            <aside className="w-full md:w-[340px] flex flex-col gap-5 shrink-0">
              
              {/* TAB SWITCH BLOCK */}
              <div className="bg-white dark:bg-[#0d1e3a] rounded-xl p-1 shadow border border-slate-200 dark:border-[#1e3a6e] flex h-[46px]">
                <button
                  onClick={() => setActiveSidebarTab('districts')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeSidebarTab === 'districts'
                      ? 'bg-[#0f1f3d] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{tamilLanguage ? "மாவட்டங்கள்" : "Districts"}</span>
                </button>
                
                <button
                  onClick={() => setActiveSidebarTab('routes')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeSidebarTab === 'routes'
                      ? 'bg-[#0f1f3d] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{tamilLanguage ? "வழித்தடங்கள்" : "Routes"}</span>
                </button>
              </div>

              {/* TAB CONTENT: DISTRICTS */}
              {activeSidebarTab === 'districts' && (
                <div className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-slate-200 dark:border-[#1e3a6e] p-4 flex flex-col h-[480px] overflow-hidden">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    {tamilLanguage ? "மாவட்டத்தைத் தேடு (38 மாவட்டங்கள்)" : "Find District (All 38 Districts)"}
                  </span>
                  
                  {/* Search box */}
                  <div className="relative mb-3 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      value={districtSearch}
                      onChange={(e) => setDistrictSearch(e.target.value)}
                      placeholder={tamilLanguage ? "எ.கா. கோவை, அரியலூர், சென்னை..." : "Type District Name..."}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition"
                    />
                    {districtSearch && (
                      <button onClick={() => setDistrictSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Scrollable Districts List */}
                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {filteredDistricts.length > 0 ? (
                      filteredDistricts.map((dist) => {
                        const isSelected = selectedDistrict?.toLowerCase() === dist.nameEN.toLowerCase();
                        const routeCount = getRoutesForDistrict(dist.nameEN).length;
                        
                        return (
                          <button
                            key={dist.nameEN}
                            onClick={() => handleSelectDistrict(dist.nameEN)}
                            className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between group transition duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#00d4ff]/10 dark:bg-[#00d4ff]/20 border-[#00d4ff] text-[#0f1f3d] dark:text-[#00d4ff] font-bold'
                                : 'bg-white dark:bg-slate-950/40 border-slate-100 dark:border-slate-800 hover:border-[#00d4ff]/40 hover:bg-slate-50 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`p-2 rounded-md shrink-0 ${isSelected ? 'bg-[#00d4ff] text-[#0f1f3d]' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}>
                                <MapPin className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-bold block truncate">{dist.nameEN}</span>
                                <span className="text-[9px] font-mono text-slate-400 block truncate leading-none mt-0.5">{dist.nameTA} · {dist.zones}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[9px] font-mono font-black bg-red-100 dark:bg-red-950/40 text-[#ff4757] border border-red-200/50 dark:border-red-950/60 px-1.5 py-0.5 rounded uppercase">
                                {dist.liveCount} LIVE
                              </span>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-xs text-slate-400">
                        {tamilLanguage ? "முடிவுகள் எதுவும் இல்லை" : "No districts match your search."}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB CONTENT: ROUTES */}
              {activeSidebarTab === 'routes' && (
                <div className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-slate-200 dark:border-[#1e3a6e] p-4 flex flex-col h-[480px] overflow-hidden">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    {tamilLanguage ? "வழித்தடத்தைத் தேடு" : "Find Route"}
                  </span>
                  
                  {/* Search box */}
                  <div className="relative mb-3 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      value={routeSearch}
                      onChange={(e) => setRouteSearch(e.target.value)}
                      placeholder={tamilLanguage ? "தேடல் எ.கா. 45C, 10A, 20C..." : "Type Route No or Destination..."}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition"
                    />
                    {routeSearch && (
                      <button onClick={() => setRouteSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Scrollable Routes List */}
                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {filteredRoutesList.map((route) => {
                      const matchingBus = buses.find(b => b.routeId === route.id);
                      const isTracked = trackingRouteId === route.id;
                      
                      return (
                        <button
                          key={route.id}
                          onClick={() => {
                            if (matchingBus) {
                              setTrackingBusId(matchingBus.id);
                            }
                            setTrackingRouteId(route.id);
                            setFitBoundsTrigger(prev => prev + 1);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-left flex flex-col transition duration-200 cursor-pointer ${
                            isTracked
                              ? 'bg-[#00d4ff]/10 dark:bg-[#00d4ff]/20 border-[#00d4ff] shadow-sm'
                              : 'bg-white dark:bg-slate-950/40 border-slate-100 dark:border-slate-800 hover:border-[#00d4ff]/30 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1.5">
                            <span className="text-[10px] font-mono font-bold bg-[#0f1f3d] dark:bg-slate-800 text-white dark:text-slate-200 px-2 py-0.5 rounded-full">
                              BUS {route.code}
                            </span>
                            <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-slate-400">{route.type}</span>
                          </div>
                          
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 leading-tight">{route.nameEN}</span>
                          <span className="text-[10px] text-slate-500 font-mono mt-0.5 line-clamp-1">{route.nameTA}</span>
                          <span className="text-[9px] text-[#00d4ff] font-bold mt-1.5 flex items-center gap-1">
                            ⏱️ {matchingBus ? matchingBus.frequency : "Every 10-15 mins"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* ACTIVE DISTRICT ROUTES PANEL */}
              <div className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-slate-200 dark:border-[#1e3a6e] p-4 flex flex-col max-h-[300px]">
                <span className="text-[9px] font-mono font-black text-red-500 uppercase tracking-widest block mb-2.5 animate-pulse">
                  ● ACTIVE {selectedDistrict ? selectedDistrict.toUpperCase() : "FLEET"} ROUTES
                </span>
                
                <div className="overflow-y-auto space-y-2 pr-1 flex-1 custom-scrollbar">
                  {selectedDistrict ? (
                    getRoutesForDistrict(selectedDistrict).map((route) => {
                      const matchingBus = buses.find(b => b.routeId === route.id);
                      const isCurrentlyTracked = trackingRouteId === route.id;
                      
                      return (
                        <button
                          key={route.id}
                          onClick={() => {
                            if (matchingBus) {
                              setTrackingBusId(matchingBus.id);
                            }
                            setTrackingRouteId(route.id);
                            setFitBoundsTrigger(prev => prev + 1);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between group transition duration-200 cursor-pointer ${
                            isCurrentlyTracked
                              ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                              : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 hover:border-[#00d4ff]/30'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-xl bg-[#003580] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] flex items-center justify-center font-mono font-black text-xs shrink-0 shadow-sm">
                              {route.code}
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold block truncate text-slate-800 dark:text-slate-100 group-hover:text-[#00d4ff] transition-colors">{route.nameEN}</span>
                              <span className="text-[9px] text-slate-400 font-mono block truncate mt-0.5">
                                {route.stops?.[0]?.nameEN || 'Start'} ⇄ {route.stops?.[(route.stops?.length || 1) - 1]?.nameEN || 'End'}
                              </span>
                            </div>
                          </div>
                          
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00d4ff] shrink-0 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-400">
                      {tamilLanguage ? "மாவட்டம் எதையும் தேர்ந்தெடுக்கவில்லை" : "Select a district above to view its active local route telemetry."}
                    </div>
                  )}
                </div>
              </div>

            </aside>

            {/* MAIN PANEL CONTENT (Active Card + Map + Stops Timeline + Passenger Reports) */}
            <main className="flex-1 flex flex-col gap-5 min-w-0">
              
              {/* SECTION 3 — ACTIVE BUS CARD */}
              {trackingBus && trackingRoute ? (
                <div className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-slate-200 dark:border-[#1e3a6e] p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#003580] dark:bg-[#00d4ff]" />
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                    {/* Left hand side: Badge and Info */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="h-[60px] w-[60px] bg-[#003580] text-[#00d4ff] dark:bg-[#00d4ff] dark:text-[#0f1f3d] rounded-xl flex items-center justify-center font-display font-black text-xl shadow-md border-2 border-slate-100/50 dark:border-slate-700/50 shrink-0 select-none">
                        {trackingRoute.code}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-emerald-100 dark:bg-emerald-950/40 text-[#2ecc71] font-mono text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider border border-[#2ecc71]/20">
                            🟢 {trackingBus.frequency}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{trackingRoute.type} SERVICE</span>
                        </div>
                        <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-tight truncate">
                          {tamilLanguage ? trackingRoute.nameTA : trackingRoute.nameEN}
                        </h2>
                        <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-1">
                          <BusIcon className="w-3.5 h-3.5 text-[#00d4ff]" />
                          <span>{trackingRoute.stops?.length || 0} STOPS • TELEMETRY NOMINAL</span>
                        </p>
                      </div>
                    </div>

                    {/* Middle: Divider Line (sm:only) */}
                    <div className="hidden sm:block w-[1px] h-12 bg-slate-200 dark:bg-slate-800 mx-2" />

                    {/* Right: ETA block */}
                    <div className="flex items-center gap-6 justify-between sm:justify-start w-full sm:w-auto">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#00d4ff]/10 p-2.5 rounded-full text-[#00d4ff] shrink-0 h-10 w-10 flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block leading-none">{tamilLanguage ? "சராசரி வருகை" : "AVG. ETA"}</span>
                          <span className="text-xl font-black text-[#0f1f3d] dark:text-white leading-none block mt-1">
                            {getSimulatedETA(trackingBus, trackingRoute)} {tamilLanguage ? "நிமிடங்கள்" : "mins"}
                          </span>
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent((trackingRoute.stops?.[0]?.nameEN || 'Gandhipuram') + ', ' + (trackingRoute.stops?.[0]?.district || 'Coimbatore') + ', Tamil Nadu')}&destination=${encodeURIComponent((trackingRoute.stops?.[(trackingRoute.stops?.length || 1) - 1]?.nameEN || 'SNS Tech') + ', ' + (trackingRoute.stops?.[(trackingRoute.stops?.length || 1) - 1]?.district || 'Coimbatore') + ', Tamil Nadu')}&travelmode=driving`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-[#00d4ff]/10 hover:bg-[#00d4ff] text-[#00d4ff] hover:text-[#0f1f3d] border border-[#00d4ff]/30 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all duration-200"
                          title="Open live route directions directly on Google Maps"
                        >
                          <MapPin className="w-4 h-4" />
                          <span>{tamilLanguage ? "கூகுள் மேப்ஸ்" : "Google Maps"}</span>
                        </a>

                        <button
                          onClick={() => {
                            setTrackingBusId(null);
                            setTrackingRouteId(null);
                          }}
                          className="text-slate-400 hover:text-red-500 px-2 py-1.5 text-xs font-mono font-bold uppercase cursor-pointer"
                        >
                          {tamilLanguage ? "மூடு" : "CLOSE"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Alert badge and text scroller */}
                  <div className="w-full flex items-center gap-3 bg-red-50 dark:bg-red-950/20 border border-red-200/40 dark:border-red-950/40 rounded-lg p-2.5 overflow-hidden">
                    <div className="flex items-center gap-1.5 bg-red-600 text-white font-mono text-[9px] font-black px-2 py-1 rounded shadow-sm shrink-0 animate-pulse">
                      <span className="inline-block w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span>{tamilLanguage ? "அபாய அறிவிப்பு" : "LIVE ALERT"}</span>
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                      <div className="animate-marquee whitespace-nowrap text-xs font-bold text-red-700 dark:text-red-400 select-none">
                        {getRouteAlert(trackingRoute.code, tamilLanguage)}
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-dashed border-slate-200 dark:border-[#1e3a6e] p-6 text-center">
                  <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {tamilLanguage ? "பேருந்து எதுவும் கண்காணிக்கப்படவில்லை" : "No Active Tracking Session"}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed max-w-md mx-auto">
                    {tamilLanguage 
                      ? "நேரடி ஜிபிஎஸ் நிலை, வேகம் மற்றும் வருகை நேரங்களை உடனுக்குடன் அறிய இடதுபுறம் உள்ள மாவட்டத்தைத் தேர்ந்தெடுக்கவும்." 
                      : "Please select a district or route from the left sidebar to instantly start orbital satellite tracking and telemetry feedback."}
                  </p>
                  <button
                    onClick={() => {
                      setTrackingBusId("B_45C_1");
                      setTrackingRouteId("R_45C");
                    }}
                    className="mt-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0f1f3d] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] px-4 py-2.5 rounded-lg border border-transparent hover:opacity-90 transition cursor-pointer"
                  >
                    {tamilLanguage ? "கோவை 45C (SNS கல்லூரி) பேருந்தைக் காண்க" : "Auto-Track Coimbatore Bus 45C (SNS Tech)"}
                  </button>
                </div>
              )}

              {/* SECTION 4 — LIVE INTERACTIVE MAP & STOPS TIMELINE */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 shrink-0">
                <div className="lg:col-span-2 relative h-[420px] w-full">
                  {trackingBus && trackingRoute ? (
                    <BusMap
                      bus={trackingBus}
                      route={trackingRoute}
                      tamilLanguage={tamilLanguage}
                      fitBoundsTrigger={fitBoundsTrigger}
                      allBuses={buses}
                      allRoutes={ROUTES}
                      onSelectBus={(busId, routeId) => {
                        setTrackingBusId(busId);
                        setTrackingRouteId(routeId);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 text-xs shadow-inner">
                      {tamilLanguage ? "வரைபடத்தை ஏற்ற ஒரு வழித்தடத்தை தேர்ந்தெடுக்கவும்" : "Select an active district route in the sidebar to initialize the Leaflet GPS map."}
                    </div>
                  )}
                </div>

                {/* LIVE STOPS TIMELINE */}
                {trackingBus && trackingRoute && (
                  <div className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-slate-200 dark:border-[#1e3a6e] p-4 flex flex-col h-[420px]">
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
                      <span className="text-[10px] font-mono font-black text-[#00d4ff] uppercase tracking-widest block">
                        📍 {tamilLanguage ? "நிறுத்தங்கள் காலவரிசை" : "LIVE STOPS TIMELINE"}
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-[#00d4ff]/10 text-[#00d4ff] px-2 py-0.5 rounded uppercase">
                        {trackingRoute.code}
                      </span>
                    </div>

                    <div className="overflow-y-auto pr-1 pl-6 flex-1 custom-scrollbar space-y-3 pt-1">
                      {trackingRoute.stops?.map((stop, index) => {
                        const isCurrent = trackingBus.currentStopIndex === index;
                        const isForward = trackingBus.direction === 'forward';
                        const totalStops = trackingRoute.stops?.length || 0;
                        const nextIdx = isForward 
                          ? Math.min(trackingBus.currentStopIndex + 1, totalStops - 1) 
                          : Math.max(trackingBus.currentStopIndex - 1, 0);
                        const isNext = nextIdx === index && trackingBus.currentStopIndex !== index;
                        
                        const isPast = isForward 
                          ? index < trackingBus.currentStopIndex 
                          : index > trackingBus.currentStopIndex;

                        let statusBadge = null;
                        let iconElement = null;
                        let itemBorderClass = "border-slate-200 dark:border-slate-800";

                        if (isCurrent) {
                          itemBorderClass = "border-blue-500 bg-blue-500/5 dark:bg-blue-500/10 rounded-lg p-2 -mx-2";
                          iconElement = (
                            <div className="absolute -left-3.5 top-2.5 h-7 w-7 bg-[#003580] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-[#0d1e3a] z-10 animate-bounce">
                              <BusIcon className="w-3.5 h-3.5" />
                            </div>
                          );
                          statusBadge = (
                            <span className="text-[8px] font-mono font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded tracking-wide uppercase">
                              {tamilLanguage ? "தற்போதைய இடம்" : "CURRENT"}
                            </span>
                          );
                        } else if (isNext) {
                          itemBorderClass = "border-amber-500 bg-amber-500/5 dark:bg-amber-500/10 rounded-lg p-2 -mx-2";
                          iconElement = (
                            <div className="absolute -left-2.5 top-3 h-5 w-5 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-[#0d1e3a] z-10 animate-pulse">
                              <Clock className="w-2.5 h-2.5" />
                            </div>
                          );
                          statusBadge = (
                            <span className="text-[8px] font-mono font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded tracking-wide uppercase">
                              {tamilLanguage ? "அடுத்தது" : "NEXT"} ({getSimulatedETA(trackingBus, trackingRoute)}m)
                            </span>
                          );
                        } else if (isPast) {
                          iconElement = (
                            <div className="absolute -left-1.5 top-4 h-3 w-3 bg-emerald-500 rounded-full flex items-center justify-center border border-white dark:border-[#0d1e3a] z-10">
                              <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                            </div>
                          );
                        } else {
                          iconElement = (
                            <div className="absolute -left-1.5 top-4 h-3 w-3 bg-slate-300 dark:bg-slate-700 rounded-full border border-white dark:border-[#0d1e3a] z-10"></div>
                          );
                        }

                        return (
                          <div key={`${stop.nameEN}-${index}`} className={`relative pl-6 pb-2.5 border-l-2 ${index === totalStops - 1 ? 'border-transparent' : 'border-slate-200 dark:border-slate-800'} ${itemBorderClass}`}>
                            {iconElement}
                            
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`text-xs font-bold leading-tight ${isCurrent ? 'text-blue-600 dark:text-blue-400' : isNext ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                  {tamilLanguage ? stop.nameTA : stop.nameEN}
                                </span>
                                {statusBadge}
                              </div>
                              <span className="text-[9px] font-mono text-slate-400 leading-none">
                                {stop.district} • {tamilLanguage ? "நிறுத்தம் " + (index + 1) : "Stop " + (index + 1)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* CLOUD DATABASE & PASSENGER COMMENTS FEED */}
              {trackingBus && trackingRoute && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  
                  {/* FEEDBACK COMMENT LIST */}
                  <div className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-slate-200 dark:border-[#1e3a6e] p-5 flex flex-col h-[340px]">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#00d4ff]" />
                        <h3 className="text-xs font-mono font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                          💬 PASSENGER FEEDBACK DATABASE
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded">
                        {feedbacks.filter(f => f.routeId === trackingRoute.id).length} reports
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                      {feedbacks.filter(f => f.routeId === trackingRoute.id).length > 0 ? (
                        feedbacks
                          .filter(f => f.routeId === trackingRoute.id)
                          .map((feed) => (
                            <div key={feed.id} className="p-3 bg-slate-50/50 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-900/60 transition-all flex flex-col gap-2 relative group">
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className="h-5 w-5 rounded-full bg-[#003580] text-white flex items-center justify-center text-[9px] font-mono">
                                    <User className="w-3 h-3" />
                                  </div>
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{feed.user}</span>
                                  <span className="text-[9px] font-mono text-slate-400">· {feed.timestamp}</span>
                                </div>

                                <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${
                                  feed.statusTag === 'Seats Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                  feed.statusTag === 'AC Working' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                                  feed.statusTag === 'Crowded' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                  feed.statusTag === 'On Time' ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20' :
                                  'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                  {feed.statusTag}
                                </span>
                              </div>

                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
                                {feed.comment}
                              </p>

                              <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-slate-100/50 dark:border-slate-800/40">
                                <button
                                  onClick={() => handleUpvoteFeedback(feed.id)}
                                  className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 hover:text-[#00d4ff] transition cursor-pointer"
                                >
                                  <ThumbsUp className="w-3 h-3 text-[#00d4ff]" />
                                  <span>{feed.upvotes} UPVOTES</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteFeedback(feed.id)}
                                  className="text-[9px] font-mono font-bold text-slate-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100 flex items-center gap-1 cursor-pointer"
                                  title="Delete record from database"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>REMOVE</span>
                                </button>
                              </div>

                            </div>
                          ))
                      ) : (
                        <div className="text-center py-12 text-xs text-slate-400">
                          {tamilLanguage ? "பதிவுகள் எதுவும் இல்லை. முதல் பதிவை வெளியிடவும்!" : "No passenger updates in database yet. Be the first to post live status!"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* POST COMMENT FORM */}
                  <div className="bg-white dark:bg-[#0d1e3a] rounded-xl shadow-md border border-slate-200 dark:border-[#1e3a6e] p-5 flex flex-col h-[340px]">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <Database className="w-4 h-4 text-[#00d4ff]" />
                      <h3 className="text-xs font-mono font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                        ✏️ POST REAL-TIME REPORT TO DATABASE
                      </h3>
                    </div>

                    <form onSubmit={handleAddFeedback} className="space-y-3.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        
                        <div>
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {tamilLanguage ? "பயணியின் பெயர்:" : "Your Name / Handle:"}
                          </label>
                          <input
                            type="text"
                            value={newCommentUser}
                            onChange={(e) => setNewCommentUser(e.target.value)}
                            placeholder={tamilLanguage ? "எ.கா. சரவணன் (SNS மாணவர்)..." : "e.g. Saravanan (SNS Student)..."}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition"
                            maxLength={35}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              {tamilLanguage ? "இயக்க நிலை:" : "Status Classification:"}
                            </label>
                            <select
                              value={newCommentTag}
                              onChange={(e) => setNewCommentTag(e.target.value as PassengerFeedback['statusTag'])}
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition"
                            >
                              <option value="On Time">On Time</option>
                              <option value="Seats Available">Seats Available</option>
                              <option value="AC Working">AC Working</option>
                              <option value="Crowded">Crowded</option>
                              <option value="Minor Delay">Minor Delay</option>
                            </select>
                          </div>

                          <div className="flex flex-col justify-end">
                            <span className="text-[9px] font-mono text-slate-400 block mb-1 text-right font-bold">
                              TARGET BUS: {trackingBus.busNumber}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {tamilLanguage ? "தற்போதைய நிலவரக் கருத்து:" : "Live Status Comment:"}
                          </label>
                          <textarea
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder={tamilLanguage ? "முக்கிய இடங்கள் அல்லது இருக்கைகளின் விபரங்களை எழுதவும்..." : "Share seat availability, crowd level, or road traffic updates..."}
                            className="w-full h-16 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition resize-none"
                            maxLength={150}
                            required
                          />
                        </div>

                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#003580] hover:bg-[#002d6d] dark:bg-[#00d4ff] dark:hover:bg-[#00a8cc] text-white dark:text-[#0f1f3d] py-2.5 px-4 rounded-lg font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{tamilLanguage ? "தகவலைச் சேமி (INSERT REPORT)" : "Insert Database Record"}</span>
                      </button>
                    </form>
                  </div>

                </div>
              )}

            </main>
          </div>
        )}

      </div>

      {/* ADMIN DATA MANAGEMENT MODAL */}
      <AdminDataModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        tamilLanguage={tamilLanguage}
      />

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-[#0f1f3d] to-[#081020] text-slate-400 text-xs py-8 border-t border-slate-800 shrink-0 select-none">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-white">
              <div className="bg-[#00d4ff] text-[#0f1f3d] p-1.5 rounded-sm flex items-center justify-center font-black">
                <BusIcon className="w-3.5 h-3.5" />
              </div>
              <span className="font-black text-sm tracking-tight">FastStop Tamil Nadu Transportation Engine</span>
            </div>
            <p className="text-[11px]">
              {tamilLanguage 
                ? "தமிழ்நாடு மாநில போக்குவரத்துக் கழகம் (TNSTC) & மாநகர போக்குவரத்துக் கழகம் (MTC) பேருந்துத் தரவுகள். அனைத்து 38 மாவட்டங்களும் இணைக்கப்பட்டுள்ளது." 
                : "Centralized Tamil Nadu transportation data architecture covering all 38 districts with local stops, downstream bus numbers, and real-time ETAs."}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono font-bold">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-[#00d4ff] hover:underline cursor-pointer flex items-center gap-1"
            >
              <Database className="w-3 h-3" />
              <span>Admin Engine & Schemas</span>
            </button>
            <span>•</span>
            <span>OSM Leaflet Map</span>
            <span>•</span>
            <span className="text-emerald-400">38 Districts Database Live</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
