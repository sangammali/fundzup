import React, { useState, useEffect } from "react";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Box from "components/common/Box";
import DownloadButton from "components/common/DownloadButton";
import Text from "components/common/Text";
import Checkbox from "components/common/Checkbox";
import NewTextField from "components/common/TextField";
import TextField from "components/common/TextField";
import MenuItem from "components/common/MenuItem";
import DatePicker from "components/common/DatePicker";
import Grid from "components/common/Grid";
import Button from "components/common/Button";
import { ButtonGroup, styled } from "@mui/material";
import { Chip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import dayjs from "dayjs";
import FileUpload from "components/common/FileUpload";
import { useSelector } from "react-redux";
import CheckboxCommon from "components/common/CheckboxCommon";

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: "#FF5733",
      },
      name: "salmon",
    }),
  },
});

const ChipStyle = styled(Chip)(({ theme, riskprofile }) => {
  let backgroundColor;
  let color;
  if (riskprofile === "Aggresssive") {
    backgroundColor = "#FFEDED";
    color = "#EB5757";
  } else if (riskprofile === "Moderate") {
    backgroundColor = "#FFF5E0";
    color = "#E58026";
  } else if (riskprofile === "Conservative") {
    backgroundColor = "#DEFFEC";
    color = "#219653";
  }

  return {
    display: "flex",
    alignItems: "center",
    borderRadius: "152px",
    backgroundColor: backgroundColor,
    color: color,
    fontSize: "12px",
    padding: "8px",
    fontWeight: 500,
    "&::before": {
      position: "relative",
      left: 5,
      bottom: 6,
      content: '"\\2022"',
      width: "6px",
      height: "6px",
      color: color,
    },
  };
});

const CapitalButton = styled(Button)(({ theme }) => ({
  padding: "2px 4px",
  borderRadius: "8px",
  border: "1px solid #142E56",
  marginTop: "12px",
}));

const ViewCustomer = ({
  isRupee,
  isDrawerOpen,
  setIsDrawerOpen,
  customerId,
  setCustomerId,
  viewData,
  detailDataShow,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [items, setItems] = useState(
    detailDataShow?.investmentDetails[0]?.product_category
  );
  const [selectedPlan, setSelectedPlan] = useState("");

  const getCustomerAllDetail = customersApiAction.getCustomerDetail(customerId);
  const showCustomerData = getCustomerAllDetail?.data?.result;
  const modelportfolioList =
    showCustomerData?.investmentDetails[1]?.product_category;
  // const downloadDocument = customersApiAction.postDownloadDocument(customerId);
  const [downloadDocAPI] = customersApiAction.postProfileDocApi(customerId);
  const getCustomerPlanAPi = customersApiAction.getCustomerPlan();
  console.log("getCutomerPlan", getCustomerPlanAPi);
  const subscriptionData = getCustomerPlanAPi?.data;
  const updateCustomerApprove = customersApiAction.updateCustomerApprove();
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const originalStartDate = showCustomerData?.otherDetails[0]?.start_date;
  const originalStartDateFormat = dayjs(originalStartDate).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(originalStartDateFormat);
  const originalEndDate = showCustomerData?.otherDetails[0]?.end_date;
  const originalEndDateFormat = dayjs(originalEndDate).format("YYYY-MM-DD");
  const originaljoining = showCustomerData?.otherDetails[0]?.joining_date;
  const originalJoinDate = dayjs(originaljoining).format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState(originalEndDateFormat);
  const [isEndDatePickerOpen, setEndDatePickerOpen] = useState(false);
  const [pan_card, setPanCard] = useState();
  const [aadhar_card, setAadharCard] = useState();
  const [sign_agreement, setSignAgreement] = useState();
  const [product_id, setProductId] = useState(
    showCustomerData?.investmentDetails[0]?.product_id
  );
  const [amount, setAmount] = useState(
    showCustomerData?.investmentDetails[0].investment_amount
  );
  const planCode = showCustomerData?.otherDetails[0]?.plan_code;

  const [updataData] = customersApiAction.updateCustomerApprove(customerId);

  const [formData, setFormData] = useState({
    capital: showCustomerData?.customerDetails[0]?.capital ?? '',
    is_percent: "false",
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
    plan_detail_id: selectedValue,
    pan_card: pan_card,
    aadhar_card: aadhar_card,
    sign_agreement: sign_agreement,
    start_date: startDate,
    end_date: endDate,
  });

  const [formError, setFormError] = useState({
    customAmount: "",
    modelPorfolioAmount: "",
    highRiskAmount: "",
    mediumRiskAmount: "",
    lowRiskAmount: "",
    algoAmount: "",
  });

  const customerDetail = [
    {
      name: "Customer name",
      value: showCustomerData?.customerDetails[0]?.name,
    },
    {
      name: "Email address",
      value: showCustomerData?.customerDetails[0]?.email,
    },
    { name: "Phone", value: showCustomerData?.customerDetails[0]?.mobile },
    {
      name: "Investment Type",
      value: showCustomerData?.customerDetails[0]?.investment_type ?? "",
    },
    {
      name: "Joining Date",
      value: originalJoinDate ?? "",
    },
    {
      name: "Customer type",
      value: showCustomerData?.customerDetails[0]?.customer_type ?? "",
    },
    {
      name: "Customer residency",
      value: showCustomerData?.customerDetails[0]?.customer_residency ?? "",
    },
    {
      name: "Capital",
      value: showCustomerData?.customerDetails[0]?.capital ?? "",
    },
    {
      name: "Auto Status",
      value: showCustomerData?.customerDetails[0]?.auto_trade ?? "",
    },
    {
      name: "Risk Profile",
      value: showCustomerData?.customerDetails[0]?.riskprofile ?? "",
    },
  ];

  const handleChange = ({ name, value }) => {
    let newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  };

  const handleFileInputChange = async (props) => {
    console.log("props", props);
    const selectedFile = props.files[0];
    const inputName = props.name;
    if (selectedFile) {
      const base64Content = await readFileAsync(selectedFile);
      const fileObject = {
        file: `data:application/pdf;base64${base64Content}`,
      };
      setFormData((prevFormData) => ({
        ...prevFormData,
        [inputName]: fileObject,
      }));
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
  };

  const handleStartChange = () => {
    setDatePickerOpen(true);
  };

  const handleEndChange = () => {
    setEndDatePickerOpen(true);
  };

  const handleDateChange = (newStartDate) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      start_date: dayjs(newStartDate).format("YYYY-MM-DD"),
    }));
  };

  const handleEndDateChange = (newEndDate) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      end_date: dayjs(newEndDate).format("YYYY-MM-DD"),
    }));
  };

  const payloadParser = () => {
    let payload = {};
    let investments = [];
    payload.capital = formData.capital;
    let plan_detail_id = formData.plan_detail_id;
    let pan_card = formData.pan_card;
    let aadhar_card = formData.aadhar_card;
    let sign_agreement = formData.sign_agreement;
    let startDate = formData.start_date;
    let endDate = formData.end_date;

    if (formData.isCustomInvestmentSelected) {
      let investment = {
        product_id: 1,
        amount: formData.customAmount,
        product_category: [],
        is_percent: formData.is_percent,
      };
      investments.push(investment);
    }
    if (formData.isModelPortfolioSelected) {
      let investment = {
        product_id: 2,
        amount: formData.modelPorfolioAmount,
        is_percent: formData.is_percent,
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
        is_percent: formData.is_percent,
      };
      investments.push(investment);
    }

    payload.startDate = startDate;
    payload.endDate = endDate;
    payload.plan_detail_id = plan_detail_id;
    payload.aadhar_card = aadhar_card;
    payload.sign_agreement = sign_agreement;
    payload.investments = investments;
    payload.pan_card = pan_card;
    payload.sign_agreement = sign_agreement;
    return payload;
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleDownloadDoc = async (type) => {
    console.log("download function called");
    try {
      const requestBody = {
        user_id: customerId,
        type: type,
      };
      let res = await downloadDocAPI(requestBody).unwrap();
      console.log("API Response: ", res);
      const result = res?.result;
      if (result?.file) {
        console.log("download function called");
        const base64 = await fetch(result.file);
        const blob = await base64.blob();
        const a = document.createElement("a");
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = result.filename || "downloaded_file.png";
        a.click();
      } else {
        console.error("No file found in the API response.");
      }
    } catch (err) {
      console.error("Error during download:", err);
    }
  };

  // 	const handleValidation = () => {
	// 	const newFormError = { ...formError };

	// 	const capitalValidation = validationHelper.required(formData.capital);
	// 	newFormError.capital = capitalValidation.message;

	// 	let customValidation = { isValid: 1 };
	// 	if (formData.isCustomInvestmentSelected) {
	// 		customValidation = validationHelper.required(formData.customAmount);
	// 		newFormError.customAmount = customValidation.message;
	// 	} else {
	// 		newFormError.customAmount = "";
	// 	}

	// 	let modelPortfolioValidation = { isValid: 1 };
	// 	if (formData.isModelPortfolioSelected) {
	// 		modelPortfolioValidation = validationHelper.required(formData.modelPorfolioAmount);
	// 		newFormError.modelPorfolioAmount = modelPortfolioValidation.message;
	// 	} else {
	// 		newFormError.modelPorfolioAmount = "";
	// 	}

	// 	let highRiskValidation = { isValid: 1 };
	// 	if (formData.isHighRiskSelected) {
	// 		highRiskValidation = validationHelper.required(formData.highRiskAmount);
	// 		newFormError.highRiskAmount = highRiskValidation.message;
	// 	} else {
	// 		newFormError.highRiskAmount = "";
	// 	}

	// 	let mediumRiskValidation = { isValid: 1 };
	// 	if (formData.isMediumRiskSelected) {
	// 		mediumRiskValidation = validationHelper.required(formData.mediumRiskAmount);
	// 		newFormError.mediumRiskAmount = mediumRiskValidation.message;
	// 	} else {
	// 		newFormError.mediumRiskAmount = "";
	// 	}

	// 	let lowRiskValidation = { isValid: 1 };
	// 	if (formData.isLowRiskSelected) {
	// 		lowRiskValidation = validationHelper.required(formData.lowRiskAmount);
	// 		newFormError.lowRiskAmount = lowRiskValidation.message;
	// 	} else {
	// 		newFormError.lowRiskAmount = "";
	// 	}

	// 	let algoValidation = { isValid: 1 };
	// 	if (formData.isAlgoSelected) {
	// 		algoValidation = validationHelper.required(formData.algoAmount);
	// 		newFormError.algoAmount = algoValidation.message;
	// 	} else {
	// 		newFormError.algoAmount = "";
	// 	}

	// 	setFormError(newFormError);

	// 	return (
	// 		capitalValidation.isValid &&
	// 		customValidation.isValid &&
	// 		modelPortfolioValidation.isValid &&
	// 		highRiskValidation.isValid &&
	// 		mediumRiskValidation.isValid &&
	// 		lowRiskValidation.isValid &&
	// 		algoValidation.isValid
	// 	);
	// };


  const handleSave = async () => {
    try {
      const parsedPayload = payloadParser();
      console.log("parse", parsedPayload.startDate);
      let payload = {
        user_id: customerId,
        status: "Accepted",
        plan_detail_id: parsedPayload.plan_detail_id,
        plan_code: planCode,
        start_date: parsedPayload.startDate,
        end_date: parsedPayload.endDate,
        pan_card: parsedPayload.pan_card,
        aadhar_card: parsedPayload.aadhar_card,
        sign_agreement: parsedPayload.sign_agreement,
        investments: parsedPayload.investments,
      };
      const res = await updataData(payload);
      console.log("Data saved successfully view customer change :", payload);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    const checkedForValue = value.toString();
    console.log("checked", checkedForValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      plan_detail_id: checkedForValue,
    }));
  };

  return (
    <Stack style={{ marginTop: "10px" }}>
      {isDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isDrawerOpen}
          closeDrawer={closeDrawer}
          title="View customer"
          subtitle="Here you can view all details of the customer."
          handleSubmit={handleSave}
          cancelButtonText="Reject request"
          submitButtonText="Approve request"
        >
          {customerDetail.map((item) => (
            <Box sx={{ m: 2 }}>
              <Grid container spacing={1.5}>
                <Grid item xs={4}>
                  <Box>
                    <Text
                      variant="small"
                      component="h4"
                      fontSize="16px"
                      fontWeight="400"
                      marginBottom="3px"
                      sx={{ color: "#667085", textWrap: "nowrap" }}
                    >
                      {item.name}
                    </Text>
                  </Box>
                </Grid>

                <Grid item xs={8}>
                  <Box>
                    {item.name === "Risk Profile" ? (
                      <Stack direction="row" textAlign="center">
                        {":  "}
                        {showCustomerData?.customerDetails[0]?.riskprofile ? (
                          <ChipStyle
                            style={{ marginLeft: "10px" }}
                            label={
                              showCustomerData?.customerDetails[0]?.riskprofile
                            }
                            size="small"
                            riskprofile={
                              showCustomerData?.customerDetails[0].riskprofile
                            }
                          />
                        ) : (
                          ""
                        )}
                      </Stack>
                    ) : (
                      <Stack direction="row">
                        {": "}
                        <Text
                          variant="small"
                          fontSize="16px"
                          fontWeight="500"
                          marginBottom="3px"
                          color="#101828"
                          paddingLeft="12px"
                        >
                          {item.value}
                        </Text>
                      </Stack>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}

          <Box sx={{ m: 2 }}>
            <Text
              variant="small"
              component="h4"
              fontSize="14px"
              fontWeight="500"
              marginBottom="3px"
            >
              PAN Card
            </Text>
            {showCustomerData?.documentDetails &&
            showCustomerData.documentDetails.length > 0 ? (
              <DownloadButton
                variant="outlined"
                onClick={() => handleDownloadDoc("PAN_CARD")}
              >
                {showCustomerData?.documentDetails[0]?.pan_card || "Pan Card"}
              </DownloadButton>
            ) : (
              <FileUpload
                handleChange={({ name, value }) => {
                  // console.log("========", name, value);
                  handleFileInputChange({ name: "pan_card", files: value });
                }}
                sx={{ width: "100%" }}
              />
            )}
          </Box>
          <Box sx={{ m: 2 }}>
            <Text
              variant="small"
              component="h4"
              fontSize="14px"
              fontWeight="500"
              marginBottom="3px"
            >
              Aadhar Card
            </Text>
            {showCustomerData?.documentDetails &&
            showCustomerData.documentDetails.length > 0 ? (
              <DownloadButton
                variant="outlined"
                onClick={() => handleDownloadDoc("AADHAR_CARD")}
              >
                {showCustomerData?.documentDetails[1]?.aadhar_card ||
                  "Aadhar Card"}
              </DownloadButton>
            ) : (
              <FileUpload
                handleChange={({ name, value }) => {
                  handleFileInputChange({ name: "aadhar_card", files: value });
                }}
                sx={{ width: "100%" }}
              />
            )}
            {/* <FileUpload
              handleChange={({ name, value }) => {
                handleFileInputChange({ name: "aadhar_card", files: value });
              }}
              sx={{ width: "100%" }}
            /> */}
          </Box>
          <Box sx={{ m: 2 }}>
            <Text
              variant="small"
              component="h4"
              fontSize="14px"
              fontWeight="500"
              marginBottom="3px"
            >
              Sign Agreement
            </Text>
            {showCustomerData?.documentDetails &&
            showCustomerData.documentDetails.length > 0 ? (
              <DownloadButton
                variant="outlined"
                onClick={() => handleDownloadDoc("SIGN_AGREEMENT")}
              >
                {showCustomerData?.documentDetails[2]?.sign_agreement ||
                  "Sign Agreement"}
              </DownloadButton>
            ) : (
              <FileUpload
                handleChange={({ name, value }) => {
                  // console.log("========", name, value);
                  handleFileInputChange({
                    name: "sign_agreement",
                    files: value,
                  });
                }}
                // name="sign_agreement"
                sx={{ width: "100%" }}
              />
            )}
          </Box>
          <Box sx={{ m: 2 }}>
            <Text
              variant="small"
              component="h4"
              fontSize="14px"
              fontWeight="500"
            >
              Investment type
            </Text>
            <Box
              sx={{
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              <Stack
                textAlign="center"
                direction="column"
                alignItem="space-between"
                justifyContent="space-between"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "space-between",
                    justifyContent: "space-between",
                  }}
                >
                  <CheckboxCommon
                    title="Custom"
                    value={
                      showCustomerData?.investmentDetails[0]
                        ?.investment_percent ||
                      showCustomerData?.investmentDetails[0]
                        .investment_amount ||
                      showCustomerData?.investmentDetails[0]
                        .investment_percent === null
                        ? formData.isCustomInvestmentSelected
                        : true
                    }
                    // value={formData.isCustomInvestmentSelected}
                    size="small"
                    handleClick={() => {
                      handleChange({
                        name: "isCustomInvestmentSelected",
                        value: !formData.isCustomInvestmentSelected,
                      });
                    }}
                  />
                  <ButtonGroup style={{marginBottom:'10px'}}>
                    <CapitalButton
                      variant={!formData.is_percent ? "contained" : "outlined"}
                      onClick={() => {
                        handleChange({ name: "is_percent", value: false });
                      }}
                    >
                      <Text>₹</Text>
                    </CapitalButton>
                    <CapitalButton
                      variant={formData.is_percent ? "contained" : "outlined"}
                      onClick={() => {
                        handleChange({ name: "is_percent", value: true });
                      }}
                    >
                      <Text>%</Text>
                    </CapitalButton>
                  </ButtonGroup>
                </div>
                <TextField
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
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "space-between",
                    justifyContent: "space-between",
                  }}
                >
                  
                  <CheckboxCommon
                    size="small"
                    title="Model Portfolio"
                    value={
                      showCustomerData?.investmentDetails[1]
                        ?.investment_percent ||
                      showCustomerData?.investmentDetails[1]
                        .investment_amount ||
                      showCustomerData?.investmentDetails[1]
                        .investment_percent === null
                        ? formData.isModelPortfolioSelected
                        : true
                    }
                    // value={formData.isModelPortfolioSelected}
                    handleClick={() => {
                      handleChange({
                        name: "isModelPortfolioSelected",
                        value: !formData.isModelPortfolioSelected,
                      });
                    }}
                  />
                  <ButtonGroup>
                    <CapitalButton
                      variant={!formData.is_percent ? "contained" : "outlined"}
                      onClick={() => {
                        handleChange({ name: "is_percent", value: false });
                      }}
                    >
                      <Text>₹</Text>
                    </CapitalButton>
                    <CapitalButton
                      variant={formData.is_percent ? "contained" : "outlined"}
                      onClick={() => {
                        handleChange({ name: "is_percent", value: true });
                      }}
                    >
                      <Text>%</Text>
                    </CapitalButton>
                  </ButtonGroup>
                </div>
                <TextField
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

                <Stack
                  direction="column"
                  alignItem="space-between"
                  justifyContent="space-between"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "space-between",
                      justifyContent: "space-between",
                    }}
                  >
                    <CheckboxCommon
                      title="Algo (F&O)"
                      value={
                        showCustomerData?.investmentDetails[2]
                          ?.investment_percent ||
                        showCustomerData?.investmentDetails[2]
                          .investment_amount ||
                        showCustomerData?.investmentDetails[2]
                          .investment_percent === null
                          ? formData.isAlgoSelected
                          : true
                      }
                      // value={formData.isAlgoSelected}
                      handleClick={() => {
                        handleChange({
                          name: "isAlgoSelected",
                          value: !formData.isAlgoSelected,
                        });
                      }}
                    />
                    <ButtonGroup>
                      <CapitalButton
                        variant={
                          !formData.is_percent ? "contained" : "outlined"
                        }
                        onClick={() => {
                          handleChange({ name: "is_percent", value: false });
                        }}
                      >
                        <Text>₹</Text>
                      </CapitalButton>
                      <CapitalButton
                        variant={formData.is_percent ? "contained" : "outlined"}
                        onClick={() => {
                          handleChange({ name: "is_percent", value: true });
                        }}
                      >
                        <Text>%</Text>
                      </CapitalButton>
                    </ButtonGroup>
                  </div>
                </Stack>
                <TextField
                  placeholder="Enter amount in ₹ "
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
            {/* {showCustomerData?.investmentDetails
              ? showCustomerData?.investmentDetails?.map((item, index) =>
                  showCustomerData?.customerDetails[0]?.investment_type
                    .split(",")
<<<<<<< HEAD
                    .includes(item?.product_name) ||
                  showCustomerData?.customerDetails[0]?.investment_type ===
                    "" ? (
=======
                    .includes(item?.product_name) ||  showCustomerData?.customerDetails[0]?.investment_type ===''
                    ? (
>>>>>>> develop
                    <>
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent="space-between"
                        mb={2}
                      >
                        <Checkbox
                          key={item.product_id}
                          style={{ marginLeft: "15px" }}
                          // checked={handleCheckbox}
                          onClick={() => setProductId(item.product_id)}
                          label={
                            <Text
                              variant="small"
                              component="h5"
                              fontWeight="500"
                              style={{ marginLeft: "10px" }}
                            >
                              {item.product_name}
                            </Text>
                          }
                          size="small"
                          name={`sendToModelPortfolio${index}`}
                          // onChange={() =>
                          //   handleCheckboxChange("product_id", item.product_id)
                          // }
                        />
                        <ButtonGroup>
                          <CapitalButton
                            variant={
                              item.is_percent === null ||
                              item.is_percent === "N"
                                ? "outlined"
                                : "contained"
                            }
                            onClick={() => {
                              // handleCapitalTypeChange(true);
                            }}
                          >
                            <Text>₹</Text>
                          </CapitalButton>
                          <CapitalButton
                            variant={
                              item.is_percent === "Y" ? "contained" : "outlined"
                            }
                            onClick={() => {
                              // handleCapitalTypeChange(false);
                            }}
                          >
                            <Text>%</Text>
                          </CapitalButton>
                        </ButtonGroup>
                      </Stack>

                      <TextField
                        placeholder="Enter % to invest"
                        value={item?.investment_amount}
                        name={amount}
                        onChange={(e) =>
                          handleInvestmentChange(
                            index,
                            "amount",
                            e.target.value
                          )
                        }

                        // onChange={handleFieldChange}
                        // onChange={(e) => handleFieldChange(e, index)}
                      />
                      {item.product_name === "Model Portfolio" ? (
                        modelportfolioList.map((item, index) => (
                          <>
                            {" "}
                            <Stack
                              key={index}
                              direction="row"
                              justifyContent="space-between"
                              mb={2}
                            >
                              <Checkbox
                                style={{ marginLeft: "15px" }}
                                checked={
                                  item?.investment_amount === 0 ? true : false
                                }
                                label={
                                  <Text
                                    variant="small"
                                    component="h5"
                                    fontWeight="500"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    {item.category_name}
                                  </Text>
                                }
                                size="small"
                                name={`sendToModelPortfolio${index}`}

                                // onChange={() => handleCheckboxChange("product_id",item.product_id)}
                              />
                            </Stack>
                            <TextField
                              placeholder="Enter % to invest"
                              value={item?.investment_amount}
                            />
                          </>
                        ))
                      ) : (
                        <></>
                      )}
                    </>
                  ) : item?.product_name !==
                    showCustomerData?.customerDetails[0]?.investment_type ? (
                    <>
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent="space-between"
                        mb={2}
                      >
                        <Checkbox
                          style={{ marginLeft: "15px" }}
                          disabled={true}
                          label={
                            <Text
                              variant="small"
                              component="h5"
                              fontWeight="500"
                              style={{ marginLeft: "10px" }}
                            >
                              {item.product_name}
                            </Text>
                          }
                          size="small"
                          name={`sendToModelPortfolio${index}`}
                        />
                        <ButtonGroup disabled={true}>
                          <CapitalButton
                            variant={
                              item.is_percent === "Y" ? "contained" : "outlined"
                            }
                            onClick={() => {
                              // handleCapitalTypeChange(true);
                            }}
                          >
                            <Text>₹</Text>
                          </CapitalButton>
                          <CapitalButton
                            variant={
                              item.is_percent === "Y" ? "contained" : "outlined"
                            }
                            onClick={() => {
                              // handleCapitalTypeChange(false);
                            }}
                          >
                            <Text>%</Text>
                          </CapitalButton>
                        </ButtonGroup>
                      </Stack>
                      <TextField
                        placeholder="Enter % to invest"
                        value={item?.investment_amount ?? ""}
                        disabled={true}
                      />
                      {item.product_name === "Model Portfolio" ? (
                        modelportfolioList.map((item, index) => (
                          <>
                            {" "}
                            <Stack
                              key={index}
                              direction="row"
                              justifyContent="space-between"
                              mb={2}
                            >
                              <Checkbox
                                style={{ marginLeft: "15px" }}
                                disabled={true}
                                label={
                                  <Text
                                    variant="small"
                                    component="h5"
                                    fontWeight="500"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    {item.category_name}
                                  </Text>
                                }
                                size="small"
                                name={`sendToModelPortfolio${index}`}
                                // onChange={() => handleCheckboxChange()}
                              />
                            </Stack>
                            <TextField
                              placeholder="Enter % to invest"
                              value={item?.investment_amount ?? ""}
                              disabled={true}
                            />
                          </>
                        ))
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent="space-between"
                        mb={2}
                      >
                        <Checkbox
                          style={{ marginLeft: "15px" }}
                          // disabled={true}
                          label={
                            <Text
                              variant="small"
                              component="h5"
                              fontWeight="500"
                              style={{ marginLeft: "10px" }}
                              onClick={() => setProductId(item.product_id)}
                            >
                              {item.product_name}
                            </Text>
                          }
                          size="small"
                          name={`sendToModelPortfolio${index}`}
                        />
                        <ButtonGroup disabled={true}>
                          <CapitalButton
                            variant={
                              item.is_percent === "N" ? "contained" : "outlined"
                            }
                            onClick={() => {
                              // handleCapitalTypeChange(true);
                            }}
                          >
                            <Text>₹</Text>
                          </CapitalButton>
                          <CapitalButton
                            variant={
                              item.is_percent === "Y" ? "contained" : "outlined"
                            }
                            onClick={() => {
                              // handleCapitalTypeChange(false);
                            }}
                          >
                            <Text>%</Text>
                          </CapitalButton>
                        </ButtonGroup>
                      </Stack>
                      <TextField
                        placeholder="Enter % to invest"
                        value={item?.investment_amount ?? ""}
                        // disabled={true}
                      />
                      {item.product_name === "Model Portfolio" ? (
                        modelportfolioList.map((item, index) => (
                          <>
                            {" "}
                            <Stack
                              key={index}
                              direction="row"
                              justifyContent="space-between"
                              mb={2}
                            >
                              <Checkbox
                                style={{ marginLeft: "15px" }}
                                // disabled={true}
                                label={
                                  <Text
                                    variant="small"
                                    component="h5"
                                    fontWeight="500"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    {item.category_name}
                                  </Text>
                                }
                                size="small"
                                name={`sendToModelPortfolio${index}`}
                              />
                            </Stack>
                            <TextField
                              placeholder="Enter % to invest"
                              value={item?.investment_amount ?? ""}
                              disabled={true}
                            />
                          </>
                        ))
                      ) : (
                        <></>
                      )}
                    </>
                  )
                )
              : ""} */}
          </Box>

          <Box sx={{ width: "425px", m: 2 }}>
            <Text
              variant="small"
              component="h4"
              fontSize="14px"
              fontWeight="500"
              marginBottom="3px"
            >
              Subscription Plan
            </Text>
            <NewTextField
              placeholder="Label"
              style={{ width: "106%" }}
              select
              value={formData.selectedValue}
              name="selectedValue"
              onChange={handleSelectChange}
              // value={selectedValue}
              // onChange={(e) => {
              //   const selectedPlanId = e.target.value;
              //   setSelectedValue(selectedPlanId);
              // }}
            >
              {subscriptionData?.plans?.map((plan) => (
                <MenuItem
                  key={plan.plan_id}
                  value={plan.plan_detail_id}
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  {plan.name}
                </MenuItem>
              ))}
            </NewTextField>

            <Box sx={{ mt: 1, mr: 1 }}>
              <Text
                variant="small"
                component="h4"
                fontSize="14px"
                fontWeight="500"
                marginBottom="3px"
              >
                Plan code
              </Text>
              <TextField
                style={{ width: "108%" }}
                value={showCustomerData?.otherDetails[0]?.plan_code ?? ""}
                // onChange={handleChange}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Text
                variant="small"
                component="h4"
                fontSize="14px"
                fontWeight="500"
              >
                Plan Start Date
              </Text>
              {!isDatePickerOpen && (
                <TextField
                  sx={{ width: "106%", marginTop: "3px" }}
                  value={dayjs(startDate).format("YYYY-MM-DD") ?? ""}
                  onClick={handleStartChange}
                />
              )}
              {isDatePickerOpen && (
                <DatePicker
                  sx={{ width: "106%" }}
                  // open={isDatePickerOpen}
                  // value={startDate}
                  onChange={handleDateChange}
                  // onClose={() => setDatePickerOpen(false)}
                  style={{ position: "absolute", top: "100%", left: 0 }}
                />
              )}
            </Box>
            <Box sx={{ mt: 1 }}>
              <Text
                variant="small"
                component="h4"
                fontSize="14px"
                fontWeight="500"
              >
                Expire Date
              </Text>
              {!isEndDatePickerOpen && (
                <TextField
                  sx={{ width: "106%", marginTop: "3px" }}
                  value={dayjs(endDate).format("YYYY-MM-DD") ?? ""}
                  onClick={handleEndChange}
                />
              )}
              {isEndDatePickerOpen && (
                <DatePicker
                  sx={{ width: "106%" }}
                  // open={isEndDatePickerOpen}
                  // value={startDate}
                  onChange={handleEndDateChange}
                  // onClose={() => setEndDatePickerOpen(false)}
                  style={{ position: "absolute", top: "100%", left: 0 }}
                />
              )}
            </Box>
          </Box>
        </SideDrawer>
      )}
    </Stack>
  );
};

export default ViewCustomer;
