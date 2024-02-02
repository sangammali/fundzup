import { useState } from "react";
import CustomGrid from "components/datagrid/CustomGrid";
import { reportTable4 } from "helpers/constants";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import Breadcrumbs from "components/common/Breadcrumbs";
import Button from "components/common/Button";
import ImportIcon from "asset/ImportIcon";
import TextField from "components/common/TextField";
import DatePicker from "components/common/DatePicker";
import SideDrawer from "components/common/SideDrawer";
import Checkbox from "components/common/Checkbox";
import FilterIcon from "asset/icons/FilterIcon";
import { Typography, styled } from "@mui/material";

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

const CashReport = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handleFilterDrawer = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const CashFilterDrawer = () => {
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
                Cash reconciliation report
              </Text>
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
      field: "clientName",
      headerName: "Client Name",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#242424",fontSize:"14px",fontWeight:500}}>Ankit Arora</Typography>
        </Box>
      )

    },

    {
      field: "clientCode",
      headerName: "Client code",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>ABCD123456</Typography>
        </Box>
      )

    },
    {
      field: "report",
      headerName: "Report generation date",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>Sept 23, 2023</Typography>
        </Box>
      )

    },

    {
      field: "particulars",
      headerName: "Particulars",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>20</Typography>
        </Box>
      )

    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },

    {
      field: "openingBalance",
      headerName: "Opening balance",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },

    {
      field: "deposit",
      headerName: "Deposit",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },

    {
      field: "sales",
      headerName: "Sale of stock",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },

    {
      field: "same",
      headerName: "Same year profits",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "fno",
      headerName: "Fno rofits",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "open",
      headerName: "Open position option (Sell)",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "payout",
      headerName: "Payout",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "purchase",
      headerName: "Purchase of stock",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "sameYearLoss",
      headerName: "Total",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )
      
    },
    {
      field: "cashExp",
      headerName: "Cash exp",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "fnoLoss",
      headerName: "FnO Loss",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "dpCharges",
      headerName: "DP charges",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "otherCharges",
      headerName: "Other charges",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "openPositionOption",
      headerName: "Open position option",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "closingBalance",
      headerName: "Closing balance",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "difference",
      headerName: "Difference",
      flex: 1,
      minWidth:120,
      renderCell:()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

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
        <CashFilterDrawer />
      </SideDrawer>

      <Box
        sx={{
          maxWidth: "calc(100% + 48px)",
          margin: "0 -24px",
          marginBottom: "24px",
        }}
      >
        <Breadcrumbs link="Reports" Breadcrumb="Cash reconciliation report" />
      </Box>

      <CustomGrid
        autoHeight
        list={reportTable4}
        columnHeaderHeight={46}
        rowHeight={60}
        columns={customerColumns}
        rowCount={reportTable4.length}
        header={TradeHeader}
      />
    </>
  );
};

export default CashReport;
