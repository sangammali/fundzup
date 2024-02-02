import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import OtherDetails from "components/addCustomer/OtherDetails";
import { addCustomerApiAction } from "stores/redux/apiSlices/addCustomerApiSlice";
import { fileToBase64 } from "helpers/fileFormat";
import { validationHelper } from "helpers/validation";

function OtherDetailsContainer({ handleStepChange }) {
	//State
	const [formData, setFormData] = useState({
		plan: null,
		planStartDate: null,
		planExpiryDate: null,
		customerResidency: null,
		customerCategory: null,
		customerType: null,
		joiningDate: null,
		isAddUserToFamilyChecked: false,
		family: null,
		isAutoCheck: false,
		panNo: null,
		aadharCard: null,
		signAgreement: null,
	});

	const [formError, setFormError] = useState({
		plan: null,
		planStartDate: null,
		planExpiryDate: null,
		customerResidency: null,
		customerCategory: null,
		customerType: null,
		joiningDate: null,
		family: null,
		panNo: null,
		aadharCard: null,
		signAgreement: null,
	});

	//Hooks
	const customerRiskDetails = useSelector((state) => state.addCustomerSlice.customerDetails);

	//apis
	const { data: familyList } = addCustomerApiAction.getFamilyDetails();
	const { data: planList } = addCustomerApiAction.getPlanDetails();
	const { data: risk } = addCustomerApiAction.getRiskAssesment();
	const [submitOtherDetails] = addCustomerApiAction.updateOtherDetails();
    
	//Handlers Methods
	const handleChange = ({ name, value }) => {
		let newFormData = { ...formData };
		newFormData[name] = value;
		setFormData(newFormData);
	};

	const handleValidation = () => {
		const newFormError = { ...formError };

		const planValidation = validationHelper.required(formData.plan);
		newFormError.plan = planValidation.message;

		const startDateValidation = validationHelper.required(formData.planStartDate);
		newFormError.planStartDate = startDateValidation.message;

		const expiryDateValidation = validationHelper.required(formData.planExpiryDate);
		newFormError.planExpiryDate = expiryDateValidation.message;

		const customerResidencyValidation = validationHelper.required(formData.customerResidency);
		newFormError.customerResidency = customerResidencyValidation.message;

		const customerCategoryValidation = validationHelper.required(formData.customerCategory);
		newFormError.customerCategory = customerCategoryValidation.message;

		const customerTypeValidation = validationHelper.required(formData.customerType);
		newFormError.customerType = customerTypeValidation.message;

		const joiningDateValidation = validationHelper.required(formData.joiningDate);
		newFormError.joiningDate = joiningDateValidation.message;

		//Family Validation
		let familyValidation = { isValid: 1 };
		if (formData.isAddUserToFamilyChecked) {
			familyValidation = validationHelper.required(formData.family);
			newFormError.family = familyValidation.message;
		} else {
			newFormError.family = "";
		}

		const panValidation = validationHelper.required(formData.panNo);
		newFormError.panNo = panValidation.message;

		const aadhaarValidation = validationHelper.required(formData.aadharCard);
		newFormError.aadharCard = aadhaarValidation.message;

		const signValidation = validationHelper.required(formData.signAgreement);
		newFormError.signAgreement = signValidation.message;

		setFormError(newFormError);

		return (
			planValidation.isValid &&
			startDateValidation.isValid &&
			expiryDateValidation.isValid &&
			customerResidencyValidation.isValid &&
			customerCategoryValidation.isValid &&
			customerTypeValidation.isValid &&
			customerTypeValidation.isValid &&
			joiningDateValidation.isValid &&
			familyValidation.isValid &&
			panValidation.isValid &&
			aadhaarValidation.isValid &&
			signValidation.isValid
		);
	};

	const handleSubmit = async () => {
		if (!handleValidation()) {
			return;
		}
		try {
			let panString = await fileToBase64(formData.panNo[0]);
			let aadharString = await fileToBase64(formData.aadharCard[0]);
			let signAgreementString = await fileToBase64(formData.signAgreement[0]);
			const payload = {
				userId: customerRiskDetails.userId,
				otherDetails: {
					plan_detail_id: formData.plan.plan_id,
					plan_code: formData.plan.code,
					plan_start_date: dayjs(formData.planStartDate).format("YYYY/MM/DD"),
					plan_expiry_date: dayjs(formData.planExpiryDate).format("YYYY/MM/DD"),
					customer_residency: formData.customerResidency,
					customer_category: formData.customerCategory,
					customer_type: formData.customerType,
					joining_date: dayjs(formData.joiningDate).format("YYYY/MM/DD"),
					is_family_group: formData.isAddUserToFamilyChecked,
					is_auto_trade: formData.isAutoCheck,
					pan_card: `data:application/pdf;base64${panString}`,
					aadhar_card: `data:application/pdf;base64${aadharString}`,
					sign_agreement: `data:application/pdf;base64${signAgreementString}`,
				},
			};
			if (formData.isAddUserToFamilyChecked) {
				payload.otherDetails.family_id = formData.family.family_id;
			}
			const res = await submitOtherDetails(payload);
			if (res.data.status === 1) {
				handleStepChange(5);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<OtherDetails
				handleStepChange={handleStepChange}
				handleChange={handleChange}
				formData={formData}
				formError={formError}
				familyList={familyList?.familygroups}
				planList={planList?.plans}
				handleSubmit={handleSubmit}
			/>
		</>
	);
}

export default OtherDetailsContainer;
