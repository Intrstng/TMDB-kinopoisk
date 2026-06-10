import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    googleButtonSx,
    googleContentSx,
    googleFontSx
} from "@/common/components/SignInWithGoogle/SignInWithGoogle.styles.ts";
import {GoogleSignInButton} from "@/common/components/GoogleSignInButton/GoogleSignInButton.tsx";
import {signInWithGoogle} from "@/app/config/auth.ts";
import {errorNotifyMessage} from "@/common/utils/notifyMessage.ts";
import {setIsLoggedInAC} from "@/app/model/slices/app-slice.ts";
import {PATH} from "@/common/enums";
import {useAppDispatch} from "@/common/hooks";
import {useNavigate} from "react-router-dom";

export const SignInWithGoogle: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const signInGoogle = async () => {
        try {
            await signInWithGoogle();
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
            navigate(PATH.MAIN);
        } catch (err) {
            if (err instanceof Error) {
                errorNotifyMessage({message: err.message});
            }
        }
    };

    return (
        <Box sx={googleContentSx}>
            <Typography sx={googleFontSx} component='h2' variant='body2'>
                {'Or continue with your Google account'}
            </Typography>
            <Box sx={googleButtonSx} onClick={signInGoogle}>
                <GoogleSignInButton title={'Sign in with Google'} />
            </Box>
        </Box>
    );
};
