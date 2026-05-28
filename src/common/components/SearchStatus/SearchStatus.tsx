import Typography from "@mui/material/Typography";
import type {SearchStatusProps} from "@/common/components/SearchStatus/types.ts";

export const SearchStatus = ({ isFetching, hasResults, query }: SearchStatusProps) => {
    if (isFetching) return null;

    return (
        <Typography>
            {hasResults
                ? `Results for "${query}"`
                : `No movies found for "${query}"`
            }
        </Typography>
    );
};
