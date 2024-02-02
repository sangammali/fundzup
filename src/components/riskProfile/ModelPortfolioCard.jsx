import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import StockEditIcon from "asset/icons/StockEditIcon";
import StockDeleteIcon from "asset/icons/StockDeleteIcon";
import StockCheckIcon from "asset/StockCheckIcon";

import Stack from "components/common/Stack";
import Box from "components/common/Box";
import Text from "components/common/Text";
import Link from "components/common/Link";

const ModelPortfolioCard = ({
  result,
  onAddNewStockClick,
  StockAllocationSidebar,
  openTotalCustomerDrawer,
  stockDeleteModalOpen,
  updateStockApi,
}) => {
  const [editStatus, setEditStatus] = useState({});
  const [allocationPercentValues, setAllocationPercentValues] = useState({});
  const [editCashPercent, setEditCashPercent] = useState(false);
  const [cashPercentValue, setCashPercentValue] = useState({});
  console.log({ allocationPercentValues });

  // Function to validate numeric input
  const validateNumericInput = (value) => {
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(value)) {
      return value;
    }
    return "";
  };
  const allowOnlyNumbers = (event) => {
    const sanitizedValue = event.target.value.replace(/\D/g, "");
    event.target.value = sanitizedValue;
  };
  // Cash Percent Logic
  const handleEditCashPercent = (profileIndex) => {
    setEditCashPercent((prevEditCashPercent) => {
      if (!prevEditCashPercent[profileIndex]) {
        // Store the current cash_percent value when switching from edit to non-edit mode
        setCashPercentValue((prevValues) => ({
          ...prevValues,
          [profileIndex]: result[profileIndex].cash_percent,
        }));
      }

      return {
        ...prevEditCashPercent,
        [profileIndex]: !prevEditCashPercent[profileIndex],
      };
    });
  };

  const handleCashPercentChange = (profileIndex, value) => {
    const numericValue = validateNumericInput(value);

    const sanitizedValue = numericValue > 100 ? 100 : numericValue;

    setCashPercentValue((prevValues) => {
      const newValues = {
        ...prevValues,
        [profileIndex]: sanitizedValue,
      };
      return newValues;
    });
  };

  // useEffect(() => {
  //   console.log("Updated Cash Percent Values", cashPercentValue);
  // }, [cashPercentValue]);

  // Allocation Percent Logic
  const handleEditClick = (profileIndex, stockIndex) => {
    setEditStatus((prevEditStatus) => {
      const newEditStatus = {
        ...prevEditStatus,
        [profileIndex]: {
          ...prevEditStatus[profileIndex],
          [stockIndex]: true,
        },
      };
      return newEditStatus;
    });
  };

  const handleStockCheckClick = (profileIndex, stockIndex) => {
    setEditStatus((prevEditStatus) => {
      const newEditStatus = {
        ...prevEditStatus,
        [profileIndex]: {
          ...prevEditStatus[profileIndex],
          [stockIndex]: false,
        },
      };
      return newEditStatus;
    });
  };

  const handleAllocationPercentChange = (profileIndex, stockIndex, value) => {
    console.log({ profileIndex, stockIndex, value });
    const numericValue = validateNumericInput(value);

    const sanitizedValue = numericValue > 100 ? 100 : numericValue;

    setAllocationPercentValues((prevValues) => {
      const newValues = {
        ...prevValues,
        [profileIndex]: {
          ...prevValues[profileIndex],
          [stockIndex]: sanitizedValue,
        },
      };
      return newValues;
    });
  };

  useEffect(() => {
    console.log("Updated Allocation Percent Values", allocationPercentValues);
  }, [allocationPercentValues]);

  const handleAddNewStockClick = (profileIndex) => {
    const updatedProfile = {
      ...result[profileIndex],
      cash_percent: editCashPercent
        ? cashPercentValue[profileIndex]
        : result[profileIndex].cash_percent,
      model_portfolio_details: result[profileIndex].model_portfolio_details.map(
        (stock, stockIndex) => {
          // const edited = editStatus[profileIndex]?.[stockIndex];
          const allocationPercent =
            allocationPercentValues[profileIndex]?.[stockIndex];

          // if ()
          return {
            ...stock,
            allocation_percent:
              allocationPercent !== undefined
                ? allocationPercent
                : stock.allocation_percent,
            // : stock.allocation_percent,
          };
        }
      ),
    };

    console.log({ updatedProfile });

    onAddNewStockClick(updatedProfile);
  };

  useEffect(() => {
    console.log("Updated Allocation Percent Values", allocationPercentValues);
    console.log("Updated Cash Percent Values", cashPercentValue);
  }, [allocationPercentValues, cashPercentValue]);

  const handleSaveClick = (profileIndex, stockIndex) => {
    console.log({ profileIndex, stockIndex });
    setEditStatus((prevEditStatus) => {
      const newEditStatus = {
        ...prevEditStatus,
        [profileIndex]: {
          ...prevEditStatus[profileIndex],
          [stockIndex]: false,
        },
      };
      return newEditStatus;
    });
  };
  if (!result || !Array.isArray(result)) {
    return <div>Loading...</div>;
  }
  return (
    <Grid mt={2} container spacing={3}>
      {result?.map((profile, profileIndex) => (
        <Grid item xs={12} sm={6} md={4} key={profileIndex}>
          <Card>
            <CardContent>
              <Box
                mx={-4}
                mt={-2}
                sx={{
                  p: "36px 48px",
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: `${profile.product_category_color}`,
                }}
              >
                <Typography variant="h6" component="div" gutterBottom>
                  {profile.product_category_name}
                </Typography>
                <Button
                  sx={{
                    mt: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "10px 28px",
                    borderRadius: "88px",
                    width: "100%",
                    border: "1px solid #CBCBCB",
                    backgroundColor: "#F7F8FF",
                    color: "#142E56",
                    fontSize: "14px",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: "#F7F8FF" },
                    textTransform: "capitalize",
                  }}
                  onClick={() =>
                    openTotalCustomerDrawer(profile.risk_profile_id)
                  }
                >
                  <span>Total Customers: {profile.customer_count}</span>
                </Button>
              </Box>

              {/* Cash Percent Section */}
              <Box sx={{ py: "16px" }}>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      backgroundColor: "#E5EEFF",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ marginRight: 1, fontSize: "16px" }}>
                      Cash component
                    </Text>
                    <TextField
                      sx={{
                        width: "100px",
                        backgroundColor: editCashPercent[profileIndex]
                          ? "#FFF"
                          : "transparent",
                      }}
                      variant="outlined"
                      size="small"
                      value={
                        cashPercentValue[profileIndex] !== undefined
                          ? cashPercentValue[profileIndex]
                          : result[profileIndex].cash_percent
                      }
                      onInput={allowOnlyNumbers}
                      onChange={(e) =>
                        handleCashPercentChange(
                          profileIndex,
                          validateNumericInput(e.target.value)
                        )
                      }
                      InputProps={{
                        style: { fontSize: "16px" },
                        endAdornment: (
                          <>
                            <span style={{ marginRight: "15px" }}>%</span>
                            <StockEditIcon
                              sx={{
                                width: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleEditCashPercent(profileIndex)
                              }
                            />
                          </>
                        ),
                      }}
                      disabled={!editCashPercent[profileIndex]}
                    />
                  </Box>
                </Box>
              </Box>

              <List sx={{ minHeight: "300px" }}>
                {profile.model_portfolio_details.map((stock, stockIndex) => (
                  <ListItem key={stockIndex}>
                    {/* Stock Details */}
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      {/* Stock Symbol and Quantity */}
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#242424",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          {stock.symbol}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#676C76",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          20000
                        </Typography>
                      </Stack>

                      {/* Allocation Percentage Input */}
                      <TextField
                        sx={{
                          width: "131px",
                          backgroundColor: "white",
                          ml: 8,
                          textAlign: "center",
                        }}
                        variant="outlined"
                        size="small"
                        disabled={!editStatus[profileIndex]?.[stockIndex]}
                        value={
                          allocationPercentValues[profileIndex]?.[
                            stockIndex
                          ] !== undefined
                            ? allocationPercentValues[profileIndex]?.[
                                stockIndex
                              ]
                            : stock.allocation_percent
                        }
                        onChange={(e) =>
                          handleAllocationPercentChange(
                            profileIndex,
                            stockIndex,
                            validateNumericInput(e.target.value)
                          )
                        }
                        InputProps={{
                          style: { fontSize: "16px", textAlign: "center" },
                          endAdornment: (
                            <>
                              <span style={{ marginRight: "45px" }}>%</span>
                              {/* Show StockCheckIcon when in edit mode */}
                              {editStatus[profileIndex]?.[stockIndex] && (
                                <StockCheckIcon
                                  sx={{
                                    backgroundColor: "#142E56",
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleSaveClick(profileIndex, stockIndex)
                                  }
                                />
                              )}

                              {/* Show StockEditIcon and StockDeleteIcon when not in edit mode */}
                              {!editStatus[profileIndex]?.[stockIndex] && (
                                <>
                                  <StockEditIcon
                                    sx={{ width: "20px", cursor: "pointer" }}
                                    onClick={() =>
                                      handleEditClick(profileIndex, stockIndex)
                                    }
                                  />
                                </>
                              )}
                            </>
                          ),
                        }}
                      />
                    </Stack>
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Button
                  children="save"
                  sx={{
                    width: "100%",
                    mt: 2,
                    color: "white",
                    fontSize: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#142E56",
                    "&:hover": { backgroundColor: "#142E56" },
                    textTransform: "capitalize",
                  }}
                  onClick={() => updateStockApi(profile)}
                />
                <Button
                  sx={{
                    width: "100%",
                    backgroundColor: "#FFF",
                    color: "#142E56",
                    mt: 2,
                    fontSize: "16px",
                    border: "1px solid #142E56",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#FFF" },
                    textTransform: "capitalize",
                  }}
                  onClick={() => handleAddNewStockClick(profileIndex)}
                >
                  Add&nbsp;
                  <span style={{ textTransform: "lowercase" }}>new stock</span>
                </Button>

                <Link
                  href="#"
                  onClick={StockAllocationSidebar}
                  sx={{
                    mt: 2,
                    color: "#1A54B9",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  View summary
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ModelPortfolioCard;
