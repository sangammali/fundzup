import React, { useState } from "react";
import Grid from "components/common/Grid";
import Box from "components/common/Box";
import Text from "components/common/Text";
import TextField from "components/common/TextField";
import Button from "components/common/Button";
import Stack from "components/common/Stack";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const { onChange, phoneNo, handleSendOTP, customerLogin  = false, sendOtpError } = props;
  const navigate = useNavigate();
  const [button, setButton] = useState(false);
  // const [customerSignUp, setCustomerSignUp] = useState(false);
  // const [customerLogin , setCustomerLogin] = useState(false)
  function otplogin() {
    setButton(true);
  }
  // function customerSignUpfn (){
  //   setCustomerSignUp(true)
  // }

  // function customerLogin() {
  //   setCustomerLogin(CustomerLogin)
  // }
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
              width: "452px",
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
              Login
            </Text>

            <Text
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: "#475467",
                marginBottom: "32px",
              }}
            >
              It's great to see you here, sign-in to begin your journey.
            </Text>

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
              placeholder="Enter your phone number or Email ID"
              onChange={onChange}
            />
            {sendOtpError && (
              <Text variant="body2" color="error">
                {sendOtpError}
              </Text>
            )}

            <Box sx={{ width: "100%" }}>
              <Button
                sx={{
                  background: "#142E56",
                  color: "white",
                  width: "100%",
                  mb: "24px",
                  height: "56px",
                  borderRadius: "8px",
                  "&:hover": {
                    background: "#142E56",
                  },
                }}
                onClick={handleSendOTP}
              >
                Send OTP
              </Button>

              {customerLogin ? (
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
                        cursor:"pointer"
                      }}
                      onClick={()=>navigate("/customer/signup")}
                    >
                      Sign up
                    </Typography>
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={2} p={0}></Grid>
      </Grid>
    </>
  );
}

export default Login;
