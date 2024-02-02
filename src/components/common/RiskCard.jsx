import React from "react";
import Paper from "components/common/Paper";
import Text from "components/common/Text";
import Stack from "components/common/Stack";

const ChangeRiskCard = ({ data, onClick, selectedRisk }) => {
	return (
		<Paper
			onClick={() => {
				console.log("Card clicked with ID:", data.id);
				onClick(data.id);
			}}
			elevation={1}
			sx={{
				alignItems: "center",
				p: "64px 28px",
				width: "auto",
				backgroundColor: selectedRisk === data.id ? "#E5EEFF" : "#fff",
				height: "auto",
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				borderRadius: "16px",
				border:
					selectedRisk === data.id
						? "1px solid #142E56"
						: "1px solid #fff",
			}}
		>
			<Stack direction="row" justifyContent="center">
				<img src={data.chart} alt="chart" />
			</Stack>
			<Text
				sx={{
					fontSize: "20px",
					fontWeight: 500,
					textAlign: "center",
					color: `${data.nameColor}`,
					marginTop: "10px",
				}}
			>
				{data.name}
			</Text>

			<Text
				sx={{
					fontSize: "14px",
					fontWeight: 400,
					textAlign: "center",
					color: "#676C76",
					marginTop: "10px",
				}}
			>
				{data.des}
			</Text>
		</Paper>
	);
};

export default ChangeRiskCard;
