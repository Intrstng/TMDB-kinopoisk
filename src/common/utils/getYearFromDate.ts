export const getYearFromDate = (date: string | undefined): string => {
    if (!date) return 'The Year is unknown';
    return date.split('-')[0];
};
