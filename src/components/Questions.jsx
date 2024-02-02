import React from "react";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import { styled } from "@mui/material";

const QuestionBox = styled(Box)(({}) => ({
  maxHeight: "510px",
  overflowY: "auto",
  backgroundColor: "#F7F8FF",
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const TickBox = styled(Text)(({}) => ({
  marginRight: "20px",
  backgroundColor: "green",
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
}));

const QuestionidBox = styled(Text)(({}) => ({
  marginRight: "20px",
  backgroundColor: "green",
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
}));

const Questions = ({ currentQtsId, qts = [] }) => {
  return (
    <>
      <QuestionBox>
        <Stack>
          {qts?.map((item) => (
            <Stack key={item.qid} spacing={2}>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  color: "#142E56",
                  width: "100%",
                }}
              >
                {currentQtsId > item.questionId ? (
                  <TickBox>✔</TickBox>
                ) : (
                  <Box
                    sx={{
                      mr: "20px",
                      backgroundColor:
                        currentQtsId === item.questionId
                          ? "#E5EEFF"
                          : "#FFFFFF",
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ fontSize: "12px" }}>{item.questionId}</Text>
                  </Box>
                )}

                <Box sx={{ width: "400px" }}>
                  <Text
                    sx={{
                      mb: "20px",
                      color: currentQtsId > item.questionId ? "green" : "#000",
                    }}
                    variant="body2"
                  >
                    {item.questionDescription}
                  </Text>
                </Box>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </QuestionBox>
    </>
  );
};

export default Questions;
