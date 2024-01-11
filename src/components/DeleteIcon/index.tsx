import React from 'react';
import {Delete } from '@mui/icons-material';
import { useAppDispatch } from '../../store/\store.ts'
import { deleteCustomer } from '../../store/features/customerSlice.ts';

export const DeleteIcon = (props) => {

    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(deleteCustomer(props.id));
    };

    return (
        <Delete color={props.color} onClick={handleClick}/>
    )
}