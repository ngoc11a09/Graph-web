import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { usePath } from "../PathContext";
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
  const { setPath } = usePath();
  const [value, setValue] = useState(0);

  const handleClick = (value: number) => {
    setPath(value);
    setValue(value);
  };
  return (
    <Box>
      <AppBar position="static">
        <CustomTabs
          value={value}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="Bài toán"
            {...a11yProps(0)}
            onClick={() => handleClick(0)}
          />
          <Tab
            label="Giải thuật"
            {...a11yProps(1)}
            onClick={() => handleClick(1)}
          />
          <Tab
            label="Xem thêm"
            {...a11yProps(2)}
            onClick={() => handleClick(2)}
          />
        </CustomTabs>
      </AppBar>
    </Box>
  );
}
