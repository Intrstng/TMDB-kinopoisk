import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import s from './CastItem.module.css'
import type {CastItemProps} from "@/common/components/Cast/CastItem/types.ts";

export const CastItem = ({name, character,avatarUrl}: CastItemProps) => {
    return (
        <Box
            component="article"
            sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
                bgcolor: 'background.paper'
            }}
        >
            <img src={avatarUrl} alt={name} loading={'lazy'} className={s.avatar} />
            <Typography variant="h4">{name}</Typography>
            <Typography variant="h5">{character}</Typography>
        </Box>
    );
};