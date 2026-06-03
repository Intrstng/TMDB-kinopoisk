import type { SxProps } from '@mui/material';

export const linearProgressSx: SxProps = {
    position: 'absolute',
    top: '68px',
    left: 0,
    right: 0,
    height: '2px',
    zIndex: 4,
    transition: 'opacity 0.3s ease',
    backgroundColor: 'rgba(144, 206, 161, 0.8)',
};
