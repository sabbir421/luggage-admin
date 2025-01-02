import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  approveCompany,
  fetchPendingCompany,
  rejectCompany,
  resetCompanyStatus,
} from "../state/company/companySlice";
import ConfirmModal from "../components/ConfirmModal";
import RejectModal from "../components/RejectModal";

const PendingCompany = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducher);
  const { pendingCompany, isLoading, approved, error, reject } = useSelector(
    (state) => state.companyReducer
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectMessage, setRejectMessage] = useState("");
  useEffect(() => {
    dispatch(fetchPendingCompany(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (approved || reject) {
      setSnackbarMessage("Request successfully done!");
      setSnackbarOpen(true);
      dispatch(resetCompanyStatus());
    } else if (error) {
      setSnackbarMessage("Request fail something wrong!");
      setSnackbarOpen(true);
      dispatch(resetCompanyStatus());
    }
  }, [approved, dispatch, error,reject]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleRejectModal = (company) => {
    setSelectedCompany(company);
    setIsRejectModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
  };

  const handleConfirmation = async () => {
    await dispatch(
      approveCompany({ token: token, companyId: selectedCompany.id })
    );
    await dispatch(fetchPendingCompany(token));
    handleCloseModal();
  };
  const handleReject = async () => {
    await dispatch(
      rejectCompany({
        token: token,
        companyId: selectedCompany.id,
        data: { message: rejectMessage },
      })
    );
    await dispatch(fetchPendingCompany(token));
    handleCloseRejectModal();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Layout>
        <h1 style={{ marginTop: "75px", textAlign: "center" }}>
          Pending company
        </h1>
        {isLoading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Company Name</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">State or Region</TableCell>
                <TableCell align="center">Years of Operation</TableCell>
                <TableCell align="center">Mobile</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Proof</TableCell>
                <TableCell align="center">Signature</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingCompany.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row?.companyName}
                  </TableCell>
                  <TableCell align="center">{row?.country}</TableCell>
                  <TableCell align="center">{row?.address}</TableCell>
                  <TableCell align="center">{row?.stateOrRegion}</TableCell>
                  <TableCell align="center">{row?.YearsOfOperation}</TableCell>
                  <TableCell align="center">{row?.phone}</TableCell>
                  <TableCell align="center">{row?.status}</TableCell>
                  <TableCell align="center">
                    <a
                      href={row?.proof}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "#1976d2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <VisibilityIcon fontSize="small" sx={{ mr: 0.5 }} />
                      Proof
                    </a>
                  </TableCell>

                  <TableCell align="center">
                    <a
                      href={row?.signature}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "#1976d2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <VisibilityIcon fontSize="small" sx={{ mr: 0.5 }} />
                      Signature
                    </a>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      onClick={() => handleOpenModal(row)}
                      startIcon={<CheckCircleIcon />}
                      sx={{
                        color: "#4caf50",
                        textTransform: "none",
                        backgroundColor: "#050636",
                        "&:hover": {
                          backgroundColor: "rgba(76, 175, 80, 0.08)",
                        },
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleRejectModal(row)}
                      startIcon={<CancelIcon />}
                      sx={{
                        color: "#f44336",
                        textTransform: "none",
                        backgroundColor: "#050636",
                        ml: 1,
                        "&:hover": {
                          backgroundColor: "rgba(244, 67, 54, 0.08)",
                        },
                      }}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pendingCompany?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Layout>
      <ConfirmModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmation}
        text="Are you sure you want to approve this company?"
      />
      <RejectModal
        open={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        onConfirm={handleReject}
        text="Are you sure you want to reject this company?"
        setRejectMessage={setRejectMessage}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default PendingCompany;
