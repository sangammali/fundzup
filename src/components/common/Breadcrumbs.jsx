import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CustomSeparator({ link, Breadcrumb, handleClick, href }) {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href={href}  // Use the dynamic href from props
      onClick={handleClick}
    >
      {link}
    </Link>,
    <Typography key="3" color="text.primary">
      {Breadcrumb}
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          p: "16px 24px",
          backgroundColor: "#E5EEFF",
          borderBottom: "1px solid #D1D1D1",
          maxWidth: "calc(100% + 80px)",
          margin: "0 -24px",
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
