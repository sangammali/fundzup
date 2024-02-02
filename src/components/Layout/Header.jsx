import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Stack from "components/common/Stack";
import AppBar from "components/common/AppBar";
import ToolBar from "components/common/ToolBar";
import { styled } from "@mui/system";
import Button from "components/common/Button";
import Avatar from "components/common/Avatar";
import Box from "components/common/Box";
import Text from "components/common/Text";
import { useNavigate } from "react-router-dom";
import { dashboardApiAction } from "stores/redux/apiSlices/dashboard/dashboardApiSlice";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "40px",
  height: "40px",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    width: "40px",
    height: "40px",
  },
}));

const Header = (props) => {
  const { onLogoutClick, isDrawerExpanded, onDrawerToggle, selectedRoute } =
    props;
  const { data: dashboardData = {} } = dashboardApiAction.getDashboardApi();
  const data = dashboardData;
  console.log(data, "datadashboard");
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <>
      <AppBar className={classes.appBarRoot} position="sticky" elevation={0}>
        {/* <ToolBar sx={{ display: { xs: "auto", lg: "none" } }}>
					{isDrawerExpanded ? null : (
						<IconButton onClick={onDrawerToggle}>
							<MenuIcon />
						</IconButton>
					)}
				</ToolBar> */}

        <ToolBar className={classes.toolBarRoot}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1.5}
            sx={{ width: "100%" }}
            alignItem="center"
          >
            <Box>
              <Text>{selectedRoute}</Text>
            </Box>
            {/* Conditionally render the Box component for /dashboard route */}
            {selectedRoute === "Dashboard" && (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: "671px",
                  backgroundColor: "#E5EEFF",
                  height: "36px",
                  borderRadius: "8px",
                }}
              >
                <Box
                  ml={4}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                 
                  sx={{ width: "210px" }}
                >
                  <Text variant="small">SEBI registration no. :</Text>
                  <Text variant="small">{dashboardData.sebiregno}</Text>
                </Box>
                <Box
                  ml={4}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  sx={{ width: "180px" }}
                >
                  <Text variant="small">BASL no. :</Text>
                  <Text variant="small">{dashboardData.baslNo}</Text>
                </Box>
                <Box
                  ml={4}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  sx={{ width: "200px" }}
                >
                  <Text variant="small">Expiry date :</Text>
                  <Text variant="small">{dashboardData.expirydate}</Text>
                </Box>
              </Box>
            )}

            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItem="center"
              spacing={1.5}
            >
              <Button variant="outlined" startIcon={<NotificationsIcon />}>
                Others
              </Button>
              <Button variant="outlined" startIcon={<NotificationsIcon />}>
                Trades
              </Button>
              <StyledAvatar
                variant="h3"
                src="./images/avatar.jpg"
                title={"Faisal"}
                onClick={() => {
                  navigate("/profile");
                }}
              />
              {/* <IconButton size="small" onClick={onLogoutClick}>
								<LogoutIcon fontSize="small" />
							</IconButton> */}
            </Stack>
          </Stack>
        </ToolBar>
      </AppBar>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    appBarRoot: {
      backgroundColor: `${theme.palette.background.paper} !important`,
      color: "#1e1e1e !important",
      flexDirection: "row",
      justifyContent: "space-between",
      [theme.breakpoints.up("lg")]: {
        justifyContent: "flex-end",
      },
      boxShadow: "0px 0px 10px #ebebeb",
    },

    toolBarRoot: {
      justifyContent: "flex-end",
    },
  })
);

export default React.memo(Header);
