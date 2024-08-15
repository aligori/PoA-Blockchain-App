import {Toaster} from 'react-hot-toast';
import AppRoutes from "@/router";
import FullPageLoader from '@/hoc/layouts/FullPageLoader';

function App() {
    return (
        <>
            <Toaster/>
            <FullPageLoader />
            <AppRoutes/>
        </>
    );
}

export default App;
