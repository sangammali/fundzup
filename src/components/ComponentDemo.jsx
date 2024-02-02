import React from "react";
import NewTextField from "./common/TextField";
import Box from "./common/Box";
import Text from "./common/Text";
import MenuItem from "./common/MenuItem";
import Radio from "./common/Radio";
import Button from "./common/Button";
import Tab from "./common/Tab";
import DownloadButton from "./common/DownloadButton";
import NewDialog from "./common/Dialog";
import Avatar from "./common/Avatar";
import { styled } from "@mui/system";
import Stack from "./common/Stack";
import FileUpload from "components/common/FileUpload";
import SideDrawer from "./common/SideDrawer";

const currencies = [
	{
		value: "USD",
		label: "$",
	},
	{
		value: "EUR",
		label: "€",
	},
	{
		value: "BTC",
		label: "฿",
	},
	{
		value: "JPY",
		label: "¥",
	},
];

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	width: "109px",
	height: "109px",
	[theme.breakpoints.down("md")]: {
		width: "109px",
		height: "109px",
	},
}));

const Demo = () => {
	const [modalOpen, setModalOpen] = React.useState(false);
	return (
		<Stack sx={{ width: "100%", flex: 1 }}>
			{/* <RiskProfileGraph
				// riskProfileId={3}
				// chartWidth={600}
				// disableLabel
				// needleLenght={43}
			/> */}

			<Box sx={{ width: "400px", m: 2 }}>
				<Text>TextField</Text>
				<NewTextField placeholder="Label" />
			</Box>

			<Box sx={{ width: "100px", m: 2 }}>
				<Text>select</Text>
				<NewTextField
					placeholder="Label"
					select
					multiple
					onChange={(e) => {
						console.log(e);
					}}
				>
					{currencies.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</NewTextField>
			</Box>

			<Box sx={{ width: "400px", m: 2 }}>
				<Text>Radio</Text>
				<Radio />
			</Box>

			<Box sx={{ width: "400px", m: 2 }}>
				<Text>Button</Text>
				<Button>Press Me</Button>
			</Box>

			<Box Box sx={{ m: 2 }}>
				<Tab
					tabs={[
						{ portfolioId: "1", label: "Tab 1" },
						{ portfolioId: "2", label: "Tab 2" },
					]}
					onChange={(event, newValue) => {
						console.log("Tab changed:", newValue);
					}}
					value="1"
				></Tab>
			</Box>

			<Box sx={{ m: 2 }}>
				<Text>Download Button</Text>
				<DownloadButton variant="outlined">Download</DownloadButton>
			</Box>

			<Box sx={{ m: 2 }}>
				<Text>New Modal</Text>
				<Button
					onClick={() => {
						setModalOpen(true);
					}}
				>
					Click me
				</Button>
				<NewDialog
					onClose={() => setModalOpen(false)}
					open={modalOpen}
					title=""
					disableCloseIcon
					maxWidth="sm"
					sx={{ borderRadius: "10px" }}
					contentComponent={() => (
						<Box sx={{ maxWidth: "480px", margin: "0 auto" }}>
							<Text
								variant="subtitle2"
								sx={{
									color: "#1E1E1E",
									lineHeight: 1.3,
									textAlign: "center",
								}}
							>
								You are currently marked as an offline user.
								Your trades are carried out by your financial
								advisor. Incase you wish to do the trades, you
								can convert to online by clicking Continue
							</Text>
						</Box>
					)}
					actionComponent={() => (
						<Box mb={2} textAlign="center">
							<Button
								onClick={() => {
									setModalOpen(false);
								}}
								disableEndIcon={false}
								variant="outlined"
								m={0.5}
							>
								Yes, Continue
							</Button>
						</Box>
					)}
				/>
			</Box>
			<Box sx={{ m: 2 }}>
				<StyledAvatar
					variant="h3"
					src="./images/avatar.jpg"
					title={"Faisal"}
				/>
			</Box>
			<FileUpload label="" />
			<SideDrawer
				open={false}
				closeDrawer={() => {}}
				title="Profile"
				contentTitle=""
				handleSubmit={() => {}}
				cancelButtonText="Close"
				submitButtonText="submit"
				drawerWidth={400}
			>
				<Box Box sx={{}}>
					<Tab
						tabs={[
							{ portfolioId: "1", label: "Tab 1" },
							{ portfolioId: "2", label: "Tab 2" },
						]}
						onChange={(event, newValue) => {
							console.log("Tab changed:", newValue);
						}}
						value="1"
					></Tab>
				</Box>

				<Box sx={{ m: 2 }}>
					<Text>Download Button</Text>
					<DownloadButton variant="outlined">Download</DownloadButton>
				</Box>
				<Box Box sx={{}}>
					<Tab
						tabs={[
							{ portfolioId: "1", label: "Tab 1" },
							{ portfolioId: "2", label: "Tab 2" },
						]}
						onChange={(event, newValue) => {
							console.log("Tab changed:", newValue);
						}}
						value="1"
					></Tab>
				</Box>

				<Box sx={{ m: 2 }}>
					<Text>Download Button</Text>
					<DownloadButton variant="outlined">Download</DownloadButton>
				</Box>
				<Box Box sx={{}}>
					<Tab
						tabs={[
							{ portfolioId: "1", label: "Tab 1" },
							{ portfolioId: "2", label: "Tab 2" },
						]}
						onChange={(event, newValue) => {
							console.log("Tab changed:", newValue);
						}}
						value="1"
					></Tab>
				</Box>

				<Box sx={{ m: 2 }}>
					<Text>Download Button</Text>
					<DownloadButton variant="outlined">Download</DownloadButton>
				</Box>
				<Box Box sx={{}}>
					<Tab
						tabs={[
							{ portfolioId: "1", label: "Tab 1" },
							{ portfolioId: "2", label: "Tab 2" },
						]}
						onChange={(event, newValue) => {
							console.log("Tab changed:", newValue);
						}}
						value="1"
					></Tab>
				</Box>

				<Box sx={{ m: 2 }}>
					<Text>Download Button</Text>
					<DownloadButton variant="outlined">Download</DownloadButton>
				</Box>
				<Box Box sx={{}}>
					<Tab
						tabs={[
							{ portfolioId: "1", label: "Tab 1" },
							{ portfolioId: "2", label: "Tab 2" },
						]}
						onChange={(event, newValue) => {
							console.log("Tab changed:", newValue);
						}}
						value="1"
					></Tab>
				</Box>

				<Box sx={{ m: 2 }}>
					<Text>Download Button</Text>
					<DownloadButton variant="outlined">Download</DownloadButton>
				</Box>
				<Box Box sx={{}}>
					<Tab
						tabs={[
							{ portfolioId: "1", label: "Tab 1" },
							{ portfolioId: "2", label: "Tab 2" },
						]}
						onChange={(event, newValue) => {
							console.log("Tab changed:", newValue);
						}}
						value="1"
					></Tab>
				</Box>

				<Box sx={{ m: 2 }}>
					<Text>Download Button</Text>
					<DownloadButton variant="outlined">Download</DownloadButton>
				</Box>
				<Box Box sx={{}}>
					<Tab
						tabs={[
							{ portfolioId: "1", label: "Tab 1" },
							{ portfolioId: "2", label: "Tab 2" },
						]}
						onChange={(event, newValue) => {
							console.log("Tab changed:", newValue);
						}}
						value="1"
					></Tab>
				</Box>

				<Box sx={{ m: 2 }}>
					<Text>Download Button</Text>
					<DownloadButton variant="outlined">Download</DownloadButton>
				</Box>
				<Box Box sx={{}}>
					<Tab
						tabs={[
							{ portfolioId: "1", label: "Tab 1" },
							{ portfolioId: "2", label: "Tab 2" },
						]}
						onChange={(event, newValue) => {
							console.log("Tab changed:", newValue);
						}}
						value="1"
					></Tab>
				</Box>

				<Box sx={{ m: 2 }}>
					<Text>Download Button</Text>
					<DownloadButton variant="outlined">Download</DownloadButton>
				</Box>
			</SideDrawer>

			<Button>
				<Radio></Radio>
			</Button>
		</Stack>
	);
};

export default Demo;
