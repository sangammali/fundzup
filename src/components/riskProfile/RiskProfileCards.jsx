import React, { useState } from "react";
import Box from "components/common/Box";
import Card from "components/common/Card";
import Text from "components/common/Text";
import Button from "components/common/Button";
import Grid from "components/common/Grid";
import TextField from "components/common/TextField";
import List from "components/common/List";
import Stack from "components/common/Stack";
import Link from "components/common/Link";
import StockEditIcon from "asset/icons/StockEditIcon";
import StockDeleteIcon from "asset/icons/StockDeleteIcon";
import StockCheckIcon from "asset/StockCheckIcon";
import NewDialog from "components/common/Dialog";
import { Chip } from "@mui/material";
import Dialog from "components/common/Dialog";
import Warning from "asset/icons/Warning";

const StockItem = ({
  item,
  index,
  editableCashField,
  onEditCash,
  onEditClick,
  onPercClick,
  onDeleteClick,
}) => (
  <List
    key={index}
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      // px: "16px",
      py: "16px",
    }}
  >
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack sx={{ color: "#242424", fontSize: "16px", fontWeight: 500 }}>
          {item.name}
        </Stack>
        <Stack sx={{ color: "#676C76", fontSize: "16px", fontWeight: 500 }}>
          {item.amount}
        </Stack>
      </Stack>
      <TextField
        sx={{
          width: item.isEdit ? "100px" : "131px",
          backgroundColor: "white",
          ml: 8,
          textAlign: "center",
        }}
        variant="outlined"
        size="small"
        disabled={item.isEdit}
        value={item.percAllocation}
        onChange={(e) => onPercClick(index, e.target.value)}
        InputProps={{
          style: {
            fontSize: "16px",
            textAlign: "center",
          },
          endAdornment: (
            <React.Fragment>
              {item.isEdit ? (
                <StockEditIcon
                  sx={{ width: "20px", cursor: "pointer" }}
                  onClick={() => onEditClick(index)}
                />
              ) : (
                <StockCheckIcon
                  sx={{
                    backgroundColor: "#142E56",
                    width: "24px",
                    height: "24px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => onEditClick(index)}
                />
              )}
            </React.Fragment>
          ),
        }}
      />
    </Stack>
    {item.isEdit ? (
      <StockDeleteIcon
        sx={{ width: "20px", cursor: "pointer", ml: "9px", mb: "5px" }}
        onClick={() => onDeleteClick(index)}
      />
    ) : null}
  </List>
);

const RiskProfileCards = ({ index, onDrawerOpen, onDrawerOpen1, data }) => {
  const [stock, setStocks] = useState([]);
  const [newStockName, setNewStockName] = useState("");
  const [allocationPercent, setAllocationPercent] = useState("");
  const [editableCashField, setEditableCashField] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = React.useState(null);
  const ListItem = [
    {
      model_portfolio_id: 3,
      Risk: "High Risk Product",
      total_Customers: "80",
      cash_component: "10",
      model_portfolio_details: [
        {
          model_portfolio_detail_id: 6,
          symbol: "ARVIND",
          allocation_percent: 20,
          is_active: "Y",
        },
        {
          model_portfolio_detail_id: 7,
          symbol: "CIPLA",
          allocation_percent: 20,
          is_active: "Y",
        },
        {
          model_portfolio_detail_id: 3,
          symbol: "TATASTEEL",
          allocation_percent: 10,
          is_active: "Y",
        },
        {
          model_portfolio_detail_id: 5,
          symbol: "WIPRO",
          allocation_percent: 30,
          is_active: "Y",
        },
      ],
    },
    {
      model_portfolio_id: 4,
      Risk: "Medium Risk Product",
      total_Customers: "100",
      cash_component: "20",
      model_portfolio_details: [
        {
          model_portfolio_detail_id: 9,
          symbol: "ARVIND",
          allocation_percent: 20,
          is_active: "Y",
        },
        {
          model_portfolio_detail_id: 11,
          symbol: "CIPLA",
          allocation_percent: 20,
          is_active: "Y",
        },
        {
          model_portfolio_detail_id: 8,
          symbol: "TATASTEEL",
          allocation_percent: 10,
          is_active: "Y",
        },
        {
          model_portfolio_detail_id: 10,
          symbol: "WIPRO",
          allocation_percent: 30,
          is_active: "Y",
        },
      ],
    },
    {
      model_portfolio_id: 5,
      Risk: "Low Risk Product",
      total_Customers: "10",
      cash_component: "40",
      model_portfolio_details: [
        {
          model_portfolio_detail_id: 13,
          symbol: "ACL",
          allocation_percent: 100,
          is_active: "Y",
        },
      ],
    },
  ];

  const listItems = [
    { id: 1, name: "TATASTEEL", amount: "₹ 2000.00", percAllocation: "20" },
    { id: 2, name: "TATAELXSI", amount: "₹ 2000.00", percAllocation: "20" },
    { id: 3, name: "RELIANCE", amount: "₹ 2000.00", percAllocation: "20" },
    { id: 4, name: "WIPRO", amount: "₹ 2000.00", percAllocation: "20" },
  ];

  React.useEffect(() => {
    let stockData = listItems.map((item, index) => {
      return { ...item, isEdit: true };
    });
    setStocks(stockData);
  }, []);

  const handleEditCash = () => {
    setEditableCashField(!editableCashField);
  };

  const handleEditClick = (index) => {
    const currentStock = [...stock];

    currentStock[index] = {
      ...currentStock[index],
      isEdit: !currentStock[index]["isEdit"],
    };

    setStocks(currentStock);
  };

  
  const handlePercClick = (index, value) => {
    const currentStock = [...stock];

    currentStock[index] = {
      ...currentStock[index],
      percAllocation: value,
    };

    setStocks(currentStock);
  };

  const renderStockItems = () => {
    return stock.map((item, index) => (
      <StockItem
        key={index}
        item={item}
        index={index}
        editableCashField={editableCashField}
        onEditCash={handleEditCash}
        onEditClick={handleEditClick}
        onPercClick={handlePercClick}
        onDeleteClick={handleDeleteClick}
      />
    ));
  };

  const handleDeleteClick = (index) => {
    setDeleteModalOpen(true);
    setSelectedDeleteIndex(index);
  };

  const handleDeleteConfirm = () => {
    const updatedStock = [...stock];
    updatedStock.splice(selectedDeleteIndex, 1);
    setStocks(updatedStock);
    setSelectedDeleteIndex(null);
    setDeleteModalOpen(false);
  };

  const [modalOpen, setModalOpen] = React.useState(false);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <Grid item xs={4} key={index}>
        <Card sx={{ height: "700px" }}>
          <Box
            sx={{
              p: "36px 20px",
              backgroundColor: (() => {
                if (index === 1) return "#FFE9BD";
                if (index === 2) return "#C0FFBF";
                return "#FFD1D1";
              })(),
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              sx={{
                color: "#242424",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "28px ",
              }}
            >
              {/* {(() => {
                if (index === 1) return "Medium risk product stocks";
                if (index === 2) return "Low risk product stocks";
                return "High-risk product stocks";
              })()} */}
              {ListItem.Risk}
            </Text>
            <Button
              sx={{
                mt: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: "10px 28px",
                borderRadius: "88px",
                width: "100%",
                border: "1px solid #CBCBCB",
                backgroundColor: "#F7F8FF",
                color: "#142E56",
                fontSize: "14px",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#F7F8FF" },
                textTransform: "capitalize",
              }}
              onClick={onDrawerOpen1}
            >
              Total&nbsp;
              <span style={{ textTransform: "lowercase" }}>Customers: 20</span>
            </Button>
          </Box>

          <Box sx={{ p: "16px" }}>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#E5EEFF",

                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text sx={{ marginRight: 1, fontSize: "16px" }}>
                  Cash Component
                </Text>
                <TextField
                  sx={{ width: "100px", backgroundColor: "#FFF" }}
                  variant="outlined"
                  size="small"
                  disabled={!editableCashField}
                  InputProps={{
                    style: {
                      fontSize: "16px",
                    },
                    endAdornment: (
                      <StockEditIcon
                        sx={{ width: "20px", cursor: "pointer" }}
                        onClick={handleEditCash}
                      />
                    ),
                  }}
                />
              </Box>
            </Box>

            {renderStockItems()}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  mt: 2,
                  fontSize: "16px",
                  borderRadius: "8px",
                  backgroundColor: "#142E56",
                  "&:hover": { backgroundColor: "#142E56" },
                  textTransform: "capitalize",
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(true);
                }}
                sx={{
                  width: "100%",
                  backgroundColor: "#FFF",
                  color: "#142E56",
                  mt: 2,
                  fontSize: "16px",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#FFF" },
                  textTransform: "capitalize",
                }}
              >
                Add&nbsp;
                <span style={{ textTransform: "lowercase" }}>
                  new stock: 20
                </span>
              </Button>

              <Link
                href="#"
                onClick={() => {
                  onDrawerOpen();
                }}
                sx={{
                  mt: 2,
                  color: "#1A54B9",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                View summary
              </Link>
            </Box>

            <Box sx={{ m: 2 }}>
              <NewDialog
                onClose={() => setModalOpen(false)}
                open={modalOpen}
                title=""
                disableCloseIcon
                maxWidth="sm"
                sx={{ borderRadius: "10px" }}
                contentComponent={() => (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "50px",
                      }}
                    >
                      <Text
                        sx={{
                          color: "#101828",
                          fontSize: "18px",
                          fontWeight: 600,
                        }}
                      >
                        Add new stock
                      </Text>

                      <Chip
                        label="High risk stock"
                        sx={{
                          color: "#142E56",
                          borderRadius: "128px",
                          backgroundColor: "#E5EEFF",
                          fontSize: "14px",
                          fontWeight: 500,
                          ml: 1,
                          mb: 4,
                        }}
                      />
                    </Box>

                    <Box>
                      <Text
                        sx={{
                          color: "#242424",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        Stock name
                      </Text>
                      <TextField
                        sx={{
                          fontSize: "16px",
                          color: "#676C76",
                          fontWeight: 400,
                        }}
                        placeholder="Enter stock name"
                        value={newStockName}
                        onChange={(e) => setNewStockName(e.target.value)}
                      />

                      <Text
                        sx={{
                          color: "#242424",
                          fontSize: "14px",
                          fontWeight: 500,
                          mt: 2,
                        }}
                      >
                        % allocated to the stock
                      </Text>
                      <TextField
                        placeholder="Enter % allocated to the stock"
                        value={allocationPercent}
                        onChange={(e) => setAllocationPercent(e.target.value)}
                      />
                    </Box>
                  </Box>
                )}
                actionComponent={() => (
                  <Box mb={2}>
                    <Button
                      onClick={() => {
                        setModalOpen(false);
                      }}
                      disableEndIcon={false}
                      variant="outlined"
                      size="large"
                      m={0.5}
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #142E56",
                        fontSize: "16px",
                        fontWeight: 600,
                        width: "46%",
                        ml: 2,
                        mr: 2,

                        textTransform: "capitalize",
                      }}
                    >
                      No
                    </Button>

                    <Button
                      onClick={() => {
                        setModalOpen(false);
                        console.log("Stock Name:", newStockName);
                        console.log("Allocation Percent:", allocationPercent);
                        // Add any additional logic or API calls here
                      }}
                      disableEndIcon={false}
                      variant="outlined"
                      size="large"
                      m={0.5}
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #142E56",
                        backgroundColor: "#142E56",
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontWeight: 600,
                        width: "46%",
                        "&:hover": { backgroundColor: "#142E56" },
                        textTransform: "capitalize",
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              />

              <Dialog
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title=""
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Warning />
                  <Text
                    sx={{
                      fontSize: "20px",
                      color: "#101828",
                      fontWeight: 600,
                      mt: 3,
                    }}
                  >
                    Are you sure you want to delete this stock?
                  </Text>
                  <Text
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#667085",
                      mt: 1,
                      textAlign: "center",
                    }}
                  >
                    By clicking on the yes button you are making sure that you
                    want to delete this stock permanently.
                  </Text>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => setDeleteModalOpen(false)}
                  sx={{
                    color: "#FFFFFF",
                    "&:hover": { backgroundColor: "#FFFFFF" },
                    mt: 2,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    p: "18px 20px",
                    color: "#142E56",
                    width: "46%",
                    ml: 2,
                    mr: 2,
                    mt: 4,
                  }}
                >
                  No
                </Button>

                <Button
                  variant="contained"
                  onClick={handleDeleteConfirm}
                  sx={{
                    color: "#FFFFFF",
                    "&:hover": { backgroundColor: "#142E56" },
                    mt: 2,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    p: "18px 20px",
                    color: "#FFFFFF",
                    width: "46%",
                    mt: 4,
                  }}
                >
                  Yes, delete
                </Button>
              </Dialog>
            </Box>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default RiskProfileCards;
