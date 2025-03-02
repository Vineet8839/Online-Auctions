import React from 'react';
import { Container, Typography, Box, Paper, Avatar, Grid, Button } from '@mui/material';

const Profile = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Avatar
                sx={{ width: 120, height: 120 }}
                alt="User Name"
                src="https://via.placeholder.com/120"
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="h4">John Doe</Typography>
              <Typography color="textSecondary">john.doe@example.com</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                Edit Profile
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 