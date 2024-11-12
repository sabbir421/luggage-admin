import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "../components/ConfirmModal";
import { deleteAdmin, fetchAdminList } from "../state/admin/adminSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { setClickedAdmin } from "../state/admin/singleAdminSlice";

const AdminList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userReducher, adminList } = useSelector((state) => state);
  const { token, loginUser } = userReducher;

  useEffect(() => {
    dispatch(fetchAdminList(token));
  }, [dispatch, token]);

  const adminData = adminList?.data;
  const activeAdmin = adminData?.filter((item) => item.status === "ACTIVE");

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedAdmin(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    await dispatch(deleteAdmin({ id: selectedAdmin.id, token: token }));
    dispatch(fetchAdminList(token));
    handleCloseDeleteModal();
    navigate("/admin");
  };
  const handleSelectProject = (admin) => {
    dispatch(setClickedAdmin(admin));
  };

  return (
    <>
      <Layout>
        <TableContainer component={Paper} style={{ marginTop: "65px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeAdmin?.map((admin) => (
                <TableRow
                  key={admin?.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {admin?.id}
                  </TableCell>
                  <TableCell align="right">{admin?.name}</TableCell>
                  <TableCell align="right">{admin?.email}</TableCell>
                  <TableCell align="right">{admin?.mobile}</TableCell>
                  <TableCell align="right">{admin?.role}</TableCell>
                  <TableCell align="right">
                    {loginUser?.id===admin?.id && <NavLink
                      onClick={() => handleSelectProject(admin)}
                      to={"/admin/update"}
                      style={{
                        marginLeft: "5px",
                        color: "#ff4000",
                        backgroundColor: "white",
                        border: 0,
                      }}
                    >
                      <EditIcon />
                    </NavLink>}
                   {loginUser?.id===admin?.id||loginUser?.role==="SUPERADMIN"? <button
                      style={{
                        marginLeft: "5px",
                        color: "#ff4000",
                        backgroundColor: "white",
                        border: 0,
                      }}
                      onClick={() => handleOpenDeleteModal(admin)}
                    >
                      <DeleteIcon />
                    </button>:""}
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>

      {/* Delete Modal */}
      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirmation}
        text="Are you sure you eant to DELETE"
      />
    </>
  );
};

export default AdminList;
