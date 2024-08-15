import { PropsWithChildren } from 'react';
import Header from './Header';

const GuestLayout = ({ children }: PropsWithChildren) => (
  <div className="h-screen">
    <Header />
    <div className="h-full flex flex-1 flex-col items-center bg-gradient-to-l from-blue-100 via gray-50 to-orange-50">
      {children}
    </div>
  </div>
);

export default GuestLayout;
