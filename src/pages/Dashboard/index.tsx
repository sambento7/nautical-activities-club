import React from 'react';
import { StyledDashboard } from './styles.ts'; 
import { ImageCarousel } from '../../components/ImageCarousel/index.tsx';
import { Schedules } from '../../components/Schedules/index.tsx';

export function Dashboard() {
    return (
        <StyledDashboard>
            <ImageCarousel/>
            <Schedules/>
        </StyledDashboard>
    );
}


