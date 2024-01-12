import * as React from 'react';
import {GridToolbar} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {StyledDataGridContainer, StyledDataGrid} from './styles.ts'

export const Table = ({rows, columns, handleOpenForm}) => {

  const CustomToolbar = () => (
    <>
      <GridToolbar />
      <Button 
        variant="contained"
        color='primary'
        style={{ position: 'absolute', top: 10, right: 10, color: 'white'}}
        onClick={handleOpenForm}
      >
        Add
      </Button>
    </>
  );

    return (
      <>
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
        {/* <FormDialog open={open} edit={edit} handleCloseForm={handleCloseForm} handleChange={handleChange} formData={formData} /> */}
      </>
    );
  };