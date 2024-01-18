import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../store/store.ts'
import { addCustomer, deleteSchedule, saveSchedule } from '../../store/features/schedulingSlice.ts';

import {Loading} from '../Loading/index.tsx';
import { Table } from '../../components/Table/index.tsx';
import { FormDialog } from '../../components/FormDialog/index.tsx';

import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { TextField} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export const Scheduling: React.FC = () => {

  const dispatch = useAppDispatch();

  const customers = useAppSelector((state) => state.customer.customers);
  const activities = useAppSelector((state) => state.activity.activities);
  const schedules = useAppSelector((state) => state.scheduling.schedules);
  const finalSchedules = schedules.map(schedule => {
    return {...schedule, customer : schedule.customer.id, activity : schedule.activity.id}
  })
  const loading = useAppSelector((state) => state.scheduling.loading);

  const [formData, setFormData] = useState({
    id: "", 
    customer: "", 
    activity: "", 
    description: "", 
    date: dayjs()
  });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  function resetFormData(){
    setFormData(prevFormData => ({
      ...prevFormData,
      customer: "",
      activity: "",
      description: "",
      date: dayjs(),
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

  function handleClickDelete(id:string){
    dispatch(deleteSchedule(id));
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
    dispatch(saveSchedule({...formData, customer: {id: formData.customer}, activity: {id: formData.activity}, date: formData.date.format('YYYY-MM-DD')}))
    .unwrap()
    .then((data) => {
        dispatch(addCustomer({schedulingId: data.id, userId: formData.customer}))
        .unwrap()
        .then(() => {     
            handleCloseForm();
        })
        .catch(() => {
            setError(true);
        })
    })
    .catch(() => {
      setError(true);
  })
};
  
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 160 },
    { field: 'customer', headerName: 'customer', width: 200, filterable: true },
    { field: 'activity', headerName: 'Activity', width: 200, filterable: true },
    { field: 'description', headerName: 'Description', width: 200, filterable: true },
    { field: 'date', headerName: 'Date', width: 200, filterable: true },
    {
      field: 'actions',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (<>
          <GridActionsCellItem icon={<Delete color={'error'} />} onClick={() => handleClickDelete(params.row.id)}  label="Delete" />
        </>)
      },
      filterable: false
    }
  ];

  return (
    loading ? <Loading /> :
    <>
      <Table rows={finalSchedules} columns={columns} handleOpenForm={handleOpenForm} />
      <FormDialog open={open} edit={edit} handleCloseForm={handleCloseForm} error={error} handleCloseAlert={handleCloseAlert} handleSubmit={handleSubmit} title={"Add New Schedule"} errorMessage={"Failed to add schedule. Please check your input."}>
        <FormControl>
            <InputLabel id="select-customer">Customer</InputLabel>
            <Select
              labelId="select-customer"
              value={formData.customer}
              onChange={handleChange}
              name={"customer"}
            >
              {customers.map((customer) => (//ver "key"
                <MenuItem key={customer.id} value={customer.id}>{customer.firstName}</MenuItem>
              ))}
            </Select>
        </FormControl>        
        <FormControl>
            <InputLabel id="select-activity">Activity</InputLabel>
            <Select
              labelId="select-activity"
              value={formData.activity}
              onChange={handleChange}
              name={"activity"}
            >
              {activities.map((activity) => (
                <MenuItem key={activity.id} value={activity.id}>{activity.name}</MenuItem>
              ))}
            </Select>
        </FormControl>        
        <TextField id="description" name="description" variant="outlined" label="Description" onChange={handleChange} value={formData.description}></TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'TimePicker']}>
            <DatePicker label="Date" value={formData.date} onChange={(newValue) => setFormData({
              ...formData,
              date: newValue || dayjs()
            })
            } name={"date"}/>
          </DemoContainer>
        </LocalizationProvider>
      </FormDialog>
    </>
    );
};


