import React from "react";
import Paper from "components/common/Paper";
import Stack from "components/common/Stack";
import Text from "components/common/Text";

const InvsestmentTypeCard = ({ data, onClick }) => {
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
      onClick={onClick}
    >
      <Text
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#242424",
        }}
      >
        {data?.name}
      </Text>

      <Stack sx={{ marginTop: "12px" }}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#676C76",
            }}
          >
            {data?.value1}
          </Text>

          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#242424",
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
              marginTop: "3px",
            }}
          >
            {data?.value2}
          </Text>

          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#242424",
            }}
          >
            {data?.value4}
            <span
              style={{ color: "#219653", fontWeight: 600, fontSize: "11px" }}
            >
              20%
            </span>
          </Text>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default InvsestmentTypeCard;
