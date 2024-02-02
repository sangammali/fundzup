import { Alert, Typography } from "@mui/material";
import DashboardHeader from "components/dashboard/DashboardHeader";
import TradeCard from "components/dashboard/TradeCard";
import Box from "components/common/Box";
import Grid from "components/common/Grid";
import React, { useState } from "react";
import Text from "components/common/Text";
import Chip from "@mui/material/Chip";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { dummyTableData, CustomerdummyTableData } from "helpers/constants";
import CustomGrid from "components/datagrid/CustomGrid";
import Stack from "components/common/Stack";
import CustomerTradeCard from "components/Customer/CustomerTradeCard";
import DashboardGraphCard from "components/dashboard/InvestmentStats";
import ModelPortfolioAllocation from "components/Customer/ModelPortfolioAllocation";
import ModelPortfolioGraph from "components/Customer/ModelPortfolioGraph";
import IconButton from "components/common/IconButton";
import EyeIcon from "asset/icons/EyeIcon";
import SideDrawer from "components/common/SideDrawer";
import TextField from "@mui/material";
import DatePicker from "components/common/DatePicker";

const dashboardCard = [
  {
    id: 1,
    name: "Amount Invested",
    value: "₹ 10,00,000",
    chart: "/images/ProfitChart.svg",
    display: "column",
    xs: 3,
  },
  {
    id: 2,
    name: "Current value",
    value: "₹ 22,50,000",
    chart: "/images/ProfitChart.svg",
    display: "flex",
    xs: 3,
  },
  {
    id: 3,
    name: "Today’s gains",
    value: "₹ 2000",
    percentage: "12.22%",
    chart: "/images/LossChart.svg",
    xs: 3,
  },
  {
    id: 3,
    name: "Annualized returns",
    value: "18.43%",
    chart: "/images/LossChart.svg",
    xs: 3,
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
    name: "Action taken on trade calls",
    value: 16,
    percentage: "20%",
    chart: "/images/ProfitChart.svg",
    display: "flex",
    xs: 4,
  },
  {
    id: 3,
    name: "Profit",
    value: "₹ 1,50,000",
    percentage: "20%",
    chart: "/images/LossChart.svg",
    xs: 4,
  },
];

const graphCardData = [
  {
    id: 1,
    name: "Algo (F&O) progress",
    chart: "/images/Graph2.svg",
    display: "column",
    xs: 6,
  },
  {
    id: 2,
    name: "Custom Progress till date",
    chart: "/images/Graph2.svg",
    display: "flex",
    xs: 6,
  },
];

const ModelFilterDrawer = () => {
  return (
    <>
      <Box>
        <Box>
          <Text sx={{ color: "#242424", fontSize: "14px", fontWeight: 500 }}>
            Order type
          </Text>
          <Stack direction="row">
            <FormGroup>
              <Box sx={{ display: "flex", mb: "24px" }}>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  sx={{ mr: "32px" }}
                  label="All"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  sx={{ mr: "32px" }}
                  label="Buy"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  sx={{ mr: "32px" }}
                  label="Sell"
                />
              </Box>
            </FormGroup>
          </Stack>
        </Box>
        <Box>
          <Text sx={{ color: "#242424", fontSize: "14px", fontWeight: 500 }}>
            Action status
          </Text>
          <Stack direction="row">
            <FormGroup direction="row">
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  sx={{ mr: "32px" }}
                  label="Action taken"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  sx={{ mr: "32px" }}
                  label="Action pending"
                />
              </Box>
            </FormGroup>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

function CustomerDashboardContainer() {
  const [isDrawerEye, setIsDrawerEye] = useState(false);
  const [isDrawerAddFamily, setDrawerAddFamily] = useState(false);

  const customerColumns = [
    {
      field: "stockName",
      headerName: "Stock name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
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
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "stopLoss",
      headerName: "Stop loss",
      flex: 1,
    },
    {
      field: "targetSell",
      headerName: "Target (Sell)",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: () => (
        <Stack direction="row" alignItems="center" sx={{ gap: "8px" }}>
          <Box
            component="img"
            sx={{
              width: "56px",
              height: "36px",
              mr: "0px",
              backgroundColor: "#A1F0C2",
              border: "1.5px solid #219653",
              borderRadius: "4.5px",
            }}
            alt="Exclamation"
            src="/images/greenTick.svg"
          ></Box>
          <Box
            component="img"
            sx={{
              width: "56px",
              height: "36px",
              mr: "0px",
              backgroundColor: "#FCB9B9",
              border: "1.5px solid #EB5757",
              borderRadius: "4.5px",
            }}
            alt="Exclamation"
            src="/images/cancelTick.svg"
          ></Box>
        </Stack>

        // <Stack direction="row" alignItems="center">
        //   <IconButton>
        //     <EyeIcon
        //       sx={{ width: "20px", height: "20px" }}
        //       onClick={EyeDrawer}
        //     />
        //   </IconButton>
        // </Stack>
      ),
    },
  ];

  const EyeDrawer = () => {
    setIsDrawerEye(true);
  };
  const AddFamilyDrawer = () => {
    setDrawerAddFamily(true);
  };

  const TradeHeader = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            padding: "24px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{}}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ mb: "10px" }}
            >
              <Text
                sx={{ color: "primary", mr: 1, fontWeight: 500 }}
                color="primary"
                variant="button"
              >
                Trades{" "}
              </Text>
              <Chip
                color="secondary"
                label={`10 trade calls`}
                size="small"
              ></Chip>
            </Stack>
            <Stack direction="row">
              <Box
                component="img"
                sx={{ width: "20px", height: "20px", mr: "6px" }}
                alt="Exclamation"
                src="/images/redclockIcon.svg"
              ></Box>
              <Text
                variant="small"
                sx={{ color: "#EB5757", fontWeight: 600, fontSize: "14px" }}
              >
                4:30 min left to take the trade calls
              </Text>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItem: "center",
              border: "1px solid #D0D5DD",
              height: "20px",
              borderRadius: "8px",
              padding: "10px 16px",
            }}
          >
            <Box
              component="img"
              sx={{ width: "20px", height: "20px", mr: "6px" }}
              alt="Add Filter Icon"
              src="/images/addFilterIcon.svg"
              onClick={AddFamilyDrawer}
            ></Box>
            <Text sx={{ color: "#242424", fontSize: "14px", fontWeight: 600 }}>
              Add Filters
            </Text>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <DashboardHeader />
      <Alert
        sx={{
          padding: "10px",
          backgroundColor: "#FFF7F0",
          color: "#DD781E",
          fontSize: "16px",
          fontWeight: 500,
          mb: "24px",
          border: "1px solid #F2994A",
          borderRadius: "8px",
        }}
        severity="warning"
      >
        Once the RIA accept the request, you will get the complete access of the
        system.
      </Alert>
      {/* <TradeCard/> */}
      <Grid sx={{ mb: 3 }} container spacing={2}>
        {dashboardCard.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <CustomerTradeCard data={element} />
          </Grid>
        ))}
      </Grid>

      <Grid sx={{ mb: 3 }} container spacing={2}>
        {cardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <TradeCard data={element} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: "24px" }}>
        <CustomGrid
          autoHeight
          list={CustomerdummyTableData}
          columnHeaderHeight={46}
          rowHeight={46}
          columns={customerColumns}
          rowCount={CustomerdummyTableData.length}
          header={TradeHeader}
          checkboxSelection
        />
      </Box>

      <Grid sx={{ mb: 3 }} container spacing={2}>
        {graphCardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <DashboardGraphCard data={element} />
          </Grid>
        ))}
      </Grid>
      <ModelPortfolioAllocation />
      {/* <ModelPortfolioGraph /> */}

      <SideDrawer
        open={isDrawerAddFamily}
        closeDrawer={() => setDrawerAddFamily(false)}
        title="Add Filters"
        subtitle="See the data in an organized manner by applying filters"
        // contentTitle="Your Drawer Content Title"
        cancelButtonText="Clear all"
        submitButtonText="Apply"
      >
        <ModelFilterDrawer />
      </SideDrawer>
    </>
  );
}

export default CustomerDashboardContainer;
