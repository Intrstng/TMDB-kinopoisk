import Typography from '@mui/material/Typography';
import type { SearchStatusProps } from '@/common/components/SearchStatus/types.ts';
import { searchStatusSx } from '@/common/components/SearchStatus/SearchStatus.styles.ts';
import Skeleton from "@mui/material/Skeleton";

export const SearchStatus = ({ isFetching, hasResults, query }: SearchStatusProps) => {
    if (isFetching) return <Skeleton variant="text" height='2.5rem' width='15rem'/>;

    return (
        <Typography sx={searchStatusSx}>
            {hasResults ? `Results for "${query}"` : `No movies found for "${query}"`}
        </Typography>
    );
};
