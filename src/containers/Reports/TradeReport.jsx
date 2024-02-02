import { useState } from "react";
import CustomGrid from "components/datagrid/CustomGrid";
import { reportTable1 } from "helpers/constants";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import { Chip, Typography, styled } from "@mui/material";
import Text from "components/common/Text";
import Breadcrumbs from "components/common/Breadcrumbs";
import TradeCard from "components/dashboard/TradeCard";
import Grid from "components/common/Grid";
import Button from "components/common/Button";
import ImportIcon from "asset/ImportIcon";
import FilterIcon from "asset/icons/FilterIcon";
import TextField from "components/common/TextField";
import DatePicker from "components/common/DatePicker";
import SideDrawer from "components/common/SideDrawer";
import Checkbox from "components/common/Checkbox";
import FeatureIcon from "asset/icons/FeatureIcon";



const ButtonStyled = styled(Button)(({ theme }) => ({
  border: "1px solid #D0D5DD",
  borderRadius: "8px",
  color: "#242424",
  textTransform: "capitalize",
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: 600,
  marginRight: "16px",
}));

const TradeReport = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handleFilterDrawer = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const TradeFilterDrawer = () => {
    return (
      <>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="flex-end" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Text>Date range</Text>
              <DatePicker placeholder="Select Date" />
            </Box>
            <DatePicker sx={{ flex: 1 }} placeholder="Select Date" />
          </Stack>
          <Stack direction="row" alignItems="flex-end" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Text>Profit range (%)</Text>
              <TextField placeholder="Eg. 5%" />
            </Box>
            <TextField sx={{ flex: 1 }} placeholder="Eg. 10%" />
          </Stack>
        </Stack>
        <Stack>
          <Text sx={{ mt: 1 }}>Risk profile</Text>
          <Stack direction="row" alignItems="center" marginTop="12px">
            <Checkbox />
            <Text sx={{ mr: 3, ml: 2 }}>Aggresive</Text>
            <Checkbox />
            <Text sx={{ mr: 3, ml: 2 }}>Moderate</Text>
            <Checkbox />
            <Text sx={{ mr: 3, ml: 2 }}>Conservative</Text>
          </Stack>
        </Stack>
      </>
    );
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
                sx={{
                  color: "primary",
                  mr: 1,
                  fontWeight: 500,
                  fontSize: "18px",
                }}
                color="primary"
              >
                Reports
              </Text>
              <Chip color="secondary" label={`200 trade`} size="small"></Chip>
            </Stack>
            <Stack direction="row">
              <Text
                variant="small"
                sx={{ color: "#667085", fontWeight: 600, fontSize: "14px" }}
              >
                Here you can view and export reports accordingly.
              </Text>
            </Stack>
          </Box>

          <Box sx={{ display: "flex" }}>
            <ButtonStyled variant="outlined">
              <ImportIcon sx={{ mr: 0.5 }} />
              Export
            </ButtonStyled>

            <ButtonStyled
              startIcon={<FilterIcon />}
              variant="outlined"
              onClick={handleFilterDrawer}
            >
              Add Filters
            </ButtonStyled>
          </Box>
        </Box>
      </>
    );
  };

  const customerColumns = [
    {
      field: "customerName",
      headerName: "Customer name",
      flex: 1,
      renderCell : ()=>(
        <Box>
          <Typography sx={{color:"#242424",fontSize:"14px",fontWeight:500}}>Ankit Arora</Typography>
        </Box>
      )
    },
    {
      field: "totalTrades",
      headerName: "Total trades",
      flex: 1,
      renderCell : ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>30</Typography>
        </Box>
      )
    },
    {
      field: "totalQuantity",
      headerName: "Total quantity",
      flex: 1,
      renderCell : ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>100</Typography>
        </Box>
      )
    },
    {
      field: "amountInvested",
      headerName: "Amount invested",
      flex: 1,
      renderCell : ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )
    },

    {
      field: "totalProfit",
      headerName: "Total profit",
      flex: 1,
      renderCell : ()=>(
        <Box>
          <Typography sx={{color:"#219653",fontSize:"14px",fontWeight:500}}>₹ 4,00,000</Typography>
        </Box>
      )
    },
    {
      field: "tax",
      headerName: "Tax P/L",
      flex: 1,
      renderCell : ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>12%</Typography>
        </Box>
      )
    },
    {
      field: "drawDown",
      headerName: "Drawdown",
      flex: 1,
      renderCell : ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>12%</Typography>
        </Box>
      )
    },

    {
      field: "riskProfile",
      headerName: "Risk Profile",
      flex: 1,
      renderCell: () => (
        <Stack direction="row" alignItems="center">
          <Chip
            label="Aggresssive"
            sx={{
              backgroundColor: "#FFEDED",
              color: "#EB5757",
              borderRadius: "152px",
              height: "24px",
            }}
          />
        </Stack>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: () => (
        <Stack direction="row" alignItems="center">
          <FeatureIcon />
        </Stack>
      ),
    },
  ];
  const cardData = [
    {
      id: 1,
      name: "Total trade calls",
      value: 90,
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
      chart: "/images/ProfitChart.svg",
      xs: 4,
    },
  ];
  return (
    <>
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
        <TradeFilterDrawer />
      </SideDrawer>

      <Box sx={{ maxWidth: "calc(100% + 48px)", margin: "0 -24px" }}>
        <Breadcrumbs
          link="Reports"
          Breadcrumb="Trade report of the customers"
        />
      </Box>
      <Grid container spacing={2}>
        {cardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <Box sx={{ mt: "24px", mb: "24px" }}>
              <TradeCard data={element} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <CustomGrid
        autoHeight
        list={reportTable1}
        columnHeaderHeight={46}
        rowHeight={60}
        columns={customerColumns}
        rowCount={reportTable1.length}
        header={TradeHeader}
      />
    </>
  );
};

export default TradeReport;
