import React from 'react';
import { StyledIcon } from './styles.ts';
import { Link } from 'react-router-dom';

export function Helm() {
  return(
    <Link to="/">
      <StyledIcon />
    </Link>
  ); 
}
