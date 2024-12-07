import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type RowData = {
  NAME: string;
  EMAIL: string;
  PHONE_NUMBER: number;
  STATUS: string;
  CITY: string;
  ASSIGNED_CLIENT_ID: number;
};

const WorkerList = () => {
  const [rows, setRows] = useState<RowData[]>([]);

  const featchWorkerData = async () => {
    try {
      const response = await axios.get(
        "https://attendance-management-backend-249196266216.us-central1.run.app/workers"
      );
      console.log("Saugata", response.data);
      const listOfAllWorker = response.data.map((workers: any, index: any) => ({
        id: index,
        NAME: workers.NAME.VALUE,
        EMAIL: workers.EMAIL.VALUE,
        PHONE_NUMBER: workers.PHONE_NUMBER.VALUE,
        STATUS: workers.STATUS.VALUE,
        CITY: workers.CITY.VALUE,
        ASSIGNED_CLIENT_ID: workers.ASSIGNED_CLIENT_ID.VALUE,
      }));
      setRows(listOfAllWorker);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    featchWorkerData();
  }, []);
  const columns: GridColDef[] = [
    {
      field: "NAME",
      headerName: "Worker Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "EMAIL",
      headerName: "Worker Email",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "PHONE_NUMBER",
      headerName: "Worker Phone No.",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "CITY",
      headerName: "City",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ASSIGNED_CLIENT_ID",
      headerName: "Assigned Client Id",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "STATUS",
      headerName: "Status",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center outletOverflow p-8 w-full gap-y-3 pt-2">
      <div className="bg-white w-full flex flex-col items-center justify-center">
        <Typography variant="h4" gutterBottom>
          All The Worker List
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

export default WorkerList;
