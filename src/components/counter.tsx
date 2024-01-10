import React from "react";
import { AppDispatch, RootState } from "../state/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { decremented, incremented, incrementByAmount, incrementAsync } from "../state/counter/counterSlice.ts";
const Counter = () => { 
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <h2>{count}</h2>
            <div>
                <button onClick={() => dispatch(incremented())}>+</button>
                <button onClick={() => dispatch(decremented())}>-</button>
                <button onClick={() => dispatch(incrementByAmount(10))}>Increment Amount</button>
                <button onClick={() => dispatch(incrementAsync(10))}>Increment Amount Async</button>
            </div>
        </div>
    )
}

export default Counter;