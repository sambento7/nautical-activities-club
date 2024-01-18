import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)`
    & .MuiDataGrid-columnHeaders {
    font-size: 22px;
    text-decoration: underline;
    }
    & .MuiDataGrid-cell {
    border-bottom: none !important;
    font-size: 18px;
    }
    & .MuiDataGrid-footerContainer {
    border-top: none !important;
    }
    & .MuiButtonBase-root {
    color: black; 
  }
  background-color: white;
`;

export const StyledDataGridContainer = styled.div`
    width: fit-content;
    padding: 20px;
    border-radius: 50%;
`;

// export const StyledButton = styled(Button)`
//   && {position: 'absolute'; 
//   top: 10; 
//   right: 10; 
//   color: 'white';}
// `;




