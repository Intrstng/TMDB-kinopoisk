import type { SxProps } from '@mui/material';

export const navLinkSx: SxProps = {
    padding: '0.6rem 1rem',
    textDecoration: 'none',
    color: 'text.primary',
    fontFamily: 'ProtestFont, sans-serif',
    fontSize: '1rem',
    letterSpacing: '0.04rem',
    transition: 'color 0.3s ease',

    '&.active': {
        borderRadius: '0.25rem',
        backgroundColor: '#90cea1',
        '&:hover': {
            color: 'text.primary',
            backgroundColor: '#90cea1',
        },
    },
    '&:hover': {
        color: '#01b4e4',
    },

    '@media (width <= 940px)': {
        padding: '0.4rem 0.8rem',
        fontSize: '0.8rem',
        letterSpacing: '0.02rem',
    },
};

export const mobileNavLinkSx: SxProps = {
    ...navLinkSx,
    padding: '0.8rem 1rem',
    fontSize: '1.1rem',
    textAlign: 'center',
    width: '100%',
    display: 'block',

    '&.active': {
        backgroundColor: '#90cea1',
        borderRadius: '0.5rem',
    },

    '@media (width <= 940px)': {
        padding: '0.8rem 1rem',
        fontSize: '1rem',
    },
};
