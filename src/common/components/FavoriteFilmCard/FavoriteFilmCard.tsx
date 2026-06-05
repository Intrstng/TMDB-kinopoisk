import {NavLink} from 'react-router-dom';
import {useEffect, useState} from "react";
import type {MouseEvent} from 'react'
import type {FavoriteFilm, FavoriteFilmCardProps} from "@/common/pages/FavouritesPage/types.ts";
import {PATH} from '@/common/enums';
import noPoster from '@/assets/images/no_poster.jpg';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {FAVORITES_STORAGE_KEY} from "@/common/constants";
import {styled} from "@mui/material/styles";
import {favoriteCardSx} from "@/common/components/FavoriteFilmCard/FavoriteFilmCard.styles.ts";

const StyledNavLink = styled(NavLink)(() => ({
    textDecoration: 'none',
}));

export const FavoriteFilmCard = ({filmId, title, source, rating, onRemove}: FavoriteFilmCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    // Check if film is in favorites on mount
    useEffect(() => {
        const favorites: FavoriteFilm[] = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
        const isCurrentFavorite = favorites.some(favFilm => favFilm.id === filmId)
        setIsFavorite(isCurrentFavorite);
    }, [filmId]);

    const handleFavoriteClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const favorites: FavoriteFilm[] = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');

        let newFavorites: FavoriteFilm[];
        if (isFavorite) {
            newFavorites = favorites.filter(favFilm => favFilm.id !== filmId);
            onRemove(newFavorites);
        } else {
            const newFavoriteFilm: FavoriteFilm = {
                id: filmId,
                title: title,
                posterUrl: source,
                voteAverage: rating,
            }
            newFavorites = [...favorites, newFavoriteFilm];
        }
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <StyledNavLink to={`${PATH.CATEGORY}/${filmId}`}>
            <Box sx={favoriteCardSx.imageCard}>
                <CardMedia
                    component="img"
                    className="favoriteImage"
                    sx={favoriteCardSx.image}
                    image={source || noPoster}
                    alt={title}
                    onError={e => {
                        e.currentTarget.src = noPoster;
                    }}
                />
                <Typography variant={'h4'} component={'h4'} sx={favoriteCardSx.rating}>{rating.toFixed(1)}</Typography>
                <IconButton
                    onClick={handleFavoriteClick}
                    sx={favoriteCardSx.favoriteIcon}
                    aria-label="add to favorites"
                >
                    {isFavorite ? <FavoriteIcon sx={favoriteCardSx.iconSelected}/> : <FavoriteBorderIcon />}
                </IconButton>
            </Box>
            <Box sx={favoriteCardSx.movieInfo}>
                <Typography variant={'h3'} component={'h3'} sx={favoriteCardSx.title}>{title}</Typography>
            </Box>
        </StyledNavLink>
    );
};
