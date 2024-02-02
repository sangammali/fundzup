import React from "react";
import Grid from "components/common/Grid";
import InvestmentHeader from "components/customerCard/Investmentheader";
import Stack from "components/common/Stack";
import InvestmentTableTab from "components/investmentTable/InvestmentTableTab";
import Button from "components/common/Button";
import CustomBreadcrumb from "components/customerCard/CustomerBreadcrumb";
import { useSelector } from "react-redux";

const cardData = [
  {
    id: 1,
    name: "Algo (F&O)",
    detail: "Here you can view Alog(F&O) performance of all the family member",
    firstMember: "Ankit Arora",
    secondMember: "Alok",
  },
];

const InvestmentType = () => {
  const select = useSelector((state) => state.toast);

  return (
    <div>
      <CustomBreadcrumb link='Customers' Breadcrumb1={select?.breadCrumbData?.name} Breadcrumb2="Performance"  />
      <Stack marginTop='15px'>
        <Grid sx={{ mb: 3 }}>
          {cardData.map((element, index) => (
            <Grid item xs={element.xs} key={`cards_index_${element.id}`}>
              <InvestmentHeader data={element} />
            </Grid>
          ))}
        </Grid>
        <InvestmentTableTab />
      </Stack>
    </div>
  );
};

export default InvestmentType;
