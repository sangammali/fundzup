import React, { useEffect, useState } from "react";
import Button from "components/common/Button";
import Card from "components/common/Card";
import Text from "components/common/Text";
import Box from "components/common/Box";
import Divider from "components/common/Divider";
import Grid from "components/common/Grid";
import TextField from "components/common/TextField";
import FileUpload from "components/common/FileUpload";
import { profileApiAction } from "stores/redux/riaProfile/riaProfileSlice";
import { toastActions } from "stores/redux/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { fileToBase64 } from "helpers/fileFormat";
import DownloadButton from "components/common/DownloadButton";
import Stack from "components/common/Stack";
import styled from "@emotion/styled";
import IconButton from "components/common/IconButton";
import { validationHelper } from "helpers/validation";
import EditIcon from "@mui/icons-material/Edit";
import { uuid } from "helpers/utility";

const HeaderBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "16px 24px",
}));

const CancelButton = styled(Button)(() => ({
  border: "1px solid #142E56",
  borderRadius: "4px",
  color: "#142E56",
  textTransform: "capitalize",
  width: "116px",
  padding: "8px 16px",
  marginRight: "24px",
}));

const SaveButton = styled(Button)(() => ({
  border: "1px solid #142E56",
  borderRadius: "4px",
  color: "#FFF",
  textTransform: "capitalize",
  width: "116px",
  padding: "8px 16px",
}));
const EditButton = styled(Button)(() => ({
  border: "1px solid #828282",
  borderRadius: "4px",
  color: "#101828",
  textTransform: "capitalize",
}));
const AvatarBox = styled(Box)(() => ({
  width: "236px",
  height: "236px",
  borderRadius: "9px",
  backgroundColor: "#E5EEFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const LabelText = styled(Text)(() => ({
  fontSize: "16px",
  fontWeight: 400,
  color: "#667085",
  width: "250px",
  textTransform: "uppercase",
}));
const EditTextField = styled(TextField)(() => ({
  display: "flex",
  width: "300px",
  p: "4px 16px",
  alignItems: "center",
  borderRadius: "1px solid #CBCBCB",
}));

const ValueText = styled(Text)(() => ({
  fontSize: "16px",
  color: "#101828",
  fontWeight: 500,
  flexShrink: 0,
}));

const DocumentText = styled(Text)(() => ({
  color: "#242424",
  fontSize: "16px",
  fontWeight: 500,
  textTransform: "capitalize",
  paddingTop: "24px",
}));
const DocumentNameText = styled(Text)(() => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "capitalize",
  paddingTop: "24px",
}));
const UploadDocText = styled(Text)(() => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "capitalize",
  paddingTop: "24px",
}));

const AddDocumentButton = styled(Button)(() => ({
  fontsize: "14px",
  fontweight: 600,
  marginLeft: "40px",
  color: "#142E56",
  textTransform: "capitalize",
  marginBottom: "32px",
  marginTop: "16px",
}));

const getUserDetails = (profileData) => {
  return [
    { label: "Email", key: "email", value: profileData?.email },
    { label: "Phone", key: "phone", value: profileData?.mobile },
    {
      label: "Joining Date",
      key: "joiningDate",
      value: profileData?.joining_date,
    },
    { label: "User Type", key: "userType", value: profileData?.role_name },
    {
      label: "SEBI Registration Number",
      key: "sebiNumber",
      value: profileData?.sebi_reg_no,
    },
    { label: "BASL Number", key: "baslNumber", value: profileData?.basl_no },
    {
      label: "BASL Expiry",
      key: "baslExpiry",
      value: profileData?.basl_expiry,
    },
  ];
};

const ProfileCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [userDocuments, setUserDocuments] = useState([]);
  const [updatedValues, setUpdatedValues] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  const [additionalStocks, setAdditionalStocks] = useState(4);
  const [isDownload, setIsDownload] = useState(false);

  const [newDocForm, setNewDocForm] = useState({
    display_name: null,
    file: null,
  });
  const [newDocError, setNewDocError] = useState({
    display_name: null,
    file: null,
  });
  const [isDocFormOpen, setIsDocFormOpen] = useState(false);

  const dispatch = useDispatch();

  const { data: profileData, refetch: refetchProfileData } =
    profileApiAction.getProfileApi();
  const [fetchProfileDoc, { data: profileDoc = {} }] =
    profileApiAction.getLazyProfileDocApi();
  const [handleUpdateProfileApi] = profileApiAction.updateProfileApi();
  const [handleUpdateFile] = profileApiAction.updateDocApi();

  useEffect(() => {
    if (profileData) {
      const userDocs = getUserDoc(profileData.documents);
      setUserDocuments(userDocs);
      const details = getUserDetails(profileData);
      setUserDetails(details);
    }
  }, [profileData]);

  useEffect(() => {
    refetchProfileData();
  }, []);

  const getUserDoc = (docs) => {
    const docData = docs.map((item) => {
      return {
        document_id: item.document_id,
        userDocId: item.userDocId,
        display_name: item.display_name,
        fileName: item.fileName,
        isEdit: false,
        id: uuid(),
      };
    });
    return docData;
  };

  const handleAddStock = async () => {
    const newDocument = {
      document_id: 0,
      userDocId: 0,
      display_name: null,
      file: null,
    };
    let userDocs = [...userDocuments];
    userDocs.push(newDocument);
    setUserDocuments(userDocs);
  };

  const handleEditClick = () => {
    setEditMode(true);
    const initialEditedValues = {};
    userDetails.forEach((detail) => {
      initialEditedValues[detail.key] = detail.value;
    });
    setEditedValues(initialEditedValues);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedValues({});
  };

  const handleSaveClick = () => {
    const payload = {
      email: editedValues.email || profileData?.email,
      phone: editedValues.phone || profileData?.mobile,
      sebi_reg_no: editedValues.sebiNumber || profileData?.sebi_reg_no,
      basl_no: editedValues.baslNumber || profileData?.basl_no,
      basl_expiry: editedValues.baslExpiry || profileData?.basl_expiry,
    };

    handleUpdateProfileApi(payload)
      .unwrap()
      .then((response) => {
        console.log({ response });
        if (response.status == 1) {
          refetchProfileData();
          console.log("refetch methodis called");
          setIsDocFormOpen(false);
          setNewDocForm({});
        }
      })
      .catch((error) => {
        console.error("Error in API call:", error);
      });
    setEditMode(false);
  };

  const handleFileSubmit = async (props) => {
    const { document_id, userDocId, display_name } = props;
    const base64String = await fileToBase64(props.file);
    const payload = {
      document_id: document_id,
      userDocId: userDocId,
      display_name: display_name,
      file: `data:application/pdf;base64${base64String}`,
    };
    //api call
    try {
      let res = await handleUpdateFile(payload);
      if (res.data.status) {
        refetchProfileData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const downloadFile = async (document_id) => {
    const payload = {
      documentId: document_id,
    };
    console.log("download function called", document_id, payload);

    try {
      let res = await fetchProfileDoc(payload, false);
      if (res.data.file) {
        const base64 = await fetch(res.data.file);
        const blob = await base64.blob();
        const a = document.createElement("a");
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = res.data.filename;
        a.click();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveClick1 = () => {
    const payload = {
      document_id: 0,
      userDocId: 0,
      display_name: "string",
      file: "string",
    };
  };

  const handleInputChange = (key, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleDocEdit = (id) => {
    let newDoc = [...userDocuments];
    newDoc.forEach((item) => {
      if (item.id === id) {
        if (item.isEdit) {
          delete item.updatedFile;
        }
        item.isEdit = !item.isEdit;
      }
    });
    setUserDocuments(newDoc);
  };

  const handleDocDataChange = ({ name, value, id }) => {
    let newUserDocs = [...userDocuments];
    newUserDocs.forEach((item) => {
      if (item.id === id) {
        item[name] = value;
      }
    });
    setUserDocuments(newUserDocs);
  };

  const submitDocUpdate = async (docData) => {
    if (!docData?.updatedFile) {
      let newUserDocs = [...userDocuments];
      newUserDocs.forEach((item) => {
        if (item.id === docData.id) {
          item.isEdit = false;
        }
      });
      setUserDocuments(newUserDocs);
      return;
    }
    let baseFile = await fileToBase64(docData.updatedFile);
    let payload = {
      document_id: docData.document_id,
      userDocId: docData.userDocId,
      display_name: docData.display_name,
      file: `data:application/pdf;base64${baseFile}`,
    };
    try {
      const res = await handleUpdateFile(payload);
      if (res.data.status === 1) {
        refetchProfileData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewFormDataChange = ({ name, value }) => {
    let newDocData = { ...newDocForm };
    newDocData[name] = value;
    setNewDocForm(newDocData);
  };

  const handleNewDocSubmitValidation = () => {
    const newDocFormError = { ...newDocError };

    const nameValidation = validationHelper.required(newDocForm.display_name);
    newDocFormError.display_name = nameValidation.message;

    const fileValidation = validationHelper.required(newDocForm.file);
    newDocFormError.file = fileValidation.message;

    setNewDocError(newDocFormError);
    return nameValidation.isValid && fileValidation.isValid;
  };

  const handelNewFormSubmit = async () => {
    if (!handleNewDocSubmitValidation()) {
      return;
    }

    let baseFile = await fileToBase64(newDocForm?.file);
    const payload = {
      document_id: 0,
      userDocId: 0,
      display_name: newDocForm.display_name,
      file: `data:application/pdf;base64${baseFile}`,
    };
    // api call
    try {
      const res = await handleUpdateFile(payload);
      if (res.data.status == 1) {
        refetchProfileData();
        setIsDocFormOpen(false);
        setNewDocForm({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Box>
      <Card sx={{ marginTop: "25px" }}>
        <HeaderBox>
          <Box>
            <Text sx={{ color: "#101828", fontSize: "20px", fontWeight: 500 }}>
              Durgesh Kasle
            </Text>
          </Box>

          <Box>
            {editMode ? (
              <>
                <CancelButton variant="outlined" onClick={handleCancelClick}>
                  Cancel
                </CancelButton>
                <SaveButton variant="contained" onClick={handleSaveClick}>
                  Save
                </SaveButton>
              </>
            ) : (
              <EditButton variant="outlined" onClick={handleEditClick}>
                Edit Details
              </EditButton>
            )}
          </Box>
        </HeaderBox>

        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "32px 40px",
          }}
        >
          <AvatarBox>
            <Text sx={{ fontSize: "64px", fontWeight: 600, color: "#104960" }}>
              DK
            </Text>
          </AvatarBox>

          <Box sx={{ marginLeft: 8 }}>
            {userDetails?.map((detail, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <LabelText>{detail.label}:</LabelText>
                {editMode &&
                detail.key !== "joiningDate" &&
                detail.key !== "userType" ? (
                  <EditTextField
                    placeholder={detail.label}
                    size="small"
                    defaultValue={editedValues[detail.key]}
                    onChange={(e) =>
                      handleInputChange(detail.key, e.target.value)
                    }
                  />
                ) : (
                  <ValueText>{detail.value}</ValueText>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ padding: "32px 40px" }}>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DocumentText>Document </DocumentText>
            </Grid>

            {userDocuments?.map((item, index) => (
              <React.Fragment key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <DocumentNameText>Document name</DocumentNameText>
                    <TextField
                      // onChange={handleDocDataChange}
                      onChange={(e) =>
                        handleDocDataChange({
                          id: item.id,
                          value: e.target.value,
                          name: "display_name",
                        })
                      }
                      value={item.display_name}
                      sx={{ marginTop: "6px" }}
                      disabled
                    />
                  </Grid>
                  {item.isEdit ? (
                    <Grid item xs={5}>
                      <UploadDocText>Upload Document</UploadDocText>
                      <FileUpload
                        // handleChange={({ name, value }) => {
                        // 	handleFileSubmit({ ...item, file: value[0] });
                        // }}
                        handleChange={({ name, value }) => {
                          handleDocDataChange({
                            name: "updatedFile",
                            value: value[0],
                            id: item.id,
                          });
                        }}
                      ></FileUpload>
                    </Grid>
                  ) : (
                    <Grid item xs={5}>
                      <Stack
                        sx={{ width: "100%", height: "100%" }}
                        direction="row"
                        alignItems="flex-end"
                      >
                        <DownloadButton
                          handleDownload={() => {
                            setIsDownload(true);
                            downloadFile(item.userDocId);
                          }}
                        >
                          {item.fileName}
                        </DownloadButton>
                      </Stack>
                    </Grid>
                  )}
                  <Grid xs={2} spacing={2}>
                    <Stack
                      sx={{ width: "100%", height: "100%" }}
                      direction="row"
                      alignItems="flex-end"
                    >
                      {item.isEdit ? (
                        <Stack
                          direction="row"
                          ml={1}
                          mb={
                            newDocError?.file && newDocError?.display_name
                              ? 5.2
                              : 0.8
                          }
                          spacing={1}
                        >
                          <Button
                            size="large"
                            onClick={() => {
                              submitDocUpdate(item);
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            size="large"
                            onClick={() => {
                              handleDocEdit(item.id);
                            }}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      ) : (
                        <Box mx={1}>
                          <Button
                            variant="outlined"
                            size="medium"
                            startIcon={<EditIcon />}
                            sx={{ height: "51px" }}
                            onClick={() => {
                              handleDocEdit(item.id);
                            }}
                          >
                            Edit
                          </Button>
                        </Box>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
            {isDocFormOpen && (
              <>
                <Box sx={{ mt: 2, color: "#242424" }}>
                  <Text variant="subtitle2">Add New Document</Text>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <DocumentNameText>Document name</DocumentNameText>
                    <TextField
                      onChange={(e) =>
                        handleNewFormDataChange({
                          value: e.target.value,
                          name: "display_name",
                        })
                      }
                      value={newDocForm.display_name}
                      sx={{ marginTop: "6px" }}
                    />
                    {newDocError.display_name && (
                      <Text variant="small" sx={{ my: 1 }} color="red">
                        {newDocError.display_name}
                      </Text>
                    )}
                  </Grid>
                  <Grid item xs={5}>
                    <UploadDocText>Upload Document</UploadDocText>
                    <FileUpload
                      handleChange={({ name, value }) => {
                        handleNewFormDataChange({
                          name: "file",
                          value: value[0],
                        });
                      }}
                    ></FileUpload>
                    {newDocError.file && (
                      <Text variant="small" sx={{ my: 1 }} color="red">
                        {newDocError.file}
                      </Text>
                    )}
                  </Grid>
                  <Grid xs={2}>
                    <Stack
                      sx={{ width: "100%", height: "100%" }}
                      direction="row"
                      alignItems="flex-end"
                    >
                      <Stack
                        direction="row"
                        ml={1}
                        mb={
                          newDocError?.file && newDocError?.display_name
                            ? 5.2
                            : 0.8
                        }
                        spacing={1}
                      >
                        <Button
                          size="large"
                          onClick={() => {
                            handelNewFormSubmit();
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          size="large"
                          onClick={() => {
                            setIsDocFormOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        {!isDocFormOpen && (
          <AddDocumentButton
            onClick={() => {
              setIsDocFormOpen(true);
            }}
            variant="outlined"
          >
            + Add another document
          </AddDocumentButton>
        )}
      </Card>
      </Box>
    </>
  );
};

export default ProfileCard;
