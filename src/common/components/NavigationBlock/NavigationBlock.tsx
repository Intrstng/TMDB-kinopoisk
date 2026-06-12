import {BurgerMenu, NavigationLinks} from "@/common/components";
import Stack from '@mui/material/Stack';
import {navLinkSx} from '@/common/components/NavigationBlock/navLink.styles.ts';
import {AuthLinks} from "@/common/components/NavigationBlock/AuthLinks/AuthLinks.tsx";

export const NavigationBlock = () => {
    return (
        <>
            {/* Desktop navigation */}
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                }}
                component="nav"
            >
                <NavigationLinks sxStyles={navLinkSx}/>
                <AuthLinks/>
            </Stack>

            {/* Mobile burger menu */}
            <BurgerMenu />
        </>
    );
};
