import React, { useEffect, useState } from "react";
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
  Input,
} from "@mui/material";
import CreatecategoryModal from "../components/CreatecategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubCategory,
  getSubCategory,
} from "../state/category/categorySlice";

const CreateSubCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { userReducher } = useSelector((state) => state);
  const { subCategoryList } = useSelector((state) => state.categoryReducer);
  const { token } = userReducher;
  const { selectedCategory } = useSelector((state) => state.categoryReducer);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("subCategoryName", subCategory);
    formData.append("status", status);
    formData.append("categoryId", selectedCategory?.id);
    if (image) {
      formData.append("subCategoryImage", image); // Append the image file to the form data
    }

    //     await dispatch(addCategory({ formData, token }));
    //     await dispatch(getCategory(token));
    //     handleCloseModal();
    console.log(formData);
    await dispatch(addSubCategory({ data: formData, token }));
  };
  useEffect(() => {
    dispatch(getSubCategory({ token, id: selectedCategory?.id }));
  }, [selectedCategory?.id, token, dispatch]);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Save the selected image to state
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
            onChange={(e) => setSubCategory(e.target.value)}
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

        {/* Image Upload Field */}
        <Grid item xs={12} sm={8} md={12}>
          <Input
            accept="image/*"
            onChange={handleImageChange}
            sx={{ width: 300 }}
            type="file"
            style={{ marginTop: "10px" }}
            id="image-upload"
          />
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
            marginTop: { xs: "5%", md: "3%" },
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
              background: "linear-gradient(45deg, #120c77 0%, #050636 100%)",
              color: "white",
              fontWeight: "bold",
              mb: 2,
              ":hover": {
                background: "linear-gradient(45deg, #FF4B2B 0%, #FF416C 100%)",
              },
              borderRadius: "30px",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            variant="contained"
          >
            Add sub category
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sub Category Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">image</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subCategoryList.map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {category.subCategoryName}
                    </TableCell>
                    <TableCell align="right">{category.status}</TableCell>
                    <TableCell align="right">
                      <a href={category?.subCategoryImageUrl}>view</a>
                    </TableCell>
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

export default CreateSubCategory;
