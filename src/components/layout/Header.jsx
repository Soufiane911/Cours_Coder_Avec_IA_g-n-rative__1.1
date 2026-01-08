import React from 'react';

/**
 * Header - Obsidian Analytics Premium Header
 * Clean, minimal design with glowing accents
 */
const Header = ({ children }) => {
    return (
        <header className="sticky top-0 z-50 px-6 py-4">
            <div className="flex items-center justify-between max-w-[1800px] mx-auto">

                {/* Logo & Brand */}
                <div className="flex items-center gap-4 group cursor-pointer">
                    {/* Animated Logo */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 via-cyan-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg tracking-tight">D</span>
                        </div>
                    </div>

                    {/* Brand Text */}
                    <div className="flex flex-col">
                        <h1 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                            DASHAALIA
                        </h1>
                        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.2em]">
                            Analytics Platform
                        </span>
                    </div>
                </div>

                {/* Center: Filters */}
                <div className="flex-1 flex justify-center px-8">
                    {children}
                </div>

                {/* Right: Status & Actions */}
                <div className="flex items-center gap-5">
                    {/* Live Status Badge */}
                    <div className="badge badge-live">
                        <span>System Live</span>
                    </div>

                    {/* Latency Indicator */}
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-mono text-zinc-400">Latency</span>
                        <span className="text-sm font-mono font-semibold text-emerald-400">12ms</span>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-zinc-800"></div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Notifications */}
                        <button className="relative p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-200">
                            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                        </button>

                        {/* Export */}
                        <button className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/30 hover:bg-zinc-800/50 transition-all duration-200 group">
                            <svg className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
