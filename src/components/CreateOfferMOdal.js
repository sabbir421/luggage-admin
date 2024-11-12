import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addPromo, bagDiscount } from "../state/offer/offerSlice";

const CreateOfferModal = ({ open, onClose, from, title }) => {
  const [bag, setBag] = useState("");
  const [maxUsed, setMaxUsed] = useState(null);
  const [discount, setDiscountPrice] = useState(0);
  const [status, setStatus] = useState("ACTIVE");
  const [validDate, setValiddate] = useState(dayjs().format("MM-DD-YYYY"));
  const statusObj = [
    {
      value: "ACTIVE",
      label: "Active",
    },
    {
      value: "INACTIVE",
      label: "Inactive",
    },
  ];
  const navigate = useNavigate();
  const { success } = useSelector((state) => state.offerReducer);
  const handleSubmit = () => {
    if (from === "percentage") {
      const data = {
        bag,
        maxCupponUsed: maxUsed,
        validDate: validDate,
        discountPrice: discount,
        status,
      };
      dispatch(addPromo({ data, token }));
      if (success === true) {
        navigate("/");
      }
    }
    if (from === "bag") {
      const data = {
        bag,
        maxUsed,
        validDate,
        discountBag: discount,
        status,
      };
      dispatch(bagDiscount({ data, token }));
      if (success === true) {
        navigate("/");
      }
    }
  };

  const handleDateChange = (newDate) => {
    setValiddate(dayjs(newDate).format("MM-DD-YYYY"));
  };

  const dispatch = useDispatch();
  const { userReducher } = useSelector((state) => state);
  const { token } = userReducher;
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ width: "100%" }}
      >
        <DialogTitle
          style={{ color: "black", textAlign: "center", fontWeight: "bold" }}
          id="alert-dialog-title"
        >
         {title}
        </DialogTitle>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              style={{ marginLeft: "auto", marginRight: "auto" }}
              item
              xs={8}
            >
              <TextField
                required
                style={{
                  width: "80%",
                  marginLeft: "10%",
                  marginBottom: "10px",
                }}
                id="outlined-basic"
                label="Bag"
                variant="outlined"
                onChange={(e) => setBag(e.target.value)}
              />
              <TextField
                required
                style={{
                  width: "80%",
                  marginLeft: "10%",
                  marginBottom: "10px",
                }}
                id="outlined-basic"
                label="Max Used"
                variant="outlined"
                onChange={(e) => setMaxUsed(e.target.value)}
              />
              <TextField
                required
                style={{
                  width: "80%",
                  marginLeft: "10%",
                  marginBottom: "10px",
                }}
                id="outlined-basic"
                label="Discount"
                variant="outlined"
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
              <div>
                <TextField
                  required
                  style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginBottom: "10px",
                  }}
                  id="outlined-select-currency-native"
                  select
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {statusObj.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>

              <div style={{ marginLeft: "10%", marginBottom: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(validDate, "MM-DD-YYYY")}
                    onChange={handleDateChange}
                    label="Valid Date"
                    sx={{ width: "89%" }}
                  />
                </LocalizationProvider>
              </div>
              <Button
                disabled={!bag || !maxUsed || !discount}
                style={{
                  marginLeft: "10%",
                  marginBottom: "10px",
                  width: "80%",
                  backgroundColor: "#050636",
                  color: "white",
                }}
                onClick={handleSubmit}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateOfferModal;
