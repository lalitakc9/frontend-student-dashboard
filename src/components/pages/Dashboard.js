import { useState, useEffect } from 'react';
import { Button, CssBaseline, Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StudentRegistration from "../StudentRegistration";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  }

  const handleCrud = () => {
    navigate('/dashboard');
  }

  const [username, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  useEffect(() => {
    setUserName(localStorage.getItem('username'));
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <h1>Welcome To The Student Dashboard!</h1>
              <Typography variant='h5'>Username: {username}</Typography>
              <Typography variant='h5'>Name: {firstName} {lastName}</Typography>
    
            <Button
              variant='contained'
              color='warning'
              size='large'
              onClick={handleCrud}
              sx={{ mt: 4 }}
            >
              Students
            </Button>
            <Button
              variant='contained'
              color='warning'
              size='large'
              onClick={handleLogout}
              sx={{ mt: 4 }}
            >
              Logout
            </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box sx={{ p: 5 }}>
            <StudentRegistration />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
