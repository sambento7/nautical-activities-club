import * as React from 'react';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { Table } from '../../components/Table/index.tsx';
import { useAppSelector } from '../../store/store.ts'
import { useState } from 'react';
import { useAppDispatch } from '../../store/store.ts'
// import { deleteSchedule } from '../../store/features/scheduleSlice.ts';
import { FormDialog } from '../../components/FormDialog/index.tsx';
import { TextField, Avatar } from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

export const Scheduling: React.FC = () => {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({id: "", customer: "", activity: "", description: "", date: dayjs()});
  // , hour: dayjs()

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

  // function handleClickDelete(id:string){
  //   dispatch(deleteCustomer(id));
  //   // .unwrap().catch((e) => {
  //   //   console.log("Failed to delete schedule")
  //   // });
  // }

  function resetFormData(){
    setFormData(prevFormData => ({
      ...prevFormData,
      customer: "",
      activity: "",
      description: "",
      date: dayjs(),
      // hour: dayjs()
    }))
  }

  function defineFormData(params){
    setFormData({
      id: params.id,
      customer: params.customer,
      activity: params.activity,
      description: params.description,
      date: params.date,
      // hour: params.hour
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
  // const schedules = useAppSelector((state) => state.schedule.schedules);
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 160 },
    { field: 'customer', headerName: 'customer', width: 200, filterable: true },
    { field: 'activity', headerName: 'Activity', width: 200, filterable: true },
    { field: 'description', headerName: 'Description', width: 200, filterable: true },
    { field: 'date', headerName: 'Date', width: 200, filterable: true },
    // { field: 'hour', headerName: 'Hour', width: 200, filterable: true },
    {
      field: 'actions',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (<>
          <GridActionsCellItem icon={<Delete color={'error'} />} label="Delete" />
        </>)
      },
      filterable: false
    }
  ];

  // onClick={() => handleClickDelete(params.row.id)} 

  const customers = useAppSelector((state) => state.customer.customers);
  const activities = useAppSelector((state) => state.activity.activities);

  return (
    <>
      <Table rows={[]} columns={columns} handleOpenForm={handleOpenForm} />
      <FormDialog parent={"schedule"} open={open} edit={edit} handleCloseForm={handleCloseForm} formData={formData} title={"Add New Customer"} errorMessage={"Failed to add schedule. Please check your input."}>
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
              {activities.map((activity) => (//ver "key"
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
            {/* <TimePicker label="Hour" value={formData.hour} onChange={(newValue) => setFormData({
              ...formData,
              hour: newValue || dayjs()
            })
            } name={"hour"}/> */}
          </DemoContainer>
        </LocalizationProvider>
      </FormDialog>
    </>
    );
};


