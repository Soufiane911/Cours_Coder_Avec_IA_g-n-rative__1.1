import React, { useState, useRef, useEffect } from 'react';

/**
 * SelectCompact - Dropdown minimaliste pour le header
 */
const SelectCompact = ({ label, options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        if (selected.includes(option)) {
            onChange(selected.filter(o => o !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-700 transition-colors"
            >
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{label}</span>
                <span className="text-[10px] text-slate-300 font-medium max-w-[80px] truncate">
                    {selected.length === 0 ? 'TOUS' : `${selected.length} SEL.`}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-2xl z-[60] py-1">
                    <div className="flex justify-between px-2 py-1 border-b border-slate-700 mb-1">
                        <button onClick={() => onChange(options)} className="text-[10px] text-sky-400 hover:text-sky-300">Tout</button>
                        <button onClick={() => onChange([])} className="text-[10px] text-slate-400 hover:text-white">Vider</button>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {options.map(option => (
                            <label key={option} className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-700 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    onChange={() => toggleOption(option)}
                                    className="w-3 h-3 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-800"
                                />
                                <span className="text-xs text-slate-300 group-hover:text-white truncate">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectCompact;
