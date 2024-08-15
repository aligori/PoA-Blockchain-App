import addressData from "../contracts/proposalContract/deployedAddress.json";
import abiData from "../contracts/proposalContract/contractAbi.json";
import {Interface} from "ethers/lib/utils";
import {useCallback, useEffect} from "react";
import {ethers} from "ethers";
import {useSigner} from "@/hooks/useSigner";

const contractAddress = addressData.address || '';
const contractAbi = JSON.stringify(abiData) || [];

const ABI = new Interface(contractAbi);

/* This hook encapsulates interaction with the Proposal Contract.*/
export const useProposalContract = () => {
    // Use the current provider and signer to sign transactions
    const {signer, provider} = useSigner();

    useEffect(() => {
        // A quick test to check whether the contract is deployed to the chain
        const testContract = async () => {
            const { ethereum } = window as any
            if (!ethereum) return undefined;
            const code = await provider.getCode(contractAddress);
            if (code === '0x') {
                console.error('No contract deployed at the specified address');
                return;
            }
        }
        void testContract();
    }, [provider])

    // Function that calls submitProposal
    const createProposal = useCallback(async (title: string, description: string, deadline: number) => {
        console.log("Calling create proposal..");
        try {
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            const tx = await contract.submitProposal(title, description, deadline);
            console.log("Transaction sent, waiting for confirmation...");
            await tx.wait();
            console.log("Transaction confirmed!");
        } catch (error) {
            throw error
        }
    }, [signer])

    // Function that calls getAllProposals from Proposal Contract
    const getAllProposals = useCallback(async () => {
        try {
            const contract = new ethers.Contract(contractAddress, ABI, provider)
            const result = await contract.getAllProposals();

            // Format the results in the appropriate format for display
            const formattedResult = result.map((proposal, index) => {
                return {
                    id: index,
                    title: proposal[0],
                    description: proposal[1],
                    author: proposal[2],
                    proposalDate: new Date(proposal[3].toNumber() * 1000).toLocaleString(),
                    deadline: new Date(proposal[4].toNumber() * 1000).toLocaleString(),
                    status: proposal[5]
                };
            });
            return { data: formattedResult };
        } catch (error) {
            console.error('Error fetching proposals:', error);
            return { data: [], error }
        }
    }, [provider]);

    // Function that calls getProposal from Proposal Contract
    const getOneProposal = useCallback(async (id: number) => {
        try {
            const contract = new ethers.Contract(contractAddress, ABI, provider)
            const proposal = await contract.getProposal(id);

            if (proposal) {
                // Format the result for display
                const formattedResult = {
                    id,
                    title: proposal[0],
                    description: proposal[1],
                    author: proposal[2],
                    proposalDate: new Date(proposal[3].toNumber() * 1000).toLocaleString(),
                    deadline: new Date(proposal[4].toNumber() * 1000).toLocaleString(),
                    status: proposal[5]
                };
                return { data: formattedResult };
            } else {
                return { data: {} };
            }
        } catch (error) {
            console.error('Error fetching proposal:', error);
            return { data: undefined, error }
        }
    }, [provider]);

    // Function that calls the voting function from Proposal contract
    const castVote = useCallback(async (id: number, option: number) => {
        console.log("Voting ...");
        try {
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            const tx = await contract.vote(id, option);
            console.log("Voting Transaction sent, waiting for confirmation...");
            await tx.wait();
            console.log("Voting Transaction confirmed!");
        } catch (error) {
            throw error
        }
    }, [signer]);

    // Function that calls the contract's hasVoted function that checks whether the current user has already voted
    const checkVote = useCallback(async (id: number) => {
        if (!signer) return { data: false }
        try {
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            const hasVoted = await contract.hasVoted(id);
            return { data: hasVoted };
        } catch (error) {
            console.error('Error fetching if user has voted:', error);
            return { data: false }
        }
    }, [signer]);

    // Function that gets all the votes for a proposal
    const getProposalVotes = useCallback(async (id: number) => {
        try {
            const contract = new ethers.Contract(contractAddress, ABI, provider)
            const votes = await contract.getProposalVotes(id);
            return {
                yesVotes: votes?.yesCount?.toNumber() ?? 0,
                noVotes: votes?.noCount?.toNumber() ?? 0
            }
        } catch (error) {
            console.error('Error fetching proposal:', error);
            return { data: undefined, error }
        }
    }, [provider]);

    // Function that calls finalizeProposal from Proposal Contract
    const finalizeProposal = useCallback(async (id: number) => {
        console.log("Finalizing ...");
        try {
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            const tx = await contract.finalizeProposal(id);
            console.log("Waiting for confirmation...");
            await tx.wait();
            console.log("Decision Finalized!");
        } catch (error) {
            throw error
        }
    }, [signer])

    return { getAllProposals, createProposal, getOneProposal, checkVote, castVote, getProposalVotes, finalizeProposal }
}