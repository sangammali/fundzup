import React from "react";

import { Snackbar as MSnackbar, Slide } from "@mui/material";

const Snackbar = ({ open, message, onClose, autoHideDuration, children }) => {
	// const [verticalAlign, setVertical] = React.useState("bottom");
    // const [direction, setDirection] = React.useState("up");


    // React.useEffect(() => {
    //     setToastConfig();
    // }, []);

    // const setToastConfig = () => {
    //     if (window.innerWidth < 600) {
    //         setVertical("top");
    //         setDirection("down");
    //     } else if (window.innerWidth > 900) {
    //         setVertical("bottom");
    //         setDirection("up");
    //     }

    // }
	return (
		<MSnackbar
			open={open}
			onClose={onClose}
			message={message}
			autoHideDuration={autoHideDuration}
			children={children}
			TransitionComponent={(props) => <Slide {...props} direction={"down"} />}
			severity="error"
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			className="snackbarToaster"
			sx={{
				zIndex: 999999,
				// top: { xs: "60px", sm: "unset" },
				// bottom: { sm: "30px" },
				display: open ? "flex" : "none",
			}}
		/>
	);
};

export default Snackbar;
