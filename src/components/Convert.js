import React, { useState } from "react";
import useAppContext from "../context/AppContext";
import TextField from "@mui/material/TextField";
import { Box, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function Convert() {
  const { data, setCurrencyChange, currencyChange } = useAppContext();
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [currencyInfo, setCurrencyInfo] = useState({
    buy: 0,
    sell: 0,
    curr: "",
  });

  const handleChange = (e) => {
    setCurrencyChange(e.target.value);
    setCurrencyInfo({
      buy: 0,
      sell: 0,
      curr: "",
    })
  };
  const handleConvert = () => {
    const [newCurrency] = data.filter(
      (item) => item.CurrencyName === currencyChange
    );
    const buy =
      currencyAmount / (newCurrency.BanknoteBuying || newCurrency.ForexBuying);
    const sell =
      currencyAmount /
      (newCurrency.BanknoteSelling || newCurrency.ForexSelling);
    setCurrencyInfo({
      buy: parseFloat(buy).toFixed(2),
      sell: parseFloat(sell).toFixed(2),
      curr: currencyChange,
    });
  };

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            type="number"
            autoFocus
            id="outlined-basic"
            label="TL"
            variant="outlined"
            onChange={(e) => setCurrencyAmount(e.target.value)}
            value={currencyAmount}
          />
        </Grid>
        <Grid
          item xs={12} sm={4} md={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Currency</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                sx={{ minWidth: "200px" }}
                onChange={handleChange}
                value={currencyChange}
              >
                <MenuItem value="">ALL</MenuItem>
                {data?.map((item) => {
                  return (
                    <MenuItem value={item.CurrencyName} key={item.CurrencyName}>
                      {item.CurrencyName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Button variant="contained" onClick={handleConvert}>
            Convert
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
        >
          <div style={{width:"250px"}}>
            <span>Buy : </span>
            <h4>
              {currencyInfo.buy} {currencyInfo.curr}
            </h4>
          </div>
          <div style={{width:"250px"}}>
            <span>Sell : </span>
            <h4>
              {currencyInfo.sell} {currencyInfo.curr}
            </h4>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Convert;
