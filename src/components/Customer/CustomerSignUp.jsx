import React from "react";
import Grid from "components/common/Grid";
import Box from "components/common/Box";
import Text from "components/common/Text";
import TextField from "components/common/TextField";
import Button from "components/common/Button";
import Stack from "components/common/Stack";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/styles";

const SendOTPbtn = styled(Button)(() => ({
  background: "#142E56",
  color: "white",
  width: "100%",
  mb: "24px",
  height: "56px",
  borderRadius: "8px",
  "&:hover": {
    background: "#142E56",
  },
}));

function CustomerSignUp(props) {
  const { onChange, phoneNo, handleSendOTP, customerLogin = false } = props;
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} p={0}></Grid>
        <Grid item xs={8} p={0}>
          <Stack
            justifyContent="center"
            alignItems="start"
            sx={{
              height: "100vh",
            }}
          >
            <Text
              sx={{
                color: "#242424",
                fontSize: 30,
                fontWeight: 600,
                mb: "8px",
              }}
            >
              Sign up
            </Text>

            <Text
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: "#475467",
                marginBottom: "32px",
              }}
            >
              It's great to see you here, sign-up to begin your journey.
            </Text>

            <Text
              sx={{
                fontSize: 14,
                color: "#344054",
                fontWeight: 500,
                marginBottom: "6px",
              }}
            >
              Name
            </Text>

            <TextField
              value={phoneNo}
              name="phoneOrEmail"
              sx={{
                width: "100%",
                marginBottom: "24px",
              }}
              placeholder="Enter Your Name"
              onChange={onChange}
            />

            <Text
              sx={{
                fontSize: 14,
                color: "#344054",
                fontWeight: 500,
                marginBottom: "6px",
              }}
            >
              Phone number / Email ID
            </Text>

            <TextField
              value={phoneNo}
              name="phoneOrEmail"
              sx={{
                width: "100%",
                marginBottom: "24px",
              }}
              placeholder="Enter Your email ID"
              onChange={onChange}
            />

            <Text
              sx={{
                fontSize: 14,
                color: "#344054",
                fontWeight: 500,
                marginBottom: "6px",
              }}
            >
              Phone number / Email ID
            </Text>

            <TextField
              value={phoneNo}
              name="phoneOrEmail"
              sx={{
                width: "100%",
                marginBottom: "24px",
              }}
              placeholder="Enter your phone number"
              onChange={onChange}
            />

            <Box sx={{ width: "100%" }}>
              <SendOTPbtn onClick={handleSendOTP}>Send OTP</SendOTPbtn>

              <Box>
                <Typography
                  sx={{
                    color: "#676C76",
                    fontSize: "16px",
                    fontWeight: 500,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Don't have an account?
                  <Typography
                    sx={{
                      color: "#1A54B9",
                      fontSize: "16px",
                      fontWeight: 600,
                      ml: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/customer/login");
                    }}
                  >
                    Log in
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={2} p={0}></Grid>
      </Grid>
    </>
  );
}

export default CustomerSignUp;
