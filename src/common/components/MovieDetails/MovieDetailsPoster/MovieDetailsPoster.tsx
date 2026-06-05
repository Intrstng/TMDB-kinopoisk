import Paper from "@mui/material/Paper";
import {movieDetailsSx} from "@/common/components/MovieDetails/MovieDetails.styles.ts";
import type {MovieDetailsPosterProps} from "@/common/components/MovieDetails/types.ts";
import {useState} from "react";
import {CardMedia, Skeleton} from "@mui/material";
import noPoster from "@/assets/images/no_poster.jpg";
import type {SyntheticEvent} from 'react';

export const MovieDetailsPoster = ({sourceUrl, text = 'poster'}: MovieDetailsPosterProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Paper elevation={3} sx={movieDetailsSx.poster}>
            {!imageLoaded && (
                <Skeleton
                variant="rectangular"
                animation="wave"
                height='100%'
                width='100%'
                sx={{
                  minHeight: '26rem',
                }}/>
            )}
               <CardMedia
                component="img"
                className="image"
                sx={{
                    display: imageLoaded ? 'block' : 'none'
                }}
                image={sourceUrl}
                alt={text}
                onLoad={() => setImageLoaded(true)}
                onError={(e: SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = noPoster;
                    setImageLoaded(true);
                }}
            />
        </Paper>
    );
};
