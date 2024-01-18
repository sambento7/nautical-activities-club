import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from "@mui/icons-material/Close"
import { Alert, IconButton, Snackbar, Stack } from '@mui/material';

export const FormDialog = ({open, edit, handleCloseForm, error, handleCloseAlert, handleSubmit, title, errorMessage, children}) => {
    
    return (
        <Dialog open={open || edit} onClose={handleCloseForm} fullWidth maxWidth="sm">
            <DialogTitle>{title} <IconButton onClick={handleCloseForm} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>
                    {children}
                    <Button color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
                </Stack>
            </DialogContent>
            <Snackbar open={error} onClose={handleCloseAlert} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: '100%' }} onClose={handleCloseAlert}>
                    {errorMessage}
                </Alert> 
            </Snackbar>
        </Dialog>
    )
};