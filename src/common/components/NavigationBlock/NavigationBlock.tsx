import {Stack} from '@mui/material';
import {navLinkSx} from '@/common/components/NavigationBlock/navLink.styles.ts';
import {BurgerMenu} from "@/common/components/BurgerMenu/BurgerMenu.tsx";
import {NavigationLinks} from "@/common/components/NavigationBlock/NavigationLinks/NavigationLinks.tsx";

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
            </Stack>

            {/* Mobile burger menu */}
            <BurgerMenu />
        </>
    );
};
