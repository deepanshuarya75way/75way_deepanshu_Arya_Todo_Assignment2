import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";
import theme from './config/theme';
import { ChakraProvider } from '@chakra-ui/react';
import {PersistGate} from 'redux-persist/lib/integration/react'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
     {/* <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}> */}
      <Provider store={store}>
        <ChakraProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
        </ChakraProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
