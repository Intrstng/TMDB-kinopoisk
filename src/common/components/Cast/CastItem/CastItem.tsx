import {Avatar, Skeleton, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import type {CastItemProps} from '@/common/components/Cast/CastItem/types.ts';
import {castSx} from '@/common/components/Cast/CastItem/CastItem.styles.ts';
import noAvatar from '@/assets/images/no-avatar.jpg';
import {useState} from "react";

export const CastItem = ({ name, character, avatarUrl }: CastItemProps) => {
    const [avatarLoaded, setAvatarLoaded] = useState(false);

    return (
        <Box component="article" sx={castSx.card}>
            {!avatarLoaded && (
                <Skeleton
                    variant="circular"
                    sx={castSx.avatar}
                    animation="wave"
                />
            )}

            <Avatar
                src={avatarUrl || noAvatar}
                alt={name}
                sx={{
                    ...castSx.avatar,
                    display: avatarLoaded ? 'block' : 'none'
                }}
                variant="circular"
                onLoad={() => setAvatarLoaded(true)}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = noAvatar;
                    setAvatarLoaded(true);
                }}
            />

            <Typography variant="h4" sx={castSx.name}>
                {name}
            </Typography>
            <Typography variant="h5" sx={castSx.character}>
                {character}
            </Typography>
        </Box>
    );
};
