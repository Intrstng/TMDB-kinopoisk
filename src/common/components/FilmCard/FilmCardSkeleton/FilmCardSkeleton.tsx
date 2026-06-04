import Box from "@mui/material/Box";
import {cardSx} from "@/common/components/FilmCard/FilmCard.styles.ts";
import Skeleton from "@mui/material/Skeleton"
import {gallerySx} from "@/common/components/FilmsGallery/FilmsGallery.styles.ts";
import Typography from "@mui/material/Typography";
import {GALLERY_LENGTH} from "@/common/constants";
import type {FilmCardSkeletonGridProps} from "@/common/components/FilmCard/FilmCardSkeleton/types.ts";

const FilmCardSkeleton = () => {
    return (
        <Box sx={{ width: '100%' }}>
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
                    sx={{ mb: 0.5 }}
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

export const FilmCardSkeletonGrid = ({ count = GALLERY_LENGTH, title }: FilmCardSkeletonGridProps) => {
    return (
       <Box sx={gallerySx.container}>
        <Box sx={gallerySx.galleryHeader}>
            <Typography variant={'h2'} component={'h2'} sx={gallerySx.title}>
                {title}
            </Typography>
            <Skeleton
                variant="text"
                width={100}
                height={50}
            />
        </Box>

        <Box sx={gallerySx.moviesGrid}>
            {Array.from({ length: count }).map((_, index) => (
                <FilmCardSkeleton key={index} />
            ))}
        </Box>
    </Box>
    );
};