import {RiCloseFill} from 'react-icons/ri';
import {ModalProps} from '@/core/modal/types/ModalProps';

const Modal = ({
                   id,
                   isOpen,
                   onClose,
                   children,
                   title,
                   icon,
                   iconBg = 'bg-blue-50',
                   width = 'sm:w-1/2',
                   otherButtons = [],
               }: ModalProps) => {
    return (
        <div
            id={id}
            className={`fixed inset-0 overflow-y-scroll ${isOpen ? '' : 'hidden'} z-10`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className={`bg-[#0D0D0D] fixed inset-0 modal-background ${isOpen ? 'opacity-50' : 'opacity-0'}`}
                    aria-hidden="true"
                />
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
                <div
                    className={`${isOpen ? 'modal-open' : ''} overflow-hidden inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-even ${width} z-50 sm:my-8`}>
                    <div className="relative bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 z-30">
                        <div className="flex flex-col">
                            <div
                                className="mt-3 flex flex-col items-center sm:flex-row text-center sm:mt-0 sm:text-left md:mr-12">
                                <div
                                    className={`mx-auto flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full ${iconBg} sm:mx-0 sm:h-10 sm:w-10`}>
                                    {icon}
                                </div>
                                <div className="mt-3 flex-1 text-center sm:mt-0 sm:ml-4 sm:text-left md:mr-12">
                                    {title && (
                                        <div className="text-xl leading-6 font-medium text-gray-900">{title}</div>
                                    )}
                                </div>
                            </div>
                            {isOpen && <div className="my-2 justify-center mx-5">{children}</div>}
                        </div>
                        <div
                            className="absolute right-5 top-5 hover:bg-gray-100 p-1 rounded-full"
                            onClick={onClose}>
                            <RiCloseFill size={20} className="text-gray-400 cursor-pointer"/>
                        </div>
                    </div>
                    {otherButtons?.length > 0 && (
                        <div className="bg-white px-10 pb-6 sm:px-15 flex justify-end">
                            {otherButtons?.map((button, index) => (
                                <div key={index} className="first:ml-0 ml-2">
                                    {button}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
