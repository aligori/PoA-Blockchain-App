import {BiUser} from "react-icons/bi"
import {useAppSelector} from "@/redux/hooks";
import {accountSelector} from "@/redux/slices/authSlice";
import { truncateAddress } from "@/utils/helpers";
import { useMemo } from "react";
import { ProposalStatus } from "@/constants";
import RevertDecision from "./RevertDecision";
import ViewDecision from "./ViewDecision";
import ViewVotes from "./ViewVotes";

const DecisionItem = ({id, decision, onUpdate}: any) => {
    const account = useAppSelector(accountSelector);

    const bgColor = useMemo(() => {
        switch(decision.status) {
            case 1:
                return 'bg-rose-50 border-rose-300'
            case 2:
                return 'bg-emerald-50 border-emerald-300'
            default:
                return ''
        }
    }, [decision])

    return <div
        className={`${bgColor} flex shadow-sm items-center justify-between border rounded-lg py-5 px-8 hover:shadow cursor-pointer`}>
        <div className="flex-1">
            <div className="font-semibold mb-1">{decision.title}</div>
            <div className="flex items-center">
                <BiUser size={18} className="mr-2"/>
                <span className="mr-3">By:</span> {account === decision.author ? 'You' :
                <span className="text-semibold">{truncateAddress(decision.author)}</span>}
            </div>
        </div>
        <div className="flex items-center">
            {
                account === decision.author && decision.status != ProposalStatus.Pending 
                ? <div className="flex space-x-1">
                    <ViewVotes id={id} />
                    <RevertDecision id={id} onRevert={onUpdate}/> 
                </div>
                : <ViewDecision decision={decision} />  
            }
        </div>
    </div>
}

export default DecisionItem