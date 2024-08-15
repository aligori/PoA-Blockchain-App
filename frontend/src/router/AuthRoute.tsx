import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
import {accountSelector} from '@/redux/slices/authSlice';

const AuthRoute = () => {
    const account = useSelector(accountSelector);

    // If there is no ethereum account stored in redux state, the user is not authenticated
    if (!account) {
        return <Navigate to="/login"/>;
    }

    return <Outlet/>;
};

export default AuthRoute;
