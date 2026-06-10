import type { SxProps } from '@mui/material';

const contentSx: SxProps = {
    paddingTop: 15,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
};

const logoSx: SxProps = {
    m: 1,
    backgroundColor: 'text.secondary',
    color: 'action.selected',
};

const loginTitleSx: SxProps = {
    margin: '1rem 0 0.5rem',
    fontSize: '1.85rem',
    fontFamily: 'ProtestFont, sans-serif',
    color: 'text.secondary',
    textTransform: 'capitalize',
    letterSpacing: '0.05rem',

    '@media (width <= 480px)': {
        margin: '1.5rem 0 1rem',
        fontSize: '1.8rem',
    },
};

const emailInputSx: SxProps = {
    mb: 3,
};

const buttonSx: SxProps = {
    mt: 5,
    mb: 1,
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    borderColor: 'text.secondary',
    textDecoration: 'none',
    color: 'text.secondary',
    fontFamily: 'ProtestFont, sans-serif',
    transition: 'all 0.3s ease',

    '&:hover': {
        color: 'action.selected',
        backgroundColor: 'text.secondary',
    },

    '&.active': {
        color: 'text.secondary',
        borderColor: 'text.secondary',
        backgroundColor: 'action.selected',
    },

    '@media (max-width: 480px)': {
        padding: '0.4rem 0.8rem',
        fontSize: '0.8rem',
    },
};

const linkSx: SxProps = {
    textAlign: 'center',
};

const linkClueSx: SxProps = {
    textDecoration: 'underline',
    fontSize: '0.9rem',
};

const errorFormSx: SxProps = {
    position: 'absolute',
    left: 0,
    color: '#d32f2f',
    fontFamily: 'ShareTechFont, sans-serif',
    fontSize: '0.7rem',
};

const errorMailSx: SxProps = {
    bottom: 3,
};

const errorPassSx: SxProps = {
    top: '2.8rem',
};

export const LoginSx = {
    content: contentSx,
    logo: logoSx,
    title: loginTitleSx,
    emailInput: emailInputSx,
    button: buttonSx,
    link: linkSx,
    linkClue: linkClueSx,
    errorForm: errorFormSx,
    errorMail: errorMailSx,
    errorPass: errorPassSx,
} as const;
