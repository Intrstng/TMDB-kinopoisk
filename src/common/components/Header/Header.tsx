import {Logo} from '@/common/components/Logo/Logo.tsx';
import {ICON_VARIANT, PATH} from '@/common/enums';
import {NavigationBlock} from '@/common/components';
import {ThemeSwitch} from '@/common/components';
import {LoadingProgress} from "@/common/components";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';
import {containerSx, headerSx} from '@/common/styles';
import s from './Header.module.css';

export const Header = () => {
    return (
        <AppBar position="static" sx={headerSx} color="primary">
            <Toolbar>
                <Container sx={containerSx}>
                    <Logo path={PATH.MAIN} variant={ICON_VARIANT.LOGO} className={s.headerLogo} />

                    <Box className={s.headerNav} >
                        <NavigationBlock />
                        <ThemeSwitch />
                    </Box>
                </Container>
            </Toolbar>
            <LoadingProgress/>
        </AppBar>
    );
};
