import { FaEthereum } from "react-icons/fa"
import {flushSync} from "react-dom";
import {truncateAddress} from "@/utils/helpers";
import {useAppSelector} from "@/redux/hooks";
import {accountSelector, removeAccount} from "@/redux/slices/authSlice";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import useActiveMenuItem from "@/hooks/useActiveMenuItem";

const NavItem = ({ text, link, exact = true }: { text: string, link: string, exact?: boolean }) => {
    const isActive = useActiveMenuItem(link, exact);
    return <Link className={`px-3 text-xl ${isActive ? 'text-orange-500' : 'text-white hover:text-orange-500'} transition duration-300`} to={link}>{text}</Link>
}

const Header = () => {
    const account = useAppSelector(accountSelector);

    const dispatch = useDispatch();

    const logout = () => {
        flushSync(() => dispatch(removeAccount()));
    }


    return <nav className="bg-gray-800 px-8 py-5">
    <div className="container mx-auto flex justify-between">
        <div className="flex items-center space-x-5 cursor-pointer group">
            <h1 className="flex items-center text-2xl">
                <FaEthereum  className="group-hover:text-white text-orange-500 mr-2 animate-pulse transition duration-300" /> 
                <span className="text-white group-hover:text-orange-500 transition duration-300">Decision</span> 
                <span className="group-hover:text-white text-orange-500 transition duration-300">Chain</span>
            </h1>
            <div className="text-white text-opacity-50">{account && truncateAddress(account)}</div>
        </div>
        <nav className="flex items-center text-white">
            <NavItem text="Home" link="/" />
            <NavItem text="My Proposals" link="/my-proposals" />
            {account && <>
                <div onClick={logout} className="text-lg font-semibold bg-gray-600 text-white-500 cursor-pointer hover:bg-gray-700 rounded-md px-5 py-1.5 ml-4 transition duration-300">
                    Log out
                </div>
            </>}
        </nav>
    </div>
</nav>
}

export default Header