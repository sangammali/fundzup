import React, { useState } from "react";
import StockTradeDrawer from "components/Trade/modelPortfolio/StockTradeDrawer";
import CheckedDialogIcon from "asset/icons/CheckedDialogIcon";
import CloudDownload from "asset/icons/CloudDownload";
import FilterIcon from "asset/icons/FilterIcon";
import Button from "components/common/Button";
import NewDialog from "components/common/Dialog";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import SideDrawer from "components/common/SideDrawer";
import Divider from "components/common/Divider";
import CheckBox from "components/common/Checkbox";
import TextField from "components/common/TextField";

const ModelCheckPage = (props) => {
  const { handleUnCheckButtonClick } = props;

  const [congratsModalOpen, setCongratsModalOpen] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);
  const [sideDrawerOpen1, setSideDrawerOpen1] = useState(false);

  const ViewDetailsRadio = () => {
    setSideDrawerOpen1(true);
  };
  const closeSideDrawer1 = () => {
    setSideDrawerOpen1(false);
  };
  const handlePreviewSave = () => {
    setCongratsModalOpen(true);
  };

  const openSideDrawer = () => {
    setSideDrawerOpen(true);
  };

  const closeSideDrawer = () => {
    setSideDrawerOpen(false);
  };

  const handleOkayButtonClick = () => {
    setCustomersArray([]);
    setCustomersArray1([]);
    setShowConfirmationBox(true);
    handleUnCheckButtonClick();
  };

  const handleToggleCheckbox = (customerId) => {
    setCustomersArray((prevCustomers) => {
      const updatedCustomers = prevCustomers.map((customer) => {
        if (customer.id === customerId) {
          return { ...customer, isChecked: !customer.isChecked };
        }
        return customer;
      });
      return updatedCustomers;
    });
  };

  const handleToggleCheckbox1 = (customerId) => {
    setCustomersArray1((prevCustomers) => {
      const updatedCustomers = prevCustomers.map((customer) => {
        if (customer.id === customerId) {
          return { ...customer, isChecked: !customer.isChecked };
        }
        return customer;
      });
      return updatedCustomers;
    });
  };

  const [customersArray, setCustomersArray] = useState([
    { id: 1, name: "Manish Bharti", isChecked: false },
    { id: 2, name: "Jeetu Gupta", isChecked: false },
    { id: 3, name: "Jane Doe", isChecked: false },
    { id: 4, name: "Alice Smith", isChecked: false },
  ]);

  const [customersArray1, setCustomersArray1] = useState([
    { id: 1, name: "Manish Bharti", isChecked: false },
    { id: 2, name: "John Doe", isChecked: false },
    { id: 3, name: "Rishi", isChecked: false },
    { id: 4, name: "Alice Smith", isChecked: false },
  ]);

  return (
    <>
      <Box>
        {showConfirmationBox ? (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              mt={4}
              mb={4}
              padding=" 0px 20px"
            >
              <TextField sx={{ maxWidth: "700px" }} placeholder="Search" />
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  sx={{
                    fontWeight: 500,
                    borderRadius: "8px",
                    borderColor: "#D0D5DD",
                    p: 1,
                  }}
                  variant="outlined"
                  startIcon={<CloudDownload />}
                >
                  Download
                </Button>
                <Button
                  sx={{
                    fontWeight: 500,
                    borderRadius: "8px",
                    borderColor: "#D0D5DD",
                    p: 1,
                  }}
                  startIcon={<FilterIcon />}
                  variant="outlined"
                >
                  Add Filters
                </Button>
              </Stack>
            </Stack>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                mb: 2,
                ml: 2,
                mr: 2,
                backgroundColor: "#FFF5E0",
                border: "1px solid #F2994A",
                borderRadius: "8px",
              }}
            >
              <Text fontSize="16px" fontWeight="400" color="#242424">
                30 out of 54 customers have taken the call for the trade
              </Text>

              <a href="#" onClick={ViewDetailsRadio}>
                VIEW DETAILS
              </a>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                backgroundColor: "#E6FFE3",
                mb: 2,
                ml: 2,
                mr: 2,
                height: "92px",
                padding: "7px 20px",
                border: "1px solid #219653",
                borderRadius: "8px",
              }}
            >
              <Text fontSize="16px" fontWeight="400" color="#676C76" mb={2}>
                50 stocks have been selected for the trade
              </Text>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mr: 6,
                  mb: 2,
                }}
              >
                <Text fontSize="16px" fontWeight="500" color="#242424">
                  24 aggressive & 30 moderate risk profile customers have been
                  selected for the trade{" "}
                  <a href="#" onClick={openSideDrawer}>
                    VIEW DETAILS{" "}
                  </a>
                </Text>
                <Button
                  sx={{
                    fontWeight: 600,
                    borderRadius: "8px",
                    fontSize: "14px",
                    p: "10px 28px",
                    backgroundColor: "#219653",
                  }}
                  onClick={handlePreviewSave}
                >
                  Send Calls
                </Button>
              </Box>
            </Box>

            <SideDrawer
              open={sideDrawerOpen}
              showSecondaryButton={false}
              closeDrawer={closeSideDrawer}
              title="Customer Details"
              submitButtonText="Done"
              subtitle="Here you can view all the details of the customer."
            >
              <Box>
                <Text
                  sx={{ fontSize: "16px", fontWeight: 500, color: "#242424" }}
                >
                  05 Aggressive risk profile customers
                </Text>
                <Divider sx={{ mt: "12px", mb: "16px" }} />

                {customersArray.map((customer) => (
                  <Box
                    key={customer.id}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <CheckBox
                      checked={customer.isChecked}
                      onChange={() => handleToggleCheckbox(customer.id)}
                    />
                    <Text sx={{ ml: "15px" }}>{customer.name}</Text>
                  </Box>
                ))}
              </Box>

              <Box>
                <Text
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#242424",
                    mt: "32px",
                  }}
                >
                  05 Aggressive risk profile customers
                </Text>
                <Divider sx={{ mt: "12px", mb: "16px" }} />

                {customersArray1.map((customer) => (
                  <Box
                    key={customer.id}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <CheckBox
                      checked={customer.isChecked}
                      onChange={() => handleToggleCheckbox1(customer.id)}
                    />
                    <Text sx={{ ml: "15px" }}>{customer.name}</Text>
                  </Box>
                ))}
              </Box>
            </SideDrawer>

            <NewDialog
              onClose={() => setCongratsModalOpen(false)}
              open={congratsModalOpen}
              disableCloseIcon
              maxWidth="sm"
              contentComponent={() => (
                <Stack
                  direction="column"
                  spacing={1.5}
                  sx={{ width: "100%" }}
                  alignItems="center"
                  justifyContent="center"
                  style={{ marginTop: "10px" }}
                >
                  {/* <CheckCircleOutlinedIcon /> */}
                  <CheckedDialogIcon sx={{ width: "58px", height: "58px" }} />
                  <Text
                    fontSize="20px"
                    fontWeight="600"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    Buy call have been sent to the customers!
                  </Text>
                  <Text
                    width="500px"
                    fontSize="14px"
                    fontWeight="400"
                    color="#667085"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    textAlign="center"
                  >
                    Norem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                  </Text>
                  <Button
                    sx={{
                      width: "489px",
                      height: "56px",
                      fontWeight: 600,
                      borderRadius: "8px",
                      p: "18px 20px",
                      mt: "32px",
                    }}
                    onClick={handleOkayButtonClick}
                  >
                    Okay
                  </Button>
                </Stack>
              )}
            />
          </>
        )}
      </Box>

      {/* Side drawer */}
      <StockTradeDrawer
        sideDrawerOpen1={sideDrawerOpen1}
        closeSideDrawer1={closeSideDrawer1}
      />
    </>
  );
};

export default ModelCheckPage;
