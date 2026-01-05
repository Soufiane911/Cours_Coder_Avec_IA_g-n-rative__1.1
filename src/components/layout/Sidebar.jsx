import { useState } from 'react';
import DateRangeFilter from '../filters/DateRangeFilter';
import ServiceFilter from '../filters/ServiceFilter';
import LanguageFilter from '../filters/LanguageFilter';
import DeviceFilter from '../filters/DeviceFilter';

/**
 * Sidebar - Panneau latéral avec les filtres
 */
const Sidebar = ({ filters, onFilterChange, sessions }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={`
        ${isCollapsed ? 'w-16' : 'w-72'} 
        bg-slate-800/50 backdrop-blur-md border-r border-slate-700 
        transition-all duration-300 flex flex-col
        fixed md:relative h-[calc(100vh-73px)] z-40
      `}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-4 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors z-50"
            >
                {isCollapsed ? '→' : '←'}
            </button>

            {/* Filters Content */}
            {!isCollapsed && (
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <span>🔍</span> Filtres
                    </h2>

                    <DateRangeFilter
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        onChange={(start, end) => onFilterChange({ ...filters, startDate: start, endDate: end })}
                    />

                    <ServiceFilter
                        selected={filters.services}
                        onChange={(services) => onFilterChange({ ...filters, services })}
                    />

                    <LanguageFilter
                        selected={filters.langues}
                        onChange={(langues) => onFilterChange({ ...filters, langues })}
                    />

                    <DeviceFilter
                        selected={filters.devices}
                        onChange={(devices) => onFilterChange({ ...filters, devices })}
                    />

                    {/* Reset Button */}
                    <button
                        onClick={() => onFilterChange({
                            startDate: null,
                            endDate: null,
                            services: [],
                            langues: [],
                            devices: []
                        })}
                        className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm"
                    >
                        ↻ Réinitialiser les filtres
                    </button>

                    {/* Active Filters Count */}
                    {sessions && (
                        <div className="text-center py-2 bg-blue-500/20 rounded-lg">
                            <p className="text-blue-400 text-sm font-medium">
                                {sessions.length} sessions filtrées
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Collapsed State */}
            {isCollapsed && (
                <div className="p-2 flex flex-col items-center gap-3 pt-12">
                    <span className="text-xl" title="Filtres">🔍</span>
                    <span className="text-xl" title="Date">📅</span>
                    <span className="text-xl" title="Services">🏥</span>
                    <span className="text-xl" title="Langues">🌍</span>
                    <span className="text-xl" title="Device">📱</span>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
