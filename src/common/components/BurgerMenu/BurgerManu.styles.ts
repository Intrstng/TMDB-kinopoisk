import type { SxProps } from '@mui/material';

export const ButtonSx: SxProps = {
    display: { xs: 'flex', md: 'none' },
};

export const BurgerMenuSx: SxProps = {
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': {
        width: '15rem',
        padding: '2rem 1rem',
        backgroundColor: 'background.paper',
    },
};
