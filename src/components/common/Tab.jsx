import React from "react";
import MTabs from "@mui/material/Tabs";
import MTab from "@mui/material/Tab";
import { styled } from "@mui/system";
import Box from "./Box";

const StyledTabs = styled(MTabs)(({ theme }) => ({
	// Add your custom styles for Tabs here
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTab = styled(MTab)(({ theme }) => ({
	// Add your custom styles for each Tab here
	fontSize: theme.typography.pxToRem(14),
	fontWeight: 500,
}));

const Tabs = (props) => {
	const { tabs, onChange, value, tabSx, ...restProps } = props;

	return (
		<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
			<StyledTabs
				TabIndicatorProps={{
					style: {
						height: 3,
						borderRadius: "2px 2px 2px 2px",
					},
				}}
				onChange={onChange}
				variant="scrollable"
				scrollButtons="auto"
				allowScrollButtonsMobile
				value={value}
				{...restProps}
			>
				{tabs.map((item, i) => (
					<StyledTab
						key={item.value}
						value={item.value}
						label={item.label}
						sx={{ ...tabSx }}
					/>
				))}
			</StyledTabs>
		</Box>
	);
};

export default React.memo(Tabs);
