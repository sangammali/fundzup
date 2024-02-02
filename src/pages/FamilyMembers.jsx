import FamilyMembersContainer from "containers/FamilyMembers/FamilyMembersContainer";
import ErrorBoundary from "components/ErrorBoundary";

function FamilyMembers() {
	return (
		<ErrorBoundary>
			<FamilyMembersContainer />
		</ErrorBoundary>
	);
}

export default FamilyMembers;
