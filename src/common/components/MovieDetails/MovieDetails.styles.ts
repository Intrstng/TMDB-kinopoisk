import type { SxProps } from '@mui/material';

const detailsSx: SxProps = {
    padding: '3rem 0 2rem',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '3rem',
};

const filmHeaderSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
};

const posterSx: SxProps = {
    maxWidth: '18rem',
    width: '100%',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow:
        'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
    '& img': {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
};

const filmTitleSx: SxProps = {
    width: '70%',
    paddingRight: '2rem',
    marginBottom: '1rem',
    fontFamily: '"AntonFont", sans-serif',
    fontSize: '3rem',
    letterSpacing: '0.03rem',
};

const filmDescriptionSx: SxProps = {
    marginBottom: '1.5rem',
    fontFamily: '"ShareTechFont", sans-serif',
    fontSize: '1.25rem',
    letterSpacing: '0.01rem',
};

const filmInfoSx: SxProps = {
    marginBottom: '1.5rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2rem',
};

const filmYearSx: SxProps = {
    fontFamily: '"ShareTechFont", sans-serif',
    fontSize: '1.25rem',
    letterSpacing: '0.01rem',
};

const filmRuntimeSx: SxProps = {
    fontFamily: '"ShareTechFont", sans-serif',
    fontSize: '1.25rem',
    letterSpacing: '0.01rem',
};

const voteSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"ShareTechFont", sans-serif',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    backgroundColor: '#23c55e',
    color: '#fff',
};

const genresListSx: SxProps = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '1rem',
};

const genresTitleSx: SxProps = {
    marginBottom: '1.5rem',
    fontFamily: '"AntonFont", sans-serif',
    fontSize: '1.5rem',
    letterSpacing: '0.01rem',
};

const genreItemSx: SxProps = {
    padding: '0.5rem 1rem',
    fontFamily: '"ShareTechFont", sans-serif',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    backgroundColor: '#90cea1',
    borderRadius: '0.25rem',
};

const filmYearSpanSx: SxProps = {
    fontFamily: '"AntonFont", sans-serif',
    fontSize: '1.1rem',
    letterSpacing: '0.02rem',
};

export const movieDetailsSx = {
    details: detailsSx,
    filmHeader: filmHeaderSx,
    poster: posterSx,
    filmTitle: filmTitleSx,
    filmDescription: filmDescriptionSx,
    filmInfo: filmInfoSx,
    filmYear: filmYearSx,
    filmRuntime: filmRuntimeSx,
    vote: voteSx,
    genresList: genresListSx,
    genresTitle: genresTitleSx,
    genreItem: genreItemSx,
    filmYearSpan: filmYearSpanSx,
    filmRuntimeSpan: filmYearSpanSx,
} as const;
