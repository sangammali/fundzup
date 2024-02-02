import { styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import List from "components/common/List";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import ListItem from "components/common/ListItem";
import ListItemButton from "components/common/ListItemButton";
import ListItemIcon from "components/common/ListItemIcon";
import ListItemText from "components/common/ListItemText";
import Radio from "components/common/Radio";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Box from "components/common/Box";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import TextField from "components/common/TextField";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import { set } from "lodash";

const StyledListItem = styled(ListItem)(({ theme, isSelected }) => ({
  border: "2px solid ",
  borderColor: isSelected ? "#1A54B9" : "#CBCBCB",
  margin: "8px 0",
  borderRadius: "8px",
  backgroundColor: isSelected ? "#EAF2FF" : "inherit",
}));

const ManageCash = ({
  viewCustomerDetail,
  customer_id,
  closeManageDrawer,
  isManageCashDrawerOpen,
  setIsManageCashDrawerOpen,
}) => {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedProductValue, setSelectedProductIdValue] = React.useState("");
  const [selectSwap, setSelectSwap] = React.useState("");
  const [selectProductIdSwap, setSelectProductIdSwap] = React.useState(-1);
  const [showNewFields, setShowNewFields] = useState(false);
  const [amount, setAmount] = useState("");
  const [product_name, setProduct_name] = useState("");
  const [sendAmounts, setSendAmounts] = useState({
    transferAmount: "",
    categoryAmounts: {}, // Object to store amounts for each category
  });
  const disabledProductIds =
    viewCustomerDetail?.investmentDetails?.map(
      (investment, index) => investment.product_id
    ) || [];

  // ------------------API----------- //
  const [postManageCash] = customersApiAction.postManageCash();
  const productId = customersApiAction.getProductId();
  const productIdList = productId?.data?.products;

  // --------------------Function ----------------- //
  const handleChange = (field, value, categoryId) => {
    setSendAmounts((prevAmounts) => ({
      ...prevAmounts,
      [field]: categoryId
        ? { ...prevAmounts[field], [categoryId]: value }
        : value,
    }));
  };

  const handleRadioChange = (index, productId, amount, product_name) => {
    setSelectSwap(index);
    setSelectedValue((prevProductId) =>
      prevProductId === productId ? "" : productId
    );
    setAmount(amount);
    setProduct_name(product_name);
  };

  const handleRadioSelect = (index, productId) => {
    setSelectProductIdSwap(index);
    setSelectedProductIdValue(productId);
  };
  const handleContinue = () => {
    setShowNewFields(true);
  };

  const handleSubmit = async () => {
    let payload = {
      user_id: customer_id,
      from: {
        product_id: selectSwap,
        amount: amount,
        product_category: [],
      },
      to: {
        product_id: selectProductIdSwap,
        amount: sendAmounts.transferAmount,
        product_category:
          selectProductIdSwap !== undefined && selectProductIdSwap === 2
            ? Object.entries(sendAmounts.categoryAmounts).map(
                ([product_category_id, amount]) => ({
                  product_category_id,
                  amount,
                })
              )
            : [],
      },
    };
    console.log("pay checked", payload);
    try {
      const saveResponse = await postManageCash(payload).unwrap();
      setIsManageCashDrawerOpen(false);
      setSelectedValue("");
      setSelectSwap("");
      setShowNewFields(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Stack>
      {isManageCashDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isManageCashDrawerOpen}
          closeDrawer={closeManageDrawer}
          title="Manage cash"
          contentTitle=""
          cancelButtonText="Cancel"
          submitButtonText={showNewFields ? "Save" : "Continue"}
          handleSubmit={showNewFields ? handleSubmit : handleContinue}
          subtitle="Here you can edit the Investment type."
        >
          {!showNewFields ? (
            <Box>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <Chip
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    borderRadius: "2px",
                  }}
                  color="secondary"
                  label={
                    <Text
                      variant="small"
                      fontSize="16px"
                      fontWeight="500"
                    >{`Cash transfer from :`}</Text>
                  }
                ></Chip>
                <Stack>
                  {viewCustomerDetail?.investmentDetails.map(
                    (investment, index) => (
                      <StyledListItem
                        key={index + 1}
                        style={{ padding: "10px" }}
                        isSelected={selectSwap === index + 1}
                        disablePadding
                      >
                        <ListItemButton
                          role={undefined}
                          onClick={() =>
                            handleRadioChange(
                              index + 1,
                              investment.product_id,
                              investment.investment_amount,
                              investment.product_name
                            )
                          }
                          dense
                        >
                          <ListItemText
                            primary={
                              <Text fontSize="14px" fontWeight="600">
                                {investment.product_name} :{" "}
                                {investment.investment_amount}
                              </Text>
                            }
                          />
                          <ListItemIcon>
                            <Box style={{ marginLeft: "28px" }}>
                              <Radio
                                checked={selectSwap === index + 1}
                                tabIndex={-1}
                                disableRipple
                                sx={{
                                  "&.Mui-checked": {
                                    color: "black",
                                  },
                                }}
                                inputProps={{
                                  "aria-labelledby": investment.product_id,
                                }}
                              />
                            </Box>
                          </ListItemIcon>
                        </ListItemButton>
                      </StyledListItem>
                    )
                  )}
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={1}
                  sx={{ width: "100%", marginTop: "28px" }}
                  alignItems="center"
                  marginTop="25px"
                >
                  <Box style={{ color: "grey" }}>
                    <ImportExportIcon />
                  </Box>
                </Stack>
              </List>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <Chip
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    borderRadius: "2px",
                  }}
                  color="secondary"
                  label={
                    <Text
                      variant="small"
                      fontSize="16px"
                      fontWeight="500"
                    >{`Cash transfer to :`}</Text>
                  }
                ></Chip>
                {productIdList.map((investment, index) => (
                  <StyledListItem
                    key={index}
                    style={{ padding: "10px" }}
                    isSelected={selectProductIdSwap === index + 1}
                    disablePadding
                    disabled={selectSwap == investment.product_id}
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={() =>
                        handleRadioSelect(index + 1, investment.product_id)
                      }
                      dense
                    >
                      <ListItemText
                        primary={
                          <Text fontSize="14px" fontWeight="600">
                            {investment.product_name}
                          </Text>
                        }
                      />
                      <ListItemIcon>
                        <Box style={{ marginLeft: "28px" }}>
                          <Radio
                            checked={selectProductIdSwap === index + 1}
                            tabIndex={-1}
                            disableRipple
                            sx={{
                              "&.Mui-checked": {
                                color: "black",
                              },
                              "&.Mui-disabled": {
                                color: "grey",
                              },
                            }}
                            inputProps={{
                              "aria-labelledby": investment.product_id,
                            }}
                          />
                        </Box>
                      </ListItemIcon>
                    </ListItemButton>
                  </StyledListItem>
                ))}
              </List>
            </Box>
          ) : (
            <div>
              <Box>
                <Stack direction="row" justifyContent="space-between">
                  <Box
                    sx={{
                      width: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      height: "84px",
                      backgroundColor: "#E5EEFF",
                    }}
                  >
                    <Stack direction="column" alignItems="center">
                      <Text fontSize="14px" fontWeight="500">
                        {product_name}
                      </Text>
                      <Text fontSize="14px" fontWeight="400">
                        {amount}
                      </Text>
                    </Stack>
                  </Box>
                  <SyncAltIcon style={{ marginTop: "25px" }} />
                  <Box
                    sx={{
                      width: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      height: "84px",
                      backgroundColor: "#E5EEFF",
                    }}
                  >
                    <Stack direction="column" alignItems="center">
                      <Text fontSize="14px" fontWeight="500">
                        {}
                      </Text>
                      <Text fontSize="14px" fontWeight="400"></Text>
                    </Stack>
                  </Box>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  marginTop="24px"
                >
                  <Text variant="small" fontSize="14px" fontWeight="500">
                    Amount to transfer
                  </Text>
                  <TextField
                    value={sendAmounts.transferAmount}
                    onChange={(e) =>
                      handleChange("transferAmount", e.target.value)
                    }
                    placeholder="Enter amount"
                    style={{ marginTop: "8px" }}
                  />
                </Stack>
                {productIdList[1]?.category.map((item) => (
                  <Stack
                    key={item.product_category_id}
                    direction="column"
                    justifyContent="space-between"
                    marginTop="24px"
                  >
                    {selectProductIdSwap != 2 ? (
                      <Box>
                        <Text variant="small" fontSize="14px" fontWeight="500">
                          Amount to divide in {item.category_name}
                        </Text>
                        <TextField
                          value={
                            sendAmounts &&
                            sendAmounts.categoryAmounts &&
                            sendAmounts.categoryAmounts[
                              item.product_category_id
                            ]
                              ? sendAmounts.categoryAmounts[
                                  item.product_category_id
                                ]
                              : ""
                          }
                          onChange={(e) =>
                            handleChange(
                              "categoryAmounts",
                              e.target.value,
                              item.product_category_id
                            )
                          }
                          placeholder="Enter amount"
                          style={{ marginTop: "8px" }}
                        />
                      </Box>
                    ) : (
                      ""
                    )}
                  </Stack>
                ))}
              </Box>
            </div>
          )}
        </SideDrawer>
      )}
    </Stack>
  );
};

export default ManageCash;
