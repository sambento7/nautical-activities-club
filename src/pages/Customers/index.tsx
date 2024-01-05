import React from 'react';
//definir tipo da função- com FC (functional component). 
//When you use React.FC, you're defining the entire component type, not just the return type
//It automatically includes type definitions for children
export const Customers: React.FC = () => {
    return (
        <h1>Customers</h1>
    )
}