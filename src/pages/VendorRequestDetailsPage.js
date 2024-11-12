import React from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, CircularProgress } from "@mui/material";

const VendorRequestDetailsPage = () => {
  const selectedVendor = useSelector((state) => state.vendorRequestList.selectedVendor);

  if (!selectedVendor) {
    return <CircularProgress />; 
  }

  const vendorDetails = [
    { label: "ID", key: "id" },
    { label: "Email", key: "email" },
    { label: "Full Name", key: "fullName" },
    { label: "Profile Image", key: "profileUrl", isLink: true },
    { label: "ID Proof File", key: "idProofUrl", isLink: true },
    { label: "Address Proof File", key: "addressUrl", isLink: true },
    { label: "About Me", key: "aboutMe" },
    { label: "Business Name", key: "businessName" },
    { label: "Business Address", key: "businessAddress" },
    { label: "Is Available", key: "is_available" },
    { label: "Status", key: "status" },
    { label: "Mobile No", key: "mobileNo" },
    { label: "Google Address", key: "googleAddress" },
    { label: "Google Address Lat", key: "googleAddressLat" },
    { label: "Google Address Lng", key: "googleAddressLng" },
    { label: "Address Line One", key: "addressLineOne" },
    { label: "Address Line Two", key: "addressLineTwo" },
    { label: "Country ID", key: "fkCountry" },
    { label: "City ID", key: "fkCity" },
    { label: "Zip Code", key: "zipCode" },
    { label: "Created At", key: "createdAt" },
    { label: "Updated At", key: "updatedAt" },
  ];

  return (
    <div style={{ marginTop: "20px", background: "#f5f5f5", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" align="center" gutterBottom color="primary" marginBottom={"50px"} fontWeight={"bold"}>
        Vendor Details of {selectedVendor.fullName}
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: "1000px" }}>
        <Table>
          <TableBody>
            {vendorDetails.map((detail) => (
              <TableRow key={detail.key}>
                <TableCell style={{ width: "50%", textAlign: "left", padding: "10px" }}><strong>{detail.label}:</strong></TableCell>
                <TableCell style={{ width: "50%", textAlign: "left", padding: "10px" }}>
                  {detail.isLink ? (
                    <a href={selectedVendor[detail.key]} target="_blank" rel="noopener noreferrer">View</a>
                  ) : (
                    selectedVendor[detail.key].toString()
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VendorRequestDetailsPage;
