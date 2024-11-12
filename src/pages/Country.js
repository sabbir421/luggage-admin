import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  createCountry,
  fetchCity,
  fetchCountry,
} from "../state/countryAndCity/countryAndCitySlice";
const Country = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.userReducher);
  const [newCountry, setNewCountry] = useState("");
  const [addCountry, setAddCountry] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const { country } = useSelector((state) => state.countryCity);
  const handleFacilityField = () => {
    setAddCountry(true);
  };

  useEffect(() => {
    dispatch(fetchCountry(token));
    dispatch(fetchCity(token));
  }, [dispatch, token]);

  const handleSubmit = async () => {
    const data = { countryName: newCountry, countryCode, status: "ACTIVE" };
    await dispatch(createCountry({ token: token, data }));
    await setAddCountry(false);
    await setCountryCode("");
    await setNewCountry("");
    await dispatch(fetchCountry(token));
  };

  return (
    <div>
      <Layout>
        <Box style={{ width: "85%", marginTop: "80px" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", fontFamily: "serif" }}
          >
            Country List
          </Typography>
          <TableContainer component={Paper} style={{ marginBottom: "10px" }}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Country Code</TableCell>
                  <TableCell align="center">Country Name</TableCell>
                  <TableCell align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {country?.map((item) => (
                  <TableRow
                    key={item?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {item?.countryCode}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {item?.countryName}
                    </TableCell>
                    <TableCell align="center">
                      <Button>DELETE</Button>
                      <Button>UPDATE</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            style={{
              backgroundColor: "OrangeRed",
              color: "white",
              marginLeft: "40%",
              marginBottom: "20px",
            }}
            onClick={handleFacilityField}
          >
            <CreateOutlinedIcon />
            ADD NEW COUNTRY
          </Button>
          {addCountry === true && (
            <>
              <TextField
                style={{
                  width: "80%",
                  padding: "5px",
                  marginBottom: "10px",
                  marginLeft: "10%",
                }}
                id="outlined-basic"
                label="Country Name"
                variant="outlined"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
              />
              <TextField
                style={{
                  width: "80%",
                  padding: "5px",
                  marginBottom: "10px",
                  marginLeft: "10%",
                }}
                id="outlined-basic"
                label="Country code"
                variant="outlined"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
              <Button
                style={{
                  width: "80%",
                  marginLeft: "10%",
                  padding: "5px",
                  backgroundColor: "OrangeRed",
                  color: "white",
                  marginBottom: "20px",
                }}
                onClick={handleSubmit}
              >
                <AddOutlinedIcon /> ADD
              </Button>
            </>
          )}
        </Box>
      </Layout>
    </div>
  );
};

export default Country;
