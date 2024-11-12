import React, { useState } from "react";
import Layout from "../components/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; 
import PasswordResetModal from "../components/PasswordResetModal";
import { resetPassword } from "../state/admin/adminSlice";

const Profile = () => {
    const dispatch =useDispatch()
    const { loginUser,token } = useSelector((state) => state.userReducher)
    const joinedDate = loginUser?.createdAt.split('T')[0];
    const [modalOpen,setModalOpen]=useState(false)
    const[newPassword,setNewPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const handleModalOpen=(user)=>{
            setModalOpen(true)
    }
    const handleModalClose=()=>{
        setModalOpen(false)
    }
    const handleResetPass=async()=>{
        const data={
           newPassword,confirmPassword
        }
       await dispatch(resetPassword({adminId:loginUser.id,data,token}))
       await handleModalClose()

    }
  return (
    <>
    <Layout>
      <div style={{ 
        marginLeft: "20%", 
        marginTop: "120px",
        width: "60%",
        height: "auto",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
      }}>
        <Typography variant="h4" style={{ marginBottom: "20px" }}>My Account</Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { marginBottom: "20px", width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            label="name"
            id="outlined-required"
            disabled
            value={loginUser?.name} 
          />
          <TextField
            required
            id="outlined-required"
            disabled
            value={loginUser?.role} 
          />
          <TextField
            required
            id="outlined-required"
            disabled
            value={joinedDate}
          />
          
          <Typography variant="body1" style={{ marginBottom: "20px" }}>You can update your password.</Typography>
          <Button onClick={() => handleModalOpen(loginUser)} variant="contained" style={{ backgroundColor: "black", color: "white", fontWeight:"bold" }}>Change Password</Button>
        </Box>
      </div>
    </Layout>

    <PasswordResetModal
        onOpen={modalOpen}
        onClose={handleModalClose}
        title="Reset Your password"
        onConfirm={handleResetPass}
        confirmButton="Reset"
        cancelButton="Cancel"
        newPassword={setNewPassword}
        confirmPassword={setConfirmPassword}
    />
    </>
  );
};

export default Profile;
