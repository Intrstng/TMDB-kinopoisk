import { z } from 'zod';
import { castItemPropsSchema } from '@/common/components/CastItem/model/CastItem.schemas.ts';

export type CastItemProps = z.infer<typeof castItemPropsSchema>;
