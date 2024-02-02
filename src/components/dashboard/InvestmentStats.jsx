import React from "react";
import Paper from "components/common/Paper";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import Box from "components/common/Box";
import BasicPie from "components/common/BasicPie";
import { styled } from "@mui/material";

const BoxStyled = styled(Box)(({ theme }) => ({
  height: "14px",
  width: "14px",
  borderRadius: "50%",
  backgroundColor: "#142E56",
}));

const InvestmentStats = ({ data,pieData=[] }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        alignItems: "center",
        p: 3,
        width: "auto",
        backgroundColor: "white",
        border: "1px solid white",
        height: "428px",
        borderRadius: "8px",
      }}
    >
      <Box>
        <Text
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            color: "Black",
            marginBottom: "20px",
          }}
        >
          {data?.name}
        </Text>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BoxStyled />
          <Text sx={{ ml: "8px", mr: "28px" }}>Number of calls</Text>
          <BoxStyled
            sx={{
              backgroundColor: "#9FC4FF",
            }}
          />
          <Text sx={{ ml: "8px" }}>Action Taken</Text>
        </Box>
        <Stack flexDirection="row" justifyContent="center" marginTop="20px">
          <Box>
            <BasicPie pieData={pieData} />
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default InvestmentStats;
