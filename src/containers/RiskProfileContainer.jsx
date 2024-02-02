import React, { useEffect, useState } from "react";
import Box from "components/common/Box";
import Text from "components/common/Text";
import { modelPortFolioApiAction } from "stores/redux/apiSlices/modelPortfolio/modelPortfolio";
import CustomerSidebar from "components/riskProfile/CustomersSidebar";
import StockAllocationSidebar from "components/riskProfile/StockAllocationSidebar";
import AddNewStockModal from "components/riskProfile/AddNewStockModal";
import DeleteStockModal from "components/riskProfile/DeleteStockModal";
import ModelPortfolioCard from "components/riskProfile/ModelPortfolioCard";

const RiskProfileContainer = () => {
  const [isAddNewStockModalOpen, setAddNewStockModalOpen] = useState({});
  const [isDeleteStockModalOpen, setDeleteStockModalOpen] = useState(false);
  const [isAllcustomerSideDrawerOpen, setAllcustomerSideDrawerOpen] =
    useState(false);
  const [isStockAllocationDrawerOpen, setStockAllocationDrawerOpen] =
    useState(false);
  const [newStockFormData, setNewStockFormData] = useState({
    newStockName: "",
    allocationPercent: "",
    profile: 0,
  });
  const [currentRiskProfileId, setCurrentRiskProfileId] = useState(null);
  const [addModelPortfolioStockApi] = modelPortFolioApiAction.addStockApi();
  const [UpdateModelPortfolioStockApi] =
    modelPortFolioApiAction.updateStockApi();
  const { data: modelPortFolioData = {}, refetch: getModelPortfolioDetails } =
    modelPortFolioApiAction.getModelPortFolioApi();

  const handleOpenTotalCustomerDrawer = (risk_profile_id) => {
    console.log(risk_profile_id, "risk_profile_id");

    setCurrentRiskProfileId(risk_profile_id);

    setAllcustomerSideDrawerOpen(true);
  };
  const closeAllcustomerDrawer = () => {
    setAllcustomerSideDrawerOpen(false);
  };
  const modelPortFolio = modelPortFolioData;
  console.log(modelPortFolio, "modelPortFoliodataaaa");
  const { data: CustomerListData = {} } =
    modelPortFolioApiAction.getCustomerListApi(currentRiskProfileId);

  useEffect(() => {
    getModelPortfolioDetails();
  }, []);

  const CustomerList = CustomerListData;
  console.log(CustomerList, "CustomerList");

  const handleOpenAddNewStockModal = (profile) => {
    console.log("Risk Profile ID:", profile);

    setNewStockFormData({
      newStockName: "",
      allocationPercent: "",
      profile,
    });

    setAddNewStockModalOpen(true);
  };
  const onAddNewStockClick = (updatedProfile) => {
    console.log("Updated Profile with new stock:", updatedProfile);
  };


  
  const handleSaveNewStock = async () => {
    const { profile, newStockName, allocationPercent } = newStockFormData;
    const { model_portfolio_id, cash_percent, model_portfolio_details } =
      profile;

    const stocks = model_portfolio_details.map((detail) => ({
      model_portfolio_detail_id: detail.model_portfolio_detail_id,
      symbol: detail.symbol,
      allocation_percent: parseInt(detail.allocation_percent),
    }));

    if (!profile) {
      console.error("Invalid profile object");
      return;
    }
    const cash_Percent_Value = parseFloat(profile.cash_percent);
    const allocationPercentNumber = parseFloat(allocationPercent);
    const payload = {
      risk_profile_id: profile.risk_profile_id,
      cash_percent: cash_Percent_Value,
      model_portfolio_id: model_portfolio_id,
      stocks: stocks,
      addStock: [
        {
          symbol: newStockName,
          allocation_percent: allocationPercentNumber,
        },
      ],
    };

    console.log("New Stock Payload:", payload);

    try {
      const response = await UpdateModelPortfolioStockApi(payload);

      console.log("API Response:", response);

      if (response.data.status === 1) {
        await getModelPortfolioDetails();
      }
      const updatedProfile = {
        ...profile,
        model_portfolio_details: [
          ...model_portfolio_details,
          {
            symbol: newStockName,
            allocation_percent: allocationPercentNumber,
          },
        ],
      };

      onAddNewStockClick(updatedProfile);

      handleCloseAddNewStockModal();
    } catch (error) {
      console.error("Error in API call:", error);
      console.log("Complete error object:", error);
    }
  };

  const handleCloseAddNewStockModal = () => {
    setAddNewStockModalOpen(false);
  };
  const handleOPenStockAllocationSidebar = () => {
    setStockAllocationDrawerOpen(true);
  };
  const closeStockAllocationDrawer = () => {
    setStockAllocationDrawerOpen(false);
  };

  const handlestockDeleteModalOpen = () => {
    setDeleteStockModalOpen(true);
  };
  const handlestockDeleteModalClose = () => {
    setDeleteStockModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          p: "16px 24px",
          borderRadius: "8px",
          border: "1px solid #ECECEC",
          backgroundColor: "#FFF",
          mt: "25px",
        }}
      >
        <Text
          sx={{
            color: "#101828",
            fontSize: "18px",
            fontWeight: 500,
            mb: "4px",
          }}
        >
          Asset allocation of model portfolio
        </Text>

        <Text sx={{ fontSize: "14px", fontWeight: 400, color: "#667085" }}>
          Here you can edit the model portfolio based on the market conditions
          and your expertise.
        </Text>
      </Box>
      <ModelPortfolioCard
        result={modelPortFolio}
        onAddNewStockClick={(profile) => handleOpenAddNewStockModal(profile)}
        updateStockApi={handleSaveNewStock}
        StockAllocationSidebar={handleOPenStockAllocationSidebar}
        openTotalCustomerDrawer={(risk_profile_id) =>
          handleOpenTotalCustomerDrawer(risk_profile_id)
        }
      />
      <CustomerSidebar
        customers={CustomerList}
        open={isAllcustomerSideDrawerOpen}
        closeDrawer={closeAllcustomerDrawer}
      />
      <StockAllocationSidebar
        open={isStockAllocationDrawerOpen}
        closeDrawer={closeStockAllocationDrawer}
        netLiquidValue="20000000"
      />

      <AddNewStockModal
        onClose={handleCloseAddNewStockModal}
        onSave={handleSaveNewStock}
        open={isAddNewStockModalOpen}
        formData={newStockFormData}
        setFormData={setNewStockFormData}
      />
      <DeleteStockModal
        onClose={handlestockDeleteModalClose}
        // onConfirm={handleDeleteStockModal}
        open={isDeleteStockModalOpen}
      />
    </>
  );
};

export default RiskProfileContainer;
