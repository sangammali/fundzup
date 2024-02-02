import React, { useState } from "react";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Button from "components/common/Button";
import Box from "components/common/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Text from "components/common/Text";
import NewTextField from "../common/TextField";
import Grid from "components/common/Grid";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import { useSelector } from "react-redux";

const BlockCustomer = ({
  viewCustomerDetail,
  isBlockDrawerOpen,
  closeBlockDrawer,
}) => {
  const [reason, setReason] = useState("");
  const [postBlockCustomer] = customersApiAction.postBlockCustomer();
  const select = useSelector((state) => state);
  const customerId = select?.toast?.breadCrumbData?.user_id;
  const name = select?.toast?.breadCrumbData?.name;
  // const customerId = viewCustomerDetail?.user_id;

  const handleRemarkChange = (event) => {
    const { name, value } = event.target;
    setReason(value);
  };

  const handleSubmit = async () => {
    try {
      const saveResponse = await postBlockCustomer({
        user_id: customerId,
        reason: reason,
      }).unwrap();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Stack>
      {isBlockDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isBlockDrawerOpen}
          closeDrawer={closeBlockDrawer}
          title="Block Customer"
          contentTitle=""
          handleSubmit={handleSubmit}
          cancelButtonText="Cancel"
          submitButtonText="Block Now"
          subtitle="Here you can block the customer by adding remark."
        >
          <Grid container style={{ marginTop: "2px" }}>
            <Grid item xs={6}>
              <Text
                variant="small"
                component="h4"
                fontSize="16px"
                fontWeight="400"
                sx={{ color: "#676C76", textWrap: "nowrap" }}
              >
                Customer Name
              </Text>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row">
                {":   "}
                <Text
                  fontSize="16px"
                  variant="small"
                  component="h4"
                  fontWeight="500"
                  paddingLeft="14px"
                >
                  {name}
                </Text>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ width: "400px", m: 5 }}>
            <Text
              variant="small"
              component="h4"
              fontSize="15px"
              fontWeight="500"
              marginBottom="3px"
            >
              Reason to Block
            </Text>
            <NewTextField
              rows={4}
              multiline
              inputProps={{ style: { fontSize: "14px" } }}
              placeholder="Type reason here"
              name="reason"
              onChange={handleRemarkChange}
              style={{ width: "108%" }}
            />
          </Box>
        </SideDrawer>
      )}
    </Stack>
  );
};

export default BlockCustomer;
