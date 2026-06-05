import type { SxProps } from '@mui/material';

const sortFormSx: SxProps = {
    width: '100%',
};

const sortItemSx: SxProps = {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
};

const sortIconSx: SxProps = {
    minWidth: 'auto',
    justifyContent: 'flex-end',
};

const sortIconFontSx: SxProps = {
    fontSize: '0.9rem',
};

export const sortSx = {
    form: sortFormSx,
    item: sortItemSx,
    sortIcon: sortIconSx,
    sortIconFont: sortIconFontSx,
} as const;
