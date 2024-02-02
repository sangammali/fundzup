import React from "react";
import { styled } from "@mui/system/esm";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import Drawer from "@mui/material/Drawer";
import Box from "components/common/Box";
import Avatar from "components/common/Avatar";
import IconButton from "components/common/IconButton";
import NewSidebarMenu from "./NewSidebarMenu";
import DrawerIcon from "asset/icons/DrawerIcon";
import Text from "components/common/Text";

const drawerWidth = 240;

const Logo = styled(Text)(() => ({
	color: "#fff",
	padding: "20px 12px",
	fontSize: "24px",
	borderBottom: "1px solid #747474",
}));

const DrawerRoot = styled("div")({
	flexShrink: 0,
});

const DrawerPaper = styled("Drawer")(({ theme, isDrawerExpanded }) => ({
	root: {
		flexShrink: 0,
	},
	width: drawerWidth,
	border: "0 !important",
	backgroundColor: "#142E56",
	flex: `0 0 ${drawerWidth}px`,
    height: "100vh",
	...(isDrawerExpanded && {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
	...(!isDrawerExpanded && {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(9),
	}),
}));

const DrawerHeader = styled("div")(({ theme, isDrawerExpanded }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	...(isDrawerExpanded
		? {
				justifyContent: "space-between",
		  }
		: {
				justifyContent: "center",
		  }),
}));

const LogoWrap = styled("div")({
	display: "block",
	marginLeft: "8px",
	// maxWidth: "150px",
});

const StyledAvatar = styled(Avatar)({
	height: 38,
	width: 38,
	variant: "rounded",
	cursor: "pointer",
});

const StyledIconButton = styled(IconButton)({
	cursor: "pointer",
});

const Sidebar = (props) => {
	const theme = useTheme();
	const MEDIA_LG_UP = useMediaQuery(theme.breakpoints.up("lg"));
	const { isDrawerExpanded, onDrawerToggle, menuConfig = [] } = props;
	return (
		<DrawerPaper
			variant={MEDIA_LG_UP ? "permanent" : "temporary"}
			open={isDrawerExpanded}
			isDrawerExpanded={isDrawerExpanded}
			onClose={() => onDrawerToggle(false)}
		>
			{/* {isDrawerExpanded ? (
				<DrawerHeader
					isDrawerExpanded={isDrawerExpanded}
					onClick={() => onDrawerToggle(false)}
				>
					<LogoWrap>
						<StyledImage
              src={brokerLogoUrl ? brokerLogoUrl : "/jarvis-logo.svg"}
              width="auto"
              height={38}
            />
					</LogoWrap>
					<StyledIconButton>
						<DrawerIcon />
					</StyledIconButton>
				</DrawerHeader>
			) : (
				<DrawerHeader
					isDrawerExpanded={isDrawerExpanded}
					onClick={() => onDrawerToggle(true)}
				>
					<StyledAvatar
						src="/jarvis_small_logo.png"
						sx={{ height: 38, width: 38 }}
					/>
				</DrawerHeader>
			)} */}

			<Logo>FundsUp</Logo>

			<NewSidebarMenu
				isDrawerExpanded={isDrawerExpanded}
				menuConfig={menuConfig}
			/>
		</DrawerPaper>
	);
};

export default React.memo(Sidebar);
