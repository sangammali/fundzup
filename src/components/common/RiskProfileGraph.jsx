import React, { memo, useState, useEffect } from "react";
import { styled } from "@mui/system";

const borderWidth = (chartWidth, disableLabel) => {
  let w = 0;
  w = (chartWidth / 100) * 10;
  if (!disableLabel && w < 53) {
    w = 53;
  }
  return `${w}px`;
}
const needleHeight = (chartWidth, needleLenght) => {
  let needleL = 15;
  needleL = `${chartWidth / 2 - (chartWidth / 100) * 24}`;
  if(needleLenght){
    needleL = needleLenght;
  }
  return `${needleL}px`
}
const centerCircle = (chartWidth) => `${(chartWidth / 100) * 15}px`;

const MasterWrap = styled("div")(() =>({
  width: "fit-content",
  boxSizing: "border-box",
}))

const StyledWrap = styled("div")(({ chartWidth }) => ({
  height: `${chartWidth / 2}px`,
  overflow: "hidden",
  width: "fitContent",
  boxSizing: "border-box"
}));

const StyledMain = styled("div")(({ chartWidth }) => ({
  width: `${chartWidth}px`,
  height: `${chartWidth}px`,
  position: "relative",
  overflow: "hidden",
  marginBottom: "50px",
  marginTop: `-${chartWidth / 2}px`,
  boxSizing: "border-box"
}));

const StyledNeedle = styled("p")(({ position, needleWidth, chartWidth, needleLenght }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%) rotate(${position}deg)`,
  margin: "0px",
  transition: "all 2s ease-in-out",
  boxSizing: "border-box",
  "& > i:first-child": {
    display: "table",
    width: `${needleWidth ? needleWidth + "px" : "7px"}`,
    height: `${needleHeight(chartWidth, needleLenght)}`,
    backgroundColor: "#000",
    borderRadius: "100% 100% 0px 0%",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0%)",
    bottom: "50%",
    zIndex: "-1",
    boxShadow: "-4px 1px 2px #c4c4c4",
  },
  "& > i:last-child": {
    display: "table",
    width: `${centerCircle(chartWidth)}`,
    height: `${centerCircle(chartWidth)}`,
    backgroundColor: "#202020",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50px",
  },
}));

const StyledParent = styled("div")(({ chartWidth, disableLabel }) => ({
  position: "absolute",
  display: "flex",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  transform: "translateY(50%)",
  boxSizing: "border-box",
  "& > div": {
    flex: "1",
    height: `${chartWidth}px`,
    width: `${chartWidth}px`,
    border: `${borderWidth(chartWidth, disableLabel)} solid red`,
    borderColor: "transparent",
    borderRadius: "50%",
    position: "absolute",
    left: "0px",
    transition: "all 0.5s ease-in-out",
    boxSizing: "border-box"
  },

  "& > div:nth-child(1)": {
    borderColor: "transparent transparent transparent #1c8d13",
    transform: "rotate(-15deg)",
    zIndex: "6",
  },
  "& > div:nth-child(2)": {
    borderColor: "transparent transparent transparent #83c605",
    transform: "rotate(15deg)",
    zIndex: "5",
  },
  "& > div:nth-child(3)": {
    borderColor: "transparent transparent transparent #bcd103",
    transform: "rotate(45deg)",
    zIndex: "4",
  },
  "& > div:nth-child(4)": {
    borderColor: "transparent transparent transparent #ecb004",
    transform: "rotate(75deg)",
    zIndex: "3",
  },
  "& > div:nth-child(5)": {
    borderColor: "transparent transparent transparent #df873a",
    transform: "rotate(105deg)",
    zIndex: "2",
  },
  "& > div:nth-child(6)": {
    borderColor: "transparent transparent transparent #d44c4c",
    transform: "rotate(135deg)",
    zIndex: "1",
  },
}));

const StyledLowToHeight = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",
  "& > p": {
    margin: 0,
    fontSize: "0.8rem",
    fontWeight: 500,
    boxSizing: "border-box"
  },

  "& > p:first-child": {
    color: "#1c8d13",
  },

  "& > p:last-child": {
    color: "#d44c4c",
  },
});

const RiskProfileGraph = (props) => {
  const [position, setPosition] = useState(-90);
  console.log("Meter Graph props => ", props);
  const riskProfile = { 1: -75, 2: -45, 3: -15, 4: 15, 5: 45, 6: 72 };

  useEffect(() => {
    setTimeout(setNeedle, 1000);
  }, [props.riskProfileId]);

  const setNeedle = () => {
    let newPosition = riskProfile[props.riskProfileId] ? riskProfile[props.riskProfileId] : -90;

    if (props.riskProfileId && newPosition !== position) {
      setPosition(newPosition);
    }
  };

  return (
    <MasterWrap>
      <StyledWrap chartWidth={props.chartWidth}>
        <StyledMain chartWidth={props.chartWidth}>
          <StyledParent chartWidth={props.chartWidth} disableLabel={props.disableLabel}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            {!props.disableNiddle ? (
              <StyledNeedle
                position={position}
                needleWidth={props.needleWidth}
                chartWidth={props.chartWidth}
                needleLenght={props.needleLenght}
              >
                <i></i>
                <i></i>
              </StyledNeedle>
            ) : null}
          </StyledParent>
        </StyledMain>
      </StyledWrap>

      {props.disableLabel ? null : (
        <StyledLowToHeight>
          <p>Low Risk</p>
          <p>High Risk</p>
        </StyledLowToHeight>
      )}
    </MasterWrap>
  );
};

RiskProfileGraph.defaultProps = {
  chartWidth: 200,
  disableNiddle: false,
  needleWidth: null,
};

export default memo(RiskProfileGraph);
