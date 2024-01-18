import React, { useState, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../store/store.ts'
import { deleteCustomer, fetchPhoto, saveCustomer, savePhoto, updateCustomer } from '../../store/features/customerSlice.ts';

import { Table } from '../../components/Table/index.tsx';
import {Loading} from '../Loading/index.tsx';
import { FormDialog } from '../../components/FormDialog/index.tsx';

import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { TextField, Avatar } from '@mui/material';
import { Button } from '@mui/base';

export const Customers: React.FC = () => {

  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customer.customers);
  const loading = useAppSelector((state) => state.customer.loading);

  const [formData, setFormData] = useState({
    id: "", 
    firstName: "", 
    lastName: "",
    birthdate: "", 
    fiscalNumber: "", 
    mobileNumber: ""
  });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

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

  function defineFormData(params){
    setFormData({
      id: params.id,
      firstName: params.firstName,
      lastName: params.lastName,
      birthdate: params.birthdate,
      fiscalNumber: params.fiscalNumber,
      mobileNumber: params.mobileNumber
    })
  }

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setEdit(false);
    resetFormData();
  };

  function handleClickEdit(params){
    defineFormData(params);
    setEdit(true);
  }

  function handleClickDelete(id:string){
    dispatch(deleteCustomer(id));
  }

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })    
  }

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

  //Para dar upload à foto:
  const inputFile = useRef<HTMLInputElement | null>(null);
  
  const handleFileUpload = (id:string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      dispatch(savePhoto({photo: files[0], id: id}))
      .unwrap()
      .then(() => {
        dispatch(fetchPhoto(id))
      })
    }
  };

  const onButtonClick = () => {
    inputFile.current?.click();
  };

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
        return (
          <>
            <Avatar alt={params.row.firstName} src={params.row.photo}>
              <input
                style={{ display: "none" }}
                ref={inputFile}
                onChange={(event) => handleFileUpload(params.row.id, event)}
                type="file"
              />
              <Button onClick={onButtonClick} style={{border: 'none', background: 'none', color: 'white', fontSize: '1.5em'}}>
                +
              </Button>
            </Avatar>
          </>
        )
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
          />} 
            onClick={() => handleClickEdit(params.row)}
            label="Edit" />
          <GridActionsCellItem icon={<Delete color={'error'} />} onClick={() => handleClickDelete(params.row.id)} label="Delete" />
        </>)
      },
      filterable: false
    }
  ];

  return (
    loading ? <Loading/> : 
    <>
      <Table rows={customers} columns={columns} handleOpenForm={handleOpenForm} />
      <FormDialog open={open} edit={edit} handleCloseForm={handleCloseForm} error={error} handleCloseAlert={handleCloseAlert} handleSubmit={handleSubmit} title={"Add New Customer"} errorMessage={"Failed to add customer. Please check your input."}>
        <TextField id="firstName" name="firstName" variant="outlined" label="First Name" onChange={handleChange} value={formData.firstName}></TextField>
        <TextField id="lastName" name="lastName" variant="outlined" label="Last Name" onChange={handleChange} value={formData.lastName}></TextField>
        <TextField id="birthdate" name="birthdate" variant="outlined" label="Birthdate" onChange={handleChange} value={formData.birthdate}></TextField>
        <TextField id="fiscalNumber" name="fiscalNumber" variant="outlined" label="Fiscal Number" onChange={handleChange} value={formData.fiscalNumber}></TextField>
        <TextField id="mobileNumber" name="mobileNumber" variant="outlined" label="Mobile Number" onChange={handleChange} value={formData.mobileNumber}></TextField>
      </FormDialog>
    </>
    );
};


