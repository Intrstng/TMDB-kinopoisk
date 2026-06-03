import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import s from '@/common/components/Footer/FooterContent/FooterContent.module.css';

export const FooterContent = () => {
    return (
        <Box
            className={s.footerContent}
            sx={{
                color: 'text.secondary',
            }}
        >
            <Typography sx={{ all: 'unset' }}>Kinopoisk Demo</Typography>
            <Typography sx={{ all: 'unset' }} className={s.footerLicence}>
                Data courtesy of TMDB
            </Typography>
            <Typography sx={{ all: 'unset' }}>© 2026</Typography>
        </Box>
    );
};
