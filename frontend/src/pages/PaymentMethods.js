import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Paper,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

const PaymentMethods = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 4, mt: 4, mb: 4, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Payment Methods
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Add New Method
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 2, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'translateY(-2px)' }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'primary.main', 
                      borderRadius: 2, 
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <CreditCardIcon sx={{ color: 'white' }} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6">Visa Credit Card</Typography>
                        <Chip
                          icon={<StarIcon sx={{ fontSize: 16 }} />}
                          label="Default"
                          size="small"
                          color="primary"
                          sx={{ height: 24 }}
                        />
                      </Box>
                      <Typography color="text.secondary">**** **** **** 1234</Typography>
                      <Typography variant="caption" color="text.secondary">Expires 12/25</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 2, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'translateY(-2px)' }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'secondary.main', 
                      borderRadius: 2, 
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <AccountBalanceIcon sx={{ color: 'white' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6">Bank Account</Typography>
                      <Typography color="text.secondary">**** 5678</Typography>
                      <Typography variant="caption" color="text.secondary">Savings Account</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Payment Method</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Card Number"
              fullWidth
              placeholder="1234 5678 9012 3456"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Expiry Date"
                placeholder="MM/YY"
                sx={{ width: '50%' }}
              />
              <TextField
                label="CVV"
                placeholder="123"
                sx={{ width: '50%' }}
              />
            </Box>
            <TextField
              label="Cardholder Name"
              fullWidth
              placeholder="John Doe"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleClose}
            sx={{ px: 3, borderRadius: 1 }}
          >
            Add Payment Method
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PaymentMethods;
