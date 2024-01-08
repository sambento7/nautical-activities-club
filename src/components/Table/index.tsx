import * as React from 'react';
import { GridColDef} from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {StyledDataGridContainer, StyledDataGrid} from './styles.ts'
import axios from 'axios';

export const Table: React.FC<{rows: any[], columns: GridColDef[]}> = ({rows, columns}) => {


    const handleAddClick = async () => {
      const customerData = {
        firstName: "Diogo",
        lastName: "Sambento",
        birthdate: "2000-12-07",
        fiscalNumber: "237495759",
        mobileNumber: "925977534"
      };
    
      try {
        const response = await axios.post('http://localhost:8080/customer', customerData);
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    };
    const CustomToolbar = () => (
      <>
        <GridToolbar />
        <Button 
          variant="contained" 
          style={{ position: 'absolute', top: 10, right: 10 }}
          onClick={() => {handleAddClick()}}
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
      </StyledDataGridContainer>
    );
  };