// DataHeader.js

import React from "react";
import Box from "./Box";
import Stack from "./Stack";
import Text from "./Text";
import Button from "./Button";

const DataAdding = ({
  totalCount,
  headerText,
  subheaderText,
  addDataText,
  onAddDataClick,
  title,
  startIcon,
}) => {
  return (
    <Box>
      <Stack
        sx={12}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        px={3}
        py={2}
        bgcolor="common.white"
      >
        <Box textAlign="left">
          <Box display="flex" flexDirection="row">
            <Text variant="typo18" color="text.primary">
              {headerText}
            </Text>
            <Text
              ml={1}
              px={1}
              sx={{ borderRadius: "16px" }}
              backgroundColor="#E5F7FF"
              variant="typo12"
              color="#104960"
            >
              {totalCount} {title}
            </Text>
          </Box>
          <Text variant="typo14light" color="text.secondary">
            {subheaderText}
          </Text>
        </Box>
        <Box textAlign="right">
          {addDataText && (
            <Button
              sx={{ padding: "10px,16px" }}
              color="primary"
              size="medium"
              startIcon={startIcon}
              children={addDataText}
              onClick={onAddDataClick}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default DataAdding;
