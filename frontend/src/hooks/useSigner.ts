import {useSelector} from "react-redux";
import {accountSelector} from "@/redux/slices/authSlice";
import {ethers} from "ethers";
import {useEffect, useMemo, useState} from "react";

/* This hook uses ethers.js to interact with ethereum and export the current signer and provider for usage in other react components. */
export const useSigner = () => {
    const [signer, setSigner] = useState<any>();
    const { ethereum } = window as any
    if (!ethereum) return undefined;

    // Get current account (address) from redux state
    const account = useSelector(accountSelector);
    // Use ethers to create a new provider object
    const provider = useMemo(() => new ethers.providers.Web3Provider(ethereum), [ethereum]);

    useEffect(() => {
        if (!provider || !account) {
            setSigner(undefined);
        }
        setSigner(provider.getSigner(account))
    }, [provider, account])

    return { signer, provider };
};