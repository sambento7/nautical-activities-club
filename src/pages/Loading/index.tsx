import React from 'react'
import { StyledContainer, StyledText, StyledHourglassTopOutlinedIcon } from './styles.ts';

export const Loading = () => {
  return (
    <StyledContainer>
        <StyledHourglassTopOutlinedIcon fontSize='large'/>
        <StyledText>Loading...</StyledText> 
    </StyledContainer>
  )
}