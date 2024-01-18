import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Activity{
    id: string;
    name: string;
    duration: string;
    price: string;
}

interface ActivityState{
    activities: Activity[];
    loading: boolean;
}

const initialState: ActivityState = {
    activities: [],
    loading: false
};

export const fetchActivity = createAsyncThunk("activity/fetch", async (thunkAPI)=>{
    await new Promise(resolve => setTimeout(resolve, 2000));
    /*EXPLANATION:
    1.When the new Promise is created, it immediately executes the executor function, which sets up a timer using setTimeout.
    2.The setTimeout function waits for 2 seconds. During this time, the promise remains in a pending state.
    3.After 2 seconds, setTimeout calls the resolve function. Calling resolve changes the state of the promise from pending to resolved.
    4.Since the promise is now resolved, any code waiting for this promise (using await) will now resume execution.
    5.The await keyword is used in an async function to pause the execution of the function until the promise it's waiting on is resolved.
      In await new Promise(resolve => setTimeout(resolve, 2000));, the execution of the fetchCustomer function is paused at this line for 2 seconds. 
    */
    const response = await fetch("http://localhost:8080/activity",{
        method: "GET"
    });
    const data = await response.json();
    return data;
});

export const saveActivity = createAsyncThunk("activity/save", async (activity: Activity, thunkAPI)=>{

    const response = await fetch("http://localhost:8080/activity",{
        method: "POST",
        body: JSON.stringify(activity),
        headers: {
            "Content-type": "application/json",
        },
    });
    const data = await response.json();
    return data;
});

export const ActivitySlice = createSlice({
    name: "activity",
    initialState,
    reducers:{
    },
    extraReducers(builder) {
        builder.addCase(fetchActivity.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchActivity.fulfilled, (state, action) => {
            state.activities = action.payload;
            state.loading = false;
        });

        builder.addCase(saveActivity.fulfilled, (state, action) => {
            state.activities.push(action.payload);
        });
    },
});

export default ActivitySlice.reducer;