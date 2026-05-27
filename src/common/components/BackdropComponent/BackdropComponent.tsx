import {useMoviesWithConfig} from "@/common/hooks";
import {useFetchFilmsQuery} from "@/features/films/api/filmsApi.ts";
import type {BackdropComponentProps} from "@/common/components/BackdropComponent/types.ts";
import {containerSx} from "@/common/styles";
import Container from "@mui/material/Container";
import {getRandomElementFromArray} from "@/common/utils/getRandomElementFromArray.ts";
import {BACKDROP_SIZE} from "@/common/enums";


export const BackdropComponent = ({category, children}: BackdropComponentProps) => {
    const {
        config: configData,
        // isLoading: isConfigLoading,
        getBackdropUrl
    } = useMoviesWithConfig();

    const {
        data: filmsData,
        // isLoading: isMoviesLoading
    } = useFetchFilmsQuery(
        {category, language: 'en-US', page: 1},
        {skip: !configData}
    );
    let backdropUrl: string | undefined = '';

    if (filmsData?.results) {
        const backdropRandomFilm = getRandomElementFromArray(filmsData?.results)
        backdropUrl = backdropRandomFilm && configData
            ? getBackdropUrl(backdropRandomFilm.backdrop_path, BACKDROP_SIZE.ORIGINAL)
            : undefined;
    }

    return (
        <div style={{position: 'relative', minHeight: 'calc(100vh - 4.3rem)', width: '100%',}}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg,rgba(2, 0, 36, 1) 0%, rgba(103, 103, 122, 1) 0%, rgba(235, 243, 245, 1) 100%)',
                    backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background-image 0.3s ease',
                }}
            />

            <div style={{position: 'relative', zIndex: 1}}>
                <Container sx={containerSx}>
                    {children}
                </Container>
            </div>
        </div>
    );
};
