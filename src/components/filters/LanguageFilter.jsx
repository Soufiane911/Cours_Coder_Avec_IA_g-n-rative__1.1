import { useState } from 'react';
import { LANGUES } from '../../utils/sessionTypes';

/**
 * LanguageFilter - Filtre multi-select pour les langues
 */
const LanguageFilter = ({ selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const toggleLangue = (langue) => {
        if (selected.includes(langue)) {
            onChange(selected.filter((l) => l !== langue));
        } else {
            onChange([...selected, langue]);
        }
    };

    const filteredLangues = LANGUES.filter((langue) =>
        langue.toLowerCase().includes(search.toLowerCase())
    );

    const selectAll = () => onChange([...LANGUES]);
    const clearAll = () => onChange([]);

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span>🌍</span> Langues
                {selected.length > 0 && (
                    <span className="text-xs bg-purple-500/30 text-purple-400 px-2 py-0.5 rounded-full">
                        {selected.length}
                    </span>
                )}
            </label>

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm text-left flex items-center justify-between focus:outline-none focus:border-blue-500 transition-colors"
                >
                    <span className="text-slate-400">
                        {selected.length === 0
                            ? 'Toutes les langues'
                            : `${selected.length} langue(s)`}
                    </span>
                    <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-slate-700 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        {/* Search */}
                        <div className="p-2 border-b border-slate-600">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Quick actions */}
                        <div className="flex gap-2 p-2 border-b border-slate-600">
                            <button
                                onClick={selectAll}
                                className="text-xs text-purple-400 hover:underline"
                            >
                                Tout sélectionner
                            </button>
                            <button
                                onClick={clearAll}
                                className="text-xs text-slate-400 hover:underline"
                            >
                                Effacer
                            </button>
                        </div>

                        {/* Options */}
                        {filteredLangues.map((langue) => (
                            <label
                                key={langue}
                                className="flex items-center gap-3 px-3 py-2 hover:bg-slate-600 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(langue)}
                                    onChange={() => toggleLangue(langue)}
                                    className="w-4 h-4 rounded border-slate-500 bg-slate-600 text-purple-500 focus:ring-purple-500"
                                />
                                <span className="text-sm text-white">{langue.replace('_', ' ')}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguageFilter;
