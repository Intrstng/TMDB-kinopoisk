export enum PATH {
    ROOT = '/',
    MAIN = '/main',
    CATEGORY = '/movies',
    FILTERED = '/filtered-movies',
    SEARCH = '/search',
    FAVOURITES = '/favorites',
    // DETAILS = '/movie/:id',
    ERROR = '/error',
    CATCH_ALL = '*',
    GITHUB = 'https://github.com/Intrstng',
}

export enum NESTED_PATH {
    POPULAR = 'popular',
    TOP_RATED = 'top-rated',
    UPCOMING = 'upcoming',
    NOW_PLAYING = 'now-playing',
    DETAILS = ':id',
}

export enum ICON_VARIANT {
    LOGO = 'logo',
    LOGO_BIG = 'logoBig',
    GIT = 'git',
}

export enum THEME_MODE {
    DARK = 'dark',
    LIGHT = 'light',
}
