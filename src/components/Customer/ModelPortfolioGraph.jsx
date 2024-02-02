import React from "react";
import Box from "components/common/Box";
import Text from "components/common/Text";

function ModelPortfolioGraph() {
  return (
    <>
      <Box
        sx={{
          p: 4,
          border: "1px solid #E7E7E7",
          borderRadius: "12px",
          backgroundColor: "#FFF",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "36px" }}
        >
          <Text sx={{ color: "#242424", fontsize: "20px", fontweight: 500 }}>
            Model portfolio progress
          </Text>
          <Box
            sx={{
              display: "flex",
              padding: "10px 16px",
              width: "120px",
              height: "26px",
              border: "1px solid #D0D5DD",
              borderRadius: "8px",
              gap: "8px",
            }}
          >
            <Box
              component="img"
              sx={{ height: "20px", width: "20px" }}
              alt="Add Filter Icon"
              src="/images/addFilterIcon.svg"
            />
            <Text sx={{ color: "#242424", fontsize: "10px", fontweight: 600 }}>
              Add Filters
            </Text>
          </Box>
        </Box>

        <Box
          component="img"
          sx={{ width: "100%" }}
          alt="Model Portfolio Graph"
          src="/images/ModelPortfolioGraph.jpg"
        />
      </Box>
    </>
  );
}

export default ModelPortfolioGraph;
