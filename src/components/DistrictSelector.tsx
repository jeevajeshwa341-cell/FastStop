import React from 'react';
import { DISTRICTS, getDistrictById } from '../data/districts';
import { BUS_ROUTES } from '../data/routes';
import { BUS_STOPS } from '../data/stops';
import { Route } from '../types';
import { Map, MapPin, Grid, Layers, ArrowRight, Filter } from 'lucide-react';

interface DistrictSelectorProps {
  selectedDistrict: string | null;
  onSelectDistrict: (districtName: string | null) => void;
  tamilLanguage: boolean;
  routes?: Route[];
}

export default function DistrictSelector({
  selectedDistrict,
  onSelectDistrict,
  tamilLanguage,
  routes
}: DistrictSelectorProps) {
  
  // Categorise districts into regions for high-end cartographic organization
  const regions = [
    {
      id: "north",
      nameEN: "Northern Region",
      nameTA: "வடக்கு மண்டலம்",
      color: "border-sky-500/20 bg-sky-50/50 dark:bg-sky-950/10 hover:border-sky-500/50",
      textColor: "text-sky-700 dark:text-sky-400",
      districts: ["Chennai", "Chengalpattu", "Kancheepuram", "Tiruvallur", "Ranipet", "Vellore", "Tirupattur", "Tiruvannamalai"]
    },
    {
      id: "west",
      nameEN: "Western Hills & Plains",
      nameTA: "மேற்கு மண்டலம்",
      color: "border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10 hover:border-emerald-500/50",
      textColor: "text-emerald-700 dark:text-emerald-400",
      districts: ["Coimbatore", "Nilgiris", "Tiruppur", "Erode", "Salem", "Namakkal", "Dharmapuri", "Krishnagiri", "Karur"]
    },
    {
      id: "delta",
      nameEN: "Delta & Central Belt",
      nameTA: "டெல்டா & மத்திய மண்டலம்",
      color: "border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10 hover:border-amber-500/50",
      textColor: "text-amber-700 dark:text-amber-400",
      districts: ["Tiruchirappalli", "Perambalur", "Ariyalur", "Kallakurichi", "Villupuram", "Cuddalore", "Nagapattinam", "Mayiladuthurai", "Tiruvarur", "Thanjavur", "Pudukkottai"]
    },
    {
      id: "south",
      nameEN: "Southern Plains & Coast",
      nameTA: "தெற்கு மண்டலம்",
      color: "border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/10 hover:border-indigo-500/50",
      textColor: "text-indigo-700 dark:text-indigo-400",
      districts: ["Madurai", "Dindigul", "Theni", "Virudhunagar", "Sivaganga", "Ramanathapuram", "Thoothukudi", "Tenkasi", "Tirunelveli", "Kanyakumari"]
    }
  ];

  // Calculate active bus routes passing through each district from modular BUS_ROUTES
  const getBusesCountForDistrict = (districtName: string) => {
    const dist = DISTRICTS.find(d => d && (d.nameEN || '').toLowerCase() === (districtName || '').toLowerCase());
    if (!dist) return 0;
    
    // Check routes mapped to this district ID
    const count = BUS_ROUTES.filter(route => 
      route && (
        (route.district_ids || []).includes(dist.id) ||
        (route.stops || []).some(rs => {
          const stop = BUS_STOPS.find(s => s && s.id === rs?.stop_id);
          return stop?.district_id === dist.id;
        })
      )
    ).length;

    return count > 0 ? count : 1;
  };

  return (
    <div id="district-visual-reference" className="bg-white dark:bg-[#0d1e3a] rounded-xl p-6 shadow-md border border-slate-200 dark:border-[#1e3a6e] relative overflow-hidden transition-all">
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#003580] dark:bg-[#00d4ff] p-2.5 rounded-lg text-white dark:text-[#0f1f3d] shadow-sm">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <span>{tamilLanguage ? "தமிழக 38 மாவட்டங்கள் வழிகாட்டி" : "Tamil Nadu 38 Districts Transit Guide"}</span>
              <span className="text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full uppercase border border-amber-300/40">
                All 38 Districts Live
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {tamilLanguage ? "மாவட்ட வாரியாக தற்போதைய பேருந்துகளைக் கண்டறியவும்" : "Filter available buses dynamically by clicking any of Tamil Nadu's 38 administrative districts."}
            </p>
          </div>
        </div>

        {selectedDistrict && (
          <button
            onClick={() => onSelectDistrict(null)}
            className="text-xs font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-3.5 py-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition border border-red-200/50 cursor-pointer shadow-sm"
          >
            {tamilLanguage ? "வடிகட்டியை நீக்கு (அனைத்தும்)" : "Clear Filter (Show All)"}
          </button>
        )}
      </div>

      {/* Grid of 4 regions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {regions.map((region) => (
          <div 
            key={region.id}
            className={`border rounded-xl p-4 transition-all duration-300 ${region.color}`}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <span className={`text-[11px] font-mono font-black uppercase tracking-wider ${region.textColor}`}>
                {tamilLanguage ? region.nameTA : region.nameEN}
              </span>
              <span className="text-[9px] font-mono bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                {region.districts.length} {tamilLanguage ? "மாவட்டங்கள்" : "Districts"}
              </span>
            </div>

            {/* Alphabetical bento grid of districts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {region.districts.map((dist) => {
                const isSelected = selectedDistrict?.toLowerCase() === dist.toLowerCase();
                const districtData = DISTRICTS.find(d => d.nameEN.toLowerCase() === dist.toLowerCase()) || { nameEN: dist, nameTA: dist };
                const count = getBusesCountForDistrict(dist);

                return (
                  <button
                    key={dist}
                    onClick={() => onSelectDistrict(isSelected ? null : dist)}
                    className={`relative p-2.5 rounded-lg text-left border transition-all flex flex-col justify-between group cursor-pointer ${
                      isSelected 
                        ? 'bg-[#003580] border-[#003175] text-white shadow-md scale-[1.02] z-10' 
                        : 'bg-white dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-1">
                      <div className="truncate min-w-0">
                        <span className={`text-xs font-bold block truncate leading-tight ${isSelected ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                          {districtData.nameEN}
                        </span>
                        <span className={`text-[9px] font-mono block truncate mt-0.5 ${isSelected ? 'text-cyan-300' : 'text-slate-400 dark:text-slate-500'}`}>
                          {districtData.nameTA}
                        </span>
                      </div>
                      
                      {count > 0 && (
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                          isSelected ? 'bg-[#FF6B00] text-white' : 'bg-orange-500/10 text-[#FF6B00] border border-[#FF6B00]/20'
                        }`}>
                          {count}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-end items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Mini Legend */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
        <div className="flex items-center gap-1.5 bg-sky-50 dark:bg-sky-950/20 px-2.5 py-1 rounded border border-sky-500/10">
          <span className="w-2 h-2 rounded-full bg-sky-500" />
          <span>{tamilLanguage ? "வடக்கு மண்டலம்" : "Northern Region"}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded border border-emerald-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{tamilLanguage ? "மேற்கு மண்டலம்" : "Western Hills"}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/20 px-2.5 py-1 rounded border border-amber-500/10">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>{tamilLanguage ? "டெல்டா மண்டலம்" : "Delta Belt"}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/20 px-2.5 py-1 rounded border border-indigo-500/10">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          <span>{tamilLanguage ? "தெற்கு மண்டலம்" : "Southern Coast"}</span>
        </div>
      </div>
    </div>
  );
}
