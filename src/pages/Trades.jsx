import React from "react";
import TradesContainer from "containers/Trade";
import ErrorBoundary from "components/ErrorBoundary";

const Trades = () => {
	return (
		<ErrorBoundary>
			<TradesContainer />
		</ErrorBoundary>
	);
};

export default Trades;
