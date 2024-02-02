import React, { useState } from "react";
import { styled } from "@mui/system";
import IconButton from "components/common/IconButton";
import List from "components/common/List";
import Divider from "components/common/Divider";
import MuiListItem from "components/common/ListItem";
import MuiListItemText from "components/common/ListItemText";
import MuiListItemIcon from "components/common/ListItemIcon";
import MuiListItemAvatar from "components/common/ListItemAvatar";
import ListSubheader from "components/common/ListSubheader";
import ListItemButton from "components/common/ListItemButton";
import MuiListItemSecondaryAction from "components/common/ListItemSecondaryAction";

const StyledList = styled(List)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	paddingBottom: 0,
	padding: "16px 12px",
	marginBottom:"20px",
	maxHeight: "calc(100% - 110px)",
	overflow: "auto",
}));

const StyledListItem = styled(MuiListItem)(({ theme }) => ({
	display: "block !important",
	paddingLeft: "0 !important",
	paddingRight: "0 !important",
}));

const StyledListItemText = styled(MuiListItemText)(({ theme, isActive }) => ({
	"&.MuiListItemText-primary": {
		fontSize: `${theme.typography.small.fontSize} !important`,
		color: "#fff !important",
		lineHeight: `${theme.typography.body2.lineHeight} !important`,
		...(isActive && {
			color: `#fff !important`,
			fontWeight: `500 !important`,
		}),
	},

	"&.MuiListItemText-secondary": {
		fontSize: `${theme.typography.caption1.fontSize} !important`,
		color: "#252C32 !important",
		lineHeight: `${theme.typography.body2.lineHeight} !important`,
		maxWidth: "130px",
		overflow: "hidden",
		textOverflow: "ellipsis",
		...(isActive && {
			color: `${theme.palette.primary.main} !important`,
		}),
	},
}));

const StyledListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
	minWidth: "24px !important",
	marginRight: "8px",
	color: "white",
}));

const StyledListItemAvatar = styled(MuiListItemAvatar)(({ theme }) => ({
	minWidth: "18px !important",
	marginRight: "12px",
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, isActive }) => {
	// console.log("isActive : ", isActive);

	return {
		borderRadius: `${theme.spacing(0.5)} !important`,
		padding: `${theme.spacing(2)} !important`,
		// paddingRight: `${theme.spacing(1.5)} !important`,
		color: "#fff !important",
		...(isActive && {
			backgroundColor: `#1A54B9 !important`,
		}),
	};
});

const StyledIconButton = styled(IconButton)`
	/* Your styling for StyledIconButton */
`;

const SidebarMenu = (props) => {
	const { menuConfig = [], isDrawerExpanded } = props;
	const [selectedIndex, setSelectedIndex] = useState("");

	const handleMenuExpandClick = (index) => {
		setSelectedIndex(index === selectedIndex ? "" : index);
	};

	return (
		<StyledList>
			{menuConfig.map((item, index) => {
				const {
					type,
					onClick = () => {},
					primaryText,
					secondaryText = "",
					icon = null,
					secondaryAction = "",
					isActive = true,
					isDisabled = false,
					avatar,
				} = item;
				const key = `${type}__${index}`;

				// console.log("type : ", type);

				if (type === "header") {
					return (
						<ListSubheader key={key}>{primaryText}</ListSubheader>
					);
				}

				if (type === "item") {
					if (isDrawerExpanded) {
						return (
							<StyledListItem key={key} sx={{ py: 0 }}>
								<StyledListItemButton
									onClick={onClick}
									disabled={isDisabled}
									isActive={isActive}
								>
									{icon && (
										<StyledListItemIcon>
											{icon}
										</StyledListItemIcon>
									)}
									{avatar && (
										<StyledListItemAvatar>
											{avatar}
										</StyledListItemAvatar>
									)}
									<StyledListItemText
										primary={primaryText}
										secondary={secondaryText}
										isActive={isActive}
									/>
									{secondaryAction ? (
										<MuiListItemSecondaryAction>
											{secondaryAction}
										</MuiListItemSecondaryAction>
									) : null}
								</StyledListItemButton>
							</StyledListItem>
						);
					}

					return (
						<StyledListItem key={key} sx={{ px: 1.5, py: 0 }}>
							<StyledListItemButton
								onClick={onClick}
								disabled={isDisabled}
								isActive={isActive}
							>
								{icon && (
									<StyledIconButton
										disableRipple
										disableFocusRipple
									>
										{icon}
									</StyledIconButton>
								)}
								{avatar && (
									<StyledListItemAvatar>
										{avatar}
									</StyledListItemAvatar>
								)}
							</StyledListItemButton>
						</StyledListItem>
					);
				}

				if (type === "divider") {
					return (
						<StyledListItem key={key}>
							<Divider />
						</StyledListItem>
					);
				}

				if (type === "spacer") {
					return <StyledListItem key={key} />;
				}

				console.log(`${item.type} is not supported by SidebarMenu`);
				return null;
			})}
		</StyledList>
	);
};

export default React.memo(SidebarMenu);
