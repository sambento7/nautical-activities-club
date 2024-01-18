import React from 'react';
import { StyledDashboard } from './styles.ts'; 
import { ImageCarousel } from '../../components/ImageCarousel/index.tsx';
import { Schedules } from '../../components/Schedules/index.tsx';
import { Stats } from '../../components/Stats/index.tsx';

export function Dashboard() {
    return (
        <StyledDashboard>
            <ImageCarousel/>
            <Schedules/>
            <Stats/>
        </StyledDashboard>
    );
}


