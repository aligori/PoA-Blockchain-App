import toast from 'react-hot-toast';
import {HiCheckCircle, HiXCircle} from 'react-icons/hi';
import moment from "moment";
import Badge from '@/core/badge/Badge';
import NotificationToast from '@/core/Notification';

export const showSuccess = (message = 'Success', timeout = 2000) => {
    toast(message, {
        iconTheme: undefined,
        id: 'success-toast',
        position: 'top-center',
        icon: <HiCheckCircle className="text-emerald-500" size={22}/>,
        className: 'text-xs sm:text-sm leading-5 font-medium text-green-600 lg:max-w-md 2xl:max-w-lg',
        duration: timeout
    });
};

export const showError = (error: string, timeout = 2000) => {
    toast(error, {
        id: 'error-toast',
        position: 'top-center',
        icon: <HiXCircle className="text-red-500" size={22}/>,
        className: 'text-xs sm:text-sm leading-5 font-medium text-red-600 lg:max-w-md 2xl:max-w-lg',
        duration: timeout
    });
};

// Function that truncates ethereum address for display purposes
export const truncateAddress = (address: string) => {
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
}

// Function that converts date to unix timestamp
export const convertDateToTimestamp = (date: string) => {
    return Math.floor((new Date(date)).getTime() / 1000);
}

export const getFutureDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
}

export const dateFormatter = (date: string) => moment.utc(date).local().format('MM/DD/YYYY');

// Proposal status formatter
export const statusFormatter = (status: number) => {
    switch(status) {
        case 1:
            return <Badge text="Not Approved" bgColor='bg-red-500' />
        case 2:
            return <Badge text="Approved" />
        default:
            return <Badge text="Pending" bgColor='bg-gray-400' />
    }
}

// Function that shows toast notification
export const showNotification = (
    id: string,
    title: string,
    body: string,
    onClick: () => void,
    timeout = 7000
  ) => {
    toast.custom(
      (t) => (
        <NotificationToast
          title={title}
          body={body}
          t={t}
          onClick={onClick}
        />
      ),
      {
        id: `${id}-notification`,
        position: 'bottom-right',
        duration: timeout
      }
    );
  };