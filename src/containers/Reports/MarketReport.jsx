import { useState } from "react";
import CustomGrid from "components/datagrid/CustomGrid";
import { reportTable2 } from "helpers/constants";
import Box from "components/common/Box";
import { Typography, styled } from "@mui/material";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import Breadcrumbs from "components/common/Breadcrumbs";
import Button from "components/common/Button";
import ImportIcon from "asset/ImportIcon";
import TextField from "components/common/TextField";
import DatePicker from "components/common/DatePicker";
import SideDrawer from "components/common/SideDrawer";
import Checkbox from "components/common/Checkbox";
import FeatureIcon from "asset/icons/FeatureIcon";
import FilterIcon from "asset/icons/FilterIcon";

const ButtonStyled = styled(Button)(({ theme}) => ({
  border: "1px solid #D0D5DD",
  borderRadius: "8px",
  color: "#242424",
  textTransform: "capitalize",
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: 600,
  marginRight: "16px",
}));

const MarketReport = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handleFilterDrawer = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const MarketFilterDrawer = () => {
    return (
      <>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="flex-end" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Text sx={{fontSize:"14px",fontWeight:500,color:"#242424"}}>Date range</Text>
              <DatePicker placeholder="Select Date" />
            </Box>
            <DatePicker sx={{ flex: 1 }} placeholder="Select Date" />
          </Stack>
          <Stack direction="row" alignItems="flex-end" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Text sx={{fontSize:"14px",fontWeight:500,color:"#242424"}}>Profit (%) range</Text>
              <TextField placeholder="Eg. 5%" />
            </Box>
            <TextField sx={{ flex: 1 }} placeholder="Eg. 10%" />
          </Stack>
        </Stack>
        <Stack>
          <Text sx={{ mt: 1,fontSize:"14px",fontWeight:500,color:"#242424" }}>Risk profile</Text>
          <Stack direction="row" alignItems="center" marginTop="12px">
            <Checkbox size="small" color="black" style={{}}  />
            <Text sx={{ mr: 3, ml: 2 }}>Aggresive</Text>
            <Checkbox size="small" color="black" />
            <Text sx={{ mr: 3, ml: 2 }}>Moderate</Text>
            <Checkbox size="small" color="black" />
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
                  color: "#101828",
                  mr: 1,
                  fontWeight: 500,
                  fontSize: "18px",
                }}
                color="primary"
              >
                Market to market unrealised report
              </Text>
            </Stack>
            <Stack direction="row">
              <Text
                variant="small"
                sx={{ color: "#667085", fontWeight: 400, fontSize: "14px" }}
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
      field: "stockName",
      headerName: "Stock name",
      flex: 1,
      renderCell : () =>(
        <Box>
          <Typography sx={{color:"#242424",fontSize:"14px",fontWeight:500}}>TATA Power</Typography>
        </Box>
      )
    },

    {
      field: "totalQuantity",
      headerName: "Total quantity",
      flex: 1,
      renderCell : () =>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>100</Typography>
        </Box>
      )
    },
    {
      field: "amountInvested",
      headerName: "Amount invested",
      flex: 1,
      renderCell : () =>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹ 4,00,000</Typography>
        </Box>
      )
    },

    {
      field: "unrealised",
      headerName: "Unrealised Gains/Loss",
      flex: 1,
      renderCell : () =>(
        <Box>
          <Typography sx={{color:"#219653",fontSize:"14px",fontWeight:500}}>₹ 10,000.20</Typography>
        </Box>
      )
    },

    {
      field: "marketValue",
      headerName: "Market Value",
      flex: 1,

      renderCell : () =>(
        <Box>
          <Typography sx={{color:"#676C76",fontSize:"14px",fontWeight:400}}>₹4,10,000.20</Typography>
        </Box>
      )
      
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
        <MarketFilterDrawer />
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
          Breadcrumb="Market to market unrealised report"
        />
      </Box>

      <CustomGrid
        autoHeight
        list={reportTable2}
        columnHeaderHeight={46}
        rowWidth={30}
        rowHeight={60}
        columns={customerColumns}
        rowCount={reportTable2.length}
        header={TradeHeader}
      />
    </>
  );
};

export default MarketReport;
