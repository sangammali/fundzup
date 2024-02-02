import React from "react";
import cx from "classnames";

import { brokerHelper } from "helper/broker";

import { makeStyles, createStyles, useTheme } from "@mui/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from "@mui/icons-material/MenuOutlined";

import SidebarMenu from "./SidebarMenu";
import Box from "components/common/Box";
import Image from "components/common/Image";
import Drawer from "components/common/Drawer";
import Avatar from "components/common/Avatar";
import IconButton from "components/common/IconButton";

const drawerWidth = 240;

const Sidebar = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const MEDIA_LG_UP = useMediaQuery(theme.breakpoints.up('lg'));
    const brokerLogoUrl = brokerHelper.getLogoUrl();

    const {
        isDrawerExpanded,
        onDrawerToggle,
        menuConfig = [],
    } = props;

    return (
        <Drawer
            variant={MEDIA_LG_UP ? "permanent" : "temporary"}
            open={isDrawerExpanded}
            onClose={() => onDrawerToggle(false)}
            classes={{
                root: cx({ [classes.drawerRoot]: true, [classes.drawerExpanded]: isDrawerExpanded, [classes.drawerCollapsed]: !isDrawerExpanded }),
                paper: cx({ [classes.drawerPaper]: true, [classes.drawerExpanded]: isDrawerExpanded, [classes.drawerCollapsed]: !isDrawerExpanded })
            }}
        >
            {isDrawerExpanded ? (
                <Box className={cx({ [classes.drawerHeader]: true, [classes.drawerHeaderExpanded]: isDrawerExpanded })} onClick={() => onDrawerToggle(false)}>

                    <Image alt="Customer Portal | Jarvis"
                        imgStyle={{ width: "auto", maxWidth: "100%" }}
                        src={brokerLogoUrl ? brokerLogoUrl : "/jarvis-logo.svg"}
                        width="auto" height={38} classes={{ root: classes.logoWrap }} />

                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                </Box>
            ) : (
                <Box className={cx({ [classes.drawerHeader]: true, [classes.drawerHeaderCollapsed]: !isDrawerExpanded })} onClick={() => onDrawerToggle(true)}>
                    <Avatar
                        src="/jarvis_small_logo.png"
                        sx={{ height: 38, width: 38 }}
                        variant="rounded"
                        style={{ cursor: "pointer" }}
                    />
                    {/* <Image alt="Customer Portal | Jarvis"  width={38} height={38} /> */}
                </Box>
            )}

            <SidebarMenu
                isDrawerExpanded={isDrawerExpanded}
                menuConfig={menuConfig}
            />
        </Drawer>
    )
}

const useStyles = makeStyles((theme) => createStyles({
    logoWrap: { display: "block", marginLeft: "8px", maxWidth: "150px" },
    drawerRoot: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        border: `0 !important`,
    },
    drawerExpanded: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerCollapsed: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(9),
    },

    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    drawerHeaderExpanded: {
        justifyContent: 'space-between',
    },
    drawerHeaderCollapsed: {
        justifyContent: 'center'
    }
}));

export default React.memo(Sidebar);