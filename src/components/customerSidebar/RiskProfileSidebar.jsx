import { ListItemAvatar, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import List from "components/common/List";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import ListItem from "components/common/ListItem";
import ListItemButton from "components/common/ListItemButton";
import ListItemIcon from "components/common/ListItemIcon";
import ListItemText from "components/common/ListItemText";
import Radio from "components/common/Radio";
import Avatar from "components/common/Avatar";
import Box from "components/common/Box";
import Checkbox from "components/common/Checkbox";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";

const StyledListItem = styled(ListItem)(({ theme, isSelected }) => ({
  border: "2px solid ",
  borderColor: isSelected ? "#1A54B9" : "#CBCBCB",
  margin: "8px 0",
  borderRadius: "8px",
  backgroundColor: isSelected ? "#EAF2FF" : "inherit",
}));

const RiskProfileSidebar = ({
  viewCustomerDetail,
  customer_id,
  closeRiskDrawer,
  isRiskDrawerOpen,
}) => {
  const getRiskProfileDetail = customersApiAction.getRiskProfile();
  const [selectedRiskProfile, setSelectedRiskProfile] = useState(
    viewCustomerDetail?.customerDetails[0]?.riskprofile || null
  );
  const [selectedRiskProfileId, setSelectedRiskProfileId] = useState(
    getRiskProfileDetail || null
  );

  console.log("selectedRiskProfile", getRiskProfileDetail);
  const [updateRisk] = customersApiAction.updateRiskProfile();
  const riskcarddata = [
    {
      id: 1,
      name: "Aggressive risk profile",
      chart: "/images/aggressive.svg",
      nameColor: "#EB5757",
    },
    {
      id: 2,
      name: "Moderate risk profile",
      chart: "/images/moderate.svg",
      nameColor: "#F2994A",
    },
    {
      id: 3,
      name: "Conservative risk profile",
      chart: "/images/conservative.svg",
      nameColor: "#219653",
    },
  ];

  const handleRadioChange = (profile) => {
    setSelectedRiskProfile(profile.name);
    setSelectedRiskProfileId(profile.risk_profile_id);
  };

  const handleSubmit = async () => {
    const payload = {
      risk_profile_id: selectedRiskProfileId,
    };
    console.log("payload", payload);
    let result = await updateRisk({ user_id: customer_id, payload }).unwrap();
    closeRiskDrawer(false);
  };

  console.log("selectedRiskProfile", viewCustomerDetail);

  return (
    <Stack>
      {isRiskDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isRiskDrawerOpen}
          closeDrawer={closeRiskDrawer}
          title="Risk Profile"
          contentTitle=""
          handleSubmit={handleSubmit}
          cancelButtonText="Close"
          submitButtonText="Save"
          subtitle="Here you can edit risk profile."
        >
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Text
              variant="small"
              component="h4"
              fontSize="16px"
              fontWeight="500"
            >
              Select one risk profile of the customer.
            </Text>
            {getRiskProfileDetail?.data?.riskProfile.map((profile, index) => {
              const labelId = `radio-list-label-${index}`;
              const matchingItem = riskcarddata.find(
                (item) => item.id === profile.risk_profile_id
              );

              return (
                <StyledListItem
                  isselected={selectedRiskProfile === index}
                  key={index}
                  disablePadding
                >
                  <ListItemButton
                    style={{ padding: "20px" }}
                    // role={undefined}
                    // onClick={() => handleRadioChange(index)}
                    dense
                  >
                    <ListItemAvatar>
                      <Avatar
                        style={{
                          width: "52px",
                          height: "30px",
                          borderRadius: "0px",
                        }}
                        src={matchingItem?.chart}
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={
                        <Text
                          fontSize="14px"
                          fontWeight="600"
                          marginLeft="5px"
                          color={matchingItem?.nameColor || profile.nameColor}
                        >
                          {matchingItem?.name || profile.name}
                        </Text>
                      }
                    />
                    <ListItemIcon>
                      <Radio
                        style={{ marginLeft: "30px" }}
                        value={profile.name}
                        checked={
                          selectedRiskProfile === profile.name ||
                          selectedRiskProfileId === profile.risk_profile_id
                        }
                        onChange={() => handleRadioChange(profile)}
                        tabIndex={-1}
                        disableRipple
                        sx={{
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </StyledListItem>
              );
            })}
          </List>
          <Box>
            <Text
              variant="small"
              component="h4"
              fontSize="16px"
              fontWeight="500"
            >
              Select product stocks
            </Text>
            <Stack
              direction="column"
              spacing={1.5}
              sx={{ width: "100%" }}
              alignItem="center"
              justifyContent="center"
              style={{ marginTop: "1px" }}
            >
              {viewCustomerDetail?.investmentDetails?.map((item, i) => {
                return (
                  item.product_name === "Model Portfolio" &&
                  item.product_category.map((items, index) =>
                    items.investment_amount > 0 ? (
                      <div key={index}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Checkbox
                            style={{ marginLeft: "15px" }}
                            checked={true}
                            label={
                              <Text
                                variant="small"
                                component="h5"
                                fontWeight="500"
                                style={{ marginLeft: "10px" }}
                              >
                                {items?.category_name}
                              </Text>
                            }
                            size="small"
                            name={`sendToModelPortfolio${index}`}
                            // onChange={() => handleCheckboxChange("product_id", item.product_id)}
                          />
                        </Stack>
                      </div>
                    ) : null
                  )
                );
              })}

              {/* <Checkbox
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Text
                      variant="small"
                      component="h4"
                      fontWeight="500"
                      style={{ marginLeft: "8px" }}
                    >
                      High risk product stock
                    </Text>
                  </Box>
                }
                size="small"
                name="sendToModelPortfolio"
              /> */}
              {/* <Checkbox
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Text
                      variant="small"
                      component="h4"
                      fontWeight="500"
                      style={{ marginLeft: "8px" }}
                    >
                      Medium risk product stock
                    </Text>
                  </Box>
                }
                size="small"
                name="sendToCustom"
              />
              <Checkbox
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Text
                      variant="small"
                      component="h4"
                      fontWeight="500"
                      style={{ marginLeft: "8px" }}
                    >
                      Low risk product stock
                    </Text>
                  </Box>
                }
                size="small"
                name="sendToModelPortfolio"
              /> */}
            </Stack>
          </Box>
        </SideDrawer>
      )}
    </Stack>
  );
};

export default RiskProfileSidebar;
