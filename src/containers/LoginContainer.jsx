import React, { useState } from "react";
import Grid from "@mui/system/Unstable_Grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Login from "components/Login/Login";
import Otp from "components/Login/Otp";
import { authApiAction } from "stores/redux/apiSlices/authApiSlice";
import { useDispatch } from "react-redux";
import { toastActions } from "stores/redux/slices/toastSlice";
import { localStore } from "stores/localStore";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";

const LoginContainer = () => {
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [phoneorEmail, setPhoneorEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sendOtpError, setSendOtpError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [otpTimer, setOTPTimer] = useState(0);
  const [otpId, setOtpId] = useState(null);

  const [isOTPSent, setIsOTPSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook

  const [handleSendOtpApi] = authApiAction.sendOtp();
  const [handleVerifyUser] = authApiAction.verifyUser();
  const [handleResendOtpApi] = authApiAction.resendOtp();

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setPhoneorEmail(value);
  };
  const handleOtpChange = (otpValue) => {
    if (!isNaN(otpValue)  ) {
      // If it's a number and not empty, update the state
      setOtp(otpValue);
  }
  };

  const iconChange = () => {
    setIsOtpSend(false);
    setPhoneorEmail("");
  };

  const handleLoginSubmit = () => {
    const payload = {
      mobile: phoneorEmail,
      type: "mobile",
      otp: otp,
    };

    console.log("Login Submit Payload:", payload);

    handleVerifyUser(payload)
      .unwrap()
      .then((response) => {
        console.log("API Response:", response);
        dispatch(
          toastActions.setToastData({
            message: response.message,
            variant: "error",
          })
        );
        if (response) {
          dispatch(
            toastActions.setAuth({
              isAuthenticated: true,
            })
          );
          const userName = response.result.name;

          // Store token and name in local storage
          localStore.setToken(response.result.jwtToken);
          localStore.setName(userName);

          // Pass the user's name as a prop to the dashboard route
          navigate("/dashboard", { state: { userName } });
        }
      })
      .catch((error) => {
        console.error("Error in API call:", error);

        // Log the complete error object for inspection
        console.log("Complete error object:", error);

        if (error && error.data && error.data.message) {
          setOtpError(error.data.message);
        } else {
          // If no specific error message is available, use a generic one
          setOtpError("Failed to send OTP. Please try again.");
        }
      });
  };
  const handleSendOTP = () => {
    const payload = {
      mobile: phoneorEmail,
      type: "mobile",
    };

    console.log(payload, "pay--------");

    handleSendOtpApi(payload)
      .unwrap()
      .then((response) => {
        console.log("API Response:", response);

        if (response) {
          dispatch(
            toastActions.setToastData({
              message: response.message,
              variant: "error",
            })
          );

          // Log the message for further inspection
          console.log("Response Message:", response.message);

          // Check if the response message contains 'You will receive OTP shortly!'
          if (response.message.includes("You will receive OTP shortly!")) {
            console.log("Setting isOtpSend to true");
            setIsOtpSend(true);
          } else {
            console.log("Not moving to OTP screen. Message:", response.message);
          }
        } else {
          console.log("ID from API is missing or invalid:", response);
        }
      })
      .catch((error) => {
        console.error("Error in API call:", error);

        // Log the complete error object for inspection
        console.log("Complete error object:", error);

        if (error && error.data && error.data.message) {
          setSendOtpError(error.data.message);
        } else {
          // If no specific error message is available, use a generic one
          setSendOtpError("Failed to send OTP. Please try again.");
        }
      });
  };

  const handleResendOTP = () => {
    console.log("Box clicked!");
    setIsOTPSent(true);
    const payload = {
      mobile: phoneorEmail,
      type: "mobile",
    };
    console.log(payload, "respay--------");
    handleResendOtpApi(payload)
      .unwrap()
      .then((response) => {
        console.log("API Response:", response);

        if (response && response.data && response.data.id) {
          console.log("ID from API:", response.data.id);

          setOtpId(response.data.id);
          dispatch(
            toastActions.setToastData({
              message: response.message,
              variant: "error",
            })
          );
        }
      })
      .catch((error) => {
        console.error("Error in API call:", error);
      });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ maxWidth: "100vw", m: 0, p: 0, overflow: "hidden" }}
    >
      <Grid item xs={6} sx={{ p: 0, m: 0 }}>
        <Box
          sx={{
            height: "100vh",
            background: "url(/images/login-img.svg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Box sx={{ position: "absolute", top: "50px", left: "50px", gap: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: 48,
                color: "white",
                lineHeight: "normal",
              }}
            >
              FundsUp
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                color: "white",
                fontSize: 20,
              }}
            >
              The most popular stock advisory platform.
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={6} sx={{ p: 0, m: 0 }}>
        {isOtpSend === true ? (
          <Otp
            onChange={handleOtpChange}
            onReset={iconChange}
            handleLoginSubmit={handleLoginSubmit}
            otp={otp}
            mobileNumberEmail={phoneorEmail}
            resendOtp={handleResendOTP}
            otpError={otpError}
          />
        ) : (
          <Login
            onChange={handlePhoneChange}
            phoneNo={phoneorEmail}
            handleSendOTP={handleSendOTP}
            sendOtpError={sendOtpError}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default LoginContainer;
