import React, { useState } from "react";
// import Tab from "components/common/Tab";
import Box from "components/common/Box";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Text from "components/common/Text";
import {AllocationHeader,InvestmentAllocation} from '../data/customertable'
import Allocation from "./AllocationTable";
import DetailsTable from "./DetailsTable";
import AllocationTable from "./AllocationTable";
import GainLossTable from "./GainLossTable";
import SummaryTable from "./SummaryTable";

const InvestmentTableTab = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const [currentTab,setCurrentTab]=useState(0)

  // const onTabSelect=index=>
  // {
  //   setCurrentTab(index)
  // }
 
  return (
    <Box sx={{ width: '100%', typography: 'body1'  }}>
    <TabContext value={value} >
      <Box sx={{ borderBottom: 1, borderColor: 'divider',backgroundColor:'#FFFFFF' }} >
        <TabList onChange={handleChange} aria-label="lab API tabs example" >
          <Tab 
           label={
            <Text
              variant="medium"
              component="h5"
              fontWeight="600"
              style={{ marginLeft: "10px" }}
            >
             Summary
            </Text>
          }
           value="1" />
          <Tab 
          label={
            <Text
              variant="small"
              component="h5"
              fontWeight="600"
              style={{ marginLeft: "10px" }}
            >
              Detail
            </Text>
          }
          value="2" />
          <Tab  label={
            <Text
              variant="small"
              component="h5"
              fontWeight="600"
              style={{ marginLeft: "10px" }}
            >
              Allocation
            </Text>
          }
           value="3" />
                     <Tab 
           label={
            <Text
              variant="medium"
              component="h5"
              fontWeight="600"
              style={{ marginLeft: "10px" }}
            >
             Gain/Loss
            </Text>
          }
           value="4" />
        </TabList>
      </Box>
      <TabPanel value="1" style={{padding:'0px' , marginTop:'25px'}}><SummaryTable/></TabPanel>
      <TabPanel value="2" style={{padding:'0px' , marginTop:'25px'}}><DetailsTable/></TabPanel>
      <TabPanel value="3" style={{padding:'0px' , marginTop:'25px'}}><AllocationTable/></TabPanel>
      <TabPanel value="4" style={{padding:'0px' , marginTop:'25px'}}><GainLossTable/></TabPanel>
    </TabContext>
  </Box>
    );
};

export default InvestmentTableTab;
