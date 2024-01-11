import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CloseIcon from "@mui/icons-material/Close"
import { Alert, IconButton, Snackbar, Stack } from '@mui/material';
import { useAppDispatch } from '../../../../store/store.ts'
import { saveCustomer, updateCustomer } from '../../../../store/features/customerSlice.ts';

export const FormDialog = ({ edit,  open, handleClose, handleChange, formData}) => {
    
    const dispatch = useAppDispatch();

    const [error, setError] = useState(false);

    const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {    
        setError(false);
    };
    const handleSubmit = () => {//ver como fazer caso visse em customerSlice o saveCustomer
        !edit ? 
        dispatch(saveCustomer(formData))
            .unwrap()
            .then(() => {
                handleClose();
            })
            .catch(() => {
            setError(true);
            }) :
            dispatch(updateCustomer(formData))
            .unwrap()
            .then(() => {
                handleClose();
            })
            .catch(() => {
            setError(true);
            })
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Customer <IconButton onClick={handleClose} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>
                    <TextField name="firstName" variant="outlined" label="First Name" onChange={handleChange} value={formData.firstName}></TextField>
                    <TextField name="lastName" variant="outlined" label="Last Name" onChange={handleChange} value={formData.lastName}></TextField>
                    <TextField name="birthdate" variant="outlined" label="Birthdate" onChange={handleChange} value={formData.birthdate}></TextField>
                    <TextField name="fiscalNumber" variant="outlined" label="Fiscal Number" onChange={handleChange} value={formData.fiscalNumber}></TextField>
                    <TextField name="mobileNumber" variant="outlined" label="Mobile Number" onChange={handleChange} value={formData.mobileNumber}></TextField>
                    <Button color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
                </Stack>
            </DialogContent>
            <Snackbar open={error} onClose={() => setError(false)} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: '100%' }} onClose={handleCloseAlert}>
                    Failed to add customer. Please check your input.
                </Alert> 
            </Snackbar>
        </Dialog>
    )
};