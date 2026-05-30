import {Avatar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import type {CastItemProps} from "@/common/components/Cast/CastItem/types.ts";
import {castSx} from "@/common/components/Cast/CastItem/CastItem.styles.ts";
import noAvatar from "@/assets/images/no-avatar.jpg";

export const CastItem = ({name, character,avatarUrl}: CastItemProps) => {
    return (
        <Box
            component="article"
            sx={castSx.card}
        >
            <Avatar
                src={avatarUrl || noAvatar}
                alt={name}
                sx={castSx.avatar}
                variant="circular"
            />

            <Typography variant="h4" sx={castSx.name}>{name}</Typography>
            <Typography variant="h5" sx={castSx.character}>{character}</Typography>
        </Box>
    );
};