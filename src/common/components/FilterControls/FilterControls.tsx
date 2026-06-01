import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SortBySelect } from '@/common/components/SortBySelect/SortBySelect.tsx';
import { RatingRange } from '@/common/components/RatingRange/RatingRange.tsx';
import { Genres } from '@/common/components/Genres/Genres.tsx';
import { ResetFiltersButton } from '@/common/components/ResetFiltersButton/ResetFiltersButton.tsx';
import {
    controlsBlockSx,
    controlsPanelSx,
    controlsTitleSx,
} from '@/common/components/FilterControls/FilterControls.styles.ts';
import Paper from '@mui/material/Paper';

export const FilterControls = () => {
    return (
        <Paper sx={controlsPanelSx}>
            <Typography sx={controlsTitleSx} variant={'h1'} component={'h1'}>
                Filters / Sort
            </Typography>

            <Box sx={controlsBlockSx}>
                <RatingRange />
                <SortBySelect />
                <Genres />
                <ResetFiltersButton />
            </Box>
        </Paper>
    );
};
