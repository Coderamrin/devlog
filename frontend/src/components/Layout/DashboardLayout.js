import React from "react";
import Sidebar from "./Dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="md:pl-60 pl-8 pr-10 mx-auto py-10">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
