/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./state/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
        <Toaster
          toastOptions={{
            position: "top-center",
            style: {
              background: "white",
              color: "black",
            },
          }}
        />
      </Router>
    </PersistGate>
  </Provider>
);
reportWebVitals();
