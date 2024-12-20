
import { useEffect, useState } from "react";
import AttendanceLogo_2 from "../../assets/AttendanceLogo_2.png";
import { Link,  useNavigate } from "react-router-dom";

const NavBar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
    const lastNameInitial = nameParts[1]?.charAt(0).toUpperCase() || "";
    return firstNameInitial + lastNameInitial;
  };

  const handleLogout = () => {
    localStorage.removeItem("username"); 
    setUsername(null); 
    navigate("/signin"); 
  };

  return (
    <div
      id="Main_Navbar"
      className="main_navbar flex flex-row w-screen h-[60px] justify-between fixed p-2"
    >
      <div className="wework_logo flex flex-row flex-shrink-0">
        <Link
          to={`${
            window.location.pathname.includes("/ext/")
              ? `${window.location.pathname}`
              : "/a"
          }`}
        >
          <img
            src={AttendanceLogo_2}
            className="max-w-full max-h-full"
            alt="Logo"
          />
        </Link>
        <table className="flex-col ml-1 items-center reSubHeading">
          <tbody>
            <tr className="font-extrabold h-full">
              <p className="mt-[15px]">| Attendance Record Management</p>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex-shrink-0 flex flex-row gap-x-3 justify-center items-center ml-5 mr-10">
        <div
          className="rounded-full w-[40px] h-[40px] flex items-center justify-center border border-solid border-black"
          style={{
            backgroundColor: "#00FF00",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {username ? getInitials(username) : "U"}
        </div>
        {username ? (
          <>
            <p className="username">{username}</p>
            <button
              className="logout-button bg-red-500 text-white px-3 py-1 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default NavBar;

