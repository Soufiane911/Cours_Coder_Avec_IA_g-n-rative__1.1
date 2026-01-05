import { useState, useEffect } from 'react';
import { parseCSV } from '../utils/csvParser';
import csvData from '../data/sessions_dataset_320.csv?raw';

/**
 * Hook pour charger et gérer les données de sessions
 */
const useSessionData = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = parseCSV(csvData);
                setSessions(data);
            } catch (err) {
                console.error('Erreur chargement données:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { sessions, loading, error };
};

export default useSessionData;
