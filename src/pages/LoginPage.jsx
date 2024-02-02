import React from "react";
import LoginContainer from "containers/LoginContainer";
import ErrorBoundary from "components/ErrorBoundary";

const LoginPage = () => {
	return (
		<ErrorBoundary>
			<LoginContainer />;
		</ErrorBoundary>
	);
};

export default LoginPage;
