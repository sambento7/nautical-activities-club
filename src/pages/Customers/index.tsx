import * as React from 'react';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { Table } from '../../components/Table/index.tsx';
import { useAppSelector } from '../../store/store.ts'
import { useState } from 'react';
import { useAppDispatch } from '../../store/store.ts'
import { deleteCustomer } from '../../store/features/customerSlice.ts';
import { FormDialog } from '../../components/FormDialog/index.tsx';
import { TextField, Avatar } from '@mui/material';

export const Customers: React.FC = () => {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({id: "", firstName: "", lastName: "", birthdate: "", fiscalNumber: "", mobileNumber: ""});

  const [open, setOpen] = useState(false);

  const [edit, setEdit] = useState(false);

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
    // .unwrap().catch((e) => {
    //   console.log("Failed to delete customer")
    // });
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

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })    
  }
  const customers = useAppSelector((state) => state.customer.customers);

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
        return <Avatar alt={params.row.firstName} src={params.row.photo} />
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
    <>
      <Table rows={customers} columns={columns} handleOpenForm={handleOpenForm} />
      <FormDialog parent={"customer"} open={open} edit={edit} handleCloseForm={handleCloseForm} formData={formData} title={"Add New Customer"} errorMessage={"Failed to add customer. Please check your input."}>
        <TextField id="firstName" name="firstName" variant="outlined" label="First Name" onChange={handleChange} value={formData.firstName}></TextField>
        <TextField id="lastName" name="lastName" variant="outlined" label="Last Name" onChange={handleChange} value={formData.lastName}></TextField>
        <TextField id="birthdate" name="birthdate" variant="outlined" label="Birthdate" onChange={handleChange} value={formData.birthdate}></TextField>
        <TextField id="fiscalNumber" name="fiscalNumber" variant="outlined" label="Fiscal Number" onChange={handleChange} value={formData.fiscalNumber}></TextField>
        <TextField id="mobileNumber" name="mobileNumber" variant="outlined" label="Mobile Number" onChange={handleChange} value={formData.mobileNumber}></TextField>
      </FormDialog>
    </>
    );
};


