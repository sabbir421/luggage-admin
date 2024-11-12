import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { adminSignup } from "../state/signup/signupSlice";
import { MenuItem } from "@mui/material";
import Layout from "../components/layout";

function CreateEmploye() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userReducer = useSelector((state) => state.adminSignup);
  const { error, isLoading, signupSuccess } = userReducer;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const adminData = {
      name: data.get("name"),
      email: data.get("email"),
      mobile: data.get("mobile"),
      password: data.get("password"),
      role: data.get("role"),
    };

    dispatch(adminSignup(adminData));
  };

  if (signupSuccess) {
    navigate("/");
  }
  const role = ["SUPERADMIN", "ADMIN"];
  return (
    <Layout>
       <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" style={{marginTop:"20px"}}>
            Create Employee
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Admin Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobile"
              autoComplete="mobile"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
            style={{marginTop:"10px"}}
              id="role"
              name="role"
              select
              variant="outlined"
              defaultValue="ADMIN"
              fullWidth
              placeholder="select role"
              required
            >
              {role?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>{" "}
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Create
            </Button>
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Layout>
   
  );
}

export default CreateEmploye;
