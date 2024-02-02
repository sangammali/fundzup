import React, { useState } from "react";
import Stepper from "components/common/Stepper";
import Box from "components/common/Box";
import { styled } from "@mui/material";
import { onboardingSteps } from "helpers/constants";
import CustomerDetailsContainer from "./CustomerDetailsContainer";
import RiskAssesmentContainer from "./RiskAssesmentContainer";
import InvestmentDetailsContainer from "./InvestmentDetailsContainer";
import OtherDetailsContainer from "./OtherDetailsContainer";
import SummaryContainer from "./SummaryContainer";

const StepperBackground = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.secondary.main,
	maxWidth: "calc(100% + 48px)",
	margin: "0 -24px",
	padding: "16px 94px",
}));

const AddCustomerContainer = () => {
	const [currentStep, setCurrentStep] = useState(1);

	const handleStepChange = (nextStep) => {
		setCurrentStep(nextStep);
	};

	return (
		<>
			{currentStep <= 4 ? (
				<>
					<StepperBackground>
						<Stepper stepperData={onboardingSteps} currentStepsId={currentStep} />
					</StepperBackground>
					<Box mt={7}>
						{currentStep === 1 && (
							<CustomerDetailsContainer
								handleStepChange={handleStepChange}
								currentStep={currentStep}
							/>
						)}
						{currentStep === 2 && (
							<RiskAssesmentContainer handleStepChange={handleStepChange} />
						)}
						{currentStep === 3 && (
							<InvestmentDetailsContainer handleStepChange={handleStepChange} />
						)}
						{currentStep === 4 && (
							<OtherDetailsContainer handleStepChange={handleStepChange} />
						)}
					</Box>
				</>
			) : (
				<>
					<SummaryContainer handleStepChange={handleStepChange} />
				</>
			)}
		</>
	);
};

export default AddCustomerContainer;
