import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeOfferStatus, getAllOferList } from "../state/offer/offerSlice";

const ManageOffer = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducher);
  const { offerList } = useSelector((state) => state.offerReducer);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    dispatch(getAllOferList(token));
  }, [dispatch, token]);
  const handleChangeStatus = async (currentStatus, id) => {
    const status = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    await dispatch(changeOfferStatus({ token, id, data: { status } }));
    await dispatch(getAllOferList(token));
  };
  return (
    <Layout>
      <Typography style={{ marginTop: "75px" }}>Offer list</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offerList?.map((row) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row?.offerType}
                </TableCell>
                <TableCell align="center">{row?.status}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleChangeStatus(row?.status, row?.id)}
                    style={{
                      backgroundColor:
                        row?.status === "ACTIVE" ? "red" : "green",
                      color: "white",
                    }}
                  >
                    {row?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"}
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
        count={offerList?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Layout>
  );
};

export default ManageOffer;
