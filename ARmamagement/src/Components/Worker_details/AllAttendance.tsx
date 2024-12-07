import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

interface Worker {
  Comments?: string;
  STATUS?: string;
  Worker_Email: string;
  Worker_ID: string;
  Worker_Name: string;
  Worker_Phone?: string;
}

interface AttendanceDetails {
  DATE: string;
  CLIENT_ID?: string;
  SIGNED_BY?: string;
  PRESENT: number;
  ABSENT: number;
  WORKER_LIST: Worker[];
}

interface AttendanceResponse {
  [key: string]: AttendanceDetails;
}

const AllAttendance = () => {
  const [rows, setRows] = useState<
    Array<{
      id: number;
      DATE: string;
      CLIENT_ID: string;
      PRESENT: number;
      ABSENT: number;
      SIGNED_BY: string;
    }>
  >([]);

  const fetchAllAttendanceDetails = async () => {
    try {
      const response = await axios.get<AttendanceResponse>(
        "https://attendance-management-backend-249196266216.us-central1.run.app/workers/all"
      );
      console.log("details", response.data);

      const data = response.data;
      const dateWiseAttendanceDetails = Object.keys(data).map((key, index) => ({
        id: index,
        DATE: key,
        CLIENT_ID: data[key]?.CLIENT_ID || "N/A",
        PRESENT: data[key].PRESENT,
        ABSENT: data[key].ABSENT,
        SIGNED_BY: data[key]?.SIGNED_BY || "N/A",
      }));

      setRows(dateWiseAttendanceDetails);
    } catch (error) {
      console.error("Error fetching attendance details:", error);
    }
  };

  useEffect(() => {
    fetchAllAttendanceDetails();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "DATE",
      headerName: "Date",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "CLIENT_ID",
      headerName: "Client Id",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "PRESENT",
      headerName: "Present Workers",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ABSENT",
      headerName: "Absent Workers",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "SIGNED_BY",
      headerName: "Signed By",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center outletOverflow p-8 w-full gap-y-3 pt-2">
      <div className="bg-white w-full flex flex-col items-center justify-center">
        <Typography variant="h4" gutterBottom>
          All Attendance Details
        </Typography>
        <div className="mt-4">
          <div style={{ height: 500, width: "calc(100vw - 600px)" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooter
              rowHeight={50}
              slots={{ toolbar: GridToolbar }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAttendance;
