import React from "react";
import { ButtonGroup, styled } from "@mui/material";
import Box from "components/common/Box";
import Text from "components/common/Text";
import TextField from "components/common/TextField";
import Button from "components/common/Button";
import Card from "components/common/Card";
import Grid from "components/common/Grid";
import Stack from "components/common/Stack";
import CheckboxCard from "components/common/CheckboxCard";
import Divider from "components/common/Divider";

const CapitalButton = styled(Button)(({ theme }) => ({
	padding: "8px 16px",
	borderRadius: "8px",
	border: "1px solid #142E56",
}));

const PreviousButton = styled(Button)(({}) => ({
	borderRadius: "8px",
	textTransform: "capitalize",
	padding: "18px 28px",
	marginRight: "20px",
	fontWeight: 600,
	width: "160px",
	border: "1.3px solid #142E56",
}));

const ModalPortfolioCard = styled(Box)(({ theme, isBoxVisible }) => ({
	marginBottom: "28px",
	...(isBoxVisible ? { borderRadius: "8px", backgroundColor: "#E5EEFF", padding: "20px" } : {}),
}));

function InvesmentDetails({
	handleStepChange,
	handleChange,
	handleSubmit,
	formData,
	formError,
	amountError,
	modalAmountError,
}) {
	return (
		<>
			<Box sx={{ px: 4 }}>
				<Card sx={{ p: 5, borderRadius: "16px", mb: "36px" }}>
					<Stack direction="row" width="100%" justifyContent="space-between">
						<Text
							sx={{
								color: "#242424",
								fontSize: "1.5rem",
								fontWeight: 600,
							}}
						>
							Investment Details
						</Text>
						<ButtonGroup>
							<CapitalButton
								variant={!formData.isPercent ? "contained" : "outlined"}
								onClick={() => {
									handleChange({ name: "isPercent", value: false });
								}}
							>
								<Text>Rupees</Text>
							</CapitalButton>
							<CapitalButton
								variant={formData.isPercent ? "contained" : "outlined"}
								onClick={() => {
									handleChange({ name: "isPercent", value: true });
								}}
							>
								<Text>Percentage</Text>
							</CapitalButton>
						</ButtonGroup>
					</Stack>

					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Box sx={{ mb: "28px" }}>
								<Text
									variant="small"
									sx={{
										color: "#242424",
										mb: "10px",
										fontWeight: 500,
									}}
								>
									Capital
								</Text>
								<TextField
									sx={{ width: "100%" }}
									placeholder="Enter capital amount in ₹"
									value={formData.capital}
									name="capital"
									onChange={(e) => {
										handleChange({
											name: e.target.name,
											value: e.target.value,
										});
									}}
								/>
								{formError.capital && (
									<Text variant="small" color="red" py={1}>
										{formError.capital}
									</Text>
								)}
							</Box>
						</Grid>
						<Grid item xs={6}></Grid>
						<Grid item xs={6}>
							<Box sx={{ mb: "28px" }}>
								<Text
									variant="small"
									sx={{
										color: "#242424",
										fontWeight: "500px",
									}}
									mb={1}
								>
									Type of invesment
								</Text>
								<CheckboxCard
									sx={{ width: "100%" }}
									title="Custom"
									value={formData.isCustomInvestmentSelected}
									handleClick={() => {
										handleChange({
											name: "isCustomInvestmentSelected",
											value: !formData.isCustomInvestmentSelected,
										});
									}}
								/>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Stack justifyContent="center" sx={{ height: "100%" }}>
								<TextField
									sx={{ width: "100%", mb: "6px" }}
									placeholder="Enter amount to invest in Custom"
									value={formData.customAmount}
									name="customAmount"
									onChange={(e) => {
										handleChange({
											name: e.target.name,
											value: e.target.value,
										});
									}}
									disabled={!formData.isCustomInvestmentSelected}
								/>
								{formError.customAmount && (
									<Text variant="small" color="red" py={1}>
										{formError.customAmount}
									</Text>
								)}
							</Stack>
						</Grid>
					</Grid>

					<ModalPortfolioCard isBoxVisible={formData.isModelPortfolioSelected}>
						<Grid container spacing={2}>
							<Grid item md={6}>
								<CheckboxCard
									sx={{ width: "100%" }}
									title="Model Portfolio"
									value={formData.isModelPortfolioSelected}
									handleClick={() => {
										handleChange({
											name: "isModelPortfolioSelected",
											value: !formData.isModelPortfolioSelected,
										});
									}}
								/>
							</Grid>

							<Grid item md={6}>
								<TextField
									sx={{ width: "100%" }}
									placeholder="Enter amount to invest in Model Portfolio"
									value={formData.modelPorfolioAmount}
									name="modelPorfolioAmount"
									onChange={(e) => {
										handleChange({
											name: e.target.name,
											value: e.target.value,
										});
									}}
									disabled={!formData.isModelPortfolioSelected}
								/>
								{formError.modelPorfolioAmount && (
									<Text variant="small" color="red" py={1}>
										{formError.modelPorfolioAmount}
									</Text>
								)}
							</Grid>
							{formData.isModelPortfolioSelected ? (
								<>
									<Grid item xs={12}>
										<Divider />
									</Grid>

									<Grid item md={6}>
										<CheckboxCard
											sx={{ width: "100%" }}
											title="High Risk Product Stock"
											value={formData.isHighRiskSelected}
											handleClick={() => {
												handleChange({
													name: "isHighRiskSelected",
													value: !formData.isHighRiskSelected,
												});
											}}
										/>
									</Grid>

									<Grid item md={6}>
										<TextField
											sx={{ width: "100%" }}
											placeholder="Enter amount to invest"
											value={formData.highRiskAmount}
											name="highRiskAmount"
											onChange={(e) => {
												handleChange({
													name: e.target.name,
													value: e.target.value,
												});
											}}
											disabled={!formData.isHighRiskSelected}
										/>
										{formError.highRiskAmount && (
											<Text variant="small" color="red" py={1}>
												{formError.highRiskAmount}
											</Text>
										)}
									</Grid>

									<Grid item md={6}>
										<CheckboxCard
											sx={{ width: "100%" }}
											title="Medium Risk Product Stock"
											value={formData.isMediumRiskSelected}
											handleClick={() => {
												handleChange({
													name: "isMediumRiskSelected",
													value: !formData.isMediumRiskSelected,
												});
											}}
										/>
									</Grid>

									<Grid item md={6}>
										<TextField
											sx={{ width: "100%" }}
											placeholder="Enter amount to invest"
											value={formData.mediumRiskAmount}
											name="mediumRiskAmount"
											onChange={(e) => {
												handleChange({
													name: e.target.name,
													value: e.target.value,
												});
											}}
											disabled={!formData.isMediumRiskSelected}
										/>
										{formError.mediumRiskAmount && (
											<Text variant="small" color="red" py={1}>
												{formError.mediumRiskAmount}
											</Text>
										)}
									</Grid>

									<Grid item md={6}>
										<CheckboxCard
											sx={{ width: "100%" }}
											title="Low Risk Product Stock"
											value={formData.isLowRiskSelected}
											handleClick={() => {
												handleChange({
													name: "isLowRiskSelected",
													value: !formData.isLowRiskSelected,
												});
											}}
										/>
									</Grid>

									<Grid item md={6}>
										<TextField
											sx={{ width: "100%" }}
											placeholder="Enter amount to invest"
											value={formData.lowRiskAmount}
											name="lowRiskAmount"
											onChange={(e) => {
												handleChange({
													name: e.target.name,
													value: e.target.value,
												});
											}}
											disabled={!formData.isLowRiskSelected}
										/>
										{formError.lowRiskAmount && (
											<Text variant="small" color="red" py={1}>
												{formError.lowRiskAmount}
											</Text>
										)}
									</Grid>
								</>
							) : (
								<></>
							)}
						</Grid>
						{modalAmountError && (
							<Stack alignItems="flex-end" py={1}>
								<Text variant="small" color="red">
									{modalAmountError}
								</Text>
							</Stack>
						)}
					</ModalPortfolioCard>

					<Grid container spacing={2}>
						<Grid item md={6}>
							<CheckboxCard
								sx={{ width: "100%" }}
								title="Algo (F&O)"
								value={formData.isAlgoSelected}
								handleClick={() => {
									handleChange({
										name: "isAlgoSelected",
										value: !formData.isAlgoSelected,
									});
								}}
							/>
						</Grid>

						<Grid item md={6}>
							<TextField
								sx={{ width: "100%" }}
								placeholder="Enter amount to invest in Algo"
								value={formData.algoAmount}
								name="algoAmount"
								onChange={(e) => {
									handleChange({
										name: e.target.name,
										value: e.target.value,
									});
								}}
								disabled={!formData.isAlgoSelected}
							/>
							{formError.algoAmount && (
								<Text variant="small" color="red" py={1}>
									{formError.algoAmount}
								</Text>
							)}
						</Grid>
					</Grid>
					{amountError && (
						<Stack alignItems="flex-end" py={1}>
							<Text variant="small" color="red">
								{amountError}
							</Text>
						</Stack>
					)}
				</Card>

				{/* This box is for Button*/}
				<Stack direction="row" justifyContent="flex-end" mb={8}>
					<PreviousButton
						variant="outlined"
						onClick={() => {
							handleStepChange(2);
						}}
					>
						Previous
					</PreviousButton>

					<Button
						sx={{
							borderRadius: "8px",
							padding: "18px 28px",
						}}
						onClick={handleSubmit}
					>
						Proceed to next step{" "}
					</Button>
				</Stack>
			</Box>
		</>
	);
}

export default InvesmentDetails;
