
import CustomerDetailHeader from "./CustomerDetailHeader";
import DetailTab from "./DetailTab";
import Paper from "components/common/Paper";
import CustomBreadcrumb from "components/customerCard/CustomerBreadcrumb";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


const CustomerDetailPage = () => {
  const select = useSelector((state) => state.toast);
  let location = useLocation();
 
  return (
    <>
      <CustomBreadcrumb link='Customers' Breadcrumb1={select?.breadCrumbData?.name} Breadcrumb2="Performance" />
      <Paper
        elevation={1}
        sx={{
          alignItems: "center",
          // width: "auto",
          backgroundColor: "white",
          border: "1px solid white",
          height: "auto",
          marginTop:'15px'
        }}
      >
        <CustomerDetailHeader viewCustomerDetail = {location?.state?.data}  />
        <DetailTab />
      </Paper>
    </>
  );
}

export default CustomerDetailPage;
