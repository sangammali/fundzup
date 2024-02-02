import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "components/common/Box";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import Button from "components/common/Button";
import Card from "components/common/Card";
import Grid from "components/common/Grid";
import DownloadButton from "components/common/DownloadButton";
import dayjs from "dayjs";
import { styled } from "@mui/material";

const CustomerDetailsBox = styled(Box)(({}) => ({
	backgroundColor: "#E5EEFF",
	borderRadius: "8px",
	padding: "12px 16px",
	marginBottom: "20px",
}));

const CustomerDetailsText = styled(Text)(({}) => ({
	color: "#242424",
	fontSize: "16px",
	fontWeight: 500,
}));

const CustomernameText = styled(Text)(({}) => ({
	color: "#676C76",
	marginBottom: "8px",
	fontWeight: 500,
	fontSize: "16px",
}));

//   const CustomerNameKeyText = styled(Text)(({}) => ({
// 	color: "#242424",
// 	fontSize: "16px",
// 	fontWeight: 500,
//   }));

const ButtonBox = styled(Box)(({}) => ({
	display: "flex",
	justifyContent: "flex-end",
	gap: "16px",
}));

const EditDetialBtn = styled(Button)(({}) => ({
	padding: "13px 28px",
	fontSize: "14px",
	fontWeight: 600,
	borderRadius: "8px",
}));

const SubmitBtn = styled(Button)(({}) => ({
	padding: "13px 28px",
	fontSize: "14px",
	fontWeight: 600,
	borderRadius: "8px",
}));

function Summary({ handleStepChange, customerSummary = {} }) {
	const navigate = useNavigate();
	// console.log("customerSummary : ", customerSummary);
	const {
		customerDetails = {},
		riskAssessment = null,
		investmentDetails = {},
		otherDetails = {},
		documentDetails = [],
	} = customerSummary;
	console.log("otherDetails : ", otherDetails);
	return (
		<Box sx={{ padding: "40px" }}>
			<Card sx={{ p: 4, borderRadius: "16px", mb: "36px" }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Text sx={{ color: "#242424", fontSize: "20px", fontWeight: 600 }}>
							Summary
						</Text>
					</Grid>

					<Grid item xs={12}>
						<CustomerDetailsBox>
							<CustomerDetailsText>Customer details</CustomerDetailsText>
						</CustomerDetailsBox>
					</Grid>

					<Grid item xs={4}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Customer name</CustomernameText>
							<Text sx={{ color: "#242424" }}>{customerDetails?.name}</Text>
						</Box>
					</Grid>

					<Grid item xs={4}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Email ID</CustomernameText>
							<Text sx={{ color: "#242424" }}>{customerDetails?.email}</Text>
						</Box>
					</Grid>
					<Grid item xs={4}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Phone number</CustomernameText>
							<Text sx={{ color: "#242424" }}>{customerDetails?.mobile}</Text>
						</Box>
					</Grid>

					<Grid item xs={12} sx={{ mt: "28px" }}>
						<CustomerDetailsBox>
							<CustomerDetailsText>Risk assesment details</CustomerDetailsText>
						</CustomerDetailsBox>
					</Grid>

					<Grid item xs={12}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Risk profile </CustomernameText>
							<Text sx={{ color: "#242424" }}>{riskAssessment} Investor </Text>
						</Box>
					</Grid>

					<Grid item xs={12} sx={{ mt: "28px" }}>
						<CustomerDetailsBox>
							<CustomerDetailsText>Invesment Details</CustomerDetailsText>
						</CustomerDetailsBox>
					</Grid>

					<Grid item xs={4}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Capital</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								₹ {customerDetails?.capital}
							</Text>
						</Box>
					</Grid>
					<Grid item xs={4}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Custom</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{investmentDetails?.custom?.investmentAmount ||
									investmentDetails?.custom?.investmentPercent}
							</Text>
						</Box>
					</Grid>
					<Grid item xs={4}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Algo (F&O)</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{investmentDetails?.algoType?.investmentAmount ||
									investmentDetails?.algoType?.investmentPercent}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={12}>
						<Stack direction="row" alignItems="center">
							<Box sx={{ mr: "32px" }}>
								<CustomernameText>Model Portfolio</CustomernameText>
								<Text
									sx={{
										color: "#242424",
										fontSize: "16px",
										fontWeight: 500,
									}}
								>
									{investmentDetails?.modelType?.investmentAmount ||
										investmentDetails?.modelType?.investmentPercent}
								</Text>
							</Box>

							<Box
								sx={{
									display: "flex",
									backgroundColor: "#F7F8FF",
									borderRadius: "8px",
									padding: "12px 20px",
								}}
							>
								{investmentDetails?.modelType?.product?.map((item) => (
									<Box sx={{ mr: "32px" }}>
										<Text
											sx={{
												color: "#676C76",
												fontSize: "16px",
												fontWeight: 500,
												mb: "8px",
											}}
										>
											{item.categoryName}
										</Text>
										<Text
											sx={{
												color: "#242424",
												fontSize: "16px",
												fontWeight: 500,
											}}
										>
											{item?.investmentAmount || item?.investmentPercent}
										</Text>
									</Box>
								))}
							</Box>
						</Stack>
					</Grid>

					<Grid item xs={12} sx={{ mt: "28px" }}>
						<CustomerDetailsBox>
							<CustomerDetailsText>Others Details</CustomerDetailsText>
						</CustomerDetailsBox>
					</Grid>

					<Grid item xs={3}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Plan name</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{otherDetails?.plan_name}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={3}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Plan code</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{otherDetails?.plan_code}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={3}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Start date</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{otherDetails?.start_date
									? dayjs(otherDetails?.start_date).format("DD/MM/YYYY")
									: ""}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={3}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Expiry date</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{otherDetails?.end_date
									? dayjs(otherDetails?.end_date).format("DD/MM/YYYY")
									: ""}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={3}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Family group name</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{""}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={3}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Auto trade</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{otherDetails?.auto_trade}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={3}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Customer residency</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{otherDetails?.customer_residency}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={3}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Customer category</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{otherDetails.customer_category}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={3}>
						<Box sx={{ gap: "8px", width: "265px" }}>
							<CustomernameText>Joining date</CustomernameText>
							<Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
								{otherDetails?.joining_date
									? dayjs(otherDetails?.joining_date).format("DD/MM/YYYY")
									: ""}
							</Text>
						</Box>
					</Grid>

					<Grid item xs={9}></Grid>

					<Grid item xs={6}>
						<DownloadButton children="PAN card" />
					</Grid>
					<Grid item xs={6}>
						<DownloadButton children="Aadhar Card" />
					</Grid>

					<Grid item xs={6}>
						<DownloadButton children="Sign document" />
					</Grid>
					<Grid item xs={6}></Grid>
				</Grid>
			</Card>

			<ButtonBox>
				<EditDetialBtn
					onClick={() => {
						handleStepChange(2);
					}}
				>
					Edit Details
				</EditDetialBtn>
				<SubmitBtn
					onClick={() => {
						navigate("/customers");
					}}
				>
					Submit
				</SubmitBtn>
			</ButtonBox>
		</Box>
	);
}

export default Summary;
