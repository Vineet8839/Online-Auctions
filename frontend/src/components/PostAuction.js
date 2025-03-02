import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const PostAuction = () => {
    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Create New Auction
                </Typography>
            </Box>
        </Container>
    );
};

export default PostAuction;