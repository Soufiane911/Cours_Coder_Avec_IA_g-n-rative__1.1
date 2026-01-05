import { useState, useEffect } from 'react';
import { loadCSVFromURL } from '../utils/csvParser';

/**
 * Hook pour charger et gérer les données de sessions
 */
const useSessionData = (csvPath = '/src/data/sessions_dataset_320.csv') => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await loadCSVFromURL(csvPath);
                setSessions(data);
            } catch (err) {
                console.error('Erreur chargement données:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [csvPath]);

    return { sessions, loading, error };
};

export default useSessionData;
