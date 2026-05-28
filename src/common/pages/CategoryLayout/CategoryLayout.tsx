import {CATEGORY_LINKS} from "@/common/constants";
import {Outlet} from "react-router";
import {PathLink} from "@/common/components/PathLink/PathLink.tsx";
import {containerSx, mainSx} from "@/common/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const CategoryLayout = () => {
    const categoryLinks = CATEGORY_LINKS.map(link => (
        <PathLink key={link.id} path={link.path} title={link.title}/>
    ))

    return (
        <Box component={'main'} sx={{
            ...mainSx,
            bgcolor: 'background.default',
            color: 'text.primary',
        }}>
            <Container sx={containerSx}>
                <Box>
                    {categoryLinks}
                    {<Outlet/>}
                </Box>
            </Container>
        </Box>
    );
};