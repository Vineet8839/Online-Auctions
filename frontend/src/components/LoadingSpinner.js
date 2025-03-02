import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingSpinner = ({ open }) => (
    <Backdrop open={open} style={{ zIndex: 9999, color: '#fff' }}>
        <CircularProgress color="inherit" />
    </Backdrop>
);

export default LoadingSpinner; 