import {Outlet} from "react-router";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "@/common/hooks";
import {selectUser} from "@/app/model/slices/app-slice.ts";
import {PATH} from "@/common/enums";

export const PrivateRoutes = () => {
    const user = useAppSelector(selectUser);

    return user ? <Outlet/> : <Navigate to={PATH.LOGIN}/>
};