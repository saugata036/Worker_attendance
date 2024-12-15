import { Link } from "react-router-dom";
import { AspectRatio, Card, CardContent, Typography } from "@mui/joy";
import "./LandingPage.css";
import employee from '../../assets/employee.png';
import customer from '../../assets/customer.jpeg'
const LandingPage = () => {
  return (
    <div className="flex flex-col w-screen mainHead landHeight  items-center fixed px-5 overflow-y-scroll ">
      <div className="  flex flex-col flex-wrap mainHeading justify-center items-center ">
        <div className="LandHeading">Employee Record Management System</div>
        <div className="LandSubHeading">
          Welcome, Now you are part of our system , Here you can find all our
          service
        </div>
      </div>
      <div className=" cards">
        {/* Service 1 */}
        <Link
          to="/workerserface/deailyattendance"
          style={{
            textDecoration: "none",
          }}
        >
          <Card sx={{ width: 320, height: 280 }}>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img src={employee} loading="lazy" alt="" />
            </AspectRatio>
            <div>
              <Typography level="title-lg">
                Employee Daily Attendance
              </Typography>
            </div>
            <CardContent>
              <Typography level="body-sm">
                Find out the daily employee attendance status
              </Typography>
            </CardContent>
          </Card>
        </Link>

        {/* service 2 */}

        {/* <Link
          // to="/a/analytics"
          to={"/a"}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <Card sx={{ width: 320, height: 280 }}>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img src={""} loading="lazy" alt="" />
            </AspectRatio>
            <div>
              <Typography level="title-lg">
                Active & Inactive Employee
              </Typography>
            </div>
            <CardContent>
              <Typography level="body-sm">
                help you to identify active and inactive employee
              </Typography>
            </CardContent>
          </Card>
        </Link> */}

        {/* service 3 */}

        <Link
          to="/customerserface/createcustomer"
          style={{
            textDecoration: "none",
          }}
        >
          <Card sx={{ width: 320, height: 280 }}>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img src={customer} loading="lazy" alt="" />
            </AspectRatio>
            <div>
              <Typography level="title-lg">Customer</Typography>
            </div>
            <CardContent>
              <Typography level="body-sm">
                Visible all of our customer list
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
