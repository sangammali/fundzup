import React from "react";
import Stack from "./Stack";
import { Typography } from "@mui/material";
// import Checkbox from "@mui/material/Checkbox";
import CheckboxTick from "./CheckboxTick";
import Box from "@mui/material/Box";
import Checkbox from "./Checkbox";

// import { Checkbox as MCheckbox } from '@mui/material';

function CheckboxCard(props) {
	const { value = false, title = "-", handleClick = () => {} } = props;
	return (
		<>
			<Box
				sx={{
					padding: "16px",
					backgroundColor: "#FFF",
					border: "1px solid #CBCBCB",
					borderRadius: "8px",
					width: "auto",
				}}
			>
				<Stack direction="row">
					<Checkbox
						size="small"
						sx={{ margin: "0px", padding: "0px" }}
						checked={value}
						onClick={handleClick}
					/>
					<Typography
						sx={{ color: "242424", fontSize: "16px", fontWeight: "400px", pl: "12px" }}
					>
						{title}
					</Typography>
				</Stack>
			</Box>
		</>
	);
}

export default CheckboxCard;
