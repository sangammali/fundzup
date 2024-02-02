import React, { useState } from "react";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Box from "components/common/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Text from "components/common/Text";
import Radio from "components/common/Radio";
import Checkbox from "components/common/Checkbox";
import { Link } from "react-router-dom";
import TextField from "../common/TextField";
import DatePicker from "components/common/DatePicker";
import RadioGroup from "components/common/RadioGroup";
import { FormControl, FormControlLabel } from "@mui/material";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import dayjs from "dayjs";

const ExpireDateSidebar = ({
  viewCustomerDetail,
  customer_id,
  isExpireDateDrawerOpen,
  closeExpireDrawer,
}) => {
  const [updateExpiryDate] = customersApiAction.updateExpiryDate();
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);
  const [selecteCheckbox, setSelectCheckbox] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [formData, setFormData] = useState({
    expiry_date: "",
    remark: "",
    extension_days: "",
    is_extension: "N",
  });
  // {
  //   "expiry_date": "",
  //   "is_extension": "Y",
  //   "extension_days": "10",
  //   "remark": "replace"
  // }

  const handleCheckboxChange = () => {
    setSelectCheckbox(!selecteCheckbox);

    if (!selecteCheckbox) {
      setSelectedExpiryDate("");
      setSelectedDay("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        is_extension: "Y",
        expiry_date: "",
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        is_extension: "N",
        extension_days: "",
        expiry_date: selectedExpiryDate,
      }));
    }
  };

  const handleRadioChange = (event) => {
    setSelectedDay(event.target.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      extension_days: selecteCheckbox ? event.target.value : "",
    }));
  };

  const handleDatePickerChange = (date) => {
    const expiryDate = selecteCheckbox ? "" : dayjs(date).format("YYYY-MM-DD");
    const extensionDays = selecteCheckbox ? selectedDay : "";

    setSelectedExpiryDate(expiryDate);

    setFormData((prevFormData) => ({
      ...prevFormData,
      expiry_date: expiryDate,
      extension_days: extensionDays,
    }));
  };

  const handleRemarkChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const saveResponse = await updateExpiryDate({
        user_id: customer_id,
        formData,
      });
      console.log(formData);
      closeExpireDrawer(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Stack>
      {isExpireDateDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isExpireDateDrawerOpen}
          closeDrawer={closeExpireDrawer}
          title="Expiry Date"
          contentTitle=""
          handleSubmit={handleSubmit}
          cancelButtonText="Cancel"
          submitButtonText="Save"
          subtitle="Are you can edit expiry date."
        >
          <Box>
            <Text
              variant="small"
              fontSize="16px"
              fontWeight="500"
              disabled={selecteCheckbox}
            >
              Expiry Date
            </Text>
            <DatePicker
              sx={{ width: "100%", height: "45px", marginTop: "10px" }}
              onChange={handleDatePickerChange}
              disabled={selecteCheckbox}
            />
          </Box>
          <Box sx={{ marginLeft: "15px" }}>
            <Checkbox
              label={
                <Text
                  fontWeight="500"
                  fontSize="15px"
                  style={{ marginLeft: "10px" }}
                >
                  If this is a extension Period ?
                </Text>
              }
              size="small"
              name="sendToCustom"
              style={{ marginLeft: "15px" }}
              marginLeft="15px"
              checked={selecteCheckbox}
              onChange={handleCheckboxChange}
            />
          </Box>

          <Box>
            <FormControl>
              <Text variant="small" fontSize="16px" fontWeight="500">
                Extend the expiry date by :
              </Text>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ marginTop: "10px", marginLeft: "15px" }}
                value={selectedDay}
                onChange={handleRadioChange}
                disabled={!selecteCheckbox}
              >
                <FormControlLabel
                  value="15"
                  control={<Radio />}
                  label={
                    <Text fontSize="13px" fontWeight="500" marginLeft="9px">
                      15 Days
                    </Text>
                  }
                  disabled={!selecteCheckbox}
                />
                <FormControlLabel
                  value="30"
                  control={<Radio sx={{ variant: "small" }} />}
                  label={
                    <Text
                      variant="small"
                      fontSize="13px"
                      fontWeight="400"
                      marginLeft="10px"
                    >
                      30 Days
                    </Text>
                  }
                  sx={{ marginLeft: "8px" }}
                  disabled={!selecteCheckbox}
                />
                <FormControlLabel
                  value="45"
                  control={<Radio />}
                  label={
                    <Text
                      variant="small"
                      fontSize="13px"
                      fontWeight="400"
                      marginLeft="10px"
                    >
                      45 Days
                    </Text>
                  }
                  sx={{ marginLeft: "8px" }}
                  disabled={!selecteCheckbox}
                />
                <FormControlLabel
                  value="60"
                  control={<Radio />}
                  label={
                    <Text
                      variant="small"
                      fontSize="13px"
                      fontWeight="400"
                      marginLeft="8px"
                    >
                      60 Days
                    </Text>
                  }
                  sx={{ marginLeft: "8px" }}
                  disabled={!selecteCheckbox}
                />
                <FormControlLabel
                  value="90"
                  variant="small"
                  control={<Radio />}
                  label={
                    <Text
                      variant="small"
                      fontSize="13px"
                      fontWeight="400"
                      marginLeft="10px"
                    >
                      90 Days
                    </Text>
                  }
                  sx={{ marginTop: "15px" }}
                  disabled={!selecteCheckbox}
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <Text variant="small" fontSize="16px" fontWeight="500">
              Remark
            </Text>
            <TextField
              multiline
              rows={4}
              inputProps={{ style: { fontSize: "14px" } }}
              placeholder="Type Reason for the Change"
              name="remark"
              value={formData?.remark}
              onChange={handleRemarkChange}
            />
          </Box>
        </SideDrawer>
      )}
    </Stack>
  );
};

export default ExpireDateSidebar;
