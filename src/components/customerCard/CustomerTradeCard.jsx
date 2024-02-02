import React from "react";
import Paper from "components/common/Paper";
import Stack from "components/common/Stack";
import Text from "components/common/Text";

const CustomerTradeCard = ({ data }) => {
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
      }}
    >
      <Text
        sx={{
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {data?.name}
      </Text>
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          sx={{ marginTop: "22px" }}
        >
          <Text
            sx={{
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            {data?.value}
          </Text>
          <Text
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              marginTop: "11px",
              marginLeft: "6px",
            }}
          >
            {data?.percentage}
          </Text>
        </Stack>
        <img src={data?.chart} alt="chart" min-width="128px" />
      </Stack>
    </Paper>
  );
};

export default CustomerTradeCard;
