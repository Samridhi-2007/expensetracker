import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        {/* Desktop SideMenu
        <div className="hidden lg:block">
          <SideMenu activeMenu={activeMenu} />
        </div> */}

        {/* Page Content */}
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
