import React, { useState } from "react";
import { useSelector } from "react-redux";
import RiskTracker from "components/addCustomer/RiskTracker";
import ChangeRisk from "components/addCustomer/ChangeRisk";
import { addCustomerApiAction } from "stores/redux/apiSlices/addCustomerApiSlice";
import { commonApiAction } from "stores/redux/apiSlices/commonApiSlice";
function RiskAssesmentContainer({ handleStepChange }) {
	const [isChangeRisk, setIsChangeRisk] = useState(false);
	const [selectedRisk, setSelectedRisk] = useState(null);
	const [currentRisk, setCurrentRisk] = useState({});

	//Redux state
	const customerRiskDetails = useSelector((state) => state?.addCustomerSlice?.customerDetails);

	//Rtk Apis
	const [updateRiskProfileAction, { data }] = addCustomerApiAction.updateRiskProfile();
	const { data: allRiskProfiles } = commonApiAction.getRiskProfiles();
	const { riskProfile } = customerRiskDetails;

	//Use Effects
	React.useEffect(() => {
		const currentRiskProfile =
			allRiskProfiles?.find((item) => {
				if (item.name === customerRiskDetails.riskProfile.type) {
					return true;
				}
				return false;
			}) ?? {};
		setCurrentRisk(currentRiskProfile);
		setSelectedRisk(currentRiskProfile?.risk_profile_id);
	}, [customerRiskDetails, allRiskProfiles]);

	const changeRiskClick = () => {
		setIsChangeRisk(!isChangeRisk);
	};

	const handleRiskProfileChange = (id) => {
		setSelectedRisk(id);
	};

	const handleRiskProfileSubmit = async () => {
		try {
			const payload = {
				risk_profile_id: selectedRisk,
				userId: customerRiskDetails.userId,
			};
			const res = await updateRiskProfileAction(payload);
			if (res?.data?.status === 1) {
				handleStepChange(3);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{!isChangeRisk ? (
				<RiskTracker
					changeRiskClick={changeRiskClick}
					currentRiskProfile={currentRisk}
					handleRiskProfileSubmit={handleRiskProfileSubmit}
					riskProfile={riskProfile}
				/>
			) : (
				<ChangeRisk
					handleRiskProfileChange={handleRiskProfileChange}
					handleRiskProfileSubmit={handleRiskProfileSubmit}
					selectedRisk={selectedRisk}
				/>
			)}
		</>
	);
}

export default RiskAssesmentContainer;
