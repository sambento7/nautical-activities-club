import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { deleteCustomer } from "./customerSlice.ts";

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

interface Ids{
    schedulingId: string;
    userId: string;
};

interface SchedulingState{
    schedules: Schedule[];
}

const initialState: SchedulingState = {
    schedules: []
};

export const fetchSchedule = createAsyncThunk("scheduling/fetch", async (thunkAPI)=>{//unique key e async function
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

// export const deleteCustomer = (id: string) => {
//     return {
//         type: "DELETE_CUSTOMER",
//         payload: id
//     }
// }

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
        builder.addCase(fetchSchedule.fulfilled, (state, action) => {
            let newState = action.payload.map((schedule: Schedule) => {
                return (schedule.customer!=null ) ? {...schedule, customer: {id: schedule.customer.id}, activity: {id: schedule.activity.id}}: {...schedule, activity: {id: schedule.activity.id}, customer: {id: "Deleted"}};
            });
            // newState = newState.filter(c => c.customer !== null );
            state.schedules = newState;
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