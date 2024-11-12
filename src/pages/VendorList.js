import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveVendorList } from "../state/activeVendor/activeVendorSlice";
import {  showVendorId } from "../state/vendor/vendorSlice";
import { showVendorBalance } from "../state/vendor/vendorSlice";
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
import PaymentModal from "../components/PaymentModal";
import { vendorBalanceHistory } from "../state/moneySlice/moneySlice";
import { useNavigate } from "react-router-dom";
import { setClickedVendor } from "../state/storeSlice/storeSlice";

const VendorList = () => {
  const token = useSelector((state) => state.userReducher.token);
  const { isLoading, data, error } = useSelector(
    (state) => state.activeVendorList
  );
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [vendorId, setVendorId] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);
  const [balanceAmount, setBalanceAmount] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenPaymentModal = (id) => {
    setVendorId(id);
    setIsPaymentModalOpen(true);
    fetchVendorBankInfo(id);
    setBalanceAmount(id);
    fetchVendorBalance(id);
  };
  useEffect(() => {
    dispatch(vendorBalanceHistory({ vendorId, token }));
  }, [dispatch, vendorId, token]);
  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchActiveVendorList(token));
    }
  }, [dispatch, token]);

  const fetchVendorBankInfo = (id) => {
    dispatch(showVendorId({ id, token }))
      .then((response) => {
        setBankInfo(response);
      })
      .catch((error) => {
        console.error("Error fetching bank info:", error);
      });
  };

  const fetchVendorBalance = (id) => {
    dispatch(showVendorBalance({ id, token }))
      .then((response) => {
        setBankInfo(response);
      })
      .catch((error) => {
        console.error("Error fetching bank balance:", error);
      });
  };
  const handleViewStore = async (id) => {
    await dispatch(setClickedVendor(id));
    await navigate("/partner/store/list");
  };
  return (
    <>
      <Layout>
        <Typography style={{ marginTop: "85px" }} variant="h6" color="initial">
          Vendor List
        </Typography>

        {isLoading && <p>Loading...</p>}
        {data && data.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Registration Type</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="left">Store</TableCell>
                  <TableCell style={{ textAlign: "center" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>{vendor.id}</TableCell>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.mobile}</TableCell>
                    <TableCell>{vendor.regType}</TableCell>
                    <TableCell
                      style={{
                        color: vendor.role === "VENDOR" ? "green" : "inherit",
                        fontWeight: "bold",
                      }}
                    >
                      {vendor.role}
                    </TableCell>
                    <TableCell
                      style={{
                        color: vendor.status === "APPROVE" ? "red" : "inherit",
                        fontWeight: "bold",
                      }}
                    >
                      {vendor.status}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => handleViewStore(vendor?.id)}
                        style={{ backgroundColor: "blue", color: "white" }}
                      >
                        View Store
                      </Button>{" "}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleOpenPaymentModal(vendor.id)}
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Payment
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {error && <p>Error: {error}</p>}
      </Layout>

      <PaymentModal
        open={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        vendorId={vendorId}
        bankInfo={bankInfo}
        balanceAmount={balanceAmount}
      />
    </>
  );
};

export default VendorList;
