import React from 'react';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import {StyledButton, StyledCardItem, StyledGrid, CustomSubTitle, CustomText, CustomTitle, Identifier, InfoLine} from './styles.ts';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../store/store.ts'

export function Schedules() {

const customers = useAppSelector((state) => state.customer.customers);
const schedules = useAppSelector((state) => state.scheduling.schedules);


const enrichedSchedules = schedules.map(schedule => {
    const customer = customers.find(c => c.id === schedule.customer.id);
    const fullName = customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
    return {
        ...schedule,
        name: fullName
    };
}).slice(0, 3); 

  return (
    <StyledGrid container spacing={2} >
        <Grid item xs={12}>
            <CustomTitle>Schedules</CustomTitle>
            {enrichedSchedules.map((item) => (
                <StyledCardItem key={item.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <CustomSubTitle>{item.name}</CustomSubTitle>
                        <InfoLine>
                            <Identifier>Description: </Identifier>
                            <CustomText>{item.description}</CustomText>
                        </InfoLine>
                        <InfoLine>
                            <Identifier>Date: </Identifier>
                            <CustomText>{item.date}</CustomText>
                        </InfoLine>
                    </CardContent>
                </StyledCardItem>
        ))}
                <Link to="/scheduling"><StyledButton variant="contained">See all</StyledButton></Link>
        </Grid>
    </StyledGrid>
    
  );
}
