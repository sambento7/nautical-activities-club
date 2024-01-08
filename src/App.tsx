import './App.css';
import React from 'react'
// import { useSelector, useDispatch} from 'react-redux';
// import { increment, decrement } from './redux/actions/index.tsx';

import {Route, Routes} from 'react-router-dom';

import {Dashboard} from './pages/Dashboard/index.tsx'
import {Customers} from './pages/Customers/index.tsx'
import {Activities} from './pages/Activities/index.tsx'
import {Scheduling} from './pages/Scheduling/index.tsx'

import {Header} from './components/Header/index.tsx'
import StyledBackground from './components/Background/index.tsx'
// interface RootState {
//   counter: number;
//   isLogged: boolean;
// }

function App() {
  
  // const counter = useSelector((state: RootState) => state.counter);
  // const isLogged = useSelector((state: RootState) => state.isLogged);
  // const dispatch = useDispatch()
  return (
    <>
      <Header/>
      <StyledBackground>
      {/* <div>
        <h1>Counter {counter}</h1>
        <button onClick={() => dispatch(increment(5))}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        {isLogged && <h3>Valuable information i shouldn´t see</h3>}
      </div> */}
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/activities" element={<Activities/>}/>
          <Route path="/scheduling" element={<Scheduling/>}/>
        </Routes>
      </StyledBackground>
    </>
  );
}

export default App;
