import React, { useState } from "react";
import Button from "components/common/Button";
import Card from "components/common/Card";
import Text from "components/common/Text";
import Box from "components/common/Box";
import Divider from "components/common/Divider";
import Grid from "components/common/Grid";
import TextField from "components/common/TextField";
import FileUpload from "components/common/FileUpload";
import Stack from "components/common/Stack";
import DownloadButton from "components/common/DownloadButton";
import OnOffButton from "components/addCustomer/OnOffButton";
import { Chip } from "@mui/material";
import { styled } from "@mui/system";

const ProfileBox = styled(Box)(() => ({
  width: "236px",
  height: "236px",
  borderRadius: "9px",
  backgroundColor: "#E5EEFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CancelBtn = styled(Button)(() => ({
  border: "1px solid #142E56",
  borderRadius: "4px",
  color: "#142E56",
  textTransform: "capitalize",
  width: "116px",
  padding: "8px 16px",
  marginRight: 4,
}));

const SaveBtn = styled(Button)(() => ({
  border: "1px solid #142E56",
  borderRadius: "4px",
  color: "#FFF",
  textTransform: "capitalize",
  width: "116px",
  padding: "8px 16px",
  marginLeft: 4,
}));

const ChipStyle = styled(Chip)(() => ({
  backgroundColor: "#B22323",
  color: "#FFFFFF",
  width: "103px",
  height: "28px",
  padding: "0px 10px",
  marginLeft: "20px",
}));

const LabelText = styled(Text)(() => ({
  fontSize: "16px",
  fontWeight: 400,
  color: "#667085",
  width: "250px",
  textTransform: "uppercase",
}));

const CustomerProfileCard = () => {
  const userDetails = [
    {
      label: "Email",
      key: "email",
      value: "christophernolan@gmail.com",
      isEditable: true,
    },
    { label: "Phone", key: "phone", value: "+91 9838384721", isEditable: true },
    {
      label: "Customer residency",
      key: "joiningDate",
      value: "Indian",
      isEditable: true,
    },
    {
      label: "Customer Type",
      key: "userType",
      value: "Customer",
      isEditable: false,
    },
    {
      label: "Auto trade",
      key: "autoTrade",
      value: true,
      isEditable: false,
    },
    {
      label: "Customer category",
      key: "customerCategory",
      value: "Individual",
      isEditable: true,
    },
    {
      label: "Family name",
      key: "familyName",
      value: "Shah family",
      isEditable: false,
    },
    { label: "Plan", key: "plan", value: "Shah family", isEditable: false },
    {
      label: "Expiry Date",
      key: "expiryDate",
      value: {
        date: "23 sept 2023",
        isExpired: true,
      },
      isEditable: false,
    },
    {
      label: "Risk Profile",
      key: "risk",
      value: "Aggressive risk profile",
      isEditable: false,
    },
  ];
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [additionalStocks, setAdditionalStocks] = useState(4);

  const handleAddStock = () => {
    setAdditionalStocks((prevCount) => prevCount + 1);
  };

  const handleEditClick = () => {
    setEditMode(true);
    const initialEditedValues = {};
    userDetails.forEach((detail) => {
      initialEditedValues[detail.key] = detail.value;
    });
    setEditedValues(initialEditedValues);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = () => {
    console.log("Edited values:", editedValues);
    setEditMode(false);
  };

  const handleInputChange = (key, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return (
    <>
      <Box>
        <Card sx={{ p: "24px" }}>
          <Stack direction="row" justifyContent="space-between" p="16px">
            <Stack>
              <Text
                sx={{ color: "#101828", fontSize: "20px", fontWeight: 500 }}
              >
                Rishikesh Pawar
              </Text>
            </Stack>

            <Box>
              {editMode ? (
                <>
                  <CancelBtn variant="outlined" onClick={handleCancelClick}>
                    {" "}
                    Cancel
                  </CancelBtn>

                  <SaveBtn variant="contained" onClick={handleSaveClick}>
                    Save
                  </SaveBtn>
                </>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleEditClick}
                  sx={{
                    border: "1px solid #828282",
                    borderRadius: "4px",
                    color: "#101828",
                    textTransform: "capitalize",
                  }}
                >
                  Edit Details
                </Button>
              )}
            </Box>
          </Stack>

          <Divider />

          <Stack direction="row" p="32px 0px 32px 40px">
            <ProfileBox>
              <Text
                sx={{ fontSize: "64px", fontWeight: 600, color: "#104960" }}
              >
                RP
              </Text>
            </ProfileBox>

            <Box sx={{ marginLeft: 8 }}>
              {userDetails.map((detail, index) => {
                if (detail.key === "autoTrade") {
                  return (
                    <Stack
                      direction="row"
                      alignItems="center"
                      key={index}
                      sx={{
                        mb: 2,
                      }}
                    >
                      <LabelText>{detail.label}:</LabelText>
                      <OnOffButton />
                    </Stack>
                  );
                }

                if (detail.key === "expiryDate") {
                  return (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      mb={2}
                    >
                      <LabelText>{detail.label}:</LabelText>
                      <Stack direction="row" alignItems="center">
                        <Text sx={{ width: "120px" }}>{detail.value.date}</Text>
                        {detail.value.isExpired && (
                          <ChipStyle label="Expired" />
                        )}
                        <Text
                          sx={{
                            ml: "20px",
                            color: "#1A54B9",
                            fontSize: "16px",
                            fontWeight: 500,
                            // width:"100px"
                          }}
                        >
                          Update Plan
                        </Text>
                      </Stack>
                    </Stack>
                  );
                }

                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Text
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#667085",
                        width: "250px",
                        textTransform: "uppercase",
                      }}
                    >
                      {detail.label}:
                    </Text>
                    {editMode && detail.isEditable ? (
                      <TextField
                        placeholder={detail.label}
                        size="small"
                        value={editedValues[detail.key]}
                        onChange={(e) =>
                          handleInputChange(detail.key, e.target.value)
                        }
                        sx={{
                          display: "flex",
                          width: "300px",
                          p: "4px 16px",
                          alignItems: "center",
                          borderRadius: "1px solid #CBCBCB",
                        }}
                      />
                    ) : (
                      <Text
                        sx={{
                          fontSize: "16px",
                          color: "#101828",
                          fontWeight: 500,
                          flexShrink: 0,
                        }}
                      >
                        {detail.value}
                      </Text>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Stack>

          <Divider />
          <Text
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              mb: "24px",
              mt: "20px",
              color: "#242424",
            }}
          >
            Documents Submitted
          </Text>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Text>PAN CARD</Text>
                <DownloadButton children="PAN card" />
              </Grid>

              <Grid item xs={4}>
                <Text>PAN CARD</Text>
                <DownloadButton children="Aadhar card" />
              </Grid>

              <Grid item xs={4}>
                <Text>PAN CARD</Text>
                <DownloadButton children="Sign Agreement" />
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </Box>
    </>
  );
};

export default CustomerProfileCard;
