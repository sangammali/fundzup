import React from "react";
import CustomerContainer from "customers/CustomerContainer";
import ErrorBoundary from "components/ErrorBoundary";
const Customer = () => {
	return (
		<ErrorBoundary>
			<CustomerContainer />
		</ErrorBoundary>
	);
};

export default Customer;
