import { useState, useEffect, useMemo } from "react";
import {
  FormControl,
  Select,
  ListSubheader,
  InputAdornment,
} from "@mui/material";
import { ButtonGroup, styled } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import SearchIcon from "@mui/icons-material/Search";
import Box from "components/common/Box";
import Text from "components/common/Text";
import Button from "components/common/Button";
import TextField from "components/common/TextField";
import DatePicker from "components/common/DatePicker";
import Stepper from "components/common/Stepper";
import Radio from "components/common/Radio";
import Checkbox from "components/common/Checkbox";
import TimePicker from "components/common/TimePicker";
import MenuItem from "components/common/MenuItem";

const CapitalButton = styled(Button)(({ theme, selected }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  backgroundColor: "#219653",
  width: "128px",
  backgroundColor: selected ? "#219653" : "#F8F8F8",
  color: selected ? "#FFFFFF" : "#B3B3B3",
  "&:hover": {
    backgroundColor: selected ? "#219653" : "#F8F8F8",
    color: selected ? "#FFFFFF" : "#B3B3B3",
  },
}));

const TextStyled = styled(Text)(({ theme }) => ({
  fontSize: "14px",
  color: "#242424",
  fontWeight: 500,
  marginTop: "20px",
  marginBottom: "14px",
}));

const OptionsTextStyled = styled(Text)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  marginTop: "20px",
  marginBottom: "6px",
}));

const CheckedTextStyled = styled(Text)(({ theme }) => ({
  marginTop: "24px",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: 500,
  color: "#242424",
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  padding: "12px 16px",
  marginTop: "24px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flex: "1 0 0",
  borderRadius: "8px",
  border: "1px solid var(--Blue-blue, #1A54B9)",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  cursor: "pointer",
}));

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const containsText1 = (text, searchText1) =>
  text.toLowerCase().indexOf(searchText1.toLowerCase()) > -1;

const highRiskOptions = [
  "Option One",
  "Option Two",
  "Option Three",
  "Option Four",
];

const moderateRiskOptions = [
  "Option One fjhfj",
  "Option Two",
  "Option Three",
  "Option Four",
];

const conservativeRiskOptions = [
  " fjhfj",
  "Option Two fjhjfh",
  "frrff",
  "Option Four",
];

const customerName = ["durgesh", "Option Two fjhjfh", "frrff", "Option Four"];

const tradeSteps = [
  {
    id: 1,
    label: "Basic details",
  },
  {
    id: 2,
    label: "Trade details",
  },
];

const AddTradeDrawer = ({ currentStep }) => {
  const [selectedOption, setSelectedOption] = useState("quantity");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedOptions3, setSelectedOptions3] = useState([]);
  const [selectedOptions4, setSelectedOptions4] = useState([]);
  const [orderType, setOrderType] = useState("buy");
  const [isStopLossChecked, setIsStopLossChecked] = useState(false);
  const [isHighRiskChecked, setIsHighRiskChecked] = useState(false);
  const [isModerateRiskChecked, setIsModerateRiskChecked] = useState(false);
  const [isLowRiskChecked, setIsLowRiskChecked] = useState(false);
  const [isRiskProfileSelected, setIsRiskProfileSelected] = useState(true); // New state
  const [isCustomersSelected, setIsCustomersSelected] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchText1, setSearchText1] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [searchText3, setSearchText3] = useState("");

  const HighRiskName = useMemo(
    () => highRiskOptions.filter((option) => containsText(option, searchText)),
    [searchText]
  );

  const ModerateRiskName = useMemo(
    () =>
      moderateRiskOptions.filter((option1) =>
        containsText1(option1, searchText1)
      ),
    [searchText1]
  );

  const ConservativeRiskName = useMemo(
    () =>
      conservativeRiskOptions.filter((option) =>
        containsText(option, searchText2)
      ),
    [searchText2]
  );

  const CustomerName = useMemo(
    () => customerName.filter((option) => containsText(option, searchText3)),
    [searchText3]
  );

  useEffect(() => {
    handleOrderTypeChange("market");
  }, []);

  const handleOptionChange1 = (option) => {
    setSelectedOption(option);
  };

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleOptionChange2 = (option) => {
    if (selectedOptions2.includes(option)) {
      setSelectedOptions2(selectedOptions2.filter((item) => item !== option));
    } else {
      setSelectedOptions2([...selectedOptions2, option]);
    }
  };
  const handleOptionChange3 = (option) => {
    if (selectedOptions3.includes(option)) {
      setSelectedOptions3(selectedOptions3.filter((item) => item !== option));
    } else {
      setSelectedOptions3([...selectedOptions3, option]);
    }
  };
  const handleOptionChange4 = (option) => {
    if (selectedOptions4.includes(option)) {
      setSelectedOptions4(selectedOptions4.filter((item) => item !== option));
    } else {
      setSelectedOptions4([...selectedOptions4, option]);
    }
  };
  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handleStopLossChange = (isChecked) => {
    setIsStopLossChecked(isChecked);
  };

  const handleHighRiskChange = (isChecked) => {
    setIsHighRiskChecked(isChecked);
  };

  const handleModerateRiskChange = (isChecked) => {
    setIsModerateRiskChecked(isChecked);
  };

  const handleLowRiskChange = (isChecked) => {
    setIsLowRiskChecked(isChecked);
  };

  const handleRiskProfileSelection = () => {
    setIsRiskProfileSelected(true);
    setIsCustomersSelected(false);
  };

  const handleCustomerSelection = () => {
    setIsRiskProfileSelected(false);
    setIsCustomersSelected(true);
  };
  const renderSelectedValues = (selected) => {
    if (Array.isArray(selected)) {
      return selected.join(", ");
    }
    return "";
  };

  return (
    <>
      {currentStep === 1 && (
        <>
          <Box>
            <Box
              sx={{
                backgroundColor: "#E5EEFF",
                width: "calc(100% + 48px)",
                ml: "-50px !important",
                mt: "-32px !important",
                p: "15px 24px",
              }}
            >
              <Box sx={{ marginLeft: "24px", marginRight: "24px" }}>
                <Stepper currentStepsId={1} stepperData={tradeSteps} />
              </Box>
            </Box>

            <Text
              sx={{
                mt: "24px",
                mb: "6px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#242424",
              }}
            >
              Stock name
            </Text>
            <TextField placeholder="Enter stock name"></TextField>

            <TextStyled>Index</TextStyled>
            <Box sx={{ display: "flex", gap: "24px", mb: "22px" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio
                  checked={orderType === "NSE"}
                  onChange={() => handleOrderTypeChange("NSE")}
                />
                <Text sx={{ fontSize: "16px", fontWeight: 400, ml: "12px" }}>
                  NSE
                </Text>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio
                  checked={orderType === "BSE"}
                  onChange={() => handleOrderTypeChange("BSE")}
                />
                <Text sx={{ fontSize: "16px", fontWeight: 400, ml: "12px" }}>
                  BSE
                </Text>
              </Box>
            </Box>

            <TextStyled>Order Type</TextStyled>
            <Box sx={{ display: "flex", gap: "24px" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio
                  checked={orderType === "buy"}
                  onChange={() => handleOrderTypeChange("buy")}
                />
                <Text sx={{ fontSize: "16px", fontWeight: 400, ml: "12px" }}>
                  Buy
                </Text>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio
                  checked={orderType === "sell"}
                  onChange={() => handleOrderTypeChange("sell")}
                />
                <Text sx={{ fontSize: "16px", fontWeight: 400, ml: "12px" }}>
                  Sell
                </Text>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio
                  checked={orderType === "squareOff"}
                  onChange={() => handleOrderTypeChange("squareOff")}
                />
                <Text sx={{ fontSize: "16px", fontWeight: 400, ml: "12px" }}>
                  Square off
                </Text>
              </Box>
            </Box>

            <Text
              sx={{ fontSize: "14px", fontWeight: 500, mb: "12px", mt: "22px" }}
            >
              Buy/Sell stock on the basis of
            </Text>

            <ButtonGroup>
              <CapitalButton
                onClick={() => handleOptionChange1("quantity")}
                selected={selectedOption === "quantity"}
              >
                <Text>Quantity</Text>
              </CapitalButton>
              <CapitalButton
                onClick={() => handleOptionChange1("percentage")}
                selected={selectedOption === "percentage"}
              >
                <Text>Percentage</Text>
              </CapitalButton>
            </ButtonGroup>

            {selectedOption === "quantity" ? (
              <>
                <OptionsTextStyled>Quantity</OptionsTextStyled>
                <TextField placeholder="Enter quantity" />
              </>
            ) : (
              <>
                <OptionsTextStyled>Percentage</OptionsTextStyled>
                <TextField placeholder="Enter percentage of capital	" />
              </>
            )}

            <Text
              sx={{ fontSize: "14px", fontWeight: 500, mt: "20px", mb: "12px" }}
            >
              Order type
            </Text>

            <ButtonGroup>
              <CapitalButton
                onClick={() => handleOrderTypeChange("market")}
                selected={orderType === "market"}
              >
                <Text>Market</Text>
              </CapitalButton>
              <CapitalButton
                onClick={() => handleOrderTypeChange("limit")}
                selected={orderType === "limit"}
              >
                <Text>Limit</Text>
              </CapitalButton>
            </ButtonGroup>

            {orderType === "limit" && (
              <>
                <OptionsTextStyled>Price</OptionsTextStyled>
                <TextField placeholder="Enter price" />
              </>
            )}
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Checkbox
              sx={{ width: "12px", height: "12px", mt: "9px" }}
              checked={isStopLossChecked}
              onChange={(e) => handleStopLossChange(!isStopLossChecked)}
            />

            <Text
              sx={{
                ml: "12px",
                mt: "9px",
                fontSize: "16px",
                color: "#242424",
                fontWeight: 400,
              }}
            >
              Add stop loss
            </Text>
          </Box>

          {isStopLossChecked && (
            <>
              <Text sx={{ fontSize: "14px", fontWeight: 500, mt: "30px" }}>
                Stop Loss
              </Text>
              <TextField placeholder="Enter stop loss value in %" />
            </>
          )}

          <CheckedTextStyled>Target (Sell)</CheckedTextStyled>
          <TextField placeholder="Enter target value in %"></TextField>

          <CheckedTextStyled>
            Date till the stock to buy/sell (Expiry)
          </CheckedTextStyled>

          <DatePicker label="Select Date" />

          <CheckedTextStyled>
            Time till the stock to buy/sell (Expiry)
          </CheckedTextStyled>
          <TimePicker label="Select Time" />
        </>
      )}

      {currentStep === 2 && (
        <>
          <Box
            sx={{
              backgroundColor: "#E5EEFF",
              width: "calc(100% + 48px)",
              ml: "-50px !important",
              mt: "-20px !important",
              p: "15px 22px",
            }}
          >
            <Box sx={{ marginLeft: "24px", marginRight: "24px" }}>
              <Stepper currentStepsId={2} stepperData={tradeSteps} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: "12px" }}>
            <BoxStyled
              sx={{
                backgroundColor: isRiskProfileSelected
                  ? "#E5EEFF"
                  : "transparent",
              }}
              onClick={handleRiskProfileSelection}
            >
              <Radio
                sx={{
                  width: "20px",
                  height: "20px",
                }}
                checked={isRiskProfileSelected}
              />
              <Text
                sx={{
                  color: isRiskProfileSelected ? "#101828" : "#242424",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Risk Profile
              </Text>
            </BoxStyled>

            <BoxStyled
              sx={{
                backgroundColor: isCustomersSelected
                  ? "#E5EEFF"
                  : "transparent",
              }}
              onClick={handleCustomerSelection}
            >
              <Radio
                sx={{
                  width: "20px",
                  height: "20px",
                }}
                checked={isCustomersSelected}
              />
              <Text
                sx={{
                  color: !isRiskProfileSelected ? "#101828" : "#242424",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                  cursor: "pointer",
                }}
              >
                Customers
              </Text>
            </BoxStyled>
          </Box>

          {isRiskProfileSelected && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  sx={{ width: "20px", height: "20px", mt: "24px" }}
                  checked={isHighRiskChecked}
                  onChange={(e) => handleHighRiskChange(!isHighRiskChecked)}
                />

                <Text
                  sx={{
                    ml: "12px",
                    mt: "24px",
                    fontSize: "16px",
                    color: "#242424",
                    fontWeight: 400,
                  }}
                >
                  High risk profile
                </Text>
              </Box>

              {isHighRiskChecked && (
                <Box sx={{ width: "100%", m: 2 }}>
                  <Text
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      mt: "20px",
                      mb: "6px",
                    }}
                  >
                    Customer
                  </Text>
                  <FormControl fullWidth>
                    <Select
                      MenuProps={{ autoFocus: false }}
                      value={selectedOptions}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      onClose={() => setSearchText("")}
                      multiple
                      renderValue={renderSelectedValues}
                    >
                      <ListSubheader>
                        <TextField
                          autoFocus
                          placeholder="Search"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                      {HighRiskName.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleOptionChange(option)}
                                sx={{ marginRight: "1px" }}
                              />
                            }
                            label={option}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  sx={{ width: "20px", height: "20px", mt: "24px" }}
                  checked={isModerateRiskChecked}
                  onChange={(e) =>
                    handleModerateRiskChange(!isModerateRiskChecked)
                  }
                />

                <Text
                  sx={{
                    ml: "12px",
                    mt: "24px",
                    fontSize: "16px",
                    color: "#242424",
                    fontWeight: 400,
                  }}
                >
                  Moderate risk Profile
                </Text>
              </Box>

              {isModerateRiskChecked && (
                <Box sx={{ width: "100%", m: 2 }}>
                  <Text
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      mt: "20px",
                      mb: "6px",
                    }}
                  >
                    Customer
                  </Text>
                  <FormControl fullWidth>
                    <Select
                      MenuProps={{ autoFocus: false }}
                      value={selectedOptions2}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      onClose={() => setSearchText1("")}
                      multiple
                      renderValue={renderSelectedValues}
                    >
                      <ListSubheader>
                        <TextField
                          autoFocus
                          placeholder="Search"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setSearchText1(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                      {ModerateRiskName.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedOptions2.includes(option)}
                                onChange={() => handleOptionChange2(option)}
                                sx={{ marginRight: "1px" }}
                              />
                            }
                            label={option}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  sx={{ width: "20px", height: "20px", mt: "24px" }}
                  checked={isLowRiskChecked}
                  onChange={(e) => handleLowRiskChange(!isLowRiskChecked)}
                />

                <Text
                  sx={{
                    ml: "12px",
                    mt: "24px",
                    fontSize: "16px",
                    color: "#242424",
                    fontWeight: 400,
                  }}
                >
                  Conservative risk Profile
                </Text>
              </Box>

              {isLowRiskChecked && (
                <>
                  <Box sx={{ width: "100%", m: 2 }}>
                    <Text
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        mt: "20px",
                        mb: "6px",
                      }}
                    >
                      Customer
                    </Text>
                    <FormControl fullWidth>
                      <Select
                        MenuProps={{ autoFocus: false }}
                        value={selectedOptions3}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        onClose={() => setSearchText2("")}
                        multiple
                        renderValue={renderSelectedValues}
                      >
                        <ListSubheader>
                          <TextField
                            autoFocus
                            placeholder="Search"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) => setSearchText2(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key !== "Escape") {
                                e.stopPropagation();
                              }
                            }}
                          />
                        </ListSubheader>
                        {ConservativeRiskName.map((option, i) => (
                          <MenuItem key={i} value={option}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedOptions3.includes(option)}
                                  onChange={() => handleOptionChange3(option)}
                                  sx={{ marginRight: "1px" }}
                                />
                              }
                              label={option}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </>
              )}
            </>
          )}

          {!isRiskProfileSelected && (
            <Box sx={{ width: "100%", m: 2 }}>
              <Text
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  mt: "20px",
                  mb: "6px",
                }}
              >
                Customer
              </Text>
              <FormControl fullWidth>
                <Select
                  MenuProps={{ autoFocus: false }}
                  value={selectedOptions4}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  onClose={() => setSearchText3("")}
                  multiple
                  renderValue={renderSelectedValues}
                >
                  <ListSubheader>
                    <TextField
                      autoFocus
                      placeholder="Search"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => setSearchText3(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                          e.stopPropagation();
                        }
                      }}
                    />
                  </ListSubheader>
                  {CustomerName.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedOptions4.includes(option)}
                            onChange={() => handleOptionChange4(option)}
                            sx={{ marginRight: "1px" }}
                          />
                        }
                        label={option}
                      />
                      
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}
    </>
  );
};
export default AddTradeDrawer;
