import Sidebar from "../SideBar/SideBar";

import "./WorkerSerface.css";
import { Outlet } from "react-router-dom";

const WorkerSerface = () => {
  const WorkerPageList = [
    {
      id: 1,
      name: "Daily Attendance",
      link: "deailyattendance",
    },
    {
      id: 2,
      name: "All Attendance Details",
      link: "allattendancedetails",
    },
    {
      id: 3,
      name: "All Worker List",
      link: "allworkerlist",
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

export default WorkerSerface;
