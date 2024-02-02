import React from 'react'

const cardData = [
	{
		id: 1,
		name: "Trade Calls",
		value: 30,
		chart: "/images/ProfitChart.svg",
		display: "column",
		xs: 4,
	},
	{
		id: 2,
		name: "Total profit of customers",
		value: "₹ 1,50,000",
		percentage: "20%",
		chart: "/images/ProfitChart.svg",
		display: "flex",
		xs: 4,
	},
	{
		id: 3,
		name: "Tax P/L",
		value: "₹ 50,000",
		percentage: "20%",
		chart: "/images/LossChart.svg",
		xs: 4,
	},
];

const investmentCardData = [
	{
		id: 1,
		name: "Algo ",
		value1: "Customers",
		value2: "Amount invested",
		value3: "₹ 50,00,000",
		value4: "₹ 50,00,000 ",
		percentage: "20%",
		display: "column",
		xs: 4,
	},
	{
		id: 2,
		name: "Custom",
		value1: "Customers",
		value2: "Amount invested",
		value3: "₹ 50,00,000",
		value4: "₹ 50,00,000 ",
		percentage: "20%",
		display: "flex",
		xs: 4,
	},
	{
		id: 3,
		name: "Model Portfolio",
		value1: "Customers",
		value2: "Amount invested",
		value3: "₹ 50,00,000",
		value4: "₹ 50,00,000 ",
		percentage: "20%",
		xs: 4,
	},
];

const graphCardData = [
	{
		id: 1,
		name: "Trade call stats",
		chart: "/images/Graph1.svg",
		display: "column",
		xs: 6,
	},
	{
		id: 2,
		name: "Investment Stats",
		chart: "/images/Graph2.svg",
		display: "flex",
		xs: 6,
	},
];
const PerformanceContainer = () => {
  return (
   <Stack>
	
	<Grid sx={{ mb: 3 }} container spacing={2}>
				{cardData.map((element, index) => (
					<Grid
						item
						xs={element.xs}
						key={`cards_index_${element.id}`}
					>
						<TradeCard data={element} />
					</Grid>
				))}
			</Grid>

			<Grid sx={{ mb: 3 }} container spacing={2}>
				{investmentCardData.map((element, index) => (
					<Grid
						item
						xs={element.xs}
						key={`cards_index_${element.id}`}
					>
						<InvestmentTypeCard data={element} />
					</Grid>
				))}
			</Grid>

			<Grid sx={{ mb: 3 }} container spacing={2}>
				{graphCardData.map((element, index) => (
					<Grid
						item
						xs={element.xs}
						key={`cards_index_${element.id}`}
					>
						<DashboardGraphCard data={element} />
					</Grid>
				))}
			</Grid>
   </Stack>
  )
}

export default PerformanceContainer