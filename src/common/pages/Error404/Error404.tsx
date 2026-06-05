import {useNavigate} from 'react-router-dom';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import errorAnimation from '@/assets/lottie-animation-data/404 Error Lottie animation.lottie?url';
import {PATH} from '@/common/enums';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {errorSx} from "@/common/pages/Error404/Error404.styles.ts";

export const Error404 = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(PATH.MAIN);
    };

    return (
        <Box sx={errorSx.container}>
            <Box sx={errorSx.lottie} data-testid="error-lottie">
                <DotLottieReact src={errorAnimation} loop autoplay />
                <Button variant="outlined" onClick={handleGoHome} sx={errorSx.homeButton}>
                    Go to home page
                </Button>
            </Box>
        </Box>
    );
};
