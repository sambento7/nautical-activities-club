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
}

interface SchedulingState{
    schedules: Schedule[];
    loading: boolean;
}

const initialState: SchedulingState = {
    schedules: [],
    loading: false
};

interface Ids{
    schedulingId: string;
    userId: string;
};

export const fetchSchedule = createAsyncThunk("scheduling/fetch", async (thunkAPI)=>{//unique key e async function
    await new Promise(resolve => setTimeout(resolve, 2000));
    /*EXPLANATION:
    1.When the new Promise is created, it immediately executes the executor function, which sets up a timer using setTimeout.
    2.The setTimeout function waits for 2 seconds. During this time, the promise remains in a pending state.
    3.After 2 seconds, setTimeout calls the resolve function. Calling resolve changes the state of the promise from pending to resolved.
    4.Since the promise is now resolved, any code waiting for this promise (using await) will now resume execution.
    5.The await keyword is used in an async function to pause the execution of the function until the promise it's waiting on is resolved.
      In await new Promise(resolve => setTimeout(resolve, 2000));, the execution of the fetchCustomer function is paused at this line for 2 seconds. 
    */
    const response = await fetch("http://localhost:8080/scheduling/getAll",{
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

export const addCustomer = createAsyncThunk("scheduling/addCustomer", async (Ids: Ids, thunkAPI)=>{
    const response = await fetch(`http://localhost:8080/scheduling/${Ids.schedulingId}`,{
        method: "POST",
        body: JSON.stringify({id: Ids.userId}),
        headers: {
            "Content-type": "application/json",
        },
    });
    const data = await response.json();
    return data;
});

export const SchedulingSlice = createSlice({
    name: "scheduling",
    initialState,
    reducers:{
        deleteScheduleCustomer: (state, action) => {
            state.schedules = state.schedules.map(schedule => {
                if(schedule.customer.id === action.payload){
                    return {...schedule, customer: {id: "Deleted"}};
                }
                return schedule;
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchSchedule.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchSchedule.fulfilled, (state, action) => {
            let newState = action.payload.map((schedule: Schedule) => {
                return (schedule.customer!=null ) ? {...schedule, customer: {id: schedule.customer.id}, activity: {id: schedule.activity.id}}: {...schedule, activity: {id: schedule.activity.id}, customer: {id: "Deleted"}};
            });
            state.schedules = newState;
            state.loading = false;
        });

        builder.addCase(saveSchedule.fulfilled, (state, action) => {
            // console.log(action.payload)
            // state.schedules.push(action.payload);
        });

        builder.addCase(addCustomer.fulfilled, (state, action) => {
            const newState = {...action.payload, customer: {id: action.payload.customer.id}, activity: {id: action.payload.activity.id}};
            state.schedules.push(newState);
        });

        builder.addCase(deleteSchedule.fulfilled, (state, action) => {
            state.schedules = state.schedules.filter(c => c.id !== action.payload);
        });
    },
});

export default SchedulingSlice.reducer;
export const { deleteScheduleCustomer } = SchedulingSlice.actions;