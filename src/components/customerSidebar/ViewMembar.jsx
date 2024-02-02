import React, { useEffect, useState } from "react";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Box from "components/common/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Text from "components/common/Text";
import Radio from "components/common/Radio";
import { Link } from "react-router-dom";
import Divider from "components/common/Divider";
import Grid from "components/common/Grid";
import Button from "components/common/Button";
import { Chip } from "@mui/material";
import Avatar from "components/common/Avatar";
import Dialog from "components/common/Dialog";
import Featured from "asset/icons/Featured.svg";
import Checkbox from "components/common/Checkbox";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const customerDetail = [
  {
    id: 1,
    name: "Ankit",
    email: "ankit@gmail.com",
    phone: "9988776655",
    admin: true,
    makeAdmin: false,
  },
  {
    id: 2,
    name: "Arohi",
    email: "arohi@gmail.com",
    phone: "9988776652",
    admin: false,
    makeAdmin: true,
  },
  {
    id: 3,
    name: "Abhi",
    email: "abhishek@gmail.com",
    phone: "9988776653",
    admin: false,
    makeAdmin: true,
  },
];

const ViewMember = ({
  viewCustomerDetail,
  customer_id,
  closeFamilyDrawer,
  isFamilyDrawerOpen,
}) => {
  const select = useSelector((state) => state);
  const family_id = viewCustomerDetail?.customerDetails[0]?.family_id;
  const [openModel, setOpenModel] = useState(false);
  const [selectAdminModel, setSelectAdminModel] = useState(false);
  const [removeUser, setRemoveUser] = useState(false);
  const familyMember = customersApiAction.getFamilyMembers(family_id);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [members, setMembers] = useState(customerDetail);
  const { data: familyData = {}, isFetching: familyFetching } =
    customersApiAction.getFamilyApi();


  console.log("familyMember", familyMember);

  const handleOkay = () => {
    setOpenModel(false);
    setSelectAdminModel(true);
  };

  const handleAgree = () => {
    setSelectAdminModel(false);
  };

  const handleCancel = () => {
    setOpenModel(false);
    setSelectAdminModel(false);
  };

  // const fetchData = async () => {
  //   try {
  //     const [familyMember] = await customersApiAction.getFamilyMembers(family_id);
  //     // Use the familyMember data here
  //     console.log("familyMember",familyMember);
  //   } catch (error) {
  //     console.error("Error fetching family members:", error);
  //   }
  // };
  // useEffect(()=>
  // {
  //   fetchData()
  // },[])

  return (
    <Stack>
      {isFamilyDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isFamilyDrawerOpen}
          closeDrawer={closeFamilyDrawer}
          title="Shah Family"
          contentTitle=""
          // handleSubmit={handleSubmit}
          cancelButtonText="Close"
          submitButtonText="Done"
          subtitle="Here you can see all the detail of family member in this family."
        >
          <Grid container spacing={2}>
            {(familyMember?.data ?? []).length > 0 &&
              familyMember?.data[0]?.family_details.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Stack direction="row" spacing={2}>
                    <Text
                      sx={{
                        width: "100px",
                        fontSize: "14px",
                        color: "#667085",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      Name
                    </Text>
                    <Text style={{ marginTop: "-5px", marginLeft: "54px" }}>
                      :
                    </Text>
                    {item.is_admin === 0 ? (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        marginLeft="30px"
                      >
                        <Text
                          variant="small"
                          fontSize="14px"
                          fontWeight="600"
                          sx={{ textWrap: "nowrap" }}
                        >
                          {item.name}
                        </Text>
                        {removeUser ? (
                          <Link
                            style={{
                              fontSize: "14px",
                              color: "#EB5757",
                              textWrap: "nowrap",
                              fontWeight: "600",
                              marginLeft: "160px",
                            }}
                          >
                            Remove User
                          </Link>
                        ) : (
                          <Link
                            style={{
                              fontSize: "14px",
                              color: "#1A54B9",
                              textWrap: "nowrap",
                              fontWeight: "600",
                              marginLeft: "160px",
                            }}
                          >
                            Make Admin
                          </Link>
                        )}
                        {/* <Link
                        style={{
                          fontSize: "14px",
                          color: "#1A54B9",
                          textWrap: "nowrap",
                          fontWeight: "600",
                          marginLeft: "160px",
                        }}
                      >
                        {removeUser ? " Make Admin" : "Remove User"}
                      </Link> */}
                      </Stack>
                    ) : (
                      <>
                        <Stack direction="row" justifyContent="space-between">
                          <Stack direction="row">
                            <Text
                              variant="small"
                              fontSize="14px"
                              fontWeight="600"
                              sx={{ textWrap: "nowrap" }}
                            >
                              {item.name}
                            </Text>
                            <Chip
                              label={
                                <Text
                                  fontSize="12px"
                                  fontWeight="400"
                                  alignItems="center"
                                >
                                  Admin
                                </Text>
                              }
                              style={{
                                width: "100%",
                                height: "20px",
                                textAlign: "center",
                                marginLeft: "5px",
                              }}
                            ></Chip>
                          </Stack>
                          <Link
                            onClick={() => setOpenModel(true)}
                            style={{
                              fontSize: "14px",
                              color: "#EB5757",
                              textWrap: "nowrap",
                              fontWeight: "600",
                              marginLeft: "80px",
                            }}
                          >
                            {removeUser ? "Remove User" : "Remove Admin"}
                          </Link>
                        </Stack>
                      </>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Text
                      sx={{
                        width: "100px",
                        flex: 1,
                        fontSize: "14px",
                        color: "#667085",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      Email
                    </Text>
                    <Text style={{ marginTop: "-5px" }}>:</Text>
                    <Text
                      sx={{
                        width: "200px",
                        flex: 2,
                        fontSize: "13px",
                        fontWeight: "600",
                        textWrap: "nowrap",
                      }}
                    >
                      {item.email}
                    </Text>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Text
                      sx={{
                        width: "100px",
                        flex: 1,
                        fontSize: "14px",
                        color: "#667085",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      Phone
                    </Text>
                    <Text style={{ marginTop: "-5px" }}>:</Text>
                    <Text
                      sx={{
                        width: "200px",
                        flex: 2,
                        fontSize: "13px",
                        fontWeight: "600",
                        textWrap: "nowrap",
                      }}
                    >
                      {item.mobile}
                    </Text>
                  </Stack>

                  <Divider style={{ marginTop: "15px" }} />
                </Grid>
              ))}
          </Grid>
          <Box
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              position: "absolute",
              bottom: "90px",
              right: "10px",
            }}
          >
            <Link
              onClick={() => setRemoveUser(!removeUser)}
              style={{
                fontSize: "14px",
                color: "#EB5757",
                textWrap: "nowrap",
                fontWeight: "600",
                marginLeft: "80px",
              }}
            >
              {removeUser ? "Back to previous page" : "Remove User"}
            </Link>
          </Box>
        </SideDrawer>
      )}
      <Dialog
        onClose={() => setOpenModel(false)}
        open={openModel}
        disableCloseIcon
        maxWidth="sm"
        contentComponent={() => (
          <Stack
            direction="column"
            spacing={0.5}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Avatar
              style={{ width: "50px", height: "50px" }}
              src={Featured}
            ></Avatar>
            <Text fontSize="20px" fontWeight="600" color="#101828" p={1}>
              Are you sure you want to remove this user?
            </Text>
            <Text
              fontSize="14px"
              fontWeight="400"
              color="#667085"
              marginTop="-10px"
            >
              By clicking on yes you are making sure that you want to remove
              this <br /> user permanently from this family member.
            </Text>
            <Stack direction="row" style={{ padding: "0px", width: "100%" }}>
              <Button
                style={{ width: "100%" }}
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                  width: "100%",
                  p: 2,
                  m: 2,
                }}
                onClick={handleCancel}
              >
                No
              </Button>
              <Button
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                  p: 2,
                  width: "100%",
                  m: 2,
                }}
                onClick={handleOkay}
              >
                Yes ,remove
              </Button>
            </Stack>
          </Stack>
        )}
      />
      <Dialog
        onClose={() => setSelectAdminModel(false)}
        open={selectAdminModel}
        disableCloseIcon
        maxWidth="sm"
        contentComponent={() => (
          <Stack
            direction="column"
            spacing={0.5}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Text fontSize="20px" fontWeight="600" color="#101828">
              Do you want to make anyone else an admin?
            </Text>
            <Stack direction="row" justifyContent="space-between" width="80%">
              <Checkbox
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Text
                      variant="small"
                      fontSize="16px"
                      fontWeight="400"
                      style={{ marginLeft: "8px", marginTop: "-5px" }}
                    >
                      Jeetu Gupta
                    </Text>
                  </Box>
                }
                size="small"
                name="sendToCustom"
                style={{ marginLeft: "8px", marginTop: "-5px" }}
              />
              <Checkbox
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Text
                      variant="small"
                      fontSize="16px"
                      fontWeight="400"
                      style={{ marginLeft: "8px", marginTop: "-5px" }}
                    >
                      Aditya Gupta
                    </Text>
                  </Box>
                }
                size="small"
                name="sendToModelPortfolio"
                style={{ marginTop: "-5px" }}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" width="80%">
              <Checkbox
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Text
                      variant="small"
                      fontSize="16px"
                      fontWeight="400"
                      style={{ marginLeft: "8px", marginTop: "-5px" }}
                    >
                      Jeetu Gupta
                    </Text>
                  </Box>
                }
                size="small"
                name="sendToCustom"
                style={{ marginLeft: "8px", marginTop: "-5px" }}
              />
              <Checkbox
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Text
                      variant="small"
                      fontSize="16px"
                      fontWeight="400"
                      style={{ marginLeft: "8px", marginTop: "-5px" }}
                    >
                      Aditya Gupta
                    </Text>
                  </Box>
                }
                size="small"
                name="sendToModelPortfolio"
                style={{ marginTop: "-5px" }}
              />
            </Stack>

            <Stack direction="row" style={{ padding: "0px", width: "100%" }}>
              <Button
                style={{ width: "100%" }}
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                  width: "100%",
                  p: 2,
                  m: 2,
                }}
                onClick={handleAgree}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                  p: 2,
                  width: "100%",
                  m: 2,
                }}
              >
                Done
              </Button>
            </Stack>
          </Stack>
        )}
      />
    </Stack>
  );
};

export default ViewMember;
