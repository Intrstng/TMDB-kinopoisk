import s from "./FilmCard.module.css";
import {PATH} from "@/common/enums";
import {NavLink} from "react-router-dom";
import {type FilmCardProps} from "@/common/components/FilmCard/types.ts";
import noPoster from "@/assets/images/no_poster.jpg";


const FilmCard = ({film, source}: FilmCardProps) => {
    return (
        <NavLink className={s.movieCard} to={`${PATH.CATEGORY}/${film.id}`}>
            <img
                className={s.poster}
                src={source || noPoster}
                alt={film.title}
                onError={(e) => {
                    e.currentTarget.src = noPoster;
                }}
            />
            <div className={s.movieInfo}>
                <h3 className={s.movieTitle}>{film.title}</h3>
                <p className={s.rating}>⭐ {film.vote_average}</p>
                <p className={s.releaseDate}>{film.release_date}</p>
            </div>
        </NavLink>
    );
};

export default FilmCard;