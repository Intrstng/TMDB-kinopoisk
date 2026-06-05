import type { SxProps } from '@mui/material';

export const containerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // minWidth: {
    //     xs: '100%', // mobile
    //     sm: '90%', // tablet
    //     md: '85%', // small desktop (or md: "1000px")
    //     lg: '1220px', // large desktop
    // },

    minWidth: '1200px',
    '@media (width <= 1200px)': {
        minWidth: '940px',
    },

    '@media (width <= 940px)': {
        minWidth: '768px',
    },

    '@media (width <= 768px)': {
        minWidth: '480px',
    },

    '@media (width <= 480px)': {
        minWidth: '380px',
    },
};

export const backdropContainerSx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    // minWidth: {
    //     xs: '100%', // mobile
    //     sm: '90%', // tablet
    //     md: '85%', // small desktop (or md: "1000px")
    //     lg: '1220px', // large desktop
    // },

    minWidth: '1200px',
    '@media (width <= 1200px)': {
        minWidth: '940px',
    },

    '@media (width <= 940px)': {
        minWidth: '768px',
    },

    '@media (width <= 768px)': {
        minWidth: '640px',
    },

    '@media (width <= 640px)': {
        minWidth: '100%',
    },
};
