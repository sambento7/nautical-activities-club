// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App.tsx';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// // import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
// import allReducers from './redux/reducers/index.tsx';

// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk'

// import { configureStore } from '@reduxjs/toolkit';

// declare global {
//   interface Window { 
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
//   }
// }
 
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const myStore = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));


// // const myStore = configureStore({
// //   reducer: allReducers,
// //   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// //   devTools: process.env.NODE_ENV !== 'production'
// // });

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// root.render(
//   <React.StrictMode>
//     <Provider store={myStore}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

// reportWebVitals();
