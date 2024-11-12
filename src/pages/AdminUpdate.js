import React, { useState } from "react";
import Layout from "../components/layout";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAdmin } from "../state/admin/adminSlice";

const AdminUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userReducher, singleAdmin } = useSelector((state) => state);
  const { selectedAdmin: admin } = singleAdmin;
  const { token } = userReducher;

  const [adminName, setAdminName] = useState(admin?.name || "");
  const [adminEmail, setAdminEmail] = useState(admin?.email || "");
  const [adminMobile, setAdminMobile] = useState(admin?.mobile || "");
  const [adminStatus, setAdminStatus] = useState(admin?.status || "");
  const [adminRole, setAdminRole] = useState(admin?.role || "");

  const handleUpdate = () => {
    const updatedAdminData = {
      name: adminName,
      email: adminEmail,
      mobile: adminMobile,
      status: adminStatus,
      role: adminRole,
    };
    dispatch(updateAdmin({ id: admin.id, data: updatedAdminData, token }));
    navigate("/admin");
  };

  return (
    <Layout>
      <Box
        component="form"
       
        style={{ marginTop: "100px", marginLeft: "25%",width:"50%" }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          style={{
            width: "80%",
            marginLeft: "10%",
            marginBottom: "10px",
          }}
          id="outlined-required"
          label="Name"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />
        <br />
        <TextField
        style={{
          width: "80%",
          marginLeft: "10%",
          marginBottom: "10px",
        }}
          required
          id="outlined-required"
          label="Email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          disabled
        />
        <br />
        <TextField
        style={{
          width: "80%",
          marginLeft: "10%",
          marginBottom: "10px",
        }}
          required
          id="outlined-required"
          label="Mobile"
          value={adminMobile}
          onChange={(e) => setAdminMobile(e.target.value)}
        />
        <br />
        <TextField
        style={{
          width: "80%",
          marginLeft: "10%",
          marginBottom: "10px",
        }}
          required
          id="outlined-required"
          label="Status"
          value={adminStatus}
          onChange={(e) => setAdminStatus(e.target.value)}
          disabled
        />
        <br />
        <TextField
        style={{
          width: "80%",
          marginLeft: "10%",
          marginBottom: "10px",
        }}
          className="field"
          required
          label="Role"
          value={adminRole}
          onChange={(e) => setAdminRole(e.target.value)}
          disabled
        />
        <br />
        <Button
          variant="contained"
          onClick={handleUpdate}
          style={{
           marginLeft:"10%",
            marginBottom: "10px",
            width: "80%",
            backgroundColor: "#050636",
            color: "white",
          }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default AdminUpdate;
