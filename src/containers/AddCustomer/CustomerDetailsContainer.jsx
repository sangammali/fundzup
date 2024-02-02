import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { validationHelper } from "helpers/validation";
import CustomerDetails from "components/addCustomer/CustomerDetails";
import CustomerRiskDetails from "components/addCustomer/CustomerRiskDetails";
import { addCustomerApiAction } from "stores/redux/apiSlices/addCustomerApiSlice";
import { addCustomerActions } from "stores/redux/slices/addCustomerSlice";

const CustomerDetailsContainer = ({ handleStepChange, currentStep }) => {
	//Basic Details states
	const [basicDetails, setBasicDetails] = useState({
		name: "",
		email: "",
		phoneNo: "",
		emailOtp: "",
		phoneOtp: "",
	});
	const [basicDetailsError, setBasicDetailsError] = useState({
		email: "",
		phoneNo: "",
		emailOtp: "",
		phoneOtp: "",
	});
	const [isEmailOtpSend, setIsEmailOtpSend] = useState(false);
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [isPhoneOtpSend, setIsPhoneOtpSend] = useState(false);
	const [isBasicDetailsCompleted, setIsBasicDetailsCompleted] = useState(false);
	const [userId, setUserId] = useState(null);

	// const [isRiskProfileSelected, setIsRiskProfileSelected] = useState(true);

	// Advance Details states.
	const [riskDetailsAnswer, setRiskDetailsAnswer] = useState([]);
	const [currentQtsId, setCurrentQtsId] = useState(1);
	const [totalQts, setTotalQts] = useState(0);
	const [riskPoints, setRiskPoints] = useState(0);

	// Add Customer Actions
	const { data: riskAssesmentQts } = addCustomerApiAction.getRiskAssesment();
	const [sendOTPAction] = addCustomerApiAction.sendOtp();
	const [confirmEmailOtpAction] = addCustomerApiAction.confirmEmailOtp();
	const [confirmPhoneOtpAction] = addCustomerApiAction.confirmPhoneOtp();
	const [submitRiskDetailsAction] = addCustomerApiAction.submitRiskDetails();
	const dispatch = useDispatch();

	//useEffect

	useEffect(() => {
		if (riskAssesmentQts) {
			setTotalQts(riskAssesmentQts.qts.length);
		}
	}, [riskAssesmentQts]);

	// Form Handle Function
	const handleBasicFormChange = (name, value) => {
		const newBasicDetails = { ...basicDetails };
		if (name === "phoneNo") {
			if (isNaN(value)) {
				return;
			}
		}
		setBasicDetails({ ...newBasicDetails, [name]: value });
	};

	const handleEmailValidation = () => {
		let newError = { ...basicDetailsError };
		const emailValidation = validationHelper.email(basicDetails.email);
		newError.email = emailValidation.message;
		setBasicDetailsError(newError);
		return emailValidation.isValid;
	};

	const handleEmailOtpSend = async () => {
		if (!handleEmailValidation()) {
			return;
		}
		const payload = {
			name: basicDetails.name,
			type: "email",
			email: basicDetails.email,
			mobile: "",
			user_type: "customer",
			user_id: "",
		};
		try {
			const res = await sendOTPAction(payload).unwrap();
			console.log("res: ", res);
			if (res.status === 1) {
				if(res?.result?.current_stage){
					handleStepChange(Number(res.result.current_stage) + 1);
					return;
				}
				setIsEmailOtpSend(true);
			}
		} catch (err) {
			console.log("err:", err);
		}
	};

	const handlePhoneValidation = () => {
		let newError = { ...basicDetailsError };
		const mobileValidation = validationHelper.mobile(basicDetails.phoneNo);
		newError.phoneNo = mobileValidation.message;
		setBasicDetailsError(newError);
		return mobileValidation.isValid;
	};

	const handlePhoneOtpSend = async () => {
		if (!handlePhoneValidation()) {
			return;
		}
		const payload = {
			name: basicDetails.name,
			type: "mobile",
			email: basicDetails.email,
			mobile: basicDetails.phoneNo,
			user_type: "customer",
			user_id: userId,
		};
		try {
			const res = await sendOTPAction(payload).unwrap();
			if (res.status === 1) {
				setIsPhoneOtpSend(true);
			}
		} catch (err) {
			console.log("err:", err);
		}
	};

	const handleRiskDetailAnswers = (questionId, currentAnswer, isComplete) => {
		console.log("isComplete : ",isComplete);
		let newRiskDetails = [...riskDetailsAnswer];
		newRiskDetails = riskDetailsAnswer.filter((item) => item.question_id !== questionId);
		const answer = {
			question_id: questionId,
			answer_id: currentAnswer.optionId,
			weightage: currentAnswer.weightage,
		};
		newRiskDetails.push(answer);
		const point = newRiskDetails.reduce((acc, currValue) => acc + currValue.weightage, 0);
		setRiskDetailsAnswer(newRiskDetails);
		setRiskPoints(point);
		if (isComplete) {
			handleSubmit();
		} else {
			setCurrentQtsId(currentQtsId + 1);
		}
	};

	const handleRiskDetailPreviousStep = () => {
		setCurrentQtsId(currentQtsId - 1);
	};

	// Submit Functions

	const otpValidation = ({ name, value }) => {
		let newBasicDetailsError = { ...basicDetailsError };

		const otpValidation = validationHelper.otp(value);
		newBasicDetailsError[name] = otpValidation.message;

		setBasicDetailsError(newBasicDetailsError);
		return otpValidation.isValid;
	};

	const handleEmailOtpSubmit = async () => {
		if (!otpValidation({ name: "emailOtp", value: basicDetails.emailOtp })) {
			return;
		}
		const payload = {
			type: "email",
			email: basicDetails.email,
			mobile: "",
			otp: basicDetails.emailOtp,
		};
		try {
			let res = await confirmEmailOtpAction(payload);
			res = res.data;
			if (res.status === 1) {
				dispatch(addCustomerActions.setCustomerUserId({ userId: res.result.user_id }));
				setUserId(res.result.user_id);
				setIsEmailVerified(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handlePhoneOtpSubmit = async () => {
		if (!otpValidation({ name: "phoneOtp", value: basicDetails.phoneOtp })) {
			return;
		}
		const payload = {
			type: "mobile",
			email: "",
			mobile: basicDetails.phoneNo,
			otp: basicDetails.phoneOtp,
			user_id: userId,
		};
		try {
			const res = await confirmPhoneOtpAction(payload);
			console.log("phone submit res : ", res);
			if (res.data.status === 1) {
				setIsBasicDetailsCompleted(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (e) => {
		const newRiskDetails = riskDetailsAnswer.map((item) => {
			return {
				question_id: `${item.question_id}`,
				answer_id: `${item.answer_id}`,
				weightage: `${item.weightage}`,
			};
		});

		// const newRisk
		const payload = {
			userId,
			answer: newRiskDetails,
		};
		console.log("payload : ",payload);

		try {
			const res = await submitRiskDetailsAction(payload);
			console.log("res : ",res);
			if (res && res.data && res.data.status === 1) {
				let { result } = res.data;
				const payload = {
					riskProfileScore: result.riskProfileScore,
					type: result.type,
					investmentId: result.investment_id,
				};
				dispatch(addCustomerActions.setCustomerRiskProfile(payload));
				handleStepChange(2);
				return null;
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{isBasicDetailsCompleted ? (
				<CustomerRiskDetails
					handleSubmit={handleSubmit}
					handleAnswers={handleRiskDetailAnswers}
					handlePreviousStep={handleRiskDetailPreviousStep}
					riskAssesmentQts={riskAssesmentQts}
					currentQtsId={currentQtsId}
					totalQts={totalQts}
					riskPoints={riskPoints}
					riskDetailsAnswer={riskDetailsAnswer}
				/>
			) : (
				<CustomerDetails
					handleBasicFormChange={handleBasicFormChange}
					handleEmailOtpSubmit={handleEmailOtpSubmit}
					handlePhoneOtpSubmit={handlePhoneOtpSubmit}
					handleEmailOtpSend={handleEmailOtpSend}
					handlePhoneOtpSend={handlePhoneOtpSend}
					formData={basicDetails}
					isEmailOtpSend={isEmailOtpSend}
					isPhoneOtpSend={isPhoneOtpSend}
					isEmailVerified={isEmailVerified}
					basicDetailsError={basicDetailsError}
				/>
			)}
		</>
	);
};

export default CustomerDetailsContainer;
