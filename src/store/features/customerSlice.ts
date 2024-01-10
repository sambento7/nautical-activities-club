import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Customer{
    id: number;
    firstName: string;
    lastName: string;
    birthdate: string;
    fiscalNumber: string;
    mobileNumber: string;
}


export interface sendCustomer{
    firstName: string;
    lastName: string;
    birthdate: string;
    fiscalNumber: number;
    mobileNumber: string;
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
    // console.log(data)
    return data;

});

export const saveCustomer = createAsyncThunk("customer/save", async (customer: sendCustomer, thunkAPI)=>{
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
            console.log(action.payload)
            state.customers = action.payload;
        });

        builder.addCase(saveCustomer.fulfilled, (state, action) => {
            state.customers.push(action.payload);
        });
    },
});

export default CustomerSlice.reducer;
// export const { addPerson } = PersonSlice.actions;