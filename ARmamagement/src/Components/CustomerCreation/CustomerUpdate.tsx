import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import Input from "@mui/joy/Input";
import Alert from "@mui/material/Alert";
import axios from "axios";

type CustomerUpdateProps = {
  customerList: { id: string; NAME: string }[];
  AllCustomer: {
    [key: string]: {
      CREATED_ON: string;
      CUSTOMER_DATA: {
        NAME: { DESCRIPTION: string; VALUE: string };
        EMAIL: { DESCRIPTION: string; VALUE: string };
        MOBILE: { DESCRIPTION: string; VALUE: string };
        WEBSITE: { DESCRIPTION: string; VALUE: string };
        ADDRESS: { DESCRIPTION: string; VALUE: string };
        BILLING_DATE: { DESCRIPTION: string; VALUE: string };
        CONTACT_EMAIL: { DESCRIPTION: string; VALUE: string };
        CONTACT_NAME: { DESCRIPTION: string; VALUE: string };
        CONTACT_NUMBER: { DESCRIPTION: string; VALUE: string };
        GST_NUMBER: { DESCRIPTION: string; VALUE: string };
        ONBOARDING_DATE: { DESCRIPTION: string; VALUE: string };
        [key: string]: { DESCRIPTION: string; VALUE: string };
      };
      _id: string;
    };
  };
};

const CustomerUpdate: React.FC<CustomerUpdateProps> = ({
  customerList,
  AllCustomer,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [customerData, setCustomerData] = useState<any>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedCustomerId = event.target.value as string;
    setSelectedCustomer(selectedCustomerId);

    const customerName = customerList.find(
      (customer) => customer.id === selectedCustomerId
    )?.NAME;

    if (customerName && AllCustomer[customerName]) {
      setCustomerData(AllCustomer[customerName].CUSTOMER_DATA);
      setAlertMessage(null);
    } else {
      setCustomerData(null);
      setAlertSeverity("error");
      setAlertMessage("Customer data not found.");
    }
  };

  const handleInputChange = (key: string, value: string) => {
    const updatedData = { ...customerData };
    updatedData[key].VALUE = value;
    setCustomerData(updatedData);
  };

  const handleUpdate = async () => {
    const { NAME, EMAIL, MOBILE } = customerData;

    if (!NAME.VALUE || !EMAIL.VALUE || !MOBILE.VALUE) {
      setAlertSeverity("error");
      setAlertMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.patch(
        "https://attendance-management-backend-249196266216.us-central1.run.app/clients/update",
        {
          CUSTOMER_ID: selectedCustomer,
          CUSTOMER_DATA: customerData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage("Customer updated successfully!");
        setIsEditable(false);
      } else {
        setAlertSeverity("error");
        setAlertMessage(`Error updating customer: ${response.data.message}`);
      }
    } catch (error: any) {
      console.error("Error updating customer:", error);
      const errorMessage =
        error.response?.data?.message ||
        "This Customer Name, Email, and Mobile No Already Exist";
      setAlertSeverity("error");
      setAlertMessage(errorMessage);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col items-center outletOverflow p-8 w-full gap-y-3 pt-2">
        <div className="w-[95%] flex justify-between gap-y-5">
          <h1 className="w-[40%] ml-5 flex mt-5 text-2xl">
            <Typography level="h3" component="h1" sx={{ mt: 1, mb: 2 }}>
              Update Customer Details
            </Typography>
          </h1>
          <div className="flex w-1/2 justify-end mt-5 gap-x-5">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="dropdown-label">Select Customer</InputLabel>
              <Select
                labelId="dropdown-label"
                id="dropdown"
                input={<OutlinedInput label="Select" />}
                value={selectedCustomer}
                //@ts-ignore
                onChange={handleSelectChange}
              >
                {customerList.length > 0 ? (
                  customerList.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.NAME}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No customers available</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        {alertMessage && (
          <Alert
            severity={alertSeverity}
            onClose={() => setAlertMessage(null)}
            sx={{ mb: 2, width: "100%" }}
          >
            {alertMessage}
          </Alert>
        )}

        {customerData && (
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
                  Fill in the details below to update the customer profile.
                </Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={2}>
                  {Object.keys(customerData).map((key, index) => {
                    const field = customerData[key];
                    return (
                      //@ts-ignore
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <FormControl>
                          <FormLabel>{field.DESCRIPTION}</FormLabel>
                          {key === "BILLING_DATE" ||
                          key === "ONBOARDING_DATE" ? (
                            <DatePicker
                              value={field.VALUE ? dayjs(field.VALUE) : null}
                              onChange={(date: Dayjs | null) =>
                                handleInputChange(
                                  key,
                                  date ? date.format("YYYY-MM-DD") : ""
                                )
                              }
                              readOnly={!isEditable}
                              //@ts-ignore
                              renderInput={(params: any) => (
                                <OutlinedInput {...params} size="sm" />
                              )}
                            />
                          ) : (
                            <Input
                              size="sm"
                              placeholder={`Enter ${field.DESCRIPTION}`}
                              value={field.VALUE || ""}
                              onChange={(e) =>
                                handleInputChange(key, e.target.value)
                              }
                              type={key === "EMAIL" ? "email" : "text"}
                              startDecorator={
                                key === "EMAIL" ? <EmailRoundedIcon /> : null
                              }
                              readOnly={!isEditable}
                            />
                          )}
                        </FormControl>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              <CardOverflow
                sx={{ borderTop: "1px solid", borderColor: "divider" }}
              >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                  {!isEditable ? (
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() => setIsEditable(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button size="sm" variant="solid" onClick={handleUpdate}>
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="soft"
                        color="neutral"
                        onClick={() => setIsEditable(false)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </CardActions>
              </CardOverflow>
            </Card>
          </Stack>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default CustomerUpdate;
