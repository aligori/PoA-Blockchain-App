import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from '@/redux/hooks';
import {accountSelector} from '@/redux/slices/authSlice';

export const GuestRoute = () => {
    const account = useAppSelector(accountSelector);

    // If there is an ethereum account stored in redux state, the user is already authenticated, redirect to homepage
    if (account) {
        return <Navigate to="/"/>;
    }

    return <Outlet/>;
};

export default GuestRoute;
