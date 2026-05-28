import Container from "@mui/material/Container"
import {containerSx, mainSx} from "@/common/styles";
import Box from "@mui/material/Box";
import {FilmsGallery} from "@/common/components/FilmsGallery/FilmsGallery.tsx";
import {CATEGORY_LINKS} from "@/common/constants";
import {Backdrop} from "@/common/components/Backdrop/Backdrop.tsx";
import {NESTED_PATH, PATH, SEARCH_SIZES} from "@/common/enums";
import {SearchFilmForm} from "@/common/components/SearchFilmForm/SearchFilmForm.tsx";
import {backdropSubTitleSx, backdropTitleSx} from './Main.styles.ts'
import s from './Main.module.css'
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";

export const Main = () => {
    return (
        <Box component={'main'} sx={{
            ...mainSx,
            bgcolor: 'background.default',
            color: 'text.primary',
        }}>
            <Backdrop category={NESTED_PATH.POPULAR}>
                <Stack spacing={2}>
                    <Typography sx={backdropTitleSx} variant="h1" component="h1">Welcome</Typography>
                    <Typography sx={backdropSubTitleSx} variant="h2" component="h2">Browse highlighted titles from TMDB</Typography>
                        <SearchFilmForm
                            redirectPath={PATH.SEARCH}
                            size={SEARCH_SIZES.MEDIUM}
                            className={s.searchMainPageForm}
                        />
                </Stack>
            </Backdrop>

            <Container sx={containerSx}>
                {/*<div className={s.container}>*/}
                <div>
                    {/*<div className={s.moviesGrid}>*/}
                    <div>
                        {CATEGORY_LINKS.map((category) => (
                            <FilmsGallery key={category.id} path={category.path} title={category.title}/>
                        ))}
                    </div>
                </div>
            </Container>
        </Box>
    );
};
