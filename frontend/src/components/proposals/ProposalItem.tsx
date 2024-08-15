import Button from "@/core/button/Button"
import {dateFormatter, truncateAddress} from "@/utils/helpers"
import {BiTime, BiUser} from "react-icons/bi"
import {useNavigate} from "react-router"
import {useAppSelector} from "@/redux/hooks";
import {accountSelector} from "@/redux/slices/authSlice";
import moment from "moment";
import { useMemo } from "react";
import FinalizeButton from "./FinalizeButton";
import { MdOutlineHowToVote } from "react-icons/md";
import ViewVotes from "../decisions/ViewVotes";

const ProposalItem = ({id, proposal, onUpdate}: any) => {
    const navigate = useNavigate();
    const account = useAppSelector(accountSelector);

    const isWithinDeadline = useMemo(() => {
        const lastDate = moment(proposal.deadline)
        return moment().isBefore(lastDate)
    }, [proposal])

    return <div
        className="flex shadow-sm items-center justify-between border rounded-lg py-5 px-8 hover:shadow cursor-pointer">
        <div className="flex-1">
            <div className="font-semibold mb-1">{proposal.title}</div>
            <div className="flex items-center">
                <BiUser size={18} className="mr-2"/>
                <span className="mr-3">By:</span> {account === proposal.author ? 'You' :
                <span className="text-semibold">{truncateAddress(proposal.author)}</span>}
            </div>
        </div>
        <div className="flex items-center">
            {
                isWithinDeadline ? 
                    <>
                        <div className="flex items-center">
                            <BiTime size={18} className="text-rose-500 mr-2"/>
                            <div className="flex flex-col mr-12">
                                <span className="mr-3 text-xs uppercase font-semibold text-rose-600">Vote until</span>
                                <span className="text-semibold">{dateFormatter(proposal.deadline)}</span>
                            </div>
                        </div>
                        <Button
                            label={
                                <div className="flex items-center">
                                    <MdOutlineHowToVote className="mr-2"/>
                                    Vote
                                </div>
                            }
                            size="md"
                            onClick={() => navigate(`/proposals/${id}`)}
                            width="w-24"
                            bgColor="bg-emerald-700 hover:bg-emerald-600"
                        />
                    </> 
                : 
                    <div>
                        {
                            account === proposal.author 
                            ? <div className="flex space-x-2">
                                <ViewVotes id={id} />
                                <FinalizeButton proposalId={id} onUpdate={onUpdate} />
                            </div> 
                            : <span className="text-sm text-rose-600 font-medium">Please wait for this decision to be finalized!</span>
                        }
                    </div>
            }
        </div>
    </div>
}

export default ProposalItem