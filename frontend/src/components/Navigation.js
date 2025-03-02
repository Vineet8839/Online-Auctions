import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GavelIcon from '@mui/icons-material/Gavel';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const location = useLocation();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Don't show navigation on sign in/sign up pages
    if (!user || location.pathname === '/signin' || location.pathname === '/signup') {
        return null;
    }

    const navigationItems = [
        { path: '/', label: 'Home', IconComponent: HomeIcon },
        { path: '/auctions', label: 'Auctions', IconComponent: GavelIcon },
        { path: '/create-auction', label: 'Create', IconComponent: AddIcon },
        { path: '/profile', label: 'Profile', IconComponent: PersonIcon },
        { path: '/payment-methods', label: 'Payments', IconComponent: PaymentIcon }
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '30px',
                padding: '10px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px',
                    padding: '5px 15px',
                }}
            >
                {navigationItems.map(({ path, label, IconComponent }) => {
                    const isActive = location.pathname === path;
                    
                    return (
                        <Box
                            key={path}
                            component={Link}
                            to={path}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: isActive ? 'primary.main' : 'text.secondary',
                                '&:hover': {
                                    color: 'primary.main',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease',
                                },
                            }}
                        >
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'inherit',
                                    bgcolor: isActive ? 'rgba(74, 175, 80, 0.1)' : 'transparent',
                                }}
                            >
                                <IconComponent />
                            </IconButton>
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 0.5,
                                    fontSize: '0.75rem',
                                    fontWeight: isActive ? 600 : 400,
                                }}
                            >
                                {label}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Navigation; 