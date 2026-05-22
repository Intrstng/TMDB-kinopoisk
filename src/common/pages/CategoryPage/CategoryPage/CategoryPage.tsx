import {useLocation} from "react-router";

export const CategoryPage = () => {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);
    const currentPage = segments[segments.length - 1];

    return (
        <h1>Showing: {currentPage}</h1>
    );
};
