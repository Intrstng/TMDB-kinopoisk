import { useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { resetButtonSx } from '@/common/components/ResetFiltersButton/ResetFiltersButton.styles.ts';

export const ResetFiltersButton = () => {
    const [, setSearchParams] = useSearchParams();

    const handleFiltersReset = () => {
        setSearchParams({});
    };

    return (
        <Button onClick={handleFiltersReset} sx={resetButtonSx}>
            Reset filters
        </Button>
    );
};
