import React, { useState } from "react";
import Grid from "components/common/Grid";
import TradeCard from "components/dashboard/TradeCard";
import CustomGrid from "components/datagrid/CustomGrid";
import CustomDataGrid from "components/datagrid/CustomGrid";
import { CustomerReportsdummyTableData } from "helpers/constants";
import Box from "components/common/Box";
import Text from "components/common/Text";
import Stack from "components/common/Stack";
import Button from "components/common/Button";
import Tab from "components/common/Tab";
import SideDrawer from "components/common/SideDrawer";
import DatePicker from "components/common/DatePicker";
import TextField from "components/common/TextField";
import DownloadButton from "components/common/DownloadButton";
import DownloadIcon from "asset/icons/DownloadIcon";
import Checkbox from "@mui/material";

import FilterIcon from "asset/icons/FilterIcon";
import { dummyTableData, CustomerdummyTableData } from "helpers/constants";
import { Chip } from "@mui/material";
import { styled } from "@mui/styles";

const MODEL_PORTFOLIO = "MODEL_PORTFOLIO";
const ALGO = "ALGO";
const CUSTOM = "CUSTOM";
const GAINLOSS = "GAINLOSS";

const tradeTabs = [
  { label: "Summary", value: MODEL_PORTFOLIO },
  { label: "Details", value: ALGO },
  { label: "Allocation", value: CUSTOM },
  { label: "Gain/Loss", value: GAINLOSS },
];

const AddFilterBtn = styled(Button)(() => ({
  fontWeight: 500,
  borderRadius: "8px",
  borderColor: "#D0D5DD",
  p: 1,
}))

const ModelFilterDrawer = () => {
  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="flex-end" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Text>Profit range (%)</Text>
            <TextField placeholder="Eg. 5%" />
          </Box>
          <TextField sx={{ flex: 1 }} placeholder="Eg. 10%" />
        </Stack>
        <Stack direction="row" alignItems="flex-end" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Text>Date range</Text>
            <DatePicker placeholder="Select Date" />
          </Box>
          <DatePicker sx={{ flex: 1 }} placeholder="Select Date" />
        </Stack>
        <Stack>
          <Text sx={{}}>Order type</Text>
        </Stack>
      </Stack>
    </>
  );
};

const ModelTableHeader = ({ handleFilterDrawer, handleTradeDrawer }) => {
  const [tradeType, setTradeType] = useState(tradeTabs[0].value);

  const handleTabChange = (e, newValue) => {
    setTradeType(newValue);
  };
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box sx={{ p: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: "0px" }}
          >
            <Box>
              <Text
                variant="body1"
                sx={{ fontWeight: 500, color: "#101828", mr: "15px" }}
              >
                Reports{" "}
                <Chip
                  sx={{ backgroundColor: "#E5EEFF", color: "#142E56" }}
                  label="10 trades"
                />
              </Text>
              <Text variant="small" color="#667085" sx={{ mt: 0.5 }}>
                Here you can view and export reports accordingly.
              </Text>
            </Box>
            <AddFilterBtn
              startIcon={<FilterIcon />}
              variant="outlined"
              onClick={handleFilterDrawer}
            >
              Add Filters
            </AddFilterBtn>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

function CustomerReportsContainer() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isTradeDrawerOpen, setIsTradeDrawerOpen] = useState(false);

  const handleFilterDrawer = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const handleTradeDrawer = () => {
    setIsTradeDrawerOpen(!isTradeDrawerOpen);
  };

  const customerColumns = [
    {
      field: "stockName",
      headerName: "Stock name",
      flex: 1,
    },
    {
      field: "dateOfExecution",
      headerName: "Date of execution",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "orderType",
      headerName: "Order type",
      flex: 1,
    },
    {
      field: "ordertype",
      headerName: "Order type",
      flex: 1,
      renderCell: () => (
        <Stack direction="row" alignItems="center">
          {/* <Chip label="Buy" sx={{backgroundColor:"#DEFFEC",color:"#219653", borderRadius:"152px",width:"61px",height:"24px"}} /> */}
          <Chip
            label="Sell"
            sx={{
              backgroundColor: "#FFEDED",
              color: "#EB5757",
              borderRadius: "152px",
              width: "61px",
              height: "24px",
            }}
          />
        </Stack>
      ),
    },
    {
      field: "buyPrice",
      headerName: "Buy price",
      flex: 1,
    },
    {
      field: "sellPrice",
      headerName: "Sell Price",
      flex: 1,
    },
    {
      field: "drawdown",
      headerName: "Drawdown",
      flex: 1,
    },
    {
      field: "profit",
      headerName: "Profit",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: () => (
        <Stack direction="row" alignItems="center">
          <DownloadIcon />
        </Stack>
      ),
    },
  ];

  const cardData = [
    {
      id: 1,
      name: "Trade calls",
      value: 30,
      chart: "/images/ProfitChart.svg",
      display: "column",
      xs: 4,
    },
    {
      id: 2,
      name: "Profit",
      value: "₹ 1,50,000",
      percentage: "20%",
      chart: "/images/ProfitChart.svg",
      display: "flex",
      xs: 4,
    },
    {
      id: 3,
      name: "Tax P/L",
      value: "₹ 1,50,000",
      percentage: "20%",
      chart: "/images/LossChart.svg",
      xs: 4,
    },
  ];
  return (
    <>
    <Box>
      <SideDrawer
        open={isFilterDrawerOpen}
        closeDrawer={handleFilterDrawer}
        title="Add Filters"
        subtitle="See the data in an organized manner by applying filters"
        handleSubmit={handleFilterDrawer}
        cancelButtonText="Close"
        submitButtonText="submit"
        drawerWidth={500}
      >
        <ModelFilterDrawer />
      </SideDrawer>

      <Grid sx={{ mb: 3, mt: 1 }} container spacing={2}>
        {cardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <TradeCard data={element} />
          </Grid>
        ))}
      </Grid>
  

      <CustomGrid
        autoHeight
        list={CustomerReportsdummyTableData}
        columnHeaderHeight={46}
        rowHeight={46}
        columns={customerColumns}
        rowCount={CustomerReportsdummyTableData.length}
        header={() =>
          ModelTableHeader({ handleFilterDrawer, handleTradeDrawer })
        }
        // checkboxSelection
      />
    </Box>

    </>
  );
}

export default CustomerReportsContainer;
