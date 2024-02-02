// StockDeleteConfirmationDialog.js

import React from "react";
import { Box, Button } from "@mui/material";
import Dialog from "components/common/Dialog";
import Warning from "asset/icons/Warning";
import Text from "components/common/Text";

const DeleteStockModal = ({ onClose, onConfirm,open }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title=""
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Warning />
        <Text
          sx={{
            fontSize: "20px",
            color: "#101828",
            fontWeight: 600,
            mt: 3,
          }}
        >
          Are you sure you want to delete this stock?
        </Text>
        <Text
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#667085",
            mt: 1,
            textAlign: "center",
          }}
        >
          By clicking on the yes button you are making sure that you
          want to delete this stock permanently.
        </Text>
      </Box>

      <Button
        variant="outlined"
        onClick={onClose}
        sx={{
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#FFFFFF" },
          mt: 2,
          textTransform: "capitalize",
          borderRadius: "8px",
          p: "18px 20px",
          color: "#142E56",
          width: "46%",
          ml: 2,
          mr: 2,
          mt: 4,
        }}
      >
        No
      </Button>

      <Button
        variant="contained"
        onClick={onConfirm}
        sx={{
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#142E56" },
          mt: 2,
          textTransform: "capitalize",
          borderRadius: "8px",
          p: "18px 20px",
          color: "#FFFFFF",
          width: "46%",
          mt: 4,
        }}
      >
        Yes, delete
      </Button>
    </Dialog>
  );
};

export default DeleteStockModal;
