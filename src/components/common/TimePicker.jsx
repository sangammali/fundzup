import React from "react";
import TextField from "components/common/TextField";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { styled } from "@mui/material";

const StyledTimePicker = styled(DesktopTimePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "8px !important",
  },
}));

function TimePicker({ error = "", value, onChange, name = "", textFieldProps = {}, ...restProps }) {
  return (
    <StyledTimePicker
      value={value}
      onChange={onChange}
      {...restProps}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          helperText={restProps.helperText}
          error={error}
        />
      )}
    />
  );
}

export default React.memo(TimePicker);
