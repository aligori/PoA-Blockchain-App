import {PropsWithChildren} from "react";

export interface ModalProps extends PropsWithChildren {
    id: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    icon?: JSX.Element;
    iconBg?: string;
    otherButtons?: JSX.Element[];
    width?: string;
}