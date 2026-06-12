import { z } from 'zod';
import { loginPageFormArgsSchema } from '@/common/pages/LoginPage/model/LoginPage.schemas.ts';

export type LoginPageFormArgs = z.infer<typeof loginPageFormArgsSchema>;
