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
  addFacility,
  facilityStatusChange,
  facilityUpdate,
  getFacility,
} from "../state/facility/facilitySlice";
import FacilityUpdateModal from "../components/FacilityUpdateModal";
const Facility = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.userReducher);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isUpadateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const handleOpenUpdateModal = (facility) => {
    setSelectedFacility(facility);
    setIsUpdateModalOpen(true);
  };

  const handleCloseupdateModal = () => {
    setSelectedFacility(null);
    setIsUpdateModalOpen(false);
  };
  const { facilites } = useSelector((state) => state.facilityList);
  useEffect(() => {
    dispatch(getFacility({ token }));
  }, [dispatch, token]);
  const [newFacility, setNewfacility] = useState("");
  const [failityField, setFacilityField] = useState(false);
  const [updatedFacility, setUpdatedFacility] = useState("");
  const handleFacilityField = () => {
    setFacilityField(true);
  };
  const handleFacility = async () => {
    const data = { facility: newFacility };
    await dispatch(addFacility({ token, data }));
    await setNewfacility("");
    await dispatch(getFacility({ token }));
  };
  const handleStaus = async (id, status) => {
    await dispatch(facilityStatusChange({ id, token, status: { status } }));
    await dispatch(getFacility({ token }));
  };
  const handleUpdate = async () => {
    await dispatch(
      facilityUpdate({
        id: selectedFacility?.id,
        token,
        facility: { facility: updatedFacility },
      })
    );
    await dispatch(getFacility({ token }));

    await handleCloseupdateModal();
  };
  return (
    <>
      <div>
        <Layout>
          <Box style={{ width: "85%", marginTop: "80px" }}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Store Facility
            </Typography>
            <TableContainer component={Paper} style={{ marginBottom: "10px" }}>
              <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Facility</TableCell>
                    <TableCell align="center">ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {facilites?.map((facility) => (
                    <TableRow
                      key={facility?.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {facility?.id}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {facility?.facility}
                      </TableCell>
                      <TableCell align="center">
                        {facility?.status === "ACTIVE" ? (
                          <Button
                            style={{ color: "white", backgroundColor: "red" }}
                            onClick={() =>
                              handleStaus(facility?.id, "INACTIVE")
                            }
                          >
                            INACTIVE
                          </Button>
                        ) : (
                          <Button
                            style={{
                              color: "white",
                              backgroundColor: "green",
                              paddingLeft: "20px",
                            }}
                            onClick={() => handleStaus(facility?.id, "ACTIVE")}
                          >
                            ACTIVE
                          </Button>
                        )}

                        <Button
                          style={{
                            color: "white",
                            backgroundColor: "DodgerBlue",
                            marginLeft: "10px",
                          }}
                          onClick={() => handleOpenUpdateModal(facility)}
                        >
                          UPDATE
                        </Button>
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
              ADD NEW FACILITY
            </Button>
            {failityField === true && (
              <>
                <TextField
                  style={{
                    width: "80%",
                    padding: "5px",
                    marginBottom: "10px",
                    marginLeft: "10%",
                  }}
                  id="outlined-basic"
                  label="Facility"
                  variant="outlined"
                  value={newFacility}
                  onChange={(e) => setNewfacility(e.target.value)}
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
                  onClick={handleFacility}
                >
                  <AddOutlinedIcon /> ADD
                </Button>
              </>
            )}
          </Box>
        </Layout>
      </div>
      <FacilityUpdateModal
        open={isUpadateModalOpen}
        onClose={handleCloseupdateModal}
        facility={selectedFacility}
        text="Update Facility"
        onConfirm={handleUpdate}
        setUpdatedFacility={setUpdatedFacility}
      />
    </>
  );
};

export default Facility;
