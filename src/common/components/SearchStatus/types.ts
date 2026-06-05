import { z } from 'zod';
import type { searchStatusSchema } from '@/common/components/SearchStatus/model/searchStatus.schemas.ts';

export type SearchStatusProps = z.infer<typeof searchStatusSchema>;
