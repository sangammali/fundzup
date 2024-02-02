import React from "react";
import ReportsContainer from "containers/Reports/ReportsContainer";
import ErrorBoundary from "components/ErrorBoundary";

const Reports = () => {
	return (
		<ErrorBoundary>
			<ReportsContainer />
		</ErrorBoundary>
	);
};

export default Reports;
