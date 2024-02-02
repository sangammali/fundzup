import React, { useState } from "react";
import Dividend from "components/Dividend/Dividend";
import { uuid } from "helpers/utility";
import { dividendApiAction } from "stores/redux/dividend/dividendApiSlice";
import Table from "components/common/Table";

const currencies = [
  {
    value: "reliance",
    label: "RELIANCE",
  },
  {
    value: "tataMotors",
    label: "TATA MOTORS",
  },
  {
    value: "adaniGroups",
    label: "ADANI GROUP",
  },
  {
    value: "marutiSuzuki",
    label: "MARUTI SUZUKI",
  },
];

const stockDividendDetails = {
  stockName: "",
  date: null,
  dividendPercentage: "",
};

const DividendOldContainer = () => {
  const { data: dividendData = {} } = dividendApiAction.getDividendApi()
  const data = dividendData;
  console.log(data, "dividenddata=========");
  const [stocks, setStocks] = useState([
    { ...stockDividendDetails, id: uuid() },
  ]);

  const addStock = () => {
    setStocks([...stocks, { ...stockDividendDetails, id: uuid() }]);
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  const handleChange = (id, name, value) => {
    const newStocks = stocks.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setStocks(newStocks);
  };

  return (
    <>
   
    <Dividend
      stocks={stocks}
      currencies={currencies}
      addStock={addStock}
      onDeleteStock={deleteStock}
      onChange={handleChange}
    />
    
     </>
  );
};

export default DividendOldContainer;
