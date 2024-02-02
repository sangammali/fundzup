import React from "react";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import Button from "components/common/Button";
import Card from "components/common/Card";
import Grid from "components/common/Grid";
import RiskProfileGraph from "components/common/RiskProfileGraph";
import { styled } from "@mui/material";

const RiskProfileText = styled(Text)(() => ({
	color: "#CF1414",
	fontSize: "28px",
	fontWeight: 500,
	marginBottom: "21px",
}));

const RiskProfileDesc = styled(Text)(() => ({
	color: "#676C76",
	fontSize: "16px",
	fontWeight: 400,
	lineHeight: "25px",
}));

function RiskTracker(props) {
	const { changeRiskClick, currentRiskProfile, riskProfile, handleRiskProfileSubmit } = props;
	return (
		<>
			<Card sx={{ p: 4, borderRadius: "16px", mb: "36px" }}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Stack justifyContent="center" alignItems="center">
							<RiskProfileGraph
								riskProfileId={(currentRiskProfile.risk_profile_id ^ 2) * 2}
								chartWidth={420}
								needleWidth={10}
							/>
						</Stack>
					</Grid>

					<Grid item xs={6}>
						<Stack justifyContent="center" sx={{ height: "100%" }}>
							<Text
								varinat="button"
								color="#242424"
								sx={{ fontSize: "18px", fontWeight: 500 }}
							>
								YOUR SCORE IS {riskProfile.riskProfileScore}
							</Text>
							<RiskProfileText>
								You are a {currentRiskProfile.name} Investor
							</RiskProfileText>
							<RiskProfileDesc>
								You are a High risk-taker, so your portfolio will be volatile and
								expected to deliver returns with some degree of risk and volatility
								without compromising on stability.
							</RiskProfileDesc>
						</Stack>
					</Grid>
				</Grid>
			</Card>

			<Stack direction="row" justifyContent="flex-end" spacing={2}>
				<Button
					sx={{
						padding: "13px 28px",
						borderRadius: "8px",
					}}
					onClick={changeRiskClick}
				>
					Change Risk Profile
				</Button>
				<Button
					sx={{
						padding: "13px 28px",
						borderRadius: "8px",
					}}
					onClick={() => {
						handleRiskProfileSubmit();
					}}
				>
					Proceed to next step
				</Button>
			</Stack>
		</>
	);
}

export default RiskTracker;
