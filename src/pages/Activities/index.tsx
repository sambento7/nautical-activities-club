import React from 'react';
//React.ReactElement is the type of value returned by a React component. 
//It's more specific in the sense that it refers only to the return type of the component, not the component itself.
//By using React.ReactElement, you're being explicit about what the function returns, but you're not specifying anything about the function being a React component. 
//It doesn't automatically include type definitions for children.
export function Activities(): React.ReactElement {
    return (
        <h1>Activities</h1>
    );
}

