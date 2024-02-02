import React from "react";
import MDrawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';

const Drawer = (props) => {
    const classes = useStyle();

    return (
        <MDrawer
        classes={{
            paper: classes.drawerPaper,
            root: classes.root
        }}
        {...props} />
    )
}

const useStyle = makeStyles((theme) =>({

  drawerPaper: {
    top: `var(--safe-area-inset-top) !important`,
    height: "calc(100vh - var(--safe-area-inset-top)) !important",
    paddingBottom: "var(--safe-area-inset-bottom) !important",
  },
  root:{
    "& > .MuiBackdrop-root":{
      top: `var(--safe-area-inset-top)`,
    }
  }
}));

export default React.memo(Drawer);