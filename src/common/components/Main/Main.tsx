import {NESTED_PATH, PATH, SEARCH_SIZES} from '@/common/enums';
import {CATEGORY_LINKS} from '@/common/constants';
import {FilmsGallery} from '@/common/components';
import {Backdrop} from '@/common/components';
import {SearchFilmForm} from '@/common/components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {backdropSubTitleSx, backdropTitleSx} from './Main.styles.ts';
import {containerSx} from '@/common/styles';
import s from './Main.module.css';

export const Main = () => {
    return (
        <>
            <Backdrop category={NESTED_PATH.POPULAR}>
                <Stack spacing={2}>
                    <Typography sx={backdropTitleSx} variant="h1" component="h1">
                        Welcome
                    </Typography>
                    <Typography sx={backdropSubTitleSx} variant="h2" component="h2">
                        Browse highlighted titles from TMDB
                    </Typography>
                    <SearchFilmForm
                        redirectPath={PATH.SEARCH}
                        size={SEARCH_SIZES.MEDIUM}
                        isClearMode={false}
                        className={s.searchMainPageForm}
                    />
                </Stack>
            </Backdrop>

            <Container sx={containerSx}>
                <Box>
                    {CATEGORY_LINKS.map(category => (
                        <FilmsGallery key={category.id} path={category.path} title={category.title} />
                    ))}
                </Box>
            </Container>
        </>
    );
};
