import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const NavButton = styled(Button)(() => ({
    padding: '0.6rem 1rem',
    textAlign: 'center',
    textDecoration: 'none',
    // color: 'text.primary',
    fontFamily: 'ProtestFont, sans-serif',
    fontSize: '0.9rem',
    letterSpacing: '0.04rem',
    transition: 'color 0.3s ease',
    textWrap: 'nowrap',
    width: '8rem',
    textTransform: 'none',

    '&.active': {
        borderRadius: '0.25rem',
        backgroundColor: '#90cea1',
        '&:hover': {
            color: 'text.primary',
            backgroundColor: '#90cea1',
        },
    },
    '&:hover': {
        color: '#01b4e4',
        backgroundColor: 'transparent',
    },

    '@media (width <= 940px)': {
        padding: '0.4rem 0.8rem',
        fontSize: '0.8rem',
        letterSpacing: '0.02rem',
    },
}));
