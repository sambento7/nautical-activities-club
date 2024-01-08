import * as React from 'react';
import { GridColDef} from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';

import {StyledDataGridContainer, StyledDataGrid} from './styles.ts'

export const Table: React.FC<{rows: any[], columns: GridColDef[]}> = ({rows, columns}) => {
    return (
      <StyledDataGridContainer>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
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