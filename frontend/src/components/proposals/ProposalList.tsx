import {useProposalContract} from "@/hooks/useProposalContract";
import {useEffect, useState} from "react";
import {showError} from "@/utils/helpers";
import ProposalItem from "@/components/proposals/ProposalItem";
import {useAppSelector} from "@/redux/hooks";
import {accountSelector} from "@/redux/slices/authSlice";
import no_data from "@/assets/animations/no_data.json";
import Lottie from "@/core/Lottie";
import { ProposalStatus } from "@/constants";

interface ProposalListProps {
    updated?: number,
    isOwn?: boolean,
    onUpdate?: () => void
}

const ProposalList = ({updated, onUpdate = () => {}, isOwn = false}: ProposalListProps) => {
    const {getAllProposals} = useProposalContract();
    const account = useAppSelector(accountSelector);

    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let {data, error} = await getAllProposals();

            // Filter only pending proposals
            data = data.filter((proposal) => proposal.status === ProposalStatus.Pending)

            // If isOwn is true, filter only proposals created by the logged in user
            if (isOwn) {
                data = data.filter((proposal) => proposal.author === account)
            }

            if (error) {
                showError('Error fetching proposals!')
            }

            setProposals(data);
        }
        void getData();
    }, [getAllProposals, updated, account, isOwn])

    return <div className="space-y-3 my-8">
        {
            proposals.length > 0 
            ? proposals.map((proposal) => {
                return (
                    <ProposalItem
                        id={proposal.id}
                        proposal={proposal}
                        onUpdate={onUpdate}
                    />)  
            })
            : <div className="flex flex-col items-center justify-center">
                <Lottie itemKey="no-data" animationData={no_data} width={300} loop/>
            </div>
        }
    </div>
}

export default ProposalList