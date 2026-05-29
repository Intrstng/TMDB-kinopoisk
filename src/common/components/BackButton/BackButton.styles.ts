import type { SxProps } from '@mui/material';

export const backButtonSx: SxProps = {
    backgroundColor: 'background.default',
    color: 'text.primary',
    borderColor: 'text.primary',
    transition: '0.3s ease-in-out all',
    '&:hover': {
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        borderColor: 'primary.main',
    },
};
