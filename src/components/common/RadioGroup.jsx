import React from "react";
import MRadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/system";

const StyledRadioGroup = styled(MRadioGroup)(({ theme, customStyle }) => ({
	// Add your custom styles here
}));

const MyStyledRadioGroup = ({ customStyle, ...restProps }) => {
	return <StyledRadioGroup customStyle={customStyle} {...restProps} />;
};

export default React.memo(MyStyledRadioGroup);
