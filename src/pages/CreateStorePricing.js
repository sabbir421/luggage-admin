/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
import { createStorePrice } from "../state/storePrice/storePriceSlice";
import {
  Alert,
  CircularProgress,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Layout from "../components/layout";
var countries = require("countries-cities").getCountries();

const CreateStorePricing = () => {
  const [country, setCountry] = useState("France");
  const [price, setPrice] = useState("");
  const [tax, setTax] = useState("");
  const [vendor, setVendor] = useState("");
  const [doorApp, setDoorApp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userReducher);

  const { errorMessage, isLoading } = useSelector(
    (state) => state.storePrice
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      country,
      price: parseFloat(price),
      tax: parseFloat(tax),
      vendor: parseFloat(vendor),
      doorApp: parseFloat(doorApp),
    };
  
    const resultAction = await dispatch(createStorePrice({ token, createStorePriceInfo: data }));
    if (createStorePrice.fulfilled.match(resultAction)) {
      toast.success("Store Price Created Successfully", {
        duration: 5000,
      });
      navigate("/");
    }
  };

  const iconSize = { fontSize: 16 };
  return (
    <Layout>
      <ThemeProvider theme={createTheme()}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: 0,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ marginTop: "20px" }}
            >
              Create Store Price
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                id="fkCountry"
                name="fkCountry"
                fullWidth
                style={{ marginLeft: "2%" }}
                select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                variant="outlined"
                focused
                required
              >
                {countries?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                Price Amount
              </label>
              <FormControl fullWidth sx={{ m: 1 }}>
                {/* <InputLabel htmlFor="price">Price Amount</InputLabel> */}
                <OutlinedInput
                  type="number"
                  required
                  fullWidth
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      {country === "France" ? (
                        <EuroIcon sx={iconSize} />
                      ) : (
                        <CurrencyPoundIcon sx={iconSize} />
                      )}
                    </InputAdornment>
                  }
                  placeholder="0.0"
                />
              </FormControl>

              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                Tax Amount
              </label>

              <FormControl fullWidth sx={{ m: 1 }}>
                {/* <InputLabel htmlFor="tax">Tax</InputLabel> */}
                <OutlinedInput
                  type="number"
                  required
                  fullWidth
                  id="tax"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      {" "}
                      {country === "France" ? (
                        <EuroIcon sx={iconSize} />
                      ) : (
                        <CurrencyPoundIcon sx={iconSize} />
                      )}
                    </InputAdornment>
                  }
                  placeholder="0.0"
                />
              </FormControl>
              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                Vendor Amount
              </label>
              <FormControl fullWidth sx={{ m: 1 }}>
                {/* <InputLabel htmlFor="vendor">Vendor</InputLabel> */}
                <OutlinedInput
                  type="number"
                  required
                  fullWidth
                  id="vendor"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      {" "}
                      {country === "France" ? (
                        <EuroIcon sx={iconSize} />
                      ) : (
                        <CurrencyPoundIcon sx={iconSize} />
                      )}
                    </InputAdornment>
                  }
                  placeholder="0.0"
                />
              </FormControl>
              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                DoorApp Amount
              </label>
              <FormControl fullWidth sx={{ m: 1 }}>
                {/* <InputLabel htmlFor="doorApp">DoorApp</InputLabel> */}
                <OutlinedInput
                  type="number"
                  required
                  fullWidth
                  id="doorApp"
                  value={doorApp}
                  onChange={(e) => setDoorApp(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      {" "}
                      {country === "France" ? (
                        <EuroIcon sx={iconSize} />
                      ) : (
                        <CurrencyPoundIcon sx={iconSize} />
                      )}
                    </InputAdornment>
                  }
                  placeholder="0.0"
                />
              </FormControl>

              <Button
                onClick={(e) => handleSubmit(e)}
                fullWidth
                variant="contained"
                style={{
                  color: "white",
                  width: "100%",
                  height: "auto",
                  marginBottom: "60px",
                  marginLeft: "2%",
                  marginTop: "30px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Create
              </Button>
              {isLoading && (
                <Box style={{ marginLeft: "40%" }} sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
              {errorMessage ? (
                <Alert severity="warning">"Somethin went wrong"</Alert>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default CreateStorePricing;
