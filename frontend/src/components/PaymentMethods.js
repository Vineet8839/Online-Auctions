import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Snackbar,
    CircularProgress,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import paymentService from '../services/paymentService';

const useStyles = styled((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
    },
    card: {
        marginBottom: theme.spacing(2),
        position: 'relative',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actions: {
        display: 'flex',
        gap: theme.spacing(1),
    },
    defaultBadge: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        background: '#4CAF50',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        minWidth: 300,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1,
    },
}));

const PaymentMethods = () => {
    const classes = useStyles();
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [formData, setFormData] = useState({
        type: 'upi',
        upi_id: '',
        account_holder: '',
        account_number: '',
        ifsc_code: '',
        bank_name: '',
        paypal_email: '',
        is_default: false
    });

    const fetchPaymentMethods = async () => {
        setLoading(true);
        try {
            const data = await paymentService.getAllMethods();
            setPaymentMethods(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const validateForm = () => {
        if (formData.type === 'upi' && !formData.upi_id) {
            throw new Error('UPI ID is required');
        }
        if (formData.type === 'bank') {
            if (!formData.account_holder) throw new Error('Account holder name is required');
            if (!formData.account_number) throw new Error('Account number is required');
            if (!formData.ifsc_code) throw new Error('IFSC code is required');
            if (!formData.bank_name) throw new Error('Bank name is required');
        }
        if (formData.type === 'paypal' && !formData.paypal_email) {
            throw new Error('PayPal email is required');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            validateForm();
            if (selectedMethod) {
                await paymentService.updateMethod(selectedMethod.id, formData);
                setSuccess('Payment method updated successfully');
            } else {
                await paymentService.addMethod(formData);
                setSuccess('Payment method added successfully');
            }
            fetchPaymentMethods();
            handleCloseDialog();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await paymentService.deleteMethod(selectedMethod.id);
            setSuccess('Payment method deleted successfully');
            fetchPaymentMethods();
            setOpenDeleteDialog(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (method = null) => {
        if (method) {
            setSelectedMethod(method);
            setFormData({
                type: method.type.toLowerCase(),
                upi_id: method.details.upi_id || '',
                account_holder: method.details.account_holder || '',
                account_number: method.details.account_number || '',
                ifsc_code: method.details.ifsc_code || '',
                bank_name: method.details.bank_name || '',
                paypal_email: method.details.paypal_email || '',
                is_default: method.isDefault
            });
        } else {
            setSelectedMethod(null);
            setFormData({
                type: 'upi',
                upi_id: '',
                account_holder: '',
                account_number: '',
                ifsc_code: '',
                bank_name: '',
                paypal_email: '',
                is_default: false
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedMethod(null);
    };

    return (
        <Container className={classes.container}>
            {loading && (
                <div className={classes.loadingOverlay}>
                    <CircularProgress />
                </div>
            )}

            <div className={classes.header}>
                <Typography variant="h4">Payment Methods</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Add New Method
                </Button>
            </div>

            {paymentMethods.map((method) => (
                <Card key={method.id} className={classes.card}>
                    {method.isDefault && (
                        <div className={classes.defaultBadge}>Default</div>
                    )}
                    <CardContent className={classes.cardContent}>
                        <div>
                            <Typography variant="h6">{method.type}</Typography>
                            <Typography color="textSecondary">
                                {method.details}
                            </Typography>
                        </div>
                        <div className={classes.actions}>
                            <IconButton 
                                size="small"
                                onClick={() => handleOpenDialog(method)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton 
                                size="small"
                                onClick={() => {
                                    setSelectedMethod(method);
                                    setOpenDeleteDialog(true);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {selectedMethod ? 'Edit Payment Method' : 'Add Payment Method'}
                </DialogTitle>
                <DialogContent>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            select
                            label="Payment Type"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <MenuItem value="upi">UPI</MenuItem>
                            <MenuItem value="bank">Bank Account</MenuItem>
                            <MenuItem value="paypal">PayPal</MenuItem>
                        </TextField>

                        {formData.type === 'upi' && (
                            <TextField
                                label="UPI ID"
                                value={formData.upi_id}
                                onChange={(e) => setFormData({...formData, upi_id: e.target.value})}
                                required
                            />
                        )}

                        {formData.type === 'bank' && (
                            <>
                                <TextField
                                    label="Account Holder Name"
                                    value={formData.account_holder}
                                    onChange={(e) => setFormData({...formData, account_holder: e.target.value})}
                                    required
                                />
                                <TextField
                                    label="Account Number"
                                    value={formData.account_number}
                                    onChange={(e) => setFormData({...formData, account_number: e.target.value})}
                                    required
                                />
                                <TextField
                                    label="IFSC Code"
                                    value={formData.ifsc_code}
                                    onChange={(e) => setFormData({...formData, ifsc_code: e.target.value})}
                                    required
                                />
                                <TextField
                                    label="Bank Name"
                                    value={formData.bank_name}
                                    onChange={(e) => setFormData({...formData, bank_name: e.target.value})}
                                    required
                                />
                            </>
                        )}

                        {formData.type === 'paypal' && (
                            <TextField
                                label="PayPal Email"
                                type="email"
                                value={formData.paypal_email}
                                onChange={(e) => setFormData({...formData, paypal_email: e.target.value})}
                                required
                            />
                        )}

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.is_default}
                                    onChange={(e) => setFormData({...formData, is_default: e.target.checked})}
                                />
                            }
                            label="Set as default payment method"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button 
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this payment method? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button 
                        onClick={handleDelete}
                        color="secondary"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Error/Success Messages */}
            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={() => setError(null)}
            >
                <Alert onClose={() => setError(null)} severity="error">
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar 
                open={!!success} 
                autoHideDuration={6000} 
                onClose={() => setSuccess(null)}
            >
                <Alert onClose={() => setSuccess(null)} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default PaymentMethods; 