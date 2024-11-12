import React, { useState } from "react";
import Layout from "../components/layout";
import {
  TextField,
  Grid,
  Box,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import CreatecategoryModal from "../components/CreatecategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getCategory,
  getSubCategory,
  setClickedCategory,
} from "../state/category/categorySlice";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const dispatch = useDispatch();
  const { userReducher } = useSelector((state) => state);
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { token } = userReducher;

  const navigate = useNavigate();
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };
  const clickSubCategory = async (category) => {
    await dispatch(setClickedCategory(category));
    await dispatch(getSubCategory({ token, id: category?.id }));
    navigate("/sub-category");
  };
  const handleSubmit = async () => {
    const data = {
      categoryName,
      status,
    };
    await dispatch(addCategory({ data, token }));
    await dispatch(getCategory(token));
    await handleCloseModal();
  };

  const modalContent = (
    <Box
      sx={{
        marginTop: { xs: "1%", md: "1%" },
        padding: { xs: "%", sm: "5%", md: "1%" },
        marginLeft: { md: "22%" },
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{ width: 300 }}
            style={{ marginTop: "10px" }}
            id="category-name"
            label="Category Name"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={8} md={12}>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ width: 300 }}
            style={{ marginTop: "10px" }}
            id="status"
            variant="outlined"
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Button
        onClick={handleSubmit}
        sx={{ width: 300, mt: 2 }}
        style={{ backgroundColor: "#050636" }}
        variant="contained"
      >
        Add category
      </Button>
    </Box>
  );

  return (
    <>
      <Layout>
        <Box
          sx={{
            marginTop: { xs: "5%", md: "3%" }, // Adjust margin for different breakpoints
            padding: { xs: "5%", sm: "5%", md: "2%" },
            marginLeft: { md: "0%" },
          }}
        >
          <Button
            onClick={handleModal}
            sx={{
              mt: 3,
              width: "180px",
              padding: "12px",
              background: "linear-gradient(45deg, #120c77 0%, #050636 100%)", // Gorgeous gradient button
              color: "white",
              fontWeight: "bold",
              mb: 2,
              ":hover": {
                background: "linear-gradient(45deg, #FF4B2B 0%, #FF416C 100%)", // Hover effect
              },
              borderRadius: "30px", // Rounded button
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Soft shadow for button
            }}
            variant="contained"
          >
            Add new category
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList.map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {category.categoryName}
                    </TableCell>
                    <TableCell align="right">{category.status}</TableCell>
                    <TableCell align="center">
                      <Button
                        style={{
                          backgroundColor: "DarkOrange",
                          color: "white",
                        }}
                      >
                        edit
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                      >
                        delete
                      </Button>
                      <Button
                        onClick={() => clickSubCategory(category)}
                        style={{ backgroundColor: "#8A2BE2", color: "white" }}
                      >
                        sub category
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Layout>

      <CreatecategoryModal
        html={modalContent}
        open={isModalOpen}
        onClose={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateCategory;
