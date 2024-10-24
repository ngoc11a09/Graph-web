import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const primaryColor: string = `#${import.meta.env.VITE_PRIMARY_COLOR}`;

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const CustomTabs = styled(Tabs)({
  backgroundColor: primaryColor,
});

export default function Nav() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/about");
        break;
      case 2:
        navigate("/more");
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <CustomTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Trang chủ" {...a11yProps(0)} />
          <Tab label="Khái niệm liên quan" {...a11yProps(1)} />
          <Tab label="Xem thêm" {...a11yProps(2)} />
        </CustomTabs>
      </AppBar>
    </Box>
  );
}
