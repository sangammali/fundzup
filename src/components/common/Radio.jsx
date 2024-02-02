import React from "react";
import MRadio from "@mui/material/Radio";
import { styled } from "@mui/system";

const StyledRadio = styled(MRadio)(({ theme, customStyle }) => ({
	// add your custom style here
	width:"20px",height:"20px"
}));

const MyStyledRadio = ({ customStyle, ...restProps }) => {
	return <StyledRadio customStyle={customStyle} {...restProps} />;
};

export default React.memo(MyStyledRadio);
