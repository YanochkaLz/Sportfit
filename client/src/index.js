import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './Context/UserStore';
import './Styles/index.scss'
import {Provider} from 'react-redux'
import { store } from './store/store';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ user: new UserStore() }}>
    <Provider store={store}>
      <App />
    </Provider>
  </Context.Provider>
);

