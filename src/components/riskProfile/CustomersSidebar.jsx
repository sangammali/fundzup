import React from "react";
import SideDrawer from "components/common/SideDrawer";
import Box from "components/common/Box";
import Text from "components/common/Text";
import { Chip, styled } from "@mui/material";

const CustomersBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFF",
  borderRadius: "8px",
  padding: "14px 16px",
  width: "415px",
  border: "1px solid #E2E2E2",
  gap: "12px",
  mt: "12px",
}));

const ChipStyle = styled(Chip)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "#FFF5E0",
  borderRadius: "152px",
  color: "#E58026",
  fontSize: "12px",
  fontWeight: 500,
  "&::before": {
    position: "relative",
    left: 6,
    bottom: 6,
    content: '"\\2022"',
    width: "6px",
    height: "6px",
    color: "#F2994A",
  },
}));

const CustomerSidebar = ({ customers, open, closeDrawer }) => (
  <SideDrawer
    open={open}
    closeDrawer={closeDrawer}
    drawerWidth="500"
    title={
      <div
        style={{
          color: "#FFFFFF",
          fontSize: "24px",
          fontWeight: 600,
          marginLeft: "10px",
        }}
      >
        All customers
      </div>
    }
    subtitle={
      <div
        style={{
          color: "#FFFFFF",
          fontSize: "14px",
          fontWeight: 400,
          marginLeft: "10px",
        }}
      >
        See all the customers here having a model portfolio.
      </div>
    }
    submitButtonText="Save"
  >
    <Box>
      <Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
        {customers && Array.isArray(customers)
          ? `${customers.length} customers of High-risk product stocks`
          : "Loading..."}
      </Text>
    </Box>
    {customers &&
      Array.isArray(customers) &&
      customers.map((customer) => (
        <CustomersBox key={customer.id}>
          <Text
            sx={{
              fontSize: "14px",
              color: "#242424",
              fontWeight: 400,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {customer.name}
            {!customer.isActionTaken && (
              <ChipStyle label="Action Pending" size="small" />
            )}
          </Text>
        </CustomersBox>
      ))}
  </SideDrawer>
);

export default CustomerSidebar;
