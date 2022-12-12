import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import App from "./App";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
