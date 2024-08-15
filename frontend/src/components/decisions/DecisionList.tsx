import {useProposalContract} from "@/hooks/useProposalContract";
import {useEffect, useState} from "react";
import {showError} from "@/utils/helpers";
import {useAppSelector} from "@/redux/hooks";
import {accountSelector} from "@/redux/slices/authSlice";
import DecisionItem from "./DecisionItem";
import Lottie from "@/core/Lottie";
import no_data from "@/assets/animations/no_data.json"
import { ProposalStatus } from "@/constants";

interface DecisionListProps {
    updated?: number,
    isOwn?: boolean,
    onUpdate?: () => void,
    status?: number
}

const DecisionList = ({updated, onUpdate = () => {}, isOwn = false, status}: DecisionListProps) => {
    const {getAllProposals} = useProposalContract();
    const account = useAppSelector(accountSelector);

    const [decisions, setDecisions] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let {data, error} = await getAllProposals();

            // If isOwn is set to true, filter only decisions created by this board member
            if (isOwn) {
                data = data.filter((proposal) => proposal.author === account)
            }

            // Filter based on status (Approved, Not Approved)
            if (status) {
                data = data.filter((proposal) => proposal.status === status)
            } else {
                data = data.filter((proposal) => proposal.status !== ProposalStatus.Pending)
            }

            if (error) {
                showError('Error fetching proposals!')
            }

            setDecisions(data);
        }
        void getData();
    }, [getAllProposals, updated, account, status, isOwn])

    return <div className="space-y-3 my-8">
        {
            decisions.length > 0 
            ? decisions.map((decision) =>
                <DecisionItem
                    id={decision.id}
                    decision={decision}
                    onUpdate={onUpdate}
                />)
            : <div className="flex flex-col items-center justify-center">
                <Lottie itemKey="no-data" animationData={no_data} width={300} loop/>
            </div>
        }
    </div>
}

export default DecisionList