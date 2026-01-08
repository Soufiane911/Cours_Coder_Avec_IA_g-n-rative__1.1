import { useState } from 'react';

const SidebarCRM = ({ activeSection = 'Graphs', onSectionChange }) => {
    const [expandedMenus, setExpandedMenus] = useState(['REPORT', 'CHANNELS', 'SESSION_STATUS']);

    const toggleMenu = (menu) => {
        setExpandedMenus(prev =>
            prev.includes(menu)
                ? prev.filter(m => m !== menu)
                : [...prev, menu]
        );
    };

    const menuItems = {
        PROFILE: {
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            label: 'PROFILE',
            color: 'violet'
        },
        REPORT: {
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            label: 'REPORT',
            color: 'rose',
            submenu: [
                { id: 'Graphs', label: 'Graphs' },
                { id: 'Stats', label: 'Stats' }
            ]
        },
        CHANNELS: {
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            label: 'CHANNELS',
            color: 'cyan',
            submenu: [
                { id: 'Webapp', label: 'Webapp' },
                { id: 'Mobile', label: 'Mobile' }
            ]
        },
        SESSION_STATUS: {
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
            label: 'SESSION STATUS',
            color: 'amber',
            submenu: [
                { id: 'Completed', label: 'Completed', badge: true },
                { id: 'InProgress', label: 'In Progress' },
                { id: 'Pending', label: 'Pending' },
                { id: 'HighQuality', label: 'High Quality' },
                { id: 'LowQuality', label: 'Low Quality' }
            ]
        }
    };

    const colorClasses = {
        violet: 'text-violet-400',
        rose: 'text-rose-400',
        cyan: 'text-cyan-400',
        amber: 'text-amber-400'
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-[220px] bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-800/50 flex flex-col z-50">
            {/* Logo */}
            <div className="p-5 border-b border-zinc-800/50">
                <h1 className="text-lg font-bold text-white tracking-tight">
                    CRM Dashboard
                </h1>
                <p className="text-[10px] text-zinc-500 mt-0.5">Medical Interpretation</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {Object.entries(menuItems).map(([key, item]) => (
                    <div key={key}>
                        {/* Menu Header */}
                        <button
                            onClick={() => item.submenu && toggleMenu(key)}
                            className={`
                                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                                transition-all duration-200 group
                                ${item.submenu ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-800/50'}
                            `}
                        >
                            <span className={colorClasses[item.color]}>
                                {item.icon}
                            </span>
                            <span className={`text-xs font-semibold tracking-wide ${colorClasses[item.color]}`}>
                                {item.label}
                            </span>
                            {item.submenu && (
                                <svg
                                    className={`w-3 h-3 ml-auto text-zinc-500 transition-transform duration-200 ${expandedMenus.includes(key) ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </button>

                        {/* Submenu */}
                        {item.submenu && expandedMenus.includes(key) && (
                            <div className="ml-4 mt-1 space-y-0.5">
                                {item.submenu.map((subItem) => (
                                    <button
                                        key={subItem.id}
                                        onClick={() => onSectionChange?.(subItem.id)}
                                        className={`
                                            w-full flex items-center gap-2 px-3 py-2 rounded-lg
                                            text-xs transition-all duration-200
                                            ${activeSection === subItem.id
                                                ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                                            }
                                        `}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${activeSection === subItem.id ? 'bg-cyan-400' : 'bg-zinc-600'}`} />
                                        {subItem.label}
                                        {subItem.badge && (
                                            <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold bg-cyan-500/20 text-cyan-400 rounded">
                                                NEW
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-800/50">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-200">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="text-xs font-medium text-zinc-300">Full Sessions Report</span>
                    <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/20 text-rose-400 rounded">
                        PDF
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default SidebarCRM;
