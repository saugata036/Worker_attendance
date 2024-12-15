import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Button } from "@mui/material";

type RowData = {
  Worker_ID: string;
  Worker_Name: string;
  Worker_Email: string;
  STATUS: string;
  DISABLED: boolean;
};

const DailyAttendance = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const fetchAttendanceData = async (DATE: string) => {
    try {
      setLoading(true);
      const localData = localStorage.getItem(`attendance_${DATE}`);
      const isSubmitted = localStorage.getItem(`attendance_submitted_${DATE}`);
      if (localData) {
        setRows(JSON.parse(localData));
        setSubmitDisabled(isSubmitted === "true");
        return;
      }
      const response = await axios.get(
        "https://attendance-management-backend-249196266216.us-central1.run.app/workers/attendance",
        {
          params: { DATE },
        }
      );

      const workerList = response.data.WORKER_DATA.WORKER_LIST.map(
        (worker: any) => ({
          Worker_ID: worker.WORKER_ID,
          Worker_Name: worker.WORKER_NAME.VALUE,
          Worker_Email: worker.WORKER_EMAIL.VALUE,
          PHONE: worker.PHONE,
          STATUS: worker.STATUS || "",
          DISABLED: false,
        })
      );

      setRows(workerList);

      localStorage.setItem(`attendance_${DATE}`, JSON.stringify(workerList));
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (workerId: string, status: string) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.Worker_ID === workerId
          ? { ...row, STATUS: status, DISABLED: true }
          : row
      );
      localStorage.setItem(
        `attendance_${currentDate}`,
        JSON.stringify(updatedRows)
      );
      return updatedRows;
    });
  };

  // const handleSubmit = async () => {
  //   try {
  //     const workerList = rows.map((row) => ({
  //       Worker_ID: row.Worker_ID,
  //       STATUS: row.STATUS,
  //     }));

  //     const payload = {
  //       DATE: currentDate,
  //       WORKER_LIST: workerList,
  //     };

  //     await axios.post(
  //       "https://attendance-management-backend-249196266216.us-central1.run.app/workers/attendance",
  //       payload
  //     );

  //     alert("Attendance data submitted successfully!");
  //     setSubmitDisabled(true);
  //     localStorage.setItem(`attendance_submitted_${currentDate}`, "true");
  //     const updatedRows = rows.map((row) => ({ ...row, DISABLED: true }));
  //     setRows(updatedRows);
  //     localStorage.setItem(
  //       `attendance_${currentDate}`,
  //       JSON.stringify(updatedRows)
  //     );
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     alert("Failed to submit data. Please try again.");
  //   }
  // };
  const handleSubmit = async () => {
    try {
      const workerList = rows.map((row) => ({
        Worker_ID: row.Worker_ID,
        STATUS: row.STATUS,
      }));

      const payload = {
        DATE: currentDate,
        WORKER_LIST: workerList,
      };

      await axios.post(
        "https://attendance-management-backend-249196266216.us-central1.run.app/workers/attendance",
        payload
      );

      
      Object.keys(localStorage).forEach((key) => {
        if (
          key.startsWith("attendance_") &&
          key !== `attendance_${currentDate}` &&
          key !== `attendance_submitted_${currentDate}`
        ) {
          localStorage.removeItem(key);
        }
      });

      alert("Attendance data submitted successfully!");
      setSubmitDisabled(true);
      localStorage.setItem(`attendance_submitted_${currentDate}`, "true");
      const updatedRows = rows.map((row) => ({ ...row, DISABLED: true }));
      setRows(updatedRows);
      localStorage.setItem(
        `attendance_${currentDate}`,
        JSON.stringify(updatedRows)
      );
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  useEffect(() => {
    fetchAttendanceData(currentDate);
  }, []);

  const columns: GridColDef[] = [
    {
      field: "Worker_Name",
      headerName: "Worker Name",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Worker_Email",
      headerName: "Worker Email",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "PHONE",
      headerName: "Worker Phone No.",
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
    {
      field: "A",
      headerName: "",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridCellParams<any>) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateStatus(params.row.Worker_ID, "PRESENT")}
          disabled={params.row.DISABLED || isSubmitDisabled}
        >
          PRESENT
        </Button>
      ),
    },
    {
      field: "B",
      headerName: "",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridCellParams<any>) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => updateStatus(params.row.Worker_ID, "ABSENT")}
          disabled={params.row.DISABLED || isSubmitDisabled}
        >
          ABSENT
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center outletOverflow p-8 w-full gap-y-3 pt-2">
      <div className="bg-white w-full flex flex-col items-center justify-center">
        <Typography variant="h4" gutterBottom>
          Daily Attendance Maintenance Sheet
        </Typography>
        <Typography variant="h6" gutterBottom>
          Date: {currentDate}
        </Typography>

        <div className="mt-3">
          <div style={{ height: 500, width: "calc(100vw - 600px)" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.Worker_ID}
              hideFooter
              rowHeight={50}
              loading={loading}
            />
          </div>
          <div className="w-full mt-4 flex justify-end">
            <Button
              variant="contained"
              style={{
                height: "50px",
                cursor: "pointer",
                width: "14rem",
              }}
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAttendance;
