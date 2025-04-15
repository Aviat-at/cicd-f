// src/components/AddMachineModal.js
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SoftTypography from 'components/SoftTypography';
import { addMachine } from 'services/api';
import PropTypes from 'prop-types';
import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

const AddMachineModal = ({ open, handleClose, onMachineAdded }) => {
  const [modelNumber, setModelNumber] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('operational');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newMachine = await addMachine({ model_number: modelNumber, location, status, name, description });
      onMachineAdded(newMachine);
      handleClose();
    } catch (error) {
      console.error('Failed to add machine', error);
    }
  };

  const statusOptions = [
    { value: 'operational', label: 'Operational' },
    { value: 'maintenance', label: 'Maintenance' },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SoftTypography id="modal-modal-title" variant="h6" component="h2">
          Add New Machine
        </SoftTypography>
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Model Number
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Model Number"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Location
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              margin="normal"
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Status
              </SoftTypography>
            </SoftBox>
            <Select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              margin="normal"
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </SoftBox>
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
          <Button type="submit" variant="contained" fullWidth sx={{ color: 'white !important' }}>
            Add Machine
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  
};
AddMachineModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onMachineAdded: PropTypes.func.isRequired,
  };
export default AddMachineModal;