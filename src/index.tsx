import "bootstrap";
import ReactDOM from "react-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./images/Quicksand/static/Quicksand-Medium.ttf";
import Bundle from "./pages/Bundle";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { LoadingProvider } from "./contexts/loadingContext";

ReactDOM.render(
  <Provider store={store}>
    <LoadingProvider>
      <BrowserRouter>
        <Bundle />
      </BrowserRouter>
    </LoadingProvider>
  </Provider>,
  document.getElementById("root")
);
