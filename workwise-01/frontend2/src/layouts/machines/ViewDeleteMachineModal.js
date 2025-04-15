// src/components/ViewDeleteMachineModal.js
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SoftTypography from 'components/SoftTypography';
import { deleteMachine, updateMachine } from 'services/api';
import PropTypes from 'prop-types';
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";

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

const ViewDeleteMachineModal = ({ open, handleClose, machine, onMachineDeleted, onMachineUpdated }) => {
  const [modelNumber, setModelNumber] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState('');

  useEffect(() => {
    if (machine) {
      setModelNumber(machine.model_number);
      setLocation(machine.location);
      setStatus(machine.status);
      setName(machine.name);
      setDescription(machine.description);
      setLastMaintenanceDate(machine.last_maintenance_date);
    }
  }, [machine]);

  const handleDelete = async () => {
    try {
      await deleteMachine(machine.id);
      onMachineDeleted(machine.id);
      handleClose();
    } catch (error) {
      console.error('Failed to delete machine', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatedMachine = await updateMachine(machine.id, { model_number: modelNumber, location, status, name, description });
      onMachineUpdated(updatedMachine);
      handleClose();
    } catch (error) {
      console.error('Failed to update machine', error);
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
          View / Edit Machine
        </SoftTypography>
        <Box component="form" onSubmit={handleUpdate} mt={2}>
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
            <SoftInput
              select
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SoftInput>
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
          {/* <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Last Maintenance Date
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="date"
              value={lastMaintenanceDate}
              onChange={(e) => setLastMaintenanceDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </SoftBox> */}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, color: 'white !important' }}>
            Update Machine
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={handleDelete}
          fullWidth
          color='secondary'
          sx={{ mt: 3, color: 'white !important' }}
        >
          Delete Machine
        </Button>
      </Box>
    </Modal>
  );
};
ViewDeleteMachineModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  machine: PropTypes.shape({
    id: PropTypes.number.isRequired,
    model_number: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    last_maintenance_date: PropTypes.string.isRequired,
  }),

  onMachineDeleted: PropTypes.func.isRequired,
  onMachineUpdated: PropTypes.func.isRequired,

};
export default ViewDeleteMachineModal;