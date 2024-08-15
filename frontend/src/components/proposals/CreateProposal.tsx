import AddModal from '@/core/modal/AddModal';
import {useState} from 'react';
import Input from '@/core/input/Input';
import useValidation from '@/hooks/useValidation';
import TextArea from "@/core/input/TextArea";
import Button from "@/core/button/Button";
import {convertDateToTimestamp} from "@/utils/helpers";
import {useProposalContract} from "@/hooks/useProposalContract";
import DateInput from "@/core/input/DateInput";
import {createProposalSchema} from "@/utils/schemas/CreateProposalSchema";
import {z} from "zod";

interface AddProposalProps {
    onAdd: () => void
}

const CreateProposal = ({onAdd}: AddProposalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState();
    const [addModal, setAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {errors, onError, clearError, clearErrors} = useValidation();
    const {createProposal} = useProposalContract();

    const onClose = () => {
        setAddModal(false);
        clear();
    };

    const clear = () => {
        setTitle('');
        setDescription('');
        setDeadline(undefined);
        clearErrors();
    };

    const submit = async () => {
        try {
            createProposalSchema.parse({title, description, deadline});

            setIsLoading(true);

            await createProposal(
                title,
                description,
                convertDateToTimestamp(deadline),
            );

            onAdd();
            onClose();
        } catch (err) {
            if (err instanceof z.ZodError) {
                onError(err);
            }
            console.log('An error occurred', err)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <Button
                label="Create Proposal"
                size="md"
                onClick={() => setAddModal(true)}
                width="w-36"
            />
            <AddModal
                id="add-modal"
                title="Create New Proposal"
                isOpen={addModal}
                onClose={onClose}
                onAdd={submit}
                isLoading={isLoading}
                width="sm:w-1/2">
                <div className="py-5 space-y-5 font-normal">
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
                        id="description"
                        label="Description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => clearError('description', e.target.value, setDescription)}
                        error={errors.description}
                        rows="15"
                    />
                </div>
            </AddModal>
        </div>
    );
};

export default CreateProposal;
