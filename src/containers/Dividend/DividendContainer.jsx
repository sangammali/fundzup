import React, { useState, useEffect } from "react";
import Box from "components/common/Box";
import TextField from "components/common/TextField";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import IconButton from "components/common/IconButton";
import CustomGrid from "components/datagrid/CustomGrid";
import EditIcon from "asset/icons/EditIcon";
import Button from "components/common/Button";
import SideDrawer from "components/common/SideDrawer";
import { dividendApiAction } from "stores/redux/dividend/dividendApiSlice";
import DatePicker from "components/common/DatePicker";
import { profileApiAction } from "stores/redux/riaProfile/riaProfileSlice";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import { validationHelper } from "helpers/validation";
import dayjs from "dayjs";
import styled from "@emotion/styled";

const HeaderBox = styled(Box)(({}) => ({
  display: "flex",
  padding: "24px",
  justifyContent: "space-between",
}));
const DividendText = styled(Text)(({}) => ({
  color: "primary",
  marginRight: 1,
  fontWeight: 500,
  fontSize: "18px",
}));
const AddDividendBtn = styled(Button)(({}) => ({
  padding: "10px 16px",
  width: "155px",
  height: "40px",
  borderRadius: "8px",
}));
const StockNameText = styled(Text)(({}) => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "6px",
}));
const ExDividendText = styled(Text)(({}) => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "6px",
}));
const DividendpercText = styled(Text)(({}) => ({
  color: "#242424",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "6px",
}));

function DividendContainer() {
  const [isDrawerAddDividend, setDrawerAddDividend] = useState(false);
  const [stockName, setStockName] = useState("");
  const [exDividendDate, setExDividendDate] = useState(null);
  const [dividendPercentage, setDividendPercentage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDividendId, setSelectedDividendId] = useState(null);

  const { data: profileData, refetch } = profileApiAction.getProfileApi();

  const [addFormError, setAddFormError] = useState({
    stockName: "",
    dividendDate: "",
    dividendPerc: "",
  });
  const { data: dividendData = {}, refetch: getDividendDetails } =
    dividendApiAction.getDividendApi();

  // here we are calling the Company data API
  const { data: companyData = {} } = dividendApiAction.getCompanyApi();
  const data = companyData;
  console.log(data, "companydata");

  //Apis call
  const [handleAddDividendApi] = dividendApiAction.addDividendApi();
  const [handleUPDATEDividendApi] = dividendApiAction.updateDividendApi();

  useEffect(() => {
    getDividendDetails();
  }, []);

  const handleEdit = (rowData) => {
    const dividendId = rowData.dividend_id || null;
    setSelectedDividendId(dividendId);
    setStockName(rowData.symbol || "");
    setExDividendDate(new Date(rowData.date) || null);
    setDividendPercentage(rowData.percentage || "");
    setIsEditing(true);
    setDrawerAddDividend(true);
  };

  const handleAddValidation = () => {
    let newAddError = { ...addFormError };
    const stockValidation = validationHelper.required(stockName);
    newAddError.stockName = stockValidation.message;
    const dateValidation = validationHelper.required(exDividendDate);
    newAddError.dividendDate = dateValidation.message;
    const dividendValidation = validationHelper.required(dividendPercentage);
    console.log("dividendValidation perc : ", dividendValidation);
    newAddError.dividendPerc = dividendValidation.message;

    setAddFormError(newAddError);

    return (
      stockValidation.isValid &&
      dateValidation.isValid &&
      dividendValidation.isValid
    );
  };

  const handleSave = async () => {
    if (!handleAddValidation()) {
      console.log("inside validation");
      return;
    }

    try {
      if (isEditing && selectedDividendId) {
        const payload = {
          dividend_id: selectedDividendId,
          stock_symbol: stockName.symbol,
          date: exDividendDate,
          percentage: parseInt(dividendPercentage),
        };
        console.log(payload, "%payload");
        console.log(payload.date, "DATTTTTTTTTTTEEEEEEE");
        const res = await handleUPDATEDividendApi(payload);
        if (res.data.status === 1) {
          getDividendDetails();
        }
      } else {
        const payload = {
          stock_symbol: stockName.symbol,
          date: dayjs(exDividendDate).format("YYYY-MM-DD"),
          percentage: parseInt(dividendPercentage),
        };
        const res = await handleAddDividendApi(payload);
        if (res.data.status === 1) {
          getDividendDetails();
          setStockName("");
          setExDividendDate("");
          setDividendPercentage("");
        }
      }
    } catch (error) {}
    // Reset states after API call
    setDrawerAddDividend(false);
    setIsEditing(false);
    setSelectedDividendId(null);
  };
  const AddDividendDrawer = () => {
    setDrawerAddDividend(true);
    setIsEditing(false);
    setSelectedDividendId(null);
  };
  const familyDataWithIds = Object.values(dividendData).map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const dividendColumns = [
    {
      field: "symbol",
      headerName: "Stock name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Ex dividend date",
      flex: 1,
    },
    {
      field: "percentage",
      headerName: "Dividend %",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center">
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon sx={{ height: "20px", width: "20px" }} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const TradeHeader = () => {
    return (
      <>
        <HeaderBox>
          <Box>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ mb: "10px" }}
            >
              <DividendText color="primary" variant="button">
                Dividend
              </DividendText>
            </Stack>
            <Stack direction="row">
              <Text
                variant="small"
                sx={{ color: "#667085", fontWeight: 400, fontSize: "14px" }}
              >
                Here you can add dividend values with the date for the stock.
              </Text>
            </Stack>
          </Box>

          <AddDividendBtn startIcon={<AddIcon />} onClick={AddDividendDrawer}>
            Add dividend
          </AddDividendBtn>
        </HeaderBox>
      </>
    );
  };

  return (
    <>
      <SideDrawer
        open={isDrawerAddDividend}
        closeDrawer={() => setDrawerAddDividend(false)}
        title={isEditing ? "Edit dividend" : "Add dividend"}
        subtitle="Here you can add dividend for any stock."
        cancelButtonText="Cancel"
        submitButtonText="Save"
        handleSubmit={handleSave}
      >
        <Box>
          <Box>
            <StockNameText>Stock name</StockNameText>
            <Autocomplete
              sx={{ width: "100%", mb: "20px" }}
              placeholder="Enter stock name"
              value={stockName}
              onChange={(e, value) => {
                setStockName(value);
              }}
              disablePortal
              id="combo-box-demo"
              options={companyData}
              renderInput={(params) => (
                <TextField {...params} placeholder="Enter a Stock Name" />
              )}
            />{" "}
            {addFormError.stockName ? (
              <span style={{ color: "red" }}>{addFormError.stockName}</span>
            ) : null}
          </Box>
          <Box>
            <ExDividendText>Ex dividend date</ExDividendText>
            <DatePicker
              sx={{ width: "100%", mb: "20px" }}
              selected={exDividendDate}
              onChange={(date) => setExDividendDate(date)}
              initialDate={exDividendDate} // Add this line to set the initial date
            />
            {addFormError.dividendDate ? (
              <span style={{ color: "red" }}>{addFormError.dividendDate}</span>
            ) : null}
          </Box>
          <Box>
            <DividendpercText>Dividend %</DividendpercText>
            <TextField
              sx={{ width: "100%", mb: "20px" }}
              placeholder="Enter Dividend %"
              value={dividendPercentage}
              onChange={(e) => setDividendPercentage(e.target.value)}
            />
            {addFormError.dividendPerc ? (
              <span style={{ color: "red" }}>{addFormError.dividendPerc}</span>
            ) : null}
          </Box>
        </Box>
      </SideDrawer>
      <Box sx={{ marginTop: "25px" }}>
        <CustomGrid
          list={familyDataWithIds}
          columnHeaderHeight={46}
          rowHeight={72}
          columns={dividendColumns}
          header={TradeHeader}
          pagination={null}
        />
      </Box>
    </>
  );
}
export default DividendContainer;
