import { z } from 'zod';
import { filmGalleryPropsSchema } from '@/common/components/FilmsGallery/model/filmsGallery.schemas.ts';

export type FilmGalleryProps = z.infer<typeof filmGalleryPropsSchema>;
