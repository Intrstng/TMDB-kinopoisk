import { z } from 'zod';
import { signUpPageFormArgsSchema } from '@/common/pages/SignUpPage/model/SignUpPage.schemas.ts';

export type SignUpPageFormArgs = z.infer<typeof signUpPageFormArgsSchema>;
