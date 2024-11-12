import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserList } from '../state/User/userSlice';
import Layout from '../components/layout';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

const UserView = () => {
  const [country, setCountry] = useState('all'); // State to manage the selected filter option

  const getCountryStyle = (country) => {
    if (country === 'UK') {
      return { color: 'blue', fontWeight: 'bold' };
    } else if (country === 'France') {
      return { color: 'darkorange', fontWeight: 'bold' };
    } else {
      return {}; 
    }
  };

  const { userList } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  const filteredRows = userList
    ? userList.filter((user) => {
        if (country === 'all') {
          return user
        }
        return user.countryCode === (country === 'UK' ? '+44' : '+33');
      })
    : [];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 130, renderCell: (params) => (
      <strong style={{ color: 'green', fontWeight: 'bold' }}>{params.value}</strong>
    ) },
    { field: 'mobile', headerName: 'Mobile', width: 130 },
    { field: 'status', headerName: 'Status', width: 130, renderCell: (params) => (
      <strong style={{ color: 'red', fontWeight: 'bold' }}>{params.value}</strong>
    ) },
    { field: 'createdAt', headerName: 'Created At', width: 150 }, 
    { field: 'updatedAt', headerName: 'Updated At', width: 150 },
  ];

  return (
    <Layout>
      <Typography style={{ marginTop: '85px' }} variant="h6" color="initial">
        User List
      </Typography>

      {/* Filter options */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="radio"
          id="all"
          name="filter"
          value="all"
          checked={country === 'all'}
          onChange={() => setCountry('all')}
        />
        <label htmlFor="all">All</label>

        <input
          type="radio"
          id="UK"
          name="filter"
          value="UK"
          checked={country === 'UK'}
          onChange={() => setCountry('UK')}
        />
        <label htmlFor="UK">UK</label>

        <input
          type="radio"
          id="France"
          name="filter"
          value="France"
          checked={country === 'France'}
          onChange={() => setCountry('France')}
        />
        <label htmlFor="France">France</label>
      </div>

      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={country === 'all' ? columns.concat({ field: 'country', headerName: 'Country', width: 130, renderCell: (params) => (
            <strong style={{...getCountryStyle(params.value), textAlign: 'center'}}>{params.value}</strong>
          ) }) : columns}
          pageSize={pageSize}
          page={page}
          pagination
          onPageChange={(newPage) => handleChangePage(newPage)}
          onPageSizeChange={(newPageSize) => handleChangePageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </Layout>
  );
};

export default UserView;
