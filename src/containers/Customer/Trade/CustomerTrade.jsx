import React, { useState } from "react";
import Tab from "components/common/Tab";
import CustomerModelTradeContainer from "./CustomerModelTradeContainer";
import CustomerAlgoTradeContainer from "./CustomerAlgoTradeContainer";
import CustomerCustomTradeContainer from "./CustomerCustomTradeContainer";

const MODEL_PORTFOLIO = "MODEL_PORTFOLIO";
const ALGO = "ALGO";
const CUSTOM = "CUSTOM";

const tradeTabs = [
	{ label: "Model portfolio", value: MODEL_PORTFOLIO },
	{ label: "Algo (F&O)", value: ALGO },
	{ label: "Custom", value: CUSTOM },
];

const CustomerTrade = () => {
	const [tradeType, setTradeType] = useState(tradeTabs[0].value);

	const handleTabChange = (e, newValue) => {
		setTradeType(newValue);
	};

	return (
		<>
			<Tab
				tabs={tradeTabs}
				onChange={handleTabChange}
				value={tradeType}
				sx={{ maxWidth: "calc(100% + 48px)", margin: "0 -24px" }}
				tabSx={{ p: "18px 48px" }}
			/>
			{tradeType === MODEL_PORTFOLIO && (
				<>
					<CustomerModelTradeContainer/>
				</>
			)}
			{tradeType === ALGO && (
				<>
					<CustomerAlgoTradeContainer/>
				</>
			)}
			{tradeType === CUSTOM && (
				<>
					<CustomerCustomTradeContainer/>
				</>
			)}
		</>
	);
};

export default CustomerTrade;
