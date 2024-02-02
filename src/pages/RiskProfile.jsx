import RiskProfileContainer from "containers/RiskProfileContainer";
import ErrorBoundary from "components/ErrorBoundary";

const RiskProfile = () => {
	return (
		<ErrorBoundary>
			<RiskProfileContainer />
		</ErrorBoundary>
	);
};

export default RiskProfile;
