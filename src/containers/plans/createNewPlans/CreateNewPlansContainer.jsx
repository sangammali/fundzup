import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DataAdding from "components/common/DataAdding";
import { plansApiAction } from "stores/redux/apiSlices/plans/plansApiSlice";
import { toastActions } from "stores/redux/slices/toastSlice";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import Breadcrumbs from "components/common/Breadcrumbs";
import AddNewPlanModal from "../components/AddNewPlanModal";
import { useLocation } from "react-router-dom";
const initialItems = [
  {
    id: "abc",
    chargeCategory: "abcd",
    subCategories: [
      {
        id: 3,
        frequency: "Monthly",
        custom: null,
        custom_percent: null,
        modelportfolio: null,
        modelportfolio_percent: null,
        algo: null,
        algo_percent: null,
      },
      {
        id: 4,
        frequency: "Quarterly",
        custom: null,
        custom_percent: null,
        modelportfolio: null,
        modelportfolio_percent: null,
        algo: null,
        algo_percent: null,
      },
      {
        id: 5,
        frequency: "Half Yearly",
        custom: null,
        custom_percent: null,
        modelportfolio: null,
        modelportfolio_percent: null,
        algo: null,
        algo_percent: null,
      },
      {
        id: 6,
        frequency: "Yearly",
        custom: null,
        custom_percent: null,
        modelportfolio: null,
        modelportfolio_percent: null,
        algo: null,
        algo_percent: null,
      },
    ],
  },
];
const initialChargeType = {
  3: {
    algo: "fixedAmount",
    custom: "fixedAmount",
    modelportfolio: "fixedAmount",
  },
  4: {
    algo: "fixedAmount",
    custom: "fixedAmount",
    modelportfolio: "fixedAmount",
  },
  5: {
    algo: "fixedAmount",
    custom: "fixedAmount",
    modelportfolio: "fixedAmount",
  },
  6: {
    algo: "fixedAmount",
    custom: "fixedAmount",
    modelportfolio: "fixedAmount",
  },
};

const CreateNewPlansContainer = () => {
  const location = useLocation(); // Use useLocation hook
  const [items, setItems] = useState(initialItems);
  const [chargeType, setChargeType] = useState(initialChargeType);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [newStockName, setNewStockName] = useState("");
  const [minAmountFrom, setMinAmountFrom] = useState("");
  const [maxAmountTo, setMaxAmountTo] = useState("");
  // ... (previous code)
  useEffect(() => {
    const plansData = location.state?.plansData || null;
    const selectedPlanName = location.state?.planName || "";

    console.log("Selected Plan Name:", selectedPlanName);
    console.log("Entire Plans Data:", plansData);

    if (Array.isArray(plansData) && selectedPlanName !== "") {
      const selectedPlanData = plansData.find(
        (plan) => plan.planName === selectedPlanName
      );

      console.log("Selected Plan Data:", selectedPlanData);

      if (selectedPlanData) {
        // Update the initialItems state by merging the selected plan data for all frequencies
        setItems((prevItems) =>
          prevItems.map((item) => {
            const matchingSubCategory = selectedPlanData.subCategories.find(
              (subCategory) =>
                subCategory.frequency.toLowerCase() ===
                item.subCategories[0].frequency.toLowerCase()
            );

            return {
              ...item,
              chargeCategory: selectedPlanData.planName,
              subCategories: item.subCategories.map((subCat) => {
                const matchingFrequencyData =
                  selectedPlanData.subCategories.find(
                    (freqData) =>
                      freqData.frequency.toLowerCase() ===
                      subCat.frequency.toLowerCase()
                  );

                return {
                  ...subCat,
                  custom: matchingFrequencyData?.custom || null,
                  custom_percent: matchingFrequencyData?.custom_percent || null,
                  modelportfolio: matchingFrequencyData?.modelportfolio || null,
                  modelportfolio_percent:
                    matchingFrequencyData?.modelportfolio_percent || null,
                  algo: matchingFrequencyData?.algo || null,
                  algo_percent: matchingFrequencyData?.algo_percent || null,
                };
              }),
            };
          })
        );

        // Set chargeType state for Algo field
        setChargeType((prevChargeType) => ({
          ...prevChargeType,
          [selectedPlanData.subCategories[0].id]: {
            algo: selectedPlanData.subCategories[0].algo || "fixedAmount",
          },
        }));
        // Set the pre-filled values for min_amount, max_amount, and planName
        setNewStockName(selectedPlanName);
        setMinAmountFrom(selectedPlanData.min_amount || "");
        setMaxAmountTo(selectedPlanData.max_amount || "");
      }
    }
  }, [location.state]);
  // ... (remaining code)
  const getUpdatedRows = () => {
    // Use a guard clause to handle the case when items is undefined or not an array
    if (!items || !Array.isArray(items)) {
      console.error("Items is undefined or not an array");
      return [];
    }

    return items.flatMap((it) =>
      it && it.subCategories
        ? it.subCategories.map((item, index) =>
            index === 0
              ? { ...item, chargeCategory: it.chargeCategory }
              : { ...item }
          )
        : []
    );
  };

  const [handleCreatePlanApi] = plansApiAction.createNewPlanApi();
  const [handleUpdatePlanApi] = plansApiAction.updateNewPlanApi();

  const extractSubCategoriesData = (subCategories) => {
    return subCategories.map((subCategory) => ({
      id: subCategory.id,
      frequency: subCategory.frequency.toLowerCase(),
      custom: subCategory.custom,
      custom_percent: subCategory.custom_percent,
      modelportfolio: subCategory.modelportfolio,
      modelportfolio_percent: subCategory.modelportfolio_percent,
      algo: subCategory.algo,
      algo_percent: subCategory.algo_percent,
    }));
  };

  const handleSavePlan = () => {
    if (location.state?.plansData) {
      // Data is coming from selectedPlandata, call handleUpdatePlan
      const selectedPlanData = location.state.plansData.find(
        (plan) => plan.planName === newStockName
      );
  
      if (!selectedPlanData) {
        console.error("Selected plan not found for update");
        return;
      }
  
      const payload = {
        Plan_id: selectedPlanData.plan_id, // Add the Plan_id to the payload
        planName: newStockName,
        max_amount: maxAmountTo,
        min_amount: minAmountFrom,
        subCategories: items.flatMap((it) =>
          extractSubCategoriesData(it.subCategories)
        ),
      };
  
      // Convert numeric values to actual numbers
      payload.subCategories.forEach((subCategory) => {
        subCategory.custom =
          subCategory.custom !== null ? Number(subCategory.custom) : null;
        subCategory.custom_percent =
          subCategory.custom_percent !== null
            ? Number(subCategory.custom_percent)
            : null;
        subCategory.modelportfolio =
          subCategory.modelportfolio !== null
            ? Number(subCategory.modelportfolio)
            : null;
        subCategory.modelportfolio_percent =
          subCategory.modelportfolio_percent !== null
            ? Number(subCategory.modelportfolio_percent)
            : null;
        subCategory.algo =
          subCategory.algo !== null ? Number(subCategory.algo) : null;
        subCategory.algo_percent =
          subCategory.algo_percent !== null
            ? Number(subCategory.algo_percent)
            : null;
      });
  
      console.log(payload, "update api payload");
  
      handleUpdatePlanApi(payload)
        .unwrap()
        .then((response) => {
          console.log("API Response:", response);
  
          if (response) {
            dispatch(
              toastActions.setToastData({
                message: response.message,
                variant: "error",
              })
            );
  
            // Log the message for further inspection
            console.log("Response Message:", response.message);
            setModalOpen(false);
  
            // Check if the response message contains 'You will receive OTP shortly!'
          } else {
            console.log("ID from API is missing or invalid:", response);
          }
        })
        .catch((error) => {
          console.error("Error in API call:", error);
  
          // Log the complete error object for inspection
          console.log("Complete error object:", error);
        });
    } else {
      // No data is coming on start, call handleCreateNewPlan
      const payload = {
        planName: newStockName,
        max_amount: maxAmountTo,
        min_amount: minAmountFrom,
        subCategories: items.flatMap((it) =>
          extractSubCategoriesData(it.subCategories)
        ),
      };
  
      // Convert numeric values to actual numbers
      payload.subCategories.forEach((subCategory) => {
        subCategory.custom =
          subCategory.custom !== null ? Number(subCategory.custom) : null;
        subCategory.custom_percent =
          subCategory.custom_percent !== null
            ? Number(subCategory.custom_percent)
            : null;
        subCategory.modelportfolio =
          subCategory.modelportfolio !== null
            ? Number(subCategory.modelportfolio)
            : null;
        subCategory.modelportfolio_percent =
          subCategory.modelportfolio_percent !== null
            ? Number(subCategory.modelportfolio_percent)
            : null;
        subCategory.algo =
          subCategory.algo !== null ? Number(subCategory.algo) : null;
        subCategory.algo_percent =
          subCategory.algo_percent !== null
            ? Number(subCategory.algo_percent)
            : null;
      });
  
      console.log(payload, "createplan");
  
      handleCreatePlanApi(payload)
        .unwrap()
        .then((response) => {
          console.log("API Response:", response);
  
          if (response) {
            dispatch(
              toastActions.setToastData({
                message: response.message,
                variant: "error",
              })
            );
  
            // Log the message for further inspection
            console.log("Response Message:", response.message);
            setModalOpen(false);
  
            // Check if the response message contains 'You will receive OTP shortly!'
          } else {
            console.log("ID from API is missing or invalid:", response);
          }
        })
        .catch((error) => {
          console.error("Error in API call:", error);
  
          // Log the complete error object for inspection
          console.log("Complete error object:", error);
        });
    }
  };
  

  const handleTextFieldChange = (id, field, value) =>
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        subCategories: item.subCategories.map((subCategory) =>
          subCategory.id === id
            ? { ...subCategory, [field]: value }
            : subCategory
        ),
      }))
    );

  const handleRadioChange = (rowId, field, value) => {
    setChargeType((prevChargeType) => ({
      ...prevChargeType,
      [rowId]: { ...prevChargeType[rowId], [field]: value },
    }));
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "calc(100% + 48px)",
          margin: "0 -24px",
          marginBottom: "24px",
        }}
      >
        <Breadcrumbs link="Plans" Breadcrumb="Create new plan" href="/plans" />
      </Box>
      <div>
        <DataAdding
          headerText="Create new plans"
          subheaderText="Here you can create any plans for the customers."
          addDataText="Save plan"
          onAddDataClick={() => setModalOpen(true)}
        />
        <Box
          sx={{
            width: "auto",
            backgroundColor: "#fff",
            overflowX: "auto",
            "& .bold": { fontWeight: 600 },
            "& .super-app-theme--header": {
              backgroundColor: "#E5EEFF !important",
            },
            "& .total-background": { backgroundColor: "#F2FAFE !important" },
            "& .total-back": { backgroundColor: "#C3EAFD !important" },
          }}
        >
          <DataGrid
            style={{
              minWidth: "100%",
              "&:hover": { backgroundColor: "#fff !important" },
            }}
            rowSelection={true}
            disableColumnFilter={true}
            disableRowSelectionOnClick={true}
            autoHeight
            hideFooter
            rowHeight={150}
            // ... (previous code)

            columns={[
              {
                field: "frequency",
                headerName: "Frequency",
                flex: 0.6,
                headerClassName: "super-app-theme--header",
              },
              {
                field: "algo",
                headerName: "Algo",
                headerClassName: "super-app-theme--header",
                flex: 1,
                renderCell: ({ row }) => (
                  <div>
                    <RadioGroup
                      row
                      aria-label={`chargeType-${row.id}-algo`}
                      name={`chargeType-${row.id}-algo`}
                      value={
                        (chargeType[row.id] && chargeType[row.id].algo) || ""
                      }
                      onChange={(e) =>
                        handleRadioChange(row.id, "algo", e.target.value)
                      }
                      style={{ width: "60px", fontSize: "12px" }}
                    >
                      <Box sx={{ flexDirection: "row" }}>
                        <FormControlLabel
                          value="fixedAmount"
                          control={<Radio />}
                          label="Fixed Amount"
                        />
                        <FormControlLabel
                          value="AUM"
                          control={<Radio />}
                          label="AUM"
                        />
                      </Box>
                    </RadioGroup>
                    {chargeType[row.id]?.algo === "fixedAmount" && (
                      <TextField
                      type="number"
                        style={{
                          fontSize: "14px",
                          borderRadius: "8px",
                          borderColor: "#CBCBCB",
                          border: "1px solid #CBCBCB",
                        }}
                        placeholder="Enter Amount"
                        value={row.algo !== undefined ? row.algo : ""}
                        onChange={(e) =>
                          handleTextFieldChange(row.id, "algo", e.target.value)
                        }
                      />
                    )}
                    {chargeType[row.id]?.algo === "AUM" && (
                      <TextField
                      type="number"
                        style={{
                          fontSize: "14px",
                          borderRadius: "8px",
                          borderColor: "#CBCBCB",
                          border: "1px solid #CBCBCB",
                        }}
                        placeholder="Enter %"
                        value={
                          row.algo_percent !== undefined ? row.algo_percent : ""
                        }
                        onChange={(e) =>
                          handleTextFieldChange(
                            row.id,
                            "algo_percent",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                ),
              },

              {
                field: "custom",
                headerName: "Custom",
                headerClassName: "super-app-theme--header",
                flex: 1,
                renderCell: ({ row }) => (
                  <div>
                    <RadioGroup
                      row
                      aria-label={`chargeType-${row.id}-custom`}
                      name={`chargeType-${row.id}-custom`}
                      value={
                        (chargeType[row.id] && chargeType[row.id].custom) || ""
                      }
                      onChange={(e) =>
                        handleRadioChange(row.id, "custom", e.target.value)
                      }
                    >
                      <Box sx={{ flexDirection: "row" }}>
                        <FormControlLabel
                          value="fixedAmount"
                          control={<Radio />}
                          label="Fixed Amount"
                        />
                        <FormControlLabel
                          value="AUM"
                          control={<Radio />}
                          label="AUM"
                        />
                      </Box>
                    </RadioGroup>
                    {chargeType[row.id]?.custom === "fixedAmount" && (
                      <TextField
                      type="number"
                        style={{
                          fontSize: "14px",
                          borderRadius: "8px",
                          borderColor: "#CBCBCB",
                          border: "1px solid #CBCBCB",
                        }}
                        placeholder="Enter Amount"
                        value={row.custom !== undefined ? row.custom : ""}
                        onChange={(e) =>
                          handleTextFieldChange(
                            row.id,
                            "custom",
                            e.target.value
                          )
                        }
                      />
                    )}
                    {chargeType[row.id]?.custom === "AUM" && (
                      <TextField
                      type="number"
                        style={{
                          fontSize: "14px",
                          borderRadius: "8px",
                          borderColor: "#CBCBCB",
                          border: "1px solid #CBCBCB",
                        }}
                        placeholder="Enter %"
                        value={
                          row.custom_percent !== undefined
                            ? row.custom_percent
                            : ""
                        }
                        onChange={(e) =>
                          handleTextFieldChange(
                            row.id,
                            "custom_percent",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                ),
              },

              {
                field: "modelportfolio",
                headerName: "Model Portfolio",
                headerClassName: "super-app-theme--header",
                flex: 1,
                renderCell: ({ row }) => (
                  <div>
                    <RadioGroup
                      row
                      aria-label={`chargeType-${row.id}-modelportfolio`}
                      name={`chargeType-${row.id}-modelportfolio`}
                      value={
                        (chargeType[row.id] &&
                          chargeType[row.id].modelportfolio) ||
                        ""
                      }
                      onChange={(e) =>
                        handleRadioChange(
                          row.id,
                          "modelportfolio",
                          e.target.value
                        )
                      }
                    >
                      <Box sx={{ flexDirection: "row" }}>
                        <FormControlLabel
                          value="fixedAmount"
                          control={<Radio />}
                          label="Fixed Amount"
                        />
                        <FormControlLabel
                          value="AUM"
                          control={<Radio />}
                          label="AUM"
                        />
                      </Box>
                    </RadioGroup>
                    {chargeType[row.id]?.modelportfolio === "fixedAmount" && (
                      <TextField
                      type="number"
                        style={{
                          fontSize: "14px",
                          borderRadius: "8px",
                          borderColor: "#CBCBCB",
                          border: "1px solid #CBCBCB",
                        }}
                        placeholder="Enter Amount"
                        value={
                          row.modelportfolio !== undefined
                            ? row.modelportfolio
                            : ""
                        }
                        onChange={(e) =>
                          handleTextFieldChange(
                            row.id,
                            "modelportfolio",
                            e.target.value
                          )
                        }
                      />
                    )}
                    {chargeType[row.id]?.modelportfolio === "AUM" && (
                      <TextField
                        style={{
                          fontSize: "14px",
                          borderRadius: "8px",
                          borderColor: "#CBCBCB",
                          border: "1px solid #CBCBCB",
                        }}
                        placeholder="Enter %"
                        value={
                          row.modelportfolio !== undefined
                            ? row.modelportfolio_percent
                            : ""
                        }
                        onChange={(e) =>
                          handleTextFieldChange(
                            row.id,
                            "modelportfolio_percent",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                ),
              },
            ]}
            rows={getUpdatedRows()}
          />

          <AddNewPlanModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSavePlan}
           
            newStockName={newStockName}
            setNewStockName={setNewStockName}
            minAmountFrom={minAmountFrom}
            setMinAmountFrom={setMinAmountFrom}
            maxAmountTo={maxAmountTo}
            setMaxAmountTo={setMaxAmountTo}
          />
        </Box>
      </div>
    </>
  );
};

export default CreateNewPlansContainer;
