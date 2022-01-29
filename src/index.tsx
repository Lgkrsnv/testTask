import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { Container, CssBaseline } from '@mui/material';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <CssBaseline />
      <Container maxWidth='xl' style={{backgroundColor: 'pink'}}>
        <App />
      </Container>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
