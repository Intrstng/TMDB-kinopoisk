import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SortBySelect } from '@/common/components';
import { RatingRange } from '@/common/components';
import { Genres } from '@/common/components';
import { ResetFiltersButton } from '@/common/components';
import {
    controlsBlockSx,
    controlsPanelSx,
    controlsTitleSx,
} from '@/common/components/FilterControls/FilterControls.styles.ts';

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
