import './App.css';
import React, { useEffect } from 'react'
import {Route, Routes} from 'react-router-dom';
import {Dashboard} from './pages/Dashboard/index.tsx'
import {Customers} from './pages/Customers/index.tsx'
import {Activities} from './pages/Activities/index.tsx'
import {Scheduling} from './pages/Scheduling/index.tsx'
import {Header} from './components/Header/index.tsx'
import StyledBackground from './components/Background/index.tsx'
import { useAppDispatch } from './store/store.ts';
import { fetchCustomer} from './store/features/customerSlice.ts';
import { fetchActivity } from './store/features/activitySlice.ts';

function App() {

  const dispatch = useAppDispatch();
  
  useEffect(() => { 
    dispatch(fetchCustomer());
    dispatch(fetchActivity());
  });

  return (
    <>
      <StyledBackground>
        <Header/>
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