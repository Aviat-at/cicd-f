// src/pages/Machines.js
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Table from "examples/Tables/Table";
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import AddMachineModal from './AddMachineModal';
import ViewDeleteMachineModal from './ViewDeleteMachineModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getMachines } from 'services/api';

const TransitionUp = (props) => {
  return <Slide {...props} direction="left" />;
};

function Machines() {
  const [machines, setMachines] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getMachines();
        setMachines(data);
      } catch (error) {
        console.error('Failed to fetch machines', error);
      }
    };

    fetchMachines();
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleOpenViewModal = (machine) => {
    setSelectedMachine(machine);
    setViewModalOpen(true);
  };
  const handleCloseViewModal = () => setViewModalOpen(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleMachineAdded = (newMachine) => {
    setMachines([...machines, newMachine]);
    showSnackbar('Machine added successfully!');
  };

  const handleMachineDeleted = (id) => {
    setMachines(machines.filter(machine => machine.id !== id));
    showSnackbar('Machine deleted successfully!');
  };

  const handleMachineUpdated = (updatedMachine) => {
    setMachines(machines.map(machine => 
      machine.id === updatedMachine.id ? updatedMachine : machine
    ));
    showSnackbar('Machine updated successfully!');
  };

  const machineCols = [
    { name: "id", align: "center" },
    { name: "model_number", align: "left" },
    { name: "location", align: "left" },
    { name: "status", align: "left" },
    { name: "name", align: "left" },
    { name: "description", align: "left" },
    { name: "action", align: "left" },
  ];

  const machineRows = machines.map(machine => ({
    id: machine.id,
    model_number: machine.model_number,
    location: machine.location,
    status: (
      <SoftTypography
        variant="caption"
        color={
          machine.status === 'operational'
            ? 'success'
            : machine.status === 'maintenance'
            ? 'error'
            : 'warning'
        }
      >
        {machine.status}
      </SoftTypography>
    ),
    name: machine.name,
    last_maintenance_date: machine.last_maintenance_date,
    action: (
      <Button variant="contained" color="secondary" sx={{ color: 'white !important' }} onClick={() => handleOpenViewModal(machine)}>
        <VisibilityIcon style={{ marginRight: 8 }} />View
      </Button>
    )
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Machines table</SoftTypography>
              <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ color: 'white !important' }} >
                Add Machine
              </Button>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={machineCols} rows={machineRows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <AddMachineModal
        open={modalOpen}
        handleClose={handleCloseModal}
        onMachineAdded={handleMachineAdded}
      />
      {selectedMachine && (
        <ViewDeleteMachineModal
          open={viewModalOpen}
          handleClose={handleCloseViewModal}
          machine={selectedMachine}
          onMachineDeleted={handleMachineDeleted}
          onMachineUpdated={handleMachineUpdated}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        TransitionComponent={TransitionUp}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Machines;