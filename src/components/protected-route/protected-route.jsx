import {Navigate, useLocation} from "react-router";

export const ProtectedRoute = ({onlyUnAuth, user, children}) => {
    const location = useLocation()

    if (onlyUnAuth && user) {
        const {from} = location.state || {from: {pathname: '/'}};
        const {background} = location.state?.from?.state || null;

        return (
            <Navigate replace to={from} state={{background}} />
        )
    }
    if (!onlyUnAuth && !user) {
        console.log('navigate login');
        return (
            <Navigate replace to={{pathname: '/login'}} state={{from: location}}/>
        )
    }
    return children
}