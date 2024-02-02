import React from "react";
import Stack from "./Stack";
import { Typography } from "@mui/material";
// import Checkbox from "@mui/material/Checkbox";
import CheckboxTick from "./CheckboxTick";
import Box from "@mui/material/Box";
import Checkbox from "./Checkbox";

// import { Checkbox as MCheckbox } from '@mui/material';

function CheckboxCommon(props) {
  const { value = false, title = "-", handleClick = () => {} } = props;
  return (
    <>
      <Stack direction="row">
        <Checkbox
          size="small"
          sx={{ padding:'0px'}}
          checked={value}
          onClick={handleClick}
        />
        <Typography
          sx={{
            variant: "small",
            component: "h4",
            fontSize: "14px",
            fontWeight: "500",
            pl: "5px",
          }}
        >
          {title}
        </Typography>
      </Stack>
    </>
  );
}

export default CheckboxCommon;
