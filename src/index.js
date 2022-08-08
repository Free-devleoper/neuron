import App from "App";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";
import store from './store/store';
ReactDOM.render(
  <BrowserRouter>
    <VisionUIControllerProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </VisionUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
