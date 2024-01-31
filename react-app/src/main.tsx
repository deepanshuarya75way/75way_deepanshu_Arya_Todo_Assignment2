import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";
import theme from './config/theme';
import { ChakraProvider } from '@chakra-ui/react';
// import { ErrorBoundary } from 'react-error-boundary'
// import Fallback from './components/Fallback';
// const errorHandler = (error: any, errorInfo: any) => {
//   console.log(error, errorInfo)
// }
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
     {/* <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}> */}
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
