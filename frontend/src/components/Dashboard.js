import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Dashboard = () => {
    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to Online Auctions
                </Typography>
            </Box>
        </Container>
    );
};

export default Dashboard;
