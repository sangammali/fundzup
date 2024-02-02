import { useState } from "react";
import CustomGrid from "components/datagrid/CustomGrid";
import { reportTable7 } from "helpers/constants";
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

const CapitalSample = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handleFilterDrawer = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const CapitalFilterDrawer = () => {
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
                Capital gain statement sample
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
      renderCell: ()=>(
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
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>ABCD12345</Typography>
        </Box>
      )

    },
    {
      field: "fromDate",
      headerName: "From date",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>Sept 23,2023</Typography>
        </Box>
      )

    },

    {
      field: "toDate",
      headerName: "To date",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>Sept 23,2023</Typography>
        </Box>
      )

    },

    {
      field: "instrumentName",
      headerName: "instrument name",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>lorem ipsum</Typography>
        </Box>
      )


    },

    {
      field: "tradeDate",
      headerName: "Trade date",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>Sept 23,2023</Typography>
        </Box>
      )

    },

    {
      field: "openQuantity",
      headerName: "Open quantity",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>20</Typography>
        </Box>
      )

    },

    {
      field: "openingRate",
      headerName: "Opening rate",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },

    {
      field: "boughtQuantity",
      headerName: "bought quantity",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>20</Typography>
        </Box>
      )

    },
    {
      field: "boughtRateActualRate",
      headerName: "Bought rate/Actual rate",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2000 / ₹ 4000</Typography>
        </Box>
      )

    },
    {
      field: "tradeDate",
      headerName: "Trade date",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>Sept 23,2023</Typography>
        </Box>
      )

    },
    {
      field: "saleQuantity",
      headerName: "Sale quantity",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>20</Typography>
        </Box>
      )

    },
    {
      field: "saleRateActualSaleRate",
      headerName: "Sale rate/Actual sale rate",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2000 / ₹ 4000</Typography>
        </Box>
      )

    },
    {
      field: "netCloseQuantity",
      headerName: "Net/Close quantity",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>20/40</Typography>
        </Box>
      )

    },
    {
      field: "closingRate",
      headerName: "Closing rate",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "totalTurnover",
      headerName: "Total turnover",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "debitamount",
      headerName: "Debit amount",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "creditAmount",
      headerName: "Credit amount",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "profitLoss",
      headerName: "Profit/Loss",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "future",
      headerName: "Future",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "futuresProfitLossA",
      headerName: "Futures profit/loss(A)",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )

    },
    {
      field: "optionsProfitLossB",
      headerName: "Options profit/loss(B)",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "grossProfitLoss",
      headerName: "Gross profit/Loss",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },

    {
      field: "expenses",
      headerName: "Expenses",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },

    {
      field: "brokerage",
      headerName: "Brokerage",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },

    {
      field: "clearingCharges",
      headerName: "Clearing charges",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },

    {
      field: "exchangeTransactionCharges",
      headerName: "Exhange transaction charges",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },

    {
      field: "cgst",
      headerName: "CGST",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>18%</Typography>
        </Box>
      )

    },
    {
      field: "sgst",
      headerName: "SGST",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>18%</Typography>
        </Box>
      )

    },
    {
      field: "integratedGst",
      headerName: "integrated GST",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>18%</Typography>
        </Box>
      )

    },
    {
      field: "stt",
      headerName: "STT",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>18%</Typography>
        </Box>
      )

    },
    {
      field: "sebiTurnoverFees",
      headerName: "SEBI turnover fees",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>18%</Typography>
        </Box>
      )

    },
    {
      field: "stampDuty",
      headerName: "Stamp duty",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "ipft",
      headerName: "IPFT",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>18%</Typography>
        </Box>
      )
      

    },
    {
      field: "totalAllExpD",
      headerName: "Total of all exp (D)",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "netProfitLoss",
      headerName: "Net profit/Loss",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 2,00,000</Typography>
        </Box>
      )

    },
    {
      field: "openPositions",
      headerName: "Open positions",
      flex: 1,
      minWidth:120,
      renderCell: ()=>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>18%</Typography>
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
        <CapitalFilterDrawer />
      </SideDrawer>
      <Box
        sx={{
          maxWidth: "calc(100% + 48px)",
          margin: "0 -24px",
          marginBottom: "24px",
        }}
      >
        <Breadcrumbs
          link="Reports"
          Breadcrumb=" Capital gain statement sample "
        />
      </Box>

      <CustomGrid
        autoHeight
        list={reportTable7}
        columnHeaderHeight={46}
        rowHeight={60}
        columns={customerColumns}
        rowCount={reportTable7.length}
        header={TradeHeader}
      />
    </>
  );
};

export default CapitalSample;
