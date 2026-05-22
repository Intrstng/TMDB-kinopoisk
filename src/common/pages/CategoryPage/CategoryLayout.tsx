import {CATEGORY_LINKS} from "@/common/constants";
import {Outlet} from "react-router";
import {PathLink} from "@/common/components/PathLink/PathLink.tsx";

export const CategoryLayout = () => {
    const categoryLinks = CATEGORY_LINKS.map(link => (
        <PathLink key={link.id} path={link.path} title={link.title}/>
    ))

    return (
        <div>
            {categoryLinks}
            {<Outlet/>}
         </div>
    );
};