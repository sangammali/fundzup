import React,{useState} from "react";
import CustomerDetails from "components/addCustomer/CustomerDetails";
import { qtsAndOptions } from "helpers/constants";
import Grid from "components/common/Grid";
import Text from "components/common/Text";
import Stack from "components/common/Stack";
import Box from "components/common/Box";
import CustomerAnswers from "components/Customer/CustomerAnswers";
import CustomerQuestions from "components/Customer/CustomerQuestions";
import { Step } from "@mui/material";
import Stepper from "components/common/Stepper"
// import {abc} from "helpers/constants"

function CustomerRiskAssesmentContainer({ handleStepChange, currentStep }) {

	const [basicDetails, setBasicDetails] = useState({
		name: "",
		email: "",
		phoneNo: "",
		otp: "",
	});

	const [advanceDetails, setAdvanceDetails] = useState([]);

	const [isBasicDetailsCompleted, setIsBasicDetailsCompleted] =
		useState(true);
	const [answer, setAnswer] = useState("");

	const handleOtpSubmit = () => {
		console.log("==============")
		setIsBasicDetailsCompleted(true);
	};

	const handleAnswers = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setAnswer(value);
	};

	const handleSubmit = (e) => {
		handleStepChange(2);
		return null;
	};
	console.log("isBasicDetailsCompleted : ", isBasicDetailsCompleted);

    // const [currentStep, setCurrentStep] = useState(1);

	// const handleStepChange = (nextStep) => {
	// 	setCurrentStep(nextStep);
	// };



  return (
    <>
    {/* <Stepper stepperData={abc} currentStepsId={currentStep}/>    */}
      {isBasicDetailsCompleted ? (
        <Box sx={{backgroundColor: "#F7F8FF"}}>
          <Grid container>
            <Grid item xs={12}sx={{ml:6,mt:2}}>
            <Text sx={{color:"#242424",fontsize:"24px",fontweight:500}}>Risk assessment</Text>
            <Text sx={{color:"#676C76",fontsize:"16px",fontweight:400}}>Answer the following questions to know whether you are aggressive, modrate or conservative risk taker.</Text>
    
            </Grid>

            <Grid item xs={6}>
              <Stack justifyContent="center" alignItems="center" height="100%" width="100%">
                <CustomerQuestions currentQtsId={0} />
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack justifyContent="center" alignItems="center" height="100%">
                <CustomerAnswers onchange={handleAnswers} onClick={handleSubmit} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CustomerDetails handleOtpSubmit={handleOtpSubmit} />
      )}
    </>
  );
}

export default CustomerRiskAssesmentContainer;
