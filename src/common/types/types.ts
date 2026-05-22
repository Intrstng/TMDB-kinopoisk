import { NESTED_PATH, PATH } from '@/common/enums';

export type HeaderNavLink = {
    id: string;
    title: string;
    path: PATH;
};

export type CategoryLink = {
    id: string;
    title: string;
    path: NESTED_PATH;
};
