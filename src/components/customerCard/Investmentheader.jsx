import React from "react";
import Paper from "components/common/Paper";
import Text from "components/common/Text";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import Button from "components/common/Button";

const InvestmentHeader = ({ data }) => {
  return (
    <Paper
    elevation={1}
    sx={{
      alignItems: "center",
      p: 3,
      backgroundColor: "white",
      border: "1px solid white",
      height: "auto",
    }}
    >
      <Text
        sx={{
          fontSize: "20px",
          fontWeight: 500,
          marginLeft:'14px',
          color:'#101828'
        }}
      >
        {data?.name}
      </Text>
      <Box>
      <Text
        sx={{
          fontSize: "12px",
          fontWeight: 500,
          color: "#667085",
          marginLeft:'14px'
        }}
      >
        {data?.detail}
      </Text>
      </Box>
      <Stack direction="row" m={2} >
      <Button style={{width:'15%'}}>All</Button>
      <Button variant="outlined" style={{marginLeft:'10px' ,width:'15%'}}>Jeetu Gupta</Button>
      <Button variant="outlined"  style={{marginLeft:'10px' ,width:'15%'}}>Ansh Gupta</Button>
      <Button variant="outlined"  style={{marginLeft:'10px' ,width:'15%'}}>Dhruv Gupta</Button>
    </Stack>
    </Paper>
  );
};

export default InvestmentHeader;