import Container from "@mui/material/Container"
import {containerSx, mainSx} from "@/common/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Main = () => {
    return (
        <Box component={'main'} sx={{
            ...mainSx,
            bgcolor: 'background.default',
            color: 'text.primary',
        }} >
                <Container sx={containerSx}>
                    <Typography >Main section content</Typography>
                </Container>
        </Box>
    );
};
