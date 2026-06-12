import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {signOutUser} from "@/app/config/auth.ts";
import {errorNotifyMessage} from "@/common/utils/notifyMessage.ts";
import {PATH} from "@/common/enums";
import Box from "@mui/material/Box";
import {Link as MuiLink, type SxProps} from "@mui/material";
import {authLinksBlockSx, navLinkSx} from "@/common/components/NavigationBlock/navLink.styles.ts";
import {NavButton} from "@/common/components/NavButton/NavButton.ts";
import {selectUser} from "@/app/model/slices/app-slice.ts";
import {baseApi} from "@/app/api/baseApi.ts";

export const AuthLinks = ({sxStyles}: { sxStyles?: SxProps }) => {
    const user = useAppSelector(selectUser)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const mergedSx = sxStyles ? {...authLinksBlockSx, ...sxStyles} : authLinksBlockSx

    const logOutHandler = async () => {
        try {
            await signOutUser();

            // First clear the user-specific data
            dispatch(baseApi.util.invalidateTags(['Favorites']));

            // Small delay to ensure favorites are cleared
            setTimeout(() => {
                // Then invalidate films to refetch without favorites
                dispatch(baseApi.util.invalidateTags(['Films']));
            }, 100);

            navigate(PATH.LOGIN);
            // Or reset full RTK cash state (will be an error)
            // dispatch(baseApi.util.resetApiState());
        } catch (err) {
            if (err instanceof Error) {
                errorNotifyMessage({message: err.message});
            }
        }
    }

    return (
        <Box sx={mergedSx as SxProps}>
            {!user
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
