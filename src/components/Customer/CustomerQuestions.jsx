import React from "react";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import { styled } from "@mui/styles";

const QuestionBox = styled(Box)(() => ({
  mr: "20px",
  backgroundColor: "#E5EEFF",
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const MainBox = styled(Box)(() => ({
  maxHeight: "510px",
  overflowY: "auto",
  backgroundColor: "#F7F8FF",
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  "&::-webkit-scrollbar": {
    display: "none",
    width: "100%",
  },
}));

const TickBox = styled(Box)(() => ({
  mr: "20px",
  backgroundColor: "green",
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#F7F8FF",
}));

const riskQuestions = [
  { qid: 1, text: "What is your age?" },
  {
    qid: 2,
    text: "Assuming normal course of action, you expect your investments to:",
  },
  {
    qid: 3,
    text: "You lost 25% of your money in equity investments when markets are down by 25% too :",
  },
  {
    qid: 4,
    text: "How easily can you adjust your lifestyle to adverse financial situations :",
  },
  { qid: 5, text: "Describe your time horizon :" },
  {
    qid: 6,
    text: "Describe your liquidity (Payout) needs from investment portfolio :",
  },
  { qid: 7, text: "What is your total investment experience?" },
  {
    qid: 8,
    text: "Which of the following asset classes do you have an investment experience in?",
  },
  { qid: 9, text: "What is your source of income?" },
  {
    qid: 10,
    text: "What is the market value of your total investment portfolio (Excluding any real estate assets you own?)",
  },
  { qid: 11, text: "Describe your knowledge in finance:" },
  {
    qid: 12,
    text: "You are financially responsible for (Exclude those supported by your spouse's income)",
  },
  { qid: 13, text: "what describes your attitude towards investments:" },
  { qid: 14, text: "Investment objective:" },
  {
    qid: 15,
    text: "Have you availed any loan from a bank or financial institution that is currently outstanding?if yes, kindly provide below details:",
  },
];
function CustomerQuestions({ currentQtsId }) {
  return (
    <>
      <MainBox>
        <Stack>
          {riskQuestions.map((item) => (
            <Stack key={item.qid} spacing={2}>
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  color: "#142E56",
                  width: "100%",
                }}
              >
                {currentQtsId >= item.qid ? (
                  <TickBox sx={{}}> ✔ </TickBox>
                ) : (
                  <QuestionBox>
                    <Text sx={{ fontSize: "12px" }}>{item.qid}</Text>
                  </QuestionBox>
                )}

                <Box sx={{ width: "500px" }}>
                  <Text
                    sx={{
                      mb: "20px",
                      color: currentQtsId >= item.qid ? "green" : "#000",
                    }}
                    variant="body2"
                  >
                    {item.text}
                  </Text>
                </Box>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </MainBox>
    </>
  );
}

export default CustomerQuestions;
