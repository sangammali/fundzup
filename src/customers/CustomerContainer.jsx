import Box from "components/common/Box";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Button from "components/common/Button";
import ImportIcon from "asset/icons/ImportIcon";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import NewDialog from "components/common/Dialog";
import * as XLSX from "xlsx";
import SendEmail from "../components/customerSidebar/SendEmail";
import AddFilter from "../components/customerSidebar/AddFilter";
import FileUpload from "components/common/DragNdDrop";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "components/common/TextField";
import CustomGrid from "components/datagrid/CustomGrid";
import ViewCustomer from "../components/customerSidebar/ViewCustomer";
import { useNavigate } from "react-router";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/system";
import Paper from "components/common/Paper";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import editIcon from "asset/icons/edit.svg";
import PlayForWorkIcon from "@mui/icons-material/PlayForWork";
import Right_CLick from "asset/icons/Right_Click.svg";
import Avatar from "components/common/Avatar";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import { toastActions } from "stores/redux/slices/toastSlice";
import { useSelector } from "react-redux";

const StyledDataGrid = styled(CustomGrid)(({ theme }) => ({
  "& .super-app-theme--approve": {
    backgroundColor: "lightgreen",
  },
  "& .super-app-theme--not-approve": {
    backgroundColor: "lightcoral",
  },
}));

const ChipStyle = styled(Chip)(({ theme, riskprofile }) => {
  let backgroundColor;
  let color;
  if (riskprofile === "Aggresssive") {
    backgroundColor = "#FFEDED";
    color = "#EB5757";
  } else if (riskprofile === "Moderate") {
    backgroundColor = "#FFF5E0";
    color = "#E58026";
  } else if (riskprofile === "Conservative") {
    backgroundColor = "#DEFFEC";
    color = "#219653";
  }

  return {
    display: "flex",
    alignItems: "center",
    borderRadius: "152px",
    backgroundColor: backgroundColor,
    color: color,
    fontSize: "12px",
    padding: "8px",
    fontWeight: 500,
    "&::before": {
      position: "relative",
      left: 5,
      bottom: 6,
      content: '"\\2022"',
      width: "6px",
      height: "6px",
      color: color,
    },
  };
});

const ActiveChipStyle = styled(Chip)(({ theme, auto_trade }) => {
  let backgroundColor;
  let color;
  if (auto_trade === "ACTIVE") {
    backgroundColor = "#DEFFEC";
    color = "#219653";
  } else if (auto_trade === "INACTIVE") {
    backgroundColor = "#FFEDED";
    color = "#EB5757";
  }

  return {
    display: "flex",
    alignItems: "center",
    borderRadius: "152px",
    backgroundColor: backgroundColor,
    color: color,
    fontSize: "12px",
    padding: "8px",
    fontWeight: 500,
    "&::before": {
      position: "relative",
      left: 5,
      bottom: 6,
      content: '"\\2022"',
      width: "6px",
      height: "6px",
      color: color,
    },
  };
});

export const importTableHeader = [
  {
    field: "name",
    headerName: "name",
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" textAlign="center">
        <Text color="#242424" fontSize="14px" fontWeight="500">
          {" "}
          {params?.row?.name}
        </Text>
      </Stack>
    ),
  },
  {
    field: "contactDetail",
    headerName: "Contact Detail",
    flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction="column">
          <Text
            color="#676C76"
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
          >
            {params?.row?.email}
          </Text>
          <Text
            color="#676C76"
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
            marginTop="2px"
          >
            {params?.row?.mobile}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "investmenttype",
    headerName: "Investment Type",
    flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction="column">
          <Text
            color="#6F6F6F"
            fontWeight="500"
            fontSize="14px"
            alignItems="textCenter"
          >
            {params?.row?.investmenttype}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "plancode",
    headerName: "Plan Code",
    flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction="column">
          <Text
            color="#6F6F6F"
            fontWeight="500"
            fontSize="12px"
            alignItems="textCenter"
          >
            {params?.row?.plancode}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "capital",
    headerName: "Capital",
    flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction="column">
          <Text
            color="#6F6F6F"
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
          >
            {params?.row?.capital}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "riskprofile",
    headerName: "Risk Profile",
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" textAlign="center">
        <ChipStyle
          label={params?.row?.riskprofile}
          size="small"
          riskprofile={params?.row?.riskprofile}
        />
      </Stack>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" marginLeft="20px">
        <Avatar style={{ width: "20px", height: "20px" }} src={editIcon} />
      </Stack>
    ),
  },
];

const tableHeaderData = [
  {
    field: "investment_type",
    headerName: "Type",
    flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction="column">
          <Text
            color="#6F6F6F"
            fontWeight="500"
            fontSize="16px"
            alignItems="textCenter"
          >
            {params?.row?.investment_type}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "name",
    headerName: "Customer Name",
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" textAlign="center">
        {params?.row?.is_self_onboard === "True" ? (
          <Text color="#242424" fontSize="14px" fontWeight="500">
            {" "}
            {params?.row?.name}
          </Text>
        ) : (
          <Text color="#242424" fontSize="14px" fontWeight="500">
            {params?.row?.name}
            {"*"}
          </Text>
        )}
      </Stack>
    ),
  },
  {
    field: "contactDetail",
    headerName: "Contact Detail",
    flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction="column">
          <Text
            color="#676C76"
            fontWeight="500"
            fontSize="14px"
            alignItems="textCenter"
          >
            {params?.row?.email}
          </Text>
          <Text
            color="#676C76"
            fontWeight="500"
            fontSize="14px"
            alignItems="textCenter"
            marginTop="2px"
          >
            {params?.row?.mobile}
          </Text>
        </Stack>
      </>
    ),
  },
  // {
  //   field: "capital",
  //   headerName: "Capital",
  //   flex: 1,
  //   renderCell: (params) => (
  //     <>
  //       <Stack direction="column">
  //         <Text
  //           color="#676C76"
  //           fontWeight="400"
  //           fontSize="14px"
  //           alignItems="textCenter"
  //         >
  //           {params?.row?.capital}
  //         </Text>
  //       </Stack>
  //     </>
  //   ),
  // },
  {
    field: "leverage",
    headerName: "Leverage",
    flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction="column">
          <Text
            color="#676C76"
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
          >
            {params?.row?.leverage}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "current_value",
    headerName: "Current value",
    flex: 1,
    renderCell: (params) => (
      <>
        <Stack direction="column">
          <Text
            color="#676C76"
            fontWeight="400"
            fontSize="14px"
            alignItems="textCenter"
          >
            {params?.row?.current_value}
          </Text>
        </Stack>
      </>
    ),
  },
  {
    field: "risk_profile",
    headerName: "Risk Profile",
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" textAlign="center">
        {params?.row?.risk_profile ? (
          <ChipStyle
            label={params?.row?.risk_profile}
            size="small"
            riskprofile={params?.row?.risk_profile}
          />
        ) : (
          ""
        )}
      </Stack>
    ),
  },
  {
    field: "auto_trade",
    headerName: "Auto Trade Status",
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" textAlign="center">
        <ActiveChipStyle
          label={params?.row.auto_trade}
          size="small"
          auto_trade={params?.row?.auto_trade}
        />
      </Stack>
    ),
  },
];

const CustomerContainer = () => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [congratsModalOpen, setCongratsModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customerId, setCustomerId] = useState(0);
  const [viewData, setViewData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [getCustomerListApi] = customersApiAction.getCustomerListApi();
  const [getCustomerSearchingData] =
    customersApiAction.getCustomerSearchingData();
  const [postImportFileData] = customersApiAction.postImportFile();
  const [postAttachImportFileData] = customersApiAction.postAttachImportFile();
  const [customersData, setCustomersData] = useState([]);
  const [importListData, setImportListData] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);
  const [postData, setPostData] = useState({
    search: "",
    capital_from: "",
    capital_to: "",
    investment_type: "",
    plan_status: "",
    risk_profile: "",
    skip: "0",
    take: "10",
  });

  const dispatch = useDispatch();
  const select = useSelector((state) => state);
  // const [filterTableData, setFilterTableData] = useState([]);

  const searchingToServer = async () => {
    try {
      const result = await getCustomerSearchingData(postData);
      console.log(
        "apply filter successfully:",
        result?.data?.result?.customers
      );
      setCustomersData(result?.data?.result?.customers);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleInputChange = (e, field) => {
    setPostData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
    debouncedFetchData();
  };
  const debouncedFetchData = debounce(searchingToServer, 500);

  const filterTableData =
    select?.toast?.filterTableData?.data?.result?.customers;

  // const getCustomers = async () => {
  //   const payload = {};
  //   let result = await getCustomerListApi(postData).unwrap();
  //   setCustomersData(result?.result?.customers);
  // };

  // useEffect(() => {
  //   console.log("checked for APifetch")
  //   // getCustomers();
  // }, []);

  //  useEffect(() => {
  //   const newFilterTableData = select?.toast?.filterTableData?.data?.result?.customers;
  //   setFilterTableData(newFilterTableData);

  //   // Cleanup logic when the component is unmounted or before page is refreshed
  //   const cleanup = () => {
  //     setFilterTableData([]);
  //   };

  //   // Add the cleanup function to be executed when the component is unmounted or before page refresh
  //   return cleanup;
  // }, []);

  const saveDataToServer = async () => {
    try {
      const result = await postAttachImportFileData(importListData);
      console.log("Data saved successfully:", result);
      setImportListData([]);
      setCongratsModalOpen(true);
      setSaveModalOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSaveClick = () => {
    saveDataToServer(importListData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!attachedFile) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", attachedFile);
    try {
      const response = await postImportFileData(formData).unwrap();
      console.log("res", response?.result?.customer);
      setImportListData(response?.result?.customer);
      setSaveModalOpen(true);
      setCongratsModalOpen(false);
      setImportModalOpen(false);
    } catch (error) {
      console.error("Error importing file", error);
    }
  };
  console.log("importData", importListData);

  const handleChange = (props) => {
    setAttachedFile(props.files[0]);
    // setAttachedFile(e.target.files[0]);
  };

  const hadndleCongrats = () => {
    setSaveModalOpen(false);
    setCongratsModalOpen(false);
    setImportModalOpen(false);
  };

  const handleCancel = () => {
    setSaveModalOpen(false);
    setCongratsModalOpen(false);
    setImportModalOpen(false);
  };

  const getCustomers = async () => {
    const payload = {};
    let result = await getCustomerListApi(postData).unwrap();
    setCustomersData(result?.result?.customers);
  };

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getCustomers();
    }
  }, []);

  // useEffect(() => {
  //   console.log("checked for APifetch")
  //   getCustomers();
  // }, []);

  console.log("filterTableData checked here", filterTableData);

  return (
    <div>
      <Paper sx={{ borderRadius: "16px", mb: 4, mt: 2, height: "auto" }}>
        <Box style={{ padding: "15px" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1.5}
            sx={{ width: "100%" }}
            alignItem="center"
            style={{ marginTop: "10px" }}
          >
            <Box>
              <Stack direction="row">
                <Text fontSize="20px" fontWeight="600">
                  Customers
                </Text>
                <Chip
                  style={{
                    marginLeft: "5px",
                    height: "25px",
                    width: "25%",
                    textAlign: "center",
                    marginTop: "3px",
                  }}
                  color="secondary"
                  label={
                    <Text style={{ fontSize: "12px" }}>{`200 Customers`}</Text>
                  }
                ></Chip>
              </Stack>
              <Text fontSize="15px" fontWeight="400" color="#667085">
                Here you can view and add customer manually or by importing.
              </Text>
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItem="center"
              spacing={1.5}
              style={{ marginTop: "10px" }}
            >
              <Button
                variant="outlined"
                startIcon={<ImportIcon />}
                onClick={() => {
                  setImportModalOpen(true);
                }}
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                  p: 1,
                  width: "180px",
                }}
              >
                Import Customers
              </Button>

              {/* Import Modal */}
              <NewDialog
                onClose={() => setImportModalOpen(false)}
                open={importModalOpen}
                title={
                  <Text fontSize="16px" fontWeight="600" marginBottom="-15px">
                    Upload and attach file
                  </Text>
                }
                disableCloseIcon
                maxWidth="sm"
                contentComponent={() => (
                  <div>
                    <Text fontSize="12px" fontWeight="500" color="#667085">
                      Rorem ipsum dolor sit amet, consectetur adipiscing elit .
                    </Text>
                    <FileUpload
                      // id="fileID"
                      // name="filedata"
                      handleChange={({ mailAttachment, value }) => {
                        handleChange({ files: value });
                      }}
                      // onChange={handleChange}
                      // type="file"
                    />
                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                      marginTop="10px"
                    >
                      <PlayForWorkIcon />
                      <a
                        href="document_format.csv"
                        target="_blank"
                        style={{
                          textDecoration: "underline",
                          fontWeight: "600",
                          color: "#242424",
                        }}
                      >
                        Download format here
                      </a>
                    </Stack>
                    {/* <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                /> */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      marginTop="15px"
                      spacing={1}
                    >
                      <Button
                        sx={{
                          width: "60%",
                          fontWeight: 600,
                          borderRadius: "8px",
                          p: 2,
                        }}
                        variant="outlined"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        sx={{
                          width: "60%",
                          fontWeight: 600,
                          borderRadius: "8px",
                          p: 2,
                        }}
                        onClick={onSubmit}
                      >
                        Attach Files
                      </Button>
                    </Stack>
                  </div>
                )}
              />

              <NewDialog
                onClose={() => setSaveModalOpen(false)}
                open={saveModalOpen}
                title={
                  <Text fontSize="18px" fontWeight="500">
                    Preview of your excel file
                  </Text>
                }
                disableCloseIcon
                maxWidth="lg"
                contentComponent={() => (
                  <div>
                    <CustomGrid
                      autoHeight
                      list={importListData.map((item, index) => ({
                        ...item,
                        id: index + 1,
                      }))}
                      getRowId={(row) => row.id}
                      columnHeaderHeight={46}
                      rowHeight={72}
                      columns={importTableHeader}
                      rowCount={importListData.length}
                      pagination={false}
                    />
                  </div>
                )}
                actionComponent={() => (
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    style={{ backgroundColor: "#E5EEFF", margin: "10px" }}
                  >
                    <Button
                      sx={{
                        width: "200px",
                        fontWeight: 600,
                        borderRadius: "8px",
                        p: 1,
                        m: 2,
                      }}
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{
                        width: "200px",
                        fontWeight: 600,
                        borderRadius: "8px",
                        p: 1,
                        m: 2,
                      }}
                      onClick={handleSaveClick}
                    >
                      Add customers
                    </Button>
                  </Stack>
                )}
              />
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
                    <Avatar
                      style={{ width: "50px", height: "50px" }}
                      src={Right_CLick}
                    />
                    <Stack p={1} textAlign="center">
                      <Text fontSize="20px" fontWeight="600">
                        Customers have been added successfully !
                      </Text>
                      <Text
                        fontSize="14px"
                        fontWeight="400"
                        color="#667085"
                        padding="10px"
                      >
                        The customer have been added and now they can start
                        their <br />
                        investing journey.
                      </Text>
                    </Stack>
                    <Button
                      sx={{
                        width: "90%",
                        fontWeight: 600,
                        borderRadius: "8px",
                        p: 2,
                        m: 2,
                      }}
                      onClick={hadndleCongrats}
                    >
                      Okay
                    </Button>
                  </Stack>
                )}
              />
              <SendEmail />
            </Stack>
          </Stack>
        </Box>
        <Box px="15px">
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1.5}
            sx={{ width: "100%" }}
            alignItem="center"
            style={{ marginTOp: "50px" }}
          >
            <Box style={{ width: "500px", marginTop: "10px" }}>
              <Stack direction="row">
                <TextField
                  sx={{ maxWidth: "500px" }}
                  placeholder="Search"
                  value={postData.search}
                  name="search"
                  onChange={(e) => handleInputChange(e, "search")}
                />
                <SearchIcon
                  style={{
                    position: "relative",
                    left: "-42px",
                    marginTop: "12px",
                    color: "#676C76",
                  }}
                />
              </Stack>
            </Box>
            <AddFilter />
          </Stack>
        </Box>
        <Stack style={{ marginTop: "15px" }}>
          <StyledDataGrid
            sx={{ cursor: "pointer" }}
            autoHeight
            list={customersData}
            // list={filterTableData?.length === 0?customersData : filterTableData}
            columnHeaderHeight={45}
            rowHeight={72}
            columns={tableHeaderData}
            // rowCount={filterTableData?.length === 0?customersData?.length : filterTableData?.length}
            rowCount={customersData?.length}
            getRowId={(row) => row?.user_id}
            getRowClassName={(params) => {
              return params?.row?.approve
                ? "super-app-theme--approve"
                : "super-app-theme--not-approve";
            }}
            onCellClick={(e) => {
              if (e && e?.row?.is_self_onboard === "False") {
                setIsDrawerOpen(true);
                setCustomerId(e?.row?.user_id);
                setViewData(e.row);
                // navigate(`/customer-detail`, { state: { data: e?.row } });
              } else if (e && e?.row?.is_self_onboard === "True") {
                setIsOpen(true);
                setViewData(e?.row);
                setCustomerId(e?.row?.user_id);
                navigate(`/customer-detail`);
                dispatch(toastActions.setBreadCrumbData(e?.row));
              } else {
                return "";
              }
            }}
          />
        </Stack>
        {customerId === 0 ? (
          ""
        ) : (
          <ViewCustomer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            customerId={customerId}
            setCustomerId={setCustomerId}
            // viewData={viewData}
          />
        )}
      </Paper>
    </div>
  );
};

export default CustomerContainer;
