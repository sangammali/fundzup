import React, { useState } from "react";
import Grid from "@mui/system/Unstable_Grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Login from "components/Login/Login";
import Otp from "components/Login/Otp";

function CustomerLoginContainer() {
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [phoneorEmail, setPhoneorEmail] = useState("");

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPhoneorEmail(value);
  };

  const iconChange = () => {
    console.log("clicked");
    setIsOtpSend(false);
    setPhoneorEmail("");
  };
  const handleSendOTP = () => {
    setIsOtpSend(true);
  };
  return (
    <>
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
            <Box
              sx={{ position: "absolute", top: "50px", left: "50px", gap: 8 }}
            >
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
          {isOtpSend ? (
            <Otp onReset={iconChange} />
          ) : (
            <Login
              onChange={handlePhoneChange}
              phoneNo={phoneorEmail}
              handleSendOTP={handleSendOTP}
              customerLogin={true}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default CustomerLoginContainer;
