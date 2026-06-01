import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { backButtonSx } from '@/common/components/BackButton/BackButton.styles.ts';

export const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} variant="outlined" sx={backButtonSx}>
            Back
        </Button>
    );
};
