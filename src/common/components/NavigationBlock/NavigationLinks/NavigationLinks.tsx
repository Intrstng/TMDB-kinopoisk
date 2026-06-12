import {NavLink} from "react-router-dom";
import type {NavigationLinksProps} from "@/common/components/NavigationBlock/NavigationLinks/types.ts";
import {HEADER_NAV_LINKS} from "@/common/constants";
import {Link as MuiLink} from "@mui/material";
import {useAppSelector} from "@/common/hooks";
import {selectUser} from "@/app/model/slices/app-slice.ts";

export const NavigationLinks = ({ sxStyles }: NavigationLinksProps) => {
    const user = useAppSelector(selectUser);

    return (
        <>
            {HEADER_NAV_LINKS.map((navLink) => (
                !user && navLink.isProtected ? (
                    <MuiLink
                        key={navLink.id}
                        component={NavLink}
                        to={navLink.path}
                        sx={{ ...sxStyles, visibility: 'hidden' }}
                    >
                        {navLink.title}
                    </MuiLink>
                ) : (
                    <MuiLink
                        key={navLink.id}
                        component={NavLink}
                        to={navLink.path}
                        sx={sxStyles}
                    >
                        {navLink.title}
                    </MuiLink>
                )
            ))}
        </>
    );
};
