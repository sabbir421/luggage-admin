import React, { useEffect } from 'react';
import Layout from '../components/layout';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveVendorList } from '../state/activeVendor/activeVendorSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const VendorList = () => {
  const token = useSelector((state) => state.userReducher.token);
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.activeVendorList);

  useEffect(() => {
      dispatch(fetchActiveVendorList(token)); 
  }, [dispatch, token]);

  return (
    <Layout>
      <Typography style={{ marginTop: '85px' }} variant="h6" color="initial">
        Vendor List
      </Typography>
     
      {isLoading && <p>Loading...</p>} 
      { data?.length > 0 && (
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
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map(vendor => (
                <TableRow key={vendor?.id}>
                  <TableCell>{vendor?.id}</TableCell>
                  <TableCell>{vendor?.name}</TableCell>
                  <TableCell>{vendor?.email}</TableCell>
                  <TableCell>{vendor?.mobile}</TableCell>
                  <TableCell>{vendor?.regType}</TableCell>
                  <TableCell style={{ color: vendor?.role === 'VENDOR' ? 'green' : 'inherit', fontWeight: 'bold'}}>{vendor?.role}</TableCell>
                  <TableCell style={{ color: vendor?.status === 'APPROVE' ? 'red' : 'inherit', fontWeight: 'bold' }}>{vendor?.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <p>Error: {error}</p>} 
    </Layout>
  );
};

export default VendorList;
