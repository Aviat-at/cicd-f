// src/components/ViewDeleteDepartmentModal.js
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SoftTypography from 'components/SoftTypography';
import { deleteDepartment, updateDepartment } from 'services/api';
import PropTypes from 'prop-types';
import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ViewDeleteDepartmentModal = ({ open, handleClose, department, onDepartmentDeleted, onDepartmentUpdated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (department) {
      setName(department.name);
      setDescription(department.description);
    }
  }, [department]);

  const handleDelete = async () => {
    try {
      await deleteDepartment(department.id);
      onDepartmentDeleted(department.id);
      handleClose();
    } catch (error) {
      console.error('Failed to delete department', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatedDepartment = await updateDepartment(department.id, { name, description });
      onDepartmentUpdated(updatedDepartment);
      handleClose();
    } catch (error) {
      console.error('Failed to update department', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SoftTypography id="modal-modal-title" variant="h6" component="h2">
          View / Edit Department
        </SoftTypography>
        <Box component="form" onSubmit={handleUpdate} mt={2}>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Name
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Description
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </SoftBox>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ color: 'white !important', mt: 3 }}>
            Update Department
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          fullWidth sx={{ color: 'white !important', mt: 3 }}
        >
          Delete Department
        </Button>
      </Box>
    </Modal>
  );
};

ViewDeleteDepartmentModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    department: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
    }).isRequired,
    onDepartmentDeleted: PropTypes.func.isRequired,
    onDepartmentUpdated: PropTypes.func.isRequired,
};

export default ViewDeleteDepartmentModal;