import { z } from 'zod';
import {
    favoriteFilmCardPropsSchema,
    favoriteFilmSchema,
} from '@/common/pages/FavouritesPage/model/favoritePage.schemas.ts';

export type FavoriteFilm = z.infer<typeof favoriteFilmSchema>;
export type FavoriteFilmCardProps = z.infer<typeof favoriteFilmCardPropsSchema>;
