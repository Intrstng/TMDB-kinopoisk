import { NESTED_PATH, PATH } from '@/common/enums';
import type { CategoryLink, HeaderNavLink } from '@/common/types/types.ts';

export const Http_Methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
} as const;

export const StatusCode = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
} as const;

export const HEADER_NAV_LINKS: HeaderNavLink[] = [
    {
        id: '1',
        title: 'Main',
        path: PATH.MAIN,
    },
    {
        id: '2',
        title: 'Category movies',
        path: PATH.CATEGORY,
    },
    {
        id: '3',
        title: 'Filtered movies',
        path: PATH.FILTERED,
    },
    {
        id: '4',
        title: 'Search',
        path: PATH.SEARCH,
    },
    {
        id: '5',
        title: 'Favourites',
        path: PATH.FAVOURITES,
    },
];

export const CATEGORY_LINKS: CategoryLink[] = [
    {
        id: '1',
        title: 'Popular Movies',
        path: NESTED_PATH.POPULAR,
    },
    {
        id: '2',
        title: 'Top Rated Movies',
        path: NESTED_PATH.TOP_RATED,
    },
    {
        id: '3',
        title: 'Upcoming Movies',
        path: NESTED_PATH.UPCOMING,
    },
    {
        id: '4',
        title: 'Now Playing Movies',
        path: NESTED_PATH.NOW_PLAYING,
    },
];
