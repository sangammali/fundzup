const dividendParser = {};

dividendParser.allStocks = (res) => {
  if (!res && !res.result) {
    return [];
  }

  res = res.result;

  const parsedRes = res.map((item) => {
    return {
      company_id: item.company_id ?? null,
      company_name: item.company_name ?? null,
      company_long_name: item.company_long_name ?? null,
      symbol: item.symbol ?? null,
      label: item.company_long_name ?? null,
      id: item.company_id ?? null,
    };
  });
  return parsedRes;
};

export { dividendParser };
