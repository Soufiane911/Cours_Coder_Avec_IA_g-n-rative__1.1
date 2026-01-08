import React from 'react';
import DateRangeFilter from './DateRangeFilter';
import ServiceFilter from './ServiceFilter';
import LanguageFilter from './LanguageFilter';
import DeviceFilter from './DeviceFilter';

/**
 * FilterBar - Obsidian Analytics Filter Bar
 * Sleek, compact filter controls with modern styling
 */
const FilterBar = ({ filters, onFilterChange, totalSessions }) => {
    return (
        <div className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-xl px-4 py-2.5 rounded-xl border border-zinc-800/80">
            {/* Date Range */}
            <DateRangeFilter
                startDate={filters.startDate}
                endDate={filters.endDate}
                onChange={(start, end) => onFilterChange({ ...filters, startDate: start, endDate: end })}
                compact={true}
            />

            {/* Divider */}
            <div className="h-5 w-px bg-zinc-700/50"></div>

            {/* Service Filter */}
            <ServiceFilter
                selected={filters.services}
                onChange={(services) => onFilterChange({ ...filters, services })}
                compact={true}
            />

            {/* Language Filter */}
            <LanguageFilter
                selected={filters.langues}
                onChange={(langues) => onFilterChange({ ...filters, langues })}
                compact={true}
            />

            {/* Device Filter */}
            <DeviceFilter
                selected={filters.devices}
                onChange={(devices) => onFilterChange({ ...filters, devices })}
                compact={true}
            />

            {/* Divider */}
            <div className="h-5 w-px bg-zinc-700/50"></div>

            {/* Reset Button */}
            <button
                onClick={() => onFilterChange({
                    startDate: null,
                    endDate: null,
                    services: [],
                    langues: [],
                    devices: []
                })}
                className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200 group"
                title="Reset Filters"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:rotate-[-45deg] transition-transform duration-300"
                >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                </svg>
            </button>

            {/* Session Counter */}
            <div className="ml-1 px-3 py-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-[11px] font-bold font-mono text-cyan-400 tracking-wide">
                    {totalSessions}
                </span>
                <span className="text-[10px] font-medium text-cyan-500/70 uppercase tracking-wider">
                    sessions
                </span>
            </div>
        </div>
    );
};

export default FilterBar;
