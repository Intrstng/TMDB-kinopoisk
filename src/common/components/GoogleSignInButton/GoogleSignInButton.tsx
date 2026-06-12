import Button from '@mui/material/Button';
import googleLogo from '@/assets/icons/google-color-icon.svg';
import type {GoogleSignInButtonProps} from "@/common/components/GoogleSignInButton/types.ts";
import {googleButtonSx} from "@/common/components/SignInWithGoogle/SignInWithGoogle.styles.ts";
import {googleIconSx} from "@/common/components/GoogleSignInButton/GoogleSignInButton.styles.ts";
import Avatar from "@mui/material/Avatar";

export const GoogleSignInButton = ({ title }: GoogleSignInButtonProps ) => {
    return (
        <Button sx={googleButtonSx}>
            <Avatar
                src={googleLogo}
                alt='Google sign in button'
                sx={googleIconSx}
            />
            {title}
        </Button>
    );
};
