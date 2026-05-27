import { useGetConfigDetailsQuery } from '@/features/films/api/filmsApi.ts';
import { BACKDROP_SIZE, POSTER_SIZE } from '@/common/enums';

export const useMoviesWithConfig = () => {
    const { data: configData, isLoading: isConfigLoading, isError: isConfigError } = useGetConfigDetailsQuery();

    const getPosterUrl = (posterPath: string | null, size: POSTER_SIZE = POSTER_SIZE.W500): string | undefined => {
        if (!configData || !posterPath) return;

        const baseUrl = configData.images.secure_base_url;
        const availableSizes = configData?.images?.poster_sizes || [];
        const finalSize = availableSizes.includes(size)
            ? size
            : configData.images.poster_sizes.find(posterSize => posterSize === POSTER_SIZE.ORIGINAL);

        return `${baseUrl}${finalSize}${posterPath}`;
    };

    const getBackdropUrl = (
        backdropPath: string | null,
        size: BACKDROP_SIZE = BACKDROP_SIZE.W780
    ): string | undefined => {
        if (!configData || !backdropPath) return;

        const baseUrl = configData.images.secure_base_url;
        const availableSizes = configData?.images?.backdrop_sizes || [];
        const finalSize = availableSizes.includes(size)
            ? size
            : configData.images.backdrop_sizes.find(posterSize => posterSize === BACKDROP_SIZE.ORIGINAL);

        return `${baseUrl}${finalSize}${backdropPath}`;
    };

    return {
        config: configData,
        isLoading: isConfigLoading,
        isError: isConfigError,
        getPosterUrl,
        getBackdropUrl,
    };
};
