import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteScheduleCustomer } from "./schedulingSlice.ts";

export interface Customer{
    id: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    fiscalNumber: string;
    mobileNumber: string;
    photo: string
}

export interface FormData{
    id: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    fiscalNumber: string;
    mobileNumber: string;
}

interface CustomerState{
    customers: Customer[];
    loading: boolean;
}

const initialState: CustomerState = {
    customers: [],
    loading: false
};

interface CustomerPhotoInfo{
    id: string;
    photo: File;
}

export const fetchCustomer = createAsyncThunk("customer/fetch", async (thunkAPI)=>{//unique key e async function
    await new Promise(resolve => setTimeout(resolve, 2000));
    /*EXPLANATION:
    1.When the new Promise is created, it immediately executes the executor function, which sets up a timer using setTimeout.
    2.The setTimeout function waits for 2 seconds. During this time, the promise remains in a pending state.
    3.After 2 seconds, setTimeout calls the resolve function. Calling resolve changes the state of the promise from pending to resolved.
    4.Since the promise is now resolved, any code waiting for this promise (using await) will now resume execution.
    5.The await keyword is used in an async function to pause the execution of the function until the promise it's waiting on is resolved.
      In await new Promise(resolve => setTimeout(resolve, 2000));, the execution of the fetchCustomer function is paused at this line for 2 seconds. 
    */
    const response = await fetch("http://localhost:8080/customer",{
        method: "GET"
    });
    const data = await response.json();
    return data;
});

export const saveCustomer = createAsyncThunk("customer/save", async (customer: FormData, thunkAPI)=>{
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
    else thunkAPI.dispatch(deleteScheduleCustomer(id))
    return id;
});

export const updateCustomer = createAsyncThunk("customer/update", async (customer: FormData, thunkAPI)=>{
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

export const fetchPhoto = createAsyncThunk("customer/fetchPhoto", async (id: string, thunkAPI)=>{
    const response = await fetch(`http://localhost:8080/customer/${id}/photo`,{
        method: "GET"
    });
    const data = await response.blob();
    const imageObjectURL = URL.createObjectURL(data);
    return {imageObjectURL, id};
});

export const savePhoto = createAsyncThunk("customer/savePhoto", async (photoInfo: CustomerPhotoInfo, thunkAPI)=>{

    const formData = new FormData();
    formData.append("photofile", photoInfo.photo as File);
    const response = await fetch(`http://localhost:8080/customer/${photoInfo.id}/photo`,{
        method: "POST",
        body: formData ,
        // headers: {
        //     // "Content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        // },
    });
    const data = await response.json();
    return data;
});

export const CustomerSlice = createSlice({
    name: "customer",
    initialState,
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(fetchCustomer.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchCustomer.fulfilled, (state, action) => {
            state.customers = action.payload;
            state.loading = false;
        })
        .addCase(saveCustomer.fulfilled, (state, action) => {
            state.customers.push(action.payload);
        })
        .addCase(updateCustomer.fulfilled, (state, action) => {
            state.customers = state.customers.map(customer => {
                if (customer.id === action.payload.id) {
                    return action.payload;
                }
                return customer;
            });
        })
        .addCase(deleteCustomer.fulfilled, (state, action) => {
            state.customers = state.customers.filter(c => c.id !== action.payload);
            
        })
        .addCase(fetchPhoto.fulfilled, (state, action) => {
            state.customers.map(customer => {
                if (customer.id === action.payload.id) customer.photo = action.payload.imageObjectURL;
                return customer;
            })
        });
    },
});

export default CustomerSlice.reducer;