import React from "react";
import MBox from '@mui/material/Box';

const Box = (props) => {
  return <MBox sx={{  ...props.sx }} {...props}  />
}

export default Box;