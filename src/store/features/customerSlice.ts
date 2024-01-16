import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Customer{
    id: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    fiscalNumber: string;
    mobileNumber: string;
    photo: string
}

interface CustomerState{
    customers: Customer[];
}

const initialState: CustomerState = {
    customers: []
};

export const fetchCustomer = createAsyncThunk("customer/fetch", async (thunkAPI)=>{//unique key e async function
    const response = await fetch("http://localhost:8080/customer",{
        method: "GET"
    });
    const data = await response.json();
    return data;
});

// export const fetchPhoto = createAsyncThunk("customer/fetchPhoto", async (id: string, thunkAPI)=>{//unique key e async function
//     const response = await fetch(`http://localhost:8080/customer/${id}/photo`,{
//         method: "GET"
//     });
//     const data = await response.json();
//     return data;
// });

export const saveCustomer = createAsyncThunk("customer/save", async (customer: Customer, thunkAPI)=>{

    // const finalCustomer = {
    //     ...customer,
    //     fiscalNumber: parseInt(customer.fiscalNumber, 10)
    // }

    const response = await fetch("http://localhost:8080/customer",{
        method: "POST",
        body: JSON.stringify(customer),
        headers: {
            "Content-type": "application/json",
        },
    });
    const data = await response.json();
    return data;
});

export const deleteCustomer = createAsyncThunk("customer/delete", async (id: string, thunkAPI)=>{
    const response = await fetch("http://localhost:8080/customer/" + id,{
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error('Deletion failed');
    }
    return id;
});

export const updateCustomer = createAsyncThunk("customer/update", async (customer: Customer, thunkAPI)=>{
    // console.log(customer)
    const response = await fetch("http://localhost:8080/customer/" + customer.id,{
        method: "PUT",
        body: JSON.stringify(customer),
        headers: {
            "Content-type": "application/json",
        },
    });
    const data = await response.json();
    return data;
});

export const CustomerSlice = createSlice({
    name: "customer",
    initialState,
    reducers:{
        // addPerson: (state, action: PayloadAction<{name: string}>) => {
        //     state.persons.push({
        //         id: state.persons.length,
        //         name: action.payload.name,
        //     });
        // },
    },
    extraReducers(builder) {
        builder.addCase(fetchCustomer.fulfilled, (state, action) => {
            state.customers = action.payload;
        });

        // builder.addCase(fetchPhoto.fulfilled, (state, action) => {
        //     state.customers.map(customer => {
                
        //         customer.photo = action.payload;
        //     })
        //     console.log(state.customers)
        // });

        builder.addCase(saveCustomer.fulfilled, (state, action) => {
            state.customers.push(action.payload);
        });
        
        builder.addCase(updateCustomer.fulfilled, (state, action) => {

            state.customers = state.customers.map(customer => {
                if (customer.id === action.payload.id) {
                    return action.payload;
                }
                return customer;
            });
        });

        builder.addCase(deleteCustomer.fulfilled, (state, action) => {
            // console.log(state.schedules)
            state.customers = state.customers.filter(c => c.id !== action.payload);
            
        });
    },
});

export default CustomerSlice.reducer;
// export const { addPerson } = PersonSlice.actions;