import React from 'react';
import { ImageCarousel } from '../../components/ImageCarousel/index.tsx';
import { StyledDashboard } from './styles.ts'; 

export function Dashboard() {
    return (
        <StyledDashboard>
            <ImageCarousel/>
        </StyledDashboard>
    );
}


