import type { SxProps } from '@mui/material';

export const castCardSx: SxProps = {
    p: 1,
    borderRadius: 2,
    backgroundColor: 'background.paper',
};

export const castAvatarSx: SxProps = {
    marginBottom: '1rem',
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    display: 'block',
    boxShadow: 'rgb(0 0 0 / 35%) 0 5px 15px',
};

export const castNameSx: SxProps = {
    textAlign: 'center',
    fontFamily: '"ShareTechFont", sans-serif',
    fontSize: '1.5rem',
    fontWeight: 'bold',
};

export const castCharacterSx: SxProps = {
    textAlign: 'center',
    fontFamily: '"ShareTechFont", sans-serif',
    fontSize: '1.25rem',
};

export const castSx = {
    card: castCardSx,
    avatar: castAvatarSx,
    name: castNameSx,
    character: castCharacterSx,
} as const;
