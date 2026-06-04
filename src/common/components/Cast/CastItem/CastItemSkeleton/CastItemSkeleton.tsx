import Box from "@mui/material/Box";
import {castSx} from "@/common/components/Cast/CastItem/CastItem.styles.ts";
import Skeleton from "@mui/material/Skeleton";
import {GALLERY_LENGTH} from "@/common/constants";
import type {FilmCardSkeletonGridProps} from "@/common/components/FilmCard/FilmCardSkeleton/types.ts";

export const CastItemSkeleton = () => {
    return (
        <Box component="article" sx={castSx.card}>
            <Skeleton
                variant="circular"
                sx={castSx.avatar}
                animation="wave"
            />

            <Skeleton variant='text' width='10rem' height='2.2rem'/>
            <Skeleton variant='text' width='8rem' height='1.75rem'/>
        </Box>
    );
};


export const CastGallerySkeleton = ({count = GALLERY_LENGTH}: FilmCardSkeletonGridProps) => {
    return (
        <>
            {Array.from({length: count}).map((_, index) => (
                <CastItemSkeleton key={index}/>
            ))}
        </>
    )
};
