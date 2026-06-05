import Box from "@mui/material/Box";
import {movieDetailsSx} from "@/common/components/MovieDetails/MovieDetails.styles.ts";
import Typography from "@mui/material/Typography";
import {BackButton} from "@/common/components/BackButton/BackButton.tsx";
import type {MovieDetailsHeaderProps} from "@/common/components/MovieDetails/types.ts";

export const MovieDetailsHeader = ({data}: MovieDetailsHeaderProps) => {
    return (
        <>
            <Box sx={movieDetailsSx.filmHeader}>
                <Typography variant="h1" component="h1" sx={movieDetailsSx.filmTitle}>
                    {data?.title || ''}
                </Typography>
                <BackButton />
            </Box>
            <Typography variant="body1" component="p" sx={movieDetailsSx.filmDescription}>
                {data?.overview || ''}
            </Typography>
        </>
    );
};
