import { useState } from 'react';

/**
 * DateRangeFilter - Filtre par plage de dates (supporte le mode compact)
 */
const DateRangeFilter = ({ startDate, endDate, onChange, compact = false }) => {
    const formatDateForInput = (date) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    const handleStartChange = (e) => {
        const value = e.target.value;
        const newStart = value ? new Date(value) : null;
        onChange(newStart, endDate);
    };

    const handleEndChange = (e) => {
        const value = e.target.value;
        const newEnd = value ? new Date(value) : null;
        onChange(startDate, newEnd);
    };

    if (compact) {
        return (
            <div className="flex items-center gap-1">
                <input
                    type="date"
                    value={formatDateForInput(startDate)}
                    onChange={handleStartChange}
                    className="px-2 py-1 bg-transparent border border-transparent hover:border-slate-600 rounded text-slate-300 text-[10px] focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                    title="Date de début"
                />
                <span className="text-slate-600 text-[10px]">-</span>
                <input
                    type="date"
                    value={formatDateForInput(endDate)}
                    onChange={handleEndChange}
                    className="px-2 py-1 bg-transparent border border-transparent hover:border-slate-600 rounded text-slate-300 text-[10px] focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                    title="Date de fin"
                />
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                Période
            </label>
            <div className="space-y-2">
                <div>
                    <label className="text-xs text-slate-500">Du</label>
                    <input
                        type="date"
                        value={formatDateForInput(startDate)}
                        onChange={handleStartChange}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="text-xs text-slate-500">Au</label>
                    <input
                        type="date"
                        value={formatDateForInput(endDate)}
                        onChange={handleEndChange}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-1">
                {[
                    { label: '7j', days: 7 },
                    { label: '30j', days: 30 },
                    { label: '90j', days: 90 },
                ].map(({ label, days }) => (
                    <button
                        key={label}
                        onClick={() => {
                            const end = new Date();
                            const start = new Date();
                            start.setDate(start.getDate() - days);
                            onChange(start, end);
                        }}
                        className="px-2 py-1 text-xs bg-slate-600 hover:bg-slate-500 rounded text-slate-300 transition-colors"
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DateRangeFilter;
