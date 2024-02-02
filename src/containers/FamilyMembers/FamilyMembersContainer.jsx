import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Chip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CustomGrid from "components/datagrid/CustomGrid";
import { familyApiAction } from "stores/redux/apiSlices/familyMembers/familyApiSlice";
import { toastActions } from "stores/redux/slices/toastSlice";
import EyeIcon from "asset/icons/EyeIcon";
import AlertIcon from "asset/icons/AlertIcon";
import Stack from "components/common/Stack";
import Checkbox from "components/common/Checkbox";
import IconButton from "components/common/IconButton";
import Button from "components/common/Button";
import NewDialog from "components/common/Dialog";
import Link from "components/common/Link";
import Box from "components/common/Box";
import Text from "components/common/Text";
import SideDrawer from "components/common/SideDrawer";
import TextField from "components/common/TextField";
import Divider from "components/common/Divider";
import { validationHelper } from "helpers/validation";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function FamilyMembersContainer() {
  const [isDrawerAddFamily, setDrawerAddFamily] = useState(false);
  const [isDrawerAddMember, setIsDrawerAddMember] = useState(false);
  const [isDrawerEye, setIsDrawerEye] = useState(false);
  const [familyName, setFamilyName] = useState("");
  const [selectedFamilyName, setSelectedFamilyName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [addMemberFamilyDetails, setAddMemberFamilyDetails] = useState(null);
  const [eyeDrawerDetails, setEyeDrawerDetails] = useState(null);
  const [congratsModalOpen, setCongratsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const [addFormError, setAddFormError] = useState({
    familyName: "",
    usersName: "",
  });

  const handleAddValidation = () => {
    let newAddError = { ...addFormError };
    const familyNameValidation = validationHelper.required(familyName);
    newAddError.familyName = familyNameValidation.message;

    const usersNameValidation = validationHelper.required(selectedUserId);
    newAddError.usersName = usersNameValidation.message;

    setAddFormError(newAddError);

    return familyNameValidation.isValid && usersNameValidation.isValid;
  };
  const dispatch = useDispatch();
  const {
    data: familyData = {},
    refetch: refetchFamily,
    isFetching: familyFetching,
  } = familyApiAction.getFamilyApi();
  const {
    data: familyList = {},
    refetch: refetchFamilyUserList,
    isFetching: userListFetching,
  } = familyApiAction.getFamilyUsersList();

  const [handleNewFamilyApi] = familyApiAction.newFamily();

  const [handleUpdateFamilyApi] = familyApiAction.updateFamily();

  const [handleUpdateAdminApi] = familyApiAction.updateAdmin();

  const familyDataArray = Object.values(familyData);
  const familyListArray = Object.values(familyList);

  const familyDataWithIds = familyDataArray.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const familyDataListWithIds = familyListArray.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const handleFamilyNameChange = (e) => {
    const { value } = e.target;
    setFamilyName(value);
  };

  const handleUserIdChange = (event, familyDataListWithIds) => {
    const userIds = familyDataListWithIds.map((option) => option.user_id); // Assuming the user ID is stored in the 'id' property, adjust this according to your data structure
    setSelectedUserId(userIds);
  };

  const handlePreviewSave = () => {
    setCongratsModalOpen(true);
  };

  const AddFamilyDrawer = () => {
    setDrawerAddFamily(true);
    setSelectedFamilyName("");
  };
  const addMemberDrawer = (familyDetails) => {
    setAddMemberFamilyDetails(familyDetails);
    setIsDrawerAddMember(true);
  };
  const eyeDrawer = (familyDetails) => {
    setEyeDrawerDetails(familyDetails);
    setIsDrawerEye(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerEye(false);
  };

  const handleAction = () => {
    setIsAdmin(!isAdmin);
  };

  const members = [
    {
      name: "Jay Shah",
      role: "Admin",
      email: "jayshah123@gmail.com",
      phone: "+91 9876543212",
      actionColor: "#EB5757",
      actionText: "Remove admin",
    },
    {
      name: "Jay Shah",
      role: "Admin",
      email: "jayshah123@gmail.com",
      phone: "+91 9876543212",
      actionColor: "#EB5757",
      actionText: "Remove admin",
    },
  ];

  const FamilyMemberHeader = () => {
    if (familyFetching || userListFetching) {
      return <div>Loading...</div>;
    }

    const data = familyData;
    console.log(data, "data=============================");

    const list = familyList;
    console.log(list, "list===========================================");
    console.log("addMemberFamilyDetails : ", addMemberFamilyDetails);

    console.log("eyeDrawerDetailsssssssssssssssssssssss", eyeDrawerDetails);
    return (
      <>
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Text
                sx={{ color: "primary", mr: 1, fontWeight: 500 }}
                color="primary"
                variant="button"
              >
                Family Members{" "}
              </Text>
            </Stack>
            <Text variant="small" sx={{ color: "#667085" }}>
              Here you can create families and add members to it.
            </Text>
          </Box>

          <Box>
            <Button sx={{ padding: "10px 16px" }} onClick={AddFamilyDrawer}>
              + Create new family
            </Button>
          </Box>
        </Box>
      </>
    );
  };

  const handleFamilySubmit = async () => {
    if (!handleAddValidation()) {
      console.log("inside validation");
      return;
    }

    if (selectedUserId !== null) {
      const payload = {
        name: familyName,
        users: selectedUserId,
      };

      console.log("API Request Payload:", payload); // Log payload

      try {
        let res = await handleNewFamilyApi(payload);

        if (res.data.status === 1) {
          setSelectedFamilyName(res.data.name);
          refetchFamily();
        }
      } catch (error) {
        console.error("Error in API call:", error);
        console.log("Complete error object:", error);
      }
    } else {
      console.error("Selected user ID is null");
    }
  };

  const handleAddMember = async () => {
    const userIds = addMemberFamilyDetails.family_details.map(
      (item) => item.user_id
    );

    setAddMemberFamilyDetails(addMemberFamilyDetails);

    if (selectedUserId !== null) {
      const payload = {
        name: addMemberFamilyDetails?.name,
        familyId: addMemberFamilyDetails?.family_id,
        users: selectedUserId,
      };

      console.log("Payloadeeeeeeeeeeee", payload);

      try {
        let res = await handleUpdateFamilyApi(payload);
        if (res.data.status === 1) {
          setSelectedFamilyName(res.data.name);
          refetchFamily();
        }
      } catch (error) {
        console.error("Error in API call:", error);
        console.log("Complete error object:", error);
      }
    } else {
      console.error("Selected user ID is null");
    }
  };

  const handleUpdateAdmin = async (member) => {
    // const userIds = addMemberFamilyDetails?.family_details.map(
    //   (item) => item.user_id
    // );

    //   console.log("memberrrrrrrrrr",userIds)
    console.log("eyeDrawer", eyeDrawer);
    const payload = {
      isAdmin: member.is_admin ? 0 : 1,
      familyId: eyeDrawerDetails?.family_id,
      userId: member.user_id,
    };

    console.log("handleUpdateAdminnnnnnnnnnnnnnnn", payload);

    try {
      let res = await handleUpdateAdminApi(payload);
      if (res.data.status === 1) {
        setSelectedFamilyName(res.data.name);
        refetchFamily();
      }
    } catch (error) {
      console.error("Error in API call:", error);
      console.log("Complete error object:", error);
    }
  };

  const FamilyMemberColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "family_details",
      headerName: "Members Name",
      flex: 1,
      renderCell: (params) => (
        <>
          {params?.row?.family_details?.map((member) => (
            <Chip
              key={member.user_id}
              label={member.name}
              sx={{ backgroundColor: "#E5EEFF", color: "#142E56", mr: "5px" }}
            />
          ))}
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Stack direction="row" alignItems="center">
          <IconButton>
            <EyeIcon
              sx={{ width: "20px", height: "20px" }}
              onClick={() => {
                eyeDrawer(params.row);
              }}
            />
          </IconButton>

          <Button
            variant="outlined"
            onClick={() => {
              addMemberDrawer(params.row);
            }}
            sx={{ fontSize: "14px", fontWeight: 500, ml: "20px" }}
          >
            Add/Remove
          </Button>
        </Stack>
      ),
      flex: 1,
    },
  ];

  console.log("addMemberFamilyDetails : ", addMemberFamilyDetails);

  return (
    <>
      <Box sx={{ mt: "24px" }}>
        <CustomGrid
          autoHeight
          list={familyDataWithIds}
          columnHeaderHeight={72}
          rowHeight={72}
          columns={FamilyMemberColumns}
          rowCount={familyDataWithIds.length}
          pagination
          header={FamilyMemberHeader}
        />
      </Box>
      <SideDrawer
        open={isDrawerAddFamily}
        closeDrawer={() => setDrawerAddFamily(false)}
        title="Create New Family"
        subtitle="Here you can create new family by adding details"
        cancelButtonText="Cancel"
        submitButtonText="Save"
        handleSubmit={handleFamilySubmit}
      >
        <Box>
          <Text sx={{ fontSize: "14px", fontWeight: 500 }}>Family name</Text>
          <TextField
            placeholder="Enter family name "
            value={familyName}
            onChange={handleFamilyNameChange}
          />
          {addFormError.familyName ? (
            <span style={{ color: "red" }}>{addFormError.familyName}</span>
          ) : null}
        </Box>

        <Box>
          <Text sx={{ fontSize: "14px", fontWeight: 500 }}>Users</Text>

          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={familyDataListWithIds}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            onChange={handleUserIdChange}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select member" />
            )}
          />
          {addFormError.usersName ? (
            <span style={{ color: "red" }}>{addFormError.usersName}</span>
          ) : null}
        </Box>
      </SideDrawer>

      <SideDrawer
        open={isDrawerAddMember}
        closeDrawer={() => setIsDrawerAddMember(false)}
        title="Add member"
        subtitle="Here you can add member."
        cancelButtonText="Cancel"
        submitButtonText="Save"
        handleSubmit={handleAddMember}
      >
        <Box>
          <Box sx={{ display: "flex", mb: "20px" }}>
            <Text
              sx={{
                color: "#676C76",
                fontWeight: 400,
                fontSize: "16px",
                display: "flex",
              }}
            >
              Family name <Text sx={{ ml: "20px", mr: "20px" }}>:</Text>{" "}
            </Text>
            <Text sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
              {addMemberFamilyDetails?.name ?? "Select a family"}
            </Text>
          </Box>

          <Box sx={{}}>
            <Text
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#242424",
                mb: "6px",
              }}
            >
              User
            </Text>

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={familyDataListWithIds}
              disableCloseOnSelect
              onChange={handleUserIdChange}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select member" />
              )}
            />
          </Box>
        </Box>
      </SideDrawer>

      <SideDrawer
        open={isDrawerEye}
        closeDrawer={handleDrawerClose}
        title="Shah Family"
        subtitle="Here you can see all the details of the members in this family"
        cancelButtonText="Cancel"
        submitButtonText="Submit"
      >
        {eyeDrawerDetails?.family_details?.map((member, index) => (
          <React.Fragment key={index}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Stack direction="row" alignItems="center">
                  <Text sx={{ fontSize: "16px", color: "#676C76" }}>
                    Name <span style={{ marginLeft: "37px" }}>:</span>
                  </Text>
                  <Text sx={{ fontSize: "16px", color: "#242424", ml: "20px" }}>
                    {member?.name ?? "durgesh"}
                  </Text>

                  {member.isAdmin === 1 && (
                    <Text>
                      <Chip
                        label="Admin"
                        size="small"
                        sx={{
                          fontSize: "14px",
                          color: "#142E56",
                          backgroundColor: "#E5EEFF",
                          ml: "12px",
                        }}
                      />
                    </Text>
                  )}
                </Stack>
                <Box>
                  <Link
                    href="#"
                    onClick={() => {
                      handleUpdateAdmin(member, addMemberFamilyDetails);
                    }}
                    sx={{
                      color: "#1A54B9",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#1A54B9",
                    }}
                  > 
                    {console.log("member : ",member)}
                    {member.isAdmin ? "Remove admin" : "Make Admin"}
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: "flex", mt: "12px" }}>
                <Text sx={{ fontSize: "16px", color: "#676C76" }}>
                  Email <span style={{ marginLeft: "42px" }}>:</span>
                </Text>
                <Text sx={{ fontSize: "16px", color: "#242424", ml: "20px" }}>
                  {member.email}
                </Text>
              </Box>

              <Box sx={{ display: "flex", mt: "12px" }}>
                <Text sx={{ fontSize: "16px", color: "#676C76" }}>
                  Phone <span style={{ marginLeft: "36px" }}>:</span>
                </Text>
                <Text sx={{ fontSize: "16px", color: "#242424", ml: "20px" }}>
                  {member.mobile}
                </Text>
              </Box>
            </Box>

            <Divider />
          </React.Fragment>
        ))}
      </SideDrawer>

      <NewDialog
        onClose={() => setCongratsModalOpen(false)}
        open={congratsModalOpen}
        disableCloseIcon
        maxWidth="sm"
        contentComponent={() => (
          <Stack
            direction="column"
            spacing={1.5}
            sx={{ width: "100%" }}
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: "10px" }}
          >
            {/* <CheckCircleOutlinedIcon /> */}
            <AlertIcon sx={{ width: "58px", height: "58px" }} />
            <Text
              fontSize="20px"
              fontWeight="600"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              Are you sure you want to remove this user?
            </Text>
            <Text
              width="500px"
              fontSize="14px"
              fontWeight="400"
              color="#667085"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              textAlign="center"
            >
              By clicking on yes you are making sure that you want to remove
              this user permanently from this family member.
            </Text>

            <Button
              sx={{
                width: "80%",
                height: "56px",
                fontWeight: 600,
                borderRadius: "8px",
                p: "18px 20px",
                mt: "32px",
              }}
            >
              Okay
            </Button>
          </Stack>
        )}
      />
    </>
  );
}

export default FamilyMembersContainer;
