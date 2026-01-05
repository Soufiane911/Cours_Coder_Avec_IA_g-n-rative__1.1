import { useState } from 'react';
import { SERVICES } from '../../utils/sessionTypes';

/**
 * ServiceFilter - Filtre multi-select pour les services médicaux
 */
const ServiceFilter = ({ selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleService = (service) => {
        if (selected.includes(service)) {
            onChange(selected.filter((s) => s !== service));
        } else {
            onChange([...selected, service]);
        }
    };

    const selectAll = () => onChange([...SERVICES]);
    const clearAll = () => onChange([]);

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span>🏥</span> Services
                {selected.length > 0 && (
                    <span className="text-xs bg-blue-500/30 text-blue-400 px-2 py-0.5 rounded-full">
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
                            ? 'Tous les services'
                            : `${selected.length} service(s)`}
                    </span>
                    <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-slate-700 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        {/* Quick actions */}
                        <div className="flex gap-2 p-2 border-b border-slate-600">
                            <button
                                onClick={selectAll}
                                className="text-xs text-blue-400 hover:underline"
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
                        {SERVICES.map((service) => (
                            <label
                                key={service}
                                className="flex items-center gap-3 px-3 py-2 hover:bg-slate-600 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(service)}
                                    onChange={() => toggleService(service)}
                                    className="w-4 h-4 rounded border-slate-500 bg-slate-600 text-blue-500 focus:ring-blue-500"
                                />
                                <span className="text-sm text-white">{service}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceFilter;
