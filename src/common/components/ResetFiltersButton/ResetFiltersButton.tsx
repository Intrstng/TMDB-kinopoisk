import Button from "@mui/material/Button";
import {useSearchParams} from "react-router-dom";
import {resetButtonSx} from "@/common/components/ResetFiltersButton/ResetFiltersButton.styles.ts";

export const ResetFiltersButton = () => {
    const [_searchParams, setSearchParams] = useSearchParams();

    const handleFiltersReset = () => {
        setSearchParams({});
    }

    return (
        <Button
            onClick={handleFiltersReset}
            sx={resetButtonSx}
        >
            Reset filters
        </Button>
    );
};
