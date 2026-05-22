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
};
