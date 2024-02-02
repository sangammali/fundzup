import React, { useState } from "react";
// import Sidebar from "components/Layout/Sidebar";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import AddCustomerIcon from "asset/icons/AddCustomerIcon";
import CustomerIcon from "asset/icons/CustomerIcon";
import DividendIcon from "asset/icons/DividendIcon";
import FamilyIcon from "asset/icons/FamilyIcon";
import ReportIcon from "asset/icons/ReportIcon";
import RiskProfile from "asset/icons/RiskProfile";
import TradeIcon from "asset/icons/TradeIcons";
import PlanIcon from "asset/icons/PlanIcon";
import Stack from "components/common/Stack";
import NewSideBar from "components/Layout/NewSideBar";
import { useNavigate } from "react-router-dom";
import { routes } from "helpers/constants";
import { useLocation } from "react-router-dom";
import Header from "components/Layout/Header";

const LayoutContainer = (props) => {
	const [isDrawerExpanded, setIsDrawerExpanded] = useState(true);

	const location = useLocation();
	let navigate = useNavigate();

	console.log("location : ", location);

	const [selectedRoute, setSelectedRoute] = useState(location.pathname);

	const getSidebarMenuConfig = () => {
		const sidebarMenu = [
			{
				type: "item",
				primaryText: "Dashboard",
				icon: <DashboardIcon />,
				onClick: () => {
					handleNavigation(routes.dashboard);
				},
				isActive: isActiveRoute(routes.dashboard),
			},
			{
				type: "item",
				primaryText: "Add Customer",
				icon: <AddCustomerIcon />,
				onClick: () => {
					handleNavigation(routes.addCustomer);
				},
				isActive: isActiveRoute(routes.addCustomer),
			},
			{
				type: "item",
				primaryText: "Customers",
				icon: <CustomerIcon />,
				onClick: () => {
					handleNavigation(routes.customers);
				},
				isActive: isActiveRoute(routes.customers),
			},
			{
				type: "item",
				primaryText: "Trades",
				icon: <TradeIcon />,
				onClick: () => {
					handleNavigation(routes.trades);
				},
				isActive: isActiveRoute(routes.trades),
			},
			{
				type: "item",
				primaryText: "Reports",
				icon: <ReportIcon />,
				onClick: () => {
					handleNavigation(routes.reports);
				},
				isActive: isActiveRoute(routes.reports),
			},
			{
				type: "item",
				primaryText: "Model Portfolio",
				icon: <RiskProfile />,
				onClick: () => {
					handleNavigation(routes.riskProfile);
				},
				isActive: isActiveRoute(routes.riskProfile),
			},
			{
				type: "item",
				primaryText: "Plans",
				icon: <PlanIcon />,
				onClick: () => {
					handleNavigation(routes.plans);
				},
				isActive: isActiveRoute(routes.plans),
			},
			{
				type: "item",
				primaryText: "Family Members",
				icon: <FamilyIcon />,
				onClick: () => {
					handleNavigation(routes.familyMembers);
				},
				isActive: isActiveRoute(routes.familyMembers),
			},
			{
				type: "item",
				primaryText: "Dividend",
				icon: <DividendIcon />,
				onClick: () => {
					handleNavigation(routes.dividend);
				},
				isActive: isActiveRoute(routes.dividend),
			},
		];

		return sidebarMenu;
	};

	const handleDrawerToggle = (isExpanded) => {
		setIsDrawerExpanded(isExpanded);
	};

	const handleNavigation = (redirectUrl) => {
		navigate(redirectUrl);
		setSelectedRoute(redirectUrl);
	};

	const isActiveRoute = (route) => {
		return route === selectedRoute;
	};

	// Now you can call the function
	const sidebarMenu = getSidebarMenuConfig();

	// Find the menu item with matching route and get its primaryText
	const selectedPrimaryText = sidebarMenu.find(
		(item) => item.type === "item" && item.isActive
	)?.primaryText;
	return (
		<Stack direction="row" sx={{ maxHeight: "100vh", overflow: "hidden" }}>
			<NewSideBar
				menuConfig={getSidebarMenuConfig()}
				isDrawerExpanded={isDrawerExpanded}
				onDrawerToggle={handleDrawerToggle}
			/>
			<Stack
				sx={{
					flex: 1,
					backgroundColor: {
						xs: "background.paper",
						md: "grey.100",
					},
					maxWidth: "calc(100% - 240px)",
				}}
			>
				<Header selectedRoute={selectedPrimaryText} />

				<Stack
					sx={{
						position: "relative",
						flex: 1,
						maxWidth: "100%",
						px: 3,
						py: 0,
						pb: 2,
						overflowX: "hidden",
						backgroundColor: "#F7F8FF",
					}}
				>
					{props.children}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LayoutContainer;
