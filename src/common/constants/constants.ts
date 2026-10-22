import { NESTED_PATH, PATH } from '@/common/enums';
import type { CategoryLink, HeaderNavLink } from '@/common/types';

export const API_KEY = import.meta.env.VITE_API_KEY;
export const GALLERY_LENGTH = 6;
export const GENRES_QTY = 3;
export const PAGE_SIZE = 20;
export const RATING_MIN = 0;
export const RATING_MAX = 10;
export const FAVORITES_STORAGE_KEY = 'favorites';
export const NUMBER_UNSUCCESSFUL_REQUESTS = 1;
export const UNSUCCESSFUL_REQUESTS_DELAY = 1000;
export const API_UNAVAILABLE_MODAL_TITLE = 'TMDB API is unavailable';
export const API_UNAVAILABLE_MODAL_MESSAGE = `This application retrieves data from the TMDB API. \n
The TMDB service is currently inaccessible from your network. \n
This service may be unavailable in certain countries or on specific networks due to regional or network-level restrictions.`;
export const API_UNAVAILABLE_MODAL_INSTRUCTION = 'To proceed, try enabling a VPN or switching to a different network';

export const STATUS_CODES = {
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
    CONNECT_TIMEOUT: 599,
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
        isProtected: true,
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
