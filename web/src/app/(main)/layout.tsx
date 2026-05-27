import React from "react";
import Sidebar from "@/components/sidebar";
import InfoBar from "@/components/infobar";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <div className="min-h-screen bg-background text-on-surface overflow-x-hidden font-body-md">
      <Sidebar />
      <main className="ml-64 min-h-screen relative">
        <InfoBar />
        <div className="pt-16 min-h-screen relative">
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
