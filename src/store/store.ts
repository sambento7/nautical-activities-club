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

export const useAppDispatch : () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
