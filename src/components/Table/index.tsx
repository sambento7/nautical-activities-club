import * as React from 'react';
import { GridColDef} from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {StyledDataGridContainer, StyledDataGrid} from './styles.ts'
import { useRef, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CloseIcon from "@mui/icons-material/Close"
import { IconButton, Stack } from '@mui/material';

import { useAppDispatch } from '../../store/store.ts'
import { saveCustomer } from '../../store/features/customerSlice.ts';

export const Table: React.FC<{rows: any[], columns: GridColDef[]}> = ({rows, columns}) => {

  const firstName = useRef<string>("");
  const lastName = useRef<string>("");
  const birthdate = useRef<string>("");
  const fiscalNumber = useRef<number>(0);
  const mobileNumber = useRef<string>("");
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const FormDialog = () => (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Customer <IconButton onClick={handleClose} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton></DialogTitle>
      <DialogContent>
         <Stack spacing={2} margin={2}>
          <TextField variant="outlined" label="First Name" onChange={e=>firstName.current=e.target.value}></TextField>
          <TextField variant="outlined" label="Last Name" onChange={e=>lastName.current=e.target.value}></TextField>
          <TextField variant="outlined" label="Birthdate" onChange={e=>birthdate.current=e.target.value}></TextField>
          <TextField variant="outlined" label="Fiscal Number" onChange={e => {fiscalNumber.current = parseInt(e.target.value, 10);}}></TextField>
          <TextField variant="outlined" label="Mobile Number" onChange={e=>mobileNumber.current=e.target.value}></TextField>
          <Button color="primary" variant="contained" onClick={() => dispatch(saveCustomer({firstName: firstName.current, lastName: lastName.current, birthdate:birthdate.current, fiscalNumber: fiscalNumber.current, mobileNumber: mobileNumber.current}))}>Submit</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
    
  const CustomToolbar = () => (
    <>
      <GridToolbar />
      <Button 
        variant="contained" 
        style={{ position: 'absolute', top: 10, right: 10 }}
        onClick={handleClickOpen}
      >
        Add
      </Button>
    </>
  );

    return (
      <StyledDataGridContainer>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            }
          }}
        />
        <FormDialog />
      </StyledDataGridContainer>
    );
  };