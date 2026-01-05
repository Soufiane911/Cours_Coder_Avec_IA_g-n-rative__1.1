/**
 * Fonctions d'agrégation pour les données de sessions
 */

/**
 * Compte le nombre de sessions par langue (pour bar chart horizontal)
 * @param {Session[]} sessions
 * @returns {Array<{langue: string, count: number}>}
 */
export const getSessionsByLanguage = (sessions) => {
    const counts = {};
    sessions.forEach((s) => {
        counts[s.langue] = (counts[s.langue] || 0) + 1;
    });

    return Object.entries(counts)
        .map(([langue, count]) => ({ langue, count }))
        .sort((a, b) => b.count - a.count);
};

/**
 * Groupe les sessions par mois (pour line/area chart)
 * @param {Session[]} sessions
 * @returns {Array<{month: string, count: number}>}
 */
export const getSessionsByMonth = (sessions) => {
    const counts = {};
    sessions.forEach((s) => {
        const monthKey = `${s.date.getFullYear()}-${String(s.date.getMonth() + 1).padStart(2, '0')}`;
        counts[monthKey] = (counts[monthKey] || 0) + 1;
    });

    return Object.entries(counts)
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => a.month.localeCompare(b.month));
};

/**
 * Groupe les sessions par semaine
 * @param {Session[]} sessions
 * @returns {Array<{week: string, count: number}>}
 */
export const getSessionsByWeek = (sessions) => {
    const counts = {};
    sessions.forEach((s) => {
        const weekStart = getWeekStart(s.date);
        const weekKey = weekStart.toISOString().split('T')[0];
        counts[weekKey] = (counts[weekKey] || 0) + 1;
    });

    return Object.entries(counts)
        .map(([week, count]) => ({ week, count }))
        .sort((a, b) => a.week.localeCompare(b.week));
};

/**
 * Retourne le lundi de la semaine d'une date
 */
const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
};

/**
 * Calcule les statistiques de durée
 * @param {Session[]} sessions
 * @returns {{avg: number, median: number, min: number, max: number, distribution: Array}}
 */
export const getDurationStats = (sessions) => {
    if (sessions.length === 0) {
        return { avg: 0, median: 0, min: 0, max: 0, distribution: [] };
    }

    const durations = sessions.map((s) => s.duree_minutes).sort((a, b) => a - b);
    const sum = durations.reduce((acc, d) => acc + d, 0);

    // Distribution par tranches de 5 minutes
    const distribution = [];
    const maxDuration = Math.max(...durations);
    for (let i = 0; i <= maxDuration; i += 5) {
        const count = durations.filter((d) => d >= i && d < i + 5).length;
        if (count > 0) {
            distribution.push({ range: `${i}-${i + 5}`, count });
        }
    }

    return {
        avg: sum / sessions.length,
        median: durations[Math.floor(durations.length / 2)],
        min: durations[0],
        max: durations[durations.length - 1],
        distribution
    };
};

/**
 * Répartition des sessions par service (pour pie chart)
 * @param {Session[]} sessions
 * @returns {Array<{service: string, count: number, percentage: number}>}
 */
export const getSessionsByService = (sessions) => {
    const counts = {};
    sessions.forEach((s) => {
        counts[s.service] = (counts[s.service] || 0) + 1;
    });

    const total = sessions.length;
    return Object.entries(counts)
        .map(([service, count]) => ({
            service,
            count,
            percentage: total > 0 ? ((count / total) * 100).toFixed(1) : 0
        }))
        .sort((a, b) => b.count - a.count);
};

/**
 * Métriques de qualité
 * @param {Session[]} sessions
 * @returns {{avgScore: number, avgSegmentsNonReconnus: number, correlation: Array}}
 */
export const getQualityMetrics = (sessions) => {
    if (sessions.length === 0) {
        return { avgScore: 0, avgSegmentsNonReconnus: 0, correlation: [] };
    }

    const avgScore = sessions.reduce((acc, s) => acc + s.qualite_score, 0) / sessions.length;
    const avgSegments = sessions.reduce((acc, s) => acc + s.segments_non_reconnus, 0) / sessions.length;

    // Données pour scatter plot (corrélation durée vs qualité)
    const correlation = sessions.map((s) => ({
        duree: s.duree_minutes,
        qualite: s.qualite_score,
        service: s.service
    }));

    return {
        avgScore,
        avgSegmentsNonReconnus: avgSegments,
        correlation
    };
};

/**
 * Statistiques d'interactions par service
 * @param {Session[]} sessions
 * @returns {Array<{service: string, patient: number, praticien: number, ratio: number}>}
 */
export const getInteractionStats = (sessions) => {
    const stats = {};

    sessions.forEach((s) => {
        if (!stats[s.service]) {
            stats[s.service] = { patient: 0, praticien: 0, count: 0 };
        }
        stats[s.service].patient += s.interactions_patient;
        stats[s.service].praticien += s.interactions_praticien;
        stats[s.service].count += 1;
    });

    return Object.entries(stats).map(([service, data]) => ({
        service,
        patient: Math.round(data.patient / data.count),
        praticien: Math.round(data.praticien / data.count),
        ratio: data.patient / (data.praticien || 1)
    }));
};

/**
 * Distribution des notes praticiens
 * @param {Session[]} sessions
 * @returns {{avg: number, distribution: Array<{note: string, count: number}>}}
 */
export const getRatingDistribution = (sessions) => {
    if (sessions.length === 0) {
        return { avg: 0, distribution: [] };
    }

    const avg = sessions.reduce((acc, s) => acc + s.note_praticien, 0) / sessions.length;

    // Distribution par demi-point
    const counts = {};
    sessions.forEach((s) => {
        const rounded = Math.round(s.note_praticien * 2) / 2; // Arrondi au 0.5 près
        const key = rounded.toFixed(1);
        counts[key] = (counts[key] || 0) + 1;
    });

    const distribution = Object.entries(counts)
        .map(([note, count]) => ({ note, count }))
        .sort((a, b) => parseFloat(a.note) - parseFloat(b.note));

    return { avg, distribution };
};

/**
 * Répartition par device (webapp vs mobile)
 * @param {Session[]} sessions
 * @returns {Array<{device: string, count: number, percentage: number}>}
 */
export const getDeviceDistribution = (sessions) => {
    const counts = { webapp: 0, mobile: 0 };
    sessions.forEach((s) => {
        counts[s.device] = (counts[s.device] || 0) + 1;
    });

    const total = sessions.length;
    return Object.entries(counts).map(([device, count]) => ({
        device,
        count,
        percentage: total > 0 ? ((count / total) * 100).toFixed(1) : 0
    }));
};

/**
 * KPIs globaux du dashboard
 * @param {Session[]} sessions
 * @returns {Object}
 */
export const getGlobalKPIs = (sessions) => {
    if (sessions.length === 0) {
        return {
            totalSessions: 0,
            avgDuration: 0,
            avgQuality: 0,
            avgRating: 0,
            totalInteractions: 0
        };
    }

    return {
        totalSessions: sessions.length,
        avgDuration: (sessions.reduce((acc, s) => acc + s.duree_minutes, 0) / sessions.length).toFixed(1),
        avgQuality: (sessions.reduce((acc, s) => acc + s.qualite_score, 0) / sessions.length * 100).toFixed(1),
        avgRating: (sessions.reduce((acc, s) => acc + s.note_praticien, 0) / sessions.length).toFixed(2),
        totalInteractions: sessions.reduce((acc, s) => acc + s.interactions_totales, 0)
    };
};
