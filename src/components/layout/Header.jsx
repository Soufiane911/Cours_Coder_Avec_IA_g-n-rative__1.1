import { useState } from 'react';

/**
 * Header - Barre de navigation principale du dashboard
 */
const Header = ({ darkMode, setDarkMode }) => {
    return (
        <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🏥</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">Dashaalia</h1>
                    <p className="text-xs text-slate-400">Dashboard Analytique</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                    title={darkMode ? 'Mode clair' : 'Mode sombre'}
                >
                    {darkMode ? '🌙' : '☀️'}
                </button>

                {/* Info */}
                <div className="text-right hidden md:block">
                    <p className="text-sm text-slate-300">Interprétariat Médical IA</p>
                    <p className="text-xs text-slate-500">320 sessions analysées</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
