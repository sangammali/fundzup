import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Chip, styled } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "components/common/Button";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import SideDrawer from "components/common/SideDrawer";
import Radio from "components/common/Radio";
import Card from "components/common/Card";
import TextField from "components/common/TextField";

const ChipStyle = styled(Chip)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "#EAFFF3",
  borderRadius: "152px",
  color: "#219653",
  fontSize: "12px",
  fontWeight: 500,
  "&::before": {
    position: "relative",
    left: 6,
    bottom: 6,
    content: '"\\2022"',
    width: "6px",
    height: "6px",
    color: "#219653",
  },
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  input: {
    height: '8px', // You can adjust the height value as needed
  },
    width:"45px",

  
  }));  



const StockTradeDrawer = (props) => {
  const { sideDrawerOpen1, closeSideDrawer1 } = props;

  const [selectedRadio, setSelectedRadio] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };

  return (
    <>
      <SideDrawer
        open={sideDrawerOpen1}
        showSecondaryButton={false}
        closeDrawer={closeSideDrawer1}
        title="Stocks for trade"
        submitButtonText="Done"
        subtitle="Here you can view all the details about the stocks."
      >
        <>
          <Text>Trade</Text>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              onChange={() => handleRadioChange("actionTaken")}
              checked={selectedRadio === "actionTaken"}
            />
            <Text sx={{ ml: "12px", mr: "24px" }}>Action taken</Text>

            <Radio
              onChange={() => handleRadioChange("actionPending")}
              checked={selectedRadio === "actionPending"}
            />
            <Text sx={{ ml: "12px" }}>Action pending</Text>
          </Box>

          {selectedRadio === "actionTaken" && (
            <>
              <Box sx={{ width: "460px" }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Text>Ankit arora</Text>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Stack direction="column" spacing={2}>
                      <Card sx={{ p: "12px 16px", height: "150px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Text
                            sx={{
                              fontSize: "16px",
                              fontWeight: 500,
                              mr: "16px",
                            }}
                          >
                            {" "}
                            Infosys Limited
                          </Text>
                          <ChipStyle label="Action Taken" size="small" />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          <Text sx={{ fontSize: "14px", mr: "auto" }}>
                            Quantity : 10
                          </Text>
                          <Text sx={{ fontSize: "14px", mr: "auto" }}>
                            Buy price : ₹ 500
                          </Text>
                          <Text sx={{ fontSize: "14px" }}>
                            Invested : ₹ 10,000
                          </Text>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 2,
                          }}
                        >
                          <Text sx={{ fontSize: "14px", mr: "auto" }}>
                            Sell price : ₹ 500
                          </Text>
                          <Text sx={{ fontSize: "14px" }}>
                            Profit : ₹ 1,000
                          </Text>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 2,
                            p: "2px 12px",
                            backgroundColor: "#F7F8FF",
                            borderRadius: "4px",
                          }}
                        >
                          <Text sx={{ fontSize: "12px", mr: "auto" }}>
                            Date : Jan 24,2023
                          </Text>
                          <Text sx={{ fontSize: "12px", mr: "auto" }}>
                            Buy time : 02:42 PM
                          </Text>
                          <Text sx={{ fontSize: "12px" }}>
                            Sell time : 03:42 PM
                          </Text>
                        </Box>
                      </Card>

                      <Card sx={{ p: "12px 16px", height: "150px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Text
                            sx={{
                              fontSize: "16px",
                              fontWeight: 500,
                              mr: "16px",
                            }}
                          >
                            {" "}
                            Infosys Limited
                          </Text>
                          <ChipStyle label="Action Taken" size="small" />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          <Text sx={{ fontSize: "14px", mr: "auto" }}>
                            Quantity : 10
                          </Text>
                          <Text sx={{ fontSize: "14px", mr: "auto" }}>
                            Buy price : ₹ 500
                          </Text>
                          <Text sx={{ fontSize: "14px" }}>
                            Invested : ₹ 10,000
                          </Text>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 2,
                          }}
                        >
                          <Text sx={{ fontSize: "14px", mr: "auto" }}>
                            Sell price : ₹ 500
                          </Text>
                          <Text sx={{ fontSize: "14px" }}>
                            Profit : ₹ 1,000
                          </Text>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 2,
                            p: "2px 12px",
                            backgroundColor: "#F7F8FF",
                            borderRadius: "4px",
                          }}
                        >
                          <Text sx={{ fontSize: "12px", mr: "auto" }}>
                            Date : Jan 24,2023
                          </Text>
                          <Text sx={{ fontSize: "12px", mr: "auto" }}>
                            Buy time : 02:42 PM
                          </Text>
                          <Text sx={{ fontSize: "12px" }}>
                            Sell time : 03:42 PM
                          </Text>
                        </Box>
                      </Card>
                    </Stack>
                  </AccordionDetails>
                </Accordion>

                <Accordion style={{ borderTop: "none", marginTop: "10px" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Text>Jeetu gupta</Text>
                  </AccordionSummary>

                  <AccordionDetails></AccordionDetails>
                </Accordion>

                <Accordion style={{ borderTop: "none", marginTop: "10px" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Text>Danish Khan</Text>
                  </AccordionSummary>

                  <AccordionDetails></AccordionDetails>
                </Accordion>

                <Accordion style={{ borderTop: "none", marginTop: "10px" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Text>Shubham joshi</Text>
                  </AccordionSummary>

                  <AccordionDetails></AccordionDetails>
                </Accordion>

                <Accordion style={{ borderTop: "none", marginTop: "10px" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Text>Manish bharti</Text>
                  </AccordionSummary>

                  <AccordionDetails></AccordionDetails>
                </Accordion>
              </Box>
            </>
          )}

          {selectedRadio === "actionPending" && (
            <>
              <Box>
                <Card
                  sx={{
                    p: "12px 16px",
                    height: "235px",
                    backgroundColor: "#F7F8FF",
                  }}
                >
                  <Text sx={{ fontSize: "14px", fontWeight: 500, mr: "16px" }}>
                    Change quantity and price at once for everyone
                  </Text>

                  <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
                    <Text
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#676C76",
                        mb: "3px",
                      }}
                    >
                      Stock name
                    </Text>

                    <TextField
                      select
                      size="small"
                      sx={{ backgroundColor: "#FFF" }}
                    >
                      <MenuItem value="Option1">Option 1</MenuItem>
                      <MenuItem value="Option2">Option 2</MenuItem>
                      <MenuItem value="Option3">Option 3</MenuItem>
                    </TextField>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 2,
                        width: "50%",
                        mr: 1,
                      }}
                    >
                      <Text
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#676C76",
                          mb: "3px",
                        }}
                      >
                        Quantity
                      </Text>

                      <TextField
                        size="small"
                        sx={{ backgroundColor: "#FFF" }}
                      ></TextField>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 2,
                        width: "50%",
                        ml: 1,
                      }}
                    >
                      <Text
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#676C76",
                          mb: "3px",
                        }}
                      >
                        Buy price
                      </Text>

                      <TextField
                        size="small"
                        sx={{ backgroundColor: "#FFF" }}
                      ></TextField>
                    </Box>
                  </Box>

                  <Button sx={{ width: "100%", mt: "12px" }}>Apply</Button>
                </Card>
              </Box>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Text>Ankit arora</Text>
                </AccordionSummary>

                <AccordionDetails>
                  <Stack direction="column" spacing={2}>
                    <Card sx={{ p: "12px 16px", height: "100px" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Text
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            mr: "16px",
                          }}
                        >
                          {" "}
                          Infosys Limited
                        </Text>
                        <ChipStyle
                          sx={{
                            background: "#FFEDD2",
                            color: "#7A4A02",
                            "&::before": {
                              position: "relative",
                              left: 6,
                              bottom: 6,
                              content: '"\\2022"',
                              width: "6px",
                              height: "6px",
                              color: "#7A4A02",
                            },
                          }}
                          label="Action pending"
                          size="small"
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: 1 }}>
                          Quantity :
                        </Text>
                    
                        <TextFieldStyled  size="small"></TextFieldStyled>
                        <Text sx={{ fontSize: "14px", mr:1,ml:3 }}>
                          Buy price :
                        </Text>

                        <TextFieldStyled  size="small" sx={{width:"55px"}}></TextFieldStyled>

                        <Text sx={{ fontSize: "14px",ml:3}}>
                          Invested : NA
                        </Text>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Sell price : NA
                        </Text>
                        <Text sx={{ fontSize: "14px" }}>Profit : NA</Text>
                      </Box>
                    </Card>

                    <Card sx={{ p: "12px 16px", height: "100px" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Text
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            mr: "16px",
                          }}
                        >
                          {" "}
                          Infosys Limited
                        </Text>
                        <ChipStyle
                          sx={{
                            background: "#FFEDD2",
                            color: "#7A4A02",
                            "&::before": {
                              position: "relative",
                              left: 6,
                              bottom: 6,
                              content: '"\\2022"',
                              width: "6px",
                              height: "6px",
                              color: "#7A4A02",
                            },
                          }}
                          label="Action pending"
                          size="small"
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: 1 }}>
                          Quantity :
                        </Text>
                    
                        <TextFieldStyled  size="small"></TextFieldStyled>
                        <Text sx={{ fontSize: "14px", mr:1,ml:3 }}>
                          Buy price :
                        </Text>

                        <TextFieldStyled  size="small" sx={{width:"55px"}}></TextFieldStyled>

                        <Text sx={{ fontSize: "14px",ml:3}}>
                          Invested : NA
                        </Text>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Sell price : NA
                        </Text>
                        <Text sx={{ fontSize: "14px" }}>Profit : NA</Text>
                      </Box>
                    </Card>
{/* 
                    <Card sx={{ p: "12px 16px", height: "100px" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Text
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            mr: "16px",
                          }}
                        >
                          {" "}
                          Infosys Limited
                        </Text>
                        <ChipStyle  sx={{
                            background: "#FFEDD2",
                            color: "#7A4A02",
                            "&::before": {
                              position: "relative",
                              left: 6,
                              bottom: 6,
                              content: '"\\2022"',
                              width: "6px",
                              height: "6px",
                              color: "#7A4A02",
                            },
                          }}label="Action pending" size="small" />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Quantity : 
                        </Text>
                        <TextFieldStyled  size="small"></TextFieldStyled>
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Buy price : ₹ 500
                        </Text>
                        <Text sx={{ fontSize: "14px" }}>
                          Invested : ₹ 10,000
                        </Text>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Sell price : ₹ 500
                        </Text>
                        <Text sx={{ fontSize: "14px" }}>Profit : ₹ 1,000</Text>
                      </Box>
                    </Card> */}
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Text>Ankit arora</Text>
                </AccordionSummary>

                <AccordionDetails>
                  <Stack direction="column" spacing={2}>
                    <Card sx={{ p: "12px 16px", height: "150px" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Text
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            mr: "16px",
                          }}
                        >
                          {" "}
                          Infosys Limited
                        </Text>
                        <ChipStyle label="Action Taken" size="small" />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Quantity : 10
                        </Text>
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Buy price : ₹ 500
                        </Text>
                        <Text sx={{ fontSize: "14px" }}>
                          Invested : ₹ 10,000
                        </Text>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Sell price : ₹ 500
                        </Text>
                        <Text sx={{ fontSize: "14px" }}>Profit : ₹ 1,000</Text>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                          p: "2px 12px",
                          backgroundColor: "#F7F8FF",
                          borderRadius: "4px",
                        }}
                      >
                        <Text sx={{ fontSize: "12px", mr: "auto" }}>
                          Date : Jan 24,2023
                        </Text>
                        <Text sx={{ fontSize: "12px", mr: "auto" }}>
                          Buy time : 02:42 PM
                        </Text>
                        <Text sx={{ fontSize: "12px" }}>
                          Sell time : 03:42 PM
                        </Text>
                      </Box>
                    </Card>

                    <Card sx={{ p: "12px 16px", height: "150px" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Text
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            mr: "16px",
                          }}
                        >
                          {" "}
                          Infosys Limited
                        </Text>
                        <ChipStyle label="Action Taken" size="small" />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Quantity : 10
                        </Text>
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Buy price : ₹ 500
                        </Text>
                        <Text sx={{ fontSize: "14px" }}>
                          Invested : ₹ 10,000
                        </Text>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Text sx={{ fontSize: "14px", mr: "auto" }}>
                          Sell price : ₹ 500
                        </Text>
                        <Text sx={{ fontSize: "14px" }}>Profit : ₹ 1,000</Text>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                          p: "2px 12px",
                          backgroundColor: "#F7F8FF",
                          borderRadius: "4px",
                        }}
                      >
                        <Text sx={{ fontSize: "12px", mr: "auto" }}>
                          Date : Jan 24,2023
                        </Text>
                        <Text sx={{ fontSize: "12px", mr: "auto" }}>
                          Buy time : 02:42 PM
                        </Text>
                        <Text sx={{ fontSize: "12px" }}>
                          Sell time : 03:42 PM
                        </Text>
                      </Box>
                    </Card>
                  </Stack>
                </AccordionDetails>
              </Accordion> */}
            </>
          )}
        </>
      </SideDrawer>
    </>
  );
};

export default StockTradeDrawer;
