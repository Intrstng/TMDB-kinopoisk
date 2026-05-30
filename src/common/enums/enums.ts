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

export enum BACKDROP_SIZE {
    W300 = 'w300',
    W780 = 'w780',
    W1280 = 'w1280',
    ORIGINAL = 'original',
}

export enum LOGO_SIZE {
    W45 = 'w45',
    W92 = 'w92',
    W154 = 'w154',
    W185 = 'w185',
    W300 = 'w300',
    W500 = 'w500',
    ORIGINAL = 'original',
}

export enum POSTER_SIZE {
    W92 = 'w92',
    W154 = 'w154',
    W185 = 'w185',
    W342 = 'w342',
    W500 = 'w500',
    W780 = 'w780',
    ORIGINAL = 'original',
}

export enum PROFILE_SIZE {
    W45 = 'w45',
    W185 = 'w185',
    H632 = 'h632',
    ORIGINAL = 'original',
}

export enum STILL_SIZE {
    W92 = 'w92',
    W185 = 'w185',
    W300 = 'w300',
    ORIGINAL = 'original',
}

export enum SORT_BY {
    POPULARITY_ASC = 'popularity.asc',
    POPULARITY_DESC = 'popularity.desc',
    VOTE_AVERAGE_ASC = 'vote_average.asc',
    VOTE_AVERAGE_DESC = 'vote_average.desc',
    PRIMARY_RELEASE_DATE_ASC = 'primary_release_date.asc',
    PRIMARY_RELEASE_DATE_DESC = 'primary_release_date.desc',
    ORIGINAL_TITLE_ASC = 'original_title.asc',
    ORIGINAL_TITLE_DESC = 'original_title.desc',
}

export enum RATING_RANGE {
    VOTE_AVERAGE_GTE = 'vote_average.gte',
    VOTE_AVERAGE_LTE = 'vote_average.lte',
}

export enum SEARCH_SIZES {
    MEDIUM = 'medium',
    SMALL = 'small',
}
