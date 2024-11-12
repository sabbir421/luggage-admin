import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, TextField } from "@mui/material";

const PasswordResetModal = ({
  onOpen,
  onClose,
  title,
  onConfirm,
  cancelButton,
  confirmButton,
  confirmPassword,
  newPassword
}) => {
  const dialogStyle = {
    width: "700px", 
    height: "auto", 
    maxHeight: "100vh", 
  };

  return (
    <React.Fragment>
      <Dialog
        open={onOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: dialogStyle }}
      >
        <div style={{ width: "100%" }}>
          <DialogTitle
            style={{ color: "tomato", marginBottom: "10px" }}
            id="alert-dialog-title"
          >
            {title}
          </DialogTitle>
          <DialogContent style={{ width: "100%" }}>
            <TextField
              style={{ width: "100%" }}
              onChange={(e) => newPassword(e.target.value)}
              id="outlined-required"
              label="New Password"
              name="newPassword"
              variant="outlined"
              required
            />{" "}
            <br></br>
            <br></br>
            <TextField
              style={{ width: "100%" }}
              onChange={(e) => confirmPassword(e.target.value)}
              id="outlined-required"
              label="Confirm Password"
              name="confirmPassword"
              variant="outlined"
              required
            />
          </DialogContent>
          <DialogActions style={{marginRight:"2%"}}>
            <Button onClick={onClose}>{cancelButton}</Button>
            <Button onClick={onConfirm} autoFocus>
              {confirmButton}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default PasswordResetModal;
