import "./style.scss";

import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";

import App from "./App";

render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
);

if(module.hot) module.hot.accept();