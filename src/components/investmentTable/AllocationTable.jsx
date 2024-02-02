import Box from "components/common/Box";
import React, { useState } from "react";
import Stack from "components/common/Stack";
import { InvestmentAllocation } from '../../helpers/constants'
import Text from "components/common/Text";
import CustomGrid from "components/datagrid/CustomGrid";
import { TableCell, TableRow } from "@mui/material";
import Chip from "@mui/material/Chip";

const AllocationHeader = [
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
    field: "currentValue", headerName: "Current Value", flex: 1, renderCell: (params) => (
      <>
        <Stack direction='column'>
          <Text
            color='#676C76'
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
            marginLeft='5px'
          >
            {params?.row?.currentValue}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "percentage", headerName: "Allocation % at current", flex: 1, renderCell: (params) => (
      <>
        <Stack direction='column'>
          <Text
            color='#676C76'
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
            marginLeft='5px'
          >
            {params?.row?.percentage}
          </Text>
        </Stack>
      </>
    ),
  },
];

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
            Allocation{" "}
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

const AllocationTable = () => {

  //   const TableRowComponet = () => {
  //     console.log("TbleRow ");
  //     return (
  //       <TableRow hover role="checkbox" tabIndex={-1} style={{ width: "80%" }}>
  //         <TableCell>
  //           <Text style={{ fontSize: 14 }}>{InvestmentAllocation.type}</Text>
  //         </TableCell>
  //       </TableRow>
  //     );
  //   };

  return (
    <div>

      <Stack style={{ padding: '0px' }} >
        <CustomGrid
          style={{ padding: '0px' }}
          //   autoHeight
          list={InvestmentAllocation}
          //   columnVisibilityModel={TableRowComponet}
          columnHeaderHeight={46}
          header={CustomerHeader}
          rowHeight={72}
          columns={AllocationHeader}
          rowCount={InvestmentAllocation.length}
          pagination={false}
        />
      </Stack>

    </div>
  );
};

export default AllocationTable;
