import React, { useEffect, useRef, useState } from "react";
import TradeCard from "components/dashboard/TradeCard";
import Box from "components/common/Box";
import Grid from "components/common/Grid";
import Stack from "components/common/Stack";
import InvestmentTypeCard from "components/dashboard/InvestmentTypeCard";
import InvestmentStats from "components/dashboard/InvestmentStats";
import DashboardHeader from "components/dashboard/DashboardHeader";
import { dummyTableData, columns } from "helpers/constants";
import CustomGrid from "components/datagrid/CustomGrid";
import Text from "components/common/Text";
import Chip from "@mui/material/Chip";
import TradeCallStats from "components/dashboard/TradeCallStats";
import { dashboardApiAction } from "stores/redux/apiSlices/dashboard/dashboardApiSlice";
import { styled } from "@mui/system";
import { customersApiAction } from "stores/redux/apiSlices/customers/customersApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Paper, debounce } from "@mui/material";
import Button from "components/common/Button";
import ImportIcon from "asset/ImportIcon";
import { FileUpload } from "@mui/icons-material";
import ViewCustomer from "components/customerSidebar/ViewCustomer";
import { toastActions } from "stores/redux/slices/toastSlice";
import TextField from "components/common/TextField";
import { useLocation } from "react-router-dom";
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
const graphCardData = [
  {
    id: 1,
    name: "Trade call stats",
    display: "column",
    xs: 6,
  },
];

const graphCardData1 = [
  {
    id: 1,
    name: "Investment Stats",
    display: "column",
    xs: 6,
  },
];

const DashBoardContainer = () => {
  const location = useLocation();
  // const { userName } = location.state || {};
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

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
  const [userName, setUserName] = useState("");

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

  useEffect(() => {
    // Retrieve the user's name from local storage
    const storedUserName = localStorage.getItem("userName");

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

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
  const { data: dashboardData = {} } =
    dashboardApiAction.getDashboardApi();

  const handleDateRangeChange = (newDateRange) => {
    // Format the start and end dates in DD/MM/YYYY format
    const startDate = newDateRange[0]
      ? newDateRange[0].toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "";

    const endDate = newDateRange[1]
      ? newDateRange[1].toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "";

    // Do something with the formatted dates
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // Handle the logic or state in DashBoardContainer when the date range changes
    setSelectedDateRange(newDateRange);
  };
  // const data = dashboardData;
  // console.log(data, "datadashboard");

  const cardData = [
    {
      id: 1,
      name: "Trade Calls",
      value: dashboardData?.tradecall,
      chart: "/images/ProfitChart.svg",
      display: "column",
      xs: 4,
    },
    {
      id: 2,
      name: "Total profit of customers",

      value: dashboardData?.totalprofit,
      percentage: dashboardData?.totalprofitpercent,
      chart: "/images/ProfitChart.svg",
      display: "flex",
      xs: 4,
    },
    {
      id: 3,
      name: "Tax P/L",
      value: dashboardData?.taxpl,
      percentage: dashboardData?.taxplpercent,
      chart: "/images/LossChart.svg",
      xs: 4,
    },
  ];

  const investmentCardData = (dashboardData?.products || []).map((product) => ({
    id: 1,
    name: product.productname,
    value1: "Customers",
    value2: "Amount invested",
    value3: product.customercount, // Adjust as needed
    value4: `₹ ${product.amount}`, // Adjust as needed
    percentage: `${product.percent}%`, // Adjust as needed
    display: "column",
    xs: 4,
  }));
  if (!dashboardData?.tradecallsstats) {
    return (
      <div>
        {" "}
        <DashboardHeader
          handleDateRangeChange={handleDateRangeChange}
          userName={userName}
        />
      </div>
    );
  }

  const pieData = (dashboardData?.tradecallsstats || []).map(
    (TradeCallStats) => [
      { id: 0, value: TradeCallStats.noofcalls },
      { id: 1, value: TradeCallStats.actiontaken },
    ]
  );
  const investmentChart = (dashboardData?.investmentstats || []).map(
    (investmentstats) => ({
      profit: investmentstats.amount,
      amount: investmentstats.profit,
    })
  );

  const CustomerHeader = () => {
    return (
      <>
        <Box sx={{ p: 2 }}>
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
              Customers{" "}
            </Text>
            <Chip color="secondary" label={`200 Customers`}></Chip>
          </Stack>
          <Text variant="small" sx={{ color: "#667085" }}>
            Here you can view and add customers manually or by importing.
          </Text>
        </Box>
      </>
    );
  };

  const CustomerFooter = () => {
    return (
      <>
        <Stack
          direction="row"
          justifyContent="center"
          alignItem="center"
          sx={{ padding: "12px 24px 16px 24px" }}
        >
          <Text
            variant="small"
            color="primary"
            sx={{
              textDecoration: "underline",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            View All
          </Text>
        </Stack>
      </>
    );
  };

  const TradeHeader = () => {
    return (
      <>
        <Box sx={{ p: 2 }}>
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
              Trades{" "}
            </Text>
            <Chip color="secondary" label={`50 Trades`}></Chip>
          </Stack>
          <Text variant="small" sx={{ color: "#667085" }}>
            Here you can view and add customers manually or by importing.
          </Text>
        </Box>
      </>
    );
  };

  const TradeFooter = () => {
    return (
      <>
        <Stack
          direction="row"
          justifyContent="center"
          alignItem="center"
          sx={{ padding: "12px 24px 16px 24px" }}
        >
          <Text
            variant="small"
            color="primary"
            sx={{
              textDecoration: "underline",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            View All
          </Text>
        </Stack>
      </>
    );
  };

  return (
    <>
      <DashboardHeader
        handleDateRangeChange={handleDateRangeChange}
        userName={userName}
      />

      <Grid sx={{ mb: 3 }} container spacing={2}>
        {cardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <TradeCard data={element} />
          </Grid>
        ))}
      </Grid>

      <Grid sx={{ mb: 3 }} container spacing={2}>
        {investmentCardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <InvestmentTypeCard data={element} />
          </Grid>
        ))}
      </Grid>

      <Grid sx={{ mb: 3 }} container spacing={2}>
        {graphCardData.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <InvestmentStats data={element} pieData={pieData} />
          </Grid>
        ))}
        {graphCardData1.map((element, index) => (
          <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
            <TradeCallStats data={element} investmentChart={investmentChart} />
          </Grid>
        ))}
      </Grid>
      {/* <DateRangePickerComponent/> */}

      {/* <Box sx={{ mb: 2.5 }}>
        <CustomGrid
          autoHeight
          list={dummyTableData}
          columnHeaderHeight={46}
          rowHeight={46}
          columns={columns}
          rowCount={dummyTableData.length}
          pagination={false}
          header={CustomerHeader}
          footer={CustomerFooter}
        />
      </Box> */}
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
              </Stack>
            </Box>
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
              if (e && e?.row?.is_self_onboard === "True") {
                setIsDrawerOpen(true);
                setCustomerId(e?.row?.user_id);
                setViewData(e.row);
                // navigate(`/customer-detail`, { state: { data: e?.row } });
              } else if (e && e?.row?.is_self_onboard === "False") {
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

      <Box>
        <CustomGrid
          autoHeight
          list={dummyTableData}
          columnHeaderHeight={46}
          rowHeight={46}
          columns={columns}
          rowCount={dummyTableData.length}
          pagination={false}
          header={TradeHeader}
          footer={TradeFooter}
        />
      </Box>
    </>
  );
};

export default DashBoardContainer;
