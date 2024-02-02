import React from "react";
import Box from "components/common/Box";
import Text from "components/common/Text";
import TextField from "components/common/TextField";
import Button from "components/common/Button";
import Card from "components/common/Card";
import Grid from "components/common/Grid";
import Radio from "components/common/Radio";
import Checkbox from "components/common/Checkbox";
import FileUpload from "components/common/FileUpload";
import MenuItem from "components/common/MenuItem";
import DatePicker from "components/common/DatePicker";
import Stack from "components/common/Stack";
import { Link } from "@mui/material";
import { styled } from "@mui/material";

const PreviousButton = styled(Button)(({}) => ({
  borderRadius: "8px",
  textTransform: "capitalize",
  padding: "18px 28px",
  marginRight: "20px",
  fontWeight: 600,
  width: "160px",
  border: "1.3px solid #142E56",
}));

const PlanText = styled(Text)(({}) => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
}));

const IndianText = styled(Text)(({}) => ({
  fontSize: "16px",
  fontWeight: 400,
  color: "#242424",
  marginRight: "20px",
}));

const CustomerCategoryText = styled(Text)(({}) => ({
  fontSize: "16px",
  fontWeight: 400,
  color: "#242424",
  marginRight: "20px",
}));

const CustomerTypeText = styled(Text)(({}) => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "12px",
}));

const AdvisoryCustomerText = styled(Text)(({}) => ({
  fontSize: "16px",
  fontWeight: 400,
  color: "#242424",
  marginRight: "8px",
}));

const JoiningDateText = styled(Text)(({}) => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "12px",
}));

const AutoTradeText = styled(Text)(({}) => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "6px",
}));

const PanCardText = styled(Text)(({}) => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "12px",
}));

const SubmitButton = styled(Button)(({}) => ({
  backgroundColor: "#142E56",
  color: "#FFF",
  fontSize: "14px",
  borderRadius: "8px",
  padding: "18px 28px",
  width: "260px",
  mb: 8,
}));

const currencies = [
  {
    value: "StockName",
    label: "RELIANCE",
  },
  {
    value: "StockName",
    label: "TATA MOTORS",
  },
  {
    value: "StockName",
    label: "ADANI GROUP",
  },
  {
    value: "JStockName",
    label: "MARUTI SUZUKI",
  },
];

function OtherDetails(props) {
  const {
    handleChange,
    handleStepChange,
    handleSubmit,
    formData,
    planList,
    familyList,
    formError,
  } = props;
  return (
    <>
      <Box>
        <Card sx={{ p: 4, borderRadius: "16px", mb: "36px" }}>
          <Box>
            <Grid container spacing={4}>
              <Grid item md={6}>
                <Box sx={{ mb: "28px" }}>
                  <Text sx={{ color: "#242424", fontWeight: "600px" }}>
                    Other details
                  </Text>
                </Box>
              </Grid>
              <Grid item md={6}></Grid>

              <Grid item md={6}>
                <Box sx={{ width: "100%" }}>
                  <PlanText>Plan</PlanText>

                  <TextField
                    placeholder="Enter Stock name"
                    select
                    onChange={(e) => {
                      handleChange({
                        name: e.target.name,
                        value: e.target.value,
                      });
                    }}
                    name="plan"
                  >
                    {planList?.map((plan) => (
                      <MenuItem key={plan.plan_id} value={plan}>
                        {plan.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formError.plan && (
                    <Text variant="small" color="red" py={1}>
                      {formError.plan}
                    </Text>
                  )}
                </Box>
              </Grid>

              <Grid item md={6}>
                <Box sx={{ width: "100%" }}>
                  <PlanText>Plan code</PlanText>
                  <TextField
                    placeholder="Plan code"
                    disabled
                    sx={{ borderRadius: "8px" }}
                    value={formData?.plan?.code}
                  />
                </Box>
              </Grid>

              <Grid item md={6}>
                <Box sx={{ width: "100%" }}>
                  <PlanText>Plan start date</PlanText>
                  <DatePicker
                    value={formData.planStartDate}
                    sx={{ width: "100%" }}
                    onChange={(d) => {
                      handleChange({ name: "planStartDate", value: d["$d"] });
                    }}
                  />
                  {formError.planStartDate && (
                    <Text variant="small" color="red" py={1}>
                      {formError.planStartDate}
                    </Text>
                  )}
                </Box>
              </Grid>

              <Grid item md={6}>
                <Box sx={{ width: "100%" }}>
                  <PlanText>Plan expiry date</PlanText>
                  <DatePicker
                    value={formData.planExpiryDate}
                    sx={{ width: "100%" }}
                    onChange={(d) => {
                      handleChange({
                        name: "planExpiryDate",
                        value: d["$d"],
                      });
                    }}
                  />
                  {formError.planExpiryDate && (
                    <Text variant="small" color="red" py={1}>
                      {formError.planExpiryDate}
                    </Text>
                  )}
                </Box>
              </Grid>

              <Grid item md={6}>
                <Box sx={{ width: "100%" }}>
                  <PlanText sx={{ mb: "12px" }}>Customer residency</PlanText>

                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Radio
                      value="Indian"
                      name="customerResidency"
                      sx={{ mr: "8px" }}
                      checked={formData.customerResidency === "Indian"}
                      onChange={() => {
                        handleChange({
                          name: "customerResidency",
                          value: "Indian",
                        });
                      }}
                    />

                    <IndianText>Indian</IndianText>
                    <Radio
                      value="NonIndia"
                      name="customerResidency"
                      sx={{ mr: "8px" }}
                      checked={formData.customerResidency === "NonIndia"}
                      onChange={() => {
                        handleChange({
                          name: "customerResidency",
                          value: "NonIndia",
                        });
                      }}
                    />

                    <IndianText>Non-indian</IndianText>

                    <Radio
                      value="Nri"
                      name="customerResidency"
                      sx={{ mr: "8px" }}
                      checked={formData.customerResidency === "Nri"}
                      onChange={() => {
                        handleChange({
                          name: "customerResidency",
                          value: "Nri",
                        });
                      }}
                    />

                    <IndianText>NRI</IndianText>
                  </Box>
                  {formError.customerResidency && (
                    <Text variant="small" color="red" py={1}>
                      {formError.customerResidency}
                    </Text>
                  )}
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ width: "100%" }}>
                  <PlanText sx={{ mb: "10px" }}>Customer category</PlanText>

                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Radio
                      value="Individual"
                      sx={{ mr: "8px" }}
                      checked={formData.customerCategory === "Individual"}
                      onChange={() => {
                        handleChange({
                          name: "customerCategory",
                          value: "Individual",
                        });
                      }}
                    />

                    <IndianText>Individual</IndianText>
                    <Radio
                      value="NonIndividual"
                      sx={{ mr: "8px" }}
                      checked={formData.customerCategory === "NonIndividual"}
                      onChange={() => {
                        handleChange({
                          name: "customerCategory",
                          value: "NonIndividual",
                        });
                      }}
                    />

                    <IndianText>Non - Individual</IndianText>
                  </Box>
                  {formError.customerCategory && (
                    <Text variant="small" color="red" py={1}>
                      {formError.customerCategory}
                    </Text>
                  )}
                </Box>
              </Grid>

              <Grid item md={6}>
                <Box sx={{ mb: "0px" }}>
                  <CustomerTypeText>Customer type</CustomerTypeText>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Radio
                      value="Customer"
                      sx={{ mr: "8px" }}
                      checked={formData.customerType === "Customer"}
                      onChange={() => {
                        handleChange({
                          name: "customerType",
                          value: "Customer",
                        });
                      }}
                    />

                    <CustomerCategoryText>Customer</CustomerCategoryText>
                    <Radio
                      value="Advisory"
                      sx={{ mr: "8px" }}
                      checked={formData.customerType === "Advisory"}
                      onChange={() => {
                        handleChange({
                          name: "customerType",
                          value: "Advisory",
                        });
                      }}
                    />

                    <AdvisoryCustomerText>
                      Advisory customer
                    </AdvisoryCustomerText>
                    {/* <Box
                      component="img"
                      alt="Exclamation"
                      src="./images/exclamation-icon.svg"
                    ></Box> */}
                  </Box>
                  {formError.customerType && (
                    <Text variant="small" color="red" py={1}>
                      {formError.customerType}
                    </Text>
                  )}
                </Box>
              </Grid>
              <Grid item md={6}></Grid>

              <Grid item md={6}>
                <Box sx={{ width: "100%", mb: "0px" }}>
                  <JoiningDateText>Joining date</JoiningDateText>
                  <DatePicker
                    value={formData.joiningDate}
                    sx={{ width: "100%" }}
                    onChange={(d) => {
                      handleChange({ name: "joiningDate", value: d["$d"] });
                    }}
                  />
                  {formError.joiningDate && (
                    <Text variant="small" color="red" py={1}>
                      {formError.joiningDate}
                    </Text>
                  )}
                </Box>
              </Grid>
              <Grid item md={6}></Grid>

              <Grid item md={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="start"
                >
                  <Checkbox
                    sx={{ py: 0 }}
                    onChange={(checked) => {
                      handleChange({
                        name: "isAddUserToFamilyChecked",
                        value: checked,
                      });
                    }}
                    checked={formData.isAddUserToFamilyChecked}
                  />
                  <Text
                    sx={{
                      color: "#242424",
                      fontSize: "16px",
                      fontWeight: "400px",
                    }}
                  >
                    Add user to any family group?
                  </Text>
                </Stack>
              </Grid>
              {formData.isAddUserToFamilyChecked ? (
                <Grid item md={6}>
                  <Box sx={{ width: "100%", mb: "0px" }}>
                    {/*  */}
                    <JoiningDateText>Select family group</JoiningDateText>

                    <TextField
                      placeholder="Select family group"
                      select
                      value={formData.family}
                      onChange={(e) => {
                        handleChange({
                          name: e.target.name,
                          value: e.target.value,
                        });
                      }}
                      name="family"
                    >
                      {familyList?.map((family) => (
                        <MenuItem key={family?.value} value={family}>
                          {family?.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    {formError.family && (
                      <Text variant="small" color="red" py={1}>
                        {formError.family}
                      </Text>
                    )}
                  </Box>
                </Grid>
              ) : (
                <></>
              )}

              <Grid item md={12}>
                <Stack direction="row" alignItems="start">
                  <Checkbox
                    sx={{ py: 0 }}
                    checked={formData.isAutoCheck}
                    onChange={(checked) => {
                      handleChange({
                        name: "isAutoCheck",
                        value: checked,
                      });
                    }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {/*  */}
                    <AutoTradeText>Auto trade?</AutoTradeText>
                    <Text
                      sx={{
                        color: "#676C76",
                        fontSize: "14px",
                        fontWeight: "400px",
                      }}
                    >
                      All the trades will be initiated without approval.
                    </Text>
                  </Box>
                </Stack>
              </Grid>

              <Grid item md={6}>
                <Box>
                  <PanCardText>PAN Card</PanCardText>
                  <FileUpload name="panNo" handleChange={handleChange} />
                  {formError.panNo && (
                    <Text variant="small" color="red" py={1}>
                      {formError.panNo}
                    </Text>
                  )}
                </Box>
              </Grid>

              <Grid item md={6}>
                <Box>
                  <PanCardText>Aadhar Card</PanCardText>
                  <FileUpload name="aadharCard" handleChange={handleChange} />
                  {formError.aadharCard && (
                    <Text variant="small" color="red" py={1}>
                      {formError.aadharCard}
                    </Text>
                  )}
                </Box>
              </Grid>

              <Grid item md={6}>
                <Box>
                  <PanCardText>Sign agreement</PanCardText>
                  <FileUpload
                    name="signAgreement"
                    handleChange={handleChange}
                  />
                  {formError.signAgreement && (
                    <Text variant="small" color="red" py={1}>
                      {formError.signAgreement}
                    </Text>
                  )}
                </Box>
              </Grid>

              <Grid item md={6}></Grid>
              <Grid item md={6}>
                <Box sx={{ display: "flex" }}>
                  <Box
                    component="img"
                    alt="Exclamation"
                    src="./images/download.svg"
                  />

                  {/* <Link
                    href="#"
                    underline="always"
                    sx={{
                      color: "#0C53B4",
                      fontSize: "14px",
                      fontWeight: "500px",
                    }}
                  >
                    {"Download format here"}
                  </Link> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <PreviousButton variant="outlined" onClick={()=>{handleStepChange(3)}}>Previous</PreviousButton>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </Box>
      </Box>
    </>
  );
}

export default OtherDetails;
