/**
 *
 * Checkbox
 *
 */

import React, { memo } from "react";
import { Checkbox as MCheckbox } from "@mui/material";
// import { makeStyles} from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // height: '40px',
//     // width: '100%',
//     // borderRadius: '100px',
//   },
// }));

const Checkbox = (props) => {
	// const classes = useStyles();

	const { style, label, color, onChange, ...restProps } = props;

	const renderCheckbox = () => {
		return (
			<MCheckbox
				onClick={props.onClick}
				// className={classes.root}
				sx={{
					color: color || "primary.main",
					marginLeft: "2px",
					padding: "5px",
					width: "12px",
					height: "12px",
					...style,
				}}
				inputProps={{ "aria-label": "primary checkbox" }}
				onChange={(e) => {
					if (onChange) {
						onChange(e.target.checked, e.target.value);
					}
				}}
				{...restProps}
			></MCheckbox>
		);
	};

	if (label) {
		return (
			<FormControlLabel
				style={{
					marginTop: "20px",
				}}
				control={renderCheckbox()}
				label={label}
			/>
		);
	}

	return renderCheckbox();
};

Checkbox.propTypes = {};

export default memo(Checkbox);
