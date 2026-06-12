import type { SxProps } from '@mui/material';

export const navLinkSx: SxProps = {
    padding: '0.6rem 1rem',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'text.primary',
    fontFamily: 'ProtestFont, sans-serif',
    fontSize: '0.9rem',
    letterSpacing: '0.04rem',
    transition: 'color 0.3s ease',
    width: '100%',
    textWrap: 'nowrap',

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

export const authLinksBlockSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0rem',
    width: '100%',
    maxWidth: '8rem',
};
