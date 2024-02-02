import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Chip } from "@mui/material";
import Dialog from "components/common/Dialog";
import Text from "components/common/Text";

const AddNewStockModal = ({ onClose, onSave, open, formData, setFormData }) => {
  const handleNumericInput = (input) => {
    let numericValue = input.replace(/[^0-9]/g, "");
    numericValue = Math.min(parseInt(numericValue), 100).toString();
    return numericValue;
  };

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
              Add new stock
            </Text>

            <Chip
              label="High risk stock"
              sx={{
                color: "#142E56",
                borderRadius: "128px",
                backgroundColor: "#E5EEFF",
                fontSize: "14px",
                fontWeight: 500,
                ml: 1,
                mb: 4,
              }}
            />
          </Box>

          <Box>
            <Text
              sx={{
                color: "#242424",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Stock name
            </Text>
            <TextField
              sx={{
                fontSize: "16px",
                color: "#676C76",
                fontWeight: 400,
                width: "100%",
              }}
              placeholder="Enter stock name"
              value={formData.newStockName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newStockName: e.target.value,
                })
              }
            />

            <Text
              sx={{
                color: "#242424",
                fontSize: "14px",
                fontWeight: 500,
                mt: 2,
              }}
            >
              % allocated to the stock
            </Text>
            <TextField
              sx={{ width: "100%" }}
              placeholder="Enter % allocated to the stock"
              value={formData.allocationPercent}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  allocationPercent: handleNumericInput(e.target.value),
                })
              }
            />
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
              onSave(formData.newStockName, formData.allocationPercent);
              // Add any additional logic or API calls here
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

export default AddNewStockModal;
