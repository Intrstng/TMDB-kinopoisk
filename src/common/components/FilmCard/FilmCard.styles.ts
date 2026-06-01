import type { SxProps } from '@mui/material';

const imageSx: SxProps = {
    minHeight: '17.5rem',
    filter: 'drop-shadow(0px 1px 2px rgb(231, 229, 177))',
    borderRadius: '1rem',
    overflow: 'hidden',
    position: 'relative',
    paddingBottom: '58%',
};

const movieInfoSx: SxProps = {
    padding: '0.5rem',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
    // height: '4.5rem',
    '@media (max-width: 768px)': {
        padding: '0.25rem',
    },
};

const movieTitleSx: SxProps = {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'text.secondary',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '@media (max-width: 768px)': {
        fontSize: '0.75rem',
    },
};

const releaseDateSx: SxProps = {
    fontSize: '0.65rem',
    color: 'text.secondary',
    margin: '0.25rem 0',
    '@media (max-width: 768px)': {
        fontSize: '0.55rem',
    },
};

const favoriteIconSx: SxProps = {
    position: 'absolute',
    zIndex: 2,
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        transform: 'scale(1.1)',
    },
    transition: 'transform 0.2s',
    '& .MuiSvgIcon-root': {
        fontSize: '1.25rem',
    },
    '& .MuiSvgIcon-root.Mui-selected': {
        color: '#e74c3c',
    },
};

const iconSelectedSx: SxProps = {
    color: '#e74c3c',
};

const ratingSx: SxProps = {
    margin: '0.25rem 0',
    position: 'absolute',
    zIndex: 2,
    bottom: '0.5rem',
    right: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.25rem',
    height: '2.25rem',
    backgroundColor: '#23c55f',
    borderRadius: '50%',
    fontSize: '0.8rem',
    color: '#fff',
    fontWeight: 'bold',
};

export const cardSx = {
    image: imageSx,
    movieInfo: movieInfoSx,
    title: movieTitleSx,
    releaseDate: releaseDateSx,
    favoriteIcon: favoriteIconSx,
    iconSelected: iconSelectedSx,
    rating: ratingSx,
} as const;
