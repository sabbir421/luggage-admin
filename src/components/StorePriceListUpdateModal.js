/** @format */

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import countries from "countries-cities";

const StorePriceListUpdateModal = ({
  open,
  onClose,
  text,
  onConfirm,
  priceInfo,
}) => {
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [tax, setTax] = useState("");
  const [vendor, setVendor] = useState("");
  const [systemFee, setSystemFee] = useState("");
  const [warningOpen, setWarningOpen] = useState(false);

  useEffect(() => {
    if (priceInfo) {
      setCountry(priceInfo.country || "");
      setPrice(parseFloat(priceInfo.price || 0));
      setTax(parseFloat(priceInfo.tax || 0));
      setVendor(parseFloat(priceInfo.vendor || 0));
      setSystemFee(parseFloat(priceInfo.systemFee || 0));
    }
  }, [priceInfo]);

  const handleConfirm = () => {
    const vendorDoorAppSum = parseFloat(vendor) + parseFloat(systemFee);
    if (parseFloat(price) !== vendorDoorAppSum) {
      setWarningOpen(true);
    } else {
      onConfirm({
        id: priceInfo.id,
        country,
        price:parseFloat(price),
        tax:parseFloat(tax),
        vendor:parseFloat(vendor),
        systemFee:parseFloat(systemFee),
      });
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const iconSize = { fontSize: 16 };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          style={{ color: "tomato", marginLeft: "40%" }}
          id="alert-dialog-title"
        >
          {text}
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { marginLeft: "10%", width: "80%" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              margin="normal"
              id="fkCountry"
              name="fkCountry"
              fullWidth
              select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              variant="outlined"
              focused
              required
            >
              {countries.getCountries().map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div
            style={{
              width: "80%",
              marginLeft: isSmallScreen ? "25px" : "52px",
            }}
          >
            <label style={{ marginLeft: "2%" }}>Price Amount</label>
            <FormControl fullWidth sx={{ m: 1 }}>
              <OutlinedInput
                type="number"
                required
                width="80%"
                id="price"
                value={price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setPrice(value);
                  }
                }}
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
          </div>

          <div
            style={{
              width: "80%",
              marginLeft: isSmallScreen ? "25px" : "52px",
            }}
          >
            <label style={{ marginLeft: "2%" }}>Tax</label>
            <FormControl fullWidth sx={{ m: 1 }}>
              <OutlinedInput
                type="number"
                required
                width="80%"
                id="tax"
                value={tax}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setTax(value);
                  }
                }}
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
          </div>
          <div
            style={{
              width: "80%",
              marginLeft: isSmallScreen ? "25px" : "52px",
            }}
          >
            <label style={{ marginLeft: "2%" }}>Vendor</label>
            <FormControl fullWidth sx={{ m: 1 }}>
              <OutlinedInput
                type="number"
                required
                width="80%"
                id="vendor"
                value={vendor}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setVendor(value);
                  }
                }}
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
          </div>

          <div
            style={{
              width: "80%",
              marginLeft: isSmallScreen ? "25px" : "52px",
            }}
          >
            <label style={{ marginLeft: "2%" }}>System fee</label>
            <FormControl fullWidth sx={{ m: 1 }}>
              <OutlinedInput
                type="number"
                required
                width="80%"
                id="systemFee"
                value={systemFee}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setSystemFee(value);
                  }
                }}
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
          </div>
        </Box>

        <DialogActions>
          <Button
            style={{
              marginRight: "20%",
              marginBottom: "5px",
              color: "white",
              backgroundColor: "red",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              marginRight: "20%",
              marginBottom: "5px",
              color: "white",
              backgroundColor: "green",
            }}
            onClick={handleConfirm}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={warningOpen}
        onClose={() => setWarningOpen(false)}
        aria-labelledby="warning-dialog-title"
        aria-describedby="warning-dialog-description"
      >
        <DialogTitle id="warning-dialog-title">Price Mismatch</DialogTitle>
        <DialogContent>
          <DialogContentText id="warning-dialog-description">
            The total Amount of Vendor and DoorApp values does not match the
            Price. Please check your Amount.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setWarningOpen(false)}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StorePriceListUpdateModal;
