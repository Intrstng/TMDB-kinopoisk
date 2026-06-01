import { Logo } from '@/common/components/Logo/Logo.tsx';
import { ICON_VARIANT, PATH } from '@/common/enums';
import s from './Header.module.css';
import { NavigationBlock } from '@/common/components/NavigationBlock/NavigationBlock.tsx';
import { ThemeSwitch } from '@/common/components/ThemeSwitch/ThemeSwitch.tsx';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { containerSx, headerSx } from '@/common/styles';

export const Header = () => {
    return (
        <AppBar position="static" sx={headerSx} color="primary">
            <Toolbar>
                <Container sx={containerSx}>
                    <Logo path={PATH.MAIN} variant={ICON_VARIANT.LOGO} className={s.headerLogo} />
                    <NavigationBlock />
                    <ThemeSwitch />
                </Container>
            </Toolbar>
        </AppBar>
    );
};
