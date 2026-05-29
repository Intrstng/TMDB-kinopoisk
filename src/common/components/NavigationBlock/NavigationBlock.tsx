import {HEADER_NAV_LINKS} from "@/common/constants";
import {NavLink} from "react-router-dom";
import {Link as MuiLink, Stack} from "@mui/material";
import {navLinkSx} from "@/common/components/NavigationBlock/navLink.styles.ts";

export const NavigationBlock = () => {
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                display: "flex",
                alignItems: "center",
            }}
            component="nav"
        >
            {HEADER_NAV_LINKS.map(navLink => (
                <MuiLink
                    key={navLink.id}
                    component={NavLink}
                    to={navLink.path}
                    sx={navLinkSx}
                >
                    {navLink.title}
                </MuiLink>
            ))}
        </Stack>
    );
};
