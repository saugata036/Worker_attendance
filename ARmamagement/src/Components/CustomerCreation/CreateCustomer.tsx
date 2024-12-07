import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Grid from "@mui/joy/Grid";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Field = {
  key: string;
  label: string;
  value: string | null;
};

type FormData = Record<
  string,
  {
    DESCRIPTION: string;
    VALUE: string | null;
  }
>;
type CreateCustomerProps = {
  setCustomerList: React.Dispatch<
    React.SetStateAction<{ id: string; NAME: string }[]>
  >;
  setAllcustomer: React.Dispatch<
    React.SetStateAction<{ DESCRIPTION: string; VALUE: string }[]>
  >;
};

const CreateCustomer: React.FC<CreateCustomerProps> = ({
  setCustomerList,
  setAllcustomer,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [fields, setFields] = useState<Field[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [row, setRow] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchFieldValues = async () => {
    try {
      const response = await axios.get(
        "https://attendance-management-backend-249196266216.us-central1.run.app/clients/"
      );

      const customerData = response.data[0]?.DATA?.CUSTOMER_DATA || {};

      const data: Field[] = Object.entries(customerData).map(
        ([key, value]: [string, any]) => ({
          key,
          label: value.DESCRIPTION,
          value: value.VALUE || "",
        })
      );

      setFields(data);

      const initialData: FormData = data.reduce((acc: FormData, field) => {
        acc[field.key] = {
          DESCRIPTION: field.label,
          VALUE: field.value || "",
        };
        return acc;
      }, {});

      setFormData(initialData);
    } catch (error) {
      console.error("Error fetching fields:", error);
      setErrorMessage("Failed to load field data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFieldValues();
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (key: string, value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], VALUE: value },
    }));
  };

  const handleSave = async () => {
    const requiredFields = ["NAME", "EMAIL", "MOBILE"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field]?.VALUE || formData[field]?.VALUE.trim() === ""
    );

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill in all mandatory fields: ${missingFields.join(", ")}`
      );
      return;
    }

    const payload = {
      CUSTOMER_DATA: {
        CREATED_ON: dayjs().format("YYYY-MM-DD HH:mm:ss [IST+0530]"),
        CUSTOMER_DATA: formData,
      },
    };

    try {
      const response = await axios.post(
        "https://attendance-management-backend-249196266216.us-central1.run.app/clients/save",
        payload
      );

      if (response.data?.MESSAGE === "CUSTOMER DATA SAVED SUCCESSFULLY.") {
        alert("Customer data saved successfully!");
        console.log("Hello Saugata Response save:", response.data);
      } else {
        alert("Unexpected response: " + response.data?.MESSAGE);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        setErrorMessage(
          `Error: ${error.response.status} - ${
            error.response.data?.MESSAGE || error.response.data
          }`
        );
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setErrorMessage("Failed to save data. No response from the server.");
      } else {
        console.error("Error setting up request:", error.message);
        setErrorMessage(`Error: ${error.message}`);
      }
    }
  };

  const AllCustomerList = async () => {
    try {
      const response = await axios.get(
        "https://attendance-management-backend-249196266216.us-central1.run.app/clients/all"
      );
      const AllCustomer = response.data.CUSTOMER_DATA;
      setAllcustomer(AllCustomer);
      console.log("all customer data", AllCustomer);
      const CustomerList: any = Object.entries(AllCustomer).map(
        ([key, value]: [string, any]) => {
          const cleanedDate = value.CREATED_ON.replace(" IST", "");
          return {
            id: value._id,
            key: key,
            CREATED_ON: dayjs(cleanedDate).format("DD/MM/YYYY"),
            NAME: value.CUSTOMER_DATA.NAME?.VALUE || "N/A",
            EMAIL: value.CUSTOMER_DATA.EMAIL?.VALUE || "N/A",
            MOBILE: value.CUSTOMER_DATA.MOBILE?.VALUE || "N/A",
            WEBSITE: value.CUSTOMER_DATA.WEBSITE?.VALUE || "N/A",
          };
        }
      );
      console.log("saugata_customer", CustomerList);

      setRow(CustomerList);
      setOriginalRows(CustomerList);
      setCustomerList(CustomerList);
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };
  useEffect(() => {
    AllCustomerList();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);

    if (!query) {
      setRow(originalRows);
      return;
    }

    const filteredData = originalRows.filter((item: any) =>
      ["NAME", "EMAIL", "MOBILE", "WEBSITE"].some((field) =>
        item[field]?.toLowerCase().includes(query)
      )
    );

    setRow(filteredData);
  };

  const columns: GridColDef[] = [
    {
      field: "CREATED_ON",
      headerName: "Creation Date",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "NAME",
      headerName: "Client Name",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "EMAIL",
      headerName: "Client Name",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "MOBILE",
      headerName: "Client Phone NO.",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "WEBSITE",
      headerName: "Client Website.",
      width: 350,
      align: "center",
      headerAlign: "center",
    },
  ];

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flex: 1, width: "100%" }}>
        <Box
          sx={{
            position: "sticky",
            top: { sm: -100, md: -110 },
            bgcolor: "background.body",
            zIndex: 9995,
          }}
        >
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
              Customer Form
            </Typography>
          </Box>
          <Tabs
            value={activeTab}
            //@ts-ignore
            onChange={handleTabChange}
            sx={{ bgcolor: "transparent" }}
          >
            <TabList
              tabFlex={1}
              size="sm"
              sx={{
                pl: { xs: 0, md: 4 },
                justifyContent: "left",
                [`&& .${tabClasses.root}`]: {
                  fontWeight: "600",
                  flex: "initial",
                  color: "text.tertiary",
                  [`&.${tabClasses.selected}`]: {
                    bgcolor: "transparent",
                    color: "text.primary",
                    "&::after": {
                      height: "2px",
                      bgcolor: "primary.500",
                    },
                  },
                },
              }}
            >
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={0}
              >
                Customer Info
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={1}
              >
                All Customer
              </Tab>
            </TabList>
          </Tabs>
        </Box>
        {activeTab === 0 ? (
          <Stack
            spacing={4}
            sx={{
              display: "flex",
              maxWidth: "2000px",
              mx: "auto",
              px: { xs: 2, md: 6 },
              py: { xs: 2, md: 3 },
            }}
          >
            <Card>
              <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Personal info</Typography>
                <Typography level="body-sm">
                  Fill in the details below to create a customer profile.
                </Typography>
              </Box>
              <Divider />
              {errorMessage && (
                <Typography sx={{ color: "error.main", mb: 2 }}>
                  {errorMessage}
                </Typography>
              )}
              <Box sx={{ my: 2 }}>
                <Grid container spacing={2}>
                  {fields.map((field, index) => (
                    <Grid
                      //@ts-ignore
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                      component="div"
                    >
                      <FormControl>
                        <FormLabel>{field.label}</FormLabel>
                        {field.key === "BILLING_DATE" ||
                        field.key === "ONBOARDING_DATE" ? (
                          <DatePicker
                            value={
                              formData[field.key]?.VALUE
                                ? dayjs(formData[field.key]?.VALUE)
                                : null
                            }
                            onChange={(date: Dayjs | null) =>
                              handleInputChange(
                                field.key,
                                date ? date.format("YYYY-MM-DD") : null
                              )
                            }
                            //@ts-ignore
                            renderInput={(params) => (
                              <Input {...params} size="sm" />
                            )}
                          />
                        ) : (
                          <Input
                            size="sm"
                            placeholder={`Enter ${field.label}`}
                            value={formData[field.key]?.VALUE || ""}
                            onChange={(e) =>
                              handleInputChange(field.key, e.target.value)
                            }
                            type={field.key === "EMAIL" ? "email" : "text"}
                            startDecorator={
                              field.key === "EMAIL" ? (
                                <EmailRoundedIcon />
                              ) : null
                            }
                            fullWidth
                          />
                        )}
                      </FormControl>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <CardOverflow
                sx={{ borderTop: "1px solid", borderColor: "divider" }}
              >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                  <Button size="sm" variant="solid" onClick={handleSave}>
                    Save
                  </Button>
                </CardActions>
              </CardOverflow>
            </Card>
          </Stack>
        ) : (
          <div className="flex flex-col items-center justify-center outletOverflow p-4 md:p-8 w-full gap-y-3 pt-2">
            <div className="bg-white w-full max-w-[98%] flex flex-col items-center justify-center p-4 md:p-6">
              <div className="flex w-full">
                <Typography
                  level="h4"
                  component="h1"
                  sx={{
                    mt: 1,
                    mb: 2,
                    fontSize: { xs: "1.5rem", md: "2rem" }, // Adjust font size for smaller screens
                  }}
                  gutterBottom
                >
                  All The Customer List
                </Typography>
              </div>
              <div className="w-full h-[90px]">
                <Input
                  placeholder="Search"
                  variant="soft"
                  className="w-full mt-2 md:mt-5"
                  value={searchText}
                  onChange={handleSearch}
                />
              </div>
              <div className="mt-1 w-full">
                <div
                  style={{
                    height: 400,
                    width: "100%",
                  }}
                >
                  <DataGrid
                    rows={row}
                    columns={columns}
                    // slots={{ toolbar: GridToolbar }}
                    hideFooter
                    rowHeight={50}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default CreateCustomer;
