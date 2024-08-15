import { useLocation } from 'react-router-dom';

/* Hook that encapsulates the logic whether a menu item is active or not based on current router location */
const useActiveMenuItem = (
    link?: string,
    exact = false
): boolean => {
    const location = useLocation();
    const currentLocation = location.pathname;

    if (typeof link === 'string') {
        return exact ? currentLocation === link : currentLocation.startsWith(link);
    }

    return false;
};

export default useActiveMenuItem;