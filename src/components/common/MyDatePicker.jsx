import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import { DateRangePicker } from "@wojtekmaj/react-daterange-picker";

function MyDatePicker({ onDateRangeChange }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const datePickerClassName = "my-date-picker";

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
    onDateRangeChange(newDateRange);
  };

  const datePickerStyles = {
    width: "500px",
    // backgroundColor: "#FFFFFF",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "20px",
  };
  return (
    <div style={datePickerStyles}>
      <DateRangePicker
        clearIcon={null}
        onChange={handleDateChange}
        value={dateRange}
        className={datePickerClassName}
        classes={{}}
      />
    </div>
  );
}

export default MyDatePicker;
