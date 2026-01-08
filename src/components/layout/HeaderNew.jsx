import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const HeaderNew = ({ onOpenFilters, hasActiveFilters, totalSessions }) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Left: Breadcrumb */}
                <div className="flex items-center gap-3">
                    <nav className="flex items-center gap-2 text-sm">
                        <span className="text-zinc-500">Accueil</span>
                        <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-white font-medium">Dashboard</span>
                    </nav>
                </div>

                {/* Center: Search */}
                <div className="flex-1 max-w-xl mx-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher sessions, langues, services..."
                            className="
                                w-full h-10 pl-10 pr-4
                                bg-zinc-900/80 border border-zinc-800
                                rounded-xl text-sm text-white
                                placeholder:text-zinc-600
                                focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20
                                transition-all duration-200
                            "
                        />
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-mono text-zinc-600 bg-zinc-800 rounded border border-zinc-700">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Filter Button */}
                    <button
                        onClick={onOpenFilters}
                        className={`
                            relative flex items-center gap-2 px-4 py-2 rounded-xl
                            border transition-all duration-200
                            ${hasActiveFilters
                                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                            }
                        `}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span className="text-sm font-medium">Filtres</span>
                        {hasActiveFilters && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        )}
                    </button>

                    {/* Session Count */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm font-mono font-bold text-white">{totalSessions}</span>
                        <span className="text-xs text-zinc-500">sessions</span>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-zinc-800" />

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                        title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
                        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
                    </button>

                    {/* User Avatar */}
                    <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">S</span>
                        </div>
                        <div className="hidden lg:flex flex-col items-start">
                            <span className="text-sm font-medium text-white">Soufiane</span>
                            <span className="text-[10px] text-zinc-500">Admin</span>
                        </div>
                        <svg className="w-4 h-4 text-zinc-500 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderNew;
