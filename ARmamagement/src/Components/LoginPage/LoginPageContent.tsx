import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";

const items = [
  {
    icon: <AccessTimeRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Real-Time Attendance Tracking",
    description:
      "Monitor and manage attendance records as they happen, ensuring up-to-date insights at all times.",
  },
  {
    icon: <CheckCircleRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Accurate Record Keeping",
    description:
      "Ensure precise and reliable record management, reducing errors and improving efficiency.",
  },
  {
    icon: <BarChartRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Comprehensive Reporting",
    description:
      "Generate detailed reports to analyze attendance trends and performance metrics effortlessly.",
  },
  {
    icon: <SecurityRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Secure Data Management",
    description:
      "Safeguard sensitive attendance data with robust security measures and compliance standards.",
  },
];

const LoginPageContent = () => {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
        padding: 3,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
          Attendance Management System
        </Typography>
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
};

export default LoginPageContent;
