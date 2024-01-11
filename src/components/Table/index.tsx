import * as React from 'react';
import { GridColDef, GridToolbar} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {StyledDataGridContainer, StyledDataGrid} from './styles.ts'
import { useState } from 'react';
import { FormDialog } from './components/FormDialog/index.tsx';

import {  GridActionsCellItem } from '@mui/x-data-grid';
import { Edit} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { DeleteIcon } from '../../components/DeleteIcon/index.tsx';
import { useAppSelector } from '../../store/store.ts'

export const Table = () => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 160 },
    { field: 'firstName', headerName: 'First name', width: 200, filterable: true },
    { field: 'lastName', headerName: 'Last name', width: 200, filterable: true },
    { field: 'birthdate', headerName: 'Birthdate', width: 200, filterable: true },
    { field: 'fiscalNumber', headerName: 'Fiscal Number', width: 200, filterable: true },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 200, filterable: true },
    {
      field: 'photo',
      headerName: 'Photo',
      width: 160,
      renderCell: (params) => {
        
        return <Avatar alt={params.row.firstName} src={params.row.photoUrl} />
    },
      filterable: false
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (<>
          <GridActionsCellItem icon={<Edit color={'action'} 
          onClick={() => handleClickEdit(params.row.firstName, params.row.lastName, params.row.birthdate, params.row.fiscalNumber, params.row.mobileNumber, params.row.id )}/>} 
            label="Edit" />
          <GridActionsCellItem icon={<DeleteIcon color={'error'} id={params.row.id}/>} label="Delete" />
        </>)
      },
      filterable: false
    },
  
  ];

  const customers = useAppSelector((state) => state.customer.customers);

  const [formData, setFormData] = useState({id: "", firstName: "", lastName: "", birthdate: "", fiscalNumber: "", mobileNumber: ""});

  const [open, setOpen] = useState(false);
  
  const [edit, setEdit] = useState(false);

  const handleClickOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setEdit(false);
    setOpen(false);
    resetFormData();
  };

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })    
  }

  function resetFormData(){
    setFormData(prevFormData => ({
      ...prevFormData,
      firstName: "",
      lastName: "",
      birthdate: "",
      fiscalNumber: "",
      mobileNumber: ""
    }))
  }

  function handleClickEdit(firstname: string, lastname: string, birthdate: string, fiscalnumber: string, mobilenumber: string, id: string){
    setFormData({
      id: id,
      firstName: firstname,
      lastName: lastname,
      birthdate: birthdate,
      fiscalNumber: fiscalnumber,
      mobileNumber: mobilenumber
    })
    setEdit(true);
    setOpen(true);
  }

  const CustomToolbar = () => (
    <>
      <GridToolbar />
      <Button 
        variant="contained"
        color='primary'
        style={{ position: 'absolute', top: 10, right: 10, color: 'white'}}
        onClick={handleClickOpenForm}
      >
        Add
      </Button>
    </>
  );

    return (
      <StyledDataGridContainer>
        <StyledDataGrid
          rows={customers}
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
        <FormDialog edit={edit} open={open} handleClose={handleCloseForm} handleChange={handleChange} formData={formData} />
      </StyledDataGridContainer>
    );
  };