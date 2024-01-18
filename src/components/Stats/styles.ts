import styled from 'styled-components';
import { BarChart } from '@mui/x-charts/BarChart';

export const Container = styled.div`
    padding: 20px;
    background: #ECECEC;
    width: 100%;
    border-radius: 20px; 
    box-shadow: 0px 5px 11.3px rgba(0, 0, 0, 0.25); 
`;

export const CustomTitle = styled.h2`
  text-align: center;
  font-size: 30px; 
  color: #000000; 
  margin-bottom: 20px;
  font-weight: 700;
  `;

export const StyledBarChart = styled(BarChart)`
  background-color: white;
`;

