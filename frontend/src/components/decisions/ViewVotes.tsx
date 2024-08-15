import {useEffect, useState} from 'react';
import Button from "@/core/button/Button";
import { FaVoteYea } from 'react-icons/fa';
import Modal from '@/core/modal/Modal';
import { useProposalContract } from '@/hooks/useProposalContract';
import PieChart from '@/core/chart/PieChart';

const ViewVotes = ({id}: { id: string }) => {
    const [viewModal, setViewModal] = useState(false);
    const [votes, setVotes] = useState({ yesVotes: 0, noVotes: 0 });

    const {getProposalVotes} = useProposalContract();

    const onClose = () => {
        setViewModal(false);
    };

    useEffect(() => {
        const getData = async () => {
            if (id.toString() && viewModal) {
                const data = await getProposalVotes(+id)
                setVotes(data);
            }
        }
        getData();
    }, [id, viewModal])

    return (
        <div className="flex justify-between items-center">
            <Button
                label="Votes"
                size="md"
                onClick={() => setViewModal(true)}
                width="w-24"
                bgColor="bg-primary-600 hover:bg-primary-500"
            />
            <Modal
                id="view"
                isOpen={viewModal}
                title="View votes"
                onClose={onClose}
                icon={<FaVoteYea size={24} className="text-blue-800" />}
                iconBg="bg-blue-100"
                width="w-1/4"
                otherButtons={[]}>
                <div className="py-5 space-y-5 font-normal flex justify-center">
                    {
                        votes.yesVotes === 0 && votes.noVotes === 0 
                        ? <span>There are no votes!</span> 
                        : <PieChart yesVotes={votes.yesVotes} noVotes={votes.noVotes} />
                    }
                </div>
            </Modal>
        </div>
    );
};

export default ViewVotes;
