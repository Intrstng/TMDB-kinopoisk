import type { SxProps } from '@mui/material';

const ratingContainerSx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
};

const ratingSubtitleSx: SxProps = {
    fontFamily: 'ShareTechFont, sans-serif',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'text.secondary',
    letterSpacing: '0.07rem',
    '@media (max-width: 940px)': {
        fontSize: '0.7rem',
    },
    '@media (max-width: 768px)': {
        fontSize: '1rem',
    },
};

const ratingBlockSx: SxProps = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
};

const ratingValuesBlockSx: SxProps = {
    display: 'flex',
    alignItems: 'center',
    width: '8rem',
    gap: 1,
    '@media (max-width: 940px)': {
        gap: '0.2rem',
    },
    '@media (max-width: 768px)': {
        gap: 1,
    },
};

const currentValuesSx: SxProps = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
};

const ratingValueSx: SxProps = {
    fontFamily: 'ShareTechFont, sans-serif',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'primary.light',
    letterSpacing: '0.07rem',
    '@media (max-width: 940px)': {
        fontSize: '0.7rem',
    },
    '@media (max-width: 768px)': {
        fontSize: '1rem',
    },
};

const sliderSx: SxProps = {
    fontFamily: 'ShareTechFont, sans-serif',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'primary.light',
    letterSpacing: '0.07rem',
};

const sliderLimitsSx: SxProps = {
    padding: '0 0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
};

export const ratingRangeSx = {
    container: ratingContainerSx,
    ratingBlock: ratingBlockSx,
    ratingValuesBlock: ratingValuesBlockSx,
    currentValues: currentValuesSx,
    subtitle: ratingSubtitleSx,
    ratingValue: ratingValueSx,
    slider: sliderSx,
    limits: sliderLimitsSx,
} as const;
