import React, { useEffect } from "react";
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
import {
  approveWithrawRequest,
  cancelWithrawRequest,
  fetchWithrowRequest,
} from "../state/withrow/withrowSlice";

const WithrawRequest = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducher);
  const { withrowRequestList } = useSelector((state) => state.withrowRequest);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchWithrowRequest(token));
  }, [dispatch, token]);
  const handleApprove = async (id) => {
    await dispatch(approveWithrawRequest({ id, token }));
    await dispatch(fetchWithrowRequest(token));
  };
  const handleReject = async (e) => {
    const id = e.id;
    const vendorId = e.vendorId;
    await dispatch(cancelWithrawRequest({ id, vendorId, token }));
    await dispatch(fetchWithrowRequest(token));
  };
  return (
    <Layout>
      <Typography
        style={{ marginTop: "80px", textAlign: "center", fontFamily: "serif" }}
      >
        Withraw Request
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Bank Name</TableCell>
              <TableCell align="center">Account No</TableCell>
              <TableCell align="center">Sort Code</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withrowRequestList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row.status === "PENDING" && (
                    <>
                      <TableCell component="th" scope="row">
                        {row?.id}
                      </TableCell>
                      <TableCell align="center">{row?.bankName}</TableCell>
                      <TableCell align="center">{row?.accountNo}</TableCell>
                      <TableCell align="center">{row?.sortCode}</TableCell>
                      <TableCell align="center">{row?.amount}</TableCell>
                      <TableCell align="center">{row?.status}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleApprove(row.id)}
                          style={{
                            backgroundColor: "limegreen",
                            color: "white",
                            marginRight: "2px",
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(row)}
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={withrowRequestList?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Layout>
  );
};

export default WithrawRequest;
