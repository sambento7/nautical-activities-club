import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
//Redux:
import {createStore} from 'redux';
import allReducers from './redux/reducers/index.tsx';
import {Provider} from 'react-redux';
//Router:
import {BrowserRouter} from 'react-router-dom'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: Function;
  }
}

const myStore = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render( 
  <React.StrictMode>
    <Provider store={myStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
