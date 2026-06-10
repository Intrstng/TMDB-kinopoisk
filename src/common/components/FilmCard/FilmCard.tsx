import {type MouseEvent, type SyntheticEvent, useState} from 'react'
import {NavLink} from 'react-router-dom';
import {PATH} from '@/common/enums';
import type {FilmCardProps} from '@/common/components/FilmCard/types.ts';
import noPoster from '@/assets/images/no_poster.jpg';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {cardSx} from "@/common/components/FilmCard/FilmCard.styles.ts";
import {styled} from "@mui/material/styles";
import {auth} from "@/app/config/firebase.ts";
import {useAuthState} from 'react-firebase-hooks/auth';
import {useAddToFavoritesMutation, useRemoveFromFavoritesMutation} from "@/features/films/api/filmsApi.ts";

const StyledNavLink = styled(NavLink)(() => ({
    textDecoration: 'none',
    color: "primary.main",
}));

export const FilmCard = ({film, source}: FilmCardProps) => {
    const [isFavorite, setIsFavorite] = useState(film.isFavorite);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [user] = useAuthState(auth);
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', film.id, film.title, film.isFavorite)

    // Mutations
    const [addToFavorites] = useAddToFavoritesMutation();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();

    const handleFavoriteClick = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) return;
        setIsFavorite(!isFavorite);
        try {
            if (isFavorite) {
                await removeFromFavorites({
                    userUid: user.uid,
                    filmId: film.id,
                }).unwrap();

            } else {
                await addToFavorites({
                    userUid: user.uid,
                    film: {
                        id: film.id,
                        title: film.title,
                        posterUrl: source,
                        voteAverage: film.vote_average,
                    }
                }).unwrap();
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
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
                    onError={(e: SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = noPoster;
                        setImageLoaded(true);
                    }}
                />
                <Typography variant={'h4'} component={'h4'} sx={cardSx.rating}>{film.vote_average.toFixed(1)}</Typography>
                {
                    user && <IconButton
                        onClick={handleFavoriteClick}
                        sx={cardSx.favoriteIcon}
                        aria-label="add to favorites"
                    >
                        {isFavorite ? <FavoriteIcon sx={cardSx.iconSelected}/> : <FavoriteBorderIcon />}
                    </IconButton>
                }
            </Box>
            <Box sx={cardSx.movieInfo}>
                <Typography variant={'h3'} component={'h3'} sx={cardSx.title}>{film.title}</Typography>
                <Typography variant={'h5'} component={'h5'} sx={cardSx.releaseDate}>{film.release_date}</Typography>
            </Box>
        </StyledNavLink>
    );
};
