/* eslint-disable no-unused-vars */
import React from "react";
import { createRoot } from "react-dom/client"
import Root from "./features/Root";
import { Provider } from "react-redux";
import store from "./store";

const container = document.getElementById("app")
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <Root />
    </Provider>
)