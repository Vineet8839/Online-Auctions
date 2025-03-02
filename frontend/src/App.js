import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import LiveAuctions from './pages/LiveAuctions';
import PostAuction from './pages/PostAuction';
import Profile from './pages/Profile';
import PaymentMethods from './pages/PaymentMethods';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <div style={{ paddingBottom: '80px' }}>
                        <Routes>
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/auctions"
                                element={
                                    <PrivateRoute>
                                        <LiveAuctions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/create-auction"
                                element={
                                    <PrivateRoute>
                                        <PostAuction />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/payment-methods"
                                element={
                                    <PrivateRoute>
                                        <PaymentMethods />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                        <Navigation />
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
