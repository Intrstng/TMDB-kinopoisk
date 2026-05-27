import type { ReactNode } from 'react';
import { NESTED_PATH } from '@/common/enums';

export type BackdropComponentProps = {
    category: NESTED_PATH;
    children?: ReactNode;
};
