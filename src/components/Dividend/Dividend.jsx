import React from "react";
import Box from "components/common/Box";
import Text from "components/common/Text";
import TextField from "components/common/TextField";
import Button from "components/common/Button";
import Stack from "components/common/Stack";
import Card from "components/common/Card";
import Grid from "components/common/Grid";
import Divider from "components/common/Divider";
import DatePicker from "components/common/DatePicker";
import StockDeleteIcon from "asset/icons/StockDeleteIcon";
import MenuItem from "components/common/MenuItem";

const Dividend = ({
  stocks,
  currencies,
  addStock,
  onDeleteStock,
  onChange,
}) => {
  return (
    <>
      <Box>
        <Card sx={{ p: 4, borderRadius: "16px", mb: "36px" }}>
          <Grid container spacing={2}>
            <Grid item md={12} sx={{ mb: "28px" }}>
              <Text
                sx={{ color: "#101828", fontSize: "18px", fontWeight: "500" }}
              >
                Add dividend
              </Text>
              <Text
                sx={{ color: "#667085", fontSize: "14px", fontWeight: "400" }}
              >
                Here you can add dividend values with the date for the stock.
              </Text>
            </Grid>
            <Divider sx={{ mb: "28px" }} />
            {stocks.map((stock, index) => (
              <Grid container spacing={2} key={stock.id} sx={{ p: 2 }}>
                <Grid item md={6}>
                  <Text>Stock name</Text>
                  <TextField
                    placeholder="Enter Stock name"
                    select
                    name="stockName"
                    value={stock.stockName}
                    onChange={(e) => {
                      onChange(stock.id, e.target.name, e.target.value);
                    }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item md={index === 0 ? 3 : 2.5}>
                  <Text>Ex-dividend date</Text>
                  <DatePicker
                    name="date"
                    value={stock.date}
                    sx={{ height: "50px" }}
                    onChange={(d) => {
                      onChange(stock.id, "date", d["$d"]);
                    }}
                  />
                </Grid>

                <Grid item md={index === 0 ? 3 : 2.5}>
                  <Text>Dividend %</Text>
                  <TextField
                    value={stock.dividendPercentage}
                    placeholder="Enter dividend %"
                    name="dividendPercentage"
                    onChange={(e) => {
                      onChange(stock.id, e.target.name, e.target.value);
                    }}
                  />
                </Grid>
                {index !== 0 ? (
                  <Grid item md={1}>
                    <Button
                      variant="text"
                      onClick={() => onDeleteStock(stock.id)}
                    >
                      <StockDeleteIcon
                        sx={{
                          padding: "12px",
                          border: "1px solid #142E56",
                          borderRadius: "16px",
                          mt: "20px",
                        }}
                      />
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
            ))}
            <Grid item md={12}>
              <Button
                variant="outlined"
                sx={{ fontSize: "14px", fontWeight: 600 }}
                onClick={addStock}
              >
                + Add another stock
              </Button>
            </Grid>
            <Grid item md={12}>
              <Button
                sx={{
                  padding: "18px 28px",
                  backgroundColor: "#142E56",
                  color: "#FFF",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  width: "260px",
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default Dividend;
