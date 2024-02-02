import React, { useState } from "react";
import CustomerDetailHeader from "./CustomerDetailHeader";
import Box from "components/common/Box";
import Additional from "./Additional";
import BasicDetail from "./BasicDetail";
import Performance from "./Performance";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Text from "components/common/Text";
import { useLocation } from "react-router-dom";

const DetailTab = () => {
  const [value, setValue] = React.useState("1"); 
  let location = useLocation();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("location-->", location);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label={
                <Text
                  variant="medium"
                  fontWeight="500"
                  fontSize="16px"
                  style={{ marginLeft: "10px" }}
                >
                  Performance
                </Text>
              }
              value="1"
            />
            <Tab
              label={
                <Text
                  variant="medium"
                  fontWeight="500"
                  fontSize="16px"
                  style={{ marginLeft: "10px" }}
                >
                  Basic Detail
                </Text>
              }
              value="2"
            />
            <Tab
              label={
                <Text
                  variant="medium"
                  fontWeight="500"
                  fontSize="16px"
                  style={{ marginLeft: "10px" }}
                >
                  Additional Details
                </Text>
              }
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel value="1"><Performance /></TabPanel>
        <TabPanel value="2"> <BasicDetail /></TabPanel>
        <TabPanel value="3"><Additional /></TabPanel>
      </TabContext>
    </Box>
  );
};

export default DetailTab;
