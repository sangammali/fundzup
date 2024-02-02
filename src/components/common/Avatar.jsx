import React from "react";
import { styled } from "@mui/system";
import MAvatar from "@mui/material/Avatar";
import Text from "./Text";

const StyledAvatar = styled(MAvatar)(({ theme }) => ({
	width: 96,
	height: 96,
	...(theme.breakpoints.up("md") && {
		width: 120,
		height: 120,
	}),
}));

const Avatar = ({
	src,
	children,
	title,
	variant = "h2",
	avatarVariant = "",
	sx = {},
	text_sx = {},
	...restProps
}) => {
	if (src) {
		return (
			<StyledAvatar
				alt={title}
				src={src}
				variant={avatarVariant}
				sx={{ ...sx }}
				{...restProps}
			/>
		);
	}

	if (children) {
		return (
			<StyledAvatar variant={avatarVariant} sx={{ ...sx }} {...restProps}>
				{children}
			</StyledAvatar>
		);
	}

	return (
		<StyledAvatar
			variant={avatarVariant}
			sx={{ backgroundColor: "primary.main", ...sx }}
			{...restProps}
		>
			<Text variant={variant} sx={{ lineHeight: 1, ...text_sx }}>
				{title ? title.charAt(0) : "J"}
			</Text>
		</StyledAvatar>
	);
};

export default React.memo(Avatar);
