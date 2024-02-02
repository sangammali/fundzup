import { useState } from "react";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import CustomDataGrid from "components/datagrid/CustomGrid";
import AddTradeDrawer from "components/Trade/modelPortfolio/AddTradeDrawer";
import ModelCheckPage from "components/Trade/modelPortfolio/ModelCheckPage";
import ImportDrawer from "components/Trade/modelPortfolio/ImportDrawer";
import CloudDownload from "asset/icons/CloudDownload";
import FilterIcon from "asset/icons/FilterIcon";
import Stack from "components/common/Stack";
import Box from "components/common/Box";
import Text from "components/common/Text";
import Button from "components/common/Button";
import TextField from "components/common/TextField";
import SideDrawer from "components/common/SideDrawer";
import {
  modelTableRows,
  modelTableColumns,
  modelImportTableRows,
} from "helpers/constants";

const moderateRiskOptions = [
  "Option One fjhfj",
  "Option Two",
  "Option Three",
  "Option Four",
];

const conservativeRiskOptions = [
  " fjhfj",
  "Option Two fjhjfh",
  "frrff",
  "Option Four",
];

const customerName = ["durgesh", "Option Two fjhjfh", "frrff", "Option Four"];

const tradeSteps = [
  {
    id: 1,
    label: "Basic details",
  },
  {
    id: 2,
    label: "Trade details",
  },
];

// const CapitalButton = styled(Button)(({ theme, selected }) => ({
//   padding: "8px 16px",
//   borderRadius: "8px",
//   backgroundColor: "#219653",
//   width: "128px",
//   backgroundColor: selected ? "#219653" : "#F8F8F8",
//   color: selected ? "#FFFFFF" : "#B3B3B3",
//   "&:hover": {
//     backgroundColor: selected ? "#219653" : "#F8F8F8",
//     color: selected ? "#FFFFFF" : "#B3B3B3",
//   },
// }));

const ModelFilterDrawer = () => {
  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="flex-end" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Text sx={{ mb: "6px" }}>Gains range (%)</Text>
            <TextField placeholder="Eg. 5%" />
          </Box>
          <TextField sx={{ flex: 1 }} placeholder="Eg. 10%" />
        </Stack>
      </Stack>
    </>
  );
};

const ModelTableHeader = ({
  handleFilterDrawer,
  handleTradeDrawer,
  handleProceedToSelectCustomers,
}) => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" sx>
          <Box>
            <Text variant="body1" sx={{ fontWeight: 500, color: "#101828" }}>
              Model portfolio <Chip label="200 Trades"></Chip>
            </Text>
            <Text variant="small" color="#667085" sx={{ mt: 0.5 }}>
              Here you can view and add customers manually or by importing.
            </Text>
          </Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <ImportDrawer
              handleProceedToSelectCustomers={handleProceedToSelectCustomers}
            />
            <Button
              sx={{ fontWeight: 500, borderRadius: "8px", p: 1 }}
              startIcon={<AddIcon />}
              onClick={handleTradeDrawer}
            >
              Add Trade
            </Button>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mt={4}>
          <TextField sx={{ maxWidth: "450px" }} placeholder="Search" />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              sx={{
                fontWeight: 500,
                borderRadius: "8px",
                borderColor: "#D0D5DD",
                p: 1,
              }}
              variant="outlined"
              startIcon={<CloudDownload />}
            >
              Download
            </Button>
            <Button
              sx={{
                fontWeight: 500,
                borderRadius: "8px",
                borderColor: "#D0D5DD",
                p: 1,
              }}
              startIcon={<FilterIcon />}
              variant="outlined"
              onClick={handleFilterDrawer}
            >
              Add Filters
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

const ModelImportHeader = (props) => {
  const { handleUnCheckButtonClick } = props;
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
              variant="button"
            >
              Model Portfolio
            </Text>
            <Chip color="secondary" label={`200 trade`} size="small"></Chip>
          </Stack>
          <Stack direction="row">
            <Text
              variant="small"
              sx={{ color: "#667085", fontWeight: 600, fontSize: "14px" }}
            >
              Here you can view and add customers manually or by importing.
            </Text>
          </Stack>
        </Box>
      </Box>
      <ModelCheckPage handleUnCheckButtonClick={handleUnCheckButtonClick} />
    </>
  );
};

const ModelTradeContainer = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isTradeDrawerOpen, setIsTradeDrawerOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [renderCheckTable, setRenderCheckTable] = useState(false);
  const [isCheckboxVisible, setIsCheckboxVisible] = useState(true);

  const handleProceedToSelectCustomers = () => {
    setRenderCheckTable(true);
  };

  const handleFilterDrawer = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const handleTradeDrawer = () => {
    setIsTradeDrawerOpen(!isTradeDrawerOpen);
  };

  const handleContinue = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleTradeDrawerClose = () => {
    setIsTradeDrawerOpen(false);
  };
  const handleUnCheckButtonClick = () => {
    setIsCheckboxVisible(false);
  };

  const customerColumns = [
    {
      field: "stockName",
      headerName: "Stock name",
      flex: 1,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "index",
      headerName: "Index",
      flex: 1,
    },

    {
      field: "stopLoss",
      headerName: "Stop Loss",
      flex: 1,
    },
    {
      field: "target",
      headerName: "Target",
      flex: 1,
    },
    {
      field: "amountToInvest",
      headerName: "Amount to Invest",
      flex: 1,
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
              width: "61px",
              height: "24px",
            }}
          />
        </Stack>
      ),
    },
  ];
  return (
    <>
      <>
        <SideDrawer
          open={isFilterDrawerOpen}
          closeDrawer={handleFilterDrawer}
          title="Add Filters"
          subtitle="See the data in an organized manner by applying filters"
          handleSubmit={handleFilterDrawer}
          cancelButtonText="Clear all"
          submitButtonText="Apply"
          drawerWidth={500}
        >
          <ModelFilterDrawer />
        </SideDrawer>

        <SideDrawer
          open={isTradeDrawerOpen}
          closeDrawer={handleTradeDrawerClose}
          title="Add Filters"
          subtitle="See the data in an organized manner by applying filters"
          primaryAction={
            currentStep === 2 ? handleBack : handleTradeDrawerClose
          }
          handleSubmit={handleContinue}
          cancelButtonText={currentStep === 1 ? "Cancel" : "Back"}
          submitButtonText={currentStep === 2 ? "Done" : "Continue"}
          drawerWidth={500}
        >
          <AddTradeDrawer currentStep={currentStep} />
        </SideDrawer>

        {renderCheckTable ? (
          <Box mt={2.5} mb={4}>
            <CustomDataGrid
              autoHeight
              list={modelImportTableRows}
              columnHeaderHeight={46}
              rowHeight={60}
              columns={customerColumns}
              rowCount={modelImportTableRows.length}
              header={() =>
                ModelImportHeader({
                  handleUnCheckButtonClick,
                })
              }
              checkboxSelection={isCheckboxVisible ? true : false}
            />
          </Box>
        ) : (
          <Box mt={2.5} mb={4}>
            <CustomDataGrid
              autoHeight
              list={modelTableRows}
              columnHeaderHeight={46}
              rowHeight={46}
              columns={modelTableColumns}
              count={modelTableRows.length}
              pagination={false}
              isLoading={false}
              isCalled={true}
              header={() =>
                ModelTableHeader({
                  handleFilterDrawer,
                  handleTradeDrawer,
                  handleProceedToSelectCustomers,
                })
              }
            />
          </Box>
        )}
      </>
    </>
  );
};

export default ModelTradeContainer;
