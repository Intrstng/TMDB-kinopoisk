import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import errorAnimation from '@/assets/lottie-animation-data/404 Error Lottie animation.lottie?url';
import s from './Error404.module.css';
import { PATH } from '@/common/enum';
import Button from '@mui/material/Button';

export const Error404 = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(PATH.MAIN);
    };

    return (
        <div className={s.errorContent}>
            <div className={s.errorLottie} data-testid="error-lottie">
                <DotLottieReact src={errorAnimation} loop autoplay />
                <Button variant="contained" onClick={handleGoHome} className={s.toHomeLink}>
                    Go to home page
                </Button>
            </div>
        </div>
    );
};
