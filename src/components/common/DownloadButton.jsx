import React from "react";
import Button from "./Button";
import DownloadIcon from "asset/icons/DownloadIcon";
import FileIcon from "asset/icons/FileIcon";
import { styled } from "@mui/system";
import Stack from "components/common/Stack";
import Box from "./Box";

const StyledDownloadButton = styled(Button)(({ theme }) => ({
  width: "100%",
  border: "1px solid #cbcbcb",
  backgroundColor: "#F9FAFB",
  fontSize: "14px",
  padding: "9px 20px",
  borderRadius: "8px",
  color: "#101828",
  "&:hover": {
    backgroundColor: "#F9FAFB",
    outline: 10,
    borderColor: "#cbcbcb",
  },
}));

const DownloadButton = (props) => {
  return (
    <StyledDownloadButton variant="outlined" {...props}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
        onClick={props.handleDownload}
      >
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={4}
        >
          <FileIcon sx={{ pr: 1, fontSize: "30px" }} />
          <div
            style={{
              width: "180px",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              marginLeft: "0px",
            }}
          >
            {props.children}
          </div>
        </Stack>
        <Stack direction="row" justifyContent="start" alignItems="center">
          <DownloadIcon />
        </Stack>
      </Stack>
    </StyledDownloadButton>
  );
};

export default React.memo(DownloadButton);
