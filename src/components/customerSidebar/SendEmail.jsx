import React, { useState} from "react";
import SideDrawer from "components/common/SideDrawer";
import Stack from "components/common/Stack";
import Button from "components/common/Button";
import Box from "components/common/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Text from "components/common/Text";
import Checkbox from "components/common/Checkbox";
import NewTextField from "../common/TextField";
import FileUpload from "components/common/FileUpload";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";

const styles = {
  resize: {
    fontSize: 10,
  },
};

const SendEmail = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dataShow = customersApiAction.getProductId();
  const checkboxData = dataShow?.data?.products;
  const [postSemndEmailData] = customersApiAction.postEmailApi();
  const [formData, setFormData] = useState({
    product_id: [],
    mailHeader: "",
    mailContent: "",
    mailAttachment: [
      {
        filename: "",
        content: "",
        contentType: "",
      },
    ],
  });
  
  const handleCheckboxChange = (type, product_id) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      if (!updatedData[type]) {
        updatedData[type] = [];
      }
      if (updatedData[type].includes(product_id)) {
        updatedData[type] = updatedData[type].filter((id) => id !== product_id);
      } else {
        updatedData[type] = [...updatedData[type], product_id];
      }
      return updatedData;
    });
  };

  const handleInputChange = (e, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleFileSubmit = async (props) => {
    const selectedFiles = props.files;
    console.log("check for multiple files", selectedFiles);
    if (selectedFiles && selectedFiles.length > 0) {
      const filesArray = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const base64String = await fileToBase64(file);
        filesArray.push({
          filename: file.name,
          content: base64String,
          // contentType: file.type,
          contentType: "base64",
        });
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        mailAttachment: filesArray,
      }));
      console.log("Mail Attachments:", filesArray);
    } else {
      console.error("No files provided in handleFileSubmit.");
    }
  };

  const fileToBase64 = (file) => {
    if (file) {
      return new Promise((resolve) => {
        let baseURL = "";

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
          baseURL = reader.result.substr(reader.result.indexOf(",") + 1);

          resolve(baseURL);
        };
      });
    }
    return null;
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // const handleFileInputChange = async (e) => {
  //   const selectedFiles = e.target.files;
  //   const filesArray = [];

  //   for (let i = 0; i < selectedFiles.length; i++) {
  //     const file = selectedFiles[i];

  //     const base64Content = await readFileAsync(file);

  //     filesArray.push({
  //       filename: file.name,
  //       content: base64Content,
  //       // contentType: file.type,
  //       contentType: "base64",
  //     });
  //   }

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     mailAttachment: filesArray,
  //   }));

  //   console.log("Mail Attachments:", filesArray);
  // };

  // convert Base64String
  // const readFileAsync = (file) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result.split(",")[1]);
  //     reader.readAsDataURL(file);
  //   });
  // };

  const handleSendEmailData = async () => {
    try {
      const result = await postSemndEmailData(formData);
      setIsDrawerOpen(false);
      setFormData('')
      console.log("Data saved successfully:", result);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Stack>
      <Button
        sx={{ fontWeight: 600, borderRadius: "8px", p: 1, width: "140px" }}
        onClick={openDrawer}
        startIcon={<EmailOutlinedIcon />}
      >
        Send Email
      </Button>
      {isDrawerOpen && (
        <SideDrawer
          anchor="right"
          open={isDrawerOpen}
          closeDrawer={closeDrawer}
          title="Send Email"
          contentTitle=""
          handleSubmit={handleSendEmailData}
          cancelButtonText="Cancel"
          submitButtonText="Send"
          subtitle="Here you can create email and send to customers."
        >
          <Box>
            <Text
              variant="small"
              component="h4"
              fontSize="16px"
              fontWeight="500"
            >
              Send email to customers of
            </Text>
            <Stack
              direction="row"
              justifyContent="space-between"
              style={{ marginLeft: "15px" }}
            >
              {(checkboxData ?? []).length > 0 && checkboxData.map((items, i) => (
                <Checkbox
                  key={items.product_id}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Text
                        variant="small"
                        fontWeight="400"
                        fontSize="14px"
                        style={{ marginLeft: "10px" }}
                      >
                        {items?.product_name}
                      </Text>
                    </Box>
                  }
                  size="small"
                  name="sendData"
                  checked={formData?.product_id?.includes(items.product_id)}
                  onChange={() =>
                    handleCheckboxChange("product_id", items.product_id)
                  }
                />
              ))}
            </Stack>
          </Box>
          <Box sx={{ m: 2 }}>
            <Text
              variant="small"
              component="h4"
              fontSize="16px"
              fontWeight="500"
              marginBottom="3px"
            >
              Subject
            </Text>
            <NewTextField
              placeholder="Enter subject here"
              name="mailHeader"
              value={formData.mailHeader}
              onChange={(e) => handleInputChange(e, "mailHeader")}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ m: 2 }}>
            <Text
              variant="small"
              component="h4"
              fontSize="16px"
              fontWeight="500"
              marginBottom="3px"
            >
              Brief
            </Text>
            <NewTextField
              inputProps={{ style: { fontSize: "14px" } }}
              placeholder="Enter brief of the remark here"
              multiline
              rows={4}
              name="mailContent"
              value={formData.mailContent}
              onChange={(e) => handleInputChange(e, "mailContent")}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ m: 2 }}>
            <Text
              variant="small"
              component="h4"
              fontSize="16px"
              fontWeight="500"
            >
              Any mailAttachment
            </Text>
            <FileUpload
              multipleFiles={true}
              handleChange={({ mailAttachment, value }) => {
                console.log("========", mailAttachment, value);
                handleFileSubmit({ files: value });
              }}
              sx={{ width: "100%" }}
            />
            {/* <FileUpload
              multipleFiles={true}
              handleChange={({ mailAttachment, value }) => {
                console.log("========", mailAttachment, value);
                handleFileSubmit({ file: value });
              }}
              // multiple
              // onChange={handleFileInputChange}
              // label=""
              // name="mailAttachment"
              // type="file"
              // handleChange={handleFileInputChange}
              sx={{ width: "100%" }}
            /> */}
          </Box>
        </SideDrawer>
      )}
    </Stack>
  );
};

export default SendEmail;
