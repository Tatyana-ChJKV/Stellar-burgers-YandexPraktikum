import {AppHeader} from "../app-header/app-header";
import {Outlet} from "react-router";

export const AppHeaderFrame = () => {
    return (
        <>
            <AppHeader/>
            <Outlet/>
        </>
    )
};