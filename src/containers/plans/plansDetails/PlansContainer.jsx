import Box from "components/common/Box";
import DataAdding from "components/common/DataAdding";
import IconButton from "components/common/IconButton";
import EditIcon from "asset/icons/EditIcon";
import Stack from "components/common/Stack";
import Table from "components/common/Table";
import Text from "components/common/Text";
import React from "react";
import { useNavigate } from "react-router-dom";
import PlansDataGrid from "components/common/PlansDataGrid";
import { plansApiAction } from "stores/redux/apiSlices/plans/plansApiSlice";
const PlansContainer = () => {
  const navigate = useNavigate();
  const [selectedPlanName, setSelectedPlanName] = React.useState("");
  const { data: plansData = {} } = plansApiAction.getPlansApi();
  let plansWithIds = [];

  const addIdsToPlans = (plans) => {
    return plans.map((plan, index) => {
      return {
        ...plan,
        id: index + 1,
      };
    });
  };
  console.log("plansData:", plansData);

  if (Array.isArray(plansData.plans)) {
    const plansResult = plansData.plans;
    console.log("plansResult:", plansResult);

    plansWithIds = addIdsToPlans(plansResult);
    console.log("plansWithIds:", plansWithIds);
  } else {
    console.error("The 'plans' property is not an array.");
  }
  const handleEditPlan = (planName) => {
    console.log("Clicked planName:", planName); // Log the clicked planName
    setSelectedPlanName(planName);

    navigate("/newplans", {
      state: {
        plansData,
        planName,
      },
    });
  };

  const datagridColumn = [
    {
      field: "planName",
      headerName: "Plan Name",
      headerClassName: "super-app-theme--header",
      flex: 2,
    },
    {
      field: "frequency",
      headerName: "Frequency",
      headerClassName: "super-app-theme--header",
      flex: 1.5,
    },
    {
      field: "algo",
      headerName: "Algo",
      headerClassName: "super-app-theme--header",
      flex: 1.5,
    },
    {
      field: "custom",
      headerName: "Custom",
      headerClassName: "super-app-theme--header",
      flex: 1.5,
    },
    {
      field: "modelportfolio",
      headerClassName: "super-app-theme--header",
      headerName: "Model Portfolio",
      flex: 1.5,
    },
    {
      field: "action",
      headerClassName: "super-app-theme--header",
      headerName: "Action",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center">
          {params.row.planName && (
            <>
              <IconButton onClick={() => handleEditPlan(params.row.planName)}>
                <EditIcon sx={{ height: "20px", width: "20px" }} />
              </IconButton>
            </>
          )}
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Box mt={4}>
        <DataAdding
          totalCount={plansData.length}
          headerText="Plans"
          subheaderText="Here you can create any plans for the customers."
          addDataText="Add Plan"
          title="Plans"
          onAddDataClick={() => navigate("/newplans")}
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
          <PlansDataGrid
            items={plansData}
            columns={datagridColumn}
            getRowId={(row) => row.id}
          />
        </Box>
      </Box>
    </>
  );
};

export default PlansContainer;
