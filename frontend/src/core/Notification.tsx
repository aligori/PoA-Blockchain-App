import { useMemo } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { BiInfoCircle } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const NotificationToast = ({ title, body, t, onClick }: { title: string, body: string, t: Toast, onClick: () => void }) => {
  const onClose = (e) => {
    e.stopPropagation();
    toast.dismiss(t.id);
  }

  const style = useMemo(() => (t.visible ? 'right-0' : '-right-full'), [t.visible]);

  const redirect = (e) => {
    onClick();
    onClose(e);
  }

  return (
    <div
      className={`flex justify-between bg-white rounded-lg shadow-even border border-gray-200 p-4 min-w-72 hover:shadow-sm
          transform-gpu translate-y-0 hover:translate-y-1 relative transition-all duration-500 ease-in-out cursor-pointer 
          ${style}`}
      onClick={redirect}>
      <div className="flex justify-start items-center mr-10">
        <BiInfoCircle className="text-primary-500 animate-bounce" size={24} />
        <div className="flex flex-col ml-3">
          <span className="text-base leading-5 font-medium text-gray-900">{title}</span>
          <span className="text-gray-400 leading-4 font-normal mt-1">{body}</span>
        </div>
      </div>
      <div>
        <MdClose
          className="text-gray-400 hover:cursor-pointer hover:text-gray-600 hover:scale-110"
          width={17}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default NotificationToast;
