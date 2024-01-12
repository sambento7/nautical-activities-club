import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from "@mui/icons-material/Close"
import { Alert, IconButton, Snackbar, Stack } from '@mui/material';
import { useAppDispatch } from '../../store/store.ts'
import { saveCustomer, updateCustomer } from '../../store/features/customerSlice.ts';

export const FormDialog = ({ open, edit, handleCloseForm, formData, title, errorMessage, children}) => {
    
    const dispatch = useAppDispatch();

    const [error, setError] = useState(false);

    const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {    
        setError(false);
    };
    const handleSubmit = () => {
        !edit ? 
        dispatch(saveCustomer(formData))
        .unwrap()
        .then(() => {
            handleCloseForm();
        })
        .catch(() => {
            setError(true);
        }) :
        dispatch(updateCustomer(formData))
        .unwrap()
        .then(() => {
            handleCloseForm();
        })
        .catch(() => {
            setError(true);
        })
    };

    return (
        <Dialog open={open || edit} onClose={handleCloseForm} fullWidth maxWidth="sm">
            <DialogTitle>{title} <IconButton onClick={handleCloseForm} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>
                    {children}
                    <Button color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
                </Stack>
            </DialogContent>
            <Snackbar open={error} onClose={() => setError(false)} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: '100%' }} onClose={handleCloseAlert}>
                    {errorMessage}
                </Alert> 
            </Snackbar>
        </Dialog>
    )
};