import {HEADER_NAV_LINKS} from "@/common/constants";
import {Link as MuiLink} from "@mui/material";
import {NavLink} from "react-router-dom";
import type {NavigationLinksProps} from "@/common/components/NavigationBlock/NavigationLinks/types.ts";

export const NavigationLinks = ({sxStyles}: NavigationLinksProps) => {
    return (<>
            {HEADER_NAV_LINKS.map(navLink => (
                <MuiLink key={navLink.id} component={NavLink} to={navLink.path} sx={sxStyles}>
                    {navLink.title}
                </MuiLink>
            ))}
    </>
    );
};
