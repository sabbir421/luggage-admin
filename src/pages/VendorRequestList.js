import React, { useEffect } from "react";
import Layout from "../components/layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  approveVendorRequst,
  fetchVendorRequest,
  rejectVendorRequest,
  setClickedVendor,
} from "../state/vendor/vendorSlice";
import { Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useNavigate } from "react-router-dom";


const VendorRequestList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userReducher, vendorRequestList } = useSelector((state) => state);
  const requestList = vendorRequestList.data || [];
  const { token } = userReducher;


  useEffect(() => {
    dispatch(fetchVendorRequest(token));
  }, [token, dispatch]);


  const handleVendorReject = async (request) => {
    const id = request.id;
    await dispatch(rejectVendorRequest({ id, token }));
    dispatch(fetchVendorRequest(token));
    navigate("/vendor/request");
  };
  const handleApprove = async (id) => {
    await dispatch(approveVendorRequst({ id, token }));
    dispatch(fetchVendorRequest(token));
    navigate("/vendor/request");
  };

  const handleViewDetails = (request) => {
    dispatch(setClickedVendor(request))
    navigate("/vendor/request/details");
  };


  return (
    <Layout>
      <TableContainer component={Paper} style={{ marginTop: "65px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">mobile</TableCell>
              <TableCell align="left">Business Name</TableCell>
              <TableCell align="left">Id Proof File</TableCell>
              <TableCell align="left">Profile Image</TableCell>
              <TableCell align="left">Address Proof file</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestList?.map((request) => (
               request.status !== "ACTIVE" && (
               // This part will be visible only if the request status is not Active
              <TableRow
                key={request?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {request?.fullName}
                </TableCell>
                <TableCell align="right">{request?.email}</TableCell>
                <TableCell align="right">{request?.mobileNo}</TableCell>
                <TableCell align="right">{request?.businessName}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#FF5733" }}
                  >
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href={request?.idProofUrl}
                      target="blank"
                    >
                      View
                    </a>
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#FF5733" }}
                  >
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href={request?.profileUrl}
                      target="blank"
                    >
                      View
                    </a>
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#050636" }}
                  >
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href={request?.addressUrl}
                      target="blank"
                    >
                      View
                    </a>
                  </Button>
                </TableCell>
                <TableCell align="center" style={{ display: "flex" }}>
                  <Button onClick={() => handleApprove(request.id)}>
                    <DoneIcon />
                  </Button>
                  <Button onClick={() => handleVendorReject(request)}>
                    <CancelIcon style={{ color: "red" }} />
                  </Button>
                  <Button onClick={()=>handleViewDetails(request)}>
                    <DescriptionOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default VendorRequestList;
