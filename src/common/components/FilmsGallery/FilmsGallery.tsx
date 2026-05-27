import type {FilmGalleryProps} from "@/common/components/FilmsGallery/types.ts";
import {useMoviesWithConfig} from "@/common/hooks";
import {useFetchFilmsQuery} from "@/features/films/api/filmsApi.ts";
import s from "@/common/pages/CategoryLayout/CategoryPage/CategoryPage.module.css";
import FilmCard from "@/common/components/FilmCard/FilmCard.tsx";
import {POSTER_SIZE} from "@/common/enums";
import {GALLERY_LENGTH} from "@/common/constants";
import {NavLink} from "react-router-dom";
import {PATH} from "@/common/enums";

export const FilmsGallery = ({path, title}: FilmGalleryProps) => {
    const pathFormatted = path.replace(/-/g, '_');

    const {
        config: configData,
        isLoading: isConfigLoading,
        // isError: isConfigError,
        getPosterUrl
    } = useMoviesWithConfig();


    const {
        data: filmsData,
        isLoading: isMoviesLoading,
        // isError: isMoviesError
    } = useFetchFilmsQuery({ category: pathFormatted, language: 'en-US', page: 1 },
        {
            skip: !configData,
        });

    if (isConfigLoading || isMoviesLoading) {
        return <div className={s.loader}>Загрузка skeleton...</div>;
    }

    if (!filmsData?.results) {
        return <div className={s.error}>No films or invalid response structure...</div>;
    }

    const films = filmsData?.results.slice(0, GALLERY_LENGTH) || [];

    return (
        <div className={s.container}>
            <div>
                <h1 className={s.title}>{title}</h1>
                <NavLink to={`${PATH.CATEGORY}/${path}`}>View more</NavLink>
            </div>


            <div className={s.moviesGrid}>
                {films.map((movie) => (
                    <FilmCard key={movie.id} film={movie} source={getPosterUrl(movie.poster_path, POSTER_SIZE.W342)}/>
                ))}
            </div>
        </div>
    );
};
