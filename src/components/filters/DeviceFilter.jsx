import React from 'react';
import { DEVICES } from '../../utils/sessionTypes';

/**
 * DeviceFilter - Filtre compact pour les appareils
 */
const DeviceFilter = ({ selected, onChange, compact = false }) => {
    const toggleDevice = (device) => {
        if (selected.includes(device)) {
            onChange(selected.filter((d) => d !== device));
        } else {
            onChange([...selected, device]);
        }
    };

    if (compact) {
        return (
            <div className="flex bg-slate-900 p-0.5 rounded-md border border-slate-700">
                {DEVICES.map((device) => {
                    const isSelected = selected.includes(device);
                    return (
                        <button
                            key={device}
                            onClick={() => toggleDevice(device)}
                            className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
                                isSelected 
                                ? 'bg-sky-500 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {device === 'webapp' ? 'Web' : 'Mob'}
                        </button>
                    );
                })}
            </div>
        );
    }

    return null;
};

export default DeviceFilter;
