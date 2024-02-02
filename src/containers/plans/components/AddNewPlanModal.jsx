// AddNewPlanModal.js

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import Dialog from "components/common/Dialog";
import Text from "components/common/Text";

const AddNewPlanModal = ({
  onClose,
  onSave,
  open,
  newStockName,
  setNewStockName,
  minAmountFrom,
  setMinAmountFrom,
  maxAmountTo,
  setMaxAmountTo,
}) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      title=""
      disableCloseIcon
      maxWidth="sm"
      sx={{ borderRadius: "10px" }}
      contentComponent={() => (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "50px",
            }}
          >
            <Text
              sx={{
                color: "#101828",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Save Plan
            </Text>
          </Box>

          <Box>
            <Text
              sx={{
                color: "#242424",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Plan Name
            </Text>
            <TextField
              sx={{
                fontSize: "16px",
                color: "#676C76",
                fontWeight: 400,
                width: "100%",
                mt: 1, // Add margin-top for spacing
              }}
              placeholder="Enter Plan name here"
              value={newStockName}
              onChange={(e) => setNewStockName(e.target.value)}
            />

            <Text
              sx={{
                color: "#242424",
                fontSize: "14px",
                fontWeight: 500,
                mt: 2,
              }}
            >
              Plan is applicable for the amount range of
            </Text>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                sx={{ width: "45%", mt: 1 }} // Add margin-top for spacing
                placeholder="Eg. from ₹ 50L"
                value={minAmountFrom}
                onChange={(e) => setMinAmountFrom(e.target.value)}
              />
              <TextField
                sx={{ width: "45%", mt: 1 }} // Add margin-top for spacing
                placeholder="Eg. from ₹ 50L"
                value={maxAmountTo}
                onChange={(e) => setMaxAmountTo(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      )}
      actionComponent={() => (
        <Box mb={2}>
          <Button
            onClick={onClose}
            disableEndIcon={false}
            variant="outlined"
            size="large"
            m={0.5}
            sx={{
              borderRadius: "8px",
              border: "1px solid #142E56",
              fontSize: "16px",
              fontWeight: 600,
              width: "46%",
              ml: 2,
              mr: 2,
              textTransform: "capitalize",
            }}
          >
            No
          </Button>

          <Button
            onClick={() => {
              onClose();
              onSave();
            }}
            disableEndIcon={false}
            variant="outlined"
            size="large"
            m={0.5}
            sx={{
              borderRadius: "8px",
              border: "1px solid #142E56",
              backgroundColor: "#142E56",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 600,
              width: "46%",
              "&:hover": { backgroundColor: "#142E56" },
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        </Box>
      )}
    />
  );
};

export default AddNewPlanModal;
