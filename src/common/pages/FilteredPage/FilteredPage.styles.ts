export const containerResponsiveSx = {
    gap: '1rem',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: '2.5rem auto 1rem',

    '@media (max-width: 768px)': {
        flexDirection: 'column',
    },
} as const;
