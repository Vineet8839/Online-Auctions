import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Send,
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSnackbar({
      open: true,
      message: 'Thank you for your message! We will get back to you soon.',
      severity: 'success',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 2,
          }}
        >
          Get in Touch
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
          Have questions about our auctions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Contact Information Cards */}
            <Card sx={{
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  bgcolor: 'primary.main',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex'
                }}>
                  <Phone sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h6">Phone</Typography>
                  <Typography color="text.secondary">+1 (555) 123-4567</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  bgcolor: 'primary.main',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex'
                }}>
                  <Email sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h6">Email</Typography>
                  <Typography color="text.secondary">support@onlineauctions.com</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  bgcolor: 'primary.main',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex'
                }}>
                  <LocationOn sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h6">Address</Typography>
                  <Typography color="text.secondary">123 Auction Street, CA 94105</Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              bgcolor: '#f8f9fa',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Google Maps Integration */}
      <Box sx={{ mt: 8, borderRadius: 2, overflow: 'hidden', height: '400px' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0927524188377!2d-122.39568668441012!3d37.78794897975472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c1f633e3f%3A0x1d26102d2a41c0bf!2sFinancial%20District%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1625124347514!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
