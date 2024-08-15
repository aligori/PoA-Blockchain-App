import { useSelector } from 'react-redux';
import { loaderSelector } from '@/redux/slices/loaderSlice';
import { FaEthereum } from 'react-icons/fa';

const FullPageSpinner = () => {
  const showLoader = useSelector(loaderSelector);

  if (!showLoader) {
    return null;
  }

  return (
    <div className="w-full h-full fixed flex justify-center items-center top-0 left-0 bg-black bg-opacity-50 z-50">
      <span className="text-white flex flex-col items-center relative text-center">
        <div className="animate-bounce">
          <FaEthereum size={44} className="text-white mr-2 animate-pulse transition duration-300 mb-2" /> 
        </div>
        Please wait! <br/>
        Transaction is being processed ...
      </span>
    </div>
  );
};

export default FullPageSpinner;
