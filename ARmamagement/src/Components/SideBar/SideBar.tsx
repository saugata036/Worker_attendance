import { useEffect } from "react";
import "./Sidebar.css";

import { NavLink, Link } from "react-router-dom";

type SidebarPropObject = {
  id: number;
  name: string;
  link: string;
};

type SideBarPropsArray = SidebarPropObject[];

const Sidebar = (props: { props: SideBarPropsArray }) => {
  useEffect(() => {
    if (window.location.pathname.includes("createcustomer")) {
    } else {
    }
  }, []);

  return (
    <div className=" min-w-full flex flex-col bg-white rounded-lg px-3 py-4 text-xl navGap h-full ">
      {props.props.map((item) => {
        return (
          <div key={item.id}>
            <NavLink
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                `w-full wework-hover-animation px-[10px] nav-text-size ${
                  isActive ? "active" : ""
                }`
              }
              to={item.link}
            >
              {item.name}
            </NavLink>
          </div>
        );
      })}
      <Link
        to="/a"
        className=" nav-text-size mt-auto "
        style={{ color: "#2463ebff" }}
      >
        <div className="asset-button">
          <div className=" nav-text-size">
            <p className="home-button font-black">Back To Home</p>
          </div>
        </div>
      </Link>

      <div className="text-[10px]"></div>
    </div>
  );
};

export default Sidebar;
