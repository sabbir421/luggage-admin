import { Alert, Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";

const UserDeleteForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = () => {
    setName("");
    setEmail("");
    setMobile("");
    setSuccess(true);
  };
  return (
    <Container>
      <h3 style={{ textAlign: "center" }}>Delete your account</h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <label style={{ marginLeft: "25%" }}>Name</label>
        <TextField
          required
          style={{ width: "50%", marginLeft: "25%" }}
          id="outlined-basic"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
        <label style={{ marginLeft: "25%" }}>Email</label>
        <TextField
          required
          style={{ width: "50%", marginLeft: "25%" }}
          id="outlined-basic"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          variant="outlined"
        />
        <label style={{ marginLeft: "25%" }}>Mobile</label>
        <TextField
          required
          style={{ width: "50%", marginLeft: "25%" }}
          id="outlined-basic"
          value={mobile}
          placeholder="Mobile"
          onChange={(e) => setMobile(e.target.value)}
          variant="outlined"
        />
        {email || name || mobile !== "" ? (
          <Button
            style={{
              width: "50%",
              marginLeft: "25%",
              color: "white",
              backgroundColor: "black",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button
            disabled
            style={{
              width: "50%",
              marginLeft: "25%",
              color: "white",
              backgroundColor: "gray",
            }}
            onClick={handleSubmit}
          >
            Delete request
          </Button>
        )}

        {success === true && (
          <Alert style={{ width: "50%", marginLeft: "25%" }} severity="success">
            Your account delete request success successfully
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default UserDeleteForm;
