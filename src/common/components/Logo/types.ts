import { logoPropsSchema } from '@/common/components/Logo/model/logo.schemas.ts';
import { z } from 'zod';

export type LogoProps = z.infer<typeof logoPropsSchema>;
