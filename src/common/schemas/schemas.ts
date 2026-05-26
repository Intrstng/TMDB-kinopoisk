import { z } from 'zod';
import { ICON_VARIANT, PATH } from '@/common/enums';

export const PATHSchema = z.enum(PATH);
export const IconVariantSchema = z.enum(ICON_VARIANT);
