// import Breadcrumbs from "components/common/Breadcrumbs";
import Text from "components/common/Text";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "components/common/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "components/common/Box";
import { useSelector } from "react-redux";
import { fontWeight } from "@mui/system";

function handleClick(event) {
  event.preventDefault();
}

export default function CustomBreadcrumb({
  link,
  Breadcrumb1,
  Breadcrumb2,
  handleClick,
}) {
  const select = useSelector((state) => state.customers);
  const breadcrumbs = [
    <Link
      underline="hover"s
      key="1"
      color="inherit"
      href="/customers"
      onClick={handleClick}
    >
      {link}
    </Link>,
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/customer-detail"
      onClick={handleClick}
    >
      <Text>
    {Breadcrumb1}
    </Text>
    </Link>,
    <Text key="3" color="text.primary">
      {Breadcrumb2}
    </Text>,
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#E5EEFF",
        width: "120%",
        marginLeft: "-24px",
        padding: "10px",
      }}
    >
      <Breadcrumbs
        separator={
          <NavigateNextIcon fontSize="small" style={{ color: "#9C9C9C" }} />
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
}
