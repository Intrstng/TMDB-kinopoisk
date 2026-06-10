import type { SxProps } from '@mui/material';

export const googleButtonSx: SxProps = {
    backgroundColor: '#ffffff',
    color: '#757575',
    border: '1px solid #ddd',
    borderRadius: '0.3rem',
    textTransform: 'none',
    fontSize: '0.8rem',
    padding: '0.6rem 0.9rem',
    marginTop: '0.7rem',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: '0.3s all ease',
    '&:hover': {
        backgroundColor: '#f8f9fa',
        border: `1px solid #757575`,
    },
    '&:active': {
        backgroundColor: '#e5e3e1',
        border: '1px solid #296CEB',
    },
};

export const googleIconSx: SxProps = {
    width: '25px',
    height: '25px',
    marginRight: '0.5rem',
};
