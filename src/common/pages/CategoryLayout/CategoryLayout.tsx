import { Outlet } from 'react-router';
import { containerSx } from '@/common/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export const CategoryLayout = () => {
    return (
        <Container sx={containerSx}>
            <Box>{<Outlet />}</Box>
        </Container>
    );
};
