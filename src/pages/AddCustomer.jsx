import React from "react";
import AddCustomerContainer from "containers/AddCustomer";
import ErrorBoundary from "components/ErrorBoundary";

const AddCustomer = () => {
  return (
    <ErrorBoundary>
      <AddCustomerContainer />
    </ErrorBoundary>
  );
};

export default AddCustomer;
