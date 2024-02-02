import React, { useState } from "react";
import Box from "components/common/Box";
import Text from "components/common/Text";
import TextField from "components/common/TextField";
import FileUpload from "components/common/FileUpload";
import DatePicker from "components/common/DatePicker";
import Button from "components/common/Button";
import AddIcon from "@mui/icons-material/Add";
import DownloadButton from "components/common/DownloadButton";
import Grid from "components/common/Grid";
import { uuid } from "helpers/utility";
import StockDeleteIcon from "asset/icons/StockDeleteIcon";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const documentDividendDetails = {
  documentName: "",
};

const Additional = () => {
  const select = useSelector((state) => state);
  const user_id = select?.toast?.breadCrumbData?.user_id;
  const [postAdditionalDetails] =
    customersApiAction.postAdditionalDetails(user_id);
    const { data: getAdditionalDetails, isLoading, isError } = customersApiAction.getAdditionalDetails(user_id);
  const additionalDetail = getAdditionalDetails?.data ?? [];
  const [downloadDocAPI] = customersApiAction.postProfileDocApi(user_id);
  const [dobDate, setdobDate] = useState(additionalDetail?.dob);
  const elementHeight = 50;
  const [Documents, setDocuments] = useState([
    { ...documentDividendDetails, id: uuid() },
  ]);
  const [counter, setCounter] = useState(0);
  const [postData, setPostData] = useState({
    demat_acc_no: "",
    demat_acc_statement: "",
    bank_name: "",
    acc_no: "",
    nominee_name: "",
    nominee_relationship: "",
    dob: "",
    investment_policy_statement: "",
    documents: [],
    investment_policy_statement: "",
  });

  const handleFileInputChange = async (props) => {
    console.log("props", props);
    const selectedFile = props.files[0];
    const inputName = props.name;
    if (selectedFile) {
      const base64Content = await readFileAsync(selectedFile);
      const fileObject = {
        file: `data:application/pdf;base64${base64Content}`,
      };
      setPostData((prevPostData) => ({
        ...prevPostData,
        [inputName]: fileObject,
      }));
    }
  };

  const handleDownloadDoc = async (type) => {
    console.log("download function called");
    try {
      const requestBody = {
        user_id: user_id,
        type: type,
      };
      let res = await downloadDocAPI(requestBody).unwrap();
      console.log("API Response: ", res);
      const result = res?.result;
      if (result?.file) {
        console.log("download function called");
        const base64 = await fetch(result.file);
        const blob = await base64.blob();
        const a = document.createElement("a");
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = result.filename || "downloaded_file.png";
        a.click();
      } else {
        console.error("No file found in the API response.");
      }
    } catch (err) {
      console.error("Error during download:", err);
    }
  };

  const handleDocChange = async (props, index) => {
    const selectedFile = props.files[0];

    if (selectedFile) {
      const base64Content = await readFileAsync(selectedFile);

      const fileObject = {
        document_id: counter,
        document_name: postData.documents[index]?.document_name || "",
        file: base64Content,
      };

      setCounter((prevCounter) => prevCounter + 1);
      const updatedDocuments = [...postData.documents];
      updatedDocuments[index] = fileObject;

      setPostData((prevPostData) => ({
        ...prevPostData,
        documents: updatedDocuments,
      }));
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
  };

  const addDocument = () => {
    setDocuments((prevDocuments) => [
      ...prevDocuments,
      {
        ...documentDividendDetails,
        id: uuid(),
        document_id: counter,
        document_name: "",
        file: "",
      },
    ]);

    setPostData((prevPostData) => ({
      ...prevPostData,
      documents: [
        ...prevPostData.documents,
        {
          document_id: counter,
          document_name: "",
          file: "",
        },
      ],
    }));
  };

  const deleteDocument = (id) => {
    setDocuments(Documents.filter((Document) => Document.id !== id));
  };

  const handleDatePickerChange = (date) => {
    const dob = dayjs(date).format("YYYY-MM-DD");
    // setSelectedExpiryDate(expiryDate);
    setPostData((prevPostData) => ({
      ...prevPostData,
      dob: dob,
    }));
  };

  const handleInputChange = (e, field, index) => {
    if (
      index !== undefined &&
      index >= 0 &&
      index < postData.documents.length
    ) {
      const updatedDocuments = [...postData.documents];
      updatedDocuments[index].document_name = e.target.value;

      setPostData((prevPostData) => ({
        ...prevPostData,
        documents: updatedDocuments,
      }));
    } else {
      // Regular input field
      setPostData((prevData) => ({
        ...prevData,
        [field]: e.target.value,
      }));
    }
  };

  const handleAdditionalData = async () => {
    try {
      // Create a payload based on your desired structure
      const payload = {
        demat_acc_no: postData?.demat_acc_no,
        demat_acc_statement: postData?.demat_acc_statement.file,
        bank_name: postData?.bank_name,
        acc_no: postData?.acc_no,
        nominee_name: postData?.nominee_name,
        nominee_relationship: postData?.nominee_relationship,
        dob: postData?.dob,
        investment_policy_statement: postData?.investment_policy_statement.file,
        documents: postData?.documents.map((document) => ({
          document_id: document?.document_id,
          document_name: document?.document_name,
          document: document?.file,
        })),
      };

      // Now you can send the payload
      const result = await postAdditionalDetails({
        user_id,
        postData: payload,
      }).unwrap();
      console.log("Data saved successfully:", result);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Demat account number
            </Text>
            {additionalDetail?.demat_acc_no ? (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter demat account number"
                name="demat_acc_no"
                value={additionalDetail?.demat_acc_no}
              />
            ) : (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter demat account number"
                name="demat_acc_no"
                value={postData?.demat_acc_no}
                onChange={(e) => handleInputChange(e, "demat_acc_no")}
              />
            )}

            {/* // <TextField
            //   style={{ marginTop: "6px" }}
            //   placeholder="Enter demat account number"
            //   name="demat_acc_no"
            //   value={postData?.demat_acc_no}
            //   onChange={(e) => handleInputChange(e, "demat_acc_no")}
            // /> */}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Demat account statement
            </Text>
            {additionalDetail?.demat_acc_statement ? (
              <DownloadButton
                variant="outlined"
                onClick={() => handleDownloadDoc("DEMAT_ACC_STATEMENT")}
              >
                {additionalDetail?.demat_acc_statement}
              </DownloadButton>
            ) : (
              <FileUpload
                handleChange={({ name, value }) => {
                  // console.log("========", name, value);
                  handleFileInputChange({
                    name: "demat_acc_statement",
                    files: value,
                  });
                }}
                style={{ margiBottom: "10px", marginTop: "6px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1.5} style={{ marginTop: "0px" }}>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Bank Name
            </Text>
            {additionalDetail?.bank_name ? (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter Bank Name"
                name="bank_name"
                value={additionalDetail?.bank_name}
              />
            ) : (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter Bank Name"
                name="bank_name"
                value={postData?.bank_name}
                onChange={(e) => handleInputChange(e, "bank_name")}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Account number
            </Text>
            {additionalDetail?.acc_no ? (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter bank account number"
                name="acc_no"
                value={additionalDetail?.acc_no}
              />
            ) : (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter bank account number"
                name="acc_no"
                value={postData?.acc_no}
                onChange={(e) => handleInputChange(e, "acc_no")}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1.5} style={{ marginTop: "0px" }}>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Nominee Name
            </Text>
            {additionalDetail?.nominee_name ? (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter Nominee Name"
                name="nominee_name"
                value={additionalDetail?.nominee_name}
              />
            ) : (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter Nominee Name"
                name="nominee_name"
                value={postData?.nominee_name}
                onChange={(e) => handleInputChange(e, "nominee_name")}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Nominee Relationship
            </Text>
            {additionalDetail?.nominee_relationship ? (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter Nominee Relationship"
                name="nominee_relationship"
                value={additionalDetail?.nominee_relationship}
              />
            ) : (
              <TextField
                style={{ marginTop: "6px" }}
                placeholder="Enter Nominee Relationship"
                name="nominee_relationship"
                value={postData?.nominee_relationship}
                onChange={(e) => handleInputChange(e, "nominee_relationship")}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={1.5} style={{ marginTop: "0px" }}>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Date of birth
            </Text>
            {additionalDetail?.dob ? (
              <TextField
                value={dayjs(dobDate).format("YYYY-MM-DD") ?? ""}
                sx={{ width: "100%", height: "55px", marginTop: "6px" }}
              />
            ) : (
              <DatePicker
                onChange={handleDatePickerChange}
                sx={{ width: "100%", height: "55px", marginTop: "6px" }}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Investment policy statement
            </Text>
            {additionalDetail?.investment_policy_statement ? (
              <DownloadButton
                variant="outlined"
                onClick={() => handleDownloadDoc("investment_policy_statement")}
              >
                {additionalDetail?.demat_acc_statement}
              </DownloadButton>
            ) : (
              <FileUpload
                handleChange={({ name, value }) => {
                  handleFileInputChange({
                    name: "investment_policy_statement",
                    files: value,
                  });
                }}
                style={{
                  height: `${elementHeight}px !important`,
                  marginTop: "6px",
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      {/* <Grid container spacing={1.5} style={{ marginTop: "2px" }}>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Name of document
            </Text>
            <TextField
              placeholder="Enter Name of document"
              name="document_name"
              value={postData.document_name}
              onChange={(e) => handleInputChange(e)}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Text fontSize="16px" fontWeight="500">
              Upload document
            </Text>
            <DownloadButton variant="outlined">Download</DownloadButton>
          </Box>
        </Grid>
      </Grid> */}

      {Documents?.map((Document, index) => (
        <Grid container spacing={2} key={Document.id}>
          <Grid item xs={6}>
            <Box>
              <Text fontSize="16px" fontWeight="500">
                Document name
              </Text>
              {additionalDetail?.documents?.document_name ? (
                <TextField
                  style={{ marginTop: "6px" }}
                  placeholder="Enter Document Name"
                  value={additionalDetail?.documents?.document_name || ""}
                />
              ) : (
                <TextField
                  style={{ marginTop: "6px" }}
                  placeholder="Enter Document Name"
                  value={postData?.documents?.document_name || ""}
                  onChange={(e) => handleInputChange(e, "document_name", index)}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={index === 0 ? 6 : 5}>
            <Box>
              <Text fontSize="16px" fontWeight="500">
                Upload document
              </Text>
              {additionalDetail?.documents?.document_url ? (
                <DownloadButton
                  variant="outlined"
                  onClick={() => handleDownloadDoc("document_url")}
                >
                  {additionalDetail?.documents?.document_url}
                </DownloadButton>
              ) : (
                <FileUpload
                  handleChange={({ name, value }) => {
                    handleDocChange({ name: "document", files: value }, index);
                  }}
                  style={{ height: `${elementHeight}px !important` }}
                />
              )}
            </Box>
          </Grid>
          {index !== 0 ? (
            <Grid item md={1}>
              <Button
                variant="text"
                onClick={() => deleteDocument(Document.id)}
              >
                <StockDeleteIcon
                  sx={{
                    padding: "12px",
                    border: "1px solid #142E56",
                    borderRadius: "16px",
                    mt: "20px",
                  }}
                />
              </Button>
            </Grid>
          ) : null}
        </Grid>
      ))}

      <Box style={{ marginTop: "20px" }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addDocument}
        >
          Add another document
        </Button>
      </Box>
      <Grid item md={12} style={{ marginTop: "20px" }}>
        <Button
          onClick={handleAdditionalData}
          sx={{
            p: 2,
            width: "190px",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "8px",
          }}
        >
          Save
        </Button>
      </Grid>
    </div>
  );
};

export default Additional;
