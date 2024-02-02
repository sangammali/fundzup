import { useState, useEffect } from "react";
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
const PreviousButton = styled(Button)(({}) => ({
  width: "100%",
  borderRadius: "8px",
  textTransform: "capitalize",
  padding: "14px 28px",
  marginTop: "50px",
}));
const ContinueButton = styled(Button)(({}) => ({
  width: "100%",
  borderRadius: "8px",
  textTransform: "capitalize",
  padding: "14px 28px",
  marginTop: "50px",
}));

const Answers = (props) => {
  const [selectedValue, setSelectedValue] = useState({});
  const [isError, setError] = useState(false);
  const {
    onChange,
    handleSubmit,
    qtsOptions,
    handleAnswers,
    handlePreviousStep,
    currentQtsId,
    totalQts,
    riskPoints,
    riskDetailsAnswer = [],
  } = props;

  useEffect(() => {
    const answerExist = riskDetailsAnswer.find((obj) => {
      if (obj.question_id === currentQtsId) {
        return true;
      }
      return false;
    });
    if (!answerExist) {
      return;
    }
    const currentOptions = qtsOptions.options.find((obj) => {
      if (obj.optionId === answerExist.answer_id) {
        return true;
      }
      return false;
    });
    if (!currentOptions) {
      return;
    }
    setSelectedValue(currentOptions);
  }, [currentQtsId]);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
    setError(false);
  };

  const handleAnswerSubmit = () => {
    if (Object.keys(selectedValue).length !== 0) {
      handleAnswers(
        qtsOptions.questionId,
        selectedValue,
        currentQtsId === totalQts
      );
      setSelectedValue({});
      setError(false);
    } else {
      setError(true);
    }
  };

  const answerExist = riskDetailsAnswer.find((obj) => {
    if (obj.question_id === currentQtsId) {
      return true;
    }
    return false;
  });

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
                label={`${riskPoints} Points`}
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
            {qtsOptions?.options?.map((option, index) => {
              const labelId = `radio-list-label-${index}`;
              return (
                <StyledListItem
                  isSelected={selectedValue?.optionId === option?.optionId}
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments"></IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={() => handleRadioChange(option)}
                    dense
                  >
                    <ListItemIcon>
                      <Radio
                        checked={selectedValue?.optionId === option?.optionId}
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
                    <ListItemText
                      onChange={onChange}
                      id={labelId}
                      primary={option.optionDescription}
                    />
                  </ListItemButton>
                </StyledListItem>
              );
            })}
            {isError ? (
              <Text variant="small" sx={{ color: "#FF3333" }}>
                Please Select one option
              </Text>
            ) : (
              <></>
            )}
          </List>

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            mt={2}
          >
            {currentQtsId > 1 && (
              <PreviousButton variant="outlined" onClick={handlePreviousStep}>
                Previous
              </PreviousButton>
            )}

            <ContinueButton
              // onClick={currentQtsId === totalQts ? handleSubmit : handleAnswerSubmit}
              onClick={handleAnswerSubmit}
            >
              Continue
            </ContinueButton>
          </Stack>
        </Card>
      </Box>
    </>
  );
};

export default Answers;
