import {useLocation} from "react-router";
import {useFetchFilmsQuery} from "@/features/films/api/filmsApi.ts";

export const CategoryPage = () => {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);
    const currentCategory = segments[segments.length - 1];
    const currentCategoryFormatted = currentCategory.replace(/-/g, '_');

    const { data: films } = useFetchFilmsQuery({ category: currentCategoryFormatted, page: 1 });

    // const {data} = useGetConfigDetailsQuery()


    return (
        // <h1>Showing: {films}</h1>
        <h1>Showing: {JSON.stringify(films)}</h1>
    );
};
