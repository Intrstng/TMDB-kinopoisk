import Box from "@mui/material/Box";
import {categorySx} from "@/common/pages/CategoryLayout/CategoryPage/CategoryPage.styles.ts";
import Typography from "@mui/material/Typography";
import type {CategoryPageHeaderProps} from "@/common/pages/CategoryLayout/CategoryPage/CategoryPageHeader/types.ts";
import {CATEGORY_LINKS} from "@/common/constants";
import {PathLink} from "@/common/components/PathLink/PathLink.tsx";

export const CategoryPageHeader = ({currentCategory}: CategoryPageHeaderProps) => {
    const categoryLinks = CATEGORY_LINKS.map(link => <PathLink key={link.id} path={link.path} title={link.title}/>);

    return (
        <Box sx={categorySx.header}>
            <Typography variant={'h1'} component={'h1'} sx={categorySx.title}>
                Category: {currentCategory}
            </Typography>
            <Box sx={categorySx.nav}>{categoryLinks}</Box>
        </Box>
    );
};
