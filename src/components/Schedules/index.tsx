import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import {StyledButton, StyledCardItem, StyledGrid, CustomSubTitle, CustomText, CustomTitle, Identifier, InfoLine} from './styles.ts';
import { Link } from 'react-router-dom';


export function Schedules() {
  const scheduleItems = [
    { id: 1, name: "Diogo Sambento", description: "Surf", date: "01/01/2024", hour: "11:00" },
    { id: 2, name: "Miguel Cruz", description: "Kayak", date: "01/01/2024", hour: "16:00" },
    { id: 3, name: "Leandro Saraiva", description: "Sailing", date: "01/01/2024", hour: "9:30" },
  ];

  return (
    
    <StyledGrid container spacing={2} >
        <Grid item xs={12}>
            <CustomTitle>Schedules</CustomTitle>
                {scheduleItems.map((item) => (
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
                        <InfoLine>
                            <Identifier>Hour: </Identifier>
                            <CustomText>{item.hour}</CustomText>
                        </InfoLine>
                    </CardContent>
                    <CardActions>
                    <Button size="small" color="error">
                        DELETE
                    </Button>
                    <Button size="small" color="primary">
                        EDIT
                    </Button>
                    </CardActions>
                </StyledCardItem>
                ))}

                <Link to="/scheduling"><StyledButton variant="contained">See all</StyledButton></Link>
        </Grid>
    </StyledGrid>
    
  );
}
