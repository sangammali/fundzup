import React, { useEffect, useState } from "react";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Button from "components/common/Button";
import Box from "components/common/Box";
import Text from "components/common/Text";
import TextField from "../common/TextField";
import MenuItem from "components/common/MenuItem";
import Grid from "components/common/Grid";
import { Chip, styled } from "@mui/material";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import dayjs from "dayjs";
import DatePicker from "components/common/DatePicker";
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

const PlanSidebar = ({
  viewCustomerDetail,
  customer_id,
  closeDrawer,
  isDrawerOpen,
}) => {
  const select = useSelector((state) => state);
  const user_id = viewCustomerDetail?.customerDetails[0]?.user_id;
  const plan_id = viewCustomerDetail?.otherDetails[0]?.plan_id;
  const getCustomerPlanAPi = customersApiAction.getCustomerPlan();
  const { data: planDetails } = customersApiAction.getPlanDetails(plan_id);
  const originalexpiryDate = viewCustomerDetail.otherDetails[0]?.end_date;
  const expiryDate = dayjs(originalexpiryDate).format("YYYY-MM-DD");
  const joining_date=viewCustomerDetail?.otherDetails[0]?.joining_date;
  const joiningDate=dayjs(joining_date).format("YYYY-MM-DD");
  const subscriptionData = getCustomerPlanAPi?.data ?? [];
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [handleupdatedPlanData] = customersApiAction.postPlanDetails();
  const [endDate, setEndDate] = useState(originalexpiryDate);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  console.log("viewCustomerDetail",viewCustomerDetail);

  console.log("planDetails",planDetails)

  const customerDetail = [
    {
      name: "Plan Status",
      key: "Plan Status",
      value: viewCustomerDetail?.otherDetails[0]?.plan_status ?? "",
    },
    {
      name: "Frequency",
      key: "Frequency",
      value: viewCustomerDetail?.otherDetails[0]?.frequency ?? "",
    },
    {
      name: "Algo (F&O)",
      // key: "Algo (F&O)",
      value: "Algo (F&O)",
      value:planDetails?.data[0]?.subCategories[0]?.algo??'',
    },
    {
      name: "Custom",
      key: "Custom",
      // value: "v",
      value:planDetails?.data[0]?.subCategories[0]?.custom??'',
    },
    {
      name: "Model Portfolio",
      key: "Model Portfolio",
      // value: "Model Portfolio",
      value: planDetails?.subCategories[0]?.modelportfolio??'',
    },
    {
      name: "Expiry Date",
      key: "Expiry Date",
      value: expiryDate ?? "",
    },
  ];

  const handleSaveClick = () => {
    const payload = {
      expiry_date: dayjs(endDate).format("YYYY-MM-DD"),
      plan_code: viewCustomerDetail?.otherDetails[0]?.plan_code,
      plan_detail_id: String(selectedValue),
    };
    handleupdatedPlanData({ user_id, payload })
      .unwrap()
      .then((response) => {
        console.log("API Response:", response);
        // You may want to handle success, e.g., close the drawer or show a success message
      })
      .catch((error) => {
        console.error("Error in API call:", error);
        // Handle error, e.g., show an error message
      });
  };

  const handleChange = () => {
    setDatePickerOpen(true);
  };

  const handleExpiryDateChange = (newEndDate) => {
    setEndDate(newEndDate);
  };

  return (
    <Stack>
      {isDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isDrawerOpen}
          closeDrawer={closeDrawer}
          title="Plan Detail"
          contentTitle=""
          handleSubmit={handleSaveClick}
          cancelButtonText="Close"
          submitButtonText="Save"
          subtitle="Here you can edit the plan."
        >
          {customerDetail.map((item, index) => (
            <Grid container key={index}>
              {item.name === "Plan Status" ? (
                <Grid item xs={12}>
                  <Stack direction="row" alignItems="center">
                    <Grid item xs={3}>
                      <Text
                        variant="small"
                        sx={{
                          color: "#667085",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        {item.name}
                      </Text>
                    </Grid>
                    <Grid item xs={9}>
                      <Stack direction="row">
                        <Box>
                          <Stack direction="row" textAlign="center">
                            <Text
                              style={{ marginLeft: "10px", fontSize: "15px" }}
                            >
                              {":"}
                            </Text>
                            <ChipStyle
                              label={
                                <Text fontSize="12px" fontWeight="500">
                                  {item.value}
                                </Text>
                              }
                              size="small"
                              style={{ marginLeft: "5px" }}
                            />
                          </Stack>
                        </Box>
                      </Stack>
                    </Grid>
                  </Stack>
                </Grid>
              ) : item.name === "Plan" ? (
                <Grid item xs={12}>
                  <Button variant="small" sx={{ color: "#667085" }}>
                    Plan Button
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={1.5}
                    sx={{ width: "100%" }}
                    alignItems="center"
                    style={{ marginTop: "2px" }}
                  >
                    <Grid item xs={3}>
                      <Text
                        variant="small"
                        fontSize="16px"
                        fontWeight="400"
                        sx={{
                          color: "#676C76",
                          textWrap: "nowrap",
                          fontSize: "16px",
                        }}
                      >
                        {item.name}
                      </Text>
                    </Grid>
                    <Grid item xs={9}>
                      <Text
                        variant="small"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          textWrap: "nowrap",
                        }}
                      >
                        {":  "}
                        {item.value}
                      </Text>
                    </Grid>
                  </Stack>
                </Grid>
              )}
            </Grid>
          ))}
          <Chip
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              borderRadius: "0px",
              height: "100px",
              padding: "10px",
            }}
            color="secondary"
            label={
              <Text
                variant="small"
                fontSize="16px"
                fontWeight="500"
              >{`Update plan :`}</Text>
            }
          ></Chip>

          <Box sx={{ m: 2 }}>
            <Text
              variant="small"
              sx={{ color: "#242424", marginBottom: "3px" }}
              fontSize="16px"
              fontWeight="600"
            >
              Plan
            </Text>
            {/* <TextField
              placeholder="Label"
              style={{ width: "100%" }}
              select
              value={selectedValue}            
              onChange={(e) => {
                const selectedPlanName = e.target.value;
                const selectedPlanObject = subscriptionData?.plans?.find(
                  (plan) => plan.name === selectedPlanName
                );

                if (selectedPlanObject) {
                  setSelectedValue(selectedPlanObject.plan_detail_id);
                }
              }}
            >
              {subscriptionData?.plans?.map((plan) => (
                <MenuItem
                  key={plan.plan_id}
                  value={plan.name}
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  {plan.name}
                </MenuItem>
              ))}
            </TextField>  */}
            <TextField
              placeholder="Label"
              style={{ width: "100%" }}
              select
              value={selectedValue}
              onChange={(e) => {
                const selectedPlanId = e.target.value;
                setSelectedValue(selectedPlanId);
              }}
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
            </TextField>
          </Box>
          <Box>
            <Text
              variant="small"
              fontSize="16px"
              fontWeight="600"
              sx={{ color: "#242424", marginBottom: "2px" }}
            >
              Plan Code
            </Text>
            <TextField
              inputProps={{ style: { fontSize: "14px" } }}
              value={viewCustomerDetail?.otherDetails[0]?.plan_code}
              // label={
              //   <Text variant="small" fontSize="14px" fontWeight="400">
              //    { viewCustomerDetail?.otherDetails[0]?.plan_code}
              //   </Text>
              // }
            />
          </Box>
          <Box>
            <Text
              variant="small"
              fontSize="16px"
              fontWeight="600"
              sx={{ color: "#242424", marginBottom: "3px" }}
            >
              Expiry Date
            </Text>
            {!isDatePickerOpen && (
              <TextField
                sx={{ width: "100%", marginTop: "3px" }}
                value={dayjs(endDate).format("YYYY-MM-DD") ?? ""}
                onClick={handleChange}
              />
            )}
            {isDatePickerOpen && (
              <DatePicker
                sx={{ width: "100%" }}
                onChange={handleExpiryDateChange}
              />
            )}
            {/* <TextField
              inputProps={{ style: { fontSize: "14px" } }}
              value={expiryDate}
              onClick={handleChange}
            /> */}
            {/* {isDatePickerOpen && (
              <DatePicker
                open={isDatePickerOpen}
                onChange={handleExpiryDateChange}
                onClose={() => setDatePickerOpen(false)}
                style={{ position: "absolute", top: "100%", left: 0 }}
              />
            )} */}
          </Box>
        </SideDrawer>
      )}
    </Stack>
  );
};

export default PlanSidebar;
