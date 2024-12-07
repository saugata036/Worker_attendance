import Sidebar from "../SideBar/SideBar";

import "./CustomerSerface.css";
import { Outlet } from "react-router-dom";

const CustomerSerface = () => {
  const WorkerPageList = [
    {
      id: 1,
      name: "Create Customer",
      link: "createcustomer",
    },
    {
      id: 2,
      name: "Customer Update",
      link: "customerupdate",
    },
    {
      id: 3,
      name: "Customer Billing",
      link: "customerbilling",
    },
  ];
  return (
    <div
      className=" grid grid-rows-1 grid-cols-5 gap-x-4 fixed w-screen wwProj h-full  "
      id="wework-projects"
    >
      <div
        id="wwproj-sidebar"
        className="col-span-1  rounded-lg bg-white mt-2 ml-3  componentHeight "
      >
        <Sidebar props={WorkerPageList} />
      </div>
      <div
        id="building-outlet"
        className="col-span-4 bg-white rounded-lg details-Component mt-2 mr-3 componentHeight"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerSerface;
