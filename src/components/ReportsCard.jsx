import React from "react";
import Box from "./common/Box";
import Stack from "./common/Stack";
import Card from "./common/Card";
import Text from "./common/Text";
import Button from "./common/Button";
import Divider from "./common/Divider";
import ImportIcon from "asset/ImportIcon";
import { Chip,styled  } from "@mui/material";
import ReportCardIcon from "asset/icons/ReportCardIcon";
import Grid from "./common/Grid";

const ChipStyle = styled(Chip)(({ theme }) => ({
  backgroundColor: "#E5EEFF",
  borderRadius: "16px",
  p: "0px 3px",
  color: "#142E56",
  fontSize: "12px",
  fontWeight: 400,
  ml: "3px",
}));



const ReportsCard = ({
  onTradeReportClick,
  onMarketReportClick,
  onHoldingReportClick,
  onCashReportClick,
  onGlobalReportClick,
  onSampleClick,
  onCapitalSampleClick,
}) => {
  return (
    <Card sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "16px 24px",
        }}
      >
        <Box>
          <Text sx={{ color: "#101828", fontSize: "18px", fontWeight: 500 }}>
            Reports{" "}
            <ChipStyle
              label="3 reports"
              size="small"
         
            />
          </Text>

          <Text
            sx={{
              color: "#667085",
              fontSize: "14px",
              fontWeight: 400,
              mt: 0.5,
            }}
          >
            Here you can view and export reports accordingly.
          </Text>
        </Box>

        <Box>
          <Button
            variant="outlined"
            sx={{
              border: "1px solid #D0D5DD",
              borderRadius: "8px",
              color: "#242424",
              textTransform: "capitalize",
              width: "120px",
              p: "8px 16px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            <ImportIcon sx={{ mr: 0.5 }} />
            Import
          </Button>
        </Box>
      </Box>
      <Divider />

      <Box sx={{ p: "24px 24px 124px 24px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                
                p: "20px 24px",
                border: "1px solid #D6D6D6",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={onTradeReportClick}
            >
              <Stack direction="row" justifyContent="space-between">
                <Text
                  sx={{ color: "#101828", fontSize: "18px", fontWeight: 500 }}
                >
                  Trade report of the customers
                </Text>
                <ReportCardIcon />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
              
                p: "20px 24px",
                border: "1px solid #D6D6D6",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={onMarketReportClick}
            >
              <Stack direction="row" justifyContent="space-between">
                <Text
                  sx={{ color: "#101828", fontSize: "18px", fontWeight: 500 }}
                >
                  Market to market unrealised report
                </Text>
                <ReportCardIcon />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
              
                p: "20px 24px",
                border: "1px solid #D6D6D6",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={onHoldingReportClick}
            >
              <Stack direction="row" justifyContent="space-between">
                <Text
                  sx={{ color: "#101828", fontSize: "18px", fontWeight: 500 }}
                >
                  Holding reports sample
                </Text>
                <ReportCardIcon />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
               
                p: "20px 24px",
                border: "1px solid #D6D6D6",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={onCashReportClick}
            >
              <Stack direction="row" justifyContent="space-between">
                <Text
                  sx={{ color: "#101828", fontSize: "18px", fontWeight: 500 }}
                >
                  Cash reconciliation report
                </Text>
                <ReportCardIcon />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
               
                p: "20px 24px",
                border: "1px solid #D6D6D6",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={onGlobalReportClick}
            >
              <Stack direction="row" justifyContent="space-between">
                <Text
                  sx={{ color: "#101828", fontSize: "18px", fontWeight: 500 }}
                >
                  Global report sample
                </Text>
                <ReportCardIcon />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
               
                p: "20px 24px",
                border: "1px solid #D6D6D6",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={onSampleClick}
            >
              <Stack direction="row" justifyContent="space-between">
                <Text
                  sx={{ color: "#101828", fontSize: "18px", fontWeight: 500 }}
                >
                  FnO PnL sample
                </Text>
                <ReportCardIcon />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
             
                p: "20px 24px",
                border: "1px solid #D6D6D6",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={onCapitalSampleClick}
            >
              <Stack direction="row" justifyContent="space-between">
                <Text
                  sx={{ color: "#101828", fontSize: "18px", fontWeight: 500 }}
                >
                  Capital gain statement sample
                </Text>
                <ReportCardIcon />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ReportsCard;
