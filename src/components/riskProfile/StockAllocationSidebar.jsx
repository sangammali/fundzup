// StockAllocationSidebar.jsx
import React from "react";
import SideDrawer from "components/common/SideDrawer";
import Box from "components/common/Box";
import Text from "components/common/Text";

const StockAllocationSidebar = ({ netLiquidValue, open, closeDrawer }) => (
  <SideDrawer
    open={open}
    closeDrawer={closeDrawer}
    drawerWidth="800"
    title={
      <div
        style={{
          color: "#FFFFFF",
          fontSize: "24px",
          fontWeight: 600,
          marginLeft: "10px",
        }}
      >
        Summary of High Risk Stocks{" "}
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
        Here you can see all the details regarding high risk stocks.
      </div>
    }
    contentTitle=""
    cancelButtonText="Close"
    submitButtonText="Save"
    sx={{ color: "red" }}
  >
    <Box
      sx={{
        backgroundColor: "#EBFFF3",
        borderRadius: "8px",
        padding: "12px 16px",
        width: "728px",
      }}
    >
      <Text sx={{ fontSize: "14px", color: "#219653", fontWeight: 500 }}>
        The asset allocation of the portfolio is made by considering the
        complete portfolio worth ₹ 1 Cr{" "}
      </Text>
    </Box>

    <Box
      sx={{
        backgroundColor: "#F7F8FF",
        borderRadius: "16px",
        padding: "17px",
        width: "728px",
      }}
    >
      <Text sx={{ fontSize: "18px", color: "#101828", fontWeight: 500 }}>
        Net Liquid Value of the portfolio{" "}
      </Text>
      <Text
        sx={{
          fontSize: "14px",
          color: "#676C76",
          fontWeight: 500,
          marginTop: "5px",
        }}
      >
        Net liquid value reflects the current market price of all the holdings
        in your portfolio.
      </Text>
      <Text
        sx={{
          fontSize: "26px",
          color: "#219653",
          fontWeight: 600,
          marginTop: "15px",
        }}
      >
        ₹ {netLiquidValue}
      </Text>
    </Box>
  </SideDrawer>
);

export default StockAllocationSidebar;
