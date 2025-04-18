import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';
import curved9 from 'assets/images/curved-images/curved-6.jpg';
import { register } from 'services/api';
import SoftBox from 'components/SoftBox';
import { Link } from 'react-router-dom';
import BasicLayout from '../components/BasicLayout';
import Card from "@mui/material/Card";

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

   // On load if user is already logged in, redirect to dashboard
   useEffect(() => {
    if (localStorage.getItem('accesToken')) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      showSnackbar('Passwords do not match', 'error');
      return;
    }
    try {
      await register({ username, email, password });
      showSnackbar('Registration successful!', 'success');
      window.location.href = '/dashboard';
    } catch (error) {
      showSnackbar('Registration failed. Please try again.', 'error');
    }
  };

  return (
    <BasicLayout
      image={curved9}
    >
      <Card style={{ marginTop: -100 }}>
        <Box component="form" onSubmit={handleSubmit} p={3} >
          <SoftBox mb={1} mt={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Register
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={2} >
            <SoftBox mb={1} ml={0.5} >
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Username
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Password
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Confirm Password
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton type="submit" variant="gradient" color="info" fullWidth>
              Register
            </SoftButton>
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Already have an account?{" "}
              <SoftTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign in
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
