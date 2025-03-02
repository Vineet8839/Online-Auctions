import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const LiveAuctions = () => {
  const auctions = [
    {
      id: 1,
      title: 'Vintage Watch',
      currentBid: 150,
      endTime: '2h 30m',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: 'Antique Vase',
      currentBid: 300,
      endTime: '4h 15m',
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Live Auctions
        </Typography>
        <Grid container spacing={3}>
          {auctions.map((auction) => (
            <Grid item xs={12} sm={6} md={4} key={auction.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={auction.image}
                  alt={auction.title}
                />
                <CardContent>
                  <Typography variant="h6">{auction.title}</Typography>
                  <Typography>Current Bid: ${auction.currentBid}</Typography>
                  <Typography>Ends in: {auction.endTime}</Typography>
                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Place Bid
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default LiveAuctions; 