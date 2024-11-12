import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button } from "@mui/material";

const CreatecategoryModal = ({ html, open, onClose}) => {


  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm" // Adjust modal width
        fullWidth
        PaperProps={{
          style: {
            borderRadius: 15, // Rounded corners
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Gradient background
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow for depth
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#050636", // Darker primary color
            color: "white", // White text
            textAlign: "center",
            fontWeight: "bold",
            padding: "16px 24px",
            borderTopLeftRadius: "15px", // Match the top corners with modal
            borderTopRightRadius: "15px",
          }}
        >
          Add New Category
        </DialogTitle>

        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly transparent white for contrast
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          {html}

          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              mt: 3,
              width: "180px",
              padding: "12px",
              background: "linear-gradient(45deg, #FF416C 0%, #FF4B2B 100%)", // Gorgeous gradient button
              color: "white",
              fontWeight: "bold",
              ":hover": {
                background: "linear-gradient(45deg, #FF4B2B 0%, #FF416C 100%)", // Hover effect
              },
              borderRadius: "30px", // Rounded button
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Soft shadow for button
            }}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default CreatecategoryModal;
