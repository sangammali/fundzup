import React, { memo, useEffect, useState } from "react";
import {
	Dialog as MDialog,
	DialogActions,
	DialogTitle,
	DialogContent,
} from "@mui/material";
import { styled } from "@mui/system";
import IconButton from "./IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "./Box";

const StyledDialog = styled(MDialog)(({ theme }) => ({
	borderRadius: "10px",
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
	cursor: "move",
	padding: {
		xs: "20px 16px",
		sm: "20px 24px",
	},
	"& > div": {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		marginTop: {
			xs: 3,
			md: 0,
		},
		fontSize: {
			xs: "18px",
			md: "21px",
		},
	},
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
	padding: {
		xs: "20px 16px",
		sm: "20px 24px",
	},
}));

const Dialog = (props) => {
	const [open, setOpen] = useState(false);
	const {
		openComponent,
		actionComponent,
		contentComponent,
		title,
		icon = {},
		onOpen,
		onClose,
		children,
		disableCloseIcon,
		enableBackdropClick = true,
		maxWidth = "sm",
	} = props;

	useEffect(() => {
		setOpen(props.open === true);
	}, [props.open]);

	const onClickOpenInside = (e) => {
		e.preventDefault();
		setOpen(true);
		onOpen();
	};

	const onCloseInside = (e) => {
		setOpen(false);
		onClose();
	};

	const getIcon = () => {
		if (!icon.src) {
			return null;
		}

		return (
			<div
				style={{
					display: "flex",
					margin: "20px 20px",
					justifyContent: "center",
				}}
			>
				<img
					alt="na"
					src={icon.src}
					style={{ width: "130px", height: "130px", ...icon }}
				/>
			</div>
		);
	};

	return (
		<>
			{openComponent ? openComponent(onClickOpenInside) : null}
			<StyledDialog
				onBackdropClick={(e) =>
					enableBackdropClick ? onCloseInside(e) : null
				}
				disableEscapeKeyDown={enableBackdropClick}
				open={open}
				fullWidth
				maxWidth={maxWidth}
				aria-labelledby="draggable-dialog-title"
			>
				<StyledDialogTitle id="draggable-dialog-title">
					{getIcon()}
					<div>
						<Box>{title}</Box>
						{!disableCloseIcon && (
							<IconButton
								aria-label="close"
								onClick={onCloseInside}
								sx={{
									position: "absolute",
									right: 8,
									top: 8,
									color: (theme) => theme.palette.grey[400],
								}}
							>
								<CloseIcon />
							</IconButton>
						)}
					</div>
				</StyledDialogTitle>
				<StyledDialogContent>
					{contentComponent
						? contentComponent(onCloseInside)
						: children}
				</StyledDialogContent>
				{actionComponent(onCloseInside)}
			</StyledDialog>
		</>
	);
};

Dialog.defaultProps = {
	onClose: () => null,
	onOpen: () => null,
	actionComponent: () => null,
	openComponent: null,
	closeIcon: true,
};

export default memo(Dialog);
