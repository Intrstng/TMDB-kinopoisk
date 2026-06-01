import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import errorAnimation from '@/assets/lottie-animation-data/404 Error Lottie animation.lottie?url';
import s from './Error404.module.css';
import { PATH } from '@/common/enums';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const Error404 = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(PATH.MAIN);
    };

    return (
        <Box className={s.errorContent}>
            <Box className={s.errorLottie} data-testid="error-lottie">
                <DotLottieReact src={errorAnimation} loop autoplay />
                <Button variant="contained" onClick={handleGoHome} className={s.toHomeLink}>
                    Go to home page
                </Button>
            </Box>
        </Box>
    );
};
