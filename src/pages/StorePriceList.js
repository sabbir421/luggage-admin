/** @format */
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import {
  storePriceList,
  priceListUpdate,
} from "../state/storePrice/storePriceSlice";
import StorePriceListUpdateModal from "../components/StorePriceListUpdateModal";

const StorePriceList = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducher);
  const { priceList, isLoading, error } = useSelector(
    (state) => state.storePrice
  );

  const [info, setInfo] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(storePriceList(token));
  }, [dispatch, token]);

  const handleOpenUpdateModal = (p_list) => {
    setInfo(p_list);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setInfo(null);
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async (updateInfo) => {
    await dispatch(
      priceListUpdate({
        id: updateInfo.id,
        token,
        data: updateInfo,
      })
    );
    await dispatch(storePriceList(token));
    handleCloseUpdateModal();
  };

  return (
    <>
      <Layout>
        <Typography style={{ marginTop: "85px" }} variant="h6" color="initial">
          Store Price List
        </Typography>

        <section style={{ margin: "10px" }}>
          {isLoading && <p>Loading...</p>}
          {priceList && priceList.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Tax</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>System fee</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {priceList.map((p_list) => (
                    <TableRow key={p_list.id}>
                      <TableCell>{p_list.id}</TableCell>
                      <TableCell>{p_list.country}</TableCell>
                      <TableCell>{p_list.price}</TableCell>
                      <TableCell>{p_list.tax}</TableCell>
                      <TableCell>{p_list.vendor}</TableCell>
                      <TableCell>{p_list.systemFee}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleOpenUpdateModal(p_list)}
                          style={{ backgroundColor: "blue", color: "white" }}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {error && <p>Error: {error}</p>}
        </section>
      </Layout>

      <StorePriceListUpdateModal
        open={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        priceInfo={info}
        text="Update Price List"
        onConfirm={handleUpdate}
      />
    </>
  );
};

export default StorePriceList;
