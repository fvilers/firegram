import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import store from "./redux/store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

dayjs.extend(relativeTime);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
