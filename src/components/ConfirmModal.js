import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

const ConfirmModal = ({ open, onClose, onConfirm, text }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 4,
            animation: 'zoomIn 0.3s ease',
            overflow: 'hidden',
          },
          '@keyframes zoomIn': {
            '0%': { opacity: 0, transform: 'scale(0.9)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            color: 'white',
            background: 'linear-gradient(45deg, #f44336, #ff7961)',
            textAlign: 'center',
            padding: '16px 24px',
            fontWeight: 'bold',
          }}
        >
          {text}
        </DialogTitle>

        <Box sx={{ px: 3, pt: 2, pb: 1, textAlign: 'center' }}>
          {/* Optional: Add additional content or message here if needed */}
        </Box>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            sx={{
              color: '#555',
              backgroundColor: '#e0e0e0',
              '&:hover': {
                backgroundColor: '#d0d0d0',
                color: '#000',
              },
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            sx={{
              background: 'linear-gradient(45deg, #ff7961, #f44336)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #f44336, #ff7961)',
                boxShadow: '0 3px 5px rgba(255, 105, 135, .3)',
              },
              ml: 1,
              transition: 'background 0.3s ease, box-shadow 0.3s ease',
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

export default ConfirmModal;
