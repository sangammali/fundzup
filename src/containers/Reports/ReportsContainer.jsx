import React, { useState } from "react";
import ReportsCard from "components/ReportsCard";
import TradeReport from "containers/Reports/TradeReport";
import MarketReport from "containers/Reports/MarketReport";
import HoldingReport from "containers/Reports/HoldingReport";
import CashReport from "containers/Reports/CashReport";
import GlobalReport from "containers/Reports/GlobalReport";
import FnOSample from "containers/Reports/FnOSample";
import CapitalSample from "containers/Reports/CapitalSample";

const ReportsContainer = () => {
  const [showTradeReport, setShowTradeReport] = useState(true);
  const [showMarketReport, setshowMarketReport] = useState(false);
  const [showHoldingReport, setshowHoldingReport] = useState(false);
  const [showCashReport, setshowCashReport] = useState(false);
  const [showGlobalReport, setshowGlobalReport] = useState(false);
  const [showFnOSample, setshowFnOSample] = useState(false);
  const [showCapitalSample, setshowCapitalSample] = useState(false);

  const handleTradeReportClick = () => {
    setShowTradeReport(false);
  };

  const handleMarketReportClick = () => {
    setShowTradeReport(false);
    setshowMarketReport(true);
  };

  const handleHoldingReportClick = () => {
    setShowTradeReport(false);
    setshowHoldingReport(true);
  };
  const handleCashReportClick = () => {
    setShowTradeReport(false);
    setshowCashReport(true);
  };
  const handleGlobalReportClick = () => {
    setShowTradeReport(false);
    setshowGlobalReport(true);
  };
  const handleSampleClick = () => {
    setShowTradeReport(false);
    setshowFnOSample(true);
  };

  const handleCapitalSampleClick = () => {
    setShowTradeReport(false);
    setshowCapitalSample(true);
  };
  return (
    <div>
      {showTradeReport ? (
        <ReportsCard
          onTradeReportClick={handleTradeReportClick}
          onMarketReportClick={handleMarketReportClick}
          onHoldingReportClick={handleHoldingReportClick}
          onCashReportClick={handleCashReportClick}
          onGlobalReportClick={handleGlobalReportClick}
          onSampleClick={handleSampleClick}
          onCapitalSampleClick={handleCapitalSampleClick}
        />
      ) : showMarketReport ? (
        <MarketReport />
      ) : showHoldingReport ? (
        <HoldingReport />
      ) : showCashReport ? (
        <CashReport />
      ) : showGlobalReport ? (
        <GlobalReport />
      ) : showFnOSample ? (
        <FnOSample />
      ) : showCapitalSample ? (
        <CapitalSample />
      ) : (
        <TradeReport />
      )}
    </div>
  );
};

export default ReportsContainer;
