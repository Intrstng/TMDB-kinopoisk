import {Box, Container, Typography} from "@mui/material";
import {FavoriteFilmCard} from "@/common/components/FavoriteFilmCard/FavoriteFilmCard.tsx";
import {favouritesPageSx} from './FavouritesPage.styles.ts';
import {AlertText} from "@/common/components/AlertText/AlertText.tsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/app/config/firebase.ts";
import {useGetFavoritesQuery} from "@/features/films/api/filmsApi.ts";

export const FavouritesPage = () => {
    const [user] = useAuthState(auth);

    const { data: favoriteMovies = [], isLoading: isFavoriteMoviesLoading } = useGetFavoritesQuery(
        { userUid: user?.uid || '' },
        { skip: !user }
    );

    const isHasFilms = favoriteMovies.length > 0;
    if (isFavoriteMoviesLoading) return <AlertText text={'Loading of your favorite movies'}/> // change to loader or skeleton
    if (!isHasFilms) return <AlertText text={'You don\'t have any featured movies selected yet.'}/>

    return (
        <Container sx={favouritesPageSx.container}>
            <Box>
                <Typography variant="h2" component="h2" sx={favouritesPageSx.favoritesTitle}>
                    Favorite Films
                </Typography>
                <Box sx={favouritesPageSx.block}>
                    <Box sx={favouritesPageSx.moviesGrid}>
                        {favoriteMovies.map(film => (
                            <FavoriteFilmCard
                                key={film.id}
                                filmId={film.id}
                                title={film.title}
                                source={film.posterUrl}
                                rating={film.voteAverage}
                                isCardLoading={isFavoriteMoviesLoading}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
