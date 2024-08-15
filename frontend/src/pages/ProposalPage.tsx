import Button from "@/core/button/Button";
import Layout from "@/hoc/layouts/Layout";
import {useProposalContract} from "@/hooks/useProposalContract";
import {dateFormatter, showError, showSuccess} from "@/utils/helpers";
import {useEffect, useState} from "react";
import {BiTime} from "react-icons/bi";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import {useParams} from "react-router";
import {Vote} from "@/constants";
import success from "@/assets/animations/success.json";
import Lottie from "@/core/Lottie";
import { useAppDispatch } from "@/redux/hooks";
import { hideLoader, showLoader } from "@/redux/slices/loaderSlice";

const ProposalPage = () => {
    const {getOneProposal, checkVote, castVote} = useProposalContract();
    const {id} = useParams();
    const dispatch = useAppDispatch();

    const [proposal, setProposal] = useState();
    const [hasVoted, setHasVoted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [updated, setUpdated] = useState(0);

    useEffect(() => {
        const getData = async () => {
            if (id) {
                const {data: proposal} = await getOneProposal(+id)
                setProposal(proposal);

                const {data: hasVoted} = await checkVote(+id)
                setHasVoted(hasVoted);

                setIsLoading(false);
            }
        }
        getData();
    }, [id, checkVote, updated]);

    const vote = async (option: number) => {
        try {
            dispatch(showLoader())
            await castVote(+id, option);
            showSuccess('You submitted your vote!')
            setUpdated(prev => prev + 1);
        } catch (err) {
            showError('Vote not submitted! ', err.message ?? '')
            console.log('An error occurred', err)
        } finally {
            dispatch(hideLoader());
        }
    };

    if (isLoading) {
        return <Layout>
            <div className="bg-white py-5 px-5 rounded-xl shadow-even justify-between items-center mx-20 my-10">
                Loading ...
            </div>
        </Layout>
    }


    return <Layout>
        <div className="bg-white py-5 px-5 rounded-xl shadow-even justify-between items-center mx-20 my-10">
            <div className="flex items-center justify-between">
                <div className="text-lg text-gray-900 font-semibold mb-2">
                    {proposal?.title}
                </div>
                {
                    !hasVoted && (
                        <div className="flex items-center">
                            <BiTime size={18} className="text-rose-500 mr-2"/>
                            <div className="flex flex-col">
                                <span className="mr-3 text-sm uppercase font-semibold text-rose-600">Vote until</span>
                                <span
                                    className="font-semibold">{proposal ? dateFormatter(proposal?.deadline) : ''}</span>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="text-gray-500 font-medium">
                {proposal?.description}
            </div>
            {
                hasVoted ?
                    <div className="flex flex-col items-center justify-center my-8 space-y-3 text-center text-lg">
                        <Lottie itemKey="default" animationData={success} width={120} loop/>
                        <div>
                            <span className="font-medium text-emerald-500">
                                You have already voted for this proposal.
                            </span>
                            <br/>
                            Please wait for the final decision announcement on <b
                            className="font-medium">{proposal ? dateFormatter(proposal?.deadline) : ''}</b>!
                        </div>
                    </div>
                    :
                    <div className="my-5 space-y-3">
                        <div className="flex items-center justify-center">
                            Do you approve this proposal?
                            Lock your vote.
                        </div>
                        <div className="flex items-center justify-center space-x-3">
                            <Button
                                label={
                                    <div className="flex items-center">
                                        <FaThumbsUp className="mr-2"/>
                                        YES
                                    </div>
                                }
                                size="lg"
                                bgColor="bg-emerald-500"
                                onClick={() => vote(Vote.Yes)}
                                width="w-36"
                            />
                            <Button
                                label={
                                    <div className="flex items-center">
                                        <FaThumbsDown className="mr-2"/>
                                        NO
                                    </div>
                                }
                                size="lg"
                                bgColor="bg-rose-500"
                                onClick={() => vote(Vote.No)}
                                width="w-36"
                            />
                        </div>
                    </div>
            }
        </div>
    </Layout>
};

export default ProposalPage;
