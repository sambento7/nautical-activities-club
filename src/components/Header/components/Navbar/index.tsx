import React from "react";
import {StyledNavbar, Line} from './styles.ts'
import StyledLink from '../Link/index.tsx'

export function Navbar(){
    return (
        <StyledNavbar>
            <StyledLink to="/">Dashboard</StyledLink>
            <Line> | </Line>
            <StyledLink to="/activities">Activities</StyledLink>
            <Line> | </Line>
            <StyledLink to="/customers">Customers</StyledLink>
            <Line> | </Line>
            <StyledLink to="/scheduling">Scheduling</StyledLink>
        </StyledNavbar>
    )
}