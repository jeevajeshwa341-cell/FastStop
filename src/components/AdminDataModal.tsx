import React, { useState } from 'react';
import { 
  Database, 
  X, 
  Plus, 
  Upload, 
  Download, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle, 
  FileText, 
  Trash2, 
  Edit3, 
  RefreshCw,
  Server,
  Layers,
  MapPin
} from 'lucide-react';
import { BusRoute, BusStop, District } from '../types';
import { DISTRICTS } from '../data/districts';
import { BUS_STOPS } from '../data/stops';
import { BUS_ROUTES } from '../data/routes';
import { validateRoute } from '../transportEngine';

interface AdminDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  tamilLanguage: boolean;
  onAddRoute?: (newRoute: BusRoute) => void;
  onAddStop?: (newStop: BusStop) => void;
}

export default function AdminDataModal({
  isOpen,
  onClose,
  tamilLanguage
}: AdminDataModalProps) {
  const [activeTab, setActiveTab] = useState<'routes' | 'stops' | 'import_export' | 'validation'>('routes');
  const [routesList, setRoutesList] = useState<BusRoute[]>(BUS_ROUTES);
  const [stopsList, setStopsList] = useState<BusStop[]>(BUS_STOPS);

  // Form states for creating a new Stop
  const [newStopName, setNewStopName] = useState('');
  const [newStopNameTA, setNewStopNameTA] = useState('');
  const [newStopDistrict, setNewStopDistrict] = useState('dist_coimbatore');
  const [newStopLocality, setNewStopLocality] = useState('');
  const [newStopTown, setNewStopTown] = useState('');
  const [newStopLat, setNewStopLat] = useState('11.0168');
  const [newStopLng, setNewStopLng] = useState('76.9558');
  const [stopSuccessMsg, setStopSuccessMsg] = useState<string | null>(null);

  // JSON Import / Export text
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // Run validation on all current routes
  const validationResults = routesList.map(r => ({
    route: r,
    validation: validateRoute(r, stopsList, DISTRICTS)
  }));

  const handleCreateStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStopName.trim()) return;

    const newStop: BusStop = {
      id: `stop_${Date.now()}`,
      stop_name: newStopName.trim(),
      stop_name_ta: newStopNameTA.trim() || newStopName.trim(),
      aliases: [newStopName.trim()],
      latitude: parseFloat(newStopLat) || 11.0168,
      longitude: parseFloat(newStopLng) || 76.9558,
      district_id: newStopDistrict,
      town: newStopTown.trim() || 'Main Town',
      locality: newStopLocality.trim() || 'Central',
      stop_type: 'town_stop',
      verification_status: 'VERIFIED',
      is_active: true,
      nearby_landmarks: []
    };

    setStopsList([newStop, ...stopsList]);
    setStopSuccessMsg(`Added stop "${newStop.stop_name}" successfully.`);
    setNewStopName('');
    setNewStopNameTA('');
    setNewStopLocality('');
    setNewStopTown('');
    setTimeout(() => setStopSuccessMsg(null), 3000);
  };

  const handleExportJSON = () => {
    const data = {
      districts: DISTRICTS,
      stops: stopsList,
      routes: routesList,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faststop_tn_transport_db_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed.routes && Array.isArray(parsed.routes)) {
        setRoutesList(parsed.routes);
      }
      if (parsed.stops && Array.isArray(parsed.stops)) {
        setStopsList(parsed.stops);
      }
      setImportStatus('Database imported successfully!');
      setTimeout(() => setImportStatus(null), 3000);
    } catch (err: any) {
      setImportStatus(`Import Error: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0d1e3a] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003580] to-[#0f1f3d] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00d4ff] text-[#0f1f3d] rounded-lg shadow font-black">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg">
                {tamilLanguage ? "போக்குவரத்து மேலாண்மை & நிர்வாக பலகை" : "FastStop Transportation Data Management & Admin Panel"}
              </h2>
              <p className="text-xs text-slate-300 font-mono">
                Centralized 38 Districts Database Engine · Schemas, Validation & CSV/JSON Pipeline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition cursor-pointer ${
              activeTab === 'routes'
                ? 'border-[#003580] dark:border-[#00d4ff] text-[#003580] dark:text-[#00d4ff]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Routes ({routesList.length})
          </button>
          <button
            onClick={() => setActiveTab('stops')}
            className={`px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition cursor-pointer ${
              activeTab === 'stops'
                ? 'border-[#003580] dark:border-[#00d4ff] text-[#003580] dark:text-[#00d4ff]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Stops Database ({stopsList.length})
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className={`px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition cursor-pointer ${
              activeTab === 'validation'
                ? 'border-[#003580] dark:border-[#00d4ff] text-[#003580] dark:text-[#00d4ff]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Data Validation Engine
          </button>
          <button
            onClick={() => setActiveTab('import_export')}
            className={`px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition cursor-pointer ${
              activeTab === 'import_export'
                ? 'border-[#003580] dark:border-[#00d4ff] text-[#003580] dark:text-[#00d4ff]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            JSON Import / Export
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* TAB 1: ROUTES */}
          {activeTab === 'routes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  Registered Active Bus Routes across Tamil Nadu
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  Total: {routesList.length} Verified & Active Routes
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-900 font-mono text-slate-500 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Route No</th>
                      <th className="p-3">Route Name</th>
                      <th className="p-3">Operator</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Stops</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                    {routesList.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-3 font-mono font-bold text-[#003580] dark:text-[#00d4ff]">
                          {r.route_number}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-800 dark:text-slate-200">{r.route_name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{r.route_name_ta}</div>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">{r.operator}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-[10px]">
                            {r.bus_type}
                          </span>
                        </td>
                        <td className="p-3 font-mono">{r.stops.length} stops</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: STOPS */}
          {activeTab === 'stops' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Add New Stop Form */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#003580] dark:text-[#00d4ff]" />
                  Add New Bus Stop
                </h4>

                {stopSuccessMsg && (
                  <div className="mb-3 p-2.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold">
                    {stopSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleCreateStop} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Stop Name (English)</label>
                    <input
                      type="text"
                      value={newStopName}
                      onChange={(e) => setNewStopName(e.target.value)}
                      placeholder="e.g. Saravanampatti Checkpost"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Stop Name (Tamil)</label>
                    <input
                      type="text"
                      value={newStopNameTA}
                      onChange={(e) => setNewStopNameTA(e.target.value)}
                      placeholder="எ.கா. சரவணம்பட்டி செக்போஸ்ட்"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">District</label>
                      <select
                        value={newStopDistrict}
                        onChange={(e) => setNewStopDistrict(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 font-semibold"
                      >
                        {DISTRICTS.map(d => (
                          <option key={d.id} value={d.id}>{d.nameEN}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Town / City</label>
                      <input
                        type="text"
                        value={newStopTown}
                        onChange={(e) => setNewStopTown(e.target.value)}
                        placeholder="Coimbatore"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Locality</label>
                    <input
                      type="text"
                      value={newStopLocality}
                      onChange={(e) => setNewStopLocality(e.target.value)}
                      placeholder="Sathy Road / Saravanampatti"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Latitude</label>
                      <input
                        type="text"
                        value={newStopLat}
                        onChange={(e) => setNewStopLat(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Longitude</label>
                      <input
                        type="text"
                        value={newStopLng}
                        onChange={(e) => setNewStopLng(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#003580] hover:bg-[#002766] text-white font-bold py-2.5 rounded-lg transition mt-2 cursor-pointer shadow"
                  >
                    Add Bus Stop to Database
                  </button>
                </form>
              </div>

              {/* Existing Stops Table */}
              <div className="lg:col-span-7 h-[450px] overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-900 font-mono text-slate-500 uppercase text-[10px] sticky top-0">
                    <tr>
                      <th className="p-3">Stop Name</th>
                      <th className="p-3">District</th>
                      <th className="p-3">Locality</th>
                      <th className="p-3">Coords</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                    {stopsList.map(s => {
                      const dist = DISTRICTS.find(d => d.id === s.district_id);
                      return (
                        <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                          <td className="p-3">
                            <div className="font-bold text-slate-800 dark:text-slate-200">{s.stop_name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{s.stop_name_ta}</div>
                          </td>
                          <td className="p-3 text-slate-600 dark:text-slate-400 font-medium">{dist?.nameEN}</td>
                          <td className="p-3 text-slate-500 font-mono">{s.locality}</td>
                          <td className="p-3 text-slate-400 font-mono text-[10px]">
                            {s.latitude.toFixed(3)}, {s.longitude.toFixed(3)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: VALIDATION ENGINE */}
          {activeTab === 'validation' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Automated Integrity Engine Verification</p>
                  <p className="mt-0.5">
                    Validates that every route stop exists in the master bus stop registry, stop order is sequential, coordinates are populated, and routes do not contain duplicate loops.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {validationResults.map(({ route, validation }) => (
                  <div
                    key={route.id}
                    className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                      validation.isValid
                        ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10'
                        : 'border-rose-200 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#003580] dark:text-[#00d4ff]">
                          Bus {route.route_number}
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {route.route_name}
                        </span>
                      </div>
                      <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                        {route.stops.length} sequential route checkpoints · {route.operator}
                      </div>

                      {!validation.isValid && (
                        <div className="mt-2 text-rose-600 dark:text-rose-400 font-mono text-[11px]">
                          Errors: {validation.errors.join('; ')}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0">
                      {validation.isValid ? (
                        <span className="px-3 py-1 bg-emerald-600 text-white font-mono font-bold text-[10px] rounded-full uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED VALID
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-rose-600 text-white font-mono font-bold text-[10px] rounded-full uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> INTEGRITY FAILED
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: IMPORT / EXPORT */}
          {activeTab === 'import_export' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl">
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Export Complete Database</h4>
                  <p className="text-xs text-slate-500">Download all 38 districts, stops, and routes as structured JSON.</p>
                </div>
                <button
                  onClick={handleExportJSON}
                  className="bg-[#003580] hover:bg-[#002766] text-white font-mono font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Download className="w-4 h-4" />
                  Export JSON
                </button>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">Import Transportation JSON</h4>
                <textarea
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder='Paste valid FastStop JSON containing { "routes": [...], "stops": [...] }'
                  rows={8}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#00d4ff]"
                />

                {importStatus && (
                  <div className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                    {importStatus}
                  </div>
                )}

                <button
                  onClick={handleImportJSON}
                  className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Upload className="w-4 h-4" />
                  Import & Sync Database
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition cursor-pointer"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
