import { z } from 'zod/v4';
import type { filmCardPropsSchema } from '@/common/components/FilmCard/model/filmCard.schemas.ts';

export type FilmCardProps = z.infer<typeof filmCardPropsSchema>;
