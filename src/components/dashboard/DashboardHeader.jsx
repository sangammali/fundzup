import DatePicker from "components/common/DatePicker";
import MyDatePicker from "components/common/MyDatePicker";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import { useState } from "react";
// import { DateRange } from 'react-date-range';

const today = new Date();
const DashboardHeader = ({handleDateRangeChange,userName}) => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%", mb: "20px", mt: "24px" }}
      >
        <Stack>
          <Text variant="title">Welcome,  {userName} 👋</Text>
          <Text variant="body2" sx={{ color: "#676C76" }}>
            We are glad to see you here, thankyou for choosing us.
          </Text>
        </Stack>
        {/* <DatePicker /> */}
        <MyDatePicker onDateRangeChange={handleDateRangeChange} />

      </Stack>
    </>
  );
};

export default DashboardHeader;
