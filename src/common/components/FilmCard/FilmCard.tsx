// import s from './FilmCard.module.css';
// import {PATH} from '@/common/enums';
// import {NavLink} from 'react-router-dom';
// import {type FilmCardProps} from '@/common/components/FilmCard/types.ts';
// import noPoster from '@/assets/images/no_poster.jpg';
//
// const FilmCard = ({film, source}: FilmCardProps) => {
//     return (
//         <NavLink className={s.movieCard} to={`${PATH.CATEGORY}/${film.id}`}>
//             <img
//                 className={s.poster}
//                 src={source || noPoster}
//                 alt={film.title}
//                 onError={e => {
//                     e.currentTarget.src = noPoster;
//                 }}
//             />
//             <div className={s.movieInfo}>
//                 <h3 className={s.movieTitle}>{film.title}</h3>
//                 <p className={s.rating}>⭐ {film.vote_average}</p>
//                 <p className={s.releaseDate}>{film.release_date}</p>
//             </div>
//         </NavLink>
//     );
// };
//
// export default FilmCard;


import s from './FilmCard.module.css';
import {PATH} from '@/common/enums';
import {NavLink} from 'react-router-dom';
import {type FilmCardProps} from '@/common/components/FilmCard/types.ts';
import noPoster from '@/assets/images/no_poster.jpg';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {cardSx} from "@/common/components/FilmCard/FilmCard.styles.ts";
import {FAVORITES_STORAGE_KEY} from "@/common/constants";


export const FilmCard = ({film, source}: FilmCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Check if film is in favorites on mount
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
        setIsFavorite(favorites.includes(film.id));
    }, [film.id]);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const favorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter((id: number) => id !== film.id);
        } else {
            newFavorites = [...favorites, film.id];
        }

        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <NavLink className={s.cardLink} to={`${PATH.CATEGORY}/${film.id}`}>
            <Box sx={cardSx.image}>
                <img className={s.image}
                     src={source || noPoster}
                     alt={film.title}
                     onError={e => {
                         e.currentTarget.src = noPoster;
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
        </NavLink>
    );
};
