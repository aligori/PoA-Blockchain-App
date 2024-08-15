import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {accountSelector} from "@/redux/slices/authSlice";
import {showNotification, truncateAddress} from "@/utils/helpers";
import ProposalList from "@/components/proposals/ProposalList";
import Layout from "@/hoc/layouts/Layout";
import TabContent, { Tab } from "@/core/tab/TabContent";
import DecisionList from "@/components/decisions/DecisionList";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useProposalContract } from "@/hooks/useProposalContract";
import moment from "moment";
import { ProposalStatus } from "@/constants";

const HomePage = () => {
    const account = useAppSelector(accountSelector);

    const [updated, setUpdated] = useState(0);
    const navigate = useNavigate();

    const onUpdate = useCallback(() => setUpdated(prev => prev + 1), []);

    const onClick = useCallback(() => {
        navigate('/my-proposals')
    }, [])

    const {getAllProposals} = useProposalContract();
    const [awaitingFinalization, setAwaitingFinalization] = useState([]);

    useEffect(() => {
        const getData = async () => {
            if (account) {
                // Get all proposal data and filter based on deadline
                let {data} = await getAllProposals();
                data = data.filter((proposal) => {
                    const isWithinDeadline = moment().isBefore(moment(proposal.deadline))

                    return proposal.status === ProposalStatus.Pending && proposal.author === account && !isWithinDeadline
                })
                setAwaitingFinalization(data);
            }
        }
        void getData();
    }, [getAllProposals, updated, account])

    useEffect(() => {
        if (awaitingFinalization.length > 0) {
            showNotification(
                'pending-notification', 
                'You have pending proposals ready to be finalized!',
                'Click to view your proposals', 
                onClick
            )
        }
    }, [onClick, awaitingFinalization])

    const tabs: Tab[] = [
        { 
            title: 'New Proposals', 
            content: <div className="px-8">
                <div className="text-lg text-gray-900 font-semibold mb-2">What's new?</div>
                <div className="text-gray-500 font-medium">
                    Here you can find active proposals awaiting your votes
                </div>
                <ProposalList updated={updated} onUpdate={onUpdate} />
            </div> 
        },
        { 
            title: 'Decisions', 
            content: <div className="px-8">
                <div className="text-lg text-gray-900 font-semibold mb-2">Decisions</div>
                <div className="text-gray-500 font-medium">
                    Here you can find all the decisions that are made.
                </div>
                <DecisionList />
            </div> 
        }
    ];

    return <Layout>
        <div className="flex items-center justify-between text-gray-700 font-semibold my-5 text-lg px-3">
            <div>
                Welcome back, <span className="text-orange-500">{account && truncateAddress(account)}</span>
            </div>
        </div>
        <div className="bg-white py-5 px-5 rounded-xl shadow-even justify-between items-center">
            <TabContent tabs={tabs} />
        </div>
    </Layout>
};

export default HomePage;
