import React from "react";
import MMenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";

const StyledMenuItem = styled(MMenuItem)(({ theme, customStyle }) => ({
	//Can Add custom styling here.
}));

const MenuItem = ({ customStyle, ...restProps }) => {
	return <StyledMenuItem customStyle={customStyle} {...restProps} />;
};

export default React.memo(MenuItem);
