import {useEffect, useState} from 'react';
import Input from '@/core/input/Input';
import useValidation from '@/hooks/useValidation';
import TextArea from "@/core/input/TextArea";
import Button from "@/core/button/Button";
import {convertDateToTimestamp, showSuccess} from "@/utils/helpers";
import {useProposalContract} from "@/hooks/useProposalContract";
import DateInput from "@/core/input/DateInput";
import {createProposalSchema} from "@/utils/schemas/CreateProposalSchema";
import DeleteModal from '@/core/modal/DeleteModal';
import {z} from "zod";

interface RevertDecisionProps {
    id: string;
    onRevert: () => void
}

const RevertDecision = ({id, onRevert}: RevertDecisionProps) => {
    const [title, setTitle] = useState('');
    const [reason, setReason] = useState('');
    const [deadline, setDeadline] = useState();
    const [revertModal, setRevertModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {errors, onError, clearError, clearErrors} = useValidation();
    const {createProposal, getOneProposal} = useProposalContract();

    useEffect(() => {
        const getData = async () => {
            if (id.toString() && revertModal) {
                const {data: proposal} = await getOneProposal(+id)
                setTitle(`Revert: ${proposal?.title}`);
            }
        }
        getData();
    }, [id, revertModal])

    const onClose = () => {
        setRevertModal(false);
        clear();
    };

    const clear = () => {
        setTitle('');
        setReason('');
        setDeadline(undefined);
        clearErrors();
    };

    const submit = async () => {
        try {
            createProposalSchema.parse({title, description: reason, deadline});

            setIsLoading(true);

            await createProposal(
                title,
                reason,
                convertDateToTimestamp(deadline),
            );

            showSuccess('Request to revert proposal submitted successfully!');
            onRevert();
            onClose();
        } catch (err) {
            if (err instanceof z.ZodError) {
                onError(err);
            }
            console.log('An error occurred while submitting transaction: ', err)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <Button
                label="Revert"
                size="md"
                onClick={() => setRevertModal(true)}
                width="w-24"
                bgColor="bg-rose-700 hover:bg-rose-600"
            />
            <DeleteModal
                id="revert-modal"
                title="Revert Decision"
                isOpen={revertModal}
                onClose={onClose}
                onRevert={submit}
                isLoading={isLoading}
                width="sm:w-1/2">
                <div className="py-5 space-y-5 font-normal">
                    <div>
                        You are about to revert the following decision. This would require the votes from the other board members.
                        Please provide a new deadline for voting and justify your reason below.
                    </div>
                    <Input
                        id="title"
                        label="Title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => clearError('title', e.target.value, setTitle)}
                        error={errors.title}
                    />
                    <DateInput
                        id="deadline"
                        label="Deadline"
                        value={deadline}
                        onChange={(e) => clearError('deadline', e.target.value, setDeadline)}
                        error={errors.deadline}
                    />
                    <TextArea
                        id="reason"
                        label="Reason"
                        placeholder="Please describe in detail why you propose to revert the following decision"
                        value={reason}
                        onChange={(e) => clearError('description', e.target.value, setReason)}
                        error={errors.description}
                        rows="10"
                    />
                </div>
            </DeleteModal>
        </div>
    );
};

export default RevertDecision;
