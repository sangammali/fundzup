import React, { memo } from "react";

// import { makeStyles } from "@mui/styles";
import { Checkbox as MCheckbox } from "@mui/material";

// const useStyles = makeStyles(() =>({
//     root:{
// 		padding: "0px",
//         "& > svg":{
//             fontSize:"20px"
//         }
// 	}
// }));

const Checkbox = (props) => {
//   const classes = useStyles();
  const { style, label, color, onChange, ...restProps } = props;
  return (
    <span style={{ marginRight: "10px" }}>
      <MCheckbox
        sx={{
          padding: "0px",
          color:"black",
          "& > svg": {
            fontSize: "20px",
          
            // backgroundColor:"black"
          },
        }}
        onChange={onChange}
        {...restProps}
      />
    </span>
  );
};

export default memo(Checkbox);
