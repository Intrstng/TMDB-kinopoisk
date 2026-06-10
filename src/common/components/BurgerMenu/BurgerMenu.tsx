import {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import {mobileNavLinkSx} from "@/common/components/NavigationBlock/navLink.styles.ts";
import {AuthBlockSx, BurgerMenuSx, ButtonSx} from "@/common/components/BurgerMenu/BurgerManu.styles.ts";
import {NavigationLinks} from "@/common/components";
import {AuthLinks} from "@/common/components/NavigationBlock/AuthLinks/AuthLinks.tsx";

export const BurgerMenu = () => {
    const [open, setOpen] = useState(false);

    const toggleBurgerMenu = (isOpen: boolean) => () => {
        setOpen(isOpen);
    };

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleBurgerMenu(true)}
                sx={ButtonSx}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleBurgerMenu(false)}
                sx={BurgerMenuSx}
            >
                <Stack
                    direction="column"
                    spacing={2}
                    component="nav"
                    onClick={toggleBurgerMenu(false)}
                >
                <NavigationLinks sxStyles={mobileNavLinkSx}/>
                <AuthLinks sxStyles={AuthBlockSx}/>
                </Stack>
            </Drawer>
        </>
    );
};