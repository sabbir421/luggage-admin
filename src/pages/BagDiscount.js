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
import {
  changeBagOfferStatus,
  getBagDiscount,
} from "../state/offer/offerSlice";
import CreateOfferModal from "../components/CreateOfferMOdal";

const BagDiscount = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useSelector((state) => state.userReducher);
  const { bagDiscountList } = useSelector((state) => state.offerReducer);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getBagDiscount(token));
  }, [dispatch, token]);
  const handleModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleChangeStatus = async (currentStatus, id) => {
    const status = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    await dispatch(changeBagOfferStatus({ token, id, status: { status } }));
    await dispatch(getBagDiscount(token));
  };
  return (
    <>
      <Layout>
        <Typography
          style={{
            marginTop: "80px",
            textAlign: "center",
            fontFamily: "serif",
          }}
        >
          Bag discount
        </Typography>
        <Button
          onClick={handleModal}
          style={{ backgroundColor: "tomato", color: "white" }}
        >
          Add new
        </Button>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Bag</TableCell>
                <TableCell align="center">Discount</TableCell>
                <TableCell align="center">Valid Date</TableCell>
                <TableCell align="center">Max Used</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bagDiscountList.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row?.bag}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row?.discountBag}
                  </TableCell>
                  <TableCell align="center">{row?.validDate}</TableCell>
                  <TableCell align="center">{row?.maxUsed}</TableCell>
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
          count={bagDiscountList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Layout>
      <CreateOfferModal
        open={isModalOpen}
        onClose={handleCloseModal}
        from="bag"
        title="Luggage bag discount"
      />
    </>
  );
};

export default BagDiscount;
