import { BiPlus } from 'react-icons/bi';
import { useMemo } from 'react';
import Modal from "@/core/modal/Modal";
import Button from "@/core/button/Button";
import {ModalProps} from "@/core/modal/types";

interface AddModalProps extends ModalProps {
    onAdd: () => void;
    isLoading?: boolean;
}

const AddModal = ({
                      id,
                      title,
                      isOpen,
                      children,
                      onClose,
                      onAdd,
                      isLoading,
                      ...props
                  }: AddModalProps) => {
    const buttons = useMemo(() => {
        return [
            <div key="add-button">
                <Button
                    label="Submit"
                    size="md"
                    onClick={onAdd}
                    width="w-32"
                    isLoading={isLoading}
                />
            </div>
        ];
    }, [onAdd, isLoading]);

    return (
        <Modal
            id={id}
            isOpen={isOpen}
            title={title}
            onClose={onClose}
            icon={<BiPlus size={24} className="text-blue-800" />}
            iconBg="bg-blue-100"
            otherButtons={buttons}
            {...props}>
            {children}
        </Modal>
    );
};

export default AddModal;
