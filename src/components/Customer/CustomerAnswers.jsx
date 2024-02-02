import React, { useState } from "react";
import { styled } from "@mui/material";
import Card from "components/common/Card";
import Text from "components/common/Text";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import Button from "components/common/Button";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "components/common/ListItem";
import ListItemButton from "components/common/ListItemButton";
import ListItemIcon from "components/common/ListItemIcon";
import ListItemText from "components/common/ListItemText";
import IconButton from "components/common/IconButton";
import Radio from "components/common/Radio";

const StyledListItem = styled(ListItem)(({ theme, isSelected }) => ({
  border: "2px solid ",
  borderColor: isSelected ? "#1A54B9" : "#CBCBCB",
  margin: "8px 0",
  borderRadius: "8px",
  backgroundColor: isSelected ? "#EAF2FF" : "inherit",
}));

const ContinueButton = styled(Button)(({}) => ({
  width: "100%",
  borderRadius: "8px",
  textTransform: "capitalize",
  padding: "14px 28px",
  marginTop: "50px",
}));

function CustomerAnswers(props) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const { onChange, onClick } = props;

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const dynamicLabels = [
    "Under 30 years",
    "31-40 years",
    "41-50 years",
    "51-60 years",
    "Above 60 years",
  ];
  return (
    <>
      <Box sx={{ p: 8 }}>
        <Card sx={{ p: 4, borderRadius: "16px", width: "100%" }}>
          <Stack direction="row" justifyContent="space-between">
            <Text
              sx={{
                color: "#242424",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Select one answer for the question.
            </Text>

            <Box>
              <Chip
                label="4 Points"
                sx={{
                  color: "#1A54B9",
                  borderRadius: "112px",
                  backgroundColor: "#F7F8FF",
                  fontSize: "14px",
                }}
              />
            </Box>
          </Stack>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {dynamicLabels.map((label, index) => {
              const labelId = `radio-list-label-${index}`;

              return (
                <StyledListItem
                  isSelected={selectedValue === index}
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments"></IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={() => handleRadioChange(index)}
                    dense
                  >
                    <ListItemIcon>
                      <Radio
                        checked={selectedValue === index}
                        tabIndex={-1}
                        disableRipple
                        sx={{
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </ListItemIcon>
                    {/* Here we will add a function */}
                    <ListItemText
                      onChange={onChange}
                      id={labelId}
                      primary={label}
                    />
                  </ListItemButton>
                </StyledListItem>
              );
            })}
          </List>

          <ContinueButton onClick={onClick}>Continue</ContinueButton>
        </Card>
      </Box>
    </>
  );
}

export default CustomerAnswers;
