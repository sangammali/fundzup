const addCustomerParser = {};

addCustomerParser.riskAssesmentQts = (response) => {
	if (!response.result && !response.result.riskdata) {
		return [];
	}
	let result = response.result.riskdata;
	const qts = result.map((item) => {
		return {
			questionId: item?.question_id ?? null,
			questionDescription: item?.question_description ?? null,
		};
	});

	const optionsParser = (options) => {
		return options.map((option) => ({
			optionId: option.option_id,
			optionDescription: option.option_description,
			weightage: option.weightage,
		}));
	};

	const qtsOptions = result.map((item) => {
		return {
			questionId: item.question_id,
			questionDescription: item.question_description,
			isMultiselect: item.is_multiselect,
			options: optionsParser(item.options),
		};
	});

	const res = {
		qts,
		options: qtsOptions,
	};
	return res;
};

addCustomerParser.customerSummary = (response) => {
	if (!response.result && !response.result) {
		return [];
	}

	response = response.result;

	let result = {};

	result.customerDetails = {
		name: response?.customerDetails[0]?.name ?? null,
		email: response?.customerDetails[0]?.email ?? null,
		mobile: response?.customerDetails[0]?.mobile ?? null,
		capital: response?.customerDetails[0]?.capital ?? null,
	};

	result.riskAssessment = response?.riskAssessment;
	result.investmentDetails = {};

	let customType = response?.investmentDetails?.find((item) => item.product_id === 1);
	let modelType = response?.investmentDetails?.find((item) => item.product_id === 2);
	let algoType = response?.investmentDetails?.find((item) => item.product_id === 3);

	result.investmentDetails.custom = {
		productId: customType?.product_id ?? null,
		productName: customType?.product_name ?? null,
		investmentAmount: customType?.investment_amount ?? null,
		investmentPercent: customType?.investment_percent ?? null,
	};
	result.investmentDetails.modelType = {
		productId: modelType?.product_id ?? null,
		productName: modelType?.product_name ?? null,
		investmentAmount: modelType?.investment_amount ?? null,
		investmentPercent: modelType?.investment_percent ?? null,
	};

	let modelProduct =
		modelType?.product_category?.map((item) => {
			return {
				categoryName: item.category_name,
				investmentAmount: item.investment_amount,
				investmentPercent: item.investment_percent,
			};
		}) ?? [];

	result.investmentDetails.modelType.product = modelProduct;

	result.investmentDetails.algoType = {
		productId: algoType?.product_id ?? null,
		productName: algoType?.product_name ?? null,
		investmentAmount: algoType?.investment_amount ?? null,
		investmentPercent: algoType?.investment_percent ?? null,
	};

	result.otherDetails = {
		plan_name: response?.otherDetails[0]?.plan_name ?? null,
		plan_code: response?.otherDetails[0]?.plan_code ?? null,
		start_date: response?.otherDetails[0]?.start_date ?? null,
		end_date: response?.otherDetails[0]?.end_date ?? null,
		auto_trade: response?.otherDetails[0]?.auto_trade ?? null,
		customer_residency: response?.otherDetails[0]?.customer_residency ?? null,
		customer_category: response?.otherDetails[0]?.customer_category ?? null,
		joining_date: response?.otherDetails[0]?.joining_date ?? null,
	};

	result.documentDetails = response?.documentDetails ?? [];
	return result;
};

export { addCustomerParser };
