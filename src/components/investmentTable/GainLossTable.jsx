import Box from "components/common/Box";
import React, { useState } from "react";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import { GainDetail } from '../../helpers/constants'
import Chip from "@mui/material/Chip";
import CustomGrid from "components/datagrid/CustomGrid";
import Dialog from "components/common/Dialog";
import TextField from "components/common/TextField";
import Button from "components/common/Button";
import MovingIcon from '@mui/icons-material/Moving';
import Checkbox from "components/common/Checkbox";
import { Grid } from "@mui/material";

import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

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
            Gain/Loss
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
const GainLossTable = () => {
  const [openModel, setOpenModel] = useState(false);

  const handleCancel = () => {
    setOpenModel(false)
  }
  const handleBuy = () => {
    setOpenModel(false)
  }

  const GainTableHeader = [
    { field: "id", headerName: "id", flex: 1, },
    {
      field: "stockName", headerName: "Stock name", flex: 1,
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
      field: "currentValue", headerName: "Current value", flex: 1,
      renderCell: (params) => (
        <>
          <Stack direction='column'>
            <Text
              color='#676C76'
              fontWeight="400"
              fontSize="14px"
              alignItems="textCenter"
            >
              {params?.row?.currentValue}
            </Text>
          </Stack>
        </>
      ),
    },
    {
      field: "shortTerm", headerName: "Short term unrealized gains", flex: 1,
      renderCell: (params) => (
        <>
        {params?.row?.shortTerm?.change === "increase" ? (
           <Stack direction="row">
             <NorthIcon style={{ height: "15px", color: "#219653",marginTop:'3px' }} />
             <Text
               color="#219653"
               fontWeight="500"
               fontSize="14px"
               alignItems="textCenter"
             >
               {params?.row?.shortTerm?.value}
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
               {params?.row?.shortTerm?.value}
             </Text>
           </Stack>
         )}
     </>
      ),
    },
    {
      field: "longTerm", headerName: "Long term unrealized gains", flex: 1,
      renderCell: (params) => (
        <>
        {params?.row?.longTerm?.change === "increase" ? (
           <Stack direction="row">
             <NorthIcon style={{ height: "15px", color: "#219653",marginTop:'3px' }} />
             <Text
               color="#219653"
               fontWeight="500"
               fontSize="14px"
               alignItems="textCenter"
             >
               {params?.row?.longTerm?.value}
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
               {params?.row?.longTerm?.value}
             </Text>
           </Stack>
         )}
     </>
      ),
    },
    {
      field: "shortTermRealized", headerName: "Short terms realized gains", flex: 1,
      renderCell: (params) => (
        <>
        {params?.row?.shortTermRealized?.change === "increase" ? (
           <Stack direction="row">
             <NorthIcon style={{ height: "15px", color: "#219653",marginTop:'3px' }} />
             <Text
               color="#219653"
               fontWeight="500"
               fontSize="14px"
               alignItems="textCenter"
             >
               {params?.row?.shortTermRealized?.value}
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
               {params?.row?.shortTermRealized?.value}
             </Text>
           </Stack>
         )}
        </>
      ),
    },
    {
      field: "longTermRealized", headerName: "Long terms realized gains", flex: 1,
      renderCell: (params) => (
        <>
         {params?.row?.longTermRealized?.change === "increase" ? (
           <Stack direction="row">
             <NorthIcon style={{ height: "15px", color: "#219653",marginTop:'3px' }} />
             <Text
               color="#219653"
               fontWeight="500"
               fontSize="14px"
               alignItems="textCenter"
             >
               {params?.row?.longTermRealized?.value}
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
               {params?.row?.longTermRealized?.value}
             </Text>
           </Stack>
         )}
        </>
      ),
    },
    {
      field: "dividends", headerName: "Dividends", flex: 1,
      renderCell: (params) => (
        <>
          <Stack direction='column'>
            <Text
              color='#676C76'
              fontWeight="400"
              fontSize="14px"
              alignItems="textCenter"
            >
              {params?.row?.dividends}
            </Text>
          </Stack>
        </>
      ),
    },
    {
      field: "action", headerName: "Action", flex: 1,
      renderCell: (params) => (
        <>
          <MovingIcon onClick={() => setOpenModel(true)} />
        </>
      ),
    },

  ];
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

      <Stack>
        <CustomGrid
          autoHeight
          list={GainDetail}
          columnHeaderHeight={46}
          rowHeight={72}
          columns={GainTableHeader}
          header={CustomerHeader}
          pagination={false}
        />
      </Stack>
      <Dialog
      style={{borderRadius:'50%'}}
        onClose={() => setOpenModel(false)}
        open={openModel}
        title={<Text fontSize='18px' fontWeight='600' marginBottom="-10px">Manage profit and loss</Text>}
        disableCloseIcon
        maxWidth="sm"
        contentComponent={() => (
          <Stack
            direction="column"
            spacing={1.5}
            sx={{ width: "100%" }}
            style={{ marginTop:'10px'  }}
          >
            <Stack direction='row' >
              <Button
                variant="outlined" sx={{
                  width: "100%",
                  fontWeight: 600,
                  borderRadius: "50px",
                  p: 1,
                  m: 0.5,
                }} >Book profit against profit</Button>
              <Button sx={{
                width: "100%",
                fontWeight: 600,
                borderRadius: "50px",
                p: 1,
                m: 0.5,
              }}>Book profit against loss</Button>
            </Stack>
            <Text variant='small' fontSize='16px' fontWeight='500' marginTop="-20px" marginLeft="30px" color="#676C76">Select gains category</Text>
            <Stack
              direction="row"
              justifyContent="space-between"
              style={{ marginLeft: "15px" }}
            >
              <Grid container style={{ marginTop: '-12px' }}>
                <Grid item xs={4}>
                  <Checkbox
                    label={
                      <Text
                        fontWeight="400"
                        fontSize="14px"
                        style={{ marginLeft: "10px" }}
                      >
                        Unrealized gains
                      </Text>
                    }
                    size="small"
                    name="unrealized_gains"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Checkbox
                    label={
                      <Text
                        fontWeight="400"
                        fontSize="14px"
                        style={{ marginLeft: "10px" }}
                      >
                        Realized gains
                      </Text>
                    }
                    size="small"
                    name="realized_gains"
                  />
                  <Grid item xs={4}></Grid>
                </Grid>
              </Grid>
            </Stack>
            <Box>
              <Text variant='small' color="#676C76" fontSize='14px' fontWeight='500'>Stock Name</Text>
              <TextField placeholder="RELIANCE" inputProps={{ style: { fontSize: '14px' }}} sx={{marginTop:"5px"}} disabled/>
            </Box>
            <Box>
              <Text variant='small' color="#676C76" fontSize='14px' fontWeight='500'>Amount</Text>
              <TextField placeholder="Enter Amount" inputProps={{ style: { fontSize: '14px' } }} sx={{marginTop:"5px"}}/>
            </Box>
            <Stack direction='row' style={{marginTop:'40px'}}>
              <Button
                variant="outlined" sx={{
                  width: "100%",
                  fontWeight: 600,
                  borderRadius: "8px",
                  p: 2,
                  marginRight:'5px'
                  // m: ,
                }} onClick={handleCancel}>Cancel</Button>
              <Button sx={{
                width: "100%",
                fontWeight: 600,
                borderRadius: "8px",
                p: 2,
                // m: 2,
              }} onClick={handleBuy}>Save</Button>
            </Stack>
          </Stack>
        )}
      />
    </div>
  );
};

export default GainLossTable;
