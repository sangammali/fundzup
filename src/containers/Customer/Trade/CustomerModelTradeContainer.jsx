import { useState } from "react";
import CustomDataGrid from "components/datagrid/CustomGrid";
import Stack from "components/common/Stack";
import Box from "components/common/Box";
import Text from "components/common/Text";
import Chip from "@mui/material/Chip";
import Button from "components/common/Button";
import ImportIcon from "asset/icons/ImportIcon";
import CloudDownload from "asset/icons/CloudDownload";
import FilterIcon from "asset/icons/FilterIcon";
import AddIcon from "@mui/icons-material/Add";
import TextField from "components/common/TextField";
import SideDrawer from "components/common/SideDrawer";
import DatePicker from "components/common/DatePicker";
import {  customerModelColumns,CustomerModelTableRows } from "helpers/constants";
import Stepper from "components/common/Stepper";
import Tab from "components/common/Tab";


const tradeSteps = [
	{
		id: 1,
		label: "Basic details",
	},
	{
		id: 1,
		label: "Trade details",
	},
];

const MODEL_PORTFOLIO = "MODEL_PORTFOLIO";
const ALGO = "ALGO";
const CUSTOM = "CUSTOM";
const GAINLOSS = "GAINLOSS"

const tradeTabs = [
	{ label: "Summary", value: MODEL_PORTFOLIO },
	{ label: "Details", value: ALGO },
	{ label: "Allocation", value: CUSTOM },
  { label: "Gain/Loss", value:GAINLOSS}
];

const ModelFilterDrawer = () => {
	return (
		<>
			<Stack spacing={2}>
				<Stack direction="row" alignItems="flex-end" spacing={2}>
					<Box sx={{ flex: 1 }}>
						<Text>Profit range (%)</Text>
						<TextField placeholder="Eg. 5%" />
					</Box>
					<TextField sx={{ flex: 1 }} placeholder="Eg. 10%" />
				</Stack>
				<Stack direction="row" alignItems="flex-end" spacing={2}>
					<Box sx={{ flex: 1 }}>
						<Text>Date range</Text>
						<DatePicker placeholder="Select Date" />
					</Box>
					<DatePicker sx={{ flex: 1 }} placeholder="Select Date" />
				</Stack>
			</Stack>
		</>
	);
};

const ModelTradeDrawer = () => {
	return (
		<>
			<Stack spacing={2}>
				<Stepper currentStepsId={0} stepperData={tradeSteps} />
			</Stack>
		</>
	);
};

const ModelTableHeader = ({ handleFilterDrawer, handleTradeDrawer }) => {

  const [tradeType, setTradeType] = useState(tradeTabs[0].value);

	const handleTabChange = (e, newValue) => {
		setTradeType(newValue);
	};
	return (
		<>
			<Box sx={{ p: 2 }}>
        <Box sx={{ p:1 }}>
				<Stack direction="row" justifyContent="space-between" sx={{mb:"24px"}}>
					<Box>
						<Text variant="body1" sx={{ fontWeight: 500, color: "#101828" }}>
							Model portfolio 
						</Text>
						<Text variant="small" color="#667085" sx={{ mt: 0.5 }}>
							Here you can view and add customers manually or by importing.
						</Text>
					</Box>
						<Button
							sx={{
								fontWeight: 500,
								borderRadius: "8px",
								borderColor: "#D0D5DD",
								p: 1,
							}}
							startIcon={<FilterIcon />}
							variant="outlined"
							onClick={handleFilterDrawer}
						>
							Add Filters
						</Button>
				</Stack>

        <Stack direction="row">
          <Box sx={{backgroundColor:"#142E56",borderRadius:"8px",padding:"0px",width:"200px",height:"40px",display:"flex",justifyContent:"center",alignItems:"center",mr:"16px"}}>
            <Text sx={{color:"#FFFFFF",fontSize:"16px",fontWeight:500,display:"flex",justifyContent:"center",alignItems:"center"}}>All</Text>
          </Box>
          <Box sx={{backgroundColor:"#FFFFFF",borderRadius:"8px",padding:"0px",width:"200px",height:"40px",display:"flex",justifyContent:"center",alignItems:"center",mr:"16px",border:"1px solid #E0E0E0"}}>
            <Text sx={{color:"#676C76",fontSize:"16px",fontWeight:400,display:"flex",justifyContent:"center",alignItems:"center"}}>Jeetu Gupta</Text>
          </Box>
          <Box sx={{backgroundColor:"#FFFFFF",borderRadius:"8px",padding:"0px",width:"200px",height:"40px",display:"flex",justifyContent:"center",alignItems:"center",mr:"16px",border:"1px solid #E0E0E0"}}>
            <Text sx={{color:"#676C76",fontSize:"16px",fontWeight:400,display:"flex",justifyContent:"center",alignItems:"center"}}>Ansh Gupta</Text>
          </Box>
          <Box sx={{backgroundColor:"#FFFFFF",borderRadius:"8px",padding:"0px",width:"200px",height:"40px",display:"flex",justifyContent:"center",alignItems:"center",mr:"16px",border:"1px solid #E0E0E0"}}>
            <Text sx={{color:"#676C76",fontSize:"16px",fontWeight:400,display:"flex",justifyContent:"center",alignItems:"center"}}>Dhurv Gupta</Text>
          </Box>

        </Stack>
        </Box>
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
					{/* <CustomerModelTradeContainer/> */}
				</>
			)}
			{tradeType === ALGO && (
				<>
					{/* <CustomerAlgoTradeContainer/> */}
				</>
			)}
			{tradeType === CUSTOM && (
				<>
					{/* <CustomerCustomTradeContainer/> */}
				</>
			)}
		</>
			</Box>
		</>
	);
};

const CustomerModelTradeContainer = () => {
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
	const [isTradeDrawerOpen, setIsTradeDrawerOpen] = useState(false);

	const handleFilterDrawer = () => {
		setIsFilterDrawerOpen(!isFilterDrawerOpen);
	};

	const handleTradeDrawer = () => {
		setIsTradeDrawerOpen(!isTradeDrawerOpen);
	};

	return (
		<>
			{/* FIlter Drawer */}
			<SideDrawer
				open={isFilterDrawerOpen}
				closeDrawer={handleFilterDrawer}
				title="Add Filters"
				subtitle="See the data in an organized manner by applying filters"
				handleSubmit={handleFilterDrawer}
				cancelButtonText="Close"
				submitButtonText="submit"
				drawerWidth={500}
			>
				<ModelFilterDrawer />
			</SideDrawer>

			{/* Trade Drawer */}
			<SideDrawer
				open={isTradeDrawerOpen}
				closeDrawer={handleTradeDrawer}
				title="Add Filters"
				subtitle="See the data in an organized manner by applying filters"
				handleSubmit={handleTradeDrawer}
				cancelButtonText="Close"
				submitButtonText="submit"
				drawerWidth={500}
			>
				<ModelTradeDrawer />
			</SideDrawer>

			{/* Import Trade  */}

			{/* Model Data Grid */}
			<Box mt={2.5} mb={4}>
				<CustomDataGrid
					autoHeight
					list={CustomerModelTableRows}
					columnHeaderHeight={46}
					rowHeight={46}
					columns={customerModelColumns}
					count={CustomerModelTableRows.length}
					pagination={false}
					isLoading={false}
					isCalled={true}
					header={() => ModelTableHeader({ handleFilterDrawer, handleTradeDrawer })}
				/>
			</Box>
		</>
	);
};

export default CustomerModelTradeContainer;
