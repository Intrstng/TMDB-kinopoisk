import type { SxProps } from '@mui/material';

export const controlsPanelSx: SxProps = {
    padding: '1rem 2rem',
    width: '100%',
    flex: '2',
    boxShadow:
        'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',

    '@media (max-width: 940px)': {
        padding: '0.5rem 1.25rem',
    },
    '@media (max-width: 768px)': {
        padding: '1rem 2rem',
    },
};

export const controlsTitleSx: SxProps = {
    mb: '1rem',
    fontFamily: 'ProtestFont, sans-serif',
    fontSize: '1.8rem',
    color: 'text.secondary',
    letterSpacing: '0.07rem',
};

export const controlsBlockSx: SxProps = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '1rem',
};
