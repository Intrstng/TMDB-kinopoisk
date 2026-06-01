import {FAVORITES_STORAGE_KEY} from "@/common/constants";
import {Box, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import type {FavoriteFilm} from "@/common/pages/FavouritesPage/types.ts";
import {FavoriteFilmCard} from "@/common/pages/FavouritesPage/FavoriteFilmCard/FavoriteFilmCard.tsx";
import {favouritesPageSx} from './FavouritesPage.styles.ts';
import {AlertText} from "@/common/components/AlertText/AlertText.tsx";

export const FavouritesPage = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<FavoriteFilm[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadFavorites = () => {
        const storedData = localStorage.getItem(FAVORITES_STORAGE_KEY);

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setFavoriteMovies(parsedData);
        } else {
            setFavoriteMovies([]);
        }
        setIsLoading(false);
    };

    const handleRemoveFavorite = (updatedFavorites: FavoriteFilm[]) => {
        setFavoriteMovies(updatedFavorites);
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const isHasFilms = favoriteMovies.length > 0;
    if (isLoading) return <AlertText text={'Loading of your favorite movies'}/> // change to loader or skeleton
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
                                onRemove={handleRemoveFavorite}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
