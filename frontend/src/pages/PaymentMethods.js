import React from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Grid } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const PaymentMethods = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Payment Methods
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CreditCardIcon />
                <div>
                  <Typography variant="h6">Credit Card</Typography>
                  <Typography color="textSecondary">**** **** **** 1234</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccountBalanceIcon />
                <div>
                  <Typography variant="h6">Bank Account</Typography>
                  <Typography color="textSecondary">**** 5678</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Add New Payment Method
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PaymentMethods; 