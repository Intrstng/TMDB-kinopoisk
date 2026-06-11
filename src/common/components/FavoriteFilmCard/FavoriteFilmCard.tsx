import {NavLink} from 'react-router-dom';
import type {MouseEvent} from 'react'
import {type SyntheticEvent, useState} from "react";
import type {FavoriteFilmCardProps} from "@/common/pages/FavouritesPage/types.ts";
import {PATH} from '@/common/enums';
import noPoster from '@/assets/images/no_poster.jpg';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {styled} from "@mui/material/styles";
import {favoriteCardSx} from "@/common/components/FavoriteFilmCard/FavoriteFilmCard.styles.ts";
import {useRemoveFromFavoritesMutation} from "@/features/films/api/filmsApi.ts";
import Skeleton from "@mui/material/Skeleton";
import {useAppSelector} from "@/common/hooks";
import {selectUser} from "@/app/model/slices/app-slice.ts";

const StyledNavLink = styled(NavLink)(() => ({
    textDecoration: 'none',
}));

export const FavoriteFilmCard = ({filmId, title, source, rating, isCardLoading}: FavoriteFilmCardProps) => {
    const user = useAppSelector(selectUser);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(true);
    const [removeFromFavorites] = useRemoveFromFavoritesMutation()

    const handleFavoriteClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (user) {
            setIsFavorite(false)
            removeFromFavorites({userUid: user.uid, filmId})
        }
    };

    return (
        <StyledNavLink to={`${PATH.CATEGORY}/${filmId}`}>
            <Box sx={favoriteCardSx.imageCard}>
                {!imageLoaded && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={favoriteCardSx.image}
                        animation="wave"
                    />
                )}
                <CardMedia
                    component="img"
                    className="favoriteImage"
                    sx={{
                        ...favoriteCardSx.image,
                        display: imageLoaded ? 'block' : 'none'
                    }}
                    image={source || noPoster}
                    alt={title}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e: SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = noPoster;
                        setImageLoaded(true);
                    }}
                />
                <Typography variant={'h4'} component={'h4'} sx={favoriteCardSx.rating}>{rating.toFixed(1)}</Typography>
                {!isCardLoading && <IconButton
                    onClick={handleFavoriteClick}
                    sx={favoriteCardSx.favoriteIcon}
                    aria-label="add to favorites"
                >
                    {isFavorite ? <FavoriteIcon sx={favoriteCardSx.iconSelected}/> : <FavoriteBorderIcon />}
                </IconButton>}
            </Box>
            <Box sx={favoriteCardSx.movieInfo}>
                <Typography variant={'h3'} component={'h3'} sx={favoriteCardSx.title}>{title}</Typography>
            </Box>
        </StyledNavLink>
    );
};
