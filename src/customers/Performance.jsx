import React, { useState } from "react";
import Grid from "components/common/Grid";
import Stack from "components/common/Stack";
import InvestmentTypeCard from "components/customerCard/CustomerInvestment";
// import DashboardGraphCard from "components/dashboard/InvestmentStats";
import TradeCards from "components/customerCard/TradesCard";
import { useNavigate } from "react-router";
import Paper from "components/common/Paper";
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

const cardData = [
  {
    id: 1,
    name: "Amount Invested",
    value: "₹ 1,50,000",
    percentage: "",
    display: "column",
    xs: 2.4,
  },
  {
    id: 2,
    name: "Current value",
    value: "₹ 1,50,000",
    percentage: "",
    display: "column",
    xs: 2.4,
  },
  {
    id: 3,
    name: "Profit",
    value: "₹ 50,000",
    percentage: "",
    display: "column",
    xs: 2.4,
  },
  {
    id: 4,
    name: "Today Gain",
    value: "₹50,000",
    percentage: "15%",
    display: "column",
    xs: 2.4,
  },
  {
    id: 5,
    name: "Annualized returns",
    value: "  ",
    percentage: "15%",
    display: "column",
    xs: 2.4,
  },
];

const investmentCardData = [
  {
    id: 1,
    name: "Model Portfolio",
    value1: "Amount invested",
    value2: "Current value",
    value3:"₹ 50,00,000",
    value4: "₹ 50,00,000 ",
    percentage: "20%",
    display: "column",
    xs: 4,
  },
  {
    id: 2,
    name: "Algo",
    value1: "Amount invested",
    value2: "Current value",
    value3: "₹ 50,00,000",
    value4: "₹ 50,00,000 ",
    percentage: "20%",
    display: "flex",
    xs: 4,
  },
  {
    id: 3,
    name: "Model Portfolio",
    value1: "Amount invested",
    value2: "Current value",
    value3:"₹ 50,00,000",
    value4: "₹ 50,00,000 ",
    percentage: "20%",
    display: "flex",
    xs: 4,
  },
];

const graphCardData = [
  {
    id: 1,
    name: "Algo (F&O) Progress",
    chart: "/images/Graph2.svg",
    display: "column",
    xs: 6,
  },
  {
    id: 2,
    name: "Customer Progress till Date",
    chart: "/images/Graph2.svg",
    display: "flex",
    xs: 6,
  },
];

const GraphData = [
  {
    id: 1,
    name: "Algo (F&O) Progress",
    chart: "/images/Graph2.svg",
    display: "column",
    xs: 6,
  },
  {
    id: 2,
    name: "Customer Progress till Date",
    chart: "/images/Graph2.svg",
    display: "flex",
    xs: 6,
  },
];

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
              <img src={data.chart} alt="chart" min-width="128px" />
            {/* <BasicPie pieData={pieData} /> */}
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

const Performance = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClickDetail = () => {
    console.log("check for navigate")
    navigate("/investment-summary");
  };

  return (
    <Stack style={{ marginTop: "10px" }}>
      <Grid sx={{ mb: 3 }} container spacing={2}>
        {cardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <TradeCards data={element} onClick={handleClickDetail} />
          </Grid>
        ))}
      </Grid>

      <Grid sx={{ mb: 3 }} container spacing={2}>
        {investmentCardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`} onClick={handleClickDetail}>
            <InvestmentTypeCard data={element}  />
          </Grid>
        ))}
      </Grid>

      <Grid sx={{ mb: 3 }} container spacing={2}>
        {graphCardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <InvestmentStats data={element} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Performance;
