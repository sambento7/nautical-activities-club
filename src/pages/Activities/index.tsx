import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/store.ts'
import { saveActivity } from '../../store/features/activitySlice.ts';

import {Loading} from '../Loading/index.tsx';
import { Table } from '../../components/Table/index.tsx';
import { FormDialog } from '../../components/FormDialog/index.tsx';

import { GridColDef} from '@mui/x-data-grid';
import { TextField} from '@mui/material';

export const Activities: React.FC = () => {

  const dispatch = useAppDispatch();

  const activities = useAppSelector((state) => state.activity.activities);
  const loading = useAppSelector((state) => state.activity.loading);

  const [formData, setFormData] = useState({
    id: "", 
    name: "", 
    duration: "", 
    price: ""
  });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  function resetFormData(){
    setFormData(prevFormData => ({
      ...prevFormData,
      name: "",
      duration: "",
      price: ""
    }))
  }

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setEdit(false);
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

  const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {    
      setError(false);
  };

  const handleSubmit = () => {
    dispatch(saveActivity(formData))
    .unwrap()
    .then(() => {
        handleCloseForm();
    })
    .catch(() => {
        setError(true);
    })
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 160 },
    { field: 'name', headerName: 'Name', width: 200, filterable: true },
    { field: 'duration', headerName: 'Duration', width: 200, filterable: true },
    { field: 'price', headerName: 'Price', width: 200, filterable: true }
  ];

  return (
    loading ? <Loading/> :
    <>
      <Table rows={activities} columns={columns} handleOpenForm={handleOpenForm} />
      <FormDialog open={open} edit={edit} handleCloseForm={handleCloseForm} error={error} handleCloseAlert={handleCloseAlert} handleSubmit={handleSubmit} title={"Add New Activity"} errorMessage={"Failed to add activity. Please check your input."}>
        <TextField id="name" name="name" variant="outlined" label="Name" onChange={handleChange} value={formData.name}></TextField>
        <TextField id="duration" name="duration" variant="outlined" label="Duration" onChange={handleChange} value={formData.duration}></TextField>
        <TextField id="price" name="price" variant="outlined" label="Price" onChange={handleChange} value={formData.price}></TextField>
      </FormDialog>
    </>
    );
};


