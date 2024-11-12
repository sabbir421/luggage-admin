import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextareaAutosize,
} from "@mui/material";
import React from "react";

const RejectModal = ({ open, onClose, text, onConfirm, setRejectMessage }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 4,
            animation: "fadeIn 0.3s ease",
            overflow: "visible",
          },
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "scale(0.9)" },
            "100%": { opacity: 1, transform: "scale(1)" },
          },
        }}
      >
        <DialogTitle
          style={{
            color: "white",
            background: "linear-gradient(45deg, #f44336, #ff7961)",
            textAlign: "center",
            padding: "16px 24px",
            borderRadius: "4px 4px 0 0",
          }}
          id="alert-dialog-title"
        >
          {text}
        </DialogTitle>
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            backgroundColor: "#f9f9f9",
            px: 3,
          }}
        >
          <TextareaAutosize
            style={{
              width: "80%",
              height: "50px",
              marginLeft: "10%",
              padding: "8px",
              borderRadius: 8,
              borderColor: "#e0e0e0",
              outline: "none",
              fontSize: "16px",
              resize: "none",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              transition: "border-color 0.2s",
            }}
            name="Solid"
            placeholder="Reject message…"
            variant="solid"
            onChange={(e) => setRejectMessage(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = "#f44336")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            rows={4}
          />
        </Box>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            sx={{
              color: "#555",
              backgroundColor: "#e0e0e0",
              "&:hover": {
                backgroundColor: "#d0d0d0",
                color: "#000",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            sx={{
              background: "linear-gradient(45deg, #ff7961, #f44336)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #f44336, #ff7961)",
                boxShadow: "0 3px 5px rgba(255, 105, 135, .3)",
              },
              ml: 1,
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RejectModal;
