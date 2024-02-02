import React, { useState } from "react";
import Box from "components/common/Box";
import { SummaryDetail } from "helpers/constants";
import CustomGrid from "components/datagrid/CustomGrid";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import { Chip, TextField } from "@mui/material";
import Button from "components/common/Button";
import Dialog from "components/common/Dialog";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

const CustomerHeader = () => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <Text
            sx={{ color: "primary", mr: 1, fontWeight: 500 }}
            color="primary"
            variant="button"
          >
            Summary{" "}
          </Text>
          <Chip
            color="secondary"
            label={`200 Customers`}
            // size="small"
          ></Chip>
        </Stack>
        <Text variant="small" sx={{ color: "#667085" }}>
          {/* Here you can view and add customers manually or by
			importing. */}
        </Text>
      </Box>
    </>
  );
};

const SummaryTable = () => {
  const [openModel, setOpenModel] = useState(false);

  const handleCancel = () => {
    setOpenModel(false);
  };
  const handleBuy = () => {
    setOpenModel(false);
  };

  const SummaryTableHeader = [
    { field: "id", headerName: "id", flex: 1 },
    {
      field: "stockName",
      headerName: "Stock name",
      flex: 1,
      renderCell: (params) => (
        <>
          <Stack direction="column">
            <Text
              color="#242424"
              fontWeight="500"
              fontSize="14px"
              alignItems="textCenter"
            >
              {params?.row?.stockName}
            </Text>
          </Stack>
        </>
      ),
    },
    {
      field: "quality",
      headerName: "Quality",
      flex: 1,
      renderCell: (params) => (
        <>
          <Stack direction="column">
            <Text
              color="#676C76"
              fontWeight="400"
              fontSize="14px"
              alignItems="textCenter"
            >
              {params?.row?.quality}
            </Text>
          </Stack>
        </>
      ),
    },
    {
      field: "amountInvested",
      headerName: "Amount Invested",
      flex: 1,
      renderCell: (params) => (
        <>
          <Stack direction="column">
            <Text
              color="#676C76"
              fontWeight="400"
              fontSize="14px"
              alignItems="textCenter"
            >
              {params?.row?.amountInvested}
            </Text>
          </Stack>
        </>
      ),
    },
    {
      field: "totalGains",
      headerName: "Total Gains",
      flex: 1,
      renderCell: (params) => (
        <>
          {params?.row?.totalGains?.change === "increase" ? (
            <Stack direction="row">
              <NorthIcon
                style={{ height: "15px", color: "#219653", marginTop: "3px" }}
              />
              <Text
                color="#219653"
                fontWeight="500"
                fontSize="14px"
                alignItems="textCenter"
              >
                {params?.row?.totalGains?.value}
              </Text>
            </Stack>
          ) : (
            <Stack direction="row"></Stack>
          )}
          {/* <Stack direction="column">
            <Text
              color="#676C76"
              fontWeight="400"
              fontSize="14px"
              alignItems="textCenter"
            >
              {params?.row?.totalGains}
            </Text>
          </Stack> */}
        </>
      ),
    },
    {
      field: "amountAfterGains",
      headerName: "Amount After Gains",
      flex: 1,
      renderCell: (params) => (
        <>
          <Stack direction="column">
            <Text
              color="#676C76"
              fontWeight="400"
              fontSize="14px"
              alignItems="textCenter"
            >
              {params?.row?.amountAfterGains}
            </Text>
          </Stack>
        </>
      ),
    },
    {
      field: "todaysChange",
      headerName: "Todays Change",
      flex: 1,
      renderCell: (params) => (
        <>
          {params?.row?.todaysChange?.change === "increase" ? (
            <Stack direction="row">
              <NorthIcon
                style={{ height: "15px", color: "#219653", marginTop: "3px" }}
              />
              <Text
                color="#219653"
                fontWeight="500"
                fontSize="14px"
                alignItems="textCenter"
              >
                {params?.row?.todaysChange?.value}
              </Text>
            </Stack>
          ) : (
            <Stack direction="row">
              <SouthIcon
                style={{ height: "15px", color: "#EB5757", marginTop: "3px" }}
              />
              <Text
                color="#EB5757"
                fontWeight="400"
                fontSize="14px"
                alignItems="textCenter"
              >
                {params?.row?.todaysChange?.value}
              </Text>
            </Stack>
          )}
        </>
      ),
    },
    {
      field: "annualizedReturns",
      headerName: "Annualized Returns",
      flex: 1,
      renderCell: (params) => (
        <>
          {params?.row?.annualizedReturns?.change === "increase" ? (
            <Stack direction="row">
              <NorthIcon
                style={{ height: "15px", color: "#219653", marginTop: "3px" }}
              />
              <Text
                color="#219653"
                fontWeight="500"
                fontSize="14px"
                alignItems="textCenter"
              >
                {params?.row?.annualizedReturns?.value}
              </Text>
            </Stack>
          ) : (
            <Stack direction="row">
              <SouthIcon
                style={{ height: "15px", color: "#EB5757", marginTop: "3px" }}
              />
              <Text
                color="#EB5757"
                fontWeight="500"
                fontSize="14px"
                alignItems="textCenter"
              >
                {params?.row?.annualizedReturns?.value}
              </Text>
            </Stack>
          )}
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <Stack direction="row" justifyContent="space-between">
            <Button
              p={0}
              style={{
                backgroundColor: "#A1F0C2",
                height: "30px",
                marginLeft: "-8px",
                borderColor: "#219653",
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: "none",
              }}
              onClick={() => setOpenModel(true)}
            >
              <Text
                style={{
                  color: "#219653",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Buy
              </Text>
            </Button>
            <Button
              style={{
                backgroundColor: "#FCB9B9",
                height: "30px",
                marginLeft: "9px",
                borderColor: "#EB5757",
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: "none",
              }}
            >
              <Text
                style={{
                  color: "#EB5757",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Sell
              </Text>
            </Button>
          </Stack>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Trades Table */}
      <Box>
        <CustomGrid
          autoHeight
          list={SummaryDetail}
          columnHeaderHeight={46}
          rowHeight={72}
          columns={SummaryTableHeader}
          rowCount={SummaryDetail.length}
          pagination={false}
          header={CustomerHeader}
        />
        {/* Modal component */}
        <Dialog
          sx={{ width: "80% !important", padding: "10px" }}
          onClose={() => setOpenModel(false)}
          open={openModel}
          title={
            <Text
              fontSize="18px"
              fontWeight="600"
              marginBottom="-10px"
              marginLeft="15px"
            >
              Buy TATA Power
            </Text>
          }
          disableCloseIcon
          maxWidth="sm"
          contentComponent={() => (
            <Stack direction="column" spacing={1} padding="15px">
              <Text
                variant="small"
                fontSize="14px"
                fontWeight="500"
                marginTop="20px"
                marginLeft="30px"
              >
                Quality
              </Text>
              <TextField
                placeholder="Enter Quantity"
                inputProps={{ style: { fontSize: "14px" } }}
              />
              <Stack direction="row">
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    fontWeight: 600,
                    borderRadius: "8px",
                    p: 2,
                    marginTop: "15px",
                    m:0.5
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    width: "100%",
                    fontWeight: 600,
                    borderRadius: "8px",
                    p: 2,
                    marginTop: "15px",
                    m:0.5
                  }}
                  onClick={handleBuy}
                >
                  Buy
                </Button>
              </Stack>
            </Stack>
          )}
        />
      </Box>
    </>
  );
};

export default SummaryTable;
