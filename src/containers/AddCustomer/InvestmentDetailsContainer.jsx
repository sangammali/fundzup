import { useState } from "react";
import { useSelector } from "react-redux";
import InvesmentDetails from "components/addCustomer/InvesmentDetails";
import { addCustomerApiAction } from "stores/redux/apiSlices/addCustomerApiSlice";
import { validationHelper } from "helpers/validation";
function InvestmentDetailsContainer({ handleStepChange }) {
	//States
	const [formData, setFormData] = useState({
		capital: "",
		isPercent: false,
		isCustomInvestmentSelected: false,
		customAmount: "",
		isModelPortfolioSelected: false,
		modelPorfolioAmount: "",
		isHighRiskSelected: false,
		highRiskAmount: "",
		isMediumRiskSelected: false,
		mediumRiskAmount: "",
		isLowRiskSelected: false,
		lowRiskAmount: "",
		isAlgoSelected: false,
		algoAmount: "",
	});

	const [formError, setFormError] = useState({
		capital: "",
		customAmount: "",
		modelPorfolioAmount: "",
		highRiskAmount: "",
		mediumRiskAmount: "",
		lowRiskAmount: "",
		algoAmount: "",
	});
	const [amountError, setAmountError] = useState(null);
	const [modalAmountError, setModalAmountError] = useState(null);

	// Hooks
	const customerRiskDetails = useSelector((state) => state.addCustomerSlice.customerDetails);

	// Apis
	const { data: productDetails } = addCustomerApiAction.getProductDetails();
	const [submitInvestmentDetails] = addCustomerApiAction.updateInvestmentDetails();

	// Handler Methods
	const handleChange = ({ name, value }) => {
		if (
			[
				"capital",
				"customAmount",
				"modelPorfolioAmount",
				"highRiskAmount",
				"mediumRiskAmount",
				"lowRiskAmount",
				"algoAmount",
			].includes(name)
		) {
			if (isNaN(value)) {
				return;
			}
		}
		let newFormData = { ...formData };
		newFormData[name] = value;
		setFormData(newFormData);
	};

	const handleValidation = () => {
		const newFormError = { ...formError };

		const capitalValidation = validationHelper.required(formData.capital);
		newFormError.capital = capitalValidation.message;

		let customValidation = { isValid: 1 };
		if (formData.isCustomInvestmentSelected) {
			customValidation = validationHelper.required(formData.customAmount);
			newFormError.customAmount = customValidation.message;
		} else {
			newFormError.customAmount = "";
		}

		let modelPortfolioValidation = { isValid: 1 };
		if (formData.isModelPortfolioSelected) {
			modelPortfolioValidation = validationHelper.required(formData.modelPorfolioAmount);
			newFormError.modelPorfolioAmount = modelPortfolioValidation.message;
		} else {
			newFormError.modelPorfolioAmount = "";
		}

		let highRiskValidation = { isValid: 1 };
		if (formData.isHighRiskSelected) {
			highRiskValidation = validationHelper.required(formData.highRiskAmount);
			newFormError.highRiskAmount = highRiskValidation.message;
		} else {
			newFormError.highRiskAmount = "";
		}

		let mediumRiskValidation = { isValid: 1 };
		if (formData.isMediumRiskSelected) {
			mediumRiskValidation = validationHelper.required(formData.mediumRiskAmount);
			newFormError.mediumRiskAmount = mediumRiskValidation.message;
		} else {
			newFormError.mediumRiskAmount = "";
		}

		let lowRiskValidation = { isValid: 1 };
		if (formData.isLowRiskSelected) {
			lowRiskValidation = validationHelper.required(formData.lowRiskAmount);
			newFormError.lowRiskAmount = lowRiskValidation.message;
		} else {
			newFormError.lowRiskAmount = "";
		}

		let algoValidation = { isValid: 1 };
		if (formData.isAlgoSelected) {
			algoValidation = validationHelper.required(formData.algoAmount);
			newFormError.algoAmount = algoValidation.message;
		} else {
			newFormError.algoAmount = "";
		}

		setFormError(newFormError);

		return (
			capitalValidation.isValid &&
			customValidation.isValid &&
			modelPortfolioValidation.isValid &&
			highRiskValidation.isValid &&
			mediumRiskValidation.isValid &&
			lowRiskValidation.isValid &&
			algoValidation.isValid
		);
	};

	const payloadParser = () => {
		let payload = {};
		payload.capital = formData.capital;
		payload.isPercent = formData.isPercent;
		let products = [];

		if (formData.isCustomInvestmentSelected) {
			let product = {
				product_id: 1,
				amount: formData.customAmount,
				category: [],
			};
			products.push(product);
		}
		if (formData.isModelPortfolioSelected) {
			let product = {
				product_id: 2,
				amount: formData.modelPorfolioAmount,
			};
			let category = [];
			if (formData.isHighRiskSelected) {
				let categoryProd = {
					product_category_id: 1,
					amount: formData.highRiskAmount,
				};
				category.push(categoryProd);
			}
			if (formData.isMediumRiskSelected) {
				let categoryProd = {
					product_category_id: 2,
					amount: formData.mediumRiskAmount,
				};
				category.push(categoryProd);
			}
			if (formData.isLowRiskSelected) {
				let categoryProd = {
					product_category_id: 3,
					amount: formData.lowRiskAmount,
				};
				category.push(categoryProd);
			}
			product.category = category;
			products.push(product);
		}
		if (formData.isAlgoSelected) {
			let product = {
				product_id: 3,
				amount: formData.algoAmount,
				category: [],
			};
			products.push(product);
		}
		payload.products = products;
		return payload;
	};

	const capitalValidation = () => {
		if (!formData.isPercent) {
			let currentAmount = 0;
			if (formData.isCustomInvestmentSelected) {
				currentAmount += Number(formData.customAmount);
			}
			if (formData.isModelPortfolioSelected) {
				currentAmount += Number(formData.modelPorfolioAmount);
				let modelAmount = 0;
				if (formData.isHighRiskSelected) {
					modelAmount += Number(formData.highRiskAmount);
				}
				if (formData.isMediumRiskSelected) {
					modelAmount += Number(formData.mediumRiskAmount);
				}
				if (formData.isLowRiskSelected) {
					modelAmount += Number(formData.lowRiskAmount);
				}

				if (modelAmount > Number(formData.modelPorfolioAmount)) {
					setModalAmountError("Total Modal amount should be less than Model Porfolio Amount");
					return 0;
				}
			} else {
				setModalAmountError(null);
			}
			if (formData.isAlgoSelected) {
				currentAmount += Number(formData.algoAmount);
			}
			if (currentAmount > Number(formData.capital)) {
				setAmountError("Total amount should be less than capital amount");
				return 0;
			} else {
				setAmountError(null);
				return 1;
			}
		} else {
			let totalPercent = 0;
			if (formData.isCustomInvestmentSelected) {
				totalPercent += Number(formData.customAmount);
			}
			if (formData.isModelPortfolioSelected) {
				// debugger;
				totalPercent += Number(formData.modelPorfolioAmount);
				let modelPercent = 0;
				if (formData.isHighRiskSelected) {
					modelPercent += Number(formData.highRiskAmount);
				}
				if (formData.isMediumRiskSelected) {
					modelPercent += Number(formData.mediumRiskAmount);
				}
				if (formData.isLowRiskSelected) {
					modelPercent += Number(formData.lowRiskAmount);
				}
				if (modelPercent > 100) {
					setModalAmountError("Total Percentage should be less than 100");
					return 0;
				} else {
					setModalAmountError(null);
				}
			}
			if (formData.isAlgoSelected) {
				totalPercent += Number(formData.algoAmount);
			}
			console.log("Total percent : ",totalPercent)
			if (totalPercent > 100) {
				setAmountError("Total Percentage should be less than 100");
				return 0;
			} else {
				setAmountError(null);
				return 1;
			}
		}
	};

	const handleSubmit = async () => {
		if (!handleValidation()) {
			return;
		}
		if (!capitalValidation()) {
			return;
		}
		try {
			const parsedPayload = payloadParser();
			let payload = {
				investmentDetails: parsedPayload,
				userId: customerRiskDetails.userId,
			};
			const res = await submitInvestmentDetails(payload);
			if (res.data.status === 1) {
				handleStepChange(4);
			}
		} catch (err) {
			console.log(err);
		}
	};
	console.log("form Data : ", formData);
	return (
		<>
			<InvesmentDetails
				handleStepChange={handleStepChange}
				handleChange={handleChange}
				formData={formData}
				formError={formError}
				handleSubmit={handleSubmit}
				amountError={amountError}
				modalAmountError={modalAmountError}
			/>
		</>
	);
}

export default InvestmentDetailsContainer;
