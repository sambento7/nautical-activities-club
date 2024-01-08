import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

// Styled DataGrid with no space between rows and no borderBottom in cells
export const StyledDataGrid = styled(DataGrid)`
    & .MuiDataGrid-cell {
    border-bottom: none !important;
    }
    & .MuiDataGrid-columnHeaders {
    border-bottom: none !important;
    }
    & .MuiDataGrid-footerContainer {
    border-top: none !important;
    }

    & .MuiButtonBase-root {
    color: white; 
  }

  & .MuiSvgIcon-root {
    fill: white; 
  }

`;

export const StyledDataGridContainer = styled.div`
    padding: 20px;
`;


export const StyledToolBar = styled(DataGrid)`

  & .MuiButtonBase-root {
    color: white; 
  }

  & .MuiSvgIcon-root {
    fill: white; 
  }
`;



