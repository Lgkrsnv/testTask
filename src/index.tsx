import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { Provider } from 'react-redux';
import store from './store/store';
import { Container, ThemeProvider } from '@mui/material';
import theme from './theme/theme';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Container maxWidth='xl'>
          <App />
        </Container>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
