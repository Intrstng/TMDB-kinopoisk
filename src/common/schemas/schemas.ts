import { z } from 'zod';
import { ICON_VARIANT, NESTED_PATH, PATH } from '@/common/enums';

export const PATHSchema = z.enum(PATH);
export const NESTED_PATHSchema = z.enum(NESTED_PATH);
export const IconVariantSchema = z.enum(ICON_VARIANT);
