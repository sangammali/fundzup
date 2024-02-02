import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme, customStyle }) => ({
	width: "100%",
	// boxShadow: `0 0 0 30px white inset !important`,
	...(customStyle?.root ? customStyle.root : {}),
	"&.MuiSelect-root": {
		width: "100% !important",
		...(customStyle?.rootForSelect ? customStyle.rootForSelect : {}),
	},
	"& .MuiInputBase-root": {
		width: "100%",
		// backgroundColor: "transparent !important",
		borderRadius: "8px !important",
		// boxShadow: `0 0 0 30px white inset !important`,
		...(customStyle?.inputRoot ? customStyle.inputRoot : {}),
		"& input": {
			fontSize: `${theme.typography.small.fontSize} !important`,
			fontWeight: "500 !important",
			"&[type=number]": {
				"-moz-appearance": "textfield",
			},
			"&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
				"-webkit-appearance": "none",
				margin: 0,
			},
			// boxShadow: `0 0 0 30px white inset !important`,
			// "&::-webkit-autofill": {
			// 	"-webkit-box-shadow": "0 0 0 30px white inset !important",
			// },
            "::placeholder": {
                textOverflow: "ellipsis !important",
                color: "#667085 !important",
            },
		},
	},
	"& .MuiFormHelperText-root": {},
	"& .MuiSelect-root": {
		width: "100% !important",
		...(customStyle?.selectRoot ? customStyle.selectRoot : {}),
	},
	"& .MuiSelect-select": {
		fontSize: `${theme.typography.small.fontSize} !important`,
		color: "#2E384D",
		fontWeight: "500 !important",
        height: "20px !important",
		...(customStyle?.selectSelect ? customStyle.selectSelect : {}),
	},
}));

const CustomizableTextField = ({
	hasField = true,
	customStyle,
	...restProps
}) => {
	return hasField ? (
		<StyledTextField customStyle={customStyle} {...restProps} />
	) : null;
};

export default React.memo(CustomizableTextField);

