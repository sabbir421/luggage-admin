import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { showVendorId } from "../state/vendor/vendorSlice";
import { showVendorBalance } from "../state/vendor/vendorSlice";
import { vendorMakePayment } from "../state/vendor/vendorSlice";
import Box from "@mui/material/Box";

const PaymentModal = ({ open, onClose, vendorId }) => {
  const dispatch = useDispatch();
  const { userReducher } = useSelector((state) => state);
  const { token } = userReducher;
  const { isLoading, bankInfo, error, vendorBalance } = useSelector(
    (state) => state.vendorRequestList
  );
  const { balance } = useSelector((state) => state.moneyDetails);
  useEffect(() => {
    dispatch(showVendorId({ id: vendorId }));
    dispatch(showVendorBalance({ vendorId, token }));
  }, [dispatch, vendorId, token]);

  const handleMakePayment = (payFor) => {
    const data = {
      payFor,
      bankAccount: bankInfo?.accountNo,
      sortCode: bankInfo?.sortCode,
      amount: payFor === "Euro" ? balance?.blanceFromFr : balance?.blanceFromUk,
      iban: bankInfo?.iban,
      bic: bankInfo?.bic,
    };
    dispatch(vendorMakePayment({ vendorId, token, data }))
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        console.error("Payment error:", error);
      });
  };

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
          Vendor Payment Box
        </DialogTitle>

        {/* <Divider /> */}

        {isLoading && <p>Loading...</p>}
        <Box
          sx={{
            margin: "20px",
            width: "400px",
            border: "2px solid black",
            padding: "10px",
          }}
        >
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <strong>Vendor Id:</strong>
                </td>
                <td>{vendorId}</td>
              </tr>
              <tr>
                <td>
                  <strong>Bank Name:</strong>
                </td>
                <td>{bankInfo?.bankName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Account Number:</strong>
                </td>
                <td>{bankInfo?.accountNo}</td>
              </tr>
              <tr>
                <td>
                  <strong>IBAN:</strong>
                </td>
                <td>{bankInfo?.iban}</td>
              </tr>
              <tr>
                <td>
                  <strong>BIC:</strong>
                </td>
                <td>{bankInfo?.bic}</td>
              </tr>
              <tr>
                <td>
                  <strong>UK Balance:</strong>
                </td>
                <td>{balance?.blanceFromUk.toFixed(2) || 0}</td>
              </tr>
              <tr>
                <td>
                  <strong>FR Balance:</strong>
                </td>
                <td>{balance?.blanceFromFr.toFixed(2) || 0}</td>
              </tr>
            </tbody>
          </table>
        </Box>
        {error && <p>Error: {error}</p>}

        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Button
            variant="contained"
            style={{ marginBottom: "4%" }}
            onClick={onClose}
          >
            {" "}
            Cancel{" "}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleMakePayment("Euro")}
            color="success"
            disabled={vendorBalance?.balance < 1}
            style={{ marginBottom: "20px" }}
          >
            Pay for euro
          </Button>
          <Button
            variant="contained"
            onClick={() => handleMakePayment("Pound")}
            color="success"
            disabled={vendorBalance?.balance < 1}
            style={{ marginBottom: "20px" }}
          >
            Pay for pound
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PaymentModal;
