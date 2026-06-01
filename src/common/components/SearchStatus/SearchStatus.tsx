import Typography from '@mui/material/Typography';
import type { SearchStatusProps } from '@/common/components/SearchStatus/types.ts';
import { searchStatusSx } from '@/common/components/SearchStatus/SearchStatus.styles.ts';

export const SearchStatus = ({ isFetching, hasResults, query }: SearchStatusProps) => {
    if (isFetching) return null;

    return (
        <Typography sx={searchStatusSx}>
            {hasResults ? `Results for "${query}"` : `No movies found for "${query}"`}
        </Typography>
    );
};
