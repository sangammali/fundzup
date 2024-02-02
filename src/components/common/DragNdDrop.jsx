import React, { useState } from "react";
import { DropzoneArea } from "react-mui-dropzone";
import { makeStyles } from "@mui/styles";
import Stack from "./Stack";
import CloseIcon from "@mui/icons-material/Close";
import { InputLabel } from "@mui/material";
import UploadIcon from "asset/icons/UploadIcon";
import FileIcon from "asset/icons/FileIcon";


function DragNdDrop({
	handleChange = () => {},
	acceptedFileTypes = [],
	onChange,
	onFileChange,
	multipleFiles = false,
	label = "",
	name = "",
	group,
}) {
	const classes = useStyles();
	const [error, setError] = useState("");

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [selectedFileName, setSelectedFileName] = useState("");
	const fileSelected = selectedFiles.length > 0;

	const handleFileInputChange = (e) => {
		const selectedFiles = e.target.files;
		onFileChange(selectedFiles); // Notify parent component of file change
		if (onChange) {
		  onChange(e);
		}
	  };

	const handleDrop = (acceptedFiles, rejectedFiles) => {
		if (rejectedFiles && rejectedFiles.length > 0) {
			const unsupportedTypes = rejectedFiles
				.map((file) => file.file.type)
				.join(", ");
			setError(`Unsupported file types: ${unsupportedTypes}`);
		} else {
			setError("");
			setSelectedFiles(acceptedFiles);
			if (acceptedFiles.length > 0) {
				setSelectedFileName(acceptedFiles[0].name);
				handleChange({ name, value: acceptedFiles, group });
			}
		}
	};

	const handleFileRemove = () => {
		setSelectedFiles([]);
		setSelectedFileName("");
	};

	return (
		<>
			{fileSelected ? (
				<>
					<InputLabel
						sx={{
							marginBottom: "6px",
							fontSize: "0.875rem",
						}}
					>
						{label}
					</InputLabel>
					<div className={classes.file_dropzone}>
						<Stack
							direction="row"
							spacing={2}
							alignItems={"center"}
						>
							<FileIcon sx={{ height: "34px", width: "34px" }} />
							{selectedFileName && (
								<span>{selectedFileName}</span>
							)}
						</Stack>
						<CloseIcon
							fontSize="small"
							className={classes.cancel}
							onClick={handleFileRemove}
						/>
					</div>
				</>
			) : (
				<div className={classes.root}>
					{error && <p className={classes.errorText}>{error}</p>}
					<InputLabel
						sx={{
							marginBottom: "6px",
							fontSize: "0.875rem",
						}}
					>
						{label}
					</InputLabel>
					<DropzoneArea
						dropzoneClass={classes.dropzone}
						dropzoneText=""
						filesLimit={multipleFiles ? undefined : 1}
						Icon={() => (
							<>
							<Stack
								direction="column"
								spacing={1}
								alignItems="center"
								justifyContent="center"
								marginTop='35px'
							>
								<UploadIcon className={classes.upload}  />
								<p className={classes.customText}>
									Drag & drop to upload or
									<span className={classes.spanText}>
										{" "}Browse
									</span>
								</p>
							</Stack>
						
							</>
							
						)}
						
						acceptedFiles={acceptedFileTypes} //{['image/jpeg', 'image/png', 'image/bmp']}
						onChange={handleDrop}
						
					/>
						<Stack direction="row"
								alignItems="center"
								// justifyContent="center"
								marginTop='16px'>
						
							<p className={classes.importText}>
								Download format here
							</p>
							</Stack>
				</div>
			)}
		</>
	);
}

export default DragNdDrop;

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiDropzoneArea-root": {
			minHeight: 0,
			marginTop:'10px'
		},
	},
	dropzone: {
		border: "1px dashed #A2A7AE",
		backgroundColor:"#F7F8FF",
		borderRadius: "8px",
		padding: "0px 22px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		minHeight: "105px",
		height: "160px",
	},
	file_dropzone: {
		border: "1px solid #A2A7AE",
		backgroundColor: theme.palette.grey.white,
		borderRadius: "8px",
		padding: "14px 24px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		cursor: "pointer",
		minHeight: "30px",
		marginTop:'30px',
		marginTop:'50px'
	},
	file: {
		width: "34px",
		height: "34px",
		padding: "8.5px",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "17px",
		backgroundColor: theme.palette.grey?.[100],
	},
	cancel: {
		width: "20px",
		height: "20px",
		padding: "3px",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "17px",
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	customText: {
		fontWeight: 400,
		fontSize: "1rem",
		color: "var(--gray-400, #98A2B3)",
	},
	icon: {
		width: "28px",
		height: "28px",
	},
	spanText: {
		color: "#242424",
		fontWeight: 500,
	},
	errorText: {
		color: "red",
		fontWeight: "bold",
		marginBottom: "10px",
	},
	upload: {
		width:"45px !important",
		height: "45px !important",
		
		marginTop:'15px'
	},
	importText: {
		textDecoration: 'underline',
		fontWeight:"600"
	}
}));