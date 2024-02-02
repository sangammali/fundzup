import Stack from "components/common/Stack";
import React, { useState, useEffect } from "react";
import { ButtonGroup, styled } from "@mui/material";
import Box from "components/common/Box";
import Text from "components/common/Text";
import Button from "components/common/Button";
import CustomerDetailPage from "./CustomerDetailPage";
import NewDialog from "../components/common/Dialog";
import CheckboxCommon from "components/common/CheckboxCommon";
import TextField from "components/common/TextField";
import BlockCustomer from "../components/customerSidebar/BlockCustomer";
import Divider from "components/common/Divider";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import { useSelector } from "react-redux";
import Grid from "components/common/Grid";

const ModalPortfolioCard = styled(Box)(({ theme, isBoxVisible }) => ({
  marginBottom: "28px",
  ...(isBoxVisible
    ? { borderRadius: "8px", backgroundColor: "#E5EEFF", padding: "20px" }
    : {}),
}));

const CustomerDetailHeader = () => {
  const select = useSelector((state) => state);
  const customer_id = select?.toast?.breadCrumbData?.user_id;
  const [modalOpen, setModalOpen] = useState(false);
  const [isBlockDrawerOpen, setBlockIsDrawerOpen] = useState(false);
  const [postAddMoney] = customersApiAction.postAddMoney();
  const products_id = customersApiAction.getProductId();
  // console.log("add money prouct_id", products_id?.data.products?.name);
  const [formData, setFormData] = useState({
    isCustomInvestmentSelected: false,
    customAmount: "",
    isModelPortfolioSelected: false,
    modelPorfolioAmount: "",
    isHighRiskSelected: false,
    highRiskAmount: "",
    isMediumRiskSelected: false,
    mediumRiskAmount: "",
    isLowRiskSelected: false,
    lowRiskAmount: "",
    isAlgoSelected: false,
    algoAmount: "",
  });

  const [formError, setFormError] = useState({
    customAmount: "",
    modelPorfolioAmount: "",
    highRiskAmount: "",
    mediumRiskAmount: "",
    lowRiskAmount: "",
    algoAmount: "",
  });

  const handleSubmit = async () => {
    try {
      const parsedPayload = payloadParser();
      let payload = {
        investments: parsedPayload,
        user_id: customer_id,
      };
      const res = await postAddMoney(payload);
      console.log("resssss", parsedPayload);
    } catch (err) {
      console.log(err);
    }
  };

  const payloadParser = () => {
    let payload = {};
    let investments = [];

    if (formData.isCustomInvestmentSelected) {
      let investment = {
        product_id: 1,
        amount: formData.customAmount,
        product_category: [],
      };
      investments.push(investment);
    }
    if (formData.isModelPortfolioSelected) {
      let investment = {
        product_id: 2,
        amount: formData.modelPorfolioAmount,
      };
      let product_category = [];
      if (formData.isHighRiskSelected) {
        let categoryProd = {
          product_category_id: 1,
          amount: formData.highRiskAmount,
        };
        product_category.push(categoryProd);
      }
      if (formData.isMediumRiskSelected) {
        let categoryProd = {
          product_category_id: 2,
          amount: formData.mediumRiskAmount,
        };
        product_category.push(categoryProd);
      }
      if (formData.isLowRiskSelected) {
        let categoryProd = {
          product_category_id: 3,
          amount: formData.lowRiskAmount,
        };
        product_category.push(categoryProd);
      }
      investment.product_category = product_category;
      investments.push(investment);
    }
    if (formData.isAlgoSelected) {
      let investment = {
        product_id: 3,
        amount: formData.algoAmount,
        product_category: [],
      };
      investments.push(investment);
    }
    payload.investments = investments;
    return payload;
  };

  const handleChange = ({ name, value }) => {
    let newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  };

  const firstLetter = select?.toast?.breadCrumbData?.name
    ?.split(" ")[0]
    ?.slice(0, 1);
  const secondLetter = select?.toast?.breadCrumbData?.name
    ?.split(" ")[1]
    ?.slice(0, 1);
  const result =
    secondLetter && firstLetter
      ? `${firstLetter}${secondLetter}`
      : `${firstLetter}`;

  const openBlockDrawer = () => {
    setBlockIsDrawerOpen(true);
  };

  const closeBlockDrawer = () => {
    setBlockIsDrawerOpen(false);
  };

  return (
    <div>
      <Box p={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ width: "100%" }}
          alignItem="center"
          style={{ marginTop: "10px" }}
        >
          <Box
            style={{
              backgroundColor: "#E5EEFF",
              width: "60px",
              height: "50px",
              borderRadius: "50%",
              textAlign: "center",
            }}
          >
            <Text fontWeight="500" style={{ marginTop: "12px" }}>
              {result}
            </Text>
          </Box>
          <Box style={{ marginTop: "12px" }}>
            <Text
              variant="small"
              component="h4"
              fontSize="20px"
              fontWeight="500"
              sx={{ textWrap: "nowrap", marginLeft: "2px" }}
            >
              {select?.toast?.breadCrumbData?.name}
            </Text>
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1.5}
            sx={{ width: "100%" }}
            alignItem="center"
            style={{ marginTOp: "10px" }}
          >
            <Button
              sx={{
                fontWeight: 600,
                borderRadius: "8px",
                p: 2,
                width: "180px",
              }}
              onClick={openBlockDrawer}
              variant="outlined"
            >
              Block Customer
            </Button>
            {isBlockDrawerOpen && (
              <BlockCustomer
                closeBlockDrawer={closeBlockDrawer}
                isBlockDrawerOpen={isBlockDrawerOpen}
              />
            )}

            <Button
              sx={{
                fontWeight: 600,
                borderRadius: "8px",
                p: 2,
                width: "190px",
              }}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add Money
            </Button>
            <NewDialog
              onClose={() => setModalOpen(false)}
              open={modalOpen}
              title={
                <Text
                  variant="mediumn"
                  fontSize="20px"
                  fontWeight="600"
                  marginTop="10px"
                >
                  Add Money
                </Text>
              }
              disableCloseIcon
              maxWidth="sm"
              sx={{ borderRadius: "10px" }}
              contentComponent={() => (
                <Box
                  sx={{
                    maxWidth: "480px",
                    margin: "0 auto",
                    marginTop: "20px",
                  }}
                >
                  <Stack
                    textAlign="center"
                    direction="column"
                    alignItem="space-between"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <CheckboxCommon
                    
                      title="Custom"
                      value={formData.isCustomInvestmentSelected}
                      size="small"
                      handleClick={() => {
                        handleChange({
                          name: "isCustomInvestmentSelected",
                          value: !formData.isCustomInvestmentSelected,
                        });
                      }}
                    />
                    <TextField
                      style={{ marginTop: "5px" }}
                      placeholder="Enter amount in ₹ "
                      value={formData.customAmount}
                      name="customAmount"
                      onChange={(e) => {
                        handleChange({
                          name: e.target.name,
                          value: e.target.value,
                        });
                      }}
                      disabled={!formData.isCustomInvestmentSelected}
                    />
                  </Stack>
                  <Stack
                    textAlign="center"
                    direction="column"
                    alignItem="space-between"
                    justifyContent="space-between"
                    spacing={1}
                    style={{ marginTop: "10px" }}
                  >
                    <CheckboxCommon
                      size="small"
                      title="Model Portfolio"
                      value={formData.isModelPortfolioSelected}
                      handleClick={() => {
                        handleChange({
                          name: "isModelPortfolioSelected",
                          value: !formData.isModelPortfolioSelected,
                        });
                      }}
                    />

                    <TextField
                      style={{ marginBottom: "2px" }}
                      placeholder="Enter amount in ₹ "
                      value={formData.modelPorfolioAmount}
                      name="modelPorfolioAmount"
                      onChange={(e) => {
                        handleChange({
                          name: e.target.name,
                          value: e.target.value,
                        });
                      }}
                      disabled={!formData.isModelPortfolioSelected}
                    />

                    {formData.isModelPortfolioSelected ? (
                      <>
                        <Grid item md={6}>
                          <CheckboxCommon
                            sx={{ width: "100%" }}
                            title="High Risk Product Stock"
                            value={formData.isHighRiskSelected}
                            handleClick={() => {
                              handleChange({
                                name: "isHighRiskSelected",
                                value: !formData.isHighRiskSelected,
                              });
                            }}
                          />
                        </Grid>

                        <Grid item md={6}>
                          style={{ marginBottom: "2px" }}
                          <TextField
                            sx={{ width: "100%" }}
                            placeholder="Enter amount to invest"
                            value={formData.highRiskAmount}
                            name="highRiskAmount"
                            onChange={(e) => {
                              handleChange({
                                name: e.target.name,
                                value: e.target.value,
                              });
                            }}
                            disabled={!formData.isHighRiskSelected}
                          />
                          {formError.highRiskAmount && (
                            <Text variant="small" color="red" py={1}>
                              {formError.highRiskAmount}
                            </Text>
                          )}
                        </Grid>

                        <Grid item md={6}>
                          <CheckboxCommon
                            sx={{ width: "100%" }}
                            title="Medium Risk Product Stock"
                            value={formData.isMediumRiskSelected}
                            handleClick={() => {
                              handleChange({
                                name: "isMediumRiskSelected",
                                value: !formData.isMediumRiskSelected,
                              });
                            }}
                          />
                        </Grid>

                        <Grid item md={6}>
                          <TextField
                            style={{ marginBottom: "2px" }}
                            sx={{ width: "100%" }}
                            placeholder="Enter amount to invest"
                            value={formData.mediumRiskAmount}
                            name="mediumRiskAmount"
                            onChange={(e) => {
                              handleChange({
                                name: e.target.name,
                                value: e.target.value,
                              });
                            }}
                            disabled={!formData.isMediumRiskSelected}
                          />
                          {formError.mediumRiskAmount && (
                            <Text variant="small" color="red" py={1}>
                              {formError.mediumRiskAmount}
                            </Text>
                          )}
                        </Grid>

                        <Grid item md={6}>
                          <CheckboxCommon
                            sx={{ width: "100%" }}
                            title="Low Risk Product Stock"
                            value={formData.isLowRiskSelected}
                            handleClick={() => {
                              handleChange({
                                name: "isLowRiskSelected",
                                value: !formData.isLowRiskSelected,
                              });
                            }}
                          />
                        </Grid>

                        <Grid item md={6}>
                          <TextField
                            style={{ marginBottom: "2px" }}
                            sx={{ width: "100%" }}
                            placeholder="Enter amount to invest"
                            value={formData.lowRiskAmount}
                            name="lowRiskAmount"
                            onChange={(e) => {
                              handleChange({
                                name: e.target.name,
                                value: e.target.value,
                              });
                            }}
                            disabled={!formData.isLowRiskSelected}
                          />
                          {formError.lowRiskAmount && (
                            <Text variant="small" color="red" py={1}>
                              {formError.lowRiskAmount}
                            </Text>
                          )}
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}

                    <CheckboxCommon
                      title="Algo (F&O)"
                      value={formData.isAlgoSelected}
                      handleClick={() => {
                        handleChange({
                          name: "isAlgoSelected",
                          value: !formData.isAlgoSelected,
                        });
                      }}
                    />
                    <TextField
                      placeholder="Enter amount in ₹ "
                      style={{ marginBottom: "2px" }}
                      value={formData.algoAmount}
                      name="algoAmount"
                      onChange={(e) => {
                        handleChange({
                          name: e.target.name,
                          value: e.target.value,
                        });
                      }}
                      disabled={!formData.isAlgoSelected}
                    />
                  </Stack>
                </Box>
              )}
              actionComponent={() => (
                <Box
                  mb={2}
                  textAlign="center"
                  direction="row"
                  alignItem="space-around"
                  justifyContent="space-around"
                  spacing={1}
                >
                  <Button
                    fontSize="20px"
                    sx={{
                      width: "100%",
                      px: 2,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                    onClick={() => {
                      setModalOpen(false);
                    }}
                    disableEndIcon={false}
                    variant="outlined"
                    style={{ width: "200px", margin: "10px" }}
                  >
                    No
                  </Button>
                  <Button
                    sx={{
                      width: "100%",
                      px: 2,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                    onClick={handleSubmit}
                    disableEndIcon={false}
                    style={{ width: "200px", margin: "10px" }}
                  >
                    Add
                  </Button>
                </Box>
              )}
            />
          </Stack>
        </Stack>
        <Box style={{ padding: "20px" }}>
          <Divider />
        </Box>
      </Box>
    </div>
  );
};

export default CustomerDetailHeader;
