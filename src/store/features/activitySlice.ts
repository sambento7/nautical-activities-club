import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Activity{
    id: string;
    name: string;
    duration: string;
    price: string;
}

interface ActivityState{
    activities: Activity[];
}

const initialState: ActivityState = {
    activities: []
};

export const fetchActivity = createAsyncThunk("activity/fetch", async (thunkAPI)=>{
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
        builder.addCase(fetchActivity.fulfilled, (state, action) => {
            state.activities = action.payload;
        });

        builder.addCase(saveActivity.fulfilled, (state, action) => {
            state.activities.push(action.payload);
        });
    },
});

export default ActivitySlice.reducer;