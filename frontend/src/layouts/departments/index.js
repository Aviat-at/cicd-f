import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Table from "examples/Tables/Table";
import SoftBox from 'components/SoftBox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { getDepartments } from 'services/api';
import AddDepartmentModal from './AddDepartmentModal';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewDeleteDepartmentModal from './ViewDeleteDepartmentModal';
import { useEffect, useState } from 'react';
import Slide from '@mui/material/Slide';
 
function Departments() {
  const [departments, setDepartments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const TransitionUp = (props) => {
    return <Slide {...props} direction="left" />;
  };
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        showSnackbar('Failed to fetch departments', 'error');
        console.error('Failed to fetch departments', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleOpenViewModal = (department) => {
    setSelectedDepartment(department);
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

  const handleDepartmentAdded = (newDepartment) => {
    setDepartments([...departments, newDepartment]);
    showSnackbar('Department added successfully!');
  };

  const handleDepartmentDeleted = (id) => {
    setDepartments(departments.filter(department => department.id !== id));
    showSnackbar('Department deleted successfully!');
  };

  const handleDepartmentUpdated = (updatedDepartment) => {
    setDepartments(departments.map(department =>
      department.id === updatedDepartment.id ? updatedDepartment : department
    ));
    showSnackbar('Department updated successfully!');
  };

  const depCols = [
    { name: "id", align: "center" },
    { name: "name", align: "left" },
    { name: "description", align: "left" },
    { name: "created_at", align: "left" },
    { name: "updated_at", align: "left" },
    { name: "action", align: "left" },
  ];

  const depRows = departments.map(department => ({
    id: department.id,
    name: department.name,
    description: department.description,
    created_at: department.created_at,
    updated_at: department.updated_at,
    action:
      <Button variant="contained" color="secondary" sx={{ color: 'white !important' }} onClick={() => handleOpenViewModal(department)}>
        <VisibilityIcon style={{ marginRight: 8 }} />View
      </Button>
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Departments table</SoftTypography>
              <Button variant="contained" onClick={handleOpenModal} sx={{ color: 'white !important' }}>
                Add Department
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
              <Table columns={depCols} rows={depRows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <AddDepartmentModal
        open={modalOpen}
        handleClose={handleCloseModal}
        onDepartmentAdded={handleDepartmentAdded}
      />
      {selectedDepartment && (
        <ViewDeleteDepartmentModal
          open={viewModalOpen}
          handleClose={handleCloseViewModal}
          department={selectedDepartment}
          onDepartmentDeleted={handleDepartmentDeleted}
          onDepartmentUpdated={handleDepartmentUpdated}
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

export default Departments;
