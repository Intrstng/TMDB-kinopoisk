import {GALLERY_LENGTH} from "@/common/constants";
import type {FilmCardSkeletonGridProps} from "@/common/components/FilmCard/FilmCardSkeleton/types.ts";
import Skeleton from "@mui/material/Skeleton";
import {genresControlsSx} from "@/common/components/Genres/Genres.styles.ts";

export const GenresSkeleton = ({count = GALLERY_LENGTH}: FilmCardSkeletonGridProps) => {
    return <>
        {Array.from({length: count}).map((_, index) => (
            <Skeleton
                key={index}
                variant="rectangular"
                animation="wave"
                width="4rem"
                height="1.8rem"
                sx={genresControlsSx}
            />
        ))}
    </>
};