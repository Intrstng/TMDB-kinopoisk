import {NavLink, useNavigate} from "react-router-dom";
import {selectIsLoggedIn, setIsLoggedInAC} from "@/app/model/slices/app-slice.ts";
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {signOutUser} from "@/app/config/auth.ts";
import {errorNotifyMessage} from "@/common/utils/notifyMessage.ts";
import {PATH} from "@/common/enums";
import Box from "@mui/material/Box";
import {Link as MuiLink, type SxProps} from "@mui/material";
import {authLinksBlockSx, navLinkSx} from "@/common/components/NavigationBlock/navLink.styles.ts";
import {NavButton} from "@/common/components/NavButton/NavButton.ts";

export const AuthLinks = ({sxStyles}: { sxStyles?: SxProps }) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const mergedSx = sxStyles ? {...authLinksBlockSx, ...sxStyles} : authLinksBlockSx

    const logOutHandler = async () => {
        try {
            await signOutUser();
            dispatch(setIsLoggedInAC({isLoggedIn: false}));
            navigate(PATH.LOGIN);
            // dispatch(baseApi.util.invalidateTags(['Films']))
            // Or reset full RTK cash state
            // dispatch(baseApi.util.resetApiState());
        } catch (err) {
            if (err instanceof Error) {
                errorNotifyMessage({message: err.message});
            }
        }
    }

    return (
        <Box sx={mergedSx as SxProps}>
            {!isLoggedIn
                ? <>
                    <MuiLink component={NavLink} to={PATH.SIGNUP} sx={navLinkSx}>
                        SignUp
                    </MuiLink>
                    <MuiLink component={NavLink} to={PATH.LOGIN} sx={navLinkSx}>
                        Login
                    </MuiLink>
                 </>
                : <NavButton onClick={logOutHandler} sx={{ color: 'text.primary' }}>
                    LogOut
                </NavButton>
            }
        </Box>
    );
};
