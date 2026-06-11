import { NESTED_PATH, PATH } from '@/common/enums';

export type HeaderNavLink = {
    id: string;
    title: string;
    path: PATH;
    isProtected?: boolean;
};

export type CategoryLink = {
    id: string;
    title: string;
    path: NESTED_PATH;
};
