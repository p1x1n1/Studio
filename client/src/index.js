import React, {createContext}  from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import BouquetStore from './store/BouquetStore';
import { BrowserRouter } from 'react-router-dom';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 //<React.StrictMode>
 <Context.Provider value={
  {
    user: new UserStore(),
    boquet: new BouquetStore(),
  }
 }>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  
 </Context.Provider>,
    
 //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//reportWebVitals();
