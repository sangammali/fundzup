import React from "react";
import Stack from "./common/Stack";
import Text from "./common/Text";
import Card from "./common/Card";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<Stack
					alignItems="center"
					justifyContent="center"
					sx={{ width: "100%", height: "100%" }}
				>
					<Card sx={{p:3}}>
						<Text varinat="h3" color="#2396e8">
							Oops something went wrong! Please try after sometime.
						</Text>
					</Card>
				</Stack>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
