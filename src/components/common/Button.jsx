import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme, color }) => ({
	// Add your custom styles here
	fontSize: "14px",
	height: "fit-content",
}));

const MyStyledButton = (props) => {
	const {
		children,
		title,
		variant = "contained",
		size = "small",
		color = "primary",
		loading = false,
		onClick = () => {},
		sx,
		...restProps
	} = props;

	return (
		<StyledButton
			variant={variant}
			size={size}
			onClick={onClick}
			color={color}
			loading={loading}
			sx={{ textTransform: "none", ...sx }}
			{...restProps}
		>
			{children || title}
		</StyledButton>
	);
};

MyStyledButton.propTypes = {
	width: PropTypes.string,
	variant: PropTypes.string,
	title: PropTypes.string,
	onClick: PropTypes.func,
	startIcon: PropTypes.any,
	color: PropTypes.string,
	titleColor: PropTypes.string,
};

export default React.memo(MyStyledButton);
