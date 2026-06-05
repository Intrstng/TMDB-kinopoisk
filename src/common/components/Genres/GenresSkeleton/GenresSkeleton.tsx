import {GALLERY_LENGTH} from "@/common/constants";
import type {FilmCardSkeletonGridProps} from "@/common/components/FilmCard/FilmCardSkeleton/types.ts";
import Skeleton from "@mui/material/Skeleton";

export const GenresSkeleton = ({count = GALLERY_LENGTH, sxStyles = {}}: FilmCardSkeletonGridProps) => {
    return <>
        {Array.from({length: count}).map((_, index) => (
            <Skeleton
                key={index}
                variant="rectangular"
                animation="wave"
                sx={{
                    width: "4rem",
                    height: "1.8rem",
                    ...sxStyles
            }}
            />
        ))}
    </>
};