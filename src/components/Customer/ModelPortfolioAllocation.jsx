import React from "react";
import Grid from "components/common/Grid";
import Box from "components/common/Box";
import Text from "components/common/Text";
import styled from "@emotion/styled";
import Stack from "components/common/Stack";
import { StyleTwoTone } from "@mui/icons-material";

const MainGrid = styled(Grid)(() => ({
  marginBottom: "24px",
  padding: "24px",
  background: "#FFF",
  border: "1px solid #E7E7E7",
  borderRadius: "8px",
  boxShadow: "0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
}));

const PortfolioTitile = styled(Text)(() => ({
  color: "#101828",
  fontSize: "18px",
  fontweight: 500,
  mb: "8px",
}));

const PortfolioSubTitile = styled(Text)(() => ({
  color: "#676C76",
  fontSize: "14px",
  fontweight: 500,
  width: "460px",
  mb: "20px",
}));

function ModelPortfolioAllocation() {
  return (
    <>
      <MainGrid>
        <Grid item xs={12}>
          <Box>
            <Text sx={{ mb: "50px" }}>Model Portfolio allocation</Text>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                component="img"
                sx={{
                  width: "423px",
                  height: "287px",
                  mr: "6px",
                  display: "flex",
                }}
                alt="Model Portfolio Chart"
                src="/images/modelportfoliochart.svg"
              />
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "#F2F6FF",
                  width: "508px",
                  height: "130px",
                  borderRadius: "16px",
                }}
              >
                <PortfolioTitile>
                  Net Liquid Value of the portfolio
                </PortfolioTitile>

                <PortfolioSubTitile>
                  Net liquid value reflects the current market price of all the
                  holdings in your portfolio.
                </PortfolioSubTitile>
                <Text
                  sx={{ color: "#219653", fontSize: "26px", fontweight: 600 }}
                >
                  ₹ 2,00,00,000
                </Text>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </MainGrid>
    </>
  );
}

export default ModelPortfolioAllocation;
