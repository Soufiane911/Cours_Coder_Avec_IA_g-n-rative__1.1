import React, { useState } from 'react';

/**
 * Sidebar - Simplified and logical navigation for Dashaalia
 * Sections: Vue Principale, Expertise IA, Outils
 */
const Sidebar = ({ active = 'Dashboard', activeServices = [], onNavigate, hasActiveFilters, onResetFilters, onExportPDF }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const menuGroups = [
        {
            title: 'Vue Principale',
            items: [
                { name: 'Dashboard', icon: 'grid', description: 'Vue d\'ensemble' },
                { name: 'Analyses', icon: 'graph', description: 'Analyses détaillées' },
            ]
        },
        {
            title: 'Expertise IA',
            items: [
                { name: 'Qualité IA', icon: 'brain', description: 'Performance & Précision' },
                { name: 'Exploration', icon: 'table', description: 'Historique des sessions' },
            ]
        }
    ];

    const serviceFilters = [
        { name: 'Urgences', count: 124 },
        { name: 'Cardiologie', count: 82 },
        { name: 'Pédiatrie', count: 56 },
        { name: 'Gériatrie', count: 34 },
    ];

    const MenuItem = ({ item, onClick, isSub = false }) => {
        const isActive = isSub ? activeServices.includes(item.name) : item.name === active;
        const isHovered = hoveredItem === item.name;

        return (
            <div
                className={`
                    flex items-center gap-4 px-6 py-3 cursor-pointer transition-all duration-200 relative
                    ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
                `}
                onClick={() => onClick?.(item.name)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                {/* Active Indicator */}
                {isActive && (
                    <div className={`
                        absolute left-0 top-0 bottom-0 w-1 rounded-r-md shadow-lg
                        ${isSub
                            ? 'bg-purple-500 shadow-purple-500/20'
                            : 'bg-gradient-to-b from-[#CF57D3] to-[#9048F7] shadow-purple-500/50'
                        }
                    `}></div>
                )}

                {/* Background hover/active */}
                <div className={`
                    absolute inset-0 transition-opacity duration-200
                    ${isActive ? (isSub ? 'bg-purple-500/5 opacity-100' : 'bg-gradient-to-r from-[#cf57d315] to-transparent opacity-100') : ''}
                    ${isHovered && !isActive ? 'bg-white/[0.02] opacity-100' : 'opacity-0'}
                `}></div>

                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? (isSub ? 'bg-purple-500' : 'bg-[#D255D1]') : 'bg-current opacity-30'}`}></div>

                <div className="flex flex-col">
                    <span className={`text-[11px] font-bold tracking-tight relative z-10 ${isActive ? 'text-white' : ''}`}>
                        {item.name}
                    </span>
                    {item.description && !isSub && (
                        <span className="text-[9px] text-zinc-600 font-medium tracking-tight">
                            {item.description}
                        </span>
                    )}
                </div>

                {item.count !== undefined && (
                    <span className={`ml-auto text-[10px] font-mono font-bold relative z-10 ${isActive ? 'text-purple-400' : 'text-zinc-600'}`}>
                        {item.count}
                    </span>
                )}
            </div>
        );
    };

    return (
        <aside className="w-[260px] h-screen bg-[#15151A] flex flex-col py-8 overflow-y-auto border-r border-[#ffffff05]">
            <div className="px-8 mb-10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#CF57D3] to-[#9048F7] flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <span className="text-white font-black text-lg">D</span>
                </div>
                <div>
                    <h1 className="text-lg font-bold text-white tracking-tight leading-none">Dashaalia</h1>
                    <p className="text-[9px] text-[#22D3EE] font-bold uppercase tracking-widest mt-1">Medical Platform</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-6">
                {menuGroups.map((group) => (
                    <nav key={group.title} className="flex flex-col gap-1">
                        <h3 className="px-8 text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-3">{group.title}</h3>
                        {group.items.map((item) => (
                            <MenuItem key={item.name} item={item} onClick={onNavigate} />
                        ))}
                    </nav>
                ))}

                {/* Filters Section (Always visible for context) */}
                <nav className="flex flex-col gap-1 mt-4">
                    <h3 className="px-8 text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-3">Filtres Rapides</h3>
                    {serviceFilters.map((item) => (
                        <MenuItem key={item.name} item={item} onClick={onNavigate} isSub />
                    ))}
                </nav>
            </div>

            <div className="px-8 mt-4">
                {hasActiveFilters && (
                    <button
                        onClick={onResetFilters}
                        className="w-full mb-4 flex items-center justify-between px-4 py-2 bg-purple-500/10 rounded-xl text-[10px] text-purple-400 hover:bg-purple-500/20 transition-all border border-purple-500/20"
                    >
                        <span>Filtres actifs</span>
                        <span className="font-bold underline underline-offset-2">RESET</span>
                    </button>
                )}

                <button
                    onClick={onExportPDF}
                    className="w-full bg-[#1C1C24] text-white text-[11px] font-bold py-3 rounded-xl border border-white/5 hover:bg-[#2A2A35] transition-all flex items-center justify-center gap-2 print:hidden"
                >
                    <svg className="w-4 h-4 text-[#CF57D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 2 0 01.707.293l5.414 5.414a1 2 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Exporter PDF
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
