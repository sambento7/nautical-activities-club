import React from "react";
import {Helm} from './components/Helm/index.tsx'
import {Navbar} from './components/Navbar/index.tsx'
import {Title, StyledHeader} from './styles.ts'

export function Header(){
    return (
        <StyledHeader>
            <Helm/>
            <Title>Helm Nautical Club</Title>
            <Navbar/>
        </StyledHeader>
    )
}