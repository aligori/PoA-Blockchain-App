import { PropsWithChildren } from 'react';
import Header from "@/hoc/layouts/Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-100 p-5">
        {children}
      </div>
    </div>
  );
};

export default Layout;
