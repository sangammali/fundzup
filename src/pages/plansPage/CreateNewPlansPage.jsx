import CreateNewPlansContainer from "containers/plans/createNewPlans/CreateNewPlansContainer";
import ErrorBoundary from "components/ErrorBoundary";

const CreateNewPlansPage = () => {
	return (
		<ErrorBoundary>
			<CreateNewPlansContainer />
		</ErrorBoundary>
	);
};

export default CreateNewPlansPage;
