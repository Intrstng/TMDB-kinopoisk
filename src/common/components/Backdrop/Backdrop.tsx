import {useEffect, useState} from 'react';
import {useMoviesWithConfig} from '@/common/hooks';
import type {BackdropComponentProps} from '@/common/components/Backdrop/types.ts';
import {BACKDROP_SIZE} from '@/common/enums';
import {useFetchFilmsForBackDropQuery} from '@/features/films/api/filmsApi.ts';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {getRandomElementFromArray} from '@/common/utils/getRandomElementFromArray.ts';
import {ImagePreloader} from '@/common/components';
import {backdropContainerSx} from '@/common/styles/container.styles.ts';

export const Backdrop = ({ category, children }: BackdropComponentProps) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [backdropUrl, setBackdropUrl] = useState<string | undefined>(undefined);

    const {
        config: configData,
        // isLoading: isConfigLoading,
        getBackdropUrl,
    } = useMoviesWithConfig();

    const {
        data,
        // isLoading: isMoviesLoading,
        // isFetching
    } = useFetchFilmsForBackDropQuery(
        { path: category, language: 'en-US' },
        {
            skip: !configData,
        }
    );

    const filmsData = data?.results || []

    useEffect(() => {
        if (filmsData.length > 0 && configData) {
            const backdropRandomFilm = getRandomElementFromArray(filmsData);
            const url = backdropRandomFilm?.backdrop_path
                ? getBackdropUrl(backdropRandomFilm.backdrop_path, BACKDROP_SIZE.ORIGINAL)
                : undefined;
             
            setBackdropUrl(url);
            setImageLoaded(false); // Reset loaded state when new image is set
        }
    }, [filmsData, configData, getBackdropUrl]);

    const gradientBackground =
        'linear-gradient(180deg,rgba(2, 0, 36, 1) 0%, rgba(103, 103, 122, 1) 0%, rgba(235, 243, 245, 1) 100%)';

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: 'calc(100vh - 4.3rem)',
                width: '100%',
                // Check
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: imageLoaded && backdropUrl ? `url(${backdropUrl})` : gradientBackground,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background-image 0.3s ease',
                }}
            />
            <ImagePreloader imageUrl={backdropUrl} isImageLoaded={imageLoaded} onLoadCb={setImageLoaded} />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Container sx={backdropContainerSx}>{children}</Container>
            </Box>
        </Box>
    );
};
