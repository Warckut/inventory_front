import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'
import store from './redux/store'
import Routing from './Routing';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
