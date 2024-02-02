import React from "react";
import Box from "components/common/Box";
import Grid from "components/common/Grid";
import ChangeRiskCard from "components/common/RiskCard";
import Button from "components/common/Button";
import { riskCardData } from "helpers/constants";
import Stack from "components/common/Stack";
import { styled } from "@mui/material";

const ConfirmButton = styled(Button)(({}) => ({
  padding:"18px 28px",
  width:"260px",
  fontWeight:600,
  fontSize:"14px",
  borderRadius: "8px",
}));

const ChangeRisk = ({
  handleRiskProfileChange,
  handleRiskProfileSubmit,
  selectedRisk,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        {riskCardData.map((element, index) => (
          <Grid item xs={4} key={`cards_index_${element.id}`}>
            <ChangeRiskCard
              selectedRisk={selectedRisk}
              onClick={handleRiskProfileChange}
              data={element}
            />
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
        <ConfirmButton
          onClick={() => {
            handleRiskProfileSubmit();
          }}
        >
          Confirm
        </ConfirmButton>
      </Stack>
    </>
  );
};

export default ChangeRisk;
