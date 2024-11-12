import React from "react";
import Navbar from "../Navbar";
import { Box, Grid } from "@mui/material";
import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <Grid container spacing={2}>
      <Grid
        style={{
          marginTop: "65px",
        }}
        item
        xs={2}
      >
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Navbar />
        <Box>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
