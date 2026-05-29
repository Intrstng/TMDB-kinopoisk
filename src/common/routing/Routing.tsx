import {createBrowserRouter, Navigate, type RouteObject,} from "react-router-dom";
import {NESTED_PATH, PATH} from "@/common/enums";
import {Main} from "@/common/components/Main/Main.tsx";
import {Error404} from "@/common/pages/Error404/Error404.tsx";
import App from "@/App.tsx";
import {CategoryLayout} from "@/common/pages/CategoryLayout/CategoryLayout.tsx";
import {FavouritesPage} from "@/common/pages/FavouritesPage/FavouritesPage.tsx";
import {SearchPage} from "@/common/pages/SearchPage/SearchPage.tsx";
import {FilteredPage} from "@/common/pages/FilteredPage/FilteredPage.tsx";
import {CategoryPage} from "@/common/pages/CategoryLayout/CategoryPage/CategoryPage.tsx";
import {MoviePage} from "@/common/pages/MoviePage/MoviePage.tsx";

const categoryRoutes: NESTED_PATH[] = [NESTED_PATH.POPULAR, NESTED_PATH.TOP_RATED, NESTED_PATH.UPCOMING, NESTED_PATH.NOW_PLAYING];

const publicRoutes: RouteObject[] = [
    {
        path: PATH.MAIN,
        element: <Main/>,
    },
    {
        path: PATH.CATEGORY,
        element: <CategoryLayout />,
        children: [
            {
                index: true,
                element: <Navigate to={`${PATH.CATEGORY}/${NESTED_PATH.POPULAR}`} replace />,
            },
            ...categoryRoutes.map((route) => ({
                path: route,
                element: <CategoryPage />,
            })),
            {
                path: NESTED_PATH.DETAILS,
                element: <MoviePage />
            },
        ],
    },
    {
        path: PATH.FILTERED,
        element: <FilteredPage/>,
    },
    {
        path: PATH.SEARCH,
        element: <SearchPage/>,
    },
    {
        path: PATH.FAVOURITES,
        element: <FavouritesPage/>,
    },
    {
        path: PATH.ERROR,
        element: <Error404/>,
    },
]

export const router = createBrowserRouter([
    {
        path: PATH.ROOT,
        element: <App />,
        errorElement: <Navigate to={PATH.ERROR}/>,
        children: [
            {
                index: true, // to pass to the main page automatically when root url '/' is entered
                element: <Navigate to={PATH.MAIN} />,
            },
            ...publicRoutes,
            // {
            //     path: PATH.CATCH_ALL,
            //     element: <Error404 />,
            // },
        ]
    },
]);
