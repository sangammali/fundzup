import React from "react";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import TextField from "components/common/TextField";
import Button from "components/common/Button";
import Text from "components/common/Text";
import OTPInput from "react-otp-input";
import Card from "components/common/Card";
import { styled } from "@mui/material";

const OtpButton = styled(Button)(({}) => ({
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: 600,
  padding: "12px 35px",
}));
const OtpVerficationBox = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "row",
  marginTop: "20px",
  marginBottom: "10px",
}));
const OtpVerficationText = styled(Text)(({}) => ({
  fontSize: "14px",
  color: "#242424",
  fontWeight: "500px",
}));
const OtpBox = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "row",
  marginLeft: "-5px",
  marginBottom: "24px",
}));

const otpFieldStyle = {
  width: 72,
  height: 60,
  borderRadius: "10px",
  border: "1px solid #CBCBCB",
  color: "black",
  margin: "0 5px",
  fontSize:"15px"
};

function CustomerDetails({
  handleBasicFormChange,
  formData,
  handleEmailOtpSubmit,
  handlePhoneOtpSubmit,
  handleEmailOtpSend,
  handlePhoneOtpSend,
  isEmailOtpSend,
  isPhoneOtpSend,
  isEmailVerified,
  basicDetailsError,
}) {
  console.log("isEmailVerified : ", isEmailVerified);
  return (
		<>
			<Card sx={{ borderRadius: "16px", p: 5, mb: 8 }}>
				<Box sx={{ mb: "28px" }}>
					<Text variant="subtitle1" color="#242424">
						Customer Details
					</Text>
				</Box>

				<Box sx={{ mb: "24px" }}>
					<Text sx={{ mb: "10px", color: "#242424", fontSize: "14px" }}>
						Customer name
					</Text>
					<TextField
						onChange={({ target }) => {
							handleBasicFormChange(target.name, target.value);
						}}
						sx={{ width: "494px" }}
						name="name"
						placeholder="Enter Customer name"
						value={formData.name}
					/>
				</Box>

				<Stack direction="row" justifyContent="start" alignItems="flex-end">
					<Box>
						<Text sx={{ mb: "10px", color: "#242424", fontSize: "14px" }}>
							Email ID
						</Text>
						<TextField
							sx={{ mr: "20px", width: "494px" }}
							name="email"
							placeholder="Enter email ID"
							onChange={({ target }) => {
								handleBasicFormChange(target.name, target.value);
							}}
							value={formData.email}
						/>
					</Box>
					<OtpButton onClick={handleEmailOtpSend} disabled={!formData.name}>
						Send OTP
					</OtpButton>
				</Stack>
				{basicDetailsError.email && (
					<Text sx={{ py: 1 }} variant="small" color="red">
						{basicDetailsError.email}
					</Text>
				)}

				{isEmailOtpSend ? (
					<Box>
						<OtpVerficationBox>
							<OtpVerficationText> OTP Verification</OtpVerficationText>
						</OtpVerficationBox>

						<OtpBox>
							<Box>
								<OTPInput
									value={formData.emailOtp}
									onChange={(value) => {
										handleBasicFormChange("emailOtp", value);
									}}
									numInputs={6}
									placeholder="0"
									inputStyle={{
										...otpFieldStyle,
									}}
									renderSeparator={<span></span>}
									renderInput={(props) => <input {...props} />}
								/>
								{basicDetailsError.emailOtp && (
									<Text sx={{ py: 1 }} variant="small" color="red">
										{basicDetailsError.emailOtp}
									</Text>
								)}
							</Box>
							<OtpButton sx={{ ml: 2.5 }} onClick={handleEmailOtpSubmit}>
								Confirm OTP
							</OtpButton>
						</OtpBox>
					</Box>
				) : null}

				<Box sx={{ mt: "24px" }}>
					<Text sx={{ mb: "10px", color: "#242424", fontSize: "14px" }}>
						Phone Number
					</Text>
					<TextField
						sx={{ mr: "20px", width: "494px" }}
						name="phoneNo"
						placeholder="Enter phone number"
						value={formData.phoneNo}
						onChange={({ target }) => {
							handleBasicFormChange(target.name, target.value);
						}}
						disabled={!isEmailVerified}
					/>
					<OtpButton
						onClick={handlePhoneOtpSend}
						disabled={!formData.name || !isEmailVerified}
					>
						Send OTP
					</OtpButton>
				</Box>
				{basicDetailsError.phoneNo && (
					<Text sx={{ py: 1 }} variant="small" color="red">
						{basicDetailsError.phoneNo}
					</Text>
				)}

				{isPhoneOtpSend ? (
					<Box>
						<OtpVerficationBox>
							<OtpVerficationText> OTP Verification</OtpVerficationText>
						</OtpVerficationBox>

						<OtpBox>
							<Box>
								<OTPInput
									value={formData.phoneOtp}
									onChange={(value) => {
										handleBasicFormChange("phoneOtp", value);
									}}
									numInputs={6}
									placeholder="0"
									inputStyle={{ ...otpFieldStyle }}
									renderSeparator={<span></span>}
									renderInput={(props) => <input {...props} />}
								/>
								{basicDetailsError.phoneOtp && (
									<Text sx={{ py: 1 }} variant="small" color="red">
										{basicDetailsError.phoneOtp}
									</Text>
								)}
							</Box>

							<OtpButton sx={{ ml: 2.5 }} onClick={handlePhoneOtpSubmit}>
								Confirm OTP
							</OtpButton>
						</OtpBox>
					</Box>
				) : null}
			</Card>
		</>
  );
}

export default CustomerDetails;
