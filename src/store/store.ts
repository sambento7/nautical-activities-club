import { configureStore } from "@reduxjs/toolkit";
import { CustomerSlice } from "./features/customerSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ActivitySlice } from "./features/activitySlice.ts";
import { SchedulingSlice } from "./features/schedulingSlice.ts";

export const store=configureStore({
    reducer: {
        customer: CustomerSlice.reducer,
        activity: ActivitySlice.reducer,
        scheduling: SchedulingSlice.reducer
    }
})

export const useAppDispatch : () => typeof store.dispatch = useDispatch; //create a typed version of useDispatch specific to my application's Redux store
                                                                         //important to give error messages when dispatching actions that are not defined in the store or when passing the wrong arguments to the action creators
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;//create a typed version of useSelector specific to my application's Redux store
