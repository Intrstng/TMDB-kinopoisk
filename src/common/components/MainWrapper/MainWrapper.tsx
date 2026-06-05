import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import { mainSx } from '@/common/styles';

export const MainWrapper = () => {
    return (
        <Box
            component={'main'}
            sx={{
                ...mainSx,
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Outlet />
        </Box>
    );
};
