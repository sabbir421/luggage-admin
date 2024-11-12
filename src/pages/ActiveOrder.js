import React, { useEffect } from "react";
import Layout from "../components/layout";
import {
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
import { fetchOrder } from "../state/order/orderSlice";

const ActiveOrder = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducher);
  const { orders } = useSelector((state) => state.orderList);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchOrder(token));
  }, [dispatch, token]);
  return (
    <Layout>
      <Typography
        style={{ marginTop: "80px", textAlign: "center", fontFamily: "serif" }}
      >
        Active Order
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Customer Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Provider Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Store Name</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              ?.filter((order) => order.status !== "picked-off") // Filter orders by status
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.id}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row?.customrName}
                  </TableCell>
                  <TableCell align="center">{row?.price}</TableCell>
                  <TableCell align="center">{row?.providerName}</TableCell>
                  <TableCell align="center">{row?.quantity}</TableCell>
                  <TableCell align="center">{row?.storeName}</TableCell>
                  <TableCell align="center"><a href={row?.imageUrl} target="blank" style={{textDecoration:"none",color:"white",backgroundColor:"#050636", padding:"10px",borderRadius:"5px"}}>View</a></TableCell>
                  <TableCell align="center">{row?.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Layout>
  );
};

export default ActiveOrder;
