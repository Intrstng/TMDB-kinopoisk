import Box from "@mui/material/Box";
import {movieDetailsSx} from "@/common/components/MovieDetails/MovieDetails.styles.ts";
import Typography from "@mui/material/Typography";
import type {MovieDetailsInfoProps} from "@/common/components/MovieDetails/types.ts";
import {getYearFromDate} from "@/common/utils/getYearFromDate.ts";
import {getFilmRuntime} from "@/common/utils/getFilmRuntime.ts";

export const MovieDetailsInfo = ({data}: MovieDetailsInfoProps) => {
    return (
        <Box sx={movieDetailsSx.filmInfo}>
            <Typography variant="h4" component="h4" sx={movieDetailsSx.filmYear}>
                Release year:{' '}
                <Box component="span" sx={movieDetailsSx.filmYearSpan}>
                    {getYearFromDate(data?.release_date)}
                </Box>
            </Typography>
            <Typography variant="h4" component="h4" sx={movieDetailsSx.vote}>
                {data?.vote_average ? data?.vote_average.toFixed(1) : 0}
            </Typography>
            <Typography variant="h4" component="h4" sx={movieDetailsSx.filmRuntime}>
                Runtime:{' '}
                <Box component="span" sx={movieDetailsSx.filmRuntimeSpan}>
                    {getFilmRuntime(data?.runtime)}
                </Box>
            </Typography>
        </Box>
    );
};