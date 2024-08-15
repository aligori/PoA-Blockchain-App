import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {addAccount} from "@/redux/slices/authSlice";
import {flushSync} from "react-dom";
import {useAppDispatch} from "@/redux/hooks";
import { showError } from "@/utils/helpers";

export const MetamaskConnect = () => {
    const dispatch = useAppDispatch();

    const [error, setError] = useState('')

    useEffect(() => {
        async function checkNetwork() {
            try {
                // Check if the user is connected to the private network with ChainId = 281099
                const { ethereum } = window as any;
                if (ethereum) {
                    await ethereum.request({ method: 'eth_chainId' });
                    const metamaskProvider = new ethers.providers.Web3Provider(ethereum);
                    const network = await metamaskProvider.getNetwork();
                    if (network.chainId !== 281099) {
                        const err = 'Please connect Metamask to the private Geth network with id: 281099'
                        showError(err, 7000);
                        setError(err)
                    }
                }
            } catch (error) {
                console.error('Error checking network:', error);
            }
        }
        checkNetwork()
    }, []);

    async function connect() {
        const { ethereum } = window;
        
        if (!ethereum) {
            console.error("Metamask is not installed");
            return;
        }

        await ethereum.request({ method: "eth_requestAccounts" });

        const metamaskProvider = new ethers.providers.Web3Provider(ethereum);
        const signer = metamaskProvider.getSigner();

        // Get selected account address
        const account = await signer.getAddress()

        // Store the selected account address in redux state to persist authentication across the whole SPA
        flushSync(() => {
            dispatch(addAccount(account));
        })
    }

  return <div>
      {
        !error 
        ?   <button onClick={connect} className="text-lg font-semibold bg-gray-800 text-white py-5 px-10 rounded-lg shadow-sm hover:bg-gray-700 transition duration-300">
                Login via Metamask
            </button> 
        : <div className="font-semibold">{error}</div>
      }
  </div>
}