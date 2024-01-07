import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

export const StyledGrid = styled(Grid)`
  background: #ECECEC;
  padding: 20px;
  border-radius: 20px; 
`;

export const StyledCardItem = styled(Card)`
  background: #f5f5f5;
  border-radius: 30px; 
  filter: drop-shadow(0px 5px 11.3pxs rgba(0, 0, 0, 0.25));
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

