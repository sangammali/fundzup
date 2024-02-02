import React from "react";
import Stack from "components/common/Stack";
import Box from "components/common/Box";
import Text from "components/common/Text";
import cx from "classnames";
import { makeStyles, createStyles } from "@mui/styles";

const RiskAssessmentStepper = (props) => {
  const { currentStepsId, stepperData } = props;
  const classes = useStyles();

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ flex: 1 }}
    >
      {stepperData.map((item, index) => {
        let isCompleted = false;

        if (currentStepsId >= item.id) {
          isCompleted = true;
        }

        return (
          <React.Fragment key={`risk_stepper_index_${index}`}>
            {index !== 0 && (
              <Stack alignItems="center" sx={{ flex: 1 }}>
                <Box className={classes.dottedLine} />
              </Stack>
            )}

            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "center" }}
              spacing={1.5}
            >
              <Box
                className={cx({
                  [classes.numBox]: true,
                  [classes.numBoxComplete]: isCompleted,
                })}
              >
                <Text variant="small">{item.id}</Text>
              </Box>
              <Text
                className={cx({
                  [classes.text]: true,
                  [classes.textCompleted]: isCompleted,
                })}
              >
                {item.label}
              </Text>
            </Stack>
          </React.Fragment>
        );
      })}
    </Stack>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    dottedLine: {
      borderTop: "2px dashed #676C76",
      width: "50%",
      height: 0,
    },
    dottedLineActive: {
      borderTop: "2px dashed #45AC70",
    },
    numBox: {
      color: "#A2A7AE",
      border: "1px solid #A2A7AE",
      borderRadius: "50%",
      height: "2rem",
      width: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    numBoxActive: {
      backgroundColor: "#f0f8ff",
      color: theme.palette.primary.main,
      borderColor: "#f0f8ff",
      height: "2.3rem",
      width: "2.3rem",
    },
    numBoxComplete: {
      backgroundColor: "#142E56",
      color: "#fff",
    },
    text: {
    //   color: "#A2A7AE",
      color: "#676C76",
      whiteSpace: "noWrap",
      px:1,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    textCompleted: {
      color:"#142E56",
    },
  })
);

export default RiskAssessmentStepper;
