import { BsExclamation } from 'react-icons/bs';
import { useMemo } from 'react';
import { ModalProps } from './types';
import Button from '../button/Button';
import Modal from './Modal';

interface DeleteModalProps extends ModalProps {
  onRevert: () => void;
  isLoading?: boolean;
}

const DeleteModal = ({
  id,
  title,
  isOpen,
  children,
  onClose,
  onRevert,
  isLoading = false,
  ...props
}: DeleteModalProps) => {

  const buttons = useMemo(() => {
    return [
      <Button
        key="revert"
        label="Revert"
        size="md"
        onClick={onRevert}
        width="w-24"
        isLoading={isLoading}
      />
    ];
  }, [onRevert, isLoading]);

  return (
    <Modal
      id={id}
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      icon={<BsExclamation className="text-red-500" size={32} />}
      iconBg="bg-red-100"
      otherButtons={buttons}
      width="sm:w-1/3"
      {...props}>
      {children}
    </Modal>
  );
};

export default DeleteModal;
