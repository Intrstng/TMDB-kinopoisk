import Container from "@mui/material/Container"
import {containerSx, mainSx} from "@/common/styles";
import Box from "@mui/material/Box";
import {FilmsGallery} from "@/common/components/FilmsGallery/FilmsGallery.tsx";
import {CATEGORY_LINKS} from "@/common/constants";
import {BackdropComponent} from "@/common/components/BackdropComponent/BackdropComponent.tsx";
import {NESTED_PATH} from "@/common/enums";

export const Main = () => {
    return (
        <Box component={'main'} sx={{
            ...mainSx,
            bgcolor: 'background.default',
            color: 'text.primary',
        }} >

            <BackdropComponent category={NESTED_PATH.POPULAR}>
                content
            </BackdropComponent>

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
