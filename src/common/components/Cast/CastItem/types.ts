import { z } from 'zod';
import type { castItemPropsSchema } from '@/common/components/Cast/CastItem/model/CastItem.schemas.ts';

export type CastItemProps = z.infer<typeof castItemPropsSchema>;
