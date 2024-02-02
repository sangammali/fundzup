import React, { useState } from "react";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Box from "components/common/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Text from "components/common/Text";
import Checkbox from "components/common/Checkbox";
import { Link } from "react-router-dom";
import TextField from "../common/TextField";

import { validationHelper } from "helpers/validation";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";

const InvestmentSidebar = ({
  viewCustomerDetail,
  customer_id,
  closeInvestmentDrawer,
  isInvestmentDrawerOpen,
}) => {
  const [openModel, setOpenModel] = useState(false);
  console.log(
    "viewCustomerDetail for investement type",
    viewCustomerDetail?.customerDetails[0]?.capital
  );
  const [formData, setFormData] = useState({
    capital: viewCustomerDetail?.customerDetails[0]?.capital,
    isPercent: "N",
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
    capital: "",
    customAmount: "",
    modelPorfolioAmount: "",
    highRiskAmount: "",
    mediumRiskAmount: "",
    lowRiskAmount: "",
    algoAmount: "",
  });

  const [submitInvestmentDetails] =
    customersApiAction.updateInvestmentDetails();

  // ---------------methods------------------

  const handleSubmit = async () => {
    if (!handleValidation()) {
      return;
    }

    try {
      const parsedPayload = payloadParser();
      let payload = {
        investmentDetails: parsedPayload,
        userId: customer_id,
      };
      const res = await submitInvestmentDetails(payload);
      console.log("handleChecked", parsedPayload);
      closeInvestmentDrawer(false);
    } catch (err) {
      console.log(err);
    }
  };

  const payloadParser = () => {
    let payload = {};
    payload.capital = formData.capital;
    payload.isPercent = formData.isPercent;
    let products = [];
    console.log("Initial formData:", formData);
    if (formData.isCustomInvestmentSelected) {
      let product = {
        product_id: 1,
        amount: formData.customAmount,
        category: [],
      };
      products.push(product);
    }
    if (formData.isModelPortfolioSelected) {
      let product = {
        product_id: 2,
        amount: formData.modelPorfolioAmount,
      };
      let category = [];
      if (formData.isModelPortfolioSelected) {
        let categoryProd = {
          product_category_id: 1,
          amount: formData.highRiskAmount,
        };
        category.push(categoryProd);
      }
      if (formData.isModelPortfolioSelected) {
        let categoryProd = {
          product_category_id: 2,
          amount: formData.mediumRiskAmount,
        };
        category.push(categoryProd);
      }
      if (formData.isModelPortfolioSelected) {
        let categoryProd = {
          product_category_id: 3,
          amount: formData.lowRiskAmount,
        };
        category.push(categoryProd);
      }
      product.category = category;
      products.push(product);
    }
    if (formData.isAlgoSelected) {
      let product = {
        product_id: 3,
        amount: formData.algoAmount,
        category: [],
      };
      products.push(product);
    }
    payload.products = products;
    return payload;
  };

  const handleOkay = () => {
    setOpenModel(false);
  };
  const handleCancel = () => {
    setOpenModel(false);
  };
  const handleChange = ({ name, value }) => {
    let newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  };

  const handleValidation = () => {
    const newFormError = { ...formError };

    const capitalValidation = validationHelper.required(formData.capital);
    newFormError.capital = capitalValidation.message;

    let customValidation = { isValid: 1 };
    if (formData.isCustomInvestmentSelected) {
      customValidation = validationHelper.required(formData.customAmount);
      newFormError.customAmount = customValidation.message;
    } else {
      newFormError.customAmount = "";
    }

    let modelPortfolioValidation = { isValid: 1 };
    if (formData.isModelPortfolioSelected) {
      modelPortfolioValidation = validationHelper.required(
        formData.modelPorfolioAmount
      );
      newFormError.modelPorfolioAmount = modelPortfolioValidation.message;
    } else {
      newFormError.modelPorfolioAmount = "";
    }

    let highRiskValidation = { isValid: 1 };
    if (formData.isHighRiskSelected) {
      highRiskValidation = validationHelper.required(formData.highRiskAmount);
      newFormError.highRiskAmount = highRiskValidation.message;
    } else {
      newFormError.highRiskAmount = "";
    }

    let mediumRiskValidation = { isValid: 1 };
    if (formData.isMediumRiskSelected) {
      mediumRiskValidation = validationHelper.required(
        formData.mediumRiskAmount
      );
      newFormError.mediumRiskAmount = mediumRiskValidation.message;
    } else {
      newFormError.mediumRiskAmount = "";
    }

    let lowRiskValidation = { isValid: 1 };
    if (formData.isLowRiskSelected) {
      lowRiskValidation = validationHelper.required(formData.lowRiskAmount);
      newFormError.lowRiskAmount = lowRiskValidation.message;
    } else {
      newFormError.lowRiskAmount = "";
    }

    let algoValidation = { isValid: 1 };
    if (formData.isAlgoSelected) {
      algoValidation = validationHelper.required(formData.algoAmount);
      newFormError.algoAmount = algoValidation.message;
    } else {
      newFormError.algoAmount = "";
    }

    setFormError(newFormError);

    return (
      capitalValidation.isValid &&
      customValidation.isValid &&
      modelPortfolioValidation.isValid &&
      highRiskValidation.isValid &&
      mediumRiskValidation.isValid &&
      lowRiskValidation.isValid &&
      algoValidation.isValid
    );
  };

  return (
    <Stack>
      {isInvestmentDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isInvestmentDrawerOpen}
          closeDrawer={closeInvestmentDrawer}
          title="Investment Type"
          contentTitle=""
          handleSubmit={handleSubmit}
          cancelButtonText="Cancle"
          submitButtonText="Save"
          subtitle="Here you can edit the Invesment type."
        >
          <Box>
            <Text variant="small" fontSize="16px" fontWeight="500">
              Capital
            </Text>
            <TextField
              type="number"
              value={formData.capital}
              disabled
              inputProps={{ style: { fontSize: "14px" } }}
              placeholder="₹ 50,00,000"
              style={{ marginTop: "10px" }}
            />
          </Box>
          <Box>
            <Text
              variant="small"
              fontSize="16px"
              fontWeight="500"
              marginTop="10px"
            >
              Invesment Type
            </Text>
            <Checkbox
              value={formData.isAlgoSelected}
              onChange={() => {
                handleChange({
                  name: "isAlgoSelected",
                  value: !formData.isAlgoSelected,
                });
              }}
              label={
                <Text
                  variant="small"
                  component="h5"
                  fontWeight="500"
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  Algo (F&O)
                </Text>
              }
              size="small"
              style={{ marginLeft: "15px", marginBottom: "10px" }}
            />

            <Box>
              <Text variant="small" fontSize="15px" fontWeight="500">
                Capital divide for algo
              </Text>
              <TextField
                type="number"
                inputProps={{ style: { fontSize: "14px" } }}
                placeholder="₹ 50,00,000"
                style={{ marginTop: "10px" }}
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
            </Box>
            <Box style={{ marginTop: "4px" }}>
              <Text variant="small" fontSize="15px" fontWeight="600">
                Leverage amount
              </Text>
              <TextField
                type="number"
                disabled={true}
                inputProps={{ style: { fontSize: "14px" } }}
                placeholder="₹ 50,00,000"
                style={{ marginTop: "10px" }}
              />
            </Box>
          </Box>

          <Box>
            <Checkbox
              onChange={() => {
                handleChange({
                  name: "isCustomInvestmentSelected",
                  value: !formData.isCustomInvestmentSelected,
                });
              }}
              value={formData.isCustomInvestmentSelected}
              label={
                <Text
                  variant="small"
                  component="h5"
                  fontWeight="600"
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  Custom{" "}
                </Text>
              }
              size="small"
              style={{ marginLeft: "15px", marginBottom: "10px" }}
            />
            <Text variant="small" fontSize="15px" fontWeight="600">
              Capital divide for model portfolio
            </Text>
            <TextField
              type="number"
              onChange={(e) => {
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                });
              }}
              disabled={!formData.isCustomInvestmentSelected}
              value={formData.customAmount}
              name="customAmount"
              inputProps={{ style: { fontSize: "14px" } }}
              placeholder="₹ 50,00,000"
              style={{ marginTop: "10px" }}
            />
          </Box>
          <Box>
            <Checkbox
              onChange={() => {
                handleChange({
                  name: "isModelPortfolioSelected",
                  value: !formData.isModelPortfolioSelected,
                });
              }}
              value={formData.isModelPortfolioSelected}
              label={
                <Text
                  variant="small"
                  component="h5"
                  fontWeight="600"
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  Model Portfolio
                </Text>
              }
              size="small"
              style={{ marginLeft: "15px", marginBottom: "10px" }}
            />
            <Box>
              <Text variant="small" fontSize="15px" fontWeight="600">
                Capital Divide for Model Portfolio
              </Text>
              <TextField
                type="number"
                inputProps={{ style: { fontSize: "14px" } }}
                placeholder="₹ 50,00,000"
                style={{ marginTop: "10px" }}
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
            </Box>
            <Box style={{ marginTop: "4px" }}>
              <Text variant="small" fontSize="15px" fontWeight="600">
                High Risk Product Stocks
              </Text>
              <TextField
                type="number"
                value={formData.highRiskAmount}
                name="highRiskAmount"
                onChange={(e) => {
                  handleChange({
                    name: e.target.name,
                    value: e.target.value,
                  });
                }}
                disabled={!formData.isModelPortfolioSelected}
                inputProps={{ style: { fontSize: "14px" } }}
                placeholder="₹ 50,00,000"
                style={{ marginTop: "10px" }}
              />
            </Box>
            <Box style={{ marginTop: "4px" }}>
              <Text variant="small" fontSize="15px" fontWeight="600">
                Medimun Risk Product Stocks
              </Text>
              <TextField
                type="number"
                inputProps={{ style: { fontSize: "14px" } }}
                placeholder="₹ 50,00,000"
                style={{ marginTop: "10px" }}
                value={formData.mediumRiskAmount}
                name="mediumRiskAmount"
                onChange={(e) => {
                  handleChange({
                    name: e.target.name,
                    value: e.target.value,
                  });
                }}
                disabled={!formData.isModelPortfolioSelected}
              />
            </Box>
          </Box>
        </SideDrawer>
      )}

      {/* <Dialog
        onClose={() => setOpenModel(false)}
        open={openModel}
        disableCloseIcon
        maxWidth="sm"
        contentComponent={() => (
          <Stack
            direction="column"
            spacing={0.5}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Avatar
              style={{ width: "50px", height: "50px" }}
              src={Featured}
            ></Avatar>
            <Text fontSize="20px" fontWeight="600" color="#101828" p={1}>
              In order to add capital to the Custom move <br /> cash from model
              portfolio or Algos.
            </Text>
            <Text
              fontSize="14px"
              fontWeight="400"
              color="#667085"
              marginTop="-10px"
            >
              If you want to add capital in SIP then first you need to move cash
              from <br /> Model Portfolio or Algo to proceed further.
            </Text>
            <Stack direction="row" style={{ padding: "0px", width: "100%" }}>
              <Button
                style={{ width: "100%" }}
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                  width: "100%",
                  p: 2,
                  m: 2,
                }}
                onClick={handleCancel}
              >
                No
              </Button>
              <Button
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                  p: 2,
                  width: "100%",
                  m: 2,
                }}
                onClick={handleOkay}
              >
                Okay
              </Button>
            </Stack>
          </Stack>
        )}
      /> */}
    </Stack>
  );
};

export default InvestmentSidebar;
