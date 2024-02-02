import Box from "components/common/Box";
import React, { useState } from "react";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import { useNavigate } from "react-router";
import { InvestmentDetail } from '../../helpers/constants'
import Chip from "@mui/material/Chip";
import CustomGrid from "components/datagrid/CustomGrid";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

const DetailTableHeader = [
  { field: "id", headerName: "id", flex: 1, },
  {
    field: "stockName", headerName: "Stock Name", flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction='column'>
          <Text
            color='#242424'
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
    field: "currentNav", headerName: "Current NAV", flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction='column'>
          <Text
            color='#676C76'
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
          >
            {params?.row?.currentNav}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "WeekHigh", headerName: "52 week high", flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction='column'>
          <Text
            color='#676C76'
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
          >
            {params?.row?.WeekHigh}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "WeekLoss", headerName: "52 week loss", flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction='column'>
          <Text
            color='#676C76'
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
          >
            {params?.row?.WeekLoss}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "oneYreturn", headerName: "1 Y return", flex: 1,
    renderCell: (params) => (
      <>
         {params?.row?.oneYreturn?.change === "increase" ? (
            <Stack direction="row">
              <NorthIcon style={{ height: "15px", color: "#219653",marginTop:'3px' }} />
              <Text
                color="#219653"
                fontWeight="500"
                fontSize="14px"
                alignItems="textCenter"
              >
                {params?.row?.oneYreturn?.value}
              </Text>
            </Stack>
          ) : (
            <Stack direction="row">
              <SouthIcon style={{ height: "15px", color: "#EB5757",marginTop:'3px' }} />
              <Text
                color="#EB5757"
                fontWeight="400"
                fontSize="14px"
                alignItems="textCenter"
              >
                {params?.row?.oneYreturn?.value}
              </Text>
            </Stack>
          )}
      </>
    ),
  },
  {
    field: "threeYreturn", headerName: "3 Y return", flex: 1,
    renderCell: (params) => (
      <>
      {params?.row?.threeYreturn?.change2 === "increase" ? (
         <Stack direction="row">
           <NorthIcon style={{ height: "15px", color: "#219653",marginTop:'3px' }} />
           <Text
             color="#219653"
             fontWeight="500"
             fontSize="14px"
             alignItems="textCenter"
           >
             {params?.row?.threeYreturn?.value2}
           </Text>
         </Stack>
       ) : (
         <Stack direction="row">
           <SouthIcon style={{ height: "15px", color: "#EB5757",marginTop:'3px' }} />
           <Text
             color="#EB5757"
             fontWeight="400"
             fontSize="14px"
             alignItems="textCenter"
           >
             {params?.row?.threeYreturn?.value2}
           </Text>
         </Stack>
       )}
   </>
    ),
  },
  {
    field: "fiveYreturn", headerName: "5 Y return", flex: 1, renderCell: (params) => (
      <>
      {params?.row?.fiveYreturn?.change3 === "increase" ? (
         <Stack direction="row">
           <NorthIcon style={{ height: "15px", color: "#219653",marginTop:'3px' }} />
           <Text
             color="#219653"
             fontWeight="500"
             fontSize="14px"
             alignItems="textCenter"
           >
             {params?.row?.fiveYreturn?.value3}
           </Text>
         </Stack>
       ) : (
         <Stack direction="row">
           <SouthIcon style={{ height: "15px", color: "#EB5757",marginTop:'3px' }} />
           <Text
             color="#EB5757"
             fontWeight="400"
             fontSize="14px"
             alignItems="textCenter"
           >
             {params?.row?.fiveYreturn?.value3}
           </Text>
         </Stack>
       )}
   </>
    ),
  },
  {
    field: "ReturnSinceInception", headerName: "Returns since inception", flex: 1,
    renderCell: (params) => (
      <>
             {params?.row?.ReturnSinceInception?.change4 === "increase" ? (
         <Stack direction="row">
           <NorthIcon style={{ height: "15px", color: "#219653",marginTop:'3px' }} />
           <Text
             color="#219653"
             fontWeight="500"
             fontSize="14px"
             alignItems="textCenter"
           >
             {params?.row?.ReturnSinceInception?.value4}
           </Text>
         </Stack>
       ) : (
         <Stack direction="row">
           <SouthIcon style={{ height: "15px", color: "#EB5757",marginTop:'3px' }} />
           <Text
             color="#EB5757"
             fontWeight="400"
             fontSize="14px"
             alignItems="textCenter"
           >
             {params?.row?.ReturnSinceInception?.value4}
           </Text>
         </Stack>
       )}
      </>
    ),
  },

];

const DetailsTable = () => {

  const CustomerHeader = () => {
    return (
      <>
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Text
              sx={{ color: "primary", mr: 1, fontWeight: 500 }}
              color="primary"
              variant="button"
            >
              Detail{" "}
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

  return (
    <div>

      <Stack>
        <CustomGrid
          autoHeight
          list={InvestmentDetail}
          columnHeaderHeight={46}
          rowHeight={72}
          columns={DetailTableHeader}
          header={CustomerHeader}
          pagination={false}
        />
      </Stack>

    </div>
  );
};

export default DetailsTable;
