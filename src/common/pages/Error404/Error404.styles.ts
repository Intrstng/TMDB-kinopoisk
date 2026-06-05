import type { SxProps } from '@mui/material';

const errorContainerSx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
    textAlign: 'center',
};

const errorLottieSx: SxProps = {
    width: '50rem',
    height: 'auto',
    '@media (width <= 768px)': {
        maxWidth: '90%',
    },
};

const backHomeButtonSx: SxProps = {
    marginTop: '2rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    borderColor: 'text.secondary',
    textDecoration: 'none',
    color: 'text.secondary',
    fontFamily: 'ProtestFont, sans-serif',
    transition: 'all 0.3s ease',
    letterSpacing: '0.08rem',

    '&:hover': {
        color: 'action.selected',
        backgroundColor: 'text.secondary',
    },

    '&.active': {
        color: 'text.secondary',
        borderColor: 'text.secondary',
        backgroundColor: 'action.selected',
    },

    '@media (width <= 768px)': {
        padding: '0.3rem 0.5rem',
        fontSize: '0.6rem',
    },
};

export const errorSx = {
    container: errorContainerSx,
    lottie: errorLottieSx,
    homeButton: backHomeButtonSx,
} as const;
