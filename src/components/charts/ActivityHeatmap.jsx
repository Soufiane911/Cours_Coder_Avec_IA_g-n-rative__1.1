import React, { useMemo } from 'react';

/**
 * ActivityHeatmap - Obsidian Analytics Heatmap
 * Activity density visualization with cyan gradient
 */
const ActivityHeatmap = () => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const hours = Array.from({ length: 12 }, (_, i) => i + 8);

    // Memoize intensity data to prevent re-renders
    const intensityData = useMemo(() => {
        return days.map(() =>
            hours.map(() => Math.floor(Math.random() * 4))
        );
    }, []);

    const getColorClass = (intensity) => {
        const colors = [
            'bg-zinc-800/40',           // 0: empty
            'bg-cyan-900/50',           // 1: low
            'bg-cyan-600/60',           // 2: medium
            'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]', // 3: high
        ];
        return colors[intensity];
    };

    return (
        <div className="w-full h-full p-5 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
                        Densité d'Activité
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Cette semaine</p>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 text-[9px] text-zinc-500">
                    <span>Moins</span>
                    <div className="flex gap-0.5">
                        <div className="w-2.5 h-2.5 bg-zinc-800/40 rounded"></div>
                        <div className="w-2.5 h-2.5 bg-cyan-900/50 rounded"></div>
                        <div className="w-2.5 h-2.5 bg-cyan-600/60 rounded"></div>
                        <div className="w-2.5 h-2.5 bg-cyan-400 rounded"></div>
                    </div>
                    <span>Plus</span>
                </div>
            </div>

            {/* Heatmap Grid */}
            <div className="flex-1 flex flex-col justify-between gap-1">
                {days.map((day, dayIndex) => (
                    <div key={day} className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-zinc-500 w-7 text-right">
                            {day}
                        </span>
                        <div className="flex-1 flex gap-1">
                            {hours.map((h, hourIndex) => (
                                <div
                                    key={h}
                                    className={`
                                        flex-1 h-4 rounded 
                                        ${getColorClass(intensityData[dayIndex][hourIndex])} 
                                        transition-all duration-200 
                                        hover:scale-110 hover:z-10
                                        cursor-pointer
                                    `}
                                    title={`${day} ${h}h:00`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Time labels */}
            <div className="flex justify-between pl-10 mt-3 text-[9px] text-zinc-600 font-mono">
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
            </div>
        </div>
    );
};

export default ActivityHeatmap;
