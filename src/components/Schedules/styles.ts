import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

export const StyledGrid = styled(Grid)`
  background: #ECECEC;
  padding: 20px;
  border-radius: 20px; 
`;

export const StyledCardItem = styled(Card)` //uso && para garantir que este estilo tem precedência sobre outros estilos
  && {
    background: #f5f5f5;
    border-radius: 20px; 
    box-shadow: 0px 5px 11.3px rgba(0, 0, 0, 0.25); 
    } 
`;

export const CustomTitle = styled.h2`
  text-align: center;
  font-size: 30px; 
  color: #000000; 
  margin-bottom: 20px;
  font-weight: 700;
  `;

export const InfoLine = styled.div`
display: flex; 
margin-bottom: 4px; 
`;

export const EmptyLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomSubTitle = styled.h3`
    font-weight: 400;
    font-size: 20px;
    font-style: normal;
    line-height: 140%;
`

export const Identifier = styled.p`
  font-size: 16px;
  color: #A0AEC0;
  margin: 0; 
`;

export const CustomText = styled.p`
  font-size: 16px;
  color: #718096;
  margin: 0; 
`;

export const StyledButton = styled(Button)`
  &&{
    background: #F8F9FA;
    box-shadow: 0px 8px 5.8px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    color: #2D3748;
    width: 136px;
    height: 22px;
    font-weight: 700;
  }
`;


