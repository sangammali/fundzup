import React, { useState, useEffect } from "react";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Button from "components/common/Button";
import Box from "components/common/Box";
import FilterListIcon from "@mui/icons-material/FilterList";
import Text from "components/common/Text";
import Checkbox from "components/common/Checkbox";
import NewTextField from "components/common/TextField";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import { useDispatch } from "react-redux";
import { toastActions } from "stores/redux/slices/toastSlice";

const options = [
  { label: "Model-portfolio", name: "sendToModelPortfolio" },
  { label: "Custom", name: "sendToCustom" },
  { label: "Algo", name: "sendToAlgo" },
];

const AddFilter = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const getfilterData = customersApiAction.getFilterData();
  const filterDataField = getfilterData?.data??[];
  console.log("filterDataField:", filterDataField);
  const [postFilterData] = customersApiAction.getCustomerListApi();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    search: "",
    capital_from: "",
    capital_to: "",
    investment_type: "",
    plan_status: "",
    risk_profile: "",
    skip: "0",
    take: "10",
  });

  const handleCheckboxChange = (type, id) => {
    console.log("type", type);
    console.log("id", id);

    setPostData((prevData) => {
      let updatedData;

      if (prevData[type].includes(id)) {
        updatedData = {
          ...prevData,
          [type]: prevData[type]
            .split(",")
            .filter((item) => item !== id)
            .join(","),
        };
      } else {
        updatedData = {
          ...prevData,
          [type]: prevData[type] ? `${prevData[type]},${id}` : `${id}`,
        };
      }

      console.log("updatedData", updatedData);
      return updatedData;
    });
  }

  const handleInputChange = (e, field) => {
    setPostData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const saveDataToServer = async () => {
    try {
      const result = await postFilterData(postData);
      dispatch(toastActions.setFilterTableData(result));
      closeDrawer(false);
      console.log("Data saved successfully:", result);
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

  return (
    <div style={{ marginTop: "14px" }}>
      <Button
        sx={{ fontWeight: 600, borderRadius: "8px", p: 1, width: "130px" }}
        onClick={openDrawer}
        startIcon={<FilterListIcon />}
        variant="outlined"
      >
        Add Filter
      </Button>
      {isDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isDrawerOpen}
          closeDrawer={closeDrawer}
          title="Add Filter"
          subtitle="See the data in an organized manner by applying filters."
          handleSubmit={saveDataToServer}
          cancelButtonText="Clear All"
          submitButtonText="Apply"
        >
          <Text variant="small" component="h4" fontSize="16px" fontWeight="500">
            Capital range
          </Text>
          <Stack direction="row" spacing={1}>
            <NewTextField
              placeholder="Eg. from ₹ 10,00,000"
              name="capital_from"
              value={postData.capital_from}
              onChange={(e) => handleInputChange(e, "capital_from")}
            />
            <Text
              style={{ marginTop: "12px", fontSize: "14px", fontWeight: "500" }}
            >
              to
            </Text>
            <NewTextField
              placeholder="Eg. from ₹ 50,00,000"
              name="capital_to"
              value={postData.capital_to}
              onChange={(e) => handleInputChange(e, "capital_to")}
            />
          </Stack>
          <Box sx={{}}>
            <Text
              variant="small"
              component="h4"
              fontSize="16px"
              fontWeight="500"
            >
              Investment type
            </Text>
            <Stack
              direction="row"
              justifyContent="space-between"
              style={{ marginLeft: "15px" }}
            >
              {filterDataField?.result?.investFilter?.map((investData) => (
                <Checkbox
                  key={investData.product_id}
                  label={
                    <Text
                      variant="small"
                      fontWeight="400"
                      fontSize="14px"
                      style={{ marginLeft: "10px" }}
                    >
                      {investData.product_name}
                    </Text>
                  }
                  size="small"
                  name="sendToModelPortfolio"
                  checked={postData.investment_type.includes(
                    investData.product_id
                  )}
                  onChange={() =>
                    handleCheckboxChange(
                      "investment_type",
                      investData.product_id
                    )
                  }
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{}}>
            <Text
              variant="small"
              component="h4"
              fontSize="16px"
              fontWeight="500"
            >
              Plan status
            </Text>
            <Stack
              direction="row"
              justifyContent="space-between"
              style={{ marginLeft: "15px" }}
            >
              {filterDataField?.result?.planFilter &&
                Object.entries(filterDataField?.result?.planFilter).map(
                  ([planId, planLabel]) => (
                    <Checkbox
                      key={planLabel}
                      label={
                        <Text
                          variant="small"
                          fontWeight="400"
                          fontSize="14px"
                          style={{ marginLeft: "10px" }}
                        >
                          {planLabel}
                        </Text>
                      }
                      size="small"
                      name={`sendToModelPortfolio-${planLabel}`}
                      checked={postData.plan_status.includes(planLabel)}
                      onChange={() =>
                        handleCheckboxChange("plan_status", planLabel)
                      }
                    />
                  )
                )}
            </Stack>
          </Box>

          <Box>
            <Text
              variant="small"
              component="h4"
              fontSize="16px"
              fontWeight="500"
            >
              Risk profile
            </Text>
            <Stack
              direction="column"
              spacing={1.5}
              sx={{ width: "100%" }}
              alignItem="center"
              justifyContent="center"
              style={{ marginTop: "1px", marginLeft: "5px" }}
            >
              {filterDataField?.result?.riskFilter?.map((riskFilter) => (
                <Checkbox
                  key={riskFilter.risk_profile_id}
                  label={
                    <Text
                      variant="small"
                      fontWeight="400"
                      fontSize="14px"
                      style={{ marginLeft: "10px" }}
                    >
                      {riskFilter.name}
                    </Text>
                  }
                  size="small"
                  name="sendToModelPortfolio"
                  checked={postData.risk_profile.includes(
                    riskFilter.risk_profile_id
                  )}
                  onChange={() =>
                    handleCheckboxChange(
                      "risk_profile",
                      riskFilter.risk_profile_id
                    )
                  }
                />
              ))}
            </Stack>
          </Box>
        </SideDrawer>
      )}
    </div>
  );
};

export default AddFilter;
