import React, { memo } from "react";
import { Modal as MModal } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import Text from "./Text";
import Box from "./Box";
import IconButton from "./IconButton";

const StyledModal = styled(MModal)(({ theme }) => ({
	position: "absolute",
	width: 400,
	maxWidth: "95%",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: theme.palette.background.paper,
	border: "1px solid #333",
	boxShadow: theme.shadows[5],
	borderRadius: "8px",
	overflow: "hidden",
}));

const Header = styled("div")(({ theme }) => ({
	padding: theme.spacing(1, 2, 1),
	position: "relative",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
	position: "absolute",
	right: 2,
	top: 2,
}));

const Body = styled("div")(({ theme }) => ({
	background: "#fff",
	padding: theme.spacing(2),
	maxHeight: "75vh",
	overflow: "auto",
}));

const Modal = (props) => {
	const {
		children,
		open,
		size = "xs",
		title = "",
		onClose = () => {},
		disableClose,
		disableCroseButton = false,
		disableEscapeKeyDown,
		onBackdropClick = () => {},
		sx = {},
	} = props;

	const sizes = {
		xs: 400,
		sm: 600,
		md: 800,
		lg: 1000,
		xl: 1200,
	};

	return (
		<StyledModal
			open={open}
			onClose={() => onClose()}
			aria-labelledby="lira-modal-title"
			aria-describedby="lira-modal-description"
			// disableEscapeKeyDown={disableEscapeKeyDown}
			// onBackdropClick={onBackdropClick}
		>
			{/* <Header
				// className={Header}
				style={{ width: sizes[size] }}
				sx={{ ...sx }}
			> */}
				{/* {title || !disableClose ? (
					<>
						<Text
							variant="h5"
							component="h3"
							align="center"
							sx={{
								fontSize: {
									xs: "22px",
									sm: "24px",
									md: "27px",
								},
								minHeight: "30px",
							}}
						>
							{title ? title : ""}
						</Text>
						{!disableClose ? (
							<CloseButton
								onClick={onClose}
								// disabled={disableCroseButton}
							>
								<CloseIcon />
							</CloseButton>
						) : null}
					</>
				) : null} */}
			{/* </Header> */}
			<Body>{children}</Body>
		</StyledModal>
	);
};

export default memo(Modal);
