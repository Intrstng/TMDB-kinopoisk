import {PATH} from '@/common/enums';
import {NavLink} from 'react-router-dom';
import {type FilmCardProps} from '@/common/components/FilmCard/types.ts';
import type {FavoriteFilm} from "@/common/pages/FavouritesPage/types.ts";
import noPoster from '@/assets/images/no_poster.jpg';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type {MouseEvent} from 'react'
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {cardSx} from "@/common/components/FilmCard/FilmCard.styles.ts";
import {FAVORITES_STORAGE_KEY} from "@/common/constants";
import {CardMedia, Skeleton} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledNavLink = styled(NavLink)(() => ({
    textDecoration: 'none',
    color: "primary.main",
}));

export const FilmCard = ({film, source}: FilmCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    // Check if film is in favorites on mount
    useEffect(() => {
        const favorites: FavoriteFilm[] = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
        const isCurrentFavorite = favorites.some(favFilm => favFilm.id === film.id)
        setIsFavorite(isCurrentFavorite);
    }, [film.id]);

    const handleFavoriteClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const favorites: FavoriteFilm[] = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter(favFilm => favFilm.id !== film.id);
        } else {
            const newFavoriteFilm: FavoriteFilm = {
                id: film.id,
                title: film.title,
                posterUrl: source,
                voteAverage: film.vote_average,
            }
            newFavorites = [...favorites, newFavoriteFilm];
        }

        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <StyledNavLink to={`${PATH.CATEGORY}/${film.id}`}>
            <Box sx={cardSx.imageCard}>
                {!imageLoaded && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={cardSx.image}
                        animation="wave"
                    />
                )}
                <CardMedia
                    component="img"
                    className="image"
                    sx={{
                        ...cardSx.image,
                        display: imageLoaded ? 'block' : 'none'
                    }}
                    image={source || noPoster}
                    alt={film.title}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = noPoster;
                        setImageLoaded(true);
                    }}
                />
                <Typography variant={'h4'} component={'h4'} sx={cardSx.rating}>{film.vote_average.toFixed(1)}</Typography>
                <IconButton
                    onClick={handleFavoriteClick}
                    sx={cardSx.favoriteIcon}
                    aria-label="add to favorites"
                >
                    {isFavorite ? <FavoriteIcon sx={cardSx.iconSelected}/> : <FavoriteBorderIcon />}
                </IconButton>
            </Box>
            <Box sx={cardSx.movieInfo}>
                <Typography variant={'h3'} component={'h3'} sx={cardSx.title}>{film.title}</Typography>
                <Typography variant={'h5'} component={'h5'} sx={cardSx.releaseDate}>{film.release_date}</Typography>
            </Box>
        </StyledNavLink>
    );
};
