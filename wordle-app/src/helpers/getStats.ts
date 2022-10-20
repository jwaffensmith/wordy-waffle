const getStats = (gamesWon: number, gamesPlayed: number): string => {
    const stats = ((gamesWon / gamesPlayed) * 100).toFixed(0);
    if (stats === 'NaN' || stats === 'Infinity') {
        return '0';
    }
    return stats
};

export default getStats;