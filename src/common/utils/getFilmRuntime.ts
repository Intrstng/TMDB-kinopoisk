export const getFilmRuntime = (runtime: number | undefined): string => {
    if (!runtime) return 'The duration of the film is not specified by the author';
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
