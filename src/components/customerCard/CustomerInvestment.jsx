import React from "react";
import Paper from "components/common/Paper";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CustomerInvestment = ({ data }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        alignItems: "center",
        p: 3,
        width: "auto",
        backgroundColor: "white",
        border: "1px solid white",
        height: "auto",
        ':hover': {
          boxShadow: '0 0 10px rgba(229, 238, 255, 1)',
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between">
      <Text
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#242424",
        }}
      >
        {data?.name}
      </Text>     
      <NavigateNextIcon/>
      </Stack>
      <Stack >
        <Stack direction="row" justifyContent={"space-between"}>
          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#676C76",
              marginTop: "10px"
            }}
          >
            {data?.value1}
          </Text>

          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#242424",
              marginTop:'10px'
            }}
          >
            {data?.value3}
          </Text>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#676C76",
              marginTop: "10px",
            }}
          >
            {data?.value2}
          </Text>

          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#219653",
              marginTop: '10px'
            }}
          >
            {data?.value4}
            {/* <span
              style={{ color: "#219653", fontWeight: 600, fontSize: "11px" }}
            >
              20%
            </span> */}
          </Text>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CustomerInvestment;
