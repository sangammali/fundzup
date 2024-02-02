import React from "react";
import Box from "components/common/Box";
import Grid from "components/common/Grid";
import ChangeRiskCard from "components/common/RiskCard";
import Button from "components/common/Button";

const ChangeRisk = ({ handleRiskProfileChange, selectedRisk }) => {
  const riskcarddata = [
    {
      id: 1,
      name: "Aggressive risk profile ",
      chart: "/images/aggressive.svg",
      des: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent ",
      xs: 3,
      nameColor: "#EB5757",
    },
    {
      id: 2,
      name: "Moderate risk profile ",
      chart: "/images/moderate.svg",
      des: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent ",
      xs: 3,
      nameColor: "#F2994A",
    },
    {
      id: 3,
      name: "Conservative risk profile ",
      chart: "/images/conservative.svg",
      des: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent ",
      xs: 3,
      nameColor: "#219653",
    },
  ];

  return (
    <Box>
      <Box display="flex" flexDirection="row" mb={4}>
        <Grid container spacing={2}>
          {riskcarddata.map((element, index) => (
            <Grid item xs={4} key={`cards_index_${element.id}`}>
              <ChangeRiskCard
                selectedRisk={selectedRisk}
                onClick={handleRiskProfileChange}
                data={element}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <Button
          sx={{
            background: "#142E56",
            color: "white",
            "&:hover": {
              background: "#142E56",
            },
            padding: "13px 28px",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "8px",
          }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeRisk;
