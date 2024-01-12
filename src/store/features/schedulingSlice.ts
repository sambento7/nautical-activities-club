import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Schedule{
    id: string;
    customer: {
        id: string;
    };
    activity: {
        id: string;
    };
    description: string;
    date: string;
    // hour: string;
}

interface SchedulingState{
    schedules: Schedule[];
}

const initialState: SchedulingState = {
    schedules: []
};

export const fetchSchedule = createAsyncThunk("scheduling/fetch", async (thunkAPI)=>{//unique key e async function
    const response = await fetch("http://localhost:8080/scheduling",{
        method: "GET"
    });
    const data = await response.json();
    return data;
});

export const saveSchedule = createAsyncThunk("scheduling/save", async (schedule: Schedule, thunkAPI)=>{

    const response = await fetch("http://localhost:8080/scheduling",{
        method: "POST",
        body: JSON.stringify(schedule),
        headers: {
            "Content-type": "application/json",
        },
    });
    const data = await response.json();
    return data;
});

export const deleteSchedule = createAsyncThunk("scheduling/delete", async (id: string, thunkAPI)=>{
    const response = await fetch("http://localhost:8080/scheduling/" + id,{
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error('Deletion failed');
    }
    return id;
});

export const SchedulingSlice = createSlice({
    name: "scheduling",
    initialState,
    reducers:{
    },
    extraReducers(builder) {
        builder.addCase(fetchSchedule.fulfilled, (state, action) => {
            state.schedules = action.payload;
        });

        builder.addCase(saveSchedule.fulfilled, (state, action) => {
            state.schedules.push(action.payload);
        });

        builder.addCase(deleteSchedule.fulfilled, (state, action) => {
            state.schedules = state.schedules.filter(c => c.id !== action.payload);
        });
    },
});

export default SchedulingSlice.reducer;
// export const { addPerson } = PersonSlice.actions;