import * as React from 'react';
import { GridColDef} from '@mui/x-data-grid';
import { Table } from '../../components/Table/index.tsx';
import { useAppSelector } from '../../store/store.ts'
import { useState } from 'react';
import { FormDialog } from '../../components/FormDialog/index.tsx';
import { TextField} from '@mui/material';

export const Activities: React.FC = () => {

  const [formData, setFormData] = useState({id: "", name: "", duration: "", price: ""});

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

  function resetFormData(){
    setFormData(prevFormData => ({
      ...prevFormData,
      name: "",
      duration: "",
      price: ""
    }))
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

  const activities = useAppSelector((state) => state.activity.activities);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 160 },
    { field: 'name', headerName: 'Name', width: 200, filterable: true },
    { field: 'duration', headerName: 'Duration', width: 200, filterable: true },
    { field: 'price', headerName: 'Price', width: 200, filterable: true }
  ];

  return (
    <>
      <Table rows={activities} columns={columns} handleOpenForm={handleOpenForm} />
      <FormDialog parent={"activity"} open={open} edit={edit} handleCloseForm={handleCloseForm} formData={formData} title={"Add New Activity"} errorMessage={"Failed to add activity. Please check your input."}>
        <TextField id="name" name="name" variant="outlined" label="Name" onChange={handleChange} value={formData.name}></TextField>
        <TextField id="duration" name="duration" variant="outlined" label="Duration" onChange={handleChange} value={formData.duration}></TextField>
        <TextField id="price" name="price" variant="outlined" label="Price" onChange={handleChange} value={formData.price}></TextField>
      </FormDialog>
    </>
    );
};


