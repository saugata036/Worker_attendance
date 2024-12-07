import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPageSerface from "../LoginPage/LoginPageSerface";
import SignUp from "../LoginPage/SignUp";
import LandingPage from "../LandingPage/LandingPage";
import CustomerSerface from "../CustomerSerface/CustomerSerface";

import CreateCustomer from "../CustomerCreation/CreateCustomer";
import CustomerUpdate from "../CustomerCreation/CustomerUpdate";
import CustomerBilling from "../CustomerCreation/CustomerBilling";
import WorkerSerface from "../Worker_serface/WorkerSerface";
import DeailyAttendance from "../Worker_details/DeailyAttendance";
import WorkerList from "../Worker_details/WorkerList";
import AllAttendance from "../Worker_details/AllAttendance";

const Router = () => {
  const [customerList, setCustomerList] = useState<
    { id: string; NAME: string }[]
  >([]);
  const [AllCustomer, setAllcustomer] = useState<any[]>([]);
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<LoginPageSerface />} />
      <Route path="/a" element={<LandingPage />} />
      <Route path="/customerserface" element={<CustomerSerface />}>
        <Route
          path="createcustomer"
          element={
            <CreateCustomer
              setCustomerList={setCustomerList}
              setAllcustomer={setAllcustomer}
            />
          }
        />
        <Route
          path="customerupdate"
          element={
            <CustomerUpdate
              customerList={customerList}
              //@ts-ignore
              AllCustomer={AllCustomer}
            />
          }
        />
        <Route path="customerbilling" element={<CustomerBilling />} />
      </Route>
      <Route path="/workerserface" element={<WorkerSerface />}>
        <Route path="deailyattendance" element={<DeailyAttendance />} />
        <Route path="allworkerlist" element={<WorkerList />} />
        <Route path="allattendancedetails" element={<AllAttendance />} />
      </Route>
    </Routes>
  );
};

export default Router;
