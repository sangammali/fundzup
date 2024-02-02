import React from "react";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Button from "components/common/Button";
import Text from "components/common/Text";
import Box from "components/common/Box";
import IconButton from "./IconButton";

const SideDrawer = ({
	open,
	closeDrawer,
	title,
	subtitle,
	contentTitle,
	handleSubmit,
	cancelButtonText,
	submitButtonText,
	children,
	showPrimaryButton = true, // Add the showPrimaryButton prop
	showSecondaryButton = true, // Add the showSecondaryButton prop
	drawerWidth = 500,
	showActionContainer = true,
	primaryAction
}) => {
	const theme = useTheme();
	console.log("open : ",open);
	return (
		<Drawer
			anchor={"right"}
			open={open}
			PaperProps={{
				sx: { width: `${drawerWidth}px !important ` },
				overflow: "hidden",
			}}
		>
			<Paper
				variant="outlined"
				square
				sx={{
					backgroundColor: theme.palette.primary.main,
					padding: "20px 10px",
				}}
			>
				<Stack direction="row" justifyContent={"space-between"}>
					<Text
						sx={{
							color: theme.palette.common.white,
							fontWeight: theme.typography.fontWeightMedium,
							fontSize: "1.5rem",
						}}
					>
						{title}
					</Text>
					<IconButton>
						<CloseIcon onClick={() => closeDrawer(false)} sx={{ color: "#fff" }} />
					</IconButton>
				</Stack>
				<Text
					sx={{
						color: theme.palette.common.white,
						fontSize: theme.typography.small.fontSize,
						fontWeight: theme.typography.fontWeightLight,
					}}
				>
					{subtitle}
				</Text>
			</Paper>
			<Stack
				spacing={1.5}
				p={"20px 24px"}
				sx={{
					overflowX: "hidden",
					mb: 12,
					"&::-webkit-scrollbar ": {
						display: "none",
					},
				}}
			>
				<Text
					sx={{
						color: theme.palette.grey?.[900],
						fontSize: theme.typography.fontSize,
						fontWeight: theme.typography.fontWeightLight,
					}}
				>
					{contentTitle}
				</Text>

				{children}
			</Stack>
			{showActionContainer && (
				<Box
					sx={{
						position: "fixed",
						bottom: 0,
						width: `${drawerWidth}px`,
					}}
				>
					<Stack
						direction={"row"}
						spacing={1}
						justifyContent={"center"}
						alignItems={"center"}
						mb={3}
						px={2}
					>
						{showSecondaryButton && ( // Render the primary button conditionally
							<Button
								variant="outlined"
								onClick={primaryAction ? primaryAction : () => closeDrawer(false)}
								size="medium"
								color="secondary"
								sx={{
									color: theme.palette.grey?.[900],
									borderColor: theme.palette.grey?.[900],
									background: theme.palette.common.white,
									width: "100%",
									px: 2.5,
									py: 2,
									fontSize: "1rem",
								}}
							>
								{cancelButtonText}
							</Button>
						)}
						{showPrimaryButton && ( // Render the secondary button conditionally
							<Button
								sx={{
									width: "100%",
									px: 2.5,
									py: 2,
									fontSize: "1rem",
								}}
								variant="contained"
								size="medium"
								color="primary"
								onClick={handleSubmit}
							>
								{submitButtonText}
							</Button>
						)}
					</Stack>
				</Box>
			)}
		</Drawer>
	);
};

export default SideDrawer;
