import type {AlertTextProps} from "@/common/components/AlertText/types.ts";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {alertTextSx} from "@/common/components/AlertText/AlertText.styles.ts";
import {containerSx, mainSx} from "@/common/styles";

export const AlertText = ({text}: AlertTextProps) => {
    return <Box
            component={'main'}
            sx={{
                ...mainSx,
                bgcolor: 'background.default',
                color: 'text.secondary',
            }}
    >
        <Container sx={containerSx}>
            <Typography sx={alertTextSx}>{text}</Typography>
        </Container>
    </Box>
};
