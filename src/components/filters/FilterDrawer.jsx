import React, { useEffect } from 'react';
import DateRangeFilter from './DateRangeFilter';
import ServiceFilter from './ServiceFilter';
import LanguageFilter from './LanguageFilter';
import DeviceFilter from './DeviceFilter';

const FilterDrawer = ({ isOpen, onClose, filters, onFilterChange }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleReset = () => {
        onFilterChange({
            startDate: null,
            endDate: null,
            services: [],
            langues: [],
            devices: []
        });
    };

    const activeFiltersCount = [
        filters.startDate || filters.endDate,
        filters.services.length > 0,
        filters.langues.length > 0,
        filters.devices.length > 0,
    ].filter(Boolean).length;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`
                    fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
                    transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`
                    fixed right-0 top-0 h-full w-full max-w-md z-50
                    bg-zinc-950 border-l border-zinc-800
                    transform transition-transform duration-300 ease-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Filtres</h2>
                            <p className="text-xs text-zinc-500">
                                {activeFiltersCount > 0
                                    ? `${activeFiltersCount} filtre${activeFiltersCount > 1 ? 's' : ''} actif${activeFiltersCount > 1 ? 's' : ''}`
                                    : 'Aucun filtre actif'
                                }
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-180px)]">
                    {/* Date Range */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Période
                        </label>
                        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                            <DateRangeFilter
                                startDate={filters.startDate}
                                endDate={filters.endDate}
                                onChange={(start, end) => onFilterChange({ ...filters, startDate: start, endDate: end })}
                            />
                        </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Services médicaux
                        </label>
                        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                            <ServiceFilter
                                selected={filters.services}
                                onChange={(services) => onFilterChange({ ...filters, services })}
                            />
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            Langues
                        </label>
                        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                            <LanguageFilter
                                selected={filters.langues}
                                onChange={(langues) => onFilterChange({ ...filters, langues })}
                            />
                        </div>
                    </div>

                    {/* Devices */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Appareils
                        </label>
                        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                            <DeviceFilter
                                selected={filters.devices}
                                onChange={(devices) => onFilterChange({ ...filters, devices })}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-zinc-950 border-t border-zinc-800">
                    <div className="flex gap-3">
                        <button
                            onClick={handleReset}
                            className="flex-1 py-3 px-4 rounded-xl border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-800 transition-colors"
                        >
                            Réinitialiser
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:opacity-90 transition-opacity"
                        >
                            Appliquer
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterDrawer;
