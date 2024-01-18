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

interface CustomerPhotoInfo{
    id: string;
    photo: File;
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
    // console.log(data)
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
    else thunkAPI.dispatch(deleteScheduleCustomer(id))
    return id;
});

export const updateCustomer = createAsyncThunk("customer/update", async (customer: Customer, thunkAPI)=>{
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
    },
    extraReducers(builder) {
        
        

        builder.addCase(fetchCustomer.fulfilled, (state, action) => {
            state.customers = action.payload;
        });

        builder.addCase(fetchPhoto.fulfilled, (state, action) => {
            state.customers.map(customer => {
                if (customer.id === action.payload.id) customer.photo = action.payload.imageObjectURL;
                return customer;
            })
        });

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
            state.customers = state.customers.filter(c => c.id !== action.payload);
            
        });


    },
});

export default CustomerSlice.reducer;
// export const { addPerson } = PersonSlice.actions;