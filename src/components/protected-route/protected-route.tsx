import {Navigate, RouteProps, useLocation} from "react-router";
import React, {ReactElement} from "react";
import {useSelector} from "../../services/hooks";

type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
    children: ReactElement;
} & RouteProps;

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({onlyUnAuth, children, ...props}) => {
    const location = useLocation();
    const user = useSelector(state => state.authorizationStore.data);


    if (onlyUnAuth && user) {
        console.log('navigate main');
        const {from} = location.state || {from: {pathname: '/'}};
        const {background} = location.state?.from?.state || {background: null};
        return (
            <Navigate replace to={from} state={{background}}/>
        )
    }
    if (!onlyUnAuth && !user) {
        console.log('navigate login');
        return (
            <Navigate replace to={{pathname: '/login'}} state={{from: location}}/>
        )
    }
    return children
};