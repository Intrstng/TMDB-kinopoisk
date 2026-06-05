import Box from "@mui/material/Box";
import {cardSx} from "@/common/components/FilmCard/FilmCard.styles.ts";
import Skeleton from "@mui/material/Skeleton"
import {GALLERY_LENGTH} from "@/common/constants";
import type {FilmCardSkeletonGridProps} from "@/common/components/FilmCard/FilmCardSkeleton/types.ts";

const FilmCardSkeleton = () => {
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={cardSx.imageCard}>
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        height: '100%',
                        width: '100%',
                    }}
                />
            </Box>

            <Box sx={cardSx.movieInfo}>
                <Skeleton
                    variant="text"
                    height='1rem'
                    width="90%"
                    sx={{mb: 0.5}}
                />
                <Skeleton
                    variant="text"
                    height='0.8rem'
                    width="40%"
                />
            </Box>
        </Box>
    );
};

export const FilmsGallerySkeletonGrid = ({count = GALLERY_LENGTH}: FilmCardSkeletonGridProps) => {
    return (
          Array.from({length: count}).map((_, index) => (
            <FilmCardSkeleton key={index}/>
          ))
    )
};
