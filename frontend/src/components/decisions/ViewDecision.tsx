import {useState} from 'react';
import Input from '@/core/input/Input';
import TextArea from "@/core/input/TextArea";
import Button from "@/core/button/Button";
import { FaEye } from 'react-icons/fa';
import Modal from '@/core/modal/Modal';
import { statusFormatter } from '@/utils/helpers';

const ViewDecision = ({decision}: any) => {
    const [viewModal, setViewModal] = useState(false);

    const onClose = () => {
        setViewModal(false);
    };

    return (
        <div className="flex justify-between items-center">
            <Button
                label="View"
                size="md"
                onClick={() => setViewModal(true)}
                width="w-24"
                bgColor="bg-primary-600 hover:bg-primary-500"
            />
            <Modal
                id="view"
                isOpen={viewModal}
                title="Decision"
                onClose={onClose}
                icon={<FaEye size={24} className="text-blue-800" />}
                iconBg="bg-blue-100"
                otherButtons={[]}>
                <div className="py-5 space-y-5 font-normal">
                    <Input
                        id="title"
                        label="Title"
                        value={decision.title}
                        disabled
                    />
                    <TextArea
                        id="reason"
                        label="Reason"
                        value={decision.description}
                        disabled
                    />
                    <div>
                        {statusFormatter(decision.status)}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ViewDecision;
