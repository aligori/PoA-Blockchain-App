import {useCallback, useState} from 'react';
import CreateProposal from "@/components/proposals/CreateProposal";
import ProposalList from "@/components/proposals/ProposalList";
import Layout from "@/hoc/layouts/Layout";
import TabContent, { Tab } from '@/core/tab/TabContent';
import DecisionList from '@/components/decisions/DecisionList';
import { ProposalStatus } from '@/constants';

const MyProposalsPage = () => {
    const [updated, setUpdated] = useState(0);

    const onUpdate = useCallback(() => setUpdated(prev => prev + 1), []);

    const tabs: Tab[] = [
        { 
            title: 'Pending', 
            content: <ProposalList updated={updated} onUpdate={onUpdate} isOwn />
        },
        { 
            title: 'Approved', 
            content: <DecisionList updated={updated} onUpdate={onUpdate} isOwn status={ProposalStatus.Approved} />
        },
        { 
            title: 'Not Approved', 
            content: <DecisionList updated={updated} onUpdate={onUpdate} isOwn status={ProposalStatus.NotApproved} />
        }
    ];

    return <Layout>
        <div className="flex items-center justify-between text-gray-700 font-semibold my-5 text-lg px-3">
            <div>
                My Proposals
                <div className="text-gray-500 font-medium text-sm">
                    Here you can find all the proposals submitted by you.
                </div>
            </div>
            <CreateProposal onAdd={onUpdate}/>
        </div>
        <div className="bg-white pt-8 pb-5 px-12 rounded-xl shadow-even justify-between items-center">
            <TabContent tabs={tabs} />
        </div>
    </Layout>
};

export default MyProposalsPage;
