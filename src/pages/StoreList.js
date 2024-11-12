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
import { fetchStoreList } from "../state/storeSlice/storeSlice";

const StoreList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducher);
  const { storeList } = useSelector((state) => state.storeReducer);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchStoreList(token));
  }, [dispatch, token]);
  return (
    <Layout>
      <Typography variant="h5"
        style={{ marginTop: "80px", textAlign: "center", fontFamily: "serif" }}
      >
        Store list
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Provider Name</TableCell>
              <TableCell align="center">Store Name</TableCell>
              <TableCell align="center">Country Name</TableCell>
              <TableCell align="center">City Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Store Image</TableCell>
              <TableCell align="center">Area Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storeList.map((row) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row?.providerName}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row?.businessName}
                </TableCell>
                <TableCell align="center">{row?.countryName}</TableCell>
                <TableCell align="center">{row?.cityName}</TableCell>
                <TableCell align="center">{row?.address}</TableCell>
                <TableCell align="center">{row?.providerMobile}</TableCell>
                <TableCell align="center">{row?.status}</TableCell>
                <TableCell align="center">
                  <a
                    style={{ textDecoration: "none" }}
                    href={row?.storeImageUrl}
                    target="blank"
                  >
                    View
                  </a>
                </TableCell>
                <TableCell align="center">
                  <a
                    style={{ textDecoration: "none" }}
                    href={row?.areaImageUrl}
                    target="blank"
                  >
                    View
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={storeList?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Layout>
  );
};

export default StoreList;
