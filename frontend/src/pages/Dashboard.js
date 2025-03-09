import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Online Auctions
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ContactSupportIcon />}
            onClick={() => navigate('/contact')}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                transform: 'translateY(-2px)',
                transition: 'transform 0.2s'
              }
            }}
          >
            Contact Us
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent>
                <Typography variant="h6" color="primary">Active Auctions</Typography>
                <Typography variant="h3">15</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent>
                <Typography variant="h6" color="primary">Your Bids</Typography>
                <Typography variant="h3">5</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent>
                <Typography variant="h6" color="primary">Won Auctions</Typography>
                <Typography variant="h3">3</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
