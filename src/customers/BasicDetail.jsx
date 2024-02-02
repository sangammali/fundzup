import React, { useState, useEffect } from "react";
import Stack from "components/common/Stack";
import Box from "components/common/Box";
import DownloadButton from "../components/common/DownloadButton";
import Text from "components/common/Text";
import TextField from "components/common/TextField";
import { useNavigate, Link } from "react-router-dom";
import ViewMembar from "../components/customerSidebar/ViewMembar";
import InvestmentSidebar from "../components/customerSidebar/InvestmentSideBar";
import ManageCash from "../components/customerSidebar/ManageCash";
import PlanSidebar from "../components/customerSidebar/PlanSidebar";
import ExpireDateSidebar from "../components/customerSidebar/ExpireDateSidebar";
import Chip from "@mui/material/Chip";
import Grid from "components/common/Grid";
import Divider from "components/common/Divider";
import RiskProfileSidebar from "components/customerSidebar/RiskProfileSidebar";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Avatar from "components/common/Avatar";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const ChipStyle = styled(Chip)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "152px",
  backgroundColor: "#B22323",
  color: "#FFFFFF",
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
    color: "#FFFFFF",
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "red" : "#219653",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#219653" : "red",
    boxSizing: "border-box",
  },
}));

const riskcarddata = [
  {
    id: 1,
    name: "Aggressive risk profile ",
    chart: "/images/aggressive.svg",
  },
  {
    id: 2,
    name: "Moderate risk profile ",
    chart: "/images/moderate.svg",
  },
  {
    id: 3,
    name: "Conservative risk profile ",
    chart: "/images/conservative.svg",
  },
];

const BasicDetail = (props) => {
  const select = useSelector((state) => state);
  const customerId = select?.toast?.breadCrumbData?.user_id;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFamilyDrawerOpen, setIsFamilyDrawerOpen] = useState(false);
  const [isRiskDrawerOpen, setIsRiskDrawerOpen] = useState(false);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isInvestmentDrawerOpen, setIsInvestmentDrawerOpen] = useState(false);
  const [isManageCashDrawerOpen, setIsManageCashDrawerOpen] = useState(false);
  const [isExpireDateDrawerOpen, setIsExpireDateDrawerOpen] = useState(false);
  const getCustomerAllDetail = customersApiAction.getCustomerDetail(customerId);
  const BasicDetailData = getCustomerAllDetail?.data?.result;
  const [updateAutoTrade] = customersApiAction.updateAutoTradeApi(customerId);
  const originalJoinDate = BasicDetailData?.customerDetails[0]?.joining_date;
  const JoinedDate = dayjs(originalJoinDate).format("YYYY-MM-DD");
  const originalexpiryDate = BasicDetailData?.otherDetails[0]?.end_date;
  const expiryDate = dayjs(originalexpiryDate).format("YYYY-MM-DD");
  console.log("check here", BasicDetailData?.customerDetails[0]?.auto_trade);
  const autoTrades = BasicDetailData?.customerDetails[0]?.auto_trade;
  const [autoTrade, setAutoTrade] = useState({
    auto_trade: autoTrades,
  });
  const [downloadDocAPI] = customersApiAction.postProfileDocApi(customerId);

  const customerDetail = [
    {
      name: "Email Address",
      value: BasicDetailData?.customerDetails[0]?.email ?? "",
    },
    {
      name: "Phone Number",
      value: BasicDetailData?.customerDetails[0]?.mobile ?? "",
    },
    {
      name: "Joining Date",
      value: JoinedDate ?? "",
    },
    {
      name: "Customer Residency",
      value: BasicDetailData?.customerDetails[0]?.customer_residency ?? "",
    },
    {
      name: "Customer Category",
      value: BasicDetailData?.customerDetails[0]?.customer_category ?? "",
    },
    {
      name: "Customer Type",
      value: BasicDetailData?.customerDetails[0]?.customer_type ?? "",
    },
    {
      name: "Capital",
      value: BasicDetailData?.customerDetails[0]?.capital ?? "",
    },
    {
      name: "Family Name",
      value: BasicDetailData?.customerDetails[0]?.family_name ?? "",
    },
    { name: "Auto Trade", value: BasicDetailData?.otherDetails[0]?.auto_trade ?? ''},
    {
      name: "Investment Type",
      value: BasicDetailData?.customerDetails[0]?.investment_type ?? ""
    },
    { name: "Cash Component", value: "Cash Component" },
    { name: "Plan", value: BasicDetailData?.otherDetails[0]?.plan_name ?? '' },
    { name: "Expiry Date", value: expiryDate ??"" },
    {
      name: "Plan Status",
      value: BasicDetailData?.otherDetails[0]?.plan_status ?? ""
    },
    {
      name: "Plan Code",
      value: BasicDetailData?.otherDetails[0]?.plan_code ??""
    },
    {
      name: "RiskProfile",
      value: BasicDetailData?.customerDetails[0]?.riskprofile ?? "",
    },
  ];


  const handleAutoTradeChange = async (e) => {
    const newValue = e.target.checked ? "YES" : "NO";
    console.log("e.target.checked", newValue);
    setAutoTrade({
      auto_trade: newValue,
    });

    try {
      console.log("formData to be saved", autoTrade);
      if (customerId && autoTrade) {
        const result = await updateAutoTrade({
          user_id: customerId,
          autoTrade,
        });
        console.log("Data saved successfully:", result);
      } else {
        console.error("customerId or formData is undefined");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openFamilyDrawer = () => {
    setIsFamilyDrawerOpen(true);
  };

  const closeFamilyDrawer = () => {
    setIsFamilyDrawerOpen(false);
  };

  const openRiskDrawer = () => {
    setIsRiskDrawerOpen(true);
  };

  const closeRiskDrawer = () => {
    setIsRiskDrawerOpen(false);
  };

  const openInvestmentDrawer = () => {
    setIsInvestmentDrawerOpen(true);
  };

  const closeInvestmentDrawer = () => {
    setIsInvestmentDrawerOpen(false);
  };

  const openManageDrawer = () => {
    setIsManageCashDrawerOpen(true);
  };

  const closeManageDrawer = () => {
    setIsManageCashDrawerOpen(false);
  };
  const openExpireDrawer = () => {
    setIsExpireDateDrawerOpen(true);
  };

  const closeExpireDrawer = () => {
    setIsExpireDateDrawerOpen(false);
  };

  const handleDownloadDoc = async (type) => {
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

  

  return (
    <Stack style={{ marginTop: "10px" }}>
      <Grid container spacing={2}>
        {customerDetail.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                {item.name === "Investment Type" ? (
                  <Box style={{ marginTop: "16px" }}>
                    <Text
                      fontSize="15px"
                      fontWeight="400"
                      sx={{ color: "#676C76", textWrap: "nowrap" }}
                    >
                      {item?.name}
                    </Text>
                  </Box>
                ) : item.name === "Plan" ? (
                  <Box style={{ marginTop: "14px" }}>
                    <Text
                      fontSize="15px"
                      fontWeight="400"
                      sx={{ color: "#676C76", textWrap: "nowrap" }}
                    >
                      {item?.name}
                    </Text>
                  </Box>
                ) : item.name === "Cash Component" ? (
                  <Box style={{ marginTop: "24px" }}>
                    <Text
                      fontSize="15px"
                      fontWeight="400"
                      sx={{ color: "#676C76", textWrap: "nowrap" }}
                    >
                      {item?.name}
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    <Text
                      fontSize="15px"
                      fontWeight="400"
                      sx={{ color: "#676C76", textWrap: "nowrap" }}
                    >
                      {item?.name}
                    </Text>
                  </Box>
                )}
              </Grid>
              <Grid item xs={10}>
                {item.name === "Investment Type" ? (
                  <Stack direction="row">
                    <Text style={{ marginRight: "8px", marginTop: "12px" }}>
                      {":"}
                    </Text>
                    <Box sx={{ marginRight: "10px" }}>
                      <TextField
                        style={{ margingLeft: "5px", height: "30px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        placeholder="Custom : ₹ 50,00,000"
                      />
                    </Box>
                    <Box sx={{ marginRight: "10px" }}>
                      <TextField
                        style={{ margingLeft: "5px", height: "30px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        placeholder="Algo (F&O) : ₹ 50,00,000"
                      />
                    </Box>
                    <Box sx={{ marginRight: "10px", textAlign: "center" }}>
                      <TextField
                        disabled
                        style={{ margingLeft: "5px", height: "30px" }}
                        value="Model Porfolio : ₹ 0"
                      />
                    </Box>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        color: "#1A54B9",
                        marginTop: "12px",
                      }}
                      onClick={openInvestmentDrawer}
                    >
                      {" "}
                      Edit Type
                    </div>
                    {isInvestmentDrawerOpen && (
                      <InvestmentSidebar
                        viewCustomerDetail={BasicDetailData}
                        customer_id={customerId}
                        closeInvestmentDrawer={closeInvestmentDrawer}
                        isInvestmentDrawerOpen={isInvestmentDrawerOpen}
                      />
                    )}
                    {/* <InvestmentSidebar /> */}
                  </Stack>
                ) : item.name === "Family Name" ? (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={1.5}
                    sx={{ width: "100%" }}
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        {":  "}
                        <Text
                          fontSize="14px"
                          fontWeight="600"
                          color="#242424"
                          marginLeft="12px"
                          marginRight="8px"
                        >
                          {item?.value}
                        </Text>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            marginLeft: "10px",
                            color: "#1A54B9",
                          }}
                          onClick={openFamilyDrawer}
                        >
                          {" "}
                          View Members
                        </div>
                        {isFamilyDrawerOpen && (
                          <ViewMembar
                            viewCustomerDetail={BasicDetailData}
                            customer_id={customerId}
                            closeFamilyDrawer={closeFamilyDrawer}
                            isFamilyDrawerOpen={isFamilyDrawerOpen}
                          />
                        )}
                        {/* <ViewMembar /> */}
                      </Box>
                    </Grid>
                  </Stack>
                ) : item.name === "Plan" ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginTop: "10px" }}>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        {":  "}
                        <Text
                          fontSize="14px"
                          fontWeight="600"
                          color="#242424"
                          marginLeft="12px"
                          marginRight="6px"
                        >
                          {item?.value}
                        </Text>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            marginLeft: "10px",
                            color: "#1A54B9",
                          }}
                          onClick={openDrawer}
                        >
                          {" "}
                          View and update plan
                        </div>
                        {isDrawerOpen && (
                          <PlanSidebar
                            viewCustomerDetail={BasicDetailData}
                            customer_id={customerId}
                            closeDrawer={closeDrawer}
                            isDrawerOpen={isDrawerOpen}
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                ) : item.name === "RiskProfile" ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Text marginRight="10px">{":"}</Text>
                        <Avatar
                          style={{ width: "52px", height: "30px",borderRadius:'0px' }}
                          src={riskcarddata[0]?.chart}
                        ></Avatar>
                        <Text
                          fontSize="14px"
                          fontWeight="600"
                          color="#242424"
                          marginLeft="12px"
                          marginRight="6px"
                        >
                          {item.value}
                        </Text>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            marginLeft: "10px",
                            color: "#1A54B9",
                          }}
                          onClick={openRiskDrawer}
                        >
                          {" "}
                          Change risk profile
                        </div>
                        {isRiskDrawerOpen && (
                          <RiskProfileSidebar
                            viewCustomerDetail={BasicDetailData}
                            customer_id={customerId}
                            closeRiskDrawer={closeRiskDrawer}
                            isRiskDrawerOpen={isRiskDrawerOpen}
                          />
                        )}
                        {/* <RiskProfileSidebar /> */}
                      </Box>
                    </Grid>
                  </Grid>
                ) : item.name === "Expiry Date" ? (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={1.5}
                    sx={{ width: "100%" }}
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        {":  "}
                        <Text
                          fontSize="14px"
                          fontWeight="600"
                          color="#242424"
                          marginLeft="12px"
                          marginRight="6px"
                        >
                          {item?.value}
                        </Text>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            marginLeft: "10px",
                            color: "#1A54B9",
                          }}
                          onClick={openExpireDrawer}
                        >
                          {" "}
                          Change Date
                        </div>
                        {isExpireDateDrawerOpen && (
                          <ExpireDateSidebar
                            viewCustomerDetail={BasicDetailData}
                            customer_id={customerId}
                            closeExpireDrawer={closeExpireDrawer}
                            isExpireDateDrawerOpen={isExpireDateDrawerOpen}
                          />
                        )}
                        {/* <ExpireDateSidebar /> */}
                      </Box>
                    </Grid>
                  </Stack>
                ) : item.name === "Auto Trade" ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Text style={{ margingLeft: "2px", marginRight: "2px" }}>
                      {":"}
                    </Text>

                    <Text fontSize="14px" fontWeight="600">
                      Off
                    </Text>
                    <AntSwitch
                      onChange={(e) => handleAutoTradeChange(e)}
                      checked={autoTrade.auto_trade === "YES" ? true : false}
                      inputProps={{ "aria-label": "ant design" }}
                    />
                    <Text fontSize="14px" fontWeight="600">
                      On
                    </Text>
                  </Stack>
                ) : item.name === "Cash Component" ? (
                  <Stack direction="row" style={{ marginTop: "10px" }}>
                    <Text style={{ marginRight: "8px", marginTop: "12px" }}>
                      {":"}
                    </Text>
                    <Box sx={{ marginRight: "10px" }}>
                      <TextField
                        style={{ margingLeft: "5px", height: "30px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        placeholder="Custom : ₹ 1,00,000"
                      />
                    </Box>
                    <Box sx={{ marginRight: "10px" }}>
                      <TextField
                        style={{ margingLeft: "5px", height: "30px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        placeholder="Algo (F&O) : ₹ 1,00,000"
                      />
                    </Box>
                    <Box sx={{ marginRight: "10px" }}>
                      <TextField
                        style={{ margingLeft: "5px", height: "30px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        placeholder="Model Porfolio : ₹ 1,00,000"
                      />
                    </Box>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        color: "#1A54B9",
                        marginTop: "12px",
                      }}
                      onClick={openManageDrawer}
                    >
                      {" "}
                      Manage Cash
                    </div>
                    {isManageCashDrawerOpen && (
                      <ManageCash
                        viewCustomerDetail={BasicDetailData}
                        customer_id={customerId}
                        closeManageDrawer={closeManageDrawer}
                        setIsManageCashDrawerOpen={setIsManageCashDrawerOpen}
                        isManageCashDrawerOpen={isManageCashDrawerOpen}
                      />
                    )}

                    {/* <ManageCash /> */}
                  </Stack>
                ) : item.name === "Plan Status" ? (
                  <Box>
                    <Stack
                      direction="row"
                      textAlign="center"
                      paddingRight="8px"
                    >
                      {":  "}
                      <ChipStyle
                        label={
                          <Text fontSize="12px" fontWeight="500">
                          {BasicDetailData?.otherDetails[0]?.plan_status}
                          </Text>
                        }
                        size="small"
                        style={{ marginLeft: "5px" }}
                      />
                    </Stack>
                  </Box>
                ) : (
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ width: "100%" }}
                    alignItems="center"
                  >
                    <Text>{":"}</Text>
                    <Text
                      component="h3"
                      fontSize="14px"
                      fontWeight="600"
                      color="#242424"
                    >
                      {item?.value}
                    </Text>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: "10px" }}>
        <Divider />
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <Text fontSize="14px" fontWeight="600">
          Documents Submitted
        </Text>
      </Box>
      <Grid container spacing={1.5} marginTop="15px">
        <Grid item xs={4}>
          <Box>
            <Text
              fontSize="16px"
              fontWeight="400"
              sx={{ color: "#676C76", textWrap: "nowrap" }}
            >
              PAN Card
            </Text>
            <DownloadButton
              variant="outlined"
              onClick={() => handleDownloadDoc("PAN_CARD")}
            >
              {BasicDetailData?.documentDetails[0]?.pan_card || "PAN Card"}
            </DownloadButton>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Text
              variant="medium"
              fontSize="16px"
              fontWeight="400"
              sx={{ color: "#676C76", textWrap: "nowrap" }}
            >
              Aadhar Card
            </Text>
            <DownloadButton
              variant="outlined"
              onClick={() => handleDownloadDoc("AADHAR_CARD")}
            >
              {BasicDetailData?.documentDetails[1]?.aadhar_card ||
                "Aadhar Card"}
            </DownloadButton>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Text
              variant="medium"
              fontSize="16px"
              fontWeight="400"
              sx={{ color: "#676C76", textWrap: "nowrap" }}
            >
              Sign Agreement
            </Text>
            <DownloadButton
              variant="outlined"
              onClick={() => handleDownloadDoc("SIGN_AGREEMENT")}
            >
              {BasicDetailData?.documentDetails[2]?.sign_agreement ||
                "Sign Agreement"}
            </DownloadButton>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BasicDetail;
