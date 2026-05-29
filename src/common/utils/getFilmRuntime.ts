export const getFilmRuntime = (runtime: number): string => {
    if (runtime < 0) return '0m';

    const hours = Math.floor(runtime / 60);
    const minutes = Math.floor(runtime % 60);

    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
    }
    if (hours > 0) {
        return `${hours}h`;
    }
    return `${minutes}m`;
};
