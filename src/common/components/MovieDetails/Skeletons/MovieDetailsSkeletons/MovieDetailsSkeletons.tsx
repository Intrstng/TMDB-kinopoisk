import {GENRES_QTY} from "@/common/constants";
import {GenresSkeleton} from "@/common/components";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {movieDetailsSx} from "@/common/components/MovieDetails/MovieDetails.styles.ts";
import {movieDetailsSkeletonSx} from "@/common/components/MovieDetails/Skeletons/MovieDetailsSkeletons/MovieDetailsSkeltons.styles.ts";

export const MovieDetailsPosterSkeleton = () => {
    return (
        <Paper elevation={3} sx={movieDetailsSx.poster}>
            <Skeleton
                variant="rectangular"
                animation="wave"
                height='100%'
                width='100%'
                sx={movieDetailsSkeletonSx.poster}/>
        </Paper>
    );
};

export const MovieDetailsHeaderSkeleton = () => {
    return (
        <>
            <Box sx={movieDetailsSx.filmHeader}>
                <Skeleton variant='text' width='40%' height='5rem'/>
                <Skeleton variant='text' width='6rem' height='4.5rem'/>
            </Box>
            <Skeleton variant='text' width='95%' height='8rem'/>
        </>
    )
        ;
};

export const MovieDetailsInfoSkeleton = () => {
    return (
        <Box sx={movieDetailsSkeletonSx.filmInfo}>
            <Skeleton variant='text' width='20%' height='2.75rem'/>
            <Skeleton variant='text' width='6%' height='3.5rem'/>
            <Skeleton variant='text' width='18%' height='2.75rem'/>
        </Box>
    );
};

export const MovieDetailsGenresSkeleton = () => {
    return (
        <Box sx={movieDetailsSx.genresList}>
            <GenresSkeleton count={GENRES_QTY} sxStyles={movieDetailsSkeletonSx.genreItem}/>
        </Box>
    );
};