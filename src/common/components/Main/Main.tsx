import Container from "@mui/material/Container"
import {containerSx, mainSx} from "@/common/styles";
import {Logo} from "@/common/components/Logo/Logo.tsx";
import {IconVariant, PATH} from "@/common/enums";
import s from "@/common/components/Header/Header.module.css";
import {NavigationBlock} from "@/common/components/NavigationBlock/NavigationBlock.tsx";
import {ThemeSwitch} from "@/common/components/ThemeSwitch/ThemeSwitch.tsx";
import Box from "@mui/material/Box";


export const Main = () => {
    return (
        <Box component={'main'} sx={{
            ...mainSx,
            bgcolor: 'background.default',
            color: 'text.primary',
        }} >
                <Container sx={containerSx}>
                    <Logo path={PATH.MAIN} variant={IconVariant.LOGO} className={s.headerLogo}/>
                    <NavigationBlock/>
                    <ThemeSwitch/>
                </Container>
        </Box>
    );
};
