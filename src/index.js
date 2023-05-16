import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { store, persistor } from './redux/store';
import reportWebVitals from './reportWebVitals';
import App from './app';
import CirularStd from './fonts/circular-std-font-family/CircularStd-Book.woff';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'circular std',
      fontWeight: '450',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
            font-family: "circular std";
            src: local("Circular Std"),
            url(${CirularStd});
        }
      `,
      },
    },
    button: {
      textTransform: 'none',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Auth0Provider
            domain="dev-51qh0h62wointmnd.uk.auth0.com"
            clientId="44DWrjIlvKDegDw9ztLTuxg2sMKjTIBG"
            authorizationParams={{
              redirect_uri: window.location.origin,
            }}
          >
            <App />
          </Auth0Provider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
// eslint-disable-next-line no-console
// reportWebVitals(console.log);
reportWebVitals();
