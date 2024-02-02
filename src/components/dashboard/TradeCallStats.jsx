import React from "react";
import Paper from "components/common/Paper";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import Box from "components/common/Box";
import HorizontalBars from "components/common/HorizontalBars";
import { styled } from "@mui/material";

const PaperStyled = styled(Paper)(({ theme }) => ({
  alignItems: "center",
  padding: "24px",
  width: "auto",
  backgroundColor: "white",
  border: "1px solid white",
  height: "428px",
  borderRadius: "8px",
}));

const TextStyled = styled(Text)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 500,
  color: "Black",
  marginBottom: "20px",
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  height: "14px",
  width: "14px",
  borderRadius: "50%",
  backgroundColor: "#142E56",
}));

const TradeCallStats = ({ data, investmentChart=[] }) => {
  return (
    <PaperStyled elevation={1}>
      <Box>
        <TextStyled>{data?.name}</TextStyled>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BoxStyled />
          <Text sx={{ ml: "8px", mr: "28px" }}>Amount invested</Text>
          <BoxStyled
            sx={{
              backgroundColor: "#9FC4FF",
            }}
          />
          <Text sx={{ ml: "8px" }}>Profit made</Text>
        </Box>
        <Stack flexDirection="row" justifyContent="center" marginTop="20px">
          <Box>
            <HorizontalBars investmentChart={investmentChart} />
          </Box>
        </Stack>
      </Box>
    </PaperStyled>
  );
};

export default TradeCallStats;
