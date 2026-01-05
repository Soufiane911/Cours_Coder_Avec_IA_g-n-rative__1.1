import { DEVICES } from '../../utils/sessionTypes';

/**
 * DeviceFilter - Filtre toggle pour les appareils
 */
const DeviceFilter = ({ selected, onChange }) => {
    const toggleDevice = (device) => {
        if (selected.includes(device)) {
            onChange(selected.filter((d) => d !== device));
        } else {
            onChange([...selected, device]);
        }
    };

    const deviceLabels = {
        webapp: { label: 'Web App', icon: '💻' },
        mobile: { label: 'Mobile', icon: '📱' }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span>📱</span> Appareil
            </label>

            <div className="flex gap-2">
                {DEVICES.map((device) => {
                    const isSelected = selected.length === 0 || selected.includes(device);
                    const { label, icon } = deviceLabels[device];

                    return (
                        <button
                            key={device}
                            onClick={() => toggleDevice(device)}
                            className={`
                flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
                flex items-center justify-center gap-2
                ${isSelected
                                    ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50'
                                    : 'bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500'}
              `}
                        >
                            <span>{icon}</span>
                            <span>{label}</span>
                        </button>
                    );
                })}
            </div>

            <p className="text-xs text-slate-500">
                {selected.length === 0
                    ? 'Tous les appareils'
                    : `${selected.length} type(s) sélectionné(s)`}
            </p>
        </div>
    );
};

export default DeviceFilter;
