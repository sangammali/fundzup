import React from "react";
import DashBoardContainer from "containers/DashBoardContainer";
import ErrorBoundary from "components/ErrorBoundary";

const Dashboard = () => {
	return (
		<ErrorBoundary>
			<DashBoardContainer />
		</ErrorBoundary>
	);
};

export default Dashboard;
