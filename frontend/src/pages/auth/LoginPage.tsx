import * as React from 'react';
import {useEffect, useState} from "react";
import Lottie from "@/core/Lottie";
import eth from "@/assets/animations/eth.json";
import InstallMetamask from "@/components/login/InstallMetamask";
import {MetamaskConnect} from "@/components/login/MetamaskConnect";
import GuestLayout from "@/hoc/layouts/GuestLayout";

const LoginPage = () => {
    const [metamaskInstalled, setMetamaskInstalled] = useState(true);

    useEffect(() => {
        // Check if metamask is installed, to prompt the user if it already isn't
        const {ethereum} = window as any;
        setMetamaskInstalled(!!ethereum);
    }, []);

    return (
        <GuestLayout>
            <div className="mt-10">
                <Lottie itemKey="default" animationData={eth} width={200} loop/>
            </div>
            <div className="text-center text-5xl font-bold py-5 text-gray-900">
                Decision Making Ethereum Application
            </div>
            <div className="text-gray-500 text-2xl w-1/2 text-center">
                This is a demo blockchain application to manage internal decision making of the board of directors of an
                association.
            </div>
            <div className="py-10">
                {!metamaskInstalled ? <InstallMetamask/> : <MetamaskConnect/>}
            </div>
        </GuestLayout>
    );
}

export default LoginPage;
