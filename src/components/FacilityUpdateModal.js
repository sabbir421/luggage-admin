import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

const FacilityUpdateModal = ({ open, onClose, text, onConfirm, facility, setUpdatedFacility }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm" // Set maximum width to large
        fullWidth // Take up full width
      >
        <DialogTitle style={{ color: "tomato" ,marginLeft:"40%"}} id="alert-dialog-title">
          {text}
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { marginLeft:"10%", width: "80%" }, // Set text field width to 100% of the container
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Facility"
              defaultValue={facility?.facility}
              multiline
              maxRows={4}
              onChange={(e) => setUpdatedFacility(e.target.value)}
            />
          </div>
        </Box>
        <DialogActions >
          <Button style={{marginRight:"55%",color:"white",backgroundColor:"red"}} onClick={onClose}>Cancel</Button>
          <Button style={{marginRight:"9%",color:"white",backgroundColor:"green"}} onClick={onConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FacilityUpdateModal;
