import React from 'react';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';

import { Table } from '../../components/Table/index.tsx';

export function Scheduling(): React.ReactElement {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 160 },
        { field: 'client', headerName: 'Client', width: 200, filterable: true },
        { field: 'activity', headerName: 'Activity', width: 200, filterable: true },
        { field: 'description', headerName: 'Description', width: 200, filterable: true },
        { field: 'date', headerName: 'Date', width: 200, filterable: true },
        { field: 'hour', headerName: 'Hour', width: 200, filterable: true },
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
          client: '#20462',
          activity: '#1',
          description: 'Surf',
          date: '04/01/2024',
          hour: '11:00',
        },
        {
          id: '#2',
          client: '#20467',
          activity: '#2',
          description: 'Kayak',
          date: '04/01/2024',
          hour: '16:00',
        },
        {
          id: '#3',
          client: '#20463',
          activity: '#3',
          description: 'Sailing',
          date: '05/01/2024',
          hour: '09:30',
        }
      ];

    return (
        <Table rows={rows} columns={columns}/>
    );
}

