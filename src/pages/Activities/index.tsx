import React from 'react';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { Table } from '../../components/Table/index.tsx';

export function Activities(): React.ReactElement {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 160 },
        { field: 'name', headerName: 'Name', width: 200, filterable: true },
        { field: 'duration', headerName: 'Duration', width: 200, filterable: true },
        { field: 'price', headerName: 'Price', width: 200, filterable: true },
        {
          field: 'actions',
          headerName: 'Action',
          width: 200,
          renderCell: (params) => (
            <>
              <GridActionsCellItem icon={<Edit color={'action'}/>} label="Edit" />
              <GridActionsCellItem icon={<Delete color={'error'}/>} label="Delete" />
            </>
          ),
          filterable: false
        },
      
      ];
      
      const rows = [
        {
          id: '#1',
          name: 'Surf',
          duration: '01:30',
          price: '50$',
        },
        {
            id: '#2',
            name: 'Kayak',
            duration: '01:00',
            price: '40$',
        },
        {
            id: '#3',
            name: 'Sailing',
            duration: '02:00',
            price: '70$',
          },
      ];

    return (
        <Table rows={rows} columns={columns}/>
    );
}

