import React, { useState, useEffect } from "react";
import Grid from "components/common/Grid";
import Box from "components/common/Box";
import Text from "components/common/Text";
import TextField from "components/common/TextField";
import Button from "components/common/Button";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import OTPInput from "react-otp-input";

const OtpLogin = (props) => {
  const {
    onReset,
    handleLoginSubmit,
    otp,
    onChange,
    mobileNumberEmail,
    resendOtp,
    OtpError,
  } = props;
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    let interval;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [resendTimer]);

  return (
    <Grid>
      <Grid
        container
        spacing={0}
        sx={{
          height: "97vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text
              sx={{
                fontSize: "30px",
                fontWeight: 600,
                color: "#1D2939",
                lineHeight: "38px",
              }}
            >
              OTP Verification
            </Text>

            <Text
              variant="body2"
              sx={{
                fontWeight: 400,
                lineHeight: "24px",
                marginTop: "20px",
              }}
            >
              We have sent an OTP to
              <span style={{ color: "#1A54B9", fontWeight: 500 }}>
                {mobileNumberEmail}
              </span>
              <IconButton onClick={onReset} aria-label="edit">
                <EditIcon
                  sx={{
                    marginBottom: "5px",
                    fontSize: "18px",
                    color: "#1A54B9",
                  }}
                />
              </IconButton>
            </Text>
            <OTPInput
              value={otp}
              onChange={onChange} // This should directly receive the entered value
              numInputs={6}
              placeholder="0"
              inputStyle={{
                width: 62,
                height: 60,
                borderRadius: "10px",
                border: "1px solid #CBCBCB",
                color: "black",
                fontSize:"17px",
                margin: "0 5px",
              }}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />

            <Button
              onClick={handleLoginSubmit}
              variant="contained"
              sx={{
                width: "452px",
                height: "56px",
                borderRadius: "8px",
                marginTop: "30px",
                background: "#142E56",
                "&:hover": {
                  background: "#142E56",
                },
              }}
            >
              Confirm OTP
            </Button>
            <Box onClick={resendOtp}>
              <Text
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#1A54B9",
                  lineHeight: "20px",
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >
                {resendTimer > 0
                  ? `Resend OTP in 00:${String(resendTimer).padStart(2, "0")}`
                  : "You can resend OTP now"}
              </Text>
              {OtpError && (
                <Text variant="body2" color="error">
                  {OtpError}
                </Text>
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OtpLogin;
