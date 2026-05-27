import type { SxProps } from '@mui/material';

export const containerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minWidth: {
        xs: '100%', // mobile
        sm: '90%', // tablet
        md: '85%', // small desktop   (or md: "1000px")
        lg: '1220px', // large desktop
    },
};
