import React from "react";
import { useSelector } from "react-redux";
import Stepper from "components/common/Stepper";
import { onboardingSteps } from "helpers/constants";
import Stack from "components/common/Stack";
import Summary from "components/addCustomer/Summary";
import { addCustomerApiAction } from "stores/redux/apiSlices/addCustomerApiSlice";

function SummaryContainer({ handleStepChange }) {
	//hooks
	const customerRiskDetails = useSelector((state) => state.addCustomerSlice.customerDetails);

	//Apis
	const [getCustomerDetails, customerSummary] = addCustomerApiAction.getCustomerSummary();

	// console.log("customerSummary : ", getCustomerDetails);

	React.useEffect(() => {
		getCustomerDetails({ userId: customerRiskDetails.userId }, false);
	}, [customerRiskDetails?.userId]);

	return (
		<>
			<Summary handleStepChange={handleStepChange} customerSummary={customerSummary?.data} />
		</>
	);
}

export default SummaryContainer;
