import Container from '@mui/material/Container';
import {containerSx, footerSx} from '@/common/styles';
import {icons} from '@/assets/icons/icons.tsx';
import s from '@/common/components/Footer/Footer.module.css';
import {FooterContent} from '@/common/components/Footer/FooterContent/FooterContent.tsx';
import {Logo} from '@/common/components/Logo/Logo.tsx';
import {ICON_VARIANT, PATH} from '@/common/enums';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export const Footer = () => {
    return (
        <AppBar component="footer" sx={footerSx} color="primary">
            <Toolbar disableGutters>
                <Container maxWidth={false} sx={containerSx}>
                    <icons.logoBig className={s.footerAppLogo}/>
                    <FooterContent/>
                    <Logo path={PATH.GITHUB} variant={ICON_VARIANT.GIT} className={s.footerGitLogo}/>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
