// src/components/AddDepartmentModal.js
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SoftTypography from 'components/SoftTypography';
import { addDepartment } from 'services/api';
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

const AddDepartmentModal = ({ open, handleClose, onDepartmentAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDepartment = await addDepartment({ name, description });
      onDepartmentAdded(newDepartment);
      handleClose();
    } catch (error) {
      console.error('Failed to add department', error);
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
          Add New Department
        </SoftTypography>
        <Box component="form" onSubmit={handleSubmit} mt={2}>
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
              fullWidth
              margin="normal"
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
              fullWidth
              margin="normal"
            />
          </SoftBox>
          <Button type="submit" variant="contained"  fullWidth sx={{ color: 'white !important' }}>
            Add Department
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
AddDepartmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onDepartmentAdded: PropTypes.func.isRequired,
};

export default AddDepartmentModal;